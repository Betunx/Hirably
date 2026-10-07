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
        { highlight: '97%', suffix: 'retention rate' },
        { highlight: '3-7 days', suffix: 'to first shortlist' },
        { highlight: '100%', suffix: 'compliance' },
        { highlight: 'Zero', suffix: 'recruitment fees' }
    ];
}
