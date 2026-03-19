import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs';

const SCROLL_KEY = 'hirably_home_scroll';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Restore scroll instantly (no two-step animation)
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) {
      sessionStorage.removeItem(SCROLL_KEY);
      setTimeout(() => window.scrollTo({ top: +saved, behavior: 'instant' as ScrollBehavior }), 0);
    }

    // Save scroll position before leaving home
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
