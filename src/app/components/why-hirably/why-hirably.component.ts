import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '@services/data.service';
import { Benefit } from '@models';

@Component({
  selector: 'app-why-hirably',
  templateUrl: './why-hirably.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhyHirablyComponent {
  readonly advantages: Benefit[];
  readonly barColors = ['bg-bright-amber', 'bg-primary-blue', 'bg-emerald'];

  constructor(private dataService: DataService) {
    this.advantages = this.dataService.getAdvantages();
  }

  trackByTitle(_index: number, item: Benefit): string {
    return item.title;
  }
}
