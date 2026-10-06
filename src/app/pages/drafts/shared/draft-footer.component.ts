import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '@core/footer/footer.component';
import { DraftVariant, FOOTER_ADDRESS } from './draft-copy';
import { A_FOOTER_LINE } from './draft-a-copy';

/** DESIGN DRAFTS ONLY. Restyled footer; links and tracking are inherited from the real FooterComponent. */
@Component({
  selector: 'app-draft-footer',
  standalone: true,
  imports: [NgClass, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer [ngClass]="theme.bg">
      <div class="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-14 pb-8 lg:pt-20">
        <div class="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <img [src]="dark ? 'assets/logos/logo-white.svg' : 'assets/logos/logo 2.svg'" alt="Hirably" class="h-8 w-auto" loading="lazy" />
            <p class="mt-5 max-w-[340px] text-[15px] leading-[23px]" [ngClass]="theme.muted">
              {{ variant === 'a' ? aLine : 'Your trusted partner for nearshore hiring in Mexico. From recruitment to payroll, we handle everything.' }}</p>
            <p class="mt-4 text-[14px] font-medium" [ngClass]="theme.text">{{ address }}</p>
          </div>

          <nav aria-label="Roles">
            <p class="text-[13px] font-semibold uppercase tracking-[0.08em]" [ngClass]="theme.muted">Roles</p>
            <ul class="mt-4 flex flex-col gap-2.5 list-none p-0 m-0">
              @for (dept of departments; track dept.id) {
              <li><a [routerLink]="['/roles', dept.id]" class="text-[15px] hover:underline underline-offset-4" [ngClass]="theme.text">{{ dept.title }}</a></li>
              }
            </ul>
          </nav>

          <div>
            <p class="text-[13px] font-semibold uppercase tracking-[0.08em]" [ngClass]="theme.muted">Contact us</p>
            <ul class="mt-4 flex flex-col gap-2.5 list-none p-0 m-0">
              <li><a href="mailto:info@hirablystaffing.com" (click)="trackContact('email')" class="text-[15px] hover:underline underline-offset-4 break-all" [ngClass]="theme.text">info&#64;hirablystaffing.com</a></li>
              <li><a href="tel:+1909566-9759" (click)="trackContact('phone')" class="text-[15px] hover:underline underline-offset-4" [ngClass]="theme.text">+1 (909) 566-9759</a></li>
              <li><a routerLink="/careers" class="text-[15px] hover:underline underline-offset-4" [ngClass]="theme.text">Careers</a></li>
              @if (showAdminLink) {
              <li><a routerLink="/careers/admin" class="text-[15px] hover:underline underline-offset-4" [ngClass]="theme.text">Edit careers</a></li>
              }
              <li class="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                @for (s of socials; track s.url) {
                <a [href]="s.url" target="_blank" rel="noopener noreferrer" (click)="trackOutbound(s.url)"
                  class="text-[15px] underline underline-offset-4" [ngClass]="theme.text">{{ s.label }}</a>
                }
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-12 pt-6 border-t flex flex-col sm:flex-row gap-3 sm:justify-between text-[13px]" [ngClass]="[theme.border, theme.muted]">
          <p>© {{ currentYear }} Hirably. All rights reserved.</p>
          @if (showLegalLinks) {
          <p class="flex gap-4">
            <a routerLink="/privacy-policy" class="underline underline-offset-4">Privacy Policy</a>
            <a routerLink="/terms-of-service" class="underline underline-offset-4">Terms of Service</a>
          </p>
          }
        </div>
      </div>
    </footer>
  `
})
export class DraftFooterComponent extends FooterComponent {
  @Input({ required: true }) variant!: DraftVariant;

  readonly address = FOOTER_ADDRESS;
  /** Draft A copy v2. */
  readonly aLine = A_FOOTER_LINE;
  readonly socials = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/hirably-staffing/about/' },
    { label: 'Instagram', url: 'https://www.instagram.com/hirablystaffing/' },
    { label: 'Facebook', url: 'https://www.facebook.com/people/Hirably/61590907950455/' },
  ];

  get dark(): boolean {
    return this.variant === 'c';
  }

  get theme(): { bg: string; text: string; muted: string; border: string } {
    if (this.variant === 'c') {
      return { bg: 'bg-[#102076]', text: 'text-[#FFFCF5]', muted: 'text-[#FFFCF5]/75', border: 'border-white/15' };
    }
    return {
      bg: this.variant === 'b' ? 'bg-[#FFFCF5] border-t border-[#E8E8E8]' : 'bg-white border-t border-[#E8E8E8]',
      text: 'text-[#102076]',
      muted: 'text-[#4A5068]',
      border: 'border-[#E8E8E8]',
    };
  }
}
