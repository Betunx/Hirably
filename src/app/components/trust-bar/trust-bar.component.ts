import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trust-bar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section data-section="trust_bar" class="bg-floral-white pt-8 pb-10 lg:pt-10 lg:pb-12">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">

        <p class="text-center font-display font-medium text-[13px] lg:text-[15px] uppercase tracking-[0.12em] text-navy-dark/50 mb-6 lg:mb-8">
          Trusted by 125+ companies hiring in Mexico
        </p>

        <!-- TODO: reemplazar los placeholders por logos reales de clientes
             (subir a assets/logos/clients/ y mapear aquí). Ver docs/TODO-DEV.md -->
        <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 lg:gap-x-14">
          <div *ngFor="let logo of placeholderLogos"
            class="h-7 lg:h-9 w-[104px] lg:w-[130px] rounded-md bg-navy-dark/[0.06] flex items-center justify-center select-none">
            <span class="font-display font-medium text-[11px] lg:text-[12px] uppercase tracking-wide text-navy-dark/30">{{ logo }}</span>
          </div>
        </div>

      </div>
    </section>
  `
})
export class TrustBarComponent {
  // Placeholder slots — replace with real client logos when provided.
  readonly placeholderLogos = ['Logo', 'Logo', 'Logo', 'Logo', 'Logo', 'Logo'];
}
