import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-why-nearshore',
  templateUrl: './why-nearshore.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhyNearshoreComponent {
  readonly benefits = inject(DataService).getBenefits();
}
