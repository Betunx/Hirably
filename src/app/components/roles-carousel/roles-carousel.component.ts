// ====================================
// ROLES CAROUSEL COMPONENT - TypeScript
// roles-carousel.component.ts
// ====================================
// Este componente muestra un carousel de roles disponibles.
// Usa un patrón de "infinite scroll" duplicando los items 3 veces.

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataService } from '@services/data.service';
import { Role } from '@models';
import { BaseCarouselComponent } from '@components/shared/base-carousel.component';

@Component({
  selector: 'app-roles-carousel',
  templateUrl: './roles-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesCarouselComponent extends BaseCarouselComponent<Role> {

  // Array original de roles (5 roles)
  roles: Role[] = [];

  // Array triplicado para infinite scroll (15 roles: 5 + 5 + 5)
  displayRoles: Role[] = [];

  constructor(
    private dataService: DataService,
    cdr: ChangeDetectorRef
  ) {
    super(cdr);
    this.autoplayDuration = 5000; // 5 segundos entre cambios automáticos
  }

  // ====================================
  // MÉTODOS DEL CICLO DE VIDA
  // ====================================

  /**
   * Carga los roles del servicio y prepara el carousel
   */
  protected override loadItems(): void {
    this.roles = this.dataService.getRoles();

    // Estrategia de infinite scroll: triplicar el array
    // [A, B, C, D, E] -> [A, B, C, D, E, A, B, C, D, E, A, B, C, D, E]
    this.displayRoles = [...this.roles, ...this.roles, ...this.roles];
    this.items = this.displayRoles;

    // Empezar en el segundo set (índice 5) para poder navegar hacia atrás
    this.currentIndex = this.roles.length;
  }

  protected override getDesktopVisibleItems(): number {
    return 1; // Solo mostrar 1 rol a la vez en todas las pantallas
  }

  // ====================================
  // NAVEGACIÓN DEL CAROUSEL
  // ====================================

  /**
   * Avanza al siguiente rol
   * Cuando llega al final del segundo set, salta al inicio del segundo set
   */
  override next(): void {
    this.currentIndex++;

    // Si llegamos al final del segundo set (índice 10 en un array de 5 items)
    // saltamos de vuelta al inicio del segundo set (índice 5)
    if (this.currentIndex >= this.roles.length * 2) {
      setTimeout(() => {
        this.resetToMiddleSet();
      }, 1000); // Esperar a que termine la animación CSS
    }

    this.cdr.markForCheck();
  }

  /**
   * Retrocede al rol anterior
   * Cuando llega al inicio del segundo set, salta al final del segundo set
   */
  override prev(): void {
    this.currentIndex--;

    // Si llegamos antes del segundo set (índice < 5)
    // saltamos al final del segundo set (índice 9 en un array de 5 items)
    if (this.currentIndex < this.roles.length) {
      setTimeout(() => {
        this.resetToMiddleSet(true);
      }, 1000); // Esperar a que termine la animación CSS
    }

    this.cdr.markForCheck();
  }

  /**
   * Salta a un índice específico del carousel
   * Los dots de navegación usan el índice del array ORIGINAL (0-4)
   */
  override goToSlide(originalIndex: number): void {
    this.isAutoPlaying = false;
    // Convertir índice original (0-4) a índice del segundo set (5-9)
    this.currentIndex = this.roles.length + originalIndex;
    this.cdr.markForCheck();
  }

  // ====================================
  // MÉTODOS DE AYUDA PARA NAVEGACIÓN
  // ====================================

  /**
   * Reinicia el carousel al segundo set sin animación visible
   * Esto crea la ilusión de un scroll infinito
   */
  private resetToMiddleSet(isGoingBackward: boolean = false): void {
    const carousel = document.querySelector('.roles-carousel-track') as HTMLElement;

    if (carousel) {
      // Paso 1: Quitar la transición CSS
      carousel.style.transition = 'none';

      // Paso 2: Saltar al segundo set
      if (isGoingBackward) {
        // Si íbamos hacia atrás, saltar al final del segundo set
        this.currentIndex = this.roles.length * 2 - 1;
      } else {
        // Si íbamos hacia adelante, saltar al inicio del segundo set
        this.currentIndex = this.roles.length;
      }

      this.cdr.markForCheck();

      // Paso 3: Restaurar la transición después de que el salto se haya aplicado
      setTimeout(() => {
        if (carousel) {
          carousel.style.transition = '';
        }
      }, 50);
    }
  }

  /**
   * Calcula qué índices mostrar como dots de navegación a la IZQUIERDA
   * Retorna los 2 índices anteriores al actual
   */
  getLeftDots(): Array<{ index: number }> {
    const totalRoles = this.roles.length;
    const normalizedIndex = this.currentIndex % totalRoles;

    return [
      { index: (normalizedIndex - 2 + totalRoles) % totalRoles },
      { index: (normalizedIndex - 1 + totalRoles) % totalRoles }
    ];
  }

  /**
   * Calcula qué índices mostrar como dots de navegación a la DERECHA
   * Retorna los 2 índices siguientes al actual
   */
  getRightDots(): Array<{ index: number }> {
    const totalRoles = this.roles.length;
    const normalizedIndex = this.currentIndex % totalRoles;

    return [
      { index: (normalizedIndex + 1) % totalRoles },
      { index: (normalizedIndex + 2) % totalRoles }
    ];
  }

  // ====================================
  // GETTERS PARA EL TEMPLATE
  // ====================================

  /**
   * Obtiene el rol que se está mostrando actualmente
   */
  get currentRole(): Role {
    return this.displayRoles[this.currentIndex];
  }

  // ====================================
  // HANDLERS DE EVENTOS
  // ====================================

  /**
   * Maneja el click en el botón "View Roles"
   */
  onViewRoles(roleId: string): void {
    // TODO: Implementar navegación a página de roles o abrir modal
    console.log('Ver roles para:', roleId);
  }
}
