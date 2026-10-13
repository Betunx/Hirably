import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RateCalculatorComponent } from '@app/components/rate-calculator/rate-calculator.component';

// Keep in sync with scripts/og-pages.mjs, which writes these tags into the static HTML that link previews
// (LinkedIn) read without running JavaScript. The build fails if the two differ.
const PAGE_TITLE = 'What will a hire in Mexico actually cost? | Hirably';
const PAGE_DESCRIPTION = 'Pick a role and see your all-inclusive rate next to a US hire, in seconds.';
const PAGE_URL = 'https://hirablystaffing.com/mexico-calculator';
const PAGE_IMAGE = 'https://hirablystaffing.com/assets/img/og-mexico-calculator.png';

/** Head tags this page overrides; restored on leave so other pages keep the defaults from index.html. */
const TAGS = [
  { attr: 'name', key: 'description', content: PAGE_DESCRIPTION },
  { attr: 'property', key: 'og:url', content: PAGE_URL },
  { attr: 'property', key: 'og:title', content: PAGE_TITLE },
  { attr: 'property', key: 'og:description', content: PAGE_DESCRIPTION },
  { attr: 'property', key: 'og:image', content: PAGE_IMAGE },
  { attr: 'name', key: 'twitter:title', content: PAGE_TITLE },
  { attr: 'name', key: 'twitter:description', content: PAGE_DESCRIPTION },
  { attr: 'name', key: 'twitter:image', content: PAGE_IMAGE },
] as const;

/**
 * Standalone rate calculator (/mexico-calculator): a headline and the homepage hero's calculator, on the same
 * blue gradient. The calculator component is reused as is (logic, leads, Book a call, tracking); only its own
 * card title is hidden here, since the page headline replaces it.
 */
@Component({
  standalone: true,
  imports: [RateCalculatorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    /* Cream on the light hero blue: same soft navy shadow as the homepage headline (in em, scales with the type) */
    .mc-headline { text-shadow: 0 0 0.05em rgba(16, 32, 118, 0.6), 0 0.02em 0.2em rgba(16, 32, 118, 0.35); text-wrap: balance; }
    /* The page headline replaces the calculator card title on this page only */
    :host ::ng-deep app-rate-calculator h2 { display: none; }
    /* Once a role is picked the calculator fades its hint out but keeps its space; with no title above it, drop
       the whole block so the inputs line up with the top of the results */
    :host ::ng-deep app-rate-calculator div:has(> h2):has(> p.opacity-0) { display: none; }
  `],
  template: `
    <section data-section="mexico_calculator" class="relative min-h-[92svh]"
      style="background: linear-gradient(180deg, #2291ea 0%, #4ba6ee 38%, #bbe2fd 74%, #FFFBF4 100%);">
      <div class="relative w-full px-6 md:px-12 pt-[140px] md:pt-[164px] lg:pt-[178px] section-bottom">
        <div class="max-w-7xl mx-auto flex flex-col items-center gap-10 lg:gap-12">
          <div class="w-full">
            <h1 class="mc-headline section-title font-display text-center text-[#FFFCF5]">
              What will a hire in Mexico actually cost?</h1>
          </div>
          <!-- Same wrapper as the hero: 460px stacked on phones/tablets, ~1100px with two panes ≥1024px -->
          <div class="w-full max-w-[460px] lg:max-w-[1100px] mx-auto p-6 lg:p-10 pb-0 lg:pb-0">
            <app-rate-calculator></app-rate-calculator>
          </div>
        </div>
      </div>
    </section>
  `
})
export class MexicoCalculatorPageComponent implements OnInit, OnDestroy {
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);
  private readonly previous = new Map<string, string | null>();
  private canonical: HTMLLinkElement | null = null;
  private previousCanonical: string | null = null;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.titleService.setTitle(PAGE_TITLE);
    for (const t of TAGS) {
      const selector = `${t.attr}="${t.key}"`;
      this.previous.set(selector, this.meta.getTag(selector)?.content ?? null);
      this.meta.updateTag({ [t.attr]: t.key, content: t.content });
    }
    this.canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    this.previousCanonical = this.canonical?.getAttribute('href') ?? null;
    this.canonical?.setAttribute('href', PAGE_URL);
  }

  ngOnDestroy(): void {
    for (const t of TAGS) {
      const selector = `${t.attr}="${t.key}"`;
      const content = this.previous.get(selector);
      if (content != null) this.meta.updateTag({ [t.attr]: t.key, content });
    }
    if (this.canonical && this.previousCanonical != null) this.canonical.setAttribute('href', this.previousCanonical);
  }
}
