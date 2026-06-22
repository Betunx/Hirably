import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
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

  vacancies: Vacancy[] = [];
  loading = true;
  errored = false;
  searchTerm = '';

  ngOnInit(): void {
    this.careers.listPublished().subscribe({
      next: list => { this.vacancies = list; this.loading = false; },
      error: () => { this.errored = true; this.loading = false; },
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
