import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { DraftPageBase } from '../shared/draft-page.base';
import { DRAFT_GLOBAL_STYLES } from '../shared/draft-shell';
import { DraftNavbarComponent } from '../shared/draft-navbar.component';
import { DraftFooterComponent } from '../shared/draft-footer.component';
import { DraftCalculatorComponent } from '../shared/draft-calculator.component';
import { DraftStepsComponent } from '../shared/draft-steps.component';
import { DraftLoveComponent } from '../shared/draft-love.component';
import { DraftPricingComponent } from '../shared/draft-pricing.component';
import { DraftIconComponent } from '../shared/draft-icon.component';
import { DraftVerifiedComponent } from '../shared/draft-verified.component';
import { DraftAnyRoleComponent } from '../shared/draft-any-role.component';
import {
  A_COMPARE_COLUMNS, A_COMPARE_ROWS, A_HERO_FACTS, A_NEARSHORE, A_NEARSHORE_SUBTITLE, A_NEARSHORE_TITLE, A_STATS,
  A_TRUST_LINE
} from '../shared/draft-a-copy';

/** DESIGN DRAFT A: Big Type. Preview only (/draft-a, never in production). */
@Component({
  selector: 'app-draft-a',
  standalone: true,
  imports: [
    DraftNavbarComponent, DraftFooterComponent, DraftCalculatorComponent, DraftStepsComponent,
    DraftLoveComponent, DraftPricingComponent, DraftIconComponent, DraftVerifiedComponent, DraftAnyRoleComponent,
    NgClass, NgTemplateOutlet
  ],
  templateUrl: './draft-a.component.html',
  styles: [DRAFT_GLOBAL_STYLES],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftAComponent extends DraftPageBase {
  // Copy v2 (Hirably Complete deck). Pending items (hero headline, 1000s, 97%, 100%) are unchanged.
  readonly aHero = A_HERO_FACTS;
  readonly aTrustLine = A_TRUST_LINE;
  readonly compareColumns = A_COMPARE_COLUMNS;
  readonly compareRows = A_COMPARE_ROWS;
  readonly aStats = A_STATS;
  readonly aNearshoreTitle = A_NEARSHORE_TITLE;
  readonly aNearshoreSubtitle = A_NEARSHORE_SUBTITLE;
  readonly aNearshore = A_NEARSHORE;
}
