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

  constructor(
    private dataService: DataService,
    cdr: ChangeDetectorRef
  ) {
    super(cdr);
    this.autoplayDuration = 4000;
  }

  protected override loadItems(): void {
    this.roles = this.dataService.getRoles();
    this.items = this.roles;
  }

  protected override getDesktopVisibleItems(): number {
    return 1; // Roles carousel muestra 1 a la vez
  }

  onViewRoles(roleId: string): void {
    console.log('View roles for:', roleId);
    // Navigate to roles page or open modal
  }
}
