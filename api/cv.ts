import type { VercelRequest, VercelResponse } from '@vercel/node';
import { issueSignedToken, presignUrl } from '@vercel/blob';
import { allow } from './_rate-limit';

// Presigned URLs are short-lived on purpose: the emailed link points here (a
// stable route), and every open mints a fresh 5-minute URL. So even if a
// presigned URL leaks it expires fast, and the blob itself stays private.
const PRESIGN_TTL_MS = 5 * 60 * 1000;

/**
 * Redirects to a short-lived presigned URL for a private CV blob.
 *
 * The application email carries a stable `/api/cv?p=<pathname>` link (built in
 * CareersService.uploadCv). The `pathname` includes an unguessable random
 * suffix, so it acts as a capability URL — same reach as the old public URL,
 * but now the blob is private and access is brokered here, leaving room to add
 * admin gating / logging / revocation later (TODO-DEV §5).
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // Modest per-IP cap: discourages enumeration of pathnames without blocking a
  // recruiter who opens several CVs in a sitting.
  if (!(await allow(req, 'cv-download', 60, 3600))) {
    res.status(429).json({ error: 'Too many requests. Please try again later.' });
    return;
  }

  const pathname = typeof req.query['p'] === 'string' ? req.query['p'] : '';
  if (!pathname) {
    res.status(400).json({ error: 'Missing CV reference.' });
    return;
  }

  try {
    const validUntil = Date.now() + PRESIGN_TTL_MS;
    // issueSignedToken + presignUrl use BLOB_READ_WRITE_TOKEN server-side; the
    // token is scoped to this pathname and read-only (`get`).
    const signed = await issueSignedToken({ pathname, operations: ['get'], validUntil });
    const { presignedUrl } = await presignUrl(signed, {
      operation: 'get',
      pathname,
      access: 'private',
      validUntil,
    });
    res.setHeader('Cache-Control', 'no-store');
    res.redirect(302, presignedUrl);
  } catch {
    res.status(404).json({ error: 'CV not found.' });
  }
}
