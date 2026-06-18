import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnalyticsService } from '@services/analytics.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(private analytics: AnalyticsService) {}

  trackContact(method: 'email' | 'phone'): void {
    this.analytics.contactClick(method);
  }

  trackOutbound(url: string): void {
    this.analytics.outboundClick(url);
  }
}
