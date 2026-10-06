import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

/**
 * DESIGN DRAFTS ONLY. While a draft page is open:
 * - hides the global navbar/footer (the draft renders its own restyled copies),
 * - loads the extra weights the drafts need (DM Sans 800, Inter Tight) from Google Fonts only,
 * - marks the page noindex.
 * Everything is undone when the draft page is destroyed, so the real pages are untouched.
 */
const FONT_LINK_ID = 'hb-draft-fonts';
const FONT_URL = 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800'
  + '&family=Inter+Tight:wght@500;600;700;800&display=swap';

export function useDraftShell(): void {
  const doc = inject(DOCUMENT);
  const meta = inject(Meta);

  doc.body.classList.add('hb-draft');
  if (!doc.getElementById(FONT_LINK_ID)) {
    const link = doc.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    link.href = FONT_URL;
    doc.head.appendChild(link);
  }
  meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });

  inject(DestroyRef).onDestroy(() => {
    doc.body.classList.remove('hb-draft');
    meta.updateTag({ name: 'robots', content: 'index, follow' });
  });
}

/**
 * Global (unencapsulated) rules for the draft pages, scoped to body.hb-draft / .hbd.
 * Headings in the drafts carry `font-sans` so the site-wide "headings = weight 400" rule in styles.scss
 * does not apply to them; `.font-tight` swaps the family to Inter Tight (Draft B).
 */
export const DRAFT_GLOBAL_STYLES = `
  body.hb-draft app-navbar, body.hb-draft app-footer { display: none !important; }
  body.hb-draft { background: #fff; }
  .hbd { color: #1F2433; }
  .hbd .font-tight { font-family: 'Inter Tight', 'DM Sans', system-ui, sans-serif; }
  .hbd .hbd-giant { font-size: clamp(52px, 11.2vw, 172px); line-height: 0.9; letter-spacing: -0.03em; }
  .hbd .hbd-oversize { font-size: clamp(40px, 7vw, 104px); line-height: 0.95; letter-spacing: -0.03em; }
  .hbd .hbd-large { font-size: clamp(36px, 5.6vw, 80px); line-height: 1; letter-spacing: -0.03em; }
  .hbd :focus-visible { outline: 2px solid #2291EA; outline-offset: 2px; }
`;
