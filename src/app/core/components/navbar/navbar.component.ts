import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  navLinks = [
    { label: 'Home', anchor: 'home' },
    { label: 'How It Works', anchor: 'how-it-works' },
    { label: 'Why Mexico?', anchor: 'why-mexico' },
    { label: 'Pricing', anchor: 'pricing' }
  ];

  scrollToSection(anchor: string): void {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
