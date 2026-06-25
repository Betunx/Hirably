import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { upload } from '@vercel/blob/client';
import { Vacancy, JobApplication } from '@models';
import { isPreprodHost } from '@core/preprod-host';
import { environment } from '../../environments/environment';

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

  /**
   * Whether to show the admin editor UI. Visible only on preproduction/local;
   * real protection is the server-side ADMIN_TOKEN (unset in production, so all
   * writes are rejected there regardless).
   */
  isAdminUiVisible(): boolean {
    return isPreprodHost();
  }

  private adminHeaders(token: string): Record<string, string> {
    return { 'x-admin-token': token };
  }
}
