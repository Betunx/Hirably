import {
  AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, ViewChild, inject, signal
} from '@angular/core';
import { DataService } from '@services/data.service';

/** One hop = 0.6 s; the H lands (and the card lights up) at 85 % of the hop. */
const HOP_MS = 600;
const LAND_AT = 0.85;
/** Short rest on each card before the next hop. */
const PAUSE_MS = 150;
/** The drop onto card 01 (and the jump back off it) starts this far above the card. */
const DROP_PX = 90;
/** Scroll trigger: a card counts once CARD_IN of its height is above TRIGGER_LINE of the screen height,
    and at least STEP_PX of scrolling after the previous card. */
const TRIGGER_LINE = 0.85;
const CARD_IN = 0.4;
const STEP_PX = 120;
/** How high the arc rises above the higher point: up-hops (desktop staircase) vs. down-hops (phones). */
const ARC_UP_PX = 70;
const ARC_DOWN_PX = 36;

@Component({
  selector: 'app-how-it-works-steps',
  templateUrl: './how-it-works-steps.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowItWorksStepsComponent implements AfterViewInit {
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  readonly steps = inject(DataService).getHowItWorksSteps();
  // Staircase goes UP: 01 lowest (left), 03 highest (right) — equal 105px gaps
  readonly stepOffsets = ['min-[1300px]:mt-[210px]', 'min-[1300px]:mt-[105px]', 'min-[1300px]:mt-0'];
  // Mobile: all cards centered in column (no staircase)
  readonly mobileStepAlignments = ['', '', ''];
  readonly numberColors = ['text-[#C2E7FF]', 'text-[#D1F9E5]', 'text-[#E3E1FF]'];
  readonly circleFills = ['#C2E7FF', '#D1F9E5', '#E3E1FF'];
  // Both arrows connect card center-Y to card center-Y (105px gap between centers)
  // Card centers: 01=433px, 02=328px, 03=223px (step_mt + 105 + 118)
  // SVG 71×107: path (0,106)→(71,1). container_mt = card_next_center - 1
  readonly arrowOffsets = ['mt-[327px]', 'mt-[222px]'];

  // ── Hopping H (follows the scroll: down = hops forward, up = hops back) ────
  readonly cardShadow = '2px 2px 8px 0 rgba(0,0,0,0.25)';
  readonly cardGlow = '0 0 0 4px rgba(34,145,234,0.18), 0 10px 30px rgba(34,145,234,0.30), 2px 2px 8px 0 rgba(0,0,0,0.25)';
  /** How many cards the H has landed on (cards with index < landed are highlighted). */
  readonly landed = signal(0);

  @ViewChild('hopStage') private stage?: ElementRef<HTMLElement>;
  @ViewChild('hopper') private hopper?: ElementRef<HTMLElement>;
  @ViewChild('hopBody') private body?: ElementRef<HTMLElement>;
  @ViewChild('hopDot') private dot?: ElementRef<SVGGElement>;

  /** Card the H sits on (-1 = not shown) and card the scroll position asks for. */
  private pos = -1;
  private goal = -1;
  private busy = false;
  private destroyed = false;
  private running: Animation[] = [];

  ngAfterViewInit(): void {
    const stage = this.stage?.nativeElement;
    if (!stage) return;

    this.zone.runOutsideAngular(() => {
      let frame = 0;
      const onScroll = () => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          this.goal = this.scrollGoal();
          void this.advance();
        });
      };
      // Reduced motion: final state right away (H on card 03, all cards highlighted), no hops.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.finish();
      } else {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        onScroll();
      }

      // Keep the resting H on its card if the layout changes (resize / rotate).
      const ro = typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => { if (!this.busy && this.pos >= 0) this.placeAt(this.pos); })
        : null;
      ro?.observe(stage);

      this.destroyRef.onDestroy(() => {
        this.destroyed = true;
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        cancelAnimationFrame(frame);
        ro?.disconnect();
        this.running.forEach(a => a.cancel());
      });
    });
  }

  /**
   * Which card the scroll position asks for (-1 = none yet). A card counts once 40 % of it is above the line at 85 %
   * of the screen height, and never less than STEP_PX of scrolling after the previous card. On phones the cards are
   * stacked, so each one counts as it scrolls in; on the desktop staircase (01 lowest) the three hops are spread over
   * 2 × STEP_PX of scrolling.
   */
  private scrollGoal(): number {
    const cards = this.stage?.nativeElement.querySelectorAll<HTMLElement>('[data-hop-card]') ?? [];
    const line = window.innerHeight * TRIGGER_LINE;
    let goal = -1;
    let prev = -Infinity;
    cards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      // Scroll still needed (px) before card i counts; <= 0 means it already does.
      const need = Math.max(r.top + r.height * CARD_IN - line, prev + STEP_PX);
      prev = need;
      if (need <= 0) goal = i;
    });
    return goal;
  }

  /** Hop one card at a time toward the goal (forward or back), with the same rest between hops. */
  private async advance(): Promise<void> {
    if (this.busy) return;
    this.busy = true;
    while (this.pos !== this.goal && !this.destroyed) {
      if (!(await this.hopTo(this.pos + Math.sign(this.goal - this.pos)))) break;
      if (this.pos !== this.goal) await this.wait(PAUSE_MS);
    }
    this.busy = false;
  }

  /** One hop from the current card to `to`. -1 → 0 drops in from above; 0 → -1 jumps back up and fades out. */
  private async hopTo(to: number): Promise<boolean> {
    const hop = this.hopper?.nativeElement;
    const a = this.pos >= 0 ? this.target(this.pos) : null;
    const b = to >= 0 ? this.target(to) : null;
    if (!hop || (this.pos >= 0 && !a) || (to >= 0 && !b)) return false;

    let end: { x: number; y: number };
    if (!a) {
      // Fade in while dropping onto card 01.
      end = b!;
      this.running.push(hop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, fill: 'forwards' }));
      await this.jump({ x: end.x, y: end.y - DROP_PX }, end, () => this.land(to));
    } else if (!b) {
      // Leave: jump back up off card 01 and fade out; card 01 loses its highlight.
      end = { x: a.x, y: a.y - DROP_PX };
      this.running.push(hop.animate([{ opacity: 1 }, { opacity: 0 }],
        { duration: 180, delay: HOP_MS - 180, fill: 'forwards' }));
      await this.jump(a, end, () => this.zone.run(() => this.landed.set(0)));
    } else {
      end = b;
      await this.jump(a, b, () => this.land(to));
    }

    this.pos = to;
    // Pin the end state inline, then drop the finished animations so they don't pile up.
    hop.style.transform = `translate(${end.x}px, ${end.y}px)`;
    hop.style.opacity = to >= 0 ? '1' : '0';
    this.running.forEach(x => x.cancel());
    this.running = [];
    return true;
  }

  /** One hop from a to b (arc + squash-and-stretch); `onLand` runs as it touches down. */
  private jump(a: { x: number; y: number }, b: { x: number; y: number }, onLand: () => void): Promise<void> {
    const hop = this.hopper!.nativeElement;
    const body = this.body!.nativeElement;
    const apexY = Math.min(a.y, b.y) - (b.y > a.y ? ARC_DOWN_PX : ARC_UP_PX);
    const t = (x: number, y: number) => `translate(${x}px, ${y}px)`;

    const move = hop.animate([
      { transform: t(a.x, a.y), easing: 'cubic-bezier(0.2, 0.6, 0.35, 1)' },
      { transform: t((a.x + b.x) / 2, apexY), offset: 0.42, easing: 'cubic-bezier(0.55, 0, 0.8, 0.4)' },
      { transform: t(b.x, b.y), offset: LAND_AT },
      { transform: t(b.x, b.y) },
    ], { duration: HOP_MS, fill: 'forwards' });

    const squash = body.animate([
      { transform: 'scale(1.12, 0.86)' },                 // crouch
      { transform: 'scale(0.9, 1.12)', offset: 0.14 },    // stretch on take-off
      { transform: 'scale(1, 1)', offset: 0.42 },         // round at the top
      { transform: 'scale(0.92, 1.1)', offset: 0.8 },    // stretch falling
      { transform: 'scale(1.16, 0.82)', offset: 0.9 },    // squash on landing
      { transform: 'scale(1, 1)' },
    ], { duration: HOP_MS, easing: 'ease-in-out', fill: 'forwards' });

    this.running.push(move, squash);
    setTimeout(onLand, HOP_MS * LAND_AT);
    return move.finished.then(() => undefined, () => undefined);
  }

  /** Landing: highlight the card and bounce the blue dot. */
  private land(index: number): void {
    this.zone.run(() => this.landed.set(index + 1));
    const dot = this.dot?.nativeElement;
    if (!dot) return;
    dot.animate([
      { transform: 'translateY(0)' },
      { transform: 'translateY(-14px)', offset: 0.35 },
      { transform: 'translateY(0)', offset: 0.65 },
      { transform: 'translateY(-5px)', offset: 0.82 },
      { transform: 'translateY(0)' },
    ], { duration: 420, easing: 'ease-out' });
  }

  /** Final state without animation. */
  private finish(): void {
    const hop = this.hopper?.nativeElement;
    if (!hop) return;
    this.pos = this.goal = 2;
    this.placeAt(2);
    hop.style.opacity = '1';
    this.zone.run(() => this.landed.set(3));
  }

  private placeAt(index: number): void {
    const hop = this.hopper?.nativeElement;
    const p = this.target(index);
    if (!hop || !p) return;
    // Pin the resting state inline first, so cancelling the finished animations can't hide/move it.
    hop.style.opacity = '1';
    hop.style.transform = `translate(${p.x}px, ${p.y}px)`;
    this.running.forEach(a => a.cancel());
    this.running = [];
  }

  /** Where the H sits on card `index`: on its top edge, toward the right (clear of the big number). */
  private target(index: number): { x: number; y: number } | null {
    const stage = this.stage?.nativeElement;
    const hop = this.hopper?.nativeElement;
    const card = stage?.querySelectorAll<HTMLElement>('[data-hop-card]')[index];
    if (!stage || !hop || !card) return null;
    const s = stage.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    return {
      // 86% across: clear of the big step number (≥16px on desktop) and 21px in from the card's right edge.
      x: Math.round(c.left - s.left + c.width * 0.86 - hop.offsetWidth / 2),
      y: Math.round(c.top - s.top - hop.offsetHeight + 2),
    };
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
