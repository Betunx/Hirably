import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { upload } from '@vercel/blob/client';
import { Vacancy, JobApplication } from '@models';
import { environment } from '../../environments/environment';

/**
 * Hostname substrings where the admin editor UI is shown: the preproduction
 * branch deploy and local dev. This is UX only — real protection is the
 * server-side ADMIN_TOKEN, which is unset in production so all writes are
 * rejected there regardless. Add a custom preprod domain here if one is set up.
 */
const EDIT_HOSTS_INCLUDES = ['git-preproduction', 'localhost', '127.0.0.1'];

type VacancyInput = Pick<Vacancy, 'title' | 'description' | 'status'> & { location?: string };

@Injectable({ providedIn: 'root' })
export class CareersService {
  private readonly http = inject(HttpClient);

  /** Published vacancies — public, used by the careers list page. */
  listPublished(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>('/api/vacancies');
  }

  /** All vacancies incl. drafts — admin only. */
  listAll(token: string): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>('/api/vacancies?all=1', { headers: this.adminHeaders(token) });
  }

  create(token: string, input: VacancyInput): Observable<Vacancy> {
    return this.http.post<Vacancy>('/api/vacancies', input, { headers: this.adminHeaders(token) });
  }

  update(token: string, id: string, input: Partial<VacancyInput>): Observable<Vacancy> {
    return this.http.patch<Vacancy>(`/api/vacancies?id=${encodeURIComponent(id)}`, input, {
      headers: this.adminHeaders(token),
    });
  }

  remove(token: string, id: string): Observable<void> {
    return this.http.delete<void>(`/api/vacancies?id=${encodeURIComponent(id)}`, {
      headers: this.adminHeaders(token),
    });
  }

  /** Uploads the CV straight to Vercel Blob from the browser; returns its URL. */
  async uploadCv(file: File): Promise<string> {
    const blob = await upload(file.name, file, {
      access: 'public',
      handleUploadUrl: '/api/applications-upload',
    });
    return blob.url;
  }

  /**
   * Sends the application to the careers Formspree form (same provider used by
   * the contact forms). The CV has already been uploaded to Blob; only its URL
   * is sent. `_gotcha` is Formspree's native honeypot — if a bot fills it,
   * Formspree silently drops the submission.
   */
  submitApplication(payload: JobApplication): Observable<unknown> {
    const body = {
      _subject: `New application: ${payload.vacancyTitle}`,
      _replyto: payload.email,
      _gotcha: payload.company ?? '',
      vacancyId: payload.vacancyId,
      vacancyTitle: payload.vacancyTitle,
      name: payload.name,
      email: payload.email,
      phone: payload.phone ?? '',
      message: payload.message ?? '',
      cvUrl: payload.cvUrl,
    };
    return this.http.post(environment.careersFormspreeEndpoint, body);
  }

  /** True only on the preproduction branch deploy and local dev; false elsewhere. */
  isAdminUiVisible(): boolean {
    const host = window.location.hostname;
    return EDIT_HOSTS_INCLUDES.some(s => host.includes(s));
  }

  private adminHeaders(token: string): Record<string, string> {
    return { 'x-admin-token': token };
  }
}
