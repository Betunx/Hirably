import { Component, ChangeDetectionStrategy } from '@angular/core';

interface StatBadge {
    /** Texto antes del dato destacado (opcional) */
    prefix?: string;
    /** Dato destacado en negrita */
    highlight: string;
    /** Texto después del dato destacado (opcional) */
    suffix?: string;
}

@Component({
    selector: 'app-stats-carousel',
    templateUrl: './stats-carousel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsCarouselComponent {
    /** Datos del marquee. El template los renderiza dos veces para un loop continuo. */
    readonly badges: StatBadge[] = [
        { prefix: 'Trusted by', highlight: '125+ companies', suffix: 'hiring in Mexico' },
        { highlight: '97%', suffix: 'retention rate' },
        { highlight: '20 days', suffix: 'average time to hire' },
        { highlight: '100%', suffix: 'compliance' },
        { highlight: '$0', suffix: 'upfront fees' }
    ];
}
