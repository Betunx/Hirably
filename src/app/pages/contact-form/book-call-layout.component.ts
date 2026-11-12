import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AnalyticsService } from '@services/analytics.service';

/** Same fonts as the new homepage (src/site/index.html). Loaded only when this page opens. */
const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400&family=Figtree:wght@500;600&family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&display=swap';

/**
 * Book a call, the approved rebrand layout (design: bookcall-design-reference, Nov 2026).
 * Draws the top bar (as on the new homepage), the left column (desktop) and the orange
 * field. Each step (details form, Cal.com calendar, booked) is projected into the field,
 * so the form and booking logic stay in ContactFormComponent / BookingPageComponent.
 * Styles are global under `.bc` (ViewEncapsulation.None) so projected content picks them up.
 */
@Component({
  selector: 'app-book-call-layout',
  standalone: true,
  templateUrl: './book-call-layout.component.html',
  styleUrls: ['./book-call-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCallLayoutComponent {
  /** Phone only: show "Let's talk." + intro + pills at the top of the orange field (step 1). */
  @Input() phoneIntro = false;

  menuOpen = false;

  private readonly analytics = inject(AnalyticsService);

  constructor() {
    const doc = inject(DOCUMENT);
    if (!doc.querySelector('link[data-bc-fonts]')) {
      const link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = FONTS_HREF;
      link.setAttribute('data-bc-fonts', '');
      doc.head.appendChild(link);
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  onBookCta(): void {
    this.analytics.ctaClick('Book a call', 'book_call_page');
  }
}
