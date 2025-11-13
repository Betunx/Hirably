// ====================================
// BASE CAROUSEL COMPONENT - TypeScript
// Componente base abstracto para todos los carousels
// ====================================

import { Directive, OnInit, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';

@Directive()
export abstract class BaseCarouselComponent<T> implements OnInit, OnDestroy {

  // Propiedades comunes
  items: T[] = [];
  currentIndex: number = 0;
  isAutoPlaying: boolean = true;
  visibleItems: number = 1;

  protected autoplayInterval: any;
  protected autoplayDuration: number = 4000; // 4 segundos por defecto

  constructor(protected cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadItems();
    this.updateVisibleItems();
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  // Método abstracto que cada carousel debe implementar
  protected abstract loadItems(): void;

  // Responsive: detectar cambios de tamaño de ventana
  @HostListener('window:resize')
  onResize(): void {
    this.updateVisibleItems();
    this.cdr.markForCheck();
  }

  // Actualizar cantidad de items visibles según el tamaño de ventana
  protected updateVisibleItems(): void {
    if (typeof window === 'undefined') {
      this.visibleItems = 1;
      return;
    }

    const width = window.innerWidth;
    if (width < 768) {
      this.visibleItems = 1;
    } else if (width < 1024) {
      this.visibleItems = 2;
    } else {
      this.visibleItems = this.getDesktopVisibleItems();
    }
  }

  // Sobrescribir en componentes hijos si necesitan diferente cantidad en desktop
  protected getDesktopVisibleItems(): number {
    return 3;
  }

  // Autoplay
  startAutoplay(): void {
    this.stopAutoplay(); // Limpiar cualquier interval previo
    this.autoplayInterval = setInterval(() => {
      if (this.isAutoPlaying) {
        this.next();
        this.cdr.markForCheck();
      }
    }, this.autoplayDuration);
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  // Navegación
  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
  }

  goToSlide(index: number): void {
    this.isAutoPlaying = false;
    this.currentIndex = index;
    this.cdr.markForCheck();
  }

  // Obtener items visibles en el carousel
  getVisibleItems(): T[] {
    const visible: T[] = [];
    for (let i = 0; i < this.visibleItems; i++) {
      const index = (this.currentIndex + i) % this.items.length;
      visible.push(this.items[index]);
    }
    return visible;
  }

  // Transform CSS para animación (usado en algunos carousels)
  getTransform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }
}
