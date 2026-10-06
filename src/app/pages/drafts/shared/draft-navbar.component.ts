import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '@core/navbar/navbar.component';
import { DraftVariant } from './draft-copy';

/**
 * DESIGN DRAFTS ONLY. Restyled navbar. Logic (menu, CTA tracking, fragment scrolling) is inherited
 * from the real NavbarComponent; section links stay on the current draft page instead of going to "/".
 */
@Component({
  selector: 'app-draft-navbar',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="fixed top-0 inset-x-0 z-[1000] border-b"
      [ngClass]="dark ? 'bg-[#102076] border-white/10' : 'bg-white border-[#E8E8E8]'">
      <div class="mx-auto max-w-[1280px] h-16 lg:h-[72px] px-4 sm:px-6 lg:px-8 grid grid-cols-[1fr_auto_1fr] items-center">
        <button type="button" (click)="navigateToHome()" aria-label="Go to top of page"
          class="justify-self-start bg-transparent border-none p-0 cursor-pointer">
          <img [src]="dark ? 'assets/logos/logo-white.svg' : 'assets/logos/logo 2.svg'" alt="Hirably" class="h-7 lg:h-8 w-auto" />
        </button>

        <ul class="hidden lg:flex items-center gap-9 list-none m-0 p-0">
          @for (link of navLinks; track link.label) {
          <li>
            <button type="button" (click)="navigateToSection('', link.fragment)"
              class="bg-transparent border-none p-0 cursor-pointer text-[15px] font-medium transition-colors"
              [ngClass]="dark ? 'text-[#FFFCF5]/85 hover:text-[#FFFCF5]' : 'text-[#102076]/80 hover:text-[#102076]'">
              {{ link.label }}</button>
          </li>
          }
        </ul>

        <div class="col-start-3 justify-self-end flex items-center gap-2">
          <button type="button" (click)="navigateToContact('start-hiring')"
            class="font-semibold text-[14px] px-4 lg:px-5 py-2.5 border-none cursor-pointer transition-opacity hover:opacity-90"
            [ngClass]="[dark ? 'bg-[#FFFCF5] text-[#102076]' : 'bg-[#102076] text-white', variant === 'b' ? 'rounded-lg' : 'rounded-full']">
            @if (variant === 'a') {Start Hiring} @else {<span class="lg:hidden">Start Hiring</span><span class="hidden lg:inline">Start Hiring Today</span>}
          </button>
          <button type="button" class="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-transparent border-none cursor-pointer"
            (click)="toggleMenu()" [attr.aria-expanded]="isMenuOpen" aria-label="Toggle navigation menu">
            @for (bar of [0, 1, 2]; track bar) {
            <span class="block w-5 h-[1.5px] transition-all duration-200" [ngClass]="dark ? 'bg-[#FFFCF5]' : 'bg-[#102076]'"></span>
            }
          </button>
        </div>
      </div>

      @if (isMenuOpen) {
      <div class="lg:hidden border-t px-4 pb-6 pt-2" [ngClass]="dark ? 'bg-[#102076] border-white/10' : 'bg-white border-[#E8E8E8]'">
        <ul class="list-none m-0 p-0 flex flex-col">
          @for (link of navLinks; track link.label) {
          <li>
            <button type="button" (click)="navigateToSection('', link.fragment)"
              class="w-full text-left bg-transparent border-none py-3.5 text-[17px] font-medium cursor-pointer"
              [ngClass]="dark ? 'text-[#FFFCF5]' : 'text-[#102076]'">{{ link.label }}</button>
          </li>
          }
        </ul>
      </div>
      }
    </nav>
  `
})
export class DraftNavbarComponent extends NavbarComponent {
  @Input({ required: true }) variant!: DraftVariant;

  private readonly draftRouter = inject(Router);

  override navLinks = [
    { label: 'How it works', fragment: 'how-it-works' },
    { label: 'Benefits', fragment: 'why-hirably' },
    { label: 'Why nearshore?', fragment: 'key-benefits' },
    { label: 'Pricing', fragment: 'pricing' },
  ];

  get dark(): boolean {
    return this.variant === 'c';
  }

  /** Stay on the current draft page (the real navbar always navigates to "/"). */
  override navigateToSection(_route: string, fragment?: string): void {
    super.navigateToSection(this.currentPath(), fragment);
  }

  override navigateToHome(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.closeMenu();
  }

  private currentPath(): string {
    return this.draftRouter.url.split(/[?#]/)[0];
  }
}
