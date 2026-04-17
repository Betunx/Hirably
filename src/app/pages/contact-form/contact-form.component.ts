import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ContactFormType,
  ContactFormConfig,
  FormFieldDef,
  VALID_TYPES,
  FORM_CONFIGS,
} from './contact-form.config';

declare global {
  interface Window {
    dataLayer: unknown[];
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

  get isBookACall(): boolean { return this.config?.type === 'book-a-call'; }

  private readonly destroy$ = new Subject<void>();
  private calEventsRegistered = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private titleService: Title,
    private ngZone: NgZone
  ) {}

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
      controls[field.key] = this.fb.control(
        '',
        field.required ? [Validators.required] : []
      );
    }
    this.form = this.fb.group(controls);

    setTimeout(() => {
      this.initCalEmbed();
      this.registerCalEvents();
    }, 150);

    this.form.valueChanges.pipe(
      debounceTime(800),
      takeUntil(this.destroy$)
    ).subscribe(v => {
      this.initCalEmbed(v.fullName ?? '', v.email ?? '', v.notes ?? '');
    });
  }

  private initCalEmbed(name = '', email = '', notes = ''): void {
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
          this.pushGtmEvent('form_submit', this.config.type);
          this.cdr.markForCheck();
        },
        error: () => {
          this.submitting  = false;
          this.submitError = true;
          this.cdr.markForCheck();
        },
      });
  }

  // kept for template binding (error banner uses submitError set by onCalBookingConfirmed)
  isInvalid(key: string): boolean {
    const ctrl = this.form.get(key);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  trackByKey(_i: number, field: FormFieldDef): string {
    return field.key;
  }

  onSubmitAnother(): void {
    this.form.reset();
    this.submitted   = false;
    this.submitError = false;
    this.cdr.markForCheck();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  private pushGtmEvent(event: string, formType: string): void {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, form_type: formType });
  }
}
