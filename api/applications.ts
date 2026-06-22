import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env['RESEND_API_KEY'];
  const to = process.env['TALENT_EMAIL'] ?? 'talent@hirablystaffing.com';
  const from = process.env['RESEND_FROM'] ?? 'Hirably Careers <careers@hirablystaffing.com>';
  if (!apiKey) { res.status(500).json({ error: 'RESEND_API_KEY not set' }); return; }

  const { vacancyTitle, name, email, phone, message, cvUrl, company } = req.body ?? {};

  // Honeypot: bots fill the hidden "company" field — silently accept, send nothing.
  if (company) { res.status(200).json({ ok: true }); return; }

  if (!name || !email || !cvUrl) {
    res.status(400).json({ error: 'name, email and cvUrl are required' });
    return;
  }

  const title = vacancyTitle ? String(vacancyTitle) : 'a position';
  const html = `
    <h2>New application — ${escapeHtml(title)}</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
    ${message ? `<p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
    <p><strong>CV:</strong> <a href="${escapeHtml(cvUrl)}">${escapeHtml(cvUrl)}</a></p>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: String(email),
      subject: `New application: ${title}`,
      html,
    });
    if (error) { res.status(502).json({ error: error.message }); return; }
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
}
