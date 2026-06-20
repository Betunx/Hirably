import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  NgZone,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AnalyticsService } from '@services/analytics.service';
import {
  ContactFormType,
  ContactFormConfig,
  VALID_TYPES,
  FORM_CONFIGS,
} from './contact-form.config';
import { workEmailValidator } from './work-email.validator';

declare global {
  interface Window {
    Cal: ((...args: unknown[]) => void) & { loaded?: boolean; queue?: unknown[]; ns?: Record<string, unknown> };
  }
}

const FORMSPREE_ENDPOINT = environment.formspreeEndpoint;

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements OnInit, OnDestroy {

  config!: ContactFormConfig;
  form!: FormGroup;
  submitting  = false;
  submitted   = false;
  submitError = false;
  // book-a-call: the Cal.com calendar stays hidden until the (validated) name+email
  // form is submitted via "Choose Date & Time". Other types show it inline always.
  calendarRevealed = false;

  get isBookACall(): boolean { return this.config?.type === 'book-a-call'; }

  private readonly destroy$ = new Subject<void>();
  private calEventsRegistered = false;
  private formStarted = false;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly titleService = inject(Title);
  private readonly ngZone = inject(NgZone);
  private readonly analytics = inject(AnalyticsService);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const type = params.get('type') as ContactFormType;
        if (!VALID_TYPES.includes(type)) {
          this.router.navigate(['/']);
          return;
        }
        this.config               = FORM_CONFIGS[type];
        this.calEventsRegistered  = false;
        this.formStarted          = false;
        this.calendarRevealed     = false;
        this.titleService.setTitle(`${this.config.right.formTitle} — Hirably`);
        this.buildForm();
        this.submitted   = false;
        this.submitting  = false;
        this.submitError = false;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildForm(): void {
    const controls: Record<string, ReturnType<typeof this.fb.control>> = {};
    for (const field of this.config.right.fields) {
      const validators: ValidatorFn[] = [];
      if (field.required) validators.push(Validators.required);
      if (field.type === 'email') validators.push(Validators.email);
      if (field.workEmail) validators.push(workEmailValidator());
      controls[field.key] = this.fb.control('', validators);
    }
    this.form = this.fb.group(controls);

    // Register the Cal.com booking-success listener for every type. For book-a-call
    // the embed itself is created later (on "Choose Date & Time"); the other types
    // render the calendar inline right away.
    setTimeout(() => {
      if (!this.isBookACall) this.initCalEmbed();
      this.registerCalEvents();
    }, 150);

    this.form.valueChanges.pipe(
      debounceTime(800),
      takeUntil(this.destroy$)
    ).subscribe(v => {
      this.initCalEmbed(this.displayName(v), v.email ?? '', v.notes ?? '');
    });
  }

  /** Full name for Cal.com prefill / Formspree, handling both field layouts. */
  private displayName(v: { firstName?: string; lastName?: string; fullName?: string }): string {
    if (this.isBookACall) return `${v.firstName ?? ''} ${v.lastName ?? ''}`.trim();
    return v.fullName ?? '';
  }

  private initCalEmbed(name = '', email = '', notes = ''): void {
    // book-a-call only mounts the calendar after the gate form is submitted.
    if (this.isBookACall && !this.calendarRevealed) return;

    const container = document.getElementById('cal-booking-placeholder');
    if (!container) return;

    if (!window.Cal?.loaded) {
      setTimeout(() => this.initCalEmbed(name, email, notes), 300);
      return;
    }

    container.innerHTML = '';

    window.Cal('inline', {
      elementOrSelector: '#cal-booking-placeholder',
      calLink: 'hirably/30min',
      config: {
        layout: 'column_view',
        hideEventTypeDetails: true,
        theme: 'light',
        name,
        email,
        notes,
      },
    });
  }

  private registerCalEvents(): void {
    if (this.calEventsRegistered) return;

    if (!window.Cal?.loaded) {
      setTimeout(() => this.registerCalEvents(), 300);
      return;
    }

    window.Cal('on', {
      action: 'bookingSuccessful',
      callback: (e: unknown) => {
        this.ngZone.run(() => this.onCalBookingConfirmed(e));
      },
    });

    this.calEventsRegistered = true;
  }

  private onCalBookingConfirmed(e: unknown): void {
    if (this.submitted || this.submitting) return;

    const data = (e as { detail?: { data?: { booking?: { startTime?: string; uid?: string } } } })?.detail?.data;
    const booking = data?.booking;

    this.submitting  = true;
    this.submitError = false;
    this.cdr.markForCheck();

    const { email } = this.form.value;
    const payload = {
      ...this.form.value,
      _form_type:        this.config.type,
      _name:             this.displayName(this.form.value),
      _subject:          `Hirably Form: ${this.config.right.formTitle}`,
      _replyto:          email ?? '',
      _cal_booking_time: booking?.startTime ?? 'Scheduled via Cal.com',
      _cal_booking_uid:  booking?.uid       ?? '',
    };

    this.http.post(FORMSPREE_ENDPOINT, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.submitting = false;
          this.submitted  = true;
          // The booking IS the conversion (the form can't be sent without booking),
          // so a single generate_lead represents it — no separate form_submit event.
          this.analytics.generateLead('cal_booking', this.config.type);
          this.cdr.markForCheck();
        },
        error: () => {
          this.submitting  = false;
          this.submitError = true;
          this.cdr.markForCheck();
        },
      });
  }

  // Fires once when the user first interacts with any form field.
  onFormStart(): void {
    if (this.formStarted) return;
    this.formStarted = true;
    this.analytics.formStart(this.config.type, 'contact');
  }

  // book-a-call: validate the name + work-email gate, then reveal the calendar.
  onChooseDateTime(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.cdr.markForCheck();
      return;
    }
    this.calendarRevealed = true;
    this.cdr.markForCheck();

    const v = this.form.value;
    // Wait a tick so the calendar container exists in the DOM, then mount + scroll.
    setTimeout(() => {
      this.initCalEmbed(this.displayName(v), v.email ?? '', '');
      document.getElementById('cal-booking-placeholder')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  onContactEmail(): void {
    this.analytics.contactClick('email');
  }

  // kept for template binding (error banner uses submitError set by onCalBookingConfirmed)
  isInvalid(key: string): boolean {
    const ctrl = this.form.get(key);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  onSubmitAnother(): void {
    this.form.reset();
    this.submitted        = false;
    this.submitError      = false;
    this.calendarRevealed = false;
    this.formStarted      = false;
    this.cdr.markForCheck();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
