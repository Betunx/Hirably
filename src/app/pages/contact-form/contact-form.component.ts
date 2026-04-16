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
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ContactFormType,
  ContactFormConfig,
  FormFieldDef,
  VALID_TYPES,
  FORM_CONFIGS,
} from './contact-form.config';

declare global { interface Window { dataLayer: unknown[]; } }

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
        this.config      = FORM_CONFIGS[type];
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

    const { email } = this.form.value;
    const payload = {
      ...this.form.value,
      _form_type: this.config.type,
      _subject:   `Hirably Form: ${this.config.right.formTitle}`,
      _replyto:   email ?? '',
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
