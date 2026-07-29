import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CareersService } from '@services/careers.service';
import { Vacancy } from '@models';

@Component({
  selector: 'app-careers-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './careers-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareersPageComponent implements OnInit {
  private readonly careers = inject(CareersService);
  private readonly cdr = inject(ChangeDetectorRef);

  vacancies: Vacancy[] = [];
  loading = true;
  errored = false;
  searchTerm = '';
  private readonly expanded = new Set<string>();

  isExpanded(id: string): boolean {
    return this.expanded.has(id);
  }

  /** True when the (collapsed) description overflows its 2-line clamp and is worth expanding. */
  isClamped(el: HTMLElement): boolean {
    return el.scrollHeight > el.clientHeight;
  }

  toggleExpanded(id: string): void {
    if (this.expanded.has(id)) this.expanded.delete(id);
    else this.expanded.add(id);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.careers.listPublished().subscribe({
      next: list => { this.vacancies = list; this.loading = false; this.cdr.markForCheck(); },
      error: () => { this.errored = true; this.loading = false; this.cdr.markForCheck(); },
    });
  }

  /** Client-side filter — fine for a small list. TODO: Elastic full-text search at scale. */
  get filtered(): Vacancy[] {
    const q = this.searchTerm.trim().toLowerCase();
    if (!q) return this.vacancies;
    return this.vacancies.filter(v =>
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      (v.location ?? '').toLowerCase().includes(q)
    );
  }
}
