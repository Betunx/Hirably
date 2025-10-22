import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Step } from '../../models';
import { BaseDataComponent } from '../../shared/base/base-data.component';

@Component({
  selector: 'app-how-it-works-steps',
  templateUrl: './how-it-works-steps.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowItWorksStepsComponent extends BaseDataComponent {
  steps: Step[] = [];

  constructor(private dataService: DataService) {
    super();
  }

  protected override loadData(): void {
    this.steps = this.dataService.getHowItWorksSteps();
  }
}