import type { VercelRequest } from '@vercel/node';
import { Redis } from '@upstash/redis';

// Shared helper (the leading underscore tells Vercel not to expose this file as
// a serverless function). Reuses the same Upstash Redis store as the vacancies
// API, so no extra dependency or infrastructure is needed.
const redis = new Redis({
  url: process.env['KV_REST_API_URL'] ?? process.env['UPSTASH_REDIS_REST_URL'] ?? '',
  token: process.env['KV_REST_API_TOKEN'] ?? process.env['UPSTASH_REDIS_REST_TOKEN'] ?? '',
});

/** Best-effort client IP from the proxy headers Vercel sets. */
function clientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string') return fwd.split(',')[0].trim();
  if (Array.isArray(fwd) && fwd.length) return fwd[0];
  return req.socket?.remoteAddress ?? 'unknown';
}

/**
 * Fixed-window rate limit keyed by client IP. Returns true if the request is
 * allowed, false once the limit is exceeded within the window.
 *
 * Fails OPEN (allows) if Redis is unreachable so a transient store outage never
 * blocks legitimate users — abuse protection is best-effort, not a hard gate.
 */
export async function allow(
  req: VercelRequest,
  bucket: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  const key = `rl:${bucket}:${clientIp(req)}`;
  try {
    const count = await redis.incr(key);
    // First hit in this window starts the TTL; later hits keep the same window.
    if (count === 1) await redis.expire(key, windowSeconds);
    return count <= limit;
  } catch {
    return true; // fail open
  }
}