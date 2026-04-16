import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'GET') { res.status(405).end(); return; }

  const apiKey = process.env['CAL_API_KEY'];
  if (!apiKey) { res.status(500).json({ error: 'CAL_API_KEY not set' }); return; }

  const { eventTypeId, startTime, endTime, timeZone } = req.query;

  const params = new URLSearchParams();
  if (eventTypeId) params.set('eventTypeId', String(eventTypeId));
  if (startTime)   params.set('startTime', String(startTime));
  if (endTime)     params.set('endTime', String(endTime));
  if (timeZone)    params.set('timeZone', String(timeZone));

  try {
    const upstream = await fetch(
      `https://api.cal.com/v2/slots/available?${params.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'cal-api-version': '2024-09-04',
        },
      }
    );
    const parsed = await upstream.json() as { status?: string; data?: { slots?: unknown }; slots?: unknown };
    const slots = (parsed?.data as { slots?: unknown })?.slots ?? parsed?.slots ?? {};
    res.status(upstream.status).json({ slots });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
}
