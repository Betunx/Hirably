import { Component, ChangeDetectionStrategy } from '@angular/core';

// The right-hand card is the rate calculator (app-rate-calculator); it owns its own
// lead capture and "Book a call" flow.
@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {}
