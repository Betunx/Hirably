import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@services/data.service';
import { PricingPlan } from '@models';

@Component({
  selector: 'app-pricing-section',
  templateUrl: './pricing-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingSectionComponent {
  readonly plans: PricingPlan[];

  constructor(private dataService: DataService, private router: Router) {
    this.plans = this.dataService.getPricingPlans();
  }

  trackByFeature(index: number): number {
    return index;
  }

  onEorServices(): void {
    this.router.navigate(['/contact', 'eor-services']);
  }

  onStartHiring(): void {
    this.router.navigate(['/contact', 'start-hiring']);
  }

  onGetAQuote(): void {
    this.router.navigate(['/contact', 'get-a-quote']);
  }
}
