# Careers — setup & testing

Public list at `/careers`, apply at `/careers/:id/apply`, admin editor (unlinked) at
`/careers/admin`. Vacancies live in Upstash Redis; CVs upload to Vercel Blob; applications
email to talent@hirablystaffing.com via Resend.

## 1. One-time provisioning (Vercel dashboard)

1. **Upstash Redis** — Vercel → Storage → Marketplace → Upstash Redis → connect to the
   project. Injects `KV_REST_API_URL` / `KV_REST_API_TOKEN`.
2. **Blob** — Vercel → Storage → Blob → create + connect. Injects `BLOB_READ_WRITE_TOKEN`.
3. **Resend** — create an account at resend.com, **verify the domain `hirablystaffing.com`**
   (add the DNS records Resend gives you). Create an API key. Then in Vercel set:
   - `RESEND_API_KEY`
   - `RESEND_FROM` = `Hirably Careers <careers@hirablystaffing.com>`
   - `TALENT_EMAIL` = `talent@hirablystaffing.com`
4. **`ADMIN_TOKEN`** — pick a long random string. Set it **only on the Preview
   environment** (this is the preproduction deploy), and **leave it unset on Production**.
   That way production rejects every vacancy write (POST/PATCH/DELETE → 401), even if
   someone finds the URL.

## 2. Local testing with `vercel dev`

The Angular dev server alone (`pnpm start`) does NOT run the `/api` functions. To test the
full flow locally use Vercel:

```bash
npm i -g vercel        # if not installed
vercel link            # link to the Hirably project (once)
vercel env pull .env   # OR fill .env manually from .env.example
vercel dev             # serves the app + /api functions
```

`.env` is gitignored; copy `.env.example` and fill values (or use `vercel env pull`).

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
9. Confirm the success screen, and that an email arrives at talent@hirablystaffing.com
   with the applicant data + a link to the uploaded CV.

## Notes
- Vacancy data is shared across deploys (same Upstash store), so what RR.HH. publishes in
  preproduction is what production reads.
- Search is client-side for now (fine for a small list); swap to Elastic/full-text later.
