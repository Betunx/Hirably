// ====================================
// HERO SECTION COMPONENT - TypeScript
// hero-section.component.ts
// ====================================

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {

  trustBadges = [
    'No upfront fees',
    'Lifetime guarantee',
    '7-day hiring'
  ];

  constructor(private scrollService: ScrollService) {}

  onBookConsultation(): void {
    // Navigate to booking page or open modal
    console.log('Book consultation clicked');
  }

  onSeeHowItWorks(): void {
    this.scrollService.scrollToId('howitworks');
  }
}
