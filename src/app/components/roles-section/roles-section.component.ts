import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '@services/data.service';
import { RoleCategory } from '@models';

@Component({
  selector: 'app-roles-section',
  templateUrl: './roles-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesSectionComponent {
  readonly categories: RoleCategory[];
  expandedSection: string | null = null;

  constructor(private dataService: DataService) {
    this.categories = this.dataService.getRoleCategories();
  }

  toggleAccordion(sectionId: string): void {
    this.expandedSection = this.expandedSection === sectionId ? null : sectionId;
  }

  trackByCategory(_index: number, category: RoleCategory): string {
    return category.id;
  }
}
