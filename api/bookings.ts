import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') { res.status(405).end(); return; }

  const apiKey = process.env['CAL_API_KEY'];
  if (!apiKey) { res.status(500).json({ error: 'CAL_API_KEY not set' }); return; }

  const { eventTypeId, start, responses, timeZone, language, metadata } = req.body ?? {};
  if (!eventTypeId || !start || !responses?.name || !responses?.email) {
    res.status(400).json({ error: 'Missing required fields' }); return;
  }

  try {
    const upstream = await fetch('https://api.cal.com/v2/bookings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'cal-api-version': '2024-09-04',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventTypeId,
        start,
        attendee: {
          name: responses.name,
          email: responses.email,
          timeZone: timeZone ?? 'America/Hermosillo',
          language: language ?? 'en',
        },
        metadata: metadata ?? {},
      }),
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
}
