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

/** DESIGN DRAFT C: Bold Blocks. Preview only (/draft-c, never in production). */
@Component({
  selector: 'app-draft-c',
  standalone: true,
  imports: [
    DraftNavbarComponent, DraftFooterComponent, DraftCalculatorComponent, DraftStepsComponent,
    DraftLoveComponent, DraftPricingComponent, DraftIconComponent
  ],
  templateUrl: './draft-c.component.html',
  styles: [DRAFT_GLOBAL_STYLES],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftCComponent extends DraftPageBase {}
