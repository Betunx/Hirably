import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@services/data.service';
import { AnalyticsService } from '@services/analytics.service';

@Component({
  selector: 'app-pricing-section',
  templateUrl: './pricing-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingSectionComponent {
  private readonly dataService = inject(DataService);
  private readonly router = inject(Router);
  private readonly analytics = inject(AnalyticsService);

  readonly plans = this.dataService.getPricingPlans();

  onEorServices(): void {
    this.analytics.ctaClick('Get Started', 'eor-services');
    this.router.navigate(['/contact', 'eor-services']);
  }

  onStartHiring(): void {
    this.analytics.ctaClick('Start Hiring', 'start-hiring');
    this.router.navigate(['/contact', 'start-hiring']);
  }

  onGetAQuote(): void {
    this.analytics.ctaClick('Get a Quote', 'get-a-quote');
    this.router.navigate(['/contact', 'get-a-quote']);
  }
}
