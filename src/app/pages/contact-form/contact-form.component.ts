import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ContactFormType,
  ContactFormConfig,
  FormFieldDef,
  VALID_TYPES,
  FORM_CONFIGS,
} from './contact-form.config';

declare global { interface Window { dataLayer: unknown[]; } }

// ── Formspree ─────────────────────────────────────────────────────────────
const FORMSPREE_ENDPOINT = environment.formspreeEndpoint;

// ── Cal.com ────────────────────────────────────────────────────────────────
const CAL_EVENT_ID   = environment.calEventId;
const CAL_TIMEZONE   = environment.calTimezone;

// ── Component ────────────────────────────────────────────────────────────────

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
  submitting    = false;
  submitted     = false;
  submitError   = false;
  calBookingError = false;

  // Cal.com slot picker state
  selectedDate   = '';
  availableSlots: string[] = [];
  selectedSlot: string | null = null;
  loadingSlots   = false;

  // Mini calendar state
  calMonth = new Date().getMonth();
  calYear  = new Date().getFullYear();
  readonly calWeekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  get isBookACall(): boolean { return this.config?.type === 'book-a-call'; }

  get calMonthName(): string {
    return new Date(this.calYear, this.calMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  get calDays(): (number | null)[] {
    const firstWeekday = new Date(this.calYear, this.calMonth, 1).getDay();
    const totalDays    = new Date(this.calYear, this.calMonth + 1, 0).getDate();
    const cells: (number | null)[] = Array(firstWeekday).fill(null);
    for (let d = 1; d <= totalDays; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }

  get canGoPrevMonth(): boolean {
    const now = new Date();
    return this.calYear > now.getFullYear() || (this.calYear === now.getFullYear() && this.calMonth > now.getMonth());
  }

  isDayPast(day: number): boolean {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return new Date(this.calYear, this.calMonth, day) < today;
  }

  isDaySelected(day: number): boolean {
    return this.selectedDate === `${this.calYear}-${String(this.calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  isDayToday(day: number): boolean {
    const n = new Date();
    return day === n.getDate() && this.calMonth === n.getMonth() && this.calYear === n.getFullYear();
  }

  private readonly destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private titleService: Title
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
        this.config       = FORM_CONFIGS[type];
        this.titleService.setTitle(`${this.config.right.formTitle} — Hirably`);
        this.buildForm();
        this.submitted    = false;
        this.submitting   = false;
        this.submitError  = false;
        this.selectedDate   = '';
        this.selectedSlot   = null;
        this.availableSlots = [];
        this.loadingSlots   = false;
        this.calMonth = new Date().getMonth();
        this.calYear  = new Date().getFullYear();
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
  }

  isInvalid(key: string): boolean {
    const ctrl = this.form.get(key);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  trackByKey(_i: number, field: FormFieldDef): string {
    return field.key;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.cdr.markForCheck();
      setTimeout(() => {
        const el = document.querySelector('input.ng-invalid, select.ng-invalid, textarea.ng-invalid') as HTMLElement;
        if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.focus(); }
      }, 50);
      return;
    }
    this.submitting  = true;
    this.submitError = false;
    this.cdr.markForCheck();

    const { fullName, email } = this.form.value;
    const slotLabel = this.selectedSlot
      ? new Date(this.selectedSlot).toLocaleString('en-US', { timeZone: CAL_TIMEZONE, dateStyle: 'medium', timeStyle: 'short' })
      : 'Not scheduled';

    const payload = {
      ...this.form.value,
      _form_type:      this.config.type,
      _subject:        `Hirably Form: ${this.config.right.formTitle}`,
      _replyto:        email ?? '',
      _scheduled_slot: slotLabel,
    };

    this.http.post(FORMSPREE_ENDPOINT, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          if (this.selectedSlot && fullName && email) {
            this.createCalBooking(fullName, email, this.form.value['notes'] ?? '');
          } else {
            this.submitting = false;
            this.submitted  = true;
            this.pushGtmEvent('form_submit', this.config.type);
            this.cdr.markForCheck();
          }
        },
        error: () => {
          this.submitting  = false;
          this.submitError = true;
          this.cdr.markForCheck();
        },
      });
  }

  onSubmitAnother(): void {
    this.form.reset();
    this.submitted = false;
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

  // ── Mini calendar navigation ─────────────────────────────────────────────

  prevMonth(): void {
    if (!this.canGoPrevMonth) return;
    this.calMonth === 0 ? (this.calMonth = 11, this.calYear--) : this.calMonth--;
    this.cdr.markForCheck();
  }

  nextMonth(): void {
    this.calMonth === 11 ? (this.calMonth = 0, this.calYear++) : this.calMonth++;
    this.cdr.markForCheck();
  }

  selectDay(day: number): void {
    if (this.isDayPast(day)) return;
    const date = `${this.calYear}-${String(this.calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    this.selectedDate   = date;
    this.selectedSlot   = null;
    this.availableSlots = [];
    this.loadingSlots   = true;
    this.cdr.markForCheck();
    this.fetchSlots(date);
  }

  private fetchSlots(date: string): void {
    const startTime = `${date}T07:00:00.000Z`;
    const next = new Date(date); next.setDate(next.getDate() + 1);
    const endTime = `${next.toISOString().split('T')[0]}T06:59:59.000Z`;
    this.http.get<{ slots: Record<string, { time: string }[]> }>(
      '/api/slots',
      { params: { eventTypeId: String(CAL_EVENT_ID), startTime, endTime, timeZone: CAL_TIMEZONE } }
    ).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.availableSlots = (res.slots?.[date] ?? []).map(s => s.time);
        this.loadingSlots   = false;
        this.cdr.markForCheck();
      },
      error: () => { this.loadingSlots = false; this.cdr.markForCheck(); },
    });
  }

  selectSlot(slot: string): void {
    this.selectedSlot = slot;
    this.cdr.markForCheck();
  }

  formatSlotTime(iso: string): string {
    return new Date(iso).toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: true, timeZone: CAL_TIMEZONE,
    });
  }

  private createCalBooking(name: string, email: string, notes: string): void {
    const end = new Date(new Date(this.selectedSlot!).getTime() + 30 * 60 * 1000).toISOString();
    this.http.post(
      '/api/bookings',
      {
        eventTypeId: CAL_EVENT_ID,
        start: this.selectedSlot,
        end,
        responses: { name, email },
        timeZone: CAL_TIMEZONE,
        language: 'en',
        metadata: {},
      }
    ).pipe(takeUntil(this.destroy$)).subscribe({
      next:  () => { this.submitting = false; this.submitted = true; this.pushGtmEvent('booking_confirmed', this.config.type); this.cdr.markForCheck(); },
      error: () => { this.submitting = false; this.submitted = true; this.calBookingError = true; this.cdr.markForCheck(); },
    });
  }
}
