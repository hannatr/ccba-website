import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'

import { MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { TextLink } from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { articleIIIParagraphs, articleIIITitle } from '@/content/membership-rules'
import { absoluteUrl, site } from '@/content/site'

export const Route = createFileRoute('/join-renew')({
  head: () => ({
    meta: [
      { title: `Join / Renew | ${site.name}` },
      {
        name: 'description',
        content: 'Join or renew membership in the Cayuga County Bar Association — dues, mailing address, and membership categories.',
      },
      { property: 'og:title', content: `Join / Renew | ${site.name}` },
      {
        property: 'og:image',
        content: absoluteUrl('/images/hero/courthouse.jpg'),
      },
    ],
    links: [{ rel: 'canonical', href: absoluteUrl('/join-renew') }],
  }),
  component: JoinRenewPage,
})

function JoinRenewPage() {
  const [applicationOpen, setApplicationOpen] = React.useState(false)

  return (
    <div className="mx-auto max-w-prose space-y-8">
      <section className="space-y-3">
        <SectionHeading>Dues & Deadlines</SectionHeading>
        <p className="leading-relaxed">
          Renewal membership is <strong>{`$${site.duesAmountUsd}`}</strong> per year, due on or before <strong>August 1</strong>. Please
          mail your check with your completed application or renewal form to:
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
        <div className="pt-2">
          <Button type="button" size="lg" className="h-12 px-8 text-base" onClick={() => setApplicationOpen(true)}>
            Download application
          </Button>
        </div>
      </section>

      <Dialog open={applicationOpen} onOpenChange={setApplicationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-normal text-base leading-relaxed text-foreground">Form will be available soon.</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
