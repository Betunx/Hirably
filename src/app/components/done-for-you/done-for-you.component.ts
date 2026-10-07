import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { DataService } from '@services/data.service';
import { ComparisonCell } from '@models';

/**
 * "Done for you": eyebrow + headline, then how Hirably compares with EOR platforms and recruiting agencies.
 * Copy lives in data.service.ts (getComparison).
 *
 * Table: framed like The Hirably Way cards (accent-blue 2px outline, 12px radius, same shadow). ≥768px one framed
 * <table>; on phones one framed block per row. Yes/No = accent check mark / mid-gray dash, with "Yes"/"No" kept
 * for screen readers.
 */
@Component({
  selector: 'app-done-for-you',
  standalone: true,
  imports: [NgClass, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './done-for-you.component.html'
})
export class DoneForYouComponent {
  readonly rows = inject(DataService).getComparison();
  readonly columns = ['Hirably', 'EOR platforms', 'Recruiting agencies'];

  /** Same card shadow as The Hirably Way (how-it-works-steps.component.ts). */
  readonly cardShadow = '2px 2px 8px 0 rgba(0,0,0,0.25)';

  /** Cells of a row in column order (Hirably first). */
  cells(row: { hirably: ComparisonCell; eorPlatforms: ComparisonCell; recruitingAgencies: ComparisonCell }): ComparisonCell[] {
    return [row.hirably, row.eorPlatforms, row.recruitingAgencies];
  }
}
