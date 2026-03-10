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
  // Staircase goes UP: 01 lowest (left), 03 highest (right) — equal 105px gaps
  readonly stepOffsets = ['lg:mt-[210px]', 'lg:mt-[105px]', 'lg:mt-0'];
  // Mobile staircase: 01 left → 02 center → 03 right
  readonly mobileStepAlignments = ['self-start', 'self-center lg:self-auto', 'self-end lg:self-auto'];
  readonly numberColors = ['text-[#C2E7FF]', 'text-[#D1F9E5]', 'text-[#E3E1FF]'];
  readonly circleFills = ['#C2E7FF', '#D1F9E5', '#E3E1FF'];
  // Arrow 1: exits lower-half of card 01 (y≈492) → arrives at center of card 02 (y=328)
  // Arrow 2: exits center of card 02 (y=328)    → arrives at top of card 03    (y=105)
  readonly arrowOffsets = ['mt-[327px]', 'mt-[104px]'];

  constructor(private dataService: DataService) {
    this.steps = this.dataService.getHowItWorksSteps();
  }

  trackByNumber(_index: number, step: Step): number {
    return step.number;
  }
}
