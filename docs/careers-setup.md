# Careers — setup & testing

Public list at `/careers`, apply at `/careers/:id/apply`, admin editor (unlinked) at
`/careers/admin`. Vacancies live in Upstash Redis; CVs upload to Vercel Blob; applications
are delivered to talent@hirablystaffing.com via Formspree (same provider as the contact forms).

> **Estado (2026-06-30):** la feature está **completa en código** (backend `/api`, servicio,
> páginas y validaciones). Para empezar a probar solo falta **configuración**, no código:
> 1. 🔴 **Bloqueante:** pegar el endpoint real del form de Formspree de careers en
>    `careersFormspreeEndpoint` (`environment.ts` y `environment.prod.ts`) — hoy es el
>    placeholder `https://formspree.io/f/YOUR_CAREERS_FORM_ID`, así que las postulaciones
>    **no llegan** a talent@ hasta cambiarlo.
> 2. 🔴 Aprovisionar **Upstash Redis** y **Vercel Blob** en el dashboard (inyectan sus tokens).
> 3. 🟠 Definir `ADMIN_TOKEN` **solo en Preview/preprod** (no en Production).
>
> El form de contacto principal y el calendario de Cal.com ya funcionan (su endpoint Formspree
> sí es real). Ver "Cal.com (no usa variable de entorno)" más abajo.

## 1. One-time provisioning (Vercel dashboard)

1. **Upstash Redis** — Vercel → Storage → Marketplace → Upstash Redis → connect to the
   project. Injects `KV_REST_API_URL` / `KV_REST_API_TOKEN`.
2. **Blob** — Vercel → Storage → Blob → create + connect. Injects `BLOB_READ_WRITE_TOKEN`.
3. **Formspree** — create a new form at formspree.io delivering to
   `talent@hirablystaffing.com`, confirm the form's verification email, and paste its
   endpoint into `careersFormspreeEndpoint` in `src/environments/environment.ts` and
   `environment.prod.ts`. This is NOT an env var. `formspree.io` is already allowed in the
   CSP `connect-src` (vercel.json). Free tier shares ~50 submissions/month across all forms.
4. **`ADMIN_TOKEN`** — pick a long random string. Set it **only on the Preview
   environment** (this is the preproduction deploy), and **leave it unset on Production**.
   That way production rejects every vacancy write (POST/PATCH/DELETE → 401), even if
   someone finds the URL.

## 2. Local testing with `vercel dev`

Neither `ng serve` nor `vercel dev` alone work for Angular here: `ng serve` doesn't run the
`/api` functions, and `vercel dev` doesn't serve Angular's compiled assets (it falls back to
index.html → MIME errors). Run them together with `ng serve` proxying `/api` to `vercel dev`.

```bash
npm i -g vercel        # if not installed
vercel link            # link to the Hirably project (once)
vercel env pull .env   # OR fill .env manually from .env.example
```

Create `proxy.conf.json` at the repo root:

```json
{ "/api": { "target": "http://localhost:3000", "secure": false, "changeOrigin": true } }
```

Then two terminals:

```bash
vercel dev --listen 3000              # terminal 1 — serves /api (its own page is blank, ignore it)
ng serve --proxy-config proxy.conf.json   # terminal 2 — open http://localhost:4200
```

`.env` is gitignored; copy `.env.example` and fill values (or use `vercel env pull`). Note:
`vercel env pull` fetches the Development env, so `ADMIN_TOKEN` (set only on Preview) won't be
included — add it to `.env` manually for local writes to work.

## 3. Test checklist (preproduction link or local)

**Admin (preproduction only):**
1. Go to `/careers/admin`, enter the `ADMIN_TOKEN` value → should unlock.
2. Create a position (title + description, status = Published) → appears in the list.
3. Edit, Unpublish/Publish, Delete → all reflect immediately.
4. Wrong key → "Invalid key". On the production domain the editor is hidden and writes 401.

**Public:**
5. Open `/careers` → published positions show; drafts do not.
6. Search box filters by title/description/location.

**Apply:**
7. Click Apply on a position → `/careers/:id/apply`.
8. Fill name + email, attach a PDF/DOC (≤ 5 MB), submit.
9. Confirm the success screen, and that the Formspree submission arrives at
   talent@hirablystaffing.com with the applicant data + a link to the uploaded CV.

## Notes
- Vacancy data is shared across deploys (same Upstash store), so what RR.HH. publishes in
  preproduction is what production reads.
- Search is client-side for now (fine for a small list); swap to Elastic/full-text later.

## Cal.com (no usa variable de entorno)

El calendario de "book a call" **no se configura por variable de entorno** — el link está
hardcodeado y eso es intencional:

- `calLink: 'hirably/30min'` → [../src/app/pages/contact-form/contact-form.component.ts#L169](../src/app/pages/contact-form/contact-form.component.ts#L169)
- `origin: 'https://cal.com'` (script de embed) → [../src/index.html#L78](../src/index.html#L78)

**Por qué una env var de Cal "no funciona":** Angular compila el frontend a HTML/JS/CSS
estático. En el navegador **no existe `process.env`**, y las variables de entorno de Vercel
solo llegan a las funciones serverless de `/api`, **nunca** al bundle del navegador. El único
mecanismo "de entorno" del frontend es el reemplazo en build-time vía `environment.ts`
(file replacement de `angular.json`). Por eso una var tipo `CAL_LINK` definida en Vercel jamás
es legible por el componente.

Si algún día se quiere cambiar el link sin tocar la lógica, se mueve a `environment(.prod).ts`
(igual que `formspreeEndpoint`) y se lee desde ahí — **no** a una env var de Vercel. Por ahora
se deja hardcodeado porque funciona y es un solo valor.
