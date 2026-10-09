import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef, HostListener, ViewChild, computed, inject, signal
} from '@angular/core';
import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnalyticsService } from '@services/analytics.service';
import { CalculatorContextService } from '@services/calculator-context.service';
import { workEmailValidator } from '@app/pages/contact-form/work-email.validator';
import {
  DEFAULT_RATE_SELECTION, RATE_ASSUMPTIONS, ROLE_RATES, RateBand, RateLevel, RoleRate
} from '@app/data/role-rates';
import { environment } from '../../../environments/environment';

type RateView = 'hourly' | 'monthly' | 'yearly';
type LeadStatus = 'idle' | 'open' | 'sending' | 'sent' | 'error';

interface RoleGroup {
  category: string;
  roles: RoleRate[];
}

/** A highlightable row in the role picker: a category header or a role. */
interface PickerItem {
  id: string;
  category?: string;
  role?: RoleRate;
}

/** All roles grouped by category, in library order. */
const ROLE_GROUPS: RoleGroup[] = ROLE_RATES.reduce<RoleGroup[]>((groups, r) => {
  const group = groups.find(g => g.category === r.category);
  if (group) group.roles.push(r);
  else groups.push({ category: r.category, roles: [r] });
  return groups;
}, []);

const A = RATE_ASSUMPTIONS;
const LEVELS: { key: RateLevel; label: string }[] = [
  { key: 'entry', label: 'Entry' },
  { key: 'mid', label: 'Mid' },
  { key: 'senior', label: 'Senior' },
];
const VIEWS: { key: RateView; label: string; unit: string }[] = [
  { key: 'hourly', label: 'Hourly', unit: 'per hour' },
  { key: 'monthly', label: 'Monthly', unit: 'per month' },
  { key: 'yearly', label: 'Yearly', unit: 'per year' },
];
/**
 * Layout-only stand-in used while no role is chosen: the (invisible, inert) results pane renders with
 * these numbers so the card reserves its final size. It is not a real role and is never shown.
 */
const LAYOUT_ROLE: RoleRate = {
  category: '', role: '', soc: '', blsOccupation: '',
  hirably: { entry: { min: 11, max: 13 }, mid: { min: 11, max: 13 }, senior: { min: 11, max: 13 } },
  usHourly: { entry: 20, mid: 20, senior: 20 },
};

/** Space left above the results when scrolling them into view (fixed navbar). */
const NAVBAR_OFFSET_PX = 84;
/** How long the selection must stay unchanged before one rate_calculation event is sent. */
const TRACK_DELAY_MS = 800;

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/**
 * Hero rate calculator: Hirably all-inclusive rate vs. the fully loaded cost of a US local hire.
 * Data and assumptions live in src/app/data/role-rates.ts.
 */
