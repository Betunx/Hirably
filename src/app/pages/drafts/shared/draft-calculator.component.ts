import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RateCalculatorComponent } from '@components/rate-calculator/rate-calculator.component';
import { DraftVariant } from './draft-copy';
import { A_CALC } from './draft-a-copy';

/**
 * DESIGN DRAFTS ONLY. The real rate calculator with a restyled template.
 * All logic (rates, US cost build-up, savings, lead capture to Formspree, Book a call hand-off,
 * rate_calculation / generate_lead events) is inherited unchanged from RateCalculatorComponent.
 *
 * Starting state: instead of an empty reserved area, desktop shows the results layout with neutral
 * placeholder bars (same size as the real numbers, so choosing a role never shifts the page).
 * Phones/tablets keep the original behaviour (results appear after a role is chosen).
 */
@Component({
  selector: 'app-draft-calculator',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './draft-calculator.component.html',
  styles: [`
    .dc-reveal { animation: dc-fade 250ms ease-out both; }
    @media (prefers-reduced-motion: reduce) { .dc-reveal { animation: none; } }
    @keyframes dc-fade { from { opacity: 0; } to { opacity: 1; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftCalculatorComponent extends RateCalculatorComponent {
  @Input({ required: true }) variant!: DraftVariant;
  /** 'split' = inputs left, results right (≥1024px). 'stacked' = one column at every width. */
  @Input() layout: 'split' | 'stacked' = 'split';

  // ── Copy: Draft A uses copy v2 (draft-a-copy.ts); B and C keep the original wording ──
  get includedList(): string[] {
    return this.variant === 'a' ? A_CALC.included : this.includedItems;
  }

  get usLabel(): string {
    return this.variant === 'a' ? A_CALC.usLabel : 'US local hire';
  }

  get footnote(): string {
    return this.variant === 'a' ? A_CALC.footnote
      : 'Your exact rate is locked in on a free 30-minute call, before you interview anyone.';
  }

  get sentText(): string {
    return this.variant === 'a' ? A_CALC.sent : 'Sample profiles on their way within 5 business days.';
  }

  get split(): boolean {
    return this.layout === 'split';
  }

  get headingClass(): string {
    return this.variant === 'b'
      ? 'font-sans font-tight font-bold tracking-[-0.02em]'
      : 'font-sans font-extrabold tracking-[-0.025em]';
  }

  /** Corner radius of inputs, toggles and buttons. */
  get radius(): string {
    return this.variant === 'b' ? 'rounded-lg' : 'rounded-xl';
  }

  /** Placeholder style for numbers while no role is chosen. */
  skel(): string {
    return this.revealed() ? '' : 'text-transparent bg-[#EDEFF3] rounded-md select-none';
  }
}
