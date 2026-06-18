import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@services/data.service';
import { AnalyticsService } from '@services/analytics.service';
import { PricingPlan } from '@models';

@Component({
  selector: 'app-pricing-section',
  templateUrl: './pricing-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingSectionComponent {
  readonly plans: PricingPlan[];

  constructor(
    private dataService: DataService,
    private router: Router,
    private analytics: AnalyticsService
  ) {
    this.plans = this.dataService.getPricingPlans();
  }

  trackByFeature(index: number): number {
    return index;
  }

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
