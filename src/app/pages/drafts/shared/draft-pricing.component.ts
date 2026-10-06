import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PricingSectionComponent } from '@components/pricing-section/pricing-section.component';
import { PricingFeatureGroup } from '@models';
import { DraftVariant, PRICING_FOOTER } from './draft-copy';
import { A_PRICING } from './draft-a-copy';
import { DraftIconComponent } from './draft-icon.component';

/** Recruitment checklist correction for the drafts (the real data.service.ts is not changed). */
const FEATURE_FIXES: Record<string, string> = {
  'Sourcing, Screening & Background Checks': 'Sourcing & Screening',
};

interface PricingCardView {
  key: 'eor' | 'recruitment';
  eyebrow: string;
  headline: string;
  line: string;
  features: string[];
  pricePrefix: string;
  price: string;
  priceSuffix: string;
  cta: string;
}

/** Every visible string of the section, so Draft A (copy v2) and Drafts B/C share one template. */
interface PricingView {
  title: string;
  badge: string | null;
  /** Draft A: small link under the single card. */
  crossSell: string | null;
  name: string;
  subtitle: string;
  pricePrefix: string;
  price: string;
  priceUnit: string;
  priceNote: string | null;
  featuresLabel: string;
  groups: PricingFeatureGroup[];
  cta: string;
  belowCta: string[];
  footer: string;
  cards: PricingCardView[];
}

/**
 * DESIGN DRAFTS ONLY. Pricing restyled. Plans, prices and CTA handlers (with their cta_click events)
 * are inherited from PricingSectionComponent. Draft A uses copy v2 (draft-a-copy.ts) and shows only
 * Hirably Complete; B and C also show the EOR and Recruitment cards.
 */
@Component({
  selector: 'app-draft-pricing',
  standalone: true,
  imports: [NgClass, RouterLink, DraftIconComponent],
  templateUrl: './draft-pricing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftPricingComponent extends PricingSectionComponent implements OnInit {
  @Input({ required: true }) variant!: DraftVariant;

  v!: PricingView;

  get dark(): boolean {
    return this.variant === 'c';
  }

  ngOnInit(): void {
    const complete = this.plans[1];
    // Prices always come from data.service.ts (one source), whatever the wording.
    const cards: PricingCardView[] = this.compactPlans.map(c => {
      const plan = this.plans[c.planIndex];
      return {
        key: c.key,
        eyebrow: c.eyebrow,
        headline: c.headline,
        line: c.line,
        features: plan.features.slice(0, this.previewCount).map(f => FEATURE_FIXES[f] ?? f),
        pricePrefix: c.pricePrefix,
        price: c.price,
        priceSuffix: c.priceSuffix,
        cta: plan.cta,
      };
    });

    this.v = this.variant === 'a'
      ? {
        title: A_PRICING.title,
        badge: null,
        crossSell: A_PRICING.crossSell,
        name: A_PRICING.name,
        subtitle: A_PRICING.subtitle,
        pricePrefix: A_PRICING.pricePrefix,
        price: complete.price,
        priceUnit: A_PRICING.priceUnit,
        priceNote: A_PRICING.priceNote,
        featuresLabel: A_PRICING.featuresLabel,
        groups: A_PRICING.groups,
        cta: A_PRICING.cta,
        belowCta: [A_PRICING.deposit, A_PRICING.terms],
        footer: A_PRICING.footer,
        cards: [],
      }
      : {
        title: 'Simple Pricing. No Surprises.',
        badge: 'Most popular',
        crossSell: null,
        name: complete.name,
        subtitle: complete.subtitle ?? '',
        pricePrefix: complete.pricePrefix ?? '',
        price: complete.price,
        priceUnit: complete.priceUnit ?? '',
        priceNote: null,
        featuresLabel: complete.featuresLabel ?? '',
        groups: complete.featureGroups ?? [],
        cta: complete.cta,
        belowCta: ['Free 30-minute call · No lock-in'],
        footer: PRICING_FOOTER,
        cards,
      };
  }
}
