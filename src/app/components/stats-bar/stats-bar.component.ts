// ====================================
// STATS BAR COMPONENT - TypeScript
// stats-bar.component.ts
// ====================================

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Stat } from '../../models';
import { BaseDataComponent } from '../../shared/base/base-data.component';

@Component({
  selector: 'app-stats-bar',
  templateUrl: './stats-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsBarComponent extends BaseDataComponent {

  stats: Stat[] = [];

  constructor(private dataService: DataService) {
    super();
  }

  protected override loadData(): void {
    this.stats = this.dataService.getStats();
  }
}
