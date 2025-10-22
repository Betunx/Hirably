// ====================================
// HERO SECTION COMPONENT - TypeScript
// hero-section.component.ts
// ====================================

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html'
})
export class HeroSectionComponent implements OnInit, OnDestroy {

  trustBadges = [
    'Trusted by 50+ US & Canadian companies',
    '7-day hiring'
  ];

  showInDays = true;
  private intervalId?: number;

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    // Alternate text every 3 seconds
    this.intervalId = window.setInterval(() => {
      this.showInDays = !this.showInDays;
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onBookConsultation(): void {
    // Navigate to booking page or open modal
    console.log('Book consultation clicked');
  }

  onSeeHowItWorks(): void {
    this.scrollService.scrollToId('how-it-works');
  }
}
