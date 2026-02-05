// ====================================
// HERO SECTION COMPONENT - Figma Design 2024
// Simplificado: sin animación de palabras
// ====================================

import { Component } from '@angular/core';
import { ScrollService } from '@shared/services/scroll.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styles: []
})
export class HeroSectionComponent {

  constructor(private scrollService: ScrollService) {}

  onBookConsultation(): void {
    // Open video or navigate to demo
    this.scrollService.scrollToId('how-it-works');
  }

  onSeeHowItWorks(): void {
    this.scrollService.scrollToId('pricing');
  }
}
