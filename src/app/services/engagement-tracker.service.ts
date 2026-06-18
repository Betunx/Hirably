import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { AnalyticsService } from './analytics.service';

/**
 * Per-page engagement tracking for the SPA: scroll depth, time on page and
 * section visibility. `startPage()` is called on every NavigationEnd and resets
 * all trackers, so thresholds fire once per page view.
 *
 * All listeners/timers run outside the Angular zone — they only push to the GTM
 * data layer and never touch the UI, so they shouldn't trigger change detection.
 */
@Injectable({ providedIn: 'root' })
export class EngagementTrackerService implements OnDestroy {

  private readonly scrollThresholds = [25, 50, 75, 90, 100];
  private readonly timeThresholds = [30, 60, 120, 180]; // seconds

  private firedScroll = new Set<number>();
  private firedSections = new Set<string>();
  private timers: ReturnType<typeof setTimeout>[] = [];
  private observer?: IntersectionObserver;
  private scrollHandler?: () => void;
  private ticking = false;

  constructor(private analytics: AnalyticsService, private zone: NgZone) {}

  startPage(): void {
    this.reset();
    this.startScroll();
    this.startTimers();
    // Sections are rendered by the routed component; wait a tick for the DOM.
    setTimeout(() => this.startSections(), 300);
  }

  private reset(): void {
    this.firedScroll.clear();
    this.firedSections.clear();
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
    this.observer?.disconnect();
    this.observer = undefined;
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      this.scrollHandler = undefined;
    }
  }

  // ── Scroll depth ────────────────────────────────────────────────────────────

  private startScroll(): void {
    this.scrollHandler = () => {
      if (this.ticking) return;
      this.ticking = true;
      requestAnimationFrame(() => {
        this.checkScroll();
        this.ticking = false;
      });
    };
    this.zone.runOutsideAngular(() =>
      window.addEventListener('scroll', this.scrollHandler!, { passive: true })
    );
  }

  private checkScroll(): void {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return; // page not scrollable — don't fire bogus 100%
    const percent = (window.scrollY / scrollable) * 100;
    for (const t of this.scrollThresholds) {
      if (percent >= t && !this.firedScroll.has(t)) {
        this.firedScroll.add(t);
        this.analytics.scrollDepth(t);
      }
    }
  }

  // ── Time on page ──────────────────────────────────────────────────────────

  private startTimers(): void {
    this.zone.runOutsideAngular(() => {
      for (const sec of this.timeThresholds) {
        this.timers.push(setTimeout(() => this.analytics.timeOnPage(sec), sec * 1000));
      }
    });
  }

  // ── Section view ──────────────────────────────────────────────────────────

  private startSections(): void {
    const sections = document.querySelectorAll<HTMLElement>('[data-section]');
    if (!sections.length) return;
    this.observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          const name = entry.target instanceof HTMLElement ? entry.target.dataset['section'] : '';
          if (name && !this.firedSections.has(name)) {
            this.firedSections.add(name);
            this.analytics.sectionView(name);
          }
          this.observer?.unobserve(entry.target);
        }
      }
    }, { threshold: 0.3 });
    sections.forEach(s => this.observer!.observe(s));
  }

  ngOnDestroy(): void {
    this.reset();
  }
}
