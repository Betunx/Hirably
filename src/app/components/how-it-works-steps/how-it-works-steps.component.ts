import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '@services/data.service';
import { Step } from '@models';

@Component({
  selector: 'app-how-it-works-steps',
  templateUrl: './how-it-works-steps.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowItWorksStepsComponent {
  readonly steps: Step[];
  readonly stepBgClasses = ['bg-light-sky', 'bg-mint-green', 'bg-lavender'];
  readonly stepOffsets = ['lg:mt-0', 'lg:mt-16', 'lg:mt-32'];

  constructor(private dataService: DataService) {
    this.steps = this.dataService.getHowItWorksSteps();
  }

  trackByNumber(_index: number, step: Step): number {
    return step.number;
  }
}
