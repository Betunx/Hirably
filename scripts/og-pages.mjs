// Post-build: writes a static copy of index.html for pages that need their own link preview.
//
// Why: every URL is served the same index.html (SPA rewrite in vercel.json), and link-preview crawlers such as
// LinkedIn read the HTML without running JavaScript, so they only ever see the homepage's tags. For each page
// below this writes dist/.../<path>/index.html with that page's title, description, canonical, og:* and
// twitter:* tags. Vercel serves a real file before applying the rewrite; the app itself loads exactly as before.
//
// Runs after `ng build` (package.json "build" and vercel.json "buildCommand"). Fails the build if a tag is
// missing from index.html or if the values drift from the page component.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist/hirably/browser');
const SITE = 'https://hirablystaffing.com';

const PAGES = [
  {
    path: 'mexico-calculator',
    source: 'src/app/pages/mexico-calculator/mexico-calculator-page.component.ts',
    title: 'What will a hire in Mexico actually cost? | Hirably',
    description: 'Pick a role and see your all-inclusive rate next to a US hire, in seconds.',
    image: `${SITE}/assets/img/og-mexico-calculator.png`,
  },
];

const escapeAttr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escapeText = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`og-pages: ${label} not found in index.html`);
  return html.replace(pattern, replacement);
}

const meta = (attr, key) => new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`);

const index = readFileSync(join(DIST, 'index.html'), 'utf8');

for (const page of PAGES) {
  const source = readFileSync(join(ROOT, page.source), 'utf8');
  for (const value of [page.title, page.description, page.image]) {
    if (!source.includes(value)) throw new Error(`og-pages: "${value}" is not in ${page.source}; keep the two in sync`);
  }

  const url = `${SITE}/${page.path}`;
  const tags = [
    ['name', 'description', page.description],
    ['property', 'og:url', url],
    ['property', 'og:title', page.title],
    ['property', 'og:description', page.description],
    ['property', 'og:image', page.image],
    ['name', 'twitter:title', page.title],
    ['name', 'twitter:description', page.description],
    ['name', 'twitter:image', page.image],
  ];

  let html = replaceOnce(index, /<title>[^<]*<\/title>/, `<title>${escapeText(page.title)}</title>`, '<title>');
  html = replaceOnce(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}">`, 'canonical');
  for (const [attr, key, content] of tags) {
    html = replaceOnce(html, meta(attr, key), `<meta ${attr}="${key}" content="${escapeAttr(content)}">`, key);
  }

  const out = join(DIST, page.path, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`og-pages: wrote ${page.path}/index.html`);
}
