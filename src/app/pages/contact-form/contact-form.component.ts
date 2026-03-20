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
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment';

declare global { interface Window { dataLayer: unknown[]; } }

// ── Formspree ─────────────────────────────────────────────────────────────
const FORMSPREE_ENDPOINT = environment.formspreeEndpoint;

// ── Cal.com ────────────────────────────────────────────────────────────────
const CAL_EVENT_ID   = environment.calEventId;
const CAL_TIMEZONE   = environment.calTimezone;

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
  sectionLabel?: string; // if set, renders a divider + label before this field
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
  secondaryBadge?: string;
  theme: ContactFormTheme;
  left: {
    badgeText: string;
    title: string;
    description: string;
    bullets: FormBullet[];
    imageSrc?: string;
    imageAlt?: string;
  };
  includedItems?: string[];
  tipNote?: string;
  callDetails?: {
    duration: string;
    platform: string;
    confirmationNote: string;
  };
  testimonial?: {
    quote: string;
    attribution: string;
  };
  right: {
    formTitle: string;
    formSubtitle: string;
    submitLabel: string;
    fields: FormFieldDef[];
    footerNote?: string;
  };
}

// ── Select option lists ──────────────────────────────────────────────────────

const HIRING_INTERESTS: SelectOption[] = [
  { value: 'full-service',  label: 'Hirably Complete (Staffing + EOR)' },
  { value: 'eor',           label: 'Hirably EOR (Bring My Own Talent)' },
  { value: 'recruitment',   label: 'Hirably Recruitment (Headhunting)' },
  { value: 'not-sure',      label: 'Not sure yet — help me decide' },
];

const CALL_TOPICS: SelectOption[] = [
  { value: 'general',    label: 'General overview / How it works' },
  { value: 'pricing',    label: 'Pricing & plan comparison' },
  { value: 'compliance', label: 'Compliance & legal questions' },
  { value: 'scaling',    label: 'Scaling an existing team in Mexico' },
  { value: 'migration',  label: 'Migrating contractors to full-time' },
  { value: 'other',      label: 'Other' },
];

const HEADCOUNTS: SelectOption[] = [
  { value: '1',    label: '1' },
  { value: '2-3',  label: '2–3' },
  { value: '4-10', label: '4–10' },
  { value: '10+',  label: '10+' },
];

const SENIORITY_LEVELS: SelectOption[] = [
  { value: 'junior', label: 'Junior (0–2 yrs)' },
  { value: 'mid',    label: 'Mid-Level (2–5 yrs)' },
  { value: 'senior', label: 'Senior (5–8 yrs)' },
  { value: 'lead',   label: 'Lead / Staff (8+ yrs)' },
];

const START_TIMELINES: SelectOption[] = [
  { value: 'asap',      label: 'ASAP' },
  { value: '2-weeks',   label: 'Within 2 weeks' },
  { value: '1-month',   label: 'Within a month' },
  { value: 'flexible',  label: 'Flexible / Exploring' },
];

const MONTHLY_BUDGETS: SelectOption[] = [
  { value: '1500-2500', label: '$1,500 – $2,500' },
  { value: '2500-4000', label: '$2,500 – $4,000' },
  { value: '4000-6000', label: '$4,000 – $6,000' },
  { value: '6000+',     label: '$6,000+' },
  { value: 'unsure',    label: 'Not sure yet' },
];

const WORK_SCHEDULES: SelectOption[] = [
  { value: 'us-hours', label: 'US business hours' },
  { value: 'overlap',  label: '4+ hrs overlap with US' },
  { value: 'flexible', label: 'Flexible / async' },
];

const ENGLISH_LEVELS: SelectOption[] = [
  { value: 'native',         label: 'Native / Bilingual' },
  { value: 'fluent',         label: 'Fluent (C1+)' },
  { value: 'conversational', label: 'Conversational (B2)' },
  { value: 'basic',          label: 'Basic is fine' },
];

