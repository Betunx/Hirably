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
        'bg-primary-blue hover:bg-navy-dark text-white': variant === 'primary',
        'bg-white text-primary-blue border-2 border-primary-blue hover:bg-sky-blue/20': variant === 'secondary',
        'border-2 border-white text-white hover:bg-white hover:text-navy-dark': variant === 'outline',
        'bg-navy-dark hover:bg-primary-blue text-white': variant === 'navy',
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
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'navy' = 'primary';

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
