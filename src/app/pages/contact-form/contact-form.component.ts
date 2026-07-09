import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AnalyticsService } from '@services/analytics.service';
import {
  ContactFormType,
  ContactFormConfig,
  VALID_TYPES,
  FORM_CONFIGS,
} from './contact-form.config';
import { workEmailValidator } from './work-email.validator';
import { BookingStateService } from './booking-state.service';

const FORMSPREE_ENDPOINT = environment.formspreeEndpoint;

/**
 * Step 1 of the booking flow: collects the visitor's details for a given form
 * type. On a valid submit it captures the lead (POST to Formspree, so it is not
 * lost if they never finish scheduling) and hands off to the dedicated booking
 * page (/contact/:type/agendar) which mounts the Cal.com calendar.
 */
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

  private readonly destroy$ = new Subject<void>();
  private formStarted = false;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly titleService = inject(Title);
  private readonly analytics = inject(AnalyticsService);
  private readonly bookingState = inject(BookingStateService);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const type = params.get('type') as ContactFormType;
        if (!VALID_TYPES.includes(type)) {
          this.router.navigate(['/']);
          return;
        }
        this.config      = FORM_CONFIGS[type];
        this.formStarted = false;
        this.titleService.setTitle(`${this.config.right.formTitle} — Hirably`);
        this.buildForm();
        this.applyPrefill();
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
    // Honeypot — not a real field; hidden in the template. Bots tend to autofill
    // it, and a non-empty value makes Formspree silently drop the submission.
    controls['_honeypot'] = this.fb.control('');
    this.form = this.fb.group(controls);
  }

  /**
   * Prefill from query params (e.g. the hero inline form passes
   * ?firstName=&lastName=&email=). Generic across form types.
   */
  private applyPrefill(): void {
    const qp = this.route.snapshot.queryParamMap;
    const patch: Record<string, string> = {};
    for (const field of this.config.right.fields) {
      const value = qp.get(field.key);
      if (value) patch[field.key] = value;
    }
    if (Object.keys(patch).length > 0) this.form.patchValue(patch);
  }

  /** Full name for Cal.com prefill / Formspree, handling both field layouts. */
  private displayName(v: { firstName?: string; lastName?: string; fullName?: string }): string {
    if (this.config.type === 'book-a-call') return `${v.firstName ?? ''} ${v.lastName ?? ''}`.trim();
    return v.fullName ?? '';
  }

  // Fires once when the user first interacts with any form field.
  onFormStart(): void {
    if (this.formStarted) return;
    this.formStarted = true;
    this.analytics.formStart(this.config.type, 'contact');
  }

  /**
   * Validate, capture the lead, and hand off to the scheduling page. The
   * Formspree POST is fire-and-forget so a transient hiccup never blocks the
   * visitor from reaching the calendar — the booking + Cal's own email remain a
   * safety net.
   */
  onContinue(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.cdr.markForCheck();
      return;
    }

    const v = this.form.value;
    const name = this.displayName(v);
    const email = v.email ?? '';

    // Split the honeypot out of the real fields and forward it as Formspree's
    // native `_gotcha`, so spam bots that fill it get dropped server-side.
    const { _honeypot, ...fields } = v;

    const payload = {
      ...fields,
      _gotcha:    _honeypot ?? '',
      _form_type: this.config.type,
      _name:      name,
      _subject:   `Hirably Form: ${this.config.right.formTitle}`,
      _replyto:   email,
    };

    // Fire-and-forget, intentionally OFF the component lifecycle: we navigate to
    // the Cal page on the next line, which destroys this component. A
    // takeUntil(destroy$) here would abort the in-flight request before Formspree
    // received it — that was why contact leads never showed up in Formspree.
    // HttpClient completes after one response, so this subscription self-cleans.
    this.http.post(FORMSPREE_ENDPOINT, payload)
      .subscribe({ error: err => console.error('Lead capture failed', err) });

    this.analytics.generateLead('contact_form', this.config.type);

    this.bookingState.set(this.config.type, { name, email, notes: v.notes ?? '' });
    this.router.navigate(['/contact', this.config.type, 'agendar']);
  }

  isInvalid(key: string): boolean {
    const ctrl = this.form.get(key);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
