import { Component } from '@angular/core';
import { ScrollService } from '../../../shared/services/scroll.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isMenuOpen = false;

  navLinks = [
    { label: 'Home', anchor: 'home' },
    { label: 'How It Works', anchor: 'how-it-works' },
    { label: 'Why Mexico?', anchor: 'why-mexico' },
    { label: 'Pricing', anchor: 'pricing' }
  ];

  constructor(private scrollService: ScrollService) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  scrollToSection(anchor: string): void {
    this.scrollService.scrollToId(anchor, 'start');
    this.closeMenu();
  }
}
