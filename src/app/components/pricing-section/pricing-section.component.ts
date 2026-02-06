import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '@services/data.service';
import { PricingPlan } from '@models';

@Component({
  selector: 'app-pricing-section',
  templateUrl: './pricing-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingSectionComponent {
  readonly plans: PricingPlan[];

  constructor(private dataService: DataService) {
    this.plans = this.dataService.getPricingPlans();
  }

  trackByFeature(index: number): number {
    return index;
  }
}
