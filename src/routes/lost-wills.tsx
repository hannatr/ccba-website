import { createFileRoute } from '@tanstack/react-router'

import { SectionHeading } from '@/components/section-heading'
import { TextLink } from '@/components/text-link'
import { heroForPath } from '@/content/images'
import { absoluteUrl, site } from '@/content/site'

export const Route = createFileRoute('/lost-wills')({
  head: () => ({
    meta: [
      { title: `Lost Wills | ${site.name}` },
      {
        name: 'description',
        content:
          'Information about attorneys who may be holding wills for safekeeping — Cayuga County Bar Association.',
      },
      { property: 'og:title', content: `Lost Wills | ${site.name}` },
      {
        property: 'og:image',
        content: absoluteUrl(heroForPath('/lost-wills').src),
      },
    ],
    links: [{ rel: 'canonical', href: absoluteUrl('/lost-wills') }],
  }),
  component: LostWillsPage,
})

function LostWillsPage() {
  return (
    <div className="mx-auto max-w-prose space-y-6">
      <section className="space-y-3">
        <SectionHeading>Lost Wills Registry</SectionHeading>
        <p className="text-muted-foreground leading-relaxed">
          If you believe a retired or deceased attorney may have held your will, this page will list members who have indicated they may
          hold wills for others. The association does not have this information yet; this page will be updated when a list becomes
          available.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          If you have an immediate need, please email the bar association at{' '}
          <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>.
        </p>
      </section>
    </div>
  )
}
