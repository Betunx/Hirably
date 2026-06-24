import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AnalyticsService } from '@services/analytics.service';
import { CareersService } from '@services/careers.service';
import { isPreprodHost } from '@core/preprod-host';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  /** Admin editor link shown only on preproduction/local (see CareersService). */
  readonly showAdminLink = inject(CareersService).isAdminUiVisible();

  /** Legal page links shown only on preproduction/local until legal approves. */
  readonly showLegalLinks = isPreprodHost();

  private readonly analytics = inject(AnalyticsService);

  trackContact(method: 'email' | 'phone'): void {
    this.analytics.contactClick(method);
  }

  trackOutbound(url: string): void {
    this.analytics.outboundClick(url);
  }
}
