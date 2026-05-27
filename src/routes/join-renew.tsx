import { createFileRoute } from '@tanstack/react-router'

import { MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { TextLink } from '@/components/text-link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { articleIIIParagraphs, articleIIITitle } from '@/content/membership-rules'
import { heroForPath } from '@/content/images'
import { absoluteUrl, site } from '@/content/site'

export const Route = createFileRoute('/join-renew')({
  head: () => ({
    meta: [
      { title: `Join / Renew | ${site.name}` },
      {
        name: 'description',
        content:
          'Join or renew membership in the Cayuga County Bar Association — contact us by email to join, dues and mailing address for renewals, and membership categories.',
      },
      { property: 'og:title', content: `Join / Renew | ${site.name}` },
      {
        property: 'og:image',
        content: absoluteUrl(heroForPath('/join-renew').src),
      },
    ],
    links: [{ rel: 'canonical', href: absoluteUrl('/join-renew') }],
  }),
  component: JoinRenewPage,
})

function JoinRenewPage() {
  return (
    <div className="mx-auto max-w-prose space-y-8">
      <section className="space-y-3">
        <SectionHeading>Join</SectionHeading>
        <p className="leading-relaxed">
          If you seek to become a member of our association, please contact us by email at{' '}
          <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>.
        </p>
      </section>

      <Separator />

      <section className="space-y-3">
        <SectionHeading>Renew — Dues & Deadlines</SectionHeading>
        <p className="leading-relaxed">
          Renewal membership is <strong>{`$${site.duesAmountUsd}`}</strong> per year, due on or before <strong>August 1</strong>. Please mail
          your check to:
        </p>
        <Card>
          <CardContent className="pt-6">
            <address className="flex gap-3 not-italic">
              <MapPin className="mt-1 size-4 shrink-0 text-primary/75" strokeWidth={1.65} aria-hidden />
              <p className="text-sm leading-relaxed">
                <span className="font-medium text-foreground">{site.name}</span>
                <br />
                {site.poBoxLine}
              </p>
            </address>
          </CardContent>
        </Card>
        <p className="text-muted-foreground text-sm">
          Questions? Email <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>. We do not accept online payments; please pay by
          check.
        </p>
      </section>

      <Separator />

      <section className="space-y-4">
        <SectionHeading>Membership Categories</SectionHeading>
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">{articleIIITitle}</p>
        <div className="space-y-4 leading-relaxed">
          {articleIIIParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
    </div>
  )
}
