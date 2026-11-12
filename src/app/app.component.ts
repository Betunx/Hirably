import { Component, ChangeDetectionStrategy, ElementRef, AfterViewInit, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { AnalyticsService, PageType } from '@services/analytics.service';
import { EngagementTrackerService } from '@services/engagement-tracker.service';

@Component({
  selector: 'app-root',
  template: `
    @if (!ownChrome()) {
      <app-navbar></app-navbar>
    }
    <main>
      <router-outlet></router-outlet>
    </main>
    @if (!ownChrome()) {
      <app-footer></app-footer>
    }
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly el: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly router = inject(Router);
  private readonly analytics = inject(AnalyticsService);
  private readonly engagement = inject(EngagementTrackerService);
  private readonly destroy$ = new Subject<void>();
  /** Pages with their own top bar (the rebrand Book a call page): hide the old navbar and footer. */
  readonly ownChrome = signal(this.hasOwnChrome(window.location.pathname));

  ngOnInit(): void {
    // On every route change (incl. the initial load): emit a virtual pageview and
    // (re)start per-page engagement tracking (scroll depth, time, section view).
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(e => {
      this.ownChrome.set(this.hasOwnChrome(e.urlAfterRedirects));
      this.analytics.pageData(this.pageTypeFor(e.urlAfterRedirects));
      this.engagement.startPage();
    });
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.style.opacity = '1';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private hasOwnChrome(url: string): boolean {
    return url.split('?')[0].split('#')[0].startsWith('/contact/book-a-call');
  }

  private pageTypeFor(url: string): PageType {
    const path = url.split('?')[0].split('#')[0];
    if (path === '/' || path === '') return 'home';
    if (path.startsWith('/contact')) return 'contact';
    if (path.startsWith('/roles')) return 'department';
    if (path === '/privacy-policy' || path === '/terms-of-service') return 'legal';
    if (path === '/404') return 'not_found';
    return 'other';
  }
}
