import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '@services/data.service';
import { Benefit } from '@models';

@Component({
  selector: 'app-why-nearshore',
  templateUrl: './why-nearshore.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhyNearshoreComponent {
  readonly benefits: Benefit[];

  constructor(private dataService: DataService) {
    this.benefits = this.dataService.getBenefits();
  }
}
