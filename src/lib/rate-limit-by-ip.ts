type RateLimitEntry = {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

const DEFAULT_MAX = 5
const DEFAULT_WINDOW_MS = 15 * 60 * 1000

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number }

export function checkRateLimitByIp(ip: string, options?: { max?: number; windowMs?: number }): RateLimitResult {
  const max = options?.max ?? DEFAULT_MAX
  const windowMs = options?.windowMs ?? DEFAULT_WINDOW_MS
  const now = Date.now()
  const key = ip.trim() || 'unknown'

  const entry = store.get(key)
  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true }
  }

  if (entry.count >= max) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    }
  }

  entry.count += 1
  return { allowed: true }
}
