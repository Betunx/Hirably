import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { HowItWorksStepsComponent } from '@components/how-it-works-steps/how-it-works-steps.component';
import { DRAFT_STEPS, DraftItem, DraftVariant, STEPS_SUBTITLE, STEPS_SUBTITLE_STRONG } from './draft-copy';
import { A_STEPS, A_STEPS_EYEBROW, A_STEPS_SUBTITLE, A_STEPS_TITLE } from './draft-a-copy';
import { DraftIconComponent } from './draft-icon.component';

/**
 * DESIGN DRAFTS ONLY. "The Hirably Way" restyled. The hopping-H animation (IntersectionObserver, hop arcs,
 * squash-and-stretch, reduced-motion final state) is inherited from HowItWorksStepsComponent; it needs
 * #hopStage, #hopper, #hopBody, #hopDot and three [data-hop-card] elements, which every variant keeps.
 */
@Component({
  selector: 'app-draft-steps',
  standalone: true,
  imports: [NgClass, DraftIconComponent],
  templateUrl: './draft-steps.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftStepsComponent extends HowItWorksStepsComponent {
  @Input({ required: true }) variant!: DraftVariant;

  readonly items = DRAFT_STEPS;
  readonly subtitle = STEPS_SUBTITLE;
  readonly subtitleStrong = STEPS_SUBTITLE_STRONG;

  // Draft A copy v2: timeline headline and day labels.
  readonly aEyebrow = A_STEPS_EYEBROW;
  readonly aTitle = A_STEPS_TITLE;
  readonly aSubtitle = A_STEPS_SUBTITLE;

  get stepItems(): (DraftItem & { day?: string })[] {
    return this.variant === 'a' ? A_STEPS : this.items;
  }
}
