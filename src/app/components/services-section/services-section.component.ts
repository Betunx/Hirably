import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Service } from '../../models';
import { BaseDataComponent } from '../../shared/base/base-data.component';

@Component({
  selector: 'app-services-section',
  templateUrl: './services-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesSectionComponent extends BaseDataComponent {
  services: Service[] = [];
  description: string = '';

  constructor(private dataService: DataService) {
    super();
  }

  protected override loadData(): void {
    this.services = this.dataService.getServices();
    this.description = this.dataService.getHeroDescription();
  }
}