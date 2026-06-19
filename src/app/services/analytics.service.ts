import { Injectable } from '@angular/core';

// Single source of truth for the GTM data layer declaration.
declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export type PageType = 'home' | 'contact' | 'department' | 'legal' | 'not_found' | 'other';

/**
 * Central wrapper around window.dataLayer for Google Tag Manager.
 *
 * Every tracked event in the app goes through one of the typed methods below,
 * so the event names and payload shapes stay consistent with the GTM container
 * config (see docs/Data Layer.docx). GTM reads nested objects via dot notation
 * (e.g. the "page.type" data-layer variable maps to { page: { type } }).
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  private push(event: string, payload: Record<string, unknown> = {}): void {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
  }

  private get path(): string {
    return window.location.pathname;
  }

  private utm(): Record<string, string> {
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source:   p.get('utm_source')   ?? '',
      utm_medium:   p.get('utm_medium')   ?? '',
      utm_campaign: p.get('utm_campaign') ?? '',
    };
  }

  private device(): 'mobile' | 'tablet' | 'desktop' {
    const w = window.innerWidth;
    if (w < 768) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
  }

  // ── Page / navigation ──────────────────────────────────────────────────────

  pageData(pageType: PageType): void {
    this.push('page_data', {
      page: { type: pageType, path: this.path },
      user: {
        traffic_source: document.referrer || 'direct',
        device: this.device(),
        ...this.utm(),
      },
    });
  }

  pageNotFound(): void {
    this.push('page_not_found', { page: { path: this.path } });
  }

  // ── Clicks ──────────────────────────────────────────────────────────────────

  ctaClick(text: string, type: string): void {
    this.push('cta_click', { cta: { text, type }, page: { path: this.path } });
  }

  contactClick(method: string): void {
    this.push('contact_click', { contact: { method }, page: { path: this.path } });
  }

  outboundClick(url: string): void {
    this.push('outbound_click', { link: { url }, page: { path: this.path } });
  }

  // ── Forms / leads ─────────────────────────────────────────────────────────

  formStart(formId: string, pageType: PageType): void {
    this.push('form_start', { form: { id: formId }, page: { type: pageType } });
  }

  generateLead(source: string, serviceType: string): void {
    this.push('generate_lead', {
      lead: { source, service_type: serviceType },
      user: { ...this.utm() },
    });
  }

  // ── Engagement ──────────────────────────────────────────────────────────────

  scrollDepth(percent: number): void {
    this.push('scroll_depth', { scroll: { percent }, page: { path: this.path } });
  }

  timeOnPage(seconds: number): void {
    this.push('time_on_page', { engagement: { seconds }, page: { path: this.path } });
  }

  sectionView(name: string): void {
    this.push('section_view', { section: { name }, page: { path: this.path } });
  }
}
