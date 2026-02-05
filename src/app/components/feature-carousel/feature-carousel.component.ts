// ====================================
// FEATURE CAROUSEL COMPONENT - TypeScript
// "Why Mexico" Benefits Section
// ====================================

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataService } from '@services/data.service';
import { Benefit } from '@models';
import { BaseCarouselComponent } from '@components/shared/base-carousel.component';

@Component({
  selector: 'app-feature-carousel',
  templateUrl: './feature-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureCarouselComponent extends BaseCarouselComponent<Benefit> {

  mexicoBenefits: Benefit[] = [];

  constructor(
    private dataService: DataService,
    cdr: ChangeDetectorRef
  ) {
    super(cdr);
    this.autoplayDuration = 3000;
  }

  protected override loadItems(): void {
    this.mexicoBenefits = this.dataService.getBenefits();
    this.items = this.mexicoBenefits;
  }

  protected override getDesktopVisibleItems(): number {
    return 4; // 4 benefits en desktop (grid)
  }

  // Get the actual index of a benefit
  getBenefitIndex(benefit: Benefit): number {
    return this.mexicoBenefits.indexOf(benefit);
  }
}
