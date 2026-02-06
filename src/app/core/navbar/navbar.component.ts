import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavLink {
  label: string;
  route?: string;
  fragment?: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .logo-container {
      position: relative;
      display: inline-block;
      height: 2rem;
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
      height: 2rem;
      width: auto;
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

  navLinks: NavLink[] = [
    { label: 'HOW IT WORKS', route: '/', fragment: 'how-it-works' },
    { label: 'WHY NEARSHORE?', route: '/', fragment: 'key-benefits' },
    { label: 'BENEFITS', route: '/', fragment: 'why-hirably' },
    { label: 'PRICING', route: '/', fragment: 'pricing' }
  ];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const tree = this.router.parseUrl(this.router.url);
      if (tree.fragment) {
        setTimeout(() => {
          const element = document.getElementById(tree.fragment!);
          if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  trackByLabel(_index: number, link: NavLink): string {
    return link.label;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  navigateToHome(): void {
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.router.navigate(['/']);
    }
    this.closeMenu();
  }

  navigateToSection(route: string, fragment?: string): void {
    this.router.navigate([route], { fragment: fragment });
    this.closeMenu();
  }
}