const EOR_HEADCOUNTS: SelectOption[] = [
  { value: '1',    label: '1' },
  { value: '2-5',  label: '2–5' },
  { value: '6-15', label: '6–15' },
  { value: '15+',  label: '15+' },
];

const EOR_TIMELINES: SelectOption[] = [
  { value: 'asap',     label: 'ASAP' },
  { value: '2-weeks',  label: 'Within 2 weeks' },
  { value: '1-month',  label: 'Within a month' },
  { value: 'flexible', label: 'Flexible' },
];

const EMPLOYEE_LOCATIONS: SelectOption[] = [
  { value: 'already-mexico', label: 'Already in Mexico' },
  { value: 'relocating',     label: 'Relocating to Mexico' },
  { value: 'remote-mx',      label: 'Remote within Mexico' },
  { value: 'not-sure',       label: 'Not sure yet' },
];

const CURRENT_SETUPS: SelectOption[] = [
  { value: 'contractors', label: 'Paying as contractors' },
  { value: 'own-entity',  label: 'Have our own MX entity' },
  { value: 'nothing',     label: 'Not yet employed' },
  { value: 'other-eor',   label: 'Using another EOR' },
];

const PAYROLL_CURRENCIES: SelectOption[] = [
  { value: 'usd',  label: 'USD' },
  { value: 'mxn',  label: 'MXN' },
  { value: 'both', label: 'Both / Flexible' },
];

const QUOTE_TIMELINES: SelectOption[] = [
  { value: 'asap',      label: 'ASAP' },
  { value: '2-weeks',   label: 'Within 2 weeks' },
  { value: '1-month',   label: 'Within a month' },
  { value: 'flexible',  label: 'Flexible / Planning ahead' },
];

const SALARY_RANGES: SelectOption[] = [
  { value: '15-25k',         label: '$15,000 – $25,000' },
  { value: '25-40k',         label: '$25,000 – $40,000' },
  { value: '40-60k',         label: '$40,000 – $60,000' },
  { value: '60k+',           label: '$60,000+' },
  { value: 'need-benchmarks',label: 'I need salary benchmarks' },
];

const ENTITY_STATUS: SelectOption[] = [
  { value: 'yes',         label: 'Yes — fully operational' },
  { value: 'setting-up',  label: 'Setting one up currently' },
  { value: 'no',          label: 'No — I might need EOR too' },
];

const EMPLOYEE_COUNTS: SelectOption[] = [
  { value: '1-10', label: '1–10 employees' },
  { value: '11-50', label: '11–50 employees' },
  { value: '51-200', label: '51–200 employees' },
  { value: '200+', label: '200+ employees' },
];

// ── Get-a-Quote fields (full form from JSX) ──────────────────────────────────

const GET_QUOTE_FIELDS: FormFieldDef[] = [
  { key: 'fullName',       label: 'Full Name',                        type: 'text',    placeholder: 'Jane Smith',                                                                            required: true,  colSpan: 1 },
  { key: 'company',        label: 'Company Name',                     type: 'text',    placeholder: 'Acme Corp',                                                                             required: true,  colSpan: 1 },
  { key: 'email',          label: 'Work Email',                       type: 'email',   placeholder: 'jane@acme.com',                                                                         required: true,  colSpan: 1 },
  { key: 'phone',          label: 'Phone Number',                     type: 'tel',     placeholder: '+1 (555) 000-0000',                                                                     required: false, colSpan: 1 },
  { key: 'roles',          label: "Role(s) You Need to Fill",         type: 'text',    placeholder: 'e.g. Accountant, Operations Manager, QA Engineer',                                     required: true,  colSpan: 2, sectionLabel: 'Hiring Details' },
  { key: 'headcount',      label: 'How Many Positions?',              type: 'select',  options: HEADCOUNTS,                                                                                  required: true,  colSpan: 1 },
  { key: 'seniorityLevel', label: 'Seniority Level',                  type: 'select',  options: SENIORITY_LEVELS,                                                                            required: true,  colSpan: 1 },
  { key: 'timeline',       label: 'Timeline',                         type: 'select',  options: QUOTE_TIMELINES,                                                                             required: true,  colSpan: 1 },
  { key: 'salaryRange',    label: 'Expected Salary Range (MXN/mo)',   type: 'select',  options: SALARY_RANGES,                                                                               required: false, colSpan: 1 },
  { key: 'entityStatus',   label: 'Do You Have a Mexican Entity?',    type: 'select',  options: ENTITY_STATUS,                                                                               required: true,  colSpan: 2 },
  { key: 'notes',          label: 'Tell Us About Your Needs',         type: 'textarea', placeholder: 'Role details, skills required, team structure, or anything that helps us prepare…',  required: true,  colSpan: 2, rows: 3 },
];

