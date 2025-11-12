// ====================================
// HERO SECTION COMPONENT - TypeScript
// hero-section.component.ts
// ====================================

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styles: [`
    .service-word-container {
      position: relative;
      overflow: hidden;
      display: inline-block;
    }

    .animated-service-word {
      display: inline-block;
      animation: headline-slide-down 0.5s forwards;
    }

    .animated-service-word.animating {
      animation: headline-slide-up 0.5s forwards;
    }

    @keyframes headline-slide-down {
      0% {
        opacity: 0;
        transform: translateY(-100%);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes headline-slide-up {
      0% {
        opacity: 1;
        transform: translateY(0);
      }
      100% {
        opacity: 0;
        transform: translateY(100%);
      }
    }
  `]
})
export class HeroSectionComponent implements OnInit, OnDestroy {

  trustBadges = [
    'Trusted by 50+ US & Canadian companies',
    '7-day hiring'
  ];

  showInDays = true;
  private intervalId?: number;

  // Service words animation
  serviceWords = ['Recruitment', 'Compliance', 'HR', 'Payroll'];
  currentServiceIndex = 0;
  isAnimating = false;
  private serviceIntervalId?: number;

  get currentService(): string {
    return this.serviceWords[this.currentServiceIndex];
  }

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    // Alternate text every 3 seconds
    this.intervalId = window.setInterval(() => {
      this.showInDays = !this.showInDays;
    }, 3000);

    // Start service words animation
    this.serviceIntervalId = window.setInterval(() => {
      this.isAnimating = true;

      // Wait for animation to complete before changing the word
      setTimeout(() => {
        this.currentServiceIndex = (this.currentServiceIndex + 1) % this.serviceWords.length;
        this.isAnimating = false;
      }, 500); // Match animation duration
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.serviceIntervalId) {
      clearInterval(this.serviceIntervalId);
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
