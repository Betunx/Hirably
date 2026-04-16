import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const apiKey = process.env['CAL_API_KEY'];
  if (!apiKey) { res.status(500).json({ error: 'CAL_API_KEY not set' }); return; }

  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'cal-api-version': '2024-09-04',
  };

  const [meRes, eventsRes] = await Promise.all([
    fetch('https://api.cal.com/v2/me', { headers }),
    fetch('https://api.cal.com/v2/event-types', { headers }),
  ]);

  const me = await meRes.json();
  const events = await eventsRes.json();

  res.status(200).json({ me, events });
}
