import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AnalyticsService } from '@services/analytics.service';
import { CareersService } from '@services/careers.service';
import { DataService } from '@services/data.service';
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

  /** "Roles" column: one link per department page (/roles/:id), same list as the roles data. */
  readonly departments = inject(DataService).getRoleCategories().map(c => ({ id: c.id, title: c.title }));

  private readonly analytics = inject(AnalyticsService);

  trackContact(method: 'email' | 'phone'): void {
    this.analytics.contactClick(method);
  }

  trackOutbound(url: string): void {
    this.analytics.outboundClick(url);
  }
}
