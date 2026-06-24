import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { isPreprodHost } from '@core/preprod-host';

/**
 * Allows the route only on preproduction/local; on the production domain it
 * redirects to /404 so the page stays hidden even if someone guesses the URL.
 * Used by the legal pages until legal counsel approves publishing them.
 */
export const preprodOnlyGuard: CanActivateFn = () => {
  if (isPreprodHost()) return true;
  return inject(Router).createUrlTree(['/404']);
};
