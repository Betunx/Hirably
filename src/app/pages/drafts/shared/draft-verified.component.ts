import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WhyHirablyComponent } from '@components/why-hirably/why-hirably.component';
import { A_VERIFIED, A_VERIFIED_INTRO } from './draft-a-copy';
import { DraftIconComponent } from './draft-icon.component';

/**
 * DESIGN DRAFT A ONLY. "Verified by Hirably": the four checks every candidate passes.
 * No new animation: it reuses WhyHirablyComponent's entrance (the pop, here on a check badge
 * instead of the heart, and the staggered card slide-ins), which needs #heart, #cardGrid and [data-love-card].
 */
@Component({
  selector: 'app-draft-verified',
  standalone: true,
  imports: [DraftIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="verified" class="bg-white border-t border-[#E8E8E8] py-20 lg:py-32">
      <div class="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <h2 class="font-sans font-extrabold hbd-large text-[#102076]">
          Verified by <span class="relative inline-block">Hirably<svg
              #heart aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              class="absolute -top-[0.3em] -right-[0.5em] w-[0.46em] h-[0.46em] pointer-events-none"
              style="transform-origin: 50% 90%; transform: rotate(12deg);">
              <path fill="none" stroke="#2291EA" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
                d="M12 3l7.5 3v5.6c0 4.5-3.2 8.2-7.5 9.4-4.3-1.2-7.5-4.9-7.5-9.4V6L12 3zM8.8 12.1l2.3 2.3 4.2-4.4" />
            </svg></span>
        </h2>
        <p class="mt-6 lg:mt-8 max-w-[620px] text-[18px] lg:text-[21px] leading-[1.5] text-[#4A5068]">{{ intro }}</p>

        <ol #cardGrid class="mt-12 lg:mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 list-none m-0 p-0">
          @for (step of steps; track step.title; let i = $index) {
          <li data-love-card class="rounded-2xl border border-[#E8E8E8] bg-white p-7">
            <div class="flex items-center justify-between">
              <span class="font-sans font-extrabold text-[40px] leading-none tracking-[-0.04em] text-[#102076]">0{{ i + 1 }}</span>
              <app-draft-icon [name]="step.icon" class="w-7 h-7 text-[#102076]" />
            </div>
            <h3 class="mt-8 font-sans font-bold text-[21px] leading-[1.2] tracking-[-0.02em] text-[#102076]">{{ step.title }}</h3>
            <p class="mt-2.5 text-[16px] leading-[1.6] text-[#4A5068]">{{ step.description }}</p>
          </li>
          }
        </ol>
      </div>
    </section>
  `
})
export class DraftVerifiedComponent extends WhyHirablyComponent {
  readonly intro = A_VERIFIED_INTRO;
  readonly steps = A_VERIFIED;
}
