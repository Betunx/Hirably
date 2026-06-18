import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from '@services/analytics.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {

  constructor(private router: Router, private analytics: AnalyticsService) {}

  onBookConsultation(): void {
    this.analytics.ctaClick('Book a call', 'book-a-call');
    this.router.navigate(['/contact', 'book-a-call']);
  }
}
