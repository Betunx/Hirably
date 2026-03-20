import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as https from 'https';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const apiKey = process.env['CAL_API_KEY'];
  if (!apiKey) return res.status(500).json({ error: 'CAL_API_KEY not set' });

  const { eventTypeId, startTime, endTime, timeZone } = req.query;

  const params = new URLSearchParams();
  params.set('apiKey', apiKey);
  if (eventTypeId) params.set('eventTypeId', String(eventTypeId));
  if (startTime)   params.set('startTime', String(startTime));
  if (endTime)     params.set('endTime', String(endTime));
  if (timeZone)    params.set('timeZone', String(timeZone));

  const url = `https://api.cal.com/v1/slots?${params.toString()}`;

  https.get(url, (upstream) => {
    let data = '';
    upstream.on('data', chunk => data += chunk);
    upstream.on('end', () => {
      try {
        res.status(upstream.statusCode ?? 200).json(JSON.parse(data));
      } catch {
        res.status(500).json({ error: 'Invalid response from Cal.com' });
      }
    });
  }).on('error', (err) => {
    res.status(500).json({ error: err.message });
  });
}
