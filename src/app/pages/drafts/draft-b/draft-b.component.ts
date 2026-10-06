import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DraftPageBase } from '../shared/draft-page.base';
import { DRAFT_GLOBAL_STYLES } from '../shared/draft-shell';
import { DraftNavbarComponent } from '../shared/draft-navbar.component';
import { DraftFooterComponent } from '../shared/draft-footer.component';
import { DraftCalculatorComponent } from '../shared/draft-calculator.component';
import { DraftStepsComponent } from '../shared/draft-steps.component';
import { DraftLoveComponent } from '../shared/draft-love.component';
import { DraftPricingComponent } from '../shared/draft-pricing.component';
import { DraftIconComponent } from '../shared/draft-icon.component';

/** DESIGN DRAFT B: Software Product. Preview only (/draft-b, never in production). */
@Component({
  selector: 'app-draft-b',
  standalone: true,
  imports: [
    DraftNavbarComponent, DraftFooterComponent, DraftCalculatorComponent, DraftStepsComponent,
    DraftLoveComponent, DraftPricingComponent, DraftIconComponent
  ],
  templateUrl: './draft-b.component.html',
  styles: [DRAFT_GLOBAL_STYLES],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftBComponent extends DraftPageBase {}
