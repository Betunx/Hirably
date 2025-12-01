import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavLink {
  label: string;
  route?: string;
  fragment?: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; route: string; fragment?: string }[];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    .logo-container {
      position: relative;
      display: inline-block;
      height: 2rem; /* Mantiene la altura del texto original (text-2xl) */
    }

    .logo-text,
    .logo-hover {
      transition: opacity 0.3s ease-in-out;
    }

    .logo-text {
      opacity: 1;
    }

    .logo-hover {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      height: 2rem; /* Igual altura que el texto */
      width: auto; /* Mantiene la proporción del logo */
    }

    .logo-container:hover .logo-text {
      opacity: 0;
    }

    .logo-container:hover .logo-hover {
      opacity: 1;
    }
  `]
})
export class NavbarComponent {
  isMenuOpen = false;
  isMeetUsDropdownOpen = false;

  navLinks: NavLink[] = [
    { label: 'How it Works', route: '/', fragment: 'how-it-works' },
    { label: 'Benefits', route: '/', fragment: 'key-benefits' },
    { label: 'Hirably', route: '/', fragment: 'why-hirably' },
    { label: 'Pricing', route: '/', fragment: 'pricing' },
    {
      label: 'Us',
      hasDropdown: true,
      dropdownItems: [
        { label: 'About Us', route: '/meet-us', fragment: 'about' },
        { label: 'Our Team', route: '/meet-us', fragment: 'team' },
        { label: 'Contact', route: '/meet-us', fragment: 'contact' }
      ]
    }
  ];

  constructor(
    private router: Router
  ) {
    // Listen to navigation events to handle scrolling
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Si la navegación fue exitosa y hay un fragment en la URL
      const tree = this.router.parseUrl(this.router.url);
      if (tree.fragment) {
        // Dar tiempo para que el componente se renderice
        setTimeout(() => {
          const element = document.getElementById(tree.fragment!);
          if (element) {
            const yOffset = -80; // Altura del navbar
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
      } else {
        // Si no hay fragment, ir al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.isMeetUsDropdownOpen = false;
  }

  toggleMeetUsDropdown(): void {
    this.isMeetUsDropdownOpen = !this.isMeetUsDropdownOpen;
  }

  openMeetUsDropdown(): void {
    this.isMeetUsDropdownOpen = true;
  }

  closeMeetUsDropdown(): void {
    this.isMeetUsDropdownOpen = false;
  }

  navigateToHome(): void {
    // Si ya estamos en la ruta home, solo hacer scroll al inicio
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Si estamos en otra ruta, navegar a home
      this.router.navigate(['/']);
    }
    this.closeMenu();
  }

  navigateToSection(route: string, fragment?: string): void {
    this.router.navigate([route], { fragment: fragment });
    this.closeMenu();
  }

  navigateToMeetUs(route: string, fragment?: string): void {
    this.router.navigate([route], { fragment: fragment });
    this.closeMeetUsDropdown();
    this.closeMenu();
  }
}
