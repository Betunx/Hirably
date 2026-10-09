import {
  AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, ViewChild, computed, inject, signal
} from '@angular/core';
import { DataService } from '@services/data.service';

/** How long each role stays on screen. The line fades out, then the next one fades in. */
const ROLE_MS = 2600;

/** "an" before a vowel ("Need an Accountant?", "Need an AI Research Engineer?"), otherwise "a". */
const articleFor = (role: string): 'a' | 'an' => (/^[aeiou]/i.test(role) ? 'an' : 'a');

// The right-hand card is the rate calculator (app-rate-calculator); it owns its own
// lead capture and "Book a call" flow.
@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styles: [`
    /* Rotating headline on three lines: "Need a" / [role]? / "try hirably."
       Sized from the viewport, not the hero column. The longest role ("Customer Support Rep?", 11.94em) fills ~88% of
       the screen on phones and laptops (7.35vw), then grows slowly (84px + 1.458vw) to 112px at 1920px, where it fills
       ~70%; above 1920px the size stays and the white space grows. The box spans the full screen width so the 1280px
       hero column doesn't limit it. Each line is one line tall for every role, so the
       reserved height never changes: no gap, no shift. */
    .hero-headline-box { width: 100vw; margin-left: calc(50% - 50vw); }
    .hero-rotator {
      font-size: min(7.35vw, calc(84px + 1.458vw), 112px);
      line-height: 1.04;
      letter-spacing: -0.5px;
      /* Cream text on the light hero blue: a soft navy shadow (in em, so it scales with the type) darkens the blue
         right around each letter so the cream reads clearly. The background itself is unchanged. */
      text-shadow: 0 0 0.05em rgba(16, 32, 118, 0.6), 0 0.02em 0.2em rgba(16, 32, 118, 0.35);
    }
    /* Only opacity changes, and every line keeps its own place: the old one fades out, then the new one fades
       in. "Need a" / "Need an" only fade when the article actually changes. */
    .hero-line { opacity: 0; transition: opacity 260ms ease-in; }
    .hero-line.is-active { opacity: 1; transition: opacity 320ms ease-out 260ms; }
    @media (prefers-reduced-motion: reduce) {
      .hero-line, .hero-line.is-active { transition: none; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent implements AfterViewInit {
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('rotator') private rotator?: ElementRef<HTMLElement>;

  readonly roles = inject(DataService).getHeroRoles();
  readonly index = signal(0);
  /** Article for the role on screen; picks which "Need a" / "Need an" line is visible. */
  readonly article = computed(() => articleFor(this.roles[this.index()]));
  /** What screen readers hear: one full sentence, never the cycling word. */
  readonly spokenHeadline = (() => {
    const withArticle = this.roles.map(r => `${articleFor(r)} ${r}`);
    return `Need ${withArticle.slice(0, -1).join(', ')}, or ${withArticle[withArticle.length - 1]}? Try Hirably.`;
  })();

  ngAfterViewInit(): void {
    const el = this.rotator?.nativeElement;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    // Reduced motion: the first role stays, static.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Rotate only while the headline is on screen.
    let timer: ReturnType<typeof setInterval> | undefined;
    const stop = () => { clearInterval(timer); timer = undefined; };
    this.zone.runOutsideAngular(() => {
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !timer) {
          timer = setInterval(() => this.zone.run(() => this.index.update(i => (i + 1) % this.roles.length)), ROLE_MS);
        } else if (!entry.isIntersecting) {
          stop();
        }
      });
      io.observe(el);
      this.destroyRef.onDestroy(() => { io.disconnect(); stop(); });
    });
  }
}
