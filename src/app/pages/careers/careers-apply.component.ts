import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CareersService } from '@services/careers.service';
import { AnalyticsService } from '@services/analytics.service';
import { Vacancy } from '@models';

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

@Component({
  selector: 'app-careers-apply',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './careers-apply.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareersApplyComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly careers = inject(CareersService);
  private readonly analytics = inject(AnalyticsService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroy$ = new Subject<void>();

  vacancy: Vacancy | null = null;
  loading = true;
  notFound = false;

  cvFile: File | null = null;
  cvError = '';

  submitting = false;
  submitted = false;
  submitError = false;
  private started = false;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    message: [''],
    company: [''], // honeypot — must stay empty
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.notFound = true; this.loading = false; return; }

    this.careers.listPublished().pipe(takeUntil(this.destroy$)).subscribe({
      next: list => {
        this.vacancy = list.find(v => v.id === id) ?? null;
        this.notFound = !this.vacancy;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => { this.notFound = true; this.loading = false; this.cdr.markForCheck(); },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onStart(): void {
    if (this.started) return;
    this.started = true;
    this.analytics.formStart('careers_apply', 'other');
  }

  onFileChange(event: Event): void {
    this.cvError = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (file) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        this.cvError = 'Please upload a PDF or Word document.';
        this.cvFile = null;
        return;
      }
      if (file.size > MAX_BYTES) {
        this.cvError = 'File is too large (max 5 MB).';
        this.cvFile = null;
        return;
      }
    }
    this.cvFile = file;
  }

  isInvalid(key: string): boolean {
    const ctrl = this.form.get(key);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  async submit(): Promise<void> {
    this.form.markAllAsTouched();
    if (!this.cvFile) { this.cvError = 'A CV is required.'; }
    if (this.form.invalid || !this.cvFile || !this.vacancy) {
      this.cdr.markForCheck();
      return;
    }

    this.submitting = true;
    this.submitError = false;
    this.cdr.markForCheck();

    try {
      const cvUrl = await this.careers.uploadCv(this.cvFile);
      const v = this.form.value;
      this.careers.submitApplication({
        vacancyId: this.vacancy.id,
        vacancyTitle: this.vacancy.title,
        name: v.name ?? '',
        email: v.email ?? '',
        phone: v.phone ?? undefined,
        message: v.message ?? undefined,
        cvUrl,
        company: v.company ?? undefined,
      }).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.submitting = false;
          this.submitted = true;
          this.analytics.generateLead('careers_application', this.vacancy?.title ?? 'careers');
          this.cdr.markForCheck();
        },
        error: () => {
          this.submitting = false;
          this.submitError = true;
          this.cdr.markForCheck();
        },
      });
    } catch {
      this.submitting = false;
      this.submitError = true;
      this.cdr.markForCheck();
    }
  }

  goToCareers(): void {
    this.router.navigate(['/careers']);
  }
}
