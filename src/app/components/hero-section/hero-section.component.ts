import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalyticsService } from '@services/analytics.service';
import { workEmailValidator } from '@app/pages/contact-form/work-email.validator';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {
  private readonly router = inject(Router);
  private readonly analytics = inject(AnalyticsService);
  private readonly fb = inject(FormBuilder);

  // Mismos keys que BOOK_A_CALL_FIELDS para que el prefill mapee 1:1 en /contact/book-a-call.
  readonly form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, workEmailValidator()]],
  });

  isInvalid(key: string): boolean {
    const ctrl = this.form.get(key);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.analytics.ctaClick('Book a call', 'hero-form');
    this.router.navigate(['/contact', 'book-a-call'], { queryParams: this.form.value });
  }
}
