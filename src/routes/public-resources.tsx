import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink, ShieldAlert } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { RouterTextLink, TextLink } from '@/components/text-link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { publicResourceSections } from '@/content/resources'
import { absoluteUrl, site } from '@/content/site'

export const Route = createFileRoute('/public-resources')({
  head: () => ({
    meta: [
      { title: `Public Resources | ${site.name}` },
      {
        name: 'description',
        content: 'Curated legal and government links for Cayuga County residents — courts, legal aid, consumer protection, and more.',
      },
      { property: 'og:title', content: `Public Resources | ${site.name}` },
      {
        property: 'og:image',
        content: absoluteUrl('/images/hero/courthouse.jpg'),
      },
    ],
    links: [{ rel: 'canonical', href: absoluteUrl('/public-resources') }],
  }),
  component: PublicResourcesPage,
})

function PublicResourcesPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <SectionHeading>For the Public</SectionHeading>
        <p className="text-muted-foreground max-w-prose leading-relaxed">
          These links are provided as a public service. The {site.name} does not endorse external sites and is not responsible for their
          content.
        </p>
      </section>

      <Alert>
        <ShieldAlert className="text-primary" strokeWidth={1.65} aria-hidden />
        <AlertTitle>{site.name} does not provide lawyer referrals.</AlertTitle>
        <AlertDescription className="space-y-3">
          <p>
            Use the{' '}
            <TextLink
              className="inline-flex items-center gap-1"
              href="https://nysba.intouchondemand.com/findlawyer/search"
              target="_blank"
              rel="noopener noreferrer"
            >
              New York State Bar Association Lawyer Referral Service
              <ExternalLink className="size-3.5 opacity-70" aria-hidden />
            </TextLink>{' '}
            or call <span className="whitespace-nowrap">(800) 342-3661</span>.
          </p>
          <p className="flex flex-wrap items-center gap-1.5">
            <span>Looking for a lost will? See our</span>
            <RouterTextLink to="/lost-wills">Lost Wills</RouterTextLink>
            <span>page.</span>
          </p>
        </AlertDescription>
      </Alert>

      <Separator />

      {publicResourceSections.map((section) => (
        <section key={section.heading} className="space-y-3">
          <SectionHeading level={3}>{section.heading}</SectionHeading>
          <ul className="flex flex-col gap-2">
            {section.links.map((link) => (
              <li key={link.href}>
                <TextLink className="inline-flex items-center gap-2" href={link.href} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-3.5 shrink-0 opacity-60" strokeWidth={1.65} aria-hidden />
                  {link.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
