/**
 * Small in-memory cache for read queries, keyed by an arbitrary string.
 *
 * This is a client-side SPA (static export, no server) — every page
 * navigation re-mounts components and re-runs their fetch effects, so
 * without this, browsing home -> therapists -> home -> therapists hits
 * Supabase fresh every single time even though the result rarely changes
 * second to second. A short TTL cuts that down without risking stale data
 * for more than a few seconds.
 *
 * In-flight de-duping is included too: if two callers ask for the same key
 * while a fetch is still pending (e.g. React strict-mode double-effects, or
 * two components wanting the same data), they share one request instead of
 * firing two.
 */

type CacheEntry<T> = {
  value: T
  expiresAt: number
}

const store = new Map<string, CacheEntry<unknown>>()
const inFlight = new Map<string, Promise<unknown>>()

const DEFAULT_TTL_MS = 30_000

export async function cachedQuery<T>(
  key: string,
  fn: () => Promise<T>,
  ttlMs: number = DEFAULT_TTL_MS
): Promise<T> {
  const cached = store.get(key)
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value as T
  }

  const pending = inFlight.get(key)
  if (pending) {
    return pending as Promise<T>
  }

  const promise = fn()
    .then((value) => {
      store.set(key, { value, expiresAt: Date.now() + ttlMs })
      inFlight.delete(key)
      return value
    })
    .catch((err) => {
      inFlight.delete(key)
      throw err
    })

  inFlight.set(key, promise)
  return promise
}

/** Drop cached entries whose key starts with `prefix`. Call this after a
 * write (e.g. a therapist edits their listing) so the next read doesn't
 * serve stale cached data for up to the full TTL. */
export function invalidateQueryCache(prefix: string) {
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) store.delete(key)
  }
}
