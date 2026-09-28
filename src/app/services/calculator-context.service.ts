import { Injectable } from '@angular/core';

/**
 * What the visitor had selected in the hero rate calculator, attached as extra (invisible)
 * fields to the Book a Call lead. Kept in memory, not in the URL, so the typed specialty never
 * ends up in page URLs / analytics. Read once: the next Book a Call visit starts empty.
 */
export interface CalculatorContext {
  calculator_role: string;
  calculator_level: string;
  calculator_specialized: 'Yes' | 'No';
  calculator_specialty: string;
  calculator_hirably_estimate: string;
}

@Injectable({ providedIn: 'root' })
export class CalculatorContextService {
  private context: CalculatorContext | null = null;

  set(context: CalculatorContext): void {
    this.context = context;
  }

  /** Returns the stored context (or null) and clears it. */
  take(): CalculatorContext | null {
    const context = this.context;
    this.context = null;
    return context;
  }
}
