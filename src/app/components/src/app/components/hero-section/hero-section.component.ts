// ====================================
// HERO SECTION COMPONENT - TypeScript
// hero-section.component.ts
// ====================================

import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {
  
  trustBadges = [
    'No upfront fees',
    'Lifetime guarantee',
    '7-day hiring'
  ];

  onBookConsultation(): void {
    // Navigate to booking page or open modal
    console.log('Book consultation clicked');
  }

  onSeeHowItWorks(): void {
    // Scroll to how it works section
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
