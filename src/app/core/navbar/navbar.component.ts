import { Component, ChangeDetectionStrategy, OnDestroy, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { AnalyticsService } from '@services/analytics.service';

/** Pixels to offset scroll by so sections clear the fixed navbar. */
const NAV_SCROLL_OFFSET = -80;

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
export class NavbarComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly analytics = inject(AnalyticsService);
  private readonly destroy$ = new Subject<void>();

  isMenuOpen = false;

  // Order mirrors the section order on the home page.
  navLinks: NavLink[] = [
    { label: 'WHY NEARSHORE?', route: '/', fragment: 'key-benefits' },
    { label: 'HOW IT WORKS', route: '/', fragment: 'how-it-works' },
    { label: 'BENEFITS', route: '/', fragment: 'why-hirably' },
    { label: 'PRICING', route: '/', fragment: 'pricing' }
  ];

  constructor() {
    // After every navigation, sync the scroll position with the URL fragment.
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const { fragment } = this.router.parseUrl(this.router.url);
      if (fragment) {
        this.scrollToFragment(fragment);
      } else {
        this.scrollToTop();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  navigateToHome(): void {
    const { root, fragment } = this.router.parseUrl(this.router.url);
    const onHome = root.children['primary'] == null;

    if (onHome && fragment == null) {
      // Already home with a clean URL: nothing to navigate, just scroll up.
      this.scrollToTop();
    } else {
      // Navigate home clearing any fragment; the NavigationEnd handler scrolls to top.
      this.router.navigate(['/'], { fragment: undefined });
    }
    this.closeMenu();
  }

  navigateToSection(route: string, fragment?: string): void {
    this.router.navigate([route], { fragment });
    this.closeMenu();
  }

  navigateToContact(type: string): void {
    this.analytics.ctaClick('Start Hiring', type);
    this.router.navigate(['/contact', type]);
    this.closeMenu();
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private scrollToFragment(fragment: string): void {
    // Wait a tick so the target section is rendered before measuring it.
    setTimeout(() => {
      const element = document.getElementById(fragment);
      if (!element) {
        return;
      }
      const y = element.getBoundingClientRect().top + window.pageYOffset + NAV_SCROLL_OFFSET;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 100);
  }
}
