import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const apiKey = process.env['CAL_API_KEY'];
  if (!apiKey) { res.status(500).json({ error: 'CAL_API_KEY not set' }); return; }

  const h = { 'Authorization': `Bearer ${apiKey}`, 'cal-api-version': '2024-09-04' };
  const start = '2026-04-28T07:00:00.000Z';
  const end   = '2026-04-29T06:59:59.000Z';
  const tz    = 'America/Hermosillo';

  const [eventById, slotsBySlug, slotsById] = await Promise.all([
    fetch('https://api.cal.com/v2/event-types/4585757', { headers: h }),
    fetch(`https://api.cal.com/v2/slots/available?eventTypeSlug=30min&username=hirably&startTime=${start}&endTime=${end}&timeZone=${tz}`, { headers: h }),
    fetch(`https://api.cal.com/v2/slots/available?eventTypeId=4585757&startTime=${start}&endTime=${end}&timeZone=${tz}`, { headers: h }),
  ]);

  res.status(200).json({
    eventById:    await eventById.json(),
    slotsBySlug:  await slotsBySlug.json(),
    slotsById:    await slotsById.json(),
  });
}
