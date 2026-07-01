import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-trust-bar',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section data-section="trust_bar" class="bg-floral-white pt-12 pb-12 lg:pt-[80px] lg:pb-[72px]">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">
    
        <!-- Marquee carousel (same pattern as the hero stats carousel). -->
        <div class="flex justify-center">
          <div class="overflow-hidden w-full max-w-[1000px]">
            <div
              style="mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%); -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);">
              <div class="flex items-center gap-6 lg:gap-8 animate-marquee" style="width: max-content;">
                @for (logo of marqueeLogos; track $index) {
                  <div class="h-14 lg:h-16 w-[150px] lg:w-[180px] rounded-lg bg-white border border-navy-dark/[0.06] shadow-sm flex items-center justify-center px-5 select-none flex-shrink-0">
                    <img [src]="logo.src" [alt]="logo.alt" loading="lazy"
                      [style.max-height.%]="logo.maxH ?? 68"
                      class="max-w-full w-auto object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <p class="text-center font-display font-medium text-[13px] lg:text-[15px] uppercase tracking-[0.12em] text-navy-dark/50 mt-4 lg:mt-5">
          Trusted by 125+ companies hiring in Mexico
        </p>
      </div>
    </section>
    `
})
export class TrustBarComponent {
  // Real client logos (assets/logos/brands-logos/).
  // maxH = max image height as % of the card (default 68). Bump per-logo for
  // logos that read too small at the default (e.g. Novel has internal padding).
  readonly brandLogos = [
    { src: 'assets/logos/brands-logos/alakai-capital.png', alt: 'Alakai Capital' },
    { src: 'assets/logos/brands-logos/buxton-consulting.jpg', alt: 'Buxton Consulting' },
    { src: 'assets/logos/brands-logos/ferrosource.jpg', alt: 'Ferrosource' },
    { src: 'assets/logos/brands-logos/novel-engineering.jpg', alt: 'Novel Engineering', maxH: 95 },
    { src: 'assets/logos/brands-logos/outlook-tax.jpg', alt: 'Outlook Tax' },
    { src: 'assets/logos/brands-logos/young-basile.png', alt: 'Young Basile' },
  ];

  // Duplicated set (SET 1 + SET 2) so the -50% marquee loops seamlessly.
  readonly marqueeLogos = [...this.brandLogos, ...this.brandLogos];
}
