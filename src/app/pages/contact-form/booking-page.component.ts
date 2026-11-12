import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AnalyticsService } from '@services/analytics.service';
import { ContactFormType, ContactFormConfig, VALID_TYPES, FORM_CONFIGS } from './contact-form.config';
import { BookingStateService, BookingState } from './booking-state.service';
import { BookingEmbedComponent, CalBooking } from './booking-embed.component';
import { BookCallLayoutComponent } from './book-call-layout.component';

/**
 * Dedicated scheduling step (/contact/:type/agendar). Reached after the form
 * step has captured + sent the lead. Renders the shared Cal.com embed prefilled
 * with the visitor's details and shows the success screen once they book.
 * Landing here directly (no state) bounces back to the form.
 */
@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [CommonModule, BookingEmbedComponent, BookCallLayoutComponent],
  templateUrl: './booking-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingPageComponent implements OnInit {
  config!: ContactFormConfig;
  state!: BookingState;
  booked = false;
  /** Book a call: when the booked call is, in the visitor's time zone (e.g. "Friday, November 13 at 9:00 AM"). */
  bookedWhen = '';
  /** Book a call: the email the invite went to (shown after booking, when the stored state is cleared). */
  bookedEmail = '';

  private type!: ContactFormType;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly analytics = inject(AnalyticsService);
  private readonly bookingState = inject(BookingStateService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const type = this.route.snapshot.paramMap.get('type') as ContactFormType;
    if (!VALID_TYPES.includes(type)) {
      this.router.navigate(['/']);
      return;
    }
    const state = this.bookingState.get(type);
    // No state → user landed here without completing the form step. Send them back.
    if (!state) {
      this.router.navigate(['/contact', type]);
      return;
    }
    this.type = type;
    this.config = FORM_CONFIGS[type];
    this.state = state;
    this.titleService.setTitle(type === 'book-a-call' ? 'Pick a time | Hirably' : `Schedule — ${this.config.right.formTitle} — Hirably`);
  }

  onBookingConfirmed(booking?: CalBooking): void {
    if (this.booked) return;
    this.booked = true;
    this.bookedEmail = this.state.email;
    this.bookedWhen = this.formatWhen(booking?.startTime);
    // The booking IS the conversion (the lead was already captured on the form step).
    this.analytics.generateLead('cal_booking', this.type);
    this.bookingState.clear(this.type);
    this.cdr.markForCheck();
  }

  /** Book a call: back to step 1 (the form refills from the stored details). */
  backToDetails(): void {
    this.router.navigate(['/contact', this.type]);
  }

  private formatWhen(iso?: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    const day = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return `${day} at ${time}`;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
