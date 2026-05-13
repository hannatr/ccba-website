/** Cayuga County Bar Association — site constants (verify before launch). */
export const defaultSiteUrl = 'https://cayugacountybarassociation.org'

/** Public URL path to the association logo (`public/images/ccba-logo.png`). */
export const siteLogoPath = '/images/ccba-logo.png' as const

export const site = {
  name: 'Cayuga County Bar Association',
  shortName: 'CCBA',
  tagline: 'Serving the Cayuga County, New York legal community',
  email: 'cayugacountybarassociation@gmail.com',
  poBoxLine: 'P.O. Box 931, Auburn, NY 13021',
  duesAmountUsd: 60,
  duesDueDescription: 'Annual membership dues are $60 and due each August 1.',
} as const

/** Production base URL — set `VITE_SITE_URL` in Vercel for canonical + OG links. */
export function siteUrl(): string {
  const v = import.meta.env.VITE_SITE_URL
  return (typeof v === 'string' && v.length > 0 ? v : defaultSiteUrl).replace(/\/$/, '')
}

export function absoluteUrl(path: string): string {
  const base = siteUrl()
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}
