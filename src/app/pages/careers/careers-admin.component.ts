import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CareersService } from '@services/careers.service';
import { Vacancy } from '@models';

const TOKEN_KEY = 'careers_admin_token';

interface VacancyForm {
  title: string;
  description: string;
  location: string;
  status: 'published' | 'draft';
}

function emptyForm(): VacancyForm {
  return { title: '', description: '', location: '', status: 'draft' };
}

@Component({
  selector: 'app-careers-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './careers-admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareersAdminComponent implements OnInit {
  private readonly careers = inject(CareersService);
  private readonly cdr = inject(ChangeDetectorRef);

  token = '';
  authed = false;
  authError = false;
  loading = false;

  /** Shown when not on the preproduction host (writes will be rejected in production). */
  readonly adminEnabledHere = this.careers.isAdminUiVisible();

  vacancies: Vacancy[] = [];

  /** id of the vacancy being edited; null while creating. */
  editingId: string | null = null;
  form: VacancyForm = emptyForm();
  saving = false;
  saveError = '';

  ngOnInit(): void {
    const saved = sessionStorage.getItem(TOKEN_KEY);
    if (saved) {
      this.token = saved;
      this.unlock();
    }
  }

  unlock(): void {
    if (!this.token.trim()) return;
    this.loading = true;
    this.authError = false;
    this.careers.listAll(this.token).subscribe({
      next: list => {
        this.vacancies = list;
        this.authed = true;
        this.loading = false;
        sessionStorage.setItem(TOKEN_KEY, this.token);
        this.cdr.markForCheck();
      },
      error: () => {
        this.authError = true;
        this.authed = false;
        this.loading = false;
        sessionStorage.removeItem(TOKEN_KEY);
        this.cdr.markForCheck();
      },
    });
  }

  lock(): void {
    this.token = '';
    this.authed = false;
    this.vacancies = [];
    this.cancelEdit();
    sessionStorage.removeItem(TOKEN_KEY);
  }

  private refresh(): void {
    this.careers.listAll(this.token).subscribe({
      next: list => { this.vacancies = list; this.cdr.markForCheck(); },
      error: () => { this.cdr.markForCheck(); },
    });
  }

  startCreate(): void {
    this.editingId = null;
    this.form = emptyForm();
    this.saveError = '';
  }

  startEdit(v: Vacancy): void {
    this.editingId = v.id;
    this.form = { title: v.title, description: v.description, location: v.location ?? '', status: v.status };
    this.saveError = '';
  }

  cancelEdit(): void {
    this.editingId = null;
    this.form = emptyForm();
    this.saveError = '';
  }

  save(): void {
    if (!this.form.title.trim() || !this.form.description.trim()) {
      this.saveError = 'Title and description are required.';
      return;
    }
    this.saving = true;
    this.saveError = '';
    const input = {
      title: this.form.title.trim(),
      description: this.form.description.trim(),
      location: this.form.location.trim() || undefined,
      status: this.form.status,
    };
    const req$ = this.editingId
      ? this.careers.update(this.token, this.editingId, input)
      : this.careers.create(this.token, input);

    req$.subscribe({
      next: () => {
        this.saving = false;
        this.cancelEdit();
        this.refresh();
        this.cdr.markForCheck();
      },
      error: () => {
        this.saving = false;
        this.saveError = 'Could not save. Check your key and try again.';
        this.cdr.markForCheck();
      },
    });
  }

  togglePublish(v: Vacancy): void {
    const status = v.status === 'published' ? 'draft' : 'published';
    this.careers.update(this.token, v.id, { status }).subscribe({
      next: () => this.refresh(),
      error: () => this.cdr.markForCheck(),
    });
  }

  remove(v: Vacancy): void {
    if (!confirm(`Delete "${v.title}"? This can't be undone.`)) return;
    this.careers.remove(this.token, v.id).subscribe({
      next: () => this.refresh(),
      error: () => this.cdr.markForCheck(),
    });
  }
}
