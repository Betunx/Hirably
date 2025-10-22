/**
 * SECTION HEADER COMPONENT
 * Componente reutilizable para headers de sección
 * Elimina ~80 líneas de código duplicado en 9+ ubicaciones
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center mb-12">
      <!-- Tag opcional (ej: "NUESTROS SERVICIOS") -->
      <p
        *ngIf="tag"
        class="text-blue-600 font-semibold uppercase tracking-wide mb-2">
        {{ tag }}
      </p>

      <!-- Título principal -->
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        {{ title }}
      </h2>

      <!-- Descripción opcional -->
      <p
        *ngIf="description"
        class="text-xl text-gray-600 max-w-3xl mx-auto">
        {{ description }}
      </p>
    </div>
  `,
  styles: []
})
export class SectionHeaderComponent {
  /**
   * Tag pequeño superior (opcional)
   * Ej: "NUESTROS SERVICIOS", "¿POR QUÉ HIRABLY?"
   */
  @Input() tag?: string;

  /**
   * Título principal de la sección (requerido)
   */
  @Input() title!: string;

  /**
   * Descripción de la sección (opcional)
   */
  @Input() description?: string;
}
