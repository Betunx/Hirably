import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { allow } from './_rate-limit';

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Issues a short-lived token so the browser can upload the CV straight to Vercel
 * Blob (client-upload pattern — avoids the 4.5 MB serverless body limit and any
 * multipart parsing here). Only the CV file type/size is gated.
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // Abuse guard: this endpoint hands out upload tokens to anyone (client-upload
  // pattern). Generous cap per IP — the flow POSTs here more than once per CV.
  if (!(await allow(req, 'applications-upload', 20, 3600))) {
    res.status(429).json({ error: 'Too many requests. Please try again later.' });
    return;
  }

  try {
    const jsonResponse = await handleUpload({
      request: req,
      body: req.body as HandleUploadBody,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED_TYPES,
        maximumSizeInBytes: MAX_BYTES,
        addRandomSuffix: true,
      }),
      // Required by the API; nothing to persist here — the email step gets the URL.
      onUploadCompleted: async () => { /* no-op */ },
    });
    res.status(200).json(jsonResponse);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : 'Upload failed' });
  }
}
