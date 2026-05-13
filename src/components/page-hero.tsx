import { useRouterState } from '@tanstack/react-router'

import { site } from '@/content/site'

const heroByPath: Record<string, { title: string; subtitle?: string } | undefined> = {
  '/': {
    title: site.name,
    subtitle: site.tagline,
  },
  '/membership-list': {
    title: 'Membership List',
    subtitle: 'Find a member by name or practice area.',
  },
  '/committees': {
    title: 'Committees',
    subtitle: 'Committee rosters for the association.',
  },
  '/join-renew': {
    title: 'Join / Renew Membership',
    subtitle: 'Membership information, dues, and mailing instructions.',
  },
  '/public-resources': {
    title: 'Public Resources',
    subtitle: 'Helpful links for the public and legal community.',
  },
  '/lost-wills': {
    title: 'Lost Wills',
    subtitle: 'Attorneys who may be holding wills for safekeeping.',
  },
}

export function PageHero() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const copy = heroByPath[pathname] ?? {
    title: site.shortName,
    subtitle: site.tagline,
  }
  return (
    <section
      className="relative isolate flex min-h-[280px] flex-col justify-end bg-slate-900 md:min-h-[380px] lg:min-h-[420px]"
      aria-label="Site banner"
    >
      <img
        src="/images/hero/courthouse.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover object-bottom"
        width={1920}
        height={600}
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-900/25" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-10 pt-20 md:pb-12 md:pt-24">
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-white drop-shadow md:text-3xl">{copy.title}</h1>
        {copy.subtitle ? <p className="mt-2 max-w-2xl text-pretty text-sm text-white/90 md:text-base">{copy.subtitle}</p> : null}
      </div>
    </section>
  )
}
