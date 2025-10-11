// ====================================
// ROLES CAROUSEL COMPONENT - TypeScript
// roles-carousel.component.ts
// ====================================

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Role } from '../../models/people.model';

@Component({
  selector: 'app-roles-carousel',
  templateUrl: './roles-carousel.component.html',
  styleUrls: ['./roles-carousel.component.css']
})
export class RolesCarouselComponent implements OnInit, OnDestroy {
  
  roles: Role[] = [];
  currentSlide: number = 0;
  isAutoPlaying: boolean = true;
  private intervalId: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.roles = this.dataService.getRoles();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.intervalId = setInterval(() => {
      if (this.isAutoPlaying) {
        this.nextSlide();
      }
    }, 4000);
  }

  stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.roles.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.roles.length) % this.roles.length;
  }

  goToSlide(index: number): void {
    this.isAutoPlaying = false;
    this.currentSlide = index;
  }

  getTransform(): string {
    return `translateX(-${this.currentSlide * 100}%)`;
  }

  onViewRoles(roleId: string): void {
    console.log('View roles for:', roleId);
    // Navigate to roles page or open modal
  }
}
