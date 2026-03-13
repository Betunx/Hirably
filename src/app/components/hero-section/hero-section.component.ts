import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {

  constructor(private router: Router) {}

  onBookConsultation(): void {
    this.router.navigate(['/contact', 'book-a-call']);
  }
}
