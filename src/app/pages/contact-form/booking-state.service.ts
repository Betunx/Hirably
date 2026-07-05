import { Injectable } from '@angular/core';
import { ContactFormType } from './contact-form.config';

/** Data carried from the form step (/contact/:type) to the booking step (/contact/:type/agendar). */
export interface BookingState {
  /** Full name used to prefill the Cal.com embed. */
  name: string;
  /** Email used to prefill the Cal.com embed. */
  email: string;
  /** Optional notes prefilled into Cal.com. */
  notes: string;
}

const PREFIX = 'hirably:booking:';

/**
 * Carries the submitted form data between the two booking steps. Backed by
 * sessionStorage (keyed per form type) so a refresh on the booking page does
 * not bounce the user back to the form. The lead has already been sent to
 * Formspree by the time this is set — this only feeds the Cal.com prefill.
 */
@Injectable({ providedIn: 'root' })
export class BookingStateService {
  set(type: ContactFormType, data: BookingState): void {
    try {
      sessionStorage.setItem(PREFIX + type, JSON.stringify(data));
    } catch {
      /* sessionStorage unavailable (private mode quota) — booking still works without prefill. */
    }
  }

  get(type: ContactFormType): BookingState | null {
    try {
      const raw = sessionStorage.getItem(PREFIX + type);
      return raw ? (JSON.parse(raw) as BookingState) : null;
    } catch {
      return null;
    }
  }

  clear(type: ContactFormType): void {
    try {
      sessionStorage.removeItem(PREFIX + type);
    } catch {
      /* no-op */
    }
  }
}
