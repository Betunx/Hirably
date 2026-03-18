import {
  Component,
  Input,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-carousel.component.html',
  styleUrls: ['./mobile-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileCarouselComponent implements AfterViewInit, OnDestroy {
  @Input() showDots = false;
  @Input() showArrows = true;
  @Input() totalSlides = 3;
  @Input() peekPercent = 8; // fallback % of adjacent card visible on each side
  @Input() initialIndex = 0;

  @ViewChild('track') trackEl!: ElementRef<HTMLDivElement>;
  @ViewChild('container') containerEl!: ElementRef<HTMLDivElement>;

  currentIndex = 0;
  translateX = 0;
  isDragging = false;

  private startX = 0;
  private startY = 0;
  private lockAxis: 'horizontal' | 'vertical' | null = null;
  private currentTranslate = 0;
  private prevTranslate = 0;
  private containerWidth = 0;
  private slideWidth = 0;
  private peekOffset = 0;
  private swipeThreshold = 50;
  private resizeObserver: ResizeObserver | null = null;

  constructor(private cdr: ChangeDetectorRef, private zone: NgZone) {}

  ngAfterViewInit(): void {
    // Delay one frame so projected content is fully rendered and measurable
    this.currentIndex = this.initialIndex;
    requestAnimationFrame(() => {
      this.calculateDimensions();
      this.cdr.markForCheck();
    });

    this.zone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => {
        this.calculateDimensions();
        this.zone.run(() => this.cdr.markForCheck());
      });
      this.resizeObserver.observe(this.containerEl.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  get slidesArray(): number[] {
    return Array.from({ length: this.totalSlides }, (_, i) => i);
  }

  // --- Touch handling ---

  onTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    this.lockAxis = null;
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.prevTranslate = this.translateX;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;

    const dx = Math.abs(event.touches[0].clientX - this.startX);
    const dy = Math.abs(event.touches[0].clientY - this.startY);

    if (!this.lockAxis) {
      this.lockAxis = dx > dy ? 'horizontal' : 'vertical';
    }

    if (this.lockAxis === 'vertical') return; // let the page scroll normally

    event.preventDefault();

    const diff = event.touches[0].clientX - this.startX;
    this.currentTranslate = this.prevTranslate + diff;

    const minTranslate = -this.slideWidth * (this.totalSlides - 1);
    if (this.currentTranslate > 0) {
      this.currentTranslate = this.currentTranslate * 0.3;
    } else if (this.currentTranslate < minTranslate) {
      this.currentTranslate = minTranslate + (this.currentTranslate - minTranslate) * 0.3;
    }

    this.translateX = this.currentTranslate;
    this.cdr.markForCheck();
  }

  onTouchEnd(): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    if (this.lockAxis !== 'horizontal') {
      return;
    }

    const diff = this.translateX - this.prevTranslate;

    if (Math.abs(diff) > this.swipeThreshold) {
      if (diff < 0 && this.currentIndex < this.totalSlides - 1) {
        this.currentIndex++;
      } else if (diff > 0 && this.currentIndex > 0) {
        this.currentIndex--;
      }
    }

    this.snapToSlide();
  }

  // --- Navigation ---

  goTo(index: number): void {
    this.currentIndex = Math.max(0, Math.min(index, this.totalSlides - 1));
    this.snapToSlide();
  }

  goToPrev(): void {
    this.goTo(this.currentIndex - 1);
  }

  goToNext(): void {
    this.goTo(this.currentIndex + 1);
  }

  // --- Layout ---

  private snapToSlide(): void {
    this.translateX = -this.currentIndex * this.slideWidth;
    this.cdr.markForCheck();
  }

  private calculateDimensions(): void {
    if (!this.containerEl) return;
    this.containerWidth = this.containerEl.nativeElement.offsetWidth;

    // Measure actual first projected child for accurate slide step
    const firstChild = this.trackEl?.nativeElement?.firstElementChild as HTMLElement;
    if (firstChild) {
      const style = getComputedStyle(firstChild);
      const marginLeft = parseFloat(style.marginLeft) || 0;
      const marginRight = parseFloat(style.marginRight) || 0;
      this.slideWidth = firstChild.offsetWidth + marginLeft + marginRight;
    } else {
      // Fallback before children are rendered
      this.slideWidth = this.containerWidth * (100 - 2 * this.peekPercent) / 100;
    }

    // Center the active slide: offset = (container - slideWidth) / 2
    this.peekOffset = (this.containerWidth - this.slideWidth) / 2;

    this.snapToSlide();
  }

  getTrackTransform(): string {
    return `translateX(${this.translateX}px)`;
  }

  getTrackOffset(): string {
    if (this.peekOffset > 0) {
      return `${this.peekOffset}px`;
    }
    return `${this.peekPercent}%`;
  }
}