// ── EOR fields (full form from JSX) ──────────────────────────────────────────

const EOR_FIELDS: FormFieldDef[] = [
  { key: 'fullName',         label: 'Full Name',                    type: 'text',    placeholder: 'Jane Smith',                                                              required: true,  colSpan: 1 },
  { key: 'company',          label: 'Company Name',                 type: 'text',    placeholder: 'Acme Corp',                                                               required: true,  colSpan: 1 },
  { key: 'email',            label: 'Work Email',                   type: 'email',   placeholder: 'jane@acme.com',                                                           required: true,  colSpan: 1 },
  { key: 'phone',            label: 'Phone Number',                 type: 'tel',     placeholder: '+1 (555) 000-0000',                                                       required: false, colSpan: 1 },
  { key: 'headcount',        label: 'How Many Employees?',          type: 'select',  options: EOR_HEADCOUNTS,                                                                required: true,  colSpan: 1, sectionLabel: 'Employment Details' },
  { key: 'timeline',         label: 'When Do You Need to Start?',   type: 'select',  options: EOR_TIMELINES,                                                                 required: true,  colSpan: 1 },
  { key: 'employeeLocation', label: 'Where Are They Based?',        type: 'select',  options: EMPLOYEE_LOCATIONS,                                                            required: true,  colSpan: 1 },
  { key: 'currentSetup',     label: 'Current Employment Setup',     type: 'select',  options: CURRENT_SETUPS,                                                                required: false, colSpan: 1 },
  { key: 'payrollCurrency',  label: 'Preferred Invoice Currency',   type: 'select',  options: PAYROLL_CURRENCIES,                                                            required: false, colSpan: 2 },
  { key: 'notes',            label: 'Tell Us About Your Needs',     type: 'textarea', placeholder: 'Roles, current setup, specific compliance concerns, anything else…',     required: true,  colSpan: 2, rows: 3 },
];

// ── Start-Hiring fields (full form from JSX) ─────────────────────────────────

const START_HIRING_FIELDS: FormFieldDef[] = [
  { key: 'fullName',       label: 'Full Name',                      type: 'text',    placeholder: 'Jane Smith',                                                       required: true,  colSpan: 1 },
  { key: 'company',        label: 'Company Name',                   type: 'text',    placeholder: 'Acme Corp',                                                        required: true,  colSpan: 1 },
  { key: 'email',          label: 'Work Email',                     type: 'email',   placeholder: 'jane@acme.com',                                                    required: true,  colSpan: 1 },
  { key: 'phone',          label: 'Phone Number',                   type: 'tel',     placeholder: '+1 (555) 000-0000',                                                required: false, colSpan: 1 },
  { key: 'roles',          label: "Role(s) You're Hiring For",      type: 'text',    placeholder: 'e.g. Full-Stack Developer, SDR, Customer Support',                 required: true,  colSpan: 2, sectionLabel: 'Role Details' },
  { key: 'headcount',      label: 'How Many People?',               type: 'select',  options: HEADCOUNTS,                                                             required: true,  colSpan: 1 },
  { key: 'seniorityLevel', label: 'Seniority Level',                type: 'select',  options: SENIORITY_LEVELS,                                                       required: true,  colSpan: 1 },
  { key: 'timeline',       label: 'Timeline',                       type: 'select',  options: START_TIMELINES,                                                        required: true,  colSpan: 1 },
  { key: 'monthlyBudget',  label: 'Monthly Budget per Person',      type: 'select',  options: MONTHLY_BUDGETS,                                                        required: false, colSpan: 1 },
  { key: 'workSchedule',   label: 'Work Schedule',                  type: 'select',  options: WORK_SCHEDULES,                                                         required: false, colSpan: 1 },
  { key: 'englishLevel',   label: 'English Level Required',         type: 'select',  options: ENGLISH_LEVELS,                                                         required: false, colSpan: 1 },
  { key: 'notes',          label: 'Anything Else We Should Know?',  type: 'textarea', placeholder: 'Tech stack, team culture, must-have skills, nice-to-haves…',     required: false, colSpan: 2, rows: 3 },
];

