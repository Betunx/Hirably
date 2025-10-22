// ====================================
// FEATURE CAROUSEL COMPONENT - TypeScript
// feature-carousel.component.ts
// ====================================

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Feature } from '../../models';
import { BaseCarouselComponent } from '../shared/base-carousel.component';

@Component({
  selector: 'app-feature-carousel',
  templateUrl: './feature-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureCarouselComponent extends BaseCarouselComponent<Feature> {

  features: Feature[] = [];

  constructor(
    private dataService: DataService,
    cdr: ChangeDetectorRef
  ) {
    super(cdr);
    this.autoplayDuration = 3000;
  }

  protected override loadItems(): void {
    this.features = this.dataService.getMainFeatures();
    this.items = this.features;
  }

  protected override getDesktopVisibleItems(): number {
    return 3; // Feature carousel muestra 3 en desktop
  }
}
