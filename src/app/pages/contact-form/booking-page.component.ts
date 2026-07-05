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
import { BookingEmbedComponent } from './booking-embed.component';

/**
 * Dedicated scheduling step (/contact/:type/agendar). Reached after the form
 * step has captured + sent the lead. Renders the shared Cal.com embed prefilled
 * with the visitor's details and shows the success screen once they book.
 * Landing here directly (no state) bounces back to the form.
 */
@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [CommonModule, BookingEmbedComponent],
  templateUrl: './booking-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingPageComponent implements OnInit {
  config!: ContactFormConfig;
  state!: BookingState;
  booked = false;

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
    this.titleService.setTitle(`Schedule — ${this.config.right.formTitle} — Hirably`);
  }

  onBookingConfirmed(): void {
    if (this.booked) return;
    this.booked = true;
    // The booking IS the conversion (the lead was already captured on the form step).
    this.analytics.generateLead('cal_booking', this.type);
    this.bookingState.clear(this.type);
    this.cdr.markForCheck();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
