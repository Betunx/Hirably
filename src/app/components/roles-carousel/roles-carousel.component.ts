// ====================================
// ROLES CAROUSEL COMPONENT - TypeScript
// roles-carousel.component.ts
// ====================================

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Role } from '../../models';
import { BaseCarouselComponent } from '../shared/base-carousel.component';

@Component({
  selector: 'app-roles-carousel',
  templateUrl: './roles-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesCarouselComponent extends BaseCarouselComponent<Role> {

  roles: Role[] = [];
  displayRoles: Role[] = [];

  constructor(
    private dataService: DataService,
    cdr: ChangeDetectorRef
  ) {
    super(cdr);
    this.autoplayDuration = 5000;
  }

  protected override loadItems(): void {
    this.roles = this.dataService.getRoles();
    // Crear array infinito: duplicar los roles para loop continuo
    this.displayRoles = [...this.roles, ...this.roles, ...this.roles];
    this.items = this.displayRoles;
    // Empezar en el segundo set para poder ir hacia atrás también
    this.currentIndex = this.roles.length;
  }

  protected override getDesktopVisibleItems(): number {
    return 1; // Roles carousel muestra 1 a la vez
  }

  override next(): void {
    this.currentIndex++;
    // Si llegamos al final del segundo set, saltar al inicio del segundo set sin animación
    if (this.currentIndex >= this.roles.length * 2) {
      setTimeout(() => {
        // Quitar transición temporalmente
        const carousel = document.querySelector('.roles-carousel-track') as HTMLElement;
        if (carousel) {
          carousel.style.transition = 'none';
          this.currentIndex = this.roles.length;
          this.cdr.markForCheck();
          // Restaurar transición después del salto
          setTimeout(() => {
            if (carousel) {
              carousel.style.transition = '';
            }
          }, 50);
        }
      }, 1000);
    }
    this.cdr.markForCheck();
  }

  override prev(): void {
    this.currentIndex--;
    // Si llegamos antes del segundo set, saltar al final del segundo set sin animación
    if (this.currentIndex < this.roles.length) {
      setTimeout(() => {
        const carousel = document.querySelector('.roles-carousel-track') as HTMLElement;
        if (carousel) {
          carousel.style.transition = 'none';
          this.currentIndex = this.roles.length * 2 - 1;
          this.cdr.markForCheck();
          setTimeout(() => {
            if (carousel) {
              carousel.style.transition = '';
            }
          }, 50);
        }
      }, 1000);
    }
    this.cdr.markForCheck();
  }

  /**
   * Obtiene el rol actual considerando el array triplicado
   */
  getCurrentRole(): Role {
    return this.displayRoles[this.currentIndex];
  }

  onViewRoles(roleId: string): void {
    console.log('View roles for:', roleId);
    // Navigate to roles page or open modal
  }

  /**
   * Gets the highlighter background color for each role title
   * Colors follow the pattern: bright-amber, periwinkle, icy-blue, dark-amethyst, floral-white
   */
  getTitleBackgroundColor(roleId: string): string {
    const colorMap: { [key: string]: string } = {
      'operations': 'bg-bright-amber text-carbon-black',
      'support': 'bg-periwinkle text-carbon-black',
      'finance': 'bg-icy-blue text-carbon-black',
      'tech': 'bg-dark-amethyst text-floral-white',
      'marketing': 'bg-floral-white text-carbon-black'
    };
    return colorMap[roleId] || 'bg-gray-900 text-white';
  }

  /**
   * Gets the text color for role items based on the role's background color
   * Matches the highlighter color for consistency
   */
  getRoleTextColor(roleId: string): string {
    const colorMap: { [key: string]: string } = {
      'operations': 'text-bright-amber',
      'support': 'text-periwinkle',
      'finance': 'text-icy-blue',
      'tech': 'text-dark-amethyst',
      'marketing': 'text-carbon-black'
    };
    return colorMap[roleId] || 'text-gray-700';
  }

  /**
   * Gets the 2 dots to display on the left of the current section
   */
  getLeftDots(): Array<{ index: number }> {
    const dots: Array<{ index: number }> = [];
    const totalRoles = this.roles.length;

    for (let i = 2; i >= 1; i--) {
      const index = (this.currentIndex - i + totalRoles) % totalRoles;
      dots.push({ index });
    }

    return dots;
  }

  /**
   * Gets the 2 dots to display on the right of the current section
   */
  getRightDots(): Array<{ index: number }> {
    const dots: Array<{ index: number }> = [];
    const totalRoles = this.roles.length;

    for (let i = 1; i <= 2; i++) {
      const index = (this.currentIndex + i) % totalRoles;
      dots.push({ index });
    }

    return dots;
  }

  /**
   * Gets the style for the current title in the navigation
   * Always yellow with black text
   */
  getCurrentTitleStyle(): string {
    return 'bg-bright-amber text-carbon-black';
  }

  /**
   * Gets the button background color for each role
   * Alternates between dark-amethyst, bright-amber, and carbon-black
   */
  getButtonColor(roleId: string): string {
    const colorMap: { [key: string]: string } = {
      'operations': 'bg-dark-amethyst hover:bg-dark-amethyst/90 text-floral-white',
      'support': 'bg-bright-amber hover:bg-bright-amber/90 text-carbon-black',
      'finance': 'bg-carbon-black hover:bg-carbon-black/90 text-floral-white',
      'tech': 'bg-dark-amethyst hover:bg-dark-amethyst/90 text-floral-white',
      'marketing': 'bg-bright-amber hover:bg-bright-amber/90 text-carbon-black'
    };
    return colorMap[roleId] || 'bg-dark-amethyst hover:bg-dark-amethyst/90 text-floral-white';
  }
}
