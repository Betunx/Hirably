// ====================================
// TESTIMONIALS CAROUSEL COMPONENT - TypeScript
// testimonials-carousel.component.ts
// ====================================

import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Testimonial } from '../../models/people.model';

@Component({
  selector: 'app-testimonials-carousel',
  templateUrl: './testimonials-carousel.component.html',
  styleUrls: ['./testimonials-carousel.component.css']
})
export class TestimonialsCarouselComponent implements OnInit, OnDestroy {
  
  testimonials: Testimonial[] = [];
  currentIndex: number = 0;
  isAutoPlaying: boolean = true;
  visibleCards: number = 3;
  private intervalId: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.testimonials = this.dataService.getTestimonials();
    this.updateVisibleCards();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateVisibleCards();
  }

  updateVisibleCards(): void {
    const width = window.innerWidth;
    if (width < 768) {
      this.visibleCards = 1;
    } else if (width < 1024) {
      this.visibleCards = 2;
    } else {
      this.visibleCards = 3;
    }
  }

  startAutoPlay(): void {
    this.intervalId = setInterval(() => {
      if (this.isAutoPlaying) {
        this.nextTestimonial();
      }
    }, 5000);
  }

  stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextTestimonial(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToTestimonial(index: number): void {
    this.isAutoPlaying = false;
    this.currentIndex = index;
  }

  getVisibleTestimonials(): Testimonial[] {
    const visible: Testimonial[] = [];
    for (let i = 0; i < this.visibleCards; i++) {
      const index = (this.currentIndex + i) % this.testimonials.length;
      visible.push(this.testimonials[index]);
    }
    return visible;
  }

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
