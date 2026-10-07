import {
  AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, ViewChild, inject
} from '@angular/core';

/** Entrance animation (plays once when the section scrolls into view). */
const CARD_MS = 400;
const CARD_STAGGER_MS = 80;
const CARD_TRAVEL_PX = 40;
const HEART_MS = 500;
const HEART_TILT = 'rotate(12deg)';

interface AdvantageCard {
  title: string;
  description: string;
  borderColor: string;
}

@Component({
  selector: 'app-why-hirably',
  templateUrl: './why-hirably.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhyHirablyComponent implements AfterViewInit {
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('heart') private heart?: ElementRef<SVGElement>;
  @ViewChild('cardGrid') private grid?: ElementRef<HTMLElement>;

  // Figma order (3×2 grid, left-to-right, top-to-bottom)
  // Border colors: Row1 lavender/mint/cream, Row2 cream/lavender/mint
  readonly cards: AdvantageCard[] = [
    {
      title: 'Lifetime Protection',
      description: 'If your employee leaves for any reason, at any time, we recruit their replacement for free. You never pay for the same role twice.',
      borderColor: '#E3E1FF'
    },
    {
      title: 'Zero Recruitment Fees',
      description: 'No recruitment fees. No setup fees. Nothing to pay until you approve a hire.',
      borderColor: '#D1FAE5'
    },
    {
      title: 'Background-Checked & Verified',
      description: 'Live interviews, verified identity and references. Every candidate, before you ever meet them.',
      borderColor: '#FFF1CF'
    },
    {
      title: 'Month-to-Month',
      description: 'No lock-ins, no fine print. Scale up, down, or out with 30 days\' notice.',
      borderColor: '#FFF1CF'
    },
    {
      title: 'First Shortlist in 3-7 Days',
      description: 'We move at the speed of your roadmap. A vetted shortlist in your inbox, ready to interview.',
      borderColor: '#E3E1FF'
    },
    {
      title: 'North American Standards',
      description: 'Same time zones. Same business culture. Your team integrates seamlessly into your workflow from Day 1. Not Day 90.',
      borderColor: '#D1FAE5'
    }
  ];

  ngAfterViewInit(): void {
    const grid = this.grid?.nativeElement;
    const heart = this.heart?.nativeElement;
    if (!grid || !heart || typeof IntersectionObserver === 'undefined') return;
    // Reduced motion: leave everything in place, no animation.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-love-card]'));
    this.zone.runOutsideAngular(() => {
      // Hidden starting state is applied by script, so without JS (or with reduced motion) nothing is hidden.
      heart.style.transform = `scale(0) ${HEART_TILT}`;
      cards.forEach(c => (c.style.opacity = '0'));

      const io = new IntersectionObserver(entries => {
        if (!entries.some(e => e.isIntersecting)) return;
        io.disconnect();
        this.play(heart, cards, grid);
      }, { threshold: 0.25 });
      io.observe(grid);
      this.destroyRef.onDestroy(() => io.disconnect());
    });
  }

  /** Heart pops (0 → 1 with a small overshoot); cards slide in from their side, staggered. */
  private play(heart: SVGElement, cards: HTMLElement[], grid: HTMLElement): void {
    heart.style.transform = HEART_TILT;
    heart.animate([
      { transform: `scale(0) ${HEART_TILT}` },
      { transform: `scale(1.25) ${HEART_TILT}`, offset: 0.55 },
      { transform: `scale(0.92) ${HEART_TILT}`, offset: 0.78 },
      { transform: `scale(1) ${HEART_TILT}` },
    ], { duration: HEART_MS, easing: 'ease-out', fill: 'backwards' });

    // Column of each card from its on-screen position: left column from the left, right column
    // from the right, a middle column (3-column layout) rises from below.
    const g = grid.getBoundingClientRect();
    cards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const isLeft = r.left - g.left < 2;
      const isRight = g.right - r.right < 2;
      const from = isLeft ? `translateX(-${CARD_TRAVEL_PX}px)`
        : isRight ? `translateX(${CARD_TRAVEL_PX}px)` : `translateY(${CARD_TRAVEL_PX}px)`;
      card.style.opacity = '';
      card.animate([
        { opacity: 0, transform: from },
        { opacity: 1, transform: 'none' },
      ], { duration: CARD_MS, delay: i * CARD_STAGGER_MS, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)', fill: 'backwards' });
    });
  }
}
