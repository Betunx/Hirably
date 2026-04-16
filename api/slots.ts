import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as https from 'https';

export default function handler(req: VercelRequest, res: VercelResponse): void {
  if (req.method !== 'GET') { res.status(405).end(); return; }

  const apiKey = process.env['CAL_API_KEY'];
  if (!apiKey) { res.status(500).json({ error: 'CAL_API_KEY not set' }); return; }

  const { eventTypeId, startTime, endTime, timeZone } = req.query;

  const params = new URLSearchParams();
  if (eventTypeId) params.set('eventTypeId', String(eventTypeId));
  if (startTime)   params.set('startTime', String(startTime));
  if (endTime)     params.set('endTime', String(endTime));
  if (timeZone)    params.set('timeZone', String(timeZone));

  const options = {
    hostname: 'api.cal.com',
    path: `/v2/slots/available?${params.toString()}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'cal-api-version': '2024-09-04',
    },
  };

  https.get(options, (upstream) => {
    let data = '';
    upstream.on('data', chunk => data += chunk);
    upstream.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        // v2 wraps response in { status, data } — normalize to { slots } for the frontend
        const slots = parsed?.data?.slots ?? parsed?.slots ?? {};
        res.status(upstream.statusCode ?? 200).json({ slots });
      } catch {
        res.status(500).json({ error: 'Invalid response from Cal.com' });
      }
    });
  }).on('error', (err) => {
    res.status(500).json({ error: err.message });
  });
}
