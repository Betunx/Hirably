import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollService } from '@services/scroll.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {

  constructor(private scrollService: ScrollService) {}

  onBookConsultation(): void {
    this.scrollService.scrollToId('how-it-works');
  }
}
