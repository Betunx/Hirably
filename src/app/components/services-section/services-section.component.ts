import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-services-section',
  templateUrl: './services-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesSectionComponent {
  readonly services = inject(DataService).getServices();
}
