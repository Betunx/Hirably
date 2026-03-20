import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const apiKey = process.env['CAL_API_KEY'];
  if (!apiKey) return res.status(500).json({ error: 'Cal.com not configured' });

  const upstream = await fetch(`https://api.cal.com/v1/bookings?apiKey=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });

  const data = await upstream.json();
  return res.status(upstream.status).json(data);
}
