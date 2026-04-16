import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as https from 'https';

export default function handler(req: VercelRequest, res: VercelResponse): void {
  if (req.method !== 'POST') { res.status(405).end(); return; }

  const apiKey = process.env['CAL_API_KEY'];
  if (!apiKey) { res.status(500).json({ error: 'CAL_API_KEY not set' }); return; }

  const { eventTypeId, start, responses, timeZone, language, metadata } = req.body ?? {};
  if (!eventTypeId || !start || !responses?.name || !responses?.email) {
    res.status(400).json({ error: 'Missing required fields' }); return;
  }

  // v2 uses `attendee` instead of `responses` + top-level timeZone/language
  const v2Body = JSON.stringify({
    eventTypeId,
    start,
    attendee: {
      name: responses.name,
      email: responses.email,
      timeZone: timeZone ?? 'America/Hermosillo',
      language: language ?? 'en',
    },
    metadata: metadata ?? {},
  });

  const options = {
    hostname: 'api.cal.com',
    path: '/v2/bookings',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'cal-api-version': '2024-09-04',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(v2Body),
    },
  };

  const upstream = https.request(options, (upRes) => {
    let data = '';
    upRes.on('data', chunk => data += chunk);
    upRes.on('end', () => {
      try {
        res.status(upRes.statusCode ?? 200).json(JSON.parse(data));
      } catch {
        res.status(500).json({ error: 'Invalid response from Cal.com' });
      }
    });
  });

  upstream.on('error', (err) => {
    res.status(500).json({ error: err.message });
  });

  upstream.write(v2Body);
  upstream.end();
}
