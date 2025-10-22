/**
 * SCROLL SERVICE
 * Servicio centralizado para manejo de scroll y navegación
 * Elimina lógica duplicada de navegación en múltiples componentes
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  /**
   * Hace scroll suave a un elemento por su ID
   * @param elementId ID del elemento (sin #)
   * @param block Posición de alineación ('start', 'center', 'end')
   */
  scrollToId(elementId: string, block: ScrollLogicalPosition = 'start'): void {
    const element = document.getElementById(elementId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: block
      });
    } else {
      console.warn(`ScrollService: Element with id "${elementId}" not found`);
    }
  }

  /**
   * Hace scroll suave a la parte superior de la página
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Hace scroll a una posición específica en píxeles
   * @param position Posición Y en píxeles
   */
  scrollToPosition(position: number): void {
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  }

  /**
   * Obtiene la posición actual del scroll
   */
  getCurrentScrollPosition(): number {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  /**
   * Verifica si un elemento está visible en el viewport
   * @param elementId ID del elemento
   */
  isElementInViewport(elementId: string): boolean {
    const element = document.getElementById(elementId);

    if (!element) {
      return false;
    }

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