@Component({
  selector: 'app-rate-calculator',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './rate-calculator.component.html',
  styles: [`
    @media (max-width: 1023.98px) {
      .rc-reveal-mobile { animation: rc-fade-in 250ms ease-out both; }
    }
    @media (prefers-reduced-motion: reduce) {
      .rc-reveal-mobile { animation: none; }
    }
    @keyframes rc-fade-in { from { opacity: 0; } to { opacity: 1; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateCalculatorComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly analytics = inject(AnalyticsService);
  private readonly fb = inject(FormBuilder);
  private readonly calculatorContext = inject(CalculatorContextService);

  @ViewChild('roleTrigger') private roleTrigger?: ElementRef<HTMLButtonElement>;
  @ViewChild('roleSearch') private roleSearch?: ElementRef<HTMLInputElement>;
  @ViewChild('leadEmail') private leadEmail?: ElementRef<HTMLInputElement>;

  readonly views = VIEWS;
  /** Hirably column checklist ("All included"). */
  readonly includedItems = [
    'Recruitment & vetting',
    'Background checks',
    'Pay, benefits & payroll taxes',
    'Paid time off',
    'Equipment & setup',
    'HR support',
    'Lifetime replacement guarantee',
  ];
  readonly payrollTaxPct = this.pct(A.payrollTaxRate);
  readonly benefitsPct = this.pct(A.benefitsRate);

  // ── Selection ─────────────────────────────────────────────────────────────
  /** No role until the visitor picks one; the results stay hidden until then. */
  readonly role = signal<RoleRate | null>(null);
  readonly revealed = computed(() => this.role() !== null);
  /** Role used for the numbers: the chosen one, or the invisible layout stand-in. */
  private readonly calcRole = computed(() => this.role() ?? LAYOUT_ROLE);
  readonly level = signal<RateLevel>(DEFAULT_RATE_SELECTION.level);
  readonly specialized = signal(false);
  readonly specialty = signal('');
  /** Default comparison: hourly. */
  readonly view = signal<RateView>('hourly');
  /** Phones only: tax and benefit lines stay folded until "See breakdown". */
  readonly showBreakdown = signal(false);

  readonly levelOptions = computed(() => LEVELS.filter(l => this.calcRole().hirably[l.key]));

  // ── Role picker ───────────────────────────────────────────────────────────
  // Browsing: only category rows (with role counts); one category open at a time.
  // Searching: matching roles from every category, ignoring the open/closed state.
  readonly roleListOpen = signal(false);
  readonly roleQuery = signal('');
  readonly expandedCategory = signal<string | null>(null);
  /** DOM id of the highlighted row (category or role), for aria-activedescendant. */
  readonly activeId = signal<string | null>(null);

  readonly categories = ROLE_GROUPS;
  readonly searching = computed(() => this.roleQuery().trim().length > 0);

  readonly filteredGroups = computed<RoleGroup[]>(() => {
    const q = this.roleQuery().trim().toLowerCase();
    return ROLE_GROUPS
      .map(g => ({ category: g.category, roles: g.roles.filter(r => r.role.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)) }))
      .filter(g => g.roles.length);
  });

  /** Rows in visual order, for arrow-key navigation. */
  private readonly navItems = computed<PickerItem[]>(() => {
    if (this.searching()) return this.filteredGroups().flatMap(g => g.roles.map(r => ({ id: this.optionId(r), role: r })));
    return ROLE_GROUPS.flatMap(g => [
      { id: this.categoryId(g.category), category: g.category },
      ...(this.expandedCategory() === g.category ? g.roles.map(r => ({ id: this.optionId(r), role: r })) : []),
    ]);
  });

  // ── Results ───────────────────────────────────────────────────────────────
  /** Hirably hourly band for the selection (+15% when specialized), never below the floor. */
  readonly band = computed<RateBand>(() => {
    const base = this.calcRole().hirably[this.level()] ?? { min: A.minHourlyRate, max: A.minHourlyRate };
    const up = (n: number) => (this.specialized() ? Math.round(n * (1 + A.specializedUplift)) : n);
    return { min: Math.max(A.minHourlyRate, up(base.min)), max: Math.max(A.minHourlyRate, up(base.max)) };
  });

  /** US yearly cost build-up. The specialized switch never changes the US side. */
  private readonly usYearly = computed(() => {
    const base = (this.calcRole().usHourly[this.level()] ?? 0) * A.hoursPaidPerYear;
    const payroll = base * A.payrollTaxRate;
    const benefits = base * A.benefitsRate;
    return { base, payroll, benefits, total: base + payroll + benefits };
  });

  readonly viewUnit = computed(() => VIEWS.find(v => v.key === this.view())?.unit ?? '');

  readonly hirablyAmount = computed(() => {
    const { min, max } = this.band();
    const toView = (rate: number) =>
      this.view() === 'hourly' ? rate
        : this.view() === 'monthly' ? (rate * A.hoursPaidPerYear) / 12
          : rate * A.hoursPaidPerYear;
    return { low: money.format(toView(min)), high: money.format(toView(max)) };
  });

  /** US lines in the chosen view; the total is the sum of the rounded lines so it always adds up. */
  readonly usLines = computed(() => {
    const y = this.usYearly();
    const div = this.view() === 'hourly' ? A.hoursWorkedPerYear : this.view() === 'monthly' ? 12 : 1;
    const base = Math.round(y.base / div);
    const payroll = Math.round(y.payroll / div);
    const benefits = Math.round(y.benefits / div);
    return {
      base: money.format(base),
      payroll: money.format(payroll),
      benefits: money.format(benefits),
      total: money.format(base + payroll + benefits),
    };
  });

  readonly totalLabel = computed(() =>
    this.view() === 'hourly' ? 'total cost per hour worked'
      : this.view() === 'monthly' ? 'total cost per month' : 'total cost per year');

  /** Yearly savings at the low end of the Hirably range ("up to"), capped. Null when Hirably isn't cheaper. */
  readonly savings = computed(() => {
    const us = this.usYearly().total;
    const hirablyLow = this.band().min * A.hoursPaidPerYear;
    const share = 1 - hirablyLow / us;
    if (!(share > 0)) return null;
    const capped = Math.min(share, A.maxSavingsShare);
    return {
      amount: money.format(Math.floor(us * capped)),
      percent: Math.floor(capped * 100 + 1e-9),
    };
  });

  // ── Lead capture ──────────────────────────────────────────────────────────
  readonly leadStatus = signal<LeadStatus>('idle');
  readonly leadForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, workEmailValidator()]],
    notes: [''],
    _honeypot: [''],
  });

  private trackTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.trackTimer));
  }

  // ── Selection handlers ────────────────────────────────────────────────────
  setLevel(level: RateLevel): void {
    if (this.level() === level) return;
    this.level.set(level);
    this.afterSelectionChange();
  }

  toggleSpecialized(): void {
    this.specialized.update(v => !v);
    this.afterSelectionChange();
  }

  onSpecialty(event: Event): void {
    this.specialty.set((event.target as HTMLInputElement).value);
  }

  setView(view: RateView): void {
    this.view.set(view);
  }

  toggleBreakdown(): void {
    this.showBreakdown.update(v => !v);
  }

  // ── Role picker handlers ──────────────────────────────────────────────────
  toggleRoleList(): void {
    if (this.roleListOpen()) {
      this.closeRoleList(false);
      return;
    }
    this.roleQuery.set('');
    const current = this.role();
    this.expandedCategory.set(current?.category ?? null);
    this.activeId.set(current ? this.optionId(current) : this.categoryId(ROLE_GROUPS[0].category));
    this.roleListOpen.set(true);
    setTimeout(() => {
      this.roleSearch?.nativeElement.focus();
      this.scrollActiveIntoView();
    });
  }

  toggleCategory(category: string): void {
    this.expandedCategory.update(open => (open === category ? null : category));
    this.activeId.set(this.categoryId(category));
  }

  onRoleQuery(event: Event): void {
    this.roleQuery.set((event.target as HTMLInputElement).value);
    this.activeId.set(this.navItems()[0]?.id ?? null);
  }

  onRoleKeydown(event: KeyboardEvent): void {
    const items = this.navItems();
    const i = items.findIndex(it => it.id === this.activeId());
    const current = items[i];
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault();
        if (!items.length) return;
        const next = event.key === 'ArrowDown' ? Math.min(i + 1, items.length - 1) : Math.max(i - 1, 0);
        this.activeId.set(items[next].id);
        setTimeout(() => this.scrollActiveIntoView());
        return;
      }
      case 'ArrowRight':
        if (current?.category && this.expandedCategory() !== current.category) {
          event.preventDefault();
          this.toggleCategory(current.category);
        }
        return;
      case 'ArrowLeft':
        if (!this.searching() && this.expandedCategory()) {
          event.preventDefault();
          const open = this.expandedCategory() as string;
          this.expandedCategory.set(null);
          this.activeId.set(this.categoryId(open));
        }
        return;
      case 'Enter':
        event.preventDefault();
        if (current?.role) this.selectRole(current.role);
        else if (current?.category) this.toggleCategory(current.category);
        return;
      case 'Escape':
        event.preventDefault();
        this.closeRoleList(true);
        return;
    }
  }

  selectRole(r: RoleRate): void {
    const firstReveal = !this.revealed();
    const changed = r !== this.role();
    this.role.set(r);
    if (!r.hirably[this.level()]) this.level.set(this.levelOptions()[0].key);
    this.closeRoleList(true);
    if (changed) this.afterSelectionChange();
    if (firstReveal) this.scrollResultsIntoViewOnSmallScreens();
  }

  isActive(id: string): boolean {
    return this.activeId() === id;
  }

  optionId(r: RoleRate): string {
    return `rc-role-${ROLE_RATES.indexOf(r)}`;
  }

  categoryId(category: string): string {
    return `rc-cat-${ROLE_GROUPS.findIndex(g => g.category === category)}`;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.roleListOpen()) return;
    const picker = (this.host.nativeElement as HTMLElement).querySelector('[data-role-picker]');
    if (picker && !picker.contains(event.target as Node)) this.closeRoleList(false);
  }

  private closeRoleList(focusTrigger: boolean): void {
    this.roleListOpen.set(false);
    if (focusTrigger) setTimeout(() => this.roleTrigger?.nativeElement.focus({ preventScroll: true }));
  }

  private scrollActiveIntoView(): void {
    const id = this.activeId();
    if (id) document.getElementById(id)?.scrollIntoView({ block: 'nearest' });
  }

  // ── Lead handlers ─────────────────────────────────────────────────────────
  openLead(): void {
    this.leadStatus.set('open');
    setTimeout(() => this.leadEmail?.nativeElement.focus());
  }

  isLeadInvalid(key: 'email'): boolean {
    const ctrl = this.leadForm.get(key);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  emailErrorMessage(): string {
    return this.leadForm.get('email')?.errors?.['workEmail'] ? 'Please use your work email.' : 'Please enter a valid email.';
  }

  submitLead(): void {
    this.leadForm.markAllAsTouched();
    if (this.leadForm.invalid || this.leadStatus() === 'sending') return;

    const role = this.role();
    if (!role) return;
    const { email, notes, _honeypot } = this.leadForm.getRawValue();
    const level = LEVELS.find(l => l.key === this.level())?.label ?? this.level();
    const specialized = this.specialized();
    const payload = {
      email,
      notes: notes ?? '',
      role: role.role,
      category: role.category,
      level,
      specialized: specialized ? 'Yes' : 'No',
      specialty: specialized ? this.specialty().trim() : '',
      hirably_estimate: `${money.format(this.band().min)}-${money.format(this.band().max)}/hr all-inclusive`,
      _gotcha: _honeypot ?? '',
      _form_type: 'rate-calculator',
      _subject: `Hirably Form: Sample profiles request (${role.role}, ${level})`,
      _replyto: email,
    };

    this.leadStatus.set('sending');
    // Not tied to the component lifecycle: the request must finish even if the visitor navigates away.
    this.http.post(environment.formspreeEndpoint, payload).subscribe({
      next: () => {
        this.leadStatus.set('sent');
        this.analytics.generateLead('rate_calculator', 'sample_profiles');
      },
      error: err => {
        console.error('Sample profiles request failed', err);
        this.leadStatus.set('error');
      },
    });
  }

  bookCall(): void {
    this.analytics.ctaClick('Book a call', 'hero-calculator');
    // Hand the current selection to the Book a Call lead (in memory, not in the URL).
    const role = this.role();
    const specialized = this.specialized();
    if (role) this.calculatorContext.set({
      calculator_role: role.role,
      calculator_level: LEVELS.find(l => l.key === this.level())?.label ?? this.level(),
      calculator_specialized: specialized ? 'Yes' : 'No',
      calculator_specialty: specialized ? this.specialty().trim() : '',
      calculator_hirably_estimate: `${money.format(this.band().min)}-${money.format(this.band().max)}/hr all-inclusive`,
    });
    const email = this.leadForm.get('email');
    const queryParams = email?.valid ? { email: email.value } : {};
    this.router.navigate(['/contact', 'book-a-call'], { queryParams });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  /** Every role/level/specialized change: reset a finished lead request and schedule one event. */
  private afterSelectionChange(): void {
    const role = this.role();
    if (!role) return; // nothing is calculated (or tracked) until a role is chosen
    if (this.leadStatus() === 'sent') this.leadStatus.set('idle');
    clearTimeout(this.trackTimer);
    this.trackTimer = setTimeout(
      () => this.analytics.rateCalculation(role.role, this.level(), this.specialized()),
      TRACK_DELAY_MS
    );
  }

  /** Phones/tablets: after the first reveal, bring the Hirably and US columns into view. */
  private scrollResultsIntoViewOnSmallScreens(): void {
    if (window.matchMedia('(min-width: 1024px)').matches) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => {
      const compare = (this.host.nativeElement as HTMLElement).querySelector('[data-rc-compare]');
      if (!compare) return;
      const top = compare.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET_PX;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    }, 60);
  }

  private pct(rate: number): string {
    return `${Math.round(rate * 1000) / 10}%`;
  }
}
