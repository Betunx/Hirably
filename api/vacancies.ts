import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

// ── Types (mirror src/app/models Vacancy) ───────────────────────────────────
interface Vacancy {
  id: string;
  title: string;
  description: string;
  location?: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

const KEY = 'vacancies';

// Works with both the Upstash-native and the Vercel-Marketplace env var names.
const redis = new Redis({
  url: process.env['KV_REST_API_URL'] ?? process.env['UPSTASH_REDIS_REST_URL'] ?? '',
  token: process.env['KV_REST_API_TOKEN'] ?? process.env['UPSTASH_REDIS_REST_TOKEN'] ?? '',
});

/** Writes require the shared admin token. In production ADMIN_TOKEN is unset → always false. */
function isAdmin(req: VercelRequest): boolean {
  const expected = process.env['ADMIN_TOKEN'];
  if (!expected) return false;
  const got = req.headers['x-admin-token'];
  return typeof got === 'string' && got === expected;
}

async function readAll(): Promise<Vacancy[]> {
  return (await redis.get<Vacancy[]>(KEY)) ?? [];
}

async function writeAll(list: Vacancy[]): Promise<void> {
  await redis.set(KEY, list);
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    switch (req.method) {
      case 'GET': {
        const wantsAll = req.query['all'] === '1';
        // The admin editor calls ?all=1 to validate its token and see drafts.
        // Reject a bad/absent token here so the login fails loudly instead of
        // silently falling back to the public list.
        if (wantsAll && !isAdmin(req)) { res.status(401).json({ error: 'Unauthorized' }); return; }
        const list = await readAll();
        const result = wantsAll ? list : list.filter(v => v.status === 'published');
        res.status(200).json(result);
        return;
      }

      case 'POST': {
        if (!isAdmin(req)) { res.status(401).json({ error: 'Unauthorized' }); return; }
        const { title, description, location, status } = req.body ?? {};
        if (!title || !description) {
          res.status(400).json({ error: 'title and description are required' });
          return;
        }
        const now = new Date().toISOString();
        const vacancy: Vacancy = {
          id: globalThis.crypto.randomUUID(),
          title: String(title).trim(),
          description: String(description).trim(),
          location: location ? String(location).trim() : undefined,
          status: status === 'published' ? 'published' : 'draft',
          createdAt: now,
          updatedAt: now,
        };
        const list = await readAll();
        list.unshift(vacancy);
        await writeAll(list);
        res.status(201).json(vacancy);
        return;
      }

      case 'PATCH': {
        if (!isAdmin(req)) { res.status(401).json({ error: 'Unauthorized' }); return; }
        const id = req.query['id'];
        if (typeof id !== 'string') { res.status(400).json({ error: 'id is required' }); return; }
        const list = await readAll();
        const idx = list.findIndex(v => v.id === id);
        if (idx === -1) { res.status(404).json({ error: 'Not found' }); return; }

        const { title, description, location, status } = req.body ?? {};
        const current = list[idx];
        const updated: Vacancy = {
          ...current,
          title: title !== undefined ? String(title).trim() : current.title,
          description: description !== undefined ? String(description).trim() : current.description,
          location: location !== undefined ? String(location).trim() || undefined : current.location,
          status: status === 'published' || status === 'draft' ? status : current.status,
          updatedAt: new Date().toISOString(),
        };
        list[idx] = updated;
        await writeAll(list);
        res.status(200).json(updated);
        return;
      }

      case 'DELETE': {
        if (!isAdmin(req)) { res.status(401).json({ error: 'Unauthorized' }); return; }
        const id = req.query['id'];
        if (typeof id !== 'string') { res.status(400).json({ error: 'id is required' }); return; }
        const list = await readAll();
        const next = list.filter(v => v.id !== id);
        await writeAll(next);
        res.status(204).end();
        return;
      }

      default:
        res.setHeader('Allow', 'GET, POST, PATCH, DELETE');
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
}
