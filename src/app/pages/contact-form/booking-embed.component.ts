import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  NgZone,
  inject,
} from '@angular/core';

declare global {
  interface Window {
    Cal: ((...args: unknown[]) => void) & { loaded?: boolean; queue?: unknown[]; ns?: Record<string, unknown> };
  }
}

/**
 * Booking details from Cal.com's `bookingSuccessfulV2` embed event (e.detail.data). Fields as documented at
 * https://cal.com/help/embedding/embed-events (V2 replaces the deprecated `bookingSuccessful`).
 */
export interface CalBooking {
  uid?: string;
  title?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  /** URL of the video call (Google Meet), when Cal.com provides it. */
  videoCallUrl?: string;
}

/**
 * Reusable Cal.com inline embed. Mounts the calendar (prefilled with name/email/
 * notes) and emits `bookingConfirmed` when the visitor books a slot. The Cal.com
 * link is the single shared appointment for every entry point on the site.
 */
@Component({
  selector: 'app-booking-embed',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div #calContainer style="min-height:480px;width:100%;"></div>`,
})
export class BookingEmbedComponent implements AfterViewInit, OnDestroy {
  /** Single shared Cal.com event link — same appointment for all booking flows. */
  private static readonly CAL_LINK = 'hirably/30min';

  @Input() name = '';
  @Input() email = '';
  @Input() notes = '';
  /** Cal.com layout: column_view (default) or month_view (fits a narrower panel). */
  @Input() layout: 'column_view' | 'month_view' | 'week_view' = 'column_view';
  /** Optional brand color for the calendar (selected day, buttons). */
  @Input() brandColor = '';
  @Output() bookingConfirmed = new EventEmitter<CalBooking>();

  @ViewChild('calContainer', { static: true }) private container!: ElementRef<HTMLElement>;

  private readonly ngZone = inject(NgZone);
  private confirmed = false;
  private destroyed = false;

  ngAfterViewInit(): void {
    this.mount();
    this.registerEvents();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }

  private mount(): void {
    if (this.destroyed) return;
    // Cal's embed script (loaded in index.html) flips `loaded` once ready; retry
    // until then rather than racing it on first paint.
    if (!window.Cal?.loaded) {
      setTimeout(() => this.mount(), 300);
      return;
    }
    this.container.nativeElement.innerHTML = '';
    window.Cal('inline', {
      elementOrSelector: this.container.nativeElement,
      calLink: BookingEmbedComponent.CAL_LINK,
      config: {
        layout: this.layout,
        hideEventTypeDetails: true,
        theme: 'light',
        name: this.name,
        email: this.email,
        notes: this.notes,
      },
    });
    if (this.brandColor) {
      window.Cal('ui', {
        theme: 'light',
        hideEventTypeDetails: true,
        layout: this.layout,
        cssVarsPerTheme: { light: { 'cal-brand': this.brandColor }, dark: { 'cal-brand': this.brandColor } },
      });
    }
  }

  private registerEvents(): void {
    if (this.destroyed) return;
    if (!window.Cal?.loaded) {
      setTimeout(() => this.registerEvents(), 300);
      return;
    }
    window.Cal('on', {
      action: 'bookingSuccessfulV2',
      callback: (e: unknown) => this.ngZone.run(() => this.onConfirmed(e)),
    });
  }

  private onConfirmed(e: unknown): void {
    if (this.confirmed || this.destroyed) return;
    this.confirmed = true;
    const booking = (e as { detail?: { data?: CalBooking } })?.detail?.data;
    this.bookingConfirmed.emit(booking ?? {});
  }
}