// ── Book-a-Call fields (full form from JSX) ──────────────────────────────────

const BOOK_A_CALL_FIELDS: FormFieldDef[] = [
  { key: 'fullName',       label: 'Full Name',                   type: 'text',     placeholder: 'Jane Smith',                                                              required: true,  colSpan: 1 },
  { key: 'company',        label: 'Company Name',                type: 'text',     placeholder: 'Acme Corp',                                                               required: false, colSpan: 1 },
  { key: 'email',          label: 'Email Address',               type: 'email',    placeholder: 'jane@acme.com',                                                           required: true,  colSpan: 1 },
  { key: 'phone',          label: 'Phone Number',                type: 'tel',      placeholder: '+1 (555) 000-0000',                                                       required: true,  colSpan: 1 },
  { key: 'companySize',    label: 'Company Size',                type: 'select',   options: EMPLOYEE_COUNTS,                                                               required: false, colSpan: 1, sectionLabel: 'Help Us Prepare' },
  { key: 'hiringInterest', label: 'What Are You Interested In?', type: 'select',   options: HIRING_INTERESTS,                                                              required: false, colSpan: 1 },
  { key: 'topic',          label: 'Topic of Discussion',         type: 'select',   options: CALL_TOPICS,                                                                   required: false, colSpan: 2 },
  { key: 'notes',          label: 'Additional Notes',            type: 'textarea', placeholder: "Anything specific you'd like to discuss? Let us know so we can prepare…", required: false, colSpan: 2, rows: 3 },
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
      title: "Let's Talk About Your\nHiring Needs",
      description: "Book a free 20-minute discovery call with one of our nearshore specialists. We'll walk you through how Hirably works and give you a tailored recommendation — no pressure, no commitment.",
      bullets: [
        { text: 'Get answers to all your hiring-in-Mexico questions' },
        { text: 'Learn about our process, timelines, and pricing' },
        { text: 'Receive a tailored recommendation for your team' },
        { text: 'No sales pressure — just a real conversation' },
      ],
      imageSrc: 'assets/img/handshake.jpg',
      imageAlt: 'Schedule a consultation',
    },
    callDetails: {
      duration: '20 minutes',
      platform: 'Google Meet or Zoom — your choice',
      confirmationNote: "We'll confirm your slot within 24 hours via email.",
    },
    right: {
      formTitle: 'Schedule Your Call',
      formSubtitle: "Fill in your details and we'll confirm your slot within 24 hours.",
      submitLabel: 'Book My Call',
      fields: BOOK_A_CALL_FIELDS,
      footerNote: "Free 20-minute call. No commitment. We'll confirm via email within 24 hours.",
    },
  },

  // ── START HIRING — Blue theme ────────────────────────────────────────────
  'start-hiring': {
    type: 'start-hiring',
    badgeBgClass: 'bg-navy-dark',
    badgeTextClass: 'text-bright-amber',
    secondaryBadge: '★ MOST POPULAR',
    theme: {
      accentHex: '#2291ea',
      submitBg: '#102076',
      submitText: '#ffffff',
      bulletBg: '#2291ea',
      bulletStroke: '#ffffff',
    },
    left: {
      badgeText: 'Start Hiring',
      title: 'A Custom Plan Built Around Your Business',
      description: "Every company is different. Tell us what you're building and we'll put together a plan tailored to your needs — recruitment, compliance, payroll, and HR all handled under one rate.",
      bullets: [
        { text: 'Transparent, all-inclusive pricing' },
        { text: 'No hidden fees or surprise costs' },
        { text: '$0 upfront — pay only on success' },
        { text: 'Dedicated account manager from day one' },
        { text: 'Lifetime replacement guarantee' },
      ],
      imageSrc: 'assets/img/hire.jpg',
      imageAlt: 'Start hiring talent in Mexico',
    },
    testimonial: {
      quote: '"Hirably built a plan that fit exactly what we needed — three developers and a designer, all compliant, one invoice. It felt like they were part of our team from day one."',
      attribution: '— Head of Operations, Growth-Stage Fintech',
    },
    right: {
      formTitle: 'Hirably Complete',
      formSubtitle: 'Tell us about your hiring needs and schedule a call to build your custom plan.',
      submitLabel: 'Book My Consultation',
      fields: START_HIRING_FIELDS,
      footerNote: "Free 30-minute consultation. We'll confirm your slot within 24 hours and come prepared with a custom plan.",
    },
  },

  // ── EOR SERVICES — Teal theme ────────────────────────────────────────────
  'eor-services': {
    type: 'eor-services',
    badgeBgClass: 'bg-[#0C6C9F]',
    badgeTextClass: 'text-white',
    theme: {
      accentHex: '#0C6C9F',
      submitBg: '#0C6C9F',
      submitText: '#ffffff',
      bulletBg: '#0C6C9F',
      bulletStroke: '#ffffff',
    },
    left: {
      badgeText: 'EOR Services',
      title: 'Compliant Employment in Mexico, Handled for You',
      description: "You already found the right person — let Hirably be their legal employer in Mexico. We handle payroll, taxes, benefits, and full labor compliance so you can focus on growth.",
      bullets: [],
    },
    includedItems: [
      'Mexican legal entity acts as employer',
      'Compliant contracts drafted & managed',
      'Monthly payroll, tax withholding & filing',
      'IMSS, Infonavit & all statutory benefits',
      'Ongoing HR support for you and your employee',
      'One consolidated USD invoice — no surprises',
    ],
    tipNote: 'Already paying contractors in Mexico? We can help you convert them to full-time employees compliantly — often within 2 weeks.',
    right: {
      formTitle: 'Hirably EOR',
      formSubtitle: 'Tell us about your situation and schedule a call to walk through how EOR works for you.',
      submitLabel: 'Book My EOR Consultation',
      fields: EOR_FIELDS,
      footerNote: "Free 20-minute call. We'll confirm your slot within 24 hours and walk you through the full EOR process.",
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
      title: 'Find the Right People for Your Team in Mexico',
      description: "You have the entity — we have the talent. Tell us what you need and we'll source, vet, and deliver bilingual candidates matched to your requirements.",
      bullets: [
        { text: 'Access 10,000+ pre-vetted candidates' },
        { text: 'Average hire in 20 business days' },
        { text: 'Bilingual candidate profiles included' },
        { text: 'Background checks on every candidate' },
        { text: '60-day replacement guarantee' },
      ],
      imageSrc: 'assets/img/question.jpg',
      imageAlt: 'Request a custom quote',
    },
    tipNote: "Don't have a Mexican entity? No problem — check out Hirably Complete where we handle recruitment AND employment under one all-inclusive rate.",
    right: {
      formTitle: 'Hirably Recruitment',
      formSubtitle: 'Tell us about the roles you need to fill and schedule a call to get a tailored quote.',
      submitLabel: 'Book My Call & Get a Quote',
      fields: GET_QUOTE_FIELDS,
      footerNote: "Free 20-minute call. We'll confirm your slot within 24 hours and come prepared with a quote.",
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

    const { fullName, email, notes } = this.form.value;
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
            this.createCalBooking(fullName, email, notes ?? '');
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
