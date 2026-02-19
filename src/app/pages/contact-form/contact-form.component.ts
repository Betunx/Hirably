import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// ── Replace with your Formspree form endpoint once created at formspree.io ──
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_ID';

export type ContactFormType = 'book-a-call' | 'start-hiring' | 'eor-services' | 'get-a-quote';
const VALID_TYPES: ContactFormType[] = ['book-a-call', 'start-hiring', 'eor-services', 'get-a-quote'];

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormFieldDef {
  key: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea';
  placeholder?: string;
  required: boolean;
  options?: SelectOption[];
  rows?: number;
  colSpan?: 1 | 2; // 1 = half width in 2-col grid, 2 = full width (default)
}

export interface FormBullet {
  text: string;
}

export interface ContactFormTheme {
  accentHex: string;   // main accent color (card top bar)
  submitBg: string;    // submit button background hex
  submitText: string;  // submit button text color hex
  bulletBg: string;    // bullet circle background hex
  bulletStroke: string; // bullet SVG checkmark stroke hex
}

export interface ContactFormConfig {
  type: ContactFormType;
  badgeBgClass: string;
  badgeTextClass: string;
  theme: ContactFormTheme;
  left: {
    badgeText: string;
    title: string;
    description: string;
    bullets: FormBullet[];
    imageSrc: string;
    imageAlt: string;
  };
  right: {
    formTitle: string;
    formSubtitle: string;
    submitLabel: string;
    fields: FormFieldDef[];
  };
}

// ── Select option lists ──────────────────────────────────────────────────────

const TIME_SLOTS: SelectOption[] = [
  { value: 'morning', label: 'Morning (9am – 12pm CST)' },
  { value: 'afternoon', label: 'Afternoon (12pm – 3pm CST)' },
  { value: 'evening', label: 'Evening (3pm – 5pm CST)' },
];

const TOPICS: SelectOption[] = [
  { value: 'recruitment', label: 'Recruitment' },
  { value: 'eor', label: 'EOR / Payroll' },
  { value: 'pricing', label: 'Pricing' },
  { value: 'general', label: 'General Inquiry' },
];

const INDUSTRIES: SelectOption[] = [
  { value: 'technology', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'other', label: 'Other' },
];

const POSITION_COUNTS: SelectOption[] = [
  { value: '1-5', label: '1–5 positions' },
  { value: '6-15', label: '6–15 positions' },
  { value: '16-50', label: '16–50 positions' },
  { value: '50+', label: '50+ positions' },
];

const EMPLOYEE_COUNTS: SelectOption[] = [
  { value: '1-10', label: '1–10 employees' },
  { value: '11-50', label: '11–50 employees' },
  { value: '51-200', label: '51–200 employees' },
  { value: '200+', label: '200+ employees' },
];

