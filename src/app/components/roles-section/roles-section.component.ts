import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-roles-section',
  templateUrl: './roles-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesSectionComponent {
  private readonly dataService = inject(DataService);
  private readonly router = inject(Router);

  readonly categories = this.dataService.getRoleCategories();
  readonly deptIds = new Set(this.dataService.getDepartmentIds());
  expandedSection: string | null = null;

  toggleAccordion(sectionId: string): void {
    this.expandedSection = this.expandedSection === sectionId ? null : sectionId;
  }

  onRoleClick(categoryId: string): void {
    if (this.deptIds.has(categoryId)) {
      this.router.navigate(['/roles', categoryId]);
    }
  }
}
