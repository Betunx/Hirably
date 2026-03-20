import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse): void {
  const apiKey = process.env['CAL_API_KEY'];
  res.status(200).json({
    ok: true,
    hasKey: !!apiKey,
    keyPrefix: apiKey ? apiKey.substring(0, 8) + '...' : 'NOT SET',
  });
}
