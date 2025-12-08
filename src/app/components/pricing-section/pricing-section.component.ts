import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '@services/data.service';
import { PricingPlan } from '@models';
import { BaseDataComponent } from '@shared/base/base-data.component';

@Component({
  selector: 'app-pricing-section',
  templateUrl: './pricing-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingSectionComponent extends BaseDataComponent {
  plans: PricingPlan[] = [];

  constructor(private dataService: DataService) {
    super();
  }

  protected override loadData(): void {
    this.plans = this.dataService.getPricingPlans();
  }

  onSelectPlan(plan: PricingPlan): void {
    console.log('Selected plan:', plan.name);
    // Aquí irá la lógica de contacto/formulario
  }
}