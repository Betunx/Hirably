import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { upload } from '@vercel/blob/client';
import { Vacancy, JobApplication } from '@models';

/**
 * Hostnames where the public, production site is served. The admin editor is
 * hidden on these (UX only — real protection is the server-side ADMIN_TOKEN,
 * which is unset in production so all writes are rejected there).
 */
const PRODUCTION_HOSTS = ['hirablystaffing.com', 'www.hirablystaffing.com'];

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

  submitApplication(payload: JobApplication): Observable<void> {
    return this.http.post<void>('/api/applications', payload);
  }

  /** True on preview/local hosts; false on the production domain. */
  isAdminUiVisible(): boolean {
    return !PRODUCTION_HOSTS.includes(window.location.hostname);
  }

  private adminHeaders(token: string): Record<string, string> {
    return { 'x-admin-token': token };
  }
}
