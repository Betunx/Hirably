import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from '@services/analytics.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {
  private readonly router = inject(Router);
  private readonly analytics = inject(AnalyticsService);

  onBookConsultation(): void {
    this.analytics.ctaClick('Book a call', 'book-a-call');
    this.router.navigate(['/contact', 'book-a-call']);
  }
}
