import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-floral-white flex items-center justify-center px-4 pt-[72px]">
      <div class="text-center max-w-md">
        <p class="font-display font-semibold text-[80px] leading-none text-navy-dark/10 select-none">404</p>
        <h1 class="font-display font-semibold text-[28px] text-navy-dark mt-2 mb-3">Page not found</h1>
        <p class="font-body text-[15px] text-dark-purple/70 mb-8">
          The page you're looking for doesn't exist or was moved.
        </p>
        <button (click)="goHome()"
          class="px-7 py-3.5 rounded-[8px] bg-navy-dark text-white font-display font-semibold text-[15px] hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(17,31,120,0.35)] cursor-pointer">
          Back to Home
        </button>
      </div>
    </div>
  `,
})
export class NotFoundComponent {
  constructor(private router: Router) {}
  goHome(): void { this.router.navigate(['/']); }
}
