/**
 * BASE DATA COMPONENT
 * Clase base abstracta para componentes que solo cargan datos del DataService
 * Elimina el patrón repetitivo de constructor + ngOnInit en 5+ componentes
 */

import { Directive, OnInit } from '@angular/core';

/**
 * Componente base abstracto que maneja el patrón común de:
 * 1. Inyectar DataService
 * 2. Cargar datos en ngOnInit
 * 3. Almacenar datos en una propiedad
 *
 * Uso:
 * @example
 * export class RolesCarouselComponent extends BaseDataComponent {
 *   roles: Role[] = [];
 *
 *   protected override loadData(): void {
 *     this.roles = this.dataService.getRoles();
 *   }
 * }
 */
@Directive()
export abstract class BaseDataComponent implements OnInit {

  /**
   * Lifecycle hook que ejecuta la carga de datos
   */
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Método abstracto que debe ser implementado por las clases hijas
   * para definir cómo cargar sus datos específicos
   */
  protected abstract loadData(): void;
}