const COUNTRIES: SelectOption[] = [
  { value: 'mexico', label: 'Mexico' },
  { value: 'usa', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  { value: 'latam', label: 'Latin America' },
  { value: 'other', label: 'Other' },
];

const PAYROLL_SETUPS: SelectOption[] = [
  { value: 'none', label: 'No existing setup' },
  { value: 'inhouse', label: 'In-house payroll' },
  { value: 'contractors', label: 'Contractors only' },
  { value: 'vendor', label: 'Third-party vendor' },
];

const SERVICES: SelectOption[] = [
  { value: 'recruitment', label: 'Recruitment' },
  { value: 'eor', label: 'EOR / Compliance' },
  { value: 'full', label: 'Full-Service Staffing' },
  { value: 'payroll', label: 'Payroll Management' },
];

const TEAM_SIZES: SelectOption[] = [
  { value: '1-5', label: '1–5 people' },
  { value: '6-20', label: '6–20 people' },
  { value: '21-100', label: '21–100 people' },
  { value: '100+', label: '100+ people' },
];

const TIMELINES: SelectOption[] = [
  { value: 'immediate', label: 'Immediately' },
  { value: '1month', label: 'Within 1 month' },
  { value: '3months', label: '1–3 months' },
  { value: '6months', label: '3–6 months' },
];

// ── Static config map — one entry per form type ──────────────────────────────

const FORM_CONFIGS: Record<ContactFormType, ContactFormConfig> = {

  // ── BOOK A CALL — Yellow / Amber theme ──────────────────────────────────
  'book-a-call': {
    type: 'book-a-call',
    badgeBgClass: 'bg-bright-amber',
    badgeTextClass: 'text-navy-dark',
    theme: {
      accentHex: '#FFCF25',
      submitBg: '#FFCF25',
      submitText: '#111f78',
      bulletBg: '#FFCF25',
      bulletStroke: '#111f78',
    },
    left: {
      badgeText: 'Schedule a Call',
      title: "Let's Talk About Your Hiring Needs",
      description: "Book a free consultation with one of our nearshore specialists. We'll walk you through how Hirably can accelerate your team growth in Mexico.",
      bullets: [
        { text: 'Get answers to all your hiring questions' },
        { text: 'Learn about our process and timelines' },
        { text: 'Receive a tailored recommendation' },
      ],
      imageSrc: 'assets/img/talentman.png',
      imageAlt: 'Schedule a consultation',
    },
    right: {
      formTitle: 'Schedule Your Call',
      formSubtitle: "Fill in your details and we'll confirm your slot within 24 hours.",
      submitLabel: 'Book My Call',
      fields: [
        { key: 'fullName',  label: 'Full Name',            type: 'text',     placeholder: 'Jane Smith',               required: true,  colSpan: 1 },
        { key: 'company',   label: 'Company Name',         type: 'text',     placeholder: 'Acme Corp',                required: false, colSpan: 1 },
        { key: 'email',     label: 'Email Address',        type: 'email',    placeholder: 'jane@acme.com',            required: true,  colSpan: 1 },
        { key: 'phone',     label: 'Phone Number',         type: 'tel',      placeholder: '+1 (555) 000-0000',        required: true,  colSpan: 1 },
        { key: 'date',      label: 'Preferred Date',       type: 'date',                                              required: true,  colSpan: 1 },
        { key: 'timeSlot',  label: 'Preferred Time Slot',  type: 'select',   options: TIME_SLOTS,                     required: true,  colSpan: 1 },
        { key: 'topic',     label: 'Topic of Discussion',  type: 'select',   options: TOPICS,                         required: false, colSpan: 2 },
        { key: 'notes',     label: 'Additional Notes',     type: 'textarea', placeholder: "Anything specific you'd like to discuss? Let us know so we can prepare…", required: false, rows: 4, colSpan: 2 },
      ],
    },
  },

  // ── START HIRING — Blue theme ────────────────────────────────────────────
  'start-hiring': {
    type: 'start-hiring',
    badgeBgClass: 'bg-primary-blue',
    badgeTextClass: 'text-white',
    theme: {
      accentHex: '#2291ea',
      submitBg: '#111f78',
      submitText: '#ffffff',
      bulletBg: '#2291ea',
      bulletStroke: '#ffffff',
    },
    left: {
      badgeText: 'Start Hiring',
      title: 'Build Your Team in Mexico — Fast',
      description: "Tell us what you need and we'll start matching you with pre-vetted talent in days, not months.",
      bullets: [
        { text: 'Access 10,000+ pre-vetted candidates' },
        { text: 'Average hire in 20 business days' },
        { text: '$0 upfront fees, pay only on success' },
      ],
      imageSrc: 'assets/img/bigtalentman.png',
      imageAlt: 'Start hiring talent in Mexico',
    },
    right: {
      formTitle: 'Staffing Request',
      formSubtitle: "Share your requirements and we'll send you matching profiles within 72 hours.",
      submitLabel: 'Submit Request',
      fields: [
        { key: 'fullName',      label: 'Full Name',               type: 'text',     placeholder: 'Jane Smith',                                        required: true,  colSpan: 1 },
        { key: 'company',       label: 'Company Name',            type: 'text',     placeholder: 'Acme Corp',                                         required: true,  colSpan: 1 },
        { key: 'email',         label: 'Email Address',           type: 'email',    placeholder: 'jane@acme.com',                                     required: true,  colSpan: 1 },
        { key: 'phone',         label: 'Phone Number',            type: 'tel',      placeholder: '+1 (555) 000-0000',                                 required: false, colSpan: 1 },
        { key: 'industry',      label: 'Industry / Sector',       type: 'select',   options: INDUSTRIES,                                              required: true,  colSpan: 1 },
        { key: 'positions',     label: 'Number of Positions',     type: 'select',   options: POSITION_COUNTS,                                         required: true,  colSpan: 1 },
        { key: 'requirements',  label: 'Job Role & Requirements', type: 'textarea', placeholder: 'Describe the role, skills, and experience needed…', required: true,  colSpan: 2, rows: 5 },
      ],
    },
  },

  // ── EOR SERVICES — Green theme ───────────────────────────────────────────
  'eor-services': {
    type: 'eor-services',
    badgeBgClass: 'bg-mint-green',
    badgeTextClass: 'text-emerald',
    theme: {
      accentHex: '#10b981',
      submitBg: '#10b981',
      submitText: '#ffffff',
      bulletBg: '#10b981',
      bulletStroke: '#ffffff',
    },
    left: {
      badgeText: 'EOR Services',
      title: 'Compliant Employment in Mexico, Handled for You',
      description: "Let Hirably be your Employer of Record. We manage payroll, taxes, and full legal compliance so you can focus on growth.",
      bullets: [
        { text: '100% legal compliance guaranteed' },
        { text: 'Payroll processed on time, every time' },
        { text: 'Dedicated HR support included' },
      ],
      imageSrc: 'assets/img/dash.jpg',
      imageAlt: 'EOR compliance services',
    },
    right: {
      formTitle: 'EOR Inquiry',
      formSubtitle: "Tell us about your current situation and we'll show you how EOR simplifies it.",
      submitLabel: 'Submit Inquiry',
      fields: [
        { key: 'fullName',      label: 'Full Name',              type: 'text',     placeholder: 'Jane Smith',           required: true,  colSpan: 1 },
        { key: 'company',       label: 'Company Name',           type: 'text',     placeholder: 'Acme Corp',            required: true,  colSpan: 1 },
        { key: 'email',         label: 'Email Address',          type: 'email',    placeholder: 'jane@acme.com',        required: true,  colSpan: 1 },
        { key: 'phone',         label: 'Phone Number',           type: 'tel',      placeholder: '+1 (555) 000-0000',    required: false, colSpan: 1 },
        { key: 'country',       label: 'Country / Region',       type: 'select',   options: COUNTRIES,                  required: true,  colSpan: 1 },
        { key: 'employeeCount', label: 'Number of Employees',    type: 'select',   options: EMPLOYEE_COUNTS,            required: true,  colSpan: 1 },
        { key: 'payrollSetup',  label: 'Current Payroll Setup',  type: 'select',   options: PAYROLL_SETUPS,             required: false, colSpan: 2 },
        { key: 'requirements',  label: 'Requirements & Details', type: 'textarea', placeholder: 'Describe your needs…', required: true,  colSpan: 2, rows: 4 },
      ],
    },
  },

  // ── GET A QUOTE — Purple theme ───────────────────────────────────────────
  'get-a-quote': {
    type: 'get-a-quote',
    badgeBgClass: 'bg-lavender',
    badgeTextClass: 'text-purple-accent',
    theme: {
      accentHex: '#6c59d8',
      submitBg: '#6c59d8',
      submitText: '#ffffff',
      bulletBg: '#6c59d8',
      bulletStroke: '#ffffff',
    },
    left: {
      badgeText: 'Get a Quote',
      title: 'A Custom Plan Built Around Your Business',
      description: "Every company is different. Tell us what you're building and we'll put together a pricing proposal tailored to your needs.",
      bullets: [
        { text: 'Transparent, all-inclusive pricing' },
        { text: 'No hidden fees or surprise costs' },
        { text: 'Quote delivered within 1 business day' },
      ],
      imageSrc: 'assets/img/layerdash.png',
      imageAlt: 'Request a custom quote',
    },
    right: {
      formTitle: 'Request a Quote',
      formSubtitle: "Give us a few details and we'll send you a tailored proposal.",
      submitLabel: 'Request Quote',
      fields: [
        { key: 'fullName',  label: 'Full Name',              type: 'text',     placeholder: 'Jane Smith',                                        required: true,  colSpan: 1 },
        { key: 'company',   label: 'Company Name',           type: 'text',     placeholder: 'Acme Corp',                                         required: true,  colSpan: 1 },
        { key: 'email',     label: 'Email Address',          type: 'email',    placeholder: 'jane@acme.com',                                     required: true,  colSpan: 1 },
        { key: 'phone',     label: 'Phone Number',           type: 'tel',      placeholder: '+1 (555) 000-0000',                                 required: false, colSpan: 1 },
        { key: 'service',   label: 'Service Interested In',  type: 'select',   options: SERVICES,                                                required: true,  colSpan: 1 },
        { key: 'teamSize',  label: 'Team Size',              type: 'select',   options: TEAM_SIZES,                                              required: true,  colSpan: 1 },
        { key: 'timeline',  label: 'Timeline',               type: 'select',   options: TIMELINES,                                               required: false, colSpan: 2 },
        { key: 'details',   label: 'Project Details',        type: 'textarea', placeholder: "Tell us more about what you're looking to build…", required: true,  colSpan: 2, rows: 5 },
      ],
    },
  },

};

// ── Component ────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements OnInit, OnDestroy {

  config!: ContactFormConfig;
  form!: FormGroup;
  submitting = false;
  submitted = false;
  submitError = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
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
        this.config = FORM_CONFIGS[type];
        this.buildForm();
        this.submitted = false;
        this.submitting = false;
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
      return;
    }
    this.submitting = true;
    this.submitError = false;
    this.cdr.markForCheck();

    const payload = {
      ...this.form.value,
      _form_type: this.config.type,
      _subject: `Hirably Form: ${this.config.right.formTitle}`,
    };

    this.http.post(FORMSPREE_ENDPOINT, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.submitting = false;
          this.submitted = true;
          this.cdr.markForCheck();
        },
        error: () => {
          this.submitting = false;
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
}
