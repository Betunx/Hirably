import {
  AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, ViewChild, inject, signal
} from '@angular/core';
import { DataService } from '@services/data.service';

/** One hop = 0.6 s; the H lands (and the card lights up) at 85 % of the hop. */
const HOP_MS = 600;
const LAND_AT = 0.85;
/** Short rest on each card before the next hop. */
const PAUSE_MS = 150;
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

  // ── Hopping H (plays once when the steps scroll into view) ────────────────
  readonly cardShadow = '2px 2px 8px 0 rgba(0,0,0,0.25)';
  readonly cardGlow = '0 0 0 4px rgba(34,145,234,0.18), 0 10px 30px rgba(34,145,234,0.30), 2px 2px 8px 0 rgba(0,0,0,0.25)';
  /** How many cards the H has landed on (cards with index < landed are highlighted). */
  readonly landed = signal(0);

  @ViewChild('hopStage') private stage?: ElementRef<HTMLElement>;
  @ViewChild('hopper') private hopper?: ElementRef<HTMLElement>;
  @ViewChild('hopBody') private body?: ElementRef<HTMLElement>;
  @ViewChild('hopDot') private dot?: ElementRef<SVGGElement>;

  private started = false;
  private finished = false;
  private running: Animation[] = [];

  ngAfterViewInit(): void {
    const stage = this.stage?.nativeElement;
    if (!stage || typeof IntersectionObserver === 'undefined') return;

    this.zone.runOutsideAngular(() => {
      // Reduced motion: final state right away (H on card 03, all cards highlighted).
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.finish();
        return;
      }
      const io = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting) && !this.started) {
          this.started = true;
          io.disconnect();
          void this.play();
        }
      }, { threshold: 0.35 });
      io.observe(stage);

      // Keep the resting H on card 03 if the layout changes afterwards (resize / rotate).
      const ro = typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => { if (this.finished) this.placeAt(2); })
        : null;
      ro?.observe(stage);

      this.destroyRef.onDestroy(() => {
        io.disconnect();
        ro?.disconnect();
        this.running.forEach(a => a.cancel());
      });
    });
  }

  /** Drop onto card 01, then hop to 02 and 03. */
  private async play(): Promise<void> {
    const hop = this.hopper?.nativeElement;
    if (!hop) return;
    const targets = [0, 1, 2].map(i => this.target(i));
    if (targets.some(t => !t)) return;
    const [p1, p2, p3] = targets as { x: number; y: number }[];

    // Fade in while dropping onto card 01.
    this.running.push(hop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, fill: 'forwards' }));
    await this.jump({ x: p1.x, y: p1.y - 90 }, p1, 0);
    await this.wait(PAUSE_MS);
    await this.jump(p1, p2, 1);
    await this.wait(PAUSE_MS);
    await this.jump(p2, p3, 2);
    this.finished = true;
  }

  /** One hop from a to b (arc + squash-and-stretch); lights up card `index` on landing. */
  private jump(a: { x: number; y: number }, b: { x: number; y: number }, index: number): Promise<void> {
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
    setTimeout(() => this.land(index), HOP_MS * LAND_AT);
    return move.finished.then(() => undefined, () => undefined);
  }

  /** Landing: highlight the card and bounce the blue dot. */
  private land(index: number): void {
    this.zone.run(() => this.landed.set(index + 1));
    const dot = this.dot?.nativeElement;
    if (!dot) return;
    this.running.push(dot.animate([
      { transform: 'translateY(0)' },
      { transform: 'translateY(-14px)', offset: 0.35 },
      { transform: 'translateY(0)', offset: 0.65 },
      { transform: 'translateY(-5px)', offset: 0.82 },
      { transform: 'translateY(0)' },
    ], { duration: 420, easing: 'ease-out' }));
  }

  /** Final state without animation. */
  private finish(): void {
    const hop = this.hopper?.nativeElement;
    if (!hop) return;
    this.finished = true;
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
