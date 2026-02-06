import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '@services/data.service';
import { Service } from '@models';

@Component({
  selector: 'app-services-section',
  templateUrl: './services-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesSectionComponent {
  readonly services: Service[];

  constructor(private dataService: DataService) {
    this.services = this.dataService.getServices();
  }
}
