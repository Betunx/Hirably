import {
  AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, ViewChild, inject
} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@services/data.service';
import { AnalyticsService } from '@services/analytics.service';

type CompactPlanKey = 'eor' | 'recruitment';

/** Tarjeta compacta (columna derecha en desktop). El checklist y el botón salen de `plans[planIndex]`. */
interface CompactPlan {
  key: CompactPlanKey;
  planIndex: number;
  eyebrow: string;
  headline: string;
  line: string;
  pricePrefix: string;
  price: string;
  priceSuffix: string;
  accentClass: string;
  borderColor: string;
  checkIcon: string;
}

@Component({
  selector: 'app-pricing-section',
  templateUrl: './pricing-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingSectionComponent implements AfterViewInit {
  private readonly dataService = inject(DataService);
  private readonly router = inject(Router);
  private readonly analytics = inject(AnalyticsService);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('priceBlock') private priceBlock?: ElementRef<HTMLElement>;
  @ViewChild('checklist') private checklist?: ElementRef<HTMLElement>;

  readonly plans = this.dataService.getPricingPlans();

  // Textos de las tarjetas compactas. El precio sale de data.service.ts (una sola fuente).
  readonly compactPlans: CompactPlan[] = [
    {
      key: 'eor',
      planIndex: 2,
      eyebrow: 'HIRABLY EOR',
      headline: 'Already have talent in Mexico?',
      line: 'We become their legal employer and handle payroll and compliance.',
      pricePrefix: 'From',
      price: this.plans[2].price,
      priceSuffix: '/mo per employee',
      accentClass: 'text-emerald',
      borderColor: '#D1FAE5',
      checkIcon: 'assets/img/arrowgreen.svg'
    },
    {
      key: 'recruitment',
      planIndex: 0,
      eyebrow: 'HIRABLY RECRUITMENT',
      headline: 'Want to hire directly?',
      line: 'We find and vet the talent. You employ them in your own entity.',
      pricePrefix: 'From',
      price: this.plans[0].price,
      priceSuffix: ' per hire',
      accentClass: 'text-purple-accent',
      borderColor: '#E3E1FF',
      checkIcon: 'assets/img/arrowpurple.svg'
    }
  ];

  /** Cuántos ítems del checklist muestra cada tarjeta compacta. */
  readonly previewCount = 3;

  ngAfterViewInit(): void {
    const list = this.checklist?.nativeElement;
    if (!list || typeof ResizeObserver === 'undefined') return;
    // Fuera de la zona: medir el layout no necesita change detection.
    this.zone.runOutsideAngular(() => {
      const observer = new ResizeObserver(() => this.alignPriceToChecklist());
      observer.observe(list);
      document.fonts?.ready.then(() => this.alignPriceToChecklist());
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  /**
   * Desktop (≥1024px): el precio ("/hr all-inclusive") termina donde termina la línea más larga
   * del checklist, no en el borde de la tarjeta. Ese punto cambia con el ancho, por eso se mide.
   */
  private alignPriceToChecklist(): void {
    const price = this.priceBlock?.nativeElement;
    const list = this.checklist?.nativeElement;
    if (!price || !list) return;

    price.style.marginRight = '';
    if (!window.matchMedia('(min-width: 1024px)').matches) return;

    const range = document.createRange();
    let textRight = 0;
    list.querySelectorAll('li span').forEach((span) => {
      range.selectNodeContents(span);
      for (const rect of Array.from(range.getClientRects())) {
        textRight = Math.max(textRight, rect.right);
      }
    });

    const overhang = price.getBoundingClientRect().right - textRight;
    if (textRight > 0 && overhang > 0) {
      price.style.marginRight = `${Math.round(overhang)}px`;
    }
  }

  onCompactCta(key: CompactPlanKey): void {
    if (key === 'eor') {
      this.onEorServices();
    } else {
      this.onGetAQuote();
    }
  }

  onEorServices(): void {
    this.analytics.ctaClick('Get Started', 'eor-services');
    this.router.navigate(['/contact', 'eor-services']);
  }

  onStartHiring(): void {
    this.analytics.ctaClick('Start Hiring', 'start-hiring');
    this.router.navigate(['/contact', 'start-hiring']);
  }

  onGetAQuote(): void {
    this.analytics.ctaClick('Get a Quote', 'get-a-quote');
    this.router.navigate(['/contact', 'get-a-quote']);
  }
}
