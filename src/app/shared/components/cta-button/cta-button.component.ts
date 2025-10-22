/**
 * CTA BUTTON COMPONENT
 * Botón de Call-to-Action reutilizable
 * Elimina ~20 líneas duplicadas en 4+ ubicaciones
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="handleClick()"
      [disabled]="disabled"
      [ngClass]="{
        'bg-blue-600 hover:bg-blue-700 text-white': variant === 'primary',
        'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50': variant === 'secondary',
        'border-2 border-white text-white hover:bg-white hover:text-blue-900': variant === 'outline',
        'opacity-50 cursor-not-allowed': disabled
      }"
      class="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:hover:shadow-lg">
      {{ text }}
    </button>
  `,
  styles: []
})
export class CtaButtonComponent {
  /**
   * Texto del botón
   */
  @Input() text: string = 'Click aquí';

  /**
   * Variante del botón: primary (azul), secondary (blanco con borde), outline (transparente con borde blanco)
   */
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';

  /**
   * Estado deshabilitado
   */
  @Input() disabled: boolean = false;

  /**
   * Evento emitido al hacer click
   */
  @Output() buttonClick = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }
}
