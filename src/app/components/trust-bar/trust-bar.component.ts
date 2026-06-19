import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-trust-bar',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section data-section="trust_bar" class="bg-floral-white pt-8 pb-10 lg:pt-10 lg:pb-12">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">
    
        <p class="text-center font-display font-medium text-[13px] lg:text-[15px] uppercase tracking-[0.12em] text-navy-dark/50 mb-6 lg:mb-8">
          Trusted by 125+ companies hiring in Mexico
        </p>
    
        <!-- Marquee carousel (same pattern as the hero stats carousel).
             TODO: reemplazar los placeholders por logos reales de clientes
             (subir a assets/logos/clients/ y mapear en logos[]). -->
        <div class="flex justify-center">
          <div class="overflow-hidden w-full max-w-[1000px]">
            <div
              style="mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%); -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);">
              <div class="flex items-center gap-8 lg:gap-14 animate-marquee" style="width: max-content;">
                @for (logo of marqueeLogos; track $index) {
                  <div
                    class="h-7 lg:h-9 w-[104px] lg:w-[130px] rounded-md bg-navy-dark/[0.06] flex items-center justify-center select-none flex-shrink-0">
                    <span class="font-display font-medium text-[11px] lg:text-[12px] uppercase tracking-wide text-navy-dark/30">{{ logo }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    `
})
export class TrustBarComponent {
  // Placeholder slots — replace with real client logos when provided.
  readonly placeholderLogos = ['Logo', 'Logo', 'Logo', 'Logo', 'Logo', 'Logo'];

  // Duplicated set (SET 1 + SET 2) so the -50% marquee loops seamlessly.
  readonly marqueeLogos = [...this.placeholderLogos, ...this.placeholderLogos];
}
