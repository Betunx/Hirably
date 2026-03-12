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
  // Mobile: all cards centered in column (no staircase)
  readonly mobileStepAlignments = ['', '', ''];
  readonly numberColors = ['text-[#C2E7FF]', 'text-[#D1F9E5]', 'text-[#E3E1FF]'];
  readonly circleFills = ['#C2E7FF', '#D1F9E5', '#E3E1FF'];
  // Both arrows connect card center-Y to card center-Y (105px gap between centers)
  // Card centers: 01=433px, 02=328px, 03=223px (step_mt + 105 + 118)
  // SVG 71×107: path (0,106)→(71,1). container_mt = card_next_center - 1
  readonly arrowOffsets = ['mt-[327px]', 'mt-[222px]'];

  constructor(private dataService: DataService) {
    this.steps = this.dataService.getHowItWorksSteps();
  }

  trackByNumber(_index: number, step: Step): number {
    return step.number;
  }
}
