import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const apiKey = process.env['CAL_API_KEY'];
  if (!apiKey) return res.status(500).json({ error: 'Cal.com not configured' });

  const { eventTypeId, startTime, endTime, timeZone } = req.query;

  const url = new URL('https://api.cal.com/v1/slots');
  url.searchParams.set('apiKey', apiKey);
  if (eventTypeId) url.searchParams.set('eventTypeId', String(eventTypeId));
  if (startTime)   url.searchParams.set('startTime', String(startTime));
  if (endTime)     url.searchParams.set('endTime', String(endTime));
  if (timeZone)    url.searchParams.set('timeZone', String(timeZone));

  const upstream = await fetch(url.toString());
  const data = await upstream.json();
  return res.status(upstream.status).json(data);
}
