// ====================================
// TESTIMONIALS CAROUSEL COMPONENT - TypeScript
// testimonials-carousel.component.ts
// ====================================

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Testimonial } from '../../models';
import { BaseCarouselComponent } from '../shared/base-carousel.component';

@Component({
  selector: 'app-testimonials-carousel',
  templateUrl: './testimonials-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsCarouselComponent extends BaseCarouselComponent<Testimonial> {

  testimonials: Testimonial[] = [];

  constructor(
    private dataService: DataService,
    cdr: ChangeDetectorRef
  ) {
    super(cdr);
    this.autoplayDuration = 5000;
  }

  protected override loadItems(): void {
    this.testimonials = this.dataService.getTestimonials();
    this.items = this.testimonials;
  }

  protected override getDesktopVisibleItems(): number {
    return 3; // Testimonials carousel muestra 3 en desktop
  }

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
