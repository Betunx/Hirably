import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AnalyticsService } from '@services/analytics.service';
import { CareersService } from '@services/careers.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  /** Admin editor link shown only on preproduction/local (see CareersService). */
  readonly showAdminLink = inject(CareersService).isAdminUiVisible();

  private readonly analytics = inject(AnalyticsService);

  trackContact(method: 'email' | 'phone'): void {
    this.analytics.contactClick(method);
  }

  trackOutbound(url: string): void {
    this.analytics.outboundClick(url);
  }
}
