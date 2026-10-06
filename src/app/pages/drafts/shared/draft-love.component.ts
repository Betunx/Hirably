import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { WhyHirablyComponent } from '@components/why-hirably/why-hirably.component';
import { DRAFT_LOVE_CARDS, DraftItem, DraftVariant, LOVE_SUBTITLE } from './draft-copy';
import { A_LOVE, A_LOVE_SUBTITLE } from './draft-a-copy';
import { DraftIconComponent } from './draft-icon.component';

/**
 * DESIGN DRAFTS ONLY. "Why you'll love Hirably" restyled. The heart pop and card slide-ins are inherited
 * from WhyHirablyComponent; it needs #heart, #cardGrid and [data-love-card], which every variant keeps.
 */
@Component({
  selector: 'app-draft-love',
  standalone: true,
  imports: [NgClass, DraftIconComponent],
  templateUrl: './draft-love.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftLoveComponent extends WhyHirablyComponent {
  @Input({ required: true }) variant!: DraftVariant;

  readonly items = DRAFT_LOVE_CARDS;
  readonly subtitle = LOVE_SUBTITLE;

  // Draft A copy v2 (deck facts); B and C keep the original cards.
  get subtitleText(): string {
    return this.variant === 'a' ? A_LOVE_SUBTITLE : this.subtitle;
  }

  get loveCards(): DraftItem[] {
    return this.variant === 'a' ? A_LOVE : this.items;
  }
}
