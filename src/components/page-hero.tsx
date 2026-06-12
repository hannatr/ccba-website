import { Link, useRouterState } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { heroForPath } from '@/content/images'
import { site } from '@/content/site'

const heroCopyByPath: Record<string, { title: string; subtitle?: string } | undefined> = {
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
    subtitle: 'Contact us to join; dues and mailing instructions for renewals.',
  },
  '/public-resources': {
    title: 'Public Resources',
    subtitle: 'Helpful links for the public and legal community.',
  },
  '/lost-wills': {
    title: 'Lost Wills',
    subtitle: 'Law offices holding wills for attorneys who retired, are deceased, or left practice.',
  },
}

export function PageHero() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const copy = heroCopyByPath[pathname] ?? {
    title: site.shortName,
    subtitle: site.tagline,
  }
  const image = heroForPath(pathname)
  return (
    <section
      className="relative isolate flex min-h-[280px] flex-col justify-end bg-slate-900 md:min-h-[380px] lg:min-h-[420px]"
      aria-label="Site banner"
    >
      <img
        src={image.src}
        alt=""
        className={`absolute inset-0 size-full object-cover ${image.objectPosition === 'top' ? 'object-top' : 'object-center'}`}
        width={1920}
        height={553}
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-900/25" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-10 pt-20 md:pb-12 md:pt-24">
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-white drop-shadow md:text-3xl">{copy.title}</h1>
        {copy.subtitle ? <p className="mt-2 max-w-2xl text-pretty text-sm text-white/90 md:text-base">{copy.subtitle}</p> : null}
        {pathname === '/' ? (
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild className="h-12 px-6 text-base font-bold uppercase md:h-14 md:px-8 md:text-lg">
              <Link to="/membership-list">Find a Lawyer</Link>
            </Button>
            <Button asChild className="h-12 px-6 text-base font-bold uppercase md:h-14 md:px-8 md:text-lg">
              <Link to="/lost-wills">Find a Will</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
