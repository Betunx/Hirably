/**
 * Hostname substrings that identify the preproduction branch deploy and local
 * dev. Used to gate UI/routes that should not be visible on the production
 * domain yet (the careers admin editor, the unreviewed legal pages). This is
 * UX/visibility only — anything that needs real protection (e.g. vacancy
 * writes) is also guarded server-side. Add a custom preprod domain here if one
 * is set up.
 */
export const PREPROD_HOSTS = ['git-preproduction', 'localhost', '127.0.0.1'];

/** True only on the preproduction branch deploy and local dev; false elsewhere. */
export function isPreprodHost(): boolean {
  const host = window.location.hostname;
  return PREPROD_HOSTS.some(s => host.includes(s));
}
