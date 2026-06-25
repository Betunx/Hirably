import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Personal/free email providers we don't accept as a "work email".
const PERSONAL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com',
  'yahoo.com', 'yahoo.es', 'ymail.com',
  'hotmail.com', 'hotmail.es', 'outlook.com', 'live.com', 'msn.com',
  'icloud.com', 'me.com', 'mac.com',
  'aol.com',
  'proton.me', 'protonmail.com',
  'gmx.com', 'gmx.net',
  'mail.com', 'zoho.com', 'yandex.com',
]);

/**
 * Rejects well-formed emails whose domain is a known personal/free provider,
 * forcing a corporate ("work") email. Empty values pass — pair with
 * Validators.required / Validators.email for the rest.
 */
export function workEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value ?? '').toString().trim().toLowerCase();
    if (!value) return null;
    const domain = value.split('@')[1];
    if (!domain) return null; // let Validators.email flag the malformed address
    return PERSONAL_DOMAINS.has(domain) ? { workEmail: true } : null;
  };
}
