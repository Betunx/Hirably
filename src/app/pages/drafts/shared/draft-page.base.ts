import { inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AnalyticsService } from '@services/analytics.service';
import {
  DONE_FOR_YOU, DONE_FOR_YOU_CLOSING, DRAFT_HERO, DRAFT_NEARSHORE, DRAFT_STATS, NEARSHORE_SUBTITLE,
  NEARSHORE_TITLE, TRUST_LINE, TRUST_LOGOS, WHOLE_JOB_HEADLINE
} from './draft-copy';
import { useDraftShell } from './draft-shell';

/** DESIGN DRAFTS ONLY. Shared copy + hero CTA handlers for /draft-a, /draft-b, /draft-c. */
export abstract class DraftPageBase {
  private readonly router = inject(Router);
  private readonly analytics = inject(AnalyticsService);
  private readonly doc = inject(DOCUMENT);

  readonly hero = DRAFT_HERO;
  readonly wholeJob = WHOLE_JOB_HEADLINE;
  readonly doneForYou = DONE_FOR_YOU;
  readonly doneForYouClosing = DONE_FOR_YOU_CLOSING;
  readonly stats = DRAFT_STATS;
  readonly nearshoreTitle = NEARSHORE_TITLE;
  readonly nearshoreSubtitle = NEARSHORE_SUBTITLE;
  readonly nearshore = DRAFT_NEARSHORE;
  readonly trustLine = TRUST_LINE;
  readonly logos = TRUST_LOGOS;

  constructor() {
    useDraftShell();
  }

  /** Same event and destination as the navbar's Start Hiring CTA. */
  startHiring(): void {
    this.analytics.ctaClick('Start Hiring', 'start-hiring');
    this.router.navigate(['/contact', 'start-hiring']);
  }

  /** Brings the rate calculator into view (clears the fixed navbar). */
  scrollToCalculator(): void {
    const el = this.doc.getElementById('rate-calculator');
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: reduce ? 'auto' : 'smooth' });
  }
}
