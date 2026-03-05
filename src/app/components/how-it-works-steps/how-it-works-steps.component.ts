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
  // Staircase goes UP: 01 lowest (left), 03 highest (right) — Figma exact offsets
  readonly stepOffsets = ['lg:mt-[211px]', 'lg:mt-[97px]', 'lg:mt-0'];
  // Mobile staircase: 01 left → 02 center → 03 right
  readonly mobileStepAlignments = ['self-start', 'self-center lg:self-auto', 'self-end lg:self-auto'];
  // Number X alignment per card: 01 left / 02 center / 03 right (desktop always right)
  readonly numberAlignments = ['text-left', 'text-center lg:text-right', 'text-right'];
  readonly numberColors = ['text-[#C2E7FF]', 'text-[#D1F9E5]', 'text-[#E3E1FF]'];
  readonly circleFills = ['#C2E7FF', '#D1F9E5', '#E3E1FF'];
  // Arrows connect at card vertical midpoints
  readonly arrowOffsets = ['mt-[336px]', 'mt-[219px]'];

  constructor(private dataService: DataService) {
    this.steps = this.dataService.getHowItWorksSteps();
  }

  trackByNumber(_index: number, step: Step): number {
    return step.number;
  }
}
