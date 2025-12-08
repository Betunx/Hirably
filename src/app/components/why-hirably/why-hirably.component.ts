// ====================================
// WHY HIRABLY COMPONENT - TypeScript
// why-hirably.component.ts
// ====================================

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '@services/data.service';
import { Benefit } from '@models';
import { BaseDataComponent } from '@shared/base/base-data.component';

@Component({
  selector: 'app-why-hirably',
  templateUrl: './why-hirably.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhyHirablyComponent extends BaseDataComponent {

  mexicoBenefits: Benefit[] = [];
  advantages: Benefit[] = [];

  constructor(private dataService: DataService) {
    super();
  }

  protected override loadData(): void {
    this.mexicoBenefits = this.dataService.getBenefits();
    this.advantages = this.dataService.getAdvantages();
  }
}
