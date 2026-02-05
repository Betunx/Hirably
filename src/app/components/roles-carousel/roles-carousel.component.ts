// ====================================
// ROLES ACCORDION COMPONENT - TypeScript
// roles-carousel.component.ts (renamed functionality)
// ====================================
// Componente de acordeón para mostrar roles por categoría
// Diseño según Figma: acordeón izquierda + ilustración derecha

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-roles-carousel',
  templateUrl: './roles-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesCarouselComponent {

  // Sección actualmente expandida (null = ninguna)
  expandedSection: string | null = null;

  /**
   * Toggle para expandir/colapsar una sección del acordeón
   * Si se hace click en la sección ya expandida, se cierra
   */
  toggleAccordion(section: string): void {
    if (this.expandedSection === section) {
      this.expandedSection = null;
    } else {
      this.expandedSection = section;
    }
  }
}
