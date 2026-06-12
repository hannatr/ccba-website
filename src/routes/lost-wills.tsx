import { createFileRoute } from '@tanstack/react-router'
import { FileSearch, Phone } from 'lucide-react'

import type { LostWillCustodianRow } from '@/db/schema'
import { SectionHeading } from '@/components/section-heading'
import { TextLink } from '@/components/text-link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { heroForPath } from '@/content/images'
import { absoluteUrl, site } from '@/content/site'
import { fetchLostWillCustodians } from '@/server/bar-data'

export const Route = createFileRoute('/lost-wills')({
  loader: async () => await fetchLostWillCustodians(),
  head: () => ({
    meta: [
      { title: `Lost Wills | ${site.name}` },
      {
        name: 'description',
        content:
          'Law offices holding wills for attorneys who retired, are deceased, or left private practice — Cayuga County Bar Association.',
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

function phoneHref(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) return `tel:+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `tel:+${digits}`
  return `tel:${raw}`
}

function CustodianCard({ custodian }: { custodian: LostWillCustodianRow }) {
  const phone = custodian.phone?.trim()
  return (
    <Card className="gap-0 overflow-hidden border-border/50 py-0 shadow-sm ring-1 ring-border/30 transition-[border-color,box-shadow] duration-200 hover:border-primary/20 hover:shadow-md hover:ring-primary/10 dark:ring-border/40">
      <CardHeader className="rounded-none border-b border-border/40 bg-muted/25 px-6 py-4 pl-5 border-l-4 border-l-primary">
        <CardTitle className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">{custodian.firmName}</CardTitle>
        {phone ? (
          <CardDescription className="mt-0.5">
            <TextLink href={phoneHref(phone)} className="inline-flex items-center gap-1.5 text-sm">
              <Phone className="size-3.5 shrink-0" strokeWidth={1.65} aria-hidden />
              {phone}
            </TextLink>
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="border-t-0 bg-card px-6 py-4">
        <p className="text-sm font-medium text-muted-foreground">Holding files for:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground">
          {custodian.holdingFor.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function LostWillsPage() {
  const custodians = Route.useLoaderData()

  return (
    <div className="space-y-8">
      <section className="mx-auto max-w-prose space-y-3">
        <SectionHeading level={3}>Private Practice</SectionHeading>
        <p className="text-muted-foreground leading-relaxed">
          If you believe a retired or deceased attorney may have held your will, contact the law office listed below that is holding their
          files.
        </p>
      </section>

      {custodians.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <Alert>
              <FileSearch className="text-primary" strokeWidth={1.65} aria-hidden />
              <AlertTitle>No custodians listed</AlertTitle>
              <AlertDescription>
                Add rows to the <code className="bg-muted rounded px-1 py-0.5 text-xs">lost_will_custodians</code> table to show law
                offices here.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {custodians.map((custodian) => (
            <CustodianCard key={custodian.id} custodian={custodian} />
          ))}
        </div>
      )}

      <p className="mx-auto max-w-prose text-muted-foreground leading-relaxed">
        If you have an immediate need, please email the bar association at <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>.
      </p>
    </div>
  )
}
