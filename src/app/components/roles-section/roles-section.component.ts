import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@services/data.service';
import { RoleCategory } from '@models';

@Component({
  selector: 'app-roles-section',
  templateUrl: './roles-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesSectionComponent {
  readonly categories: RoleCategory[];
  readonly deptIds: Set<string>;
  expandedSection: string | null = null;

  constructor(private dataService: DataService, private router: Router) {
    this.categories = this.dataService.getRoleCategories();
    this.deptIds = new Set(this.dataService.getDepartmentIds());
  }

  toggleAccordion(sectionId: string): void {
    this.expandedSection = this.expandedSection === sectionId ? null : sectionId;
  }

  onRoleClick(categoryId: string): void {
    if (this.deptIds.has(categoryId)) {
      this.router.navigate(['/roles', categoryId]);
    }
  }

  trackByCategory(_index: number, category: RoleCategory): string {
    return category.id;
  }
}
