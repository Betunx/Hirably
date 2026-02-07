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
  readonly stepOffsets = ['lg:mt-0', 'lg:mt-16', 'lg:mt-32'];
  readonly numberColors = ['text-[#C2E7FF]', 'text-[#D1F9E5]', 'text-[#E3E1FF]'];
  readonly circleFills = ['#C2E7FF', '#D1F9E5', '#E3E1FF'];

  constructor(private dataService: DataService) {
    this.steps = this.dataService.getHowItWorksSteps();
  }

  trackByNumber(_index: number, step: Step): number {
    return step.number;
  }
}
