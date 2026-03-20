import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as https from 'https';

export default function handler(req: VercelRequest, res: VercelResponse): void {
  if (req.method !== 'POST') { res.status(405).end(); return; }

  const apiKey = process.env['CAL_API_KEY'];
  if (!apiKey) { res.status(500).json({ error: 'CAL_API_KEY not set' }); return; }

  const body = JSON.stringify(req.body);
  const options = {
    hostname: 'api.cal.com',
    path: `/v1/bookings?apiKey=${apiKey}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
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

  upstream.write(body);
  upstream.end();
}
