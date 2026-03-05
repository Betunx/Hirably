import {
  Component,
  Input,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-carousel.component.html',
  styleUrls: ['./services-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesCarouselComponent implements AfterViewInit {
  @Input() totalSlides = 3;
  @Input() initialIndex = 1;

  activeIndex = 1;

  private startX = 0;
  private isDragging = false;
  private swipeThreshold = 50;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.activeIndex = this.initialIndex;
    this.cdr.markForCheck();
  }

  get slidesArray(): number[] {
    return Array.from({ length: this.totalSlides }, (_, i) => i);
  }

  getCardTransform(index: number): string {
    const offset = index - this.activeIndex;

    if (offset === 0) {
      return 'translateX(0) scale(1) translateZ(0)';
    } else if (offset === -1 || (this.activeIndex === 0 && index === this.totalSlides - 1)) {
      return 'translateX(-68%) scale(0.82) translateZ(-100px)';
    } else if (offset === 1 || (this.activeIndex === this.totalSlides - 1 && index === 0)) {
      return 'translateX(68%) scale(0.82) translateZ(-100px)';
    }
    return 'translateX(0) scale(0.7) translateZ(-200px)';
  }

  getCardZIndex(index: number): number {
    return index === this.activeIndex ? 3 : 1;
  }

  getCardOpacity(index: number): number {
    return index === this.activeIndex ? 1 : 0.6;
  }

  // Touch handling
  onTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    this.startX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    const endX = event.changedTouches[0].clientX;
    const diff = endX - this.startX;

    if (Math.abs(diff) > this.swipeThreshold) {
      if (diff < 0) {
        this.activeIndex = (this.activeIndex + 1) % this.totalSlides;
      } else {
        this.activeIndex = (this.activeIndex - 1 + this.totalSlides) % this.totalSlides;
      }
      this.cdr.markForCheck();
    }
  }

  // Navigation (infinite wrap)
  goToPrev(): void {
    this.activeIndex = (this.activeIndex - 1 + this.totalSlides) % this.totalSlides;
    this.cdr.markForCheck();
  }

  goToNext(): void {
    this.activeIndex = (this.activeIndex + 1) % this.totalSlides;
    this.cdr.markForCheck();
  }
}
