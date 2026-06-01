import { createFileRoute } from '@tanstack/react-router'

import { Calendar, Mail, MapPin, Scale, User } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { TextLink } from '@/components/text-link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HeritageGallery } from '@/components/heritage-gallery'
import { heroForPath } from '@/content/images'
import { upcomingEventsIntro } from '@/content/events'
import { articleIIBody, articleIITitle } from '@/content/mission'
import { formatEventDate } from '@/lib/format-event-date'
import { organizationJsonLd } from '@/lib/organization-jsonld'
import { absoluteUrl, nysbaLawyerReferralUrl, site } from '@/content/site'
import { fetchOfficers, fetchUpcomingEvents } from '@/server/bar-data'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [officerRows, upcomingEventRows] = await Promise.all([fetchOfficers(), fetchUpcomingEvents()])
    return { officerRows, upcomingEventRows }
  },
  head: () => ({
    meta: [
      {
        title: `${site.name} | Home`,
      },
      {
        name: 'description',
        content:
          'Mission, officers, and contact information for the Cayuga County Bar Association — lawyers and legal resources in Cayuga County and Auburn, NY.',
      },
      { property: 'og:title', content: `${site.name} | Home` },
      {
        property: 'og:description',
        content: 'Cayuga County Bar Association — member directory, public resources, and membership information.',
      },
      {
        property: 'og:image',
        content: absoluteUrl(heroForPath('/').src),
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: absoluteUrl('/') }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(organizationJsonLd()),
      },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  const { officerRows, upcomingEventRows } = Route.useLoaderData()

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,24rem)] xl:grid-cols-[1fr_minmax(0,30rem)] lg:items-start">
        <div className="space-y-8">
          <section className="space-y-3">
            <SectionHeading>Mission</SectionHeading>
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">{articleIITitle}</p>
            <p className="text-foreground max-w-prose leading-relaxed">{articleIIBody}</p>
          </section>

          <section className="space-y-4">
            <SectionHeading>Upcoming Events</SectionHeading>
            <p className="text-foreground max-w-prose leading-relaxed">{upcomingEventsIntro}</p>
            {upcomingEventRows.length === 0 ? (
              <p className="text-muted-foreground text-sm leading-relaxed">No upcoming events are scheduled at this time.</p>
            ) : (
              <ul className="space-y-3">
                {upcomingEventRows.map((event) => (
                  <li key={event.id}>
                    <Card>
                      <CardHeader className="flex flex-row items-start gap-3 py-4">
                        <Calendar className="mt-0.5 size-8 shrink-0 text-primary/70" strokeWidth={1.65} aria-hidden />
                        <div className="min-w-0 space-y-1">
                          <CardTitle className="text-base">{event.name}</CardTitle>
                          <CardDescription>{formatEventDate(event)}</CardDescription>
                          {event.location ? <p className="text-muted-foreground text-sm">{event.location}</p> : null}
                        </div>
                      </CardHeader>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-foreground max-w-prose leading-relaxed">
              For more information on events, contact us at <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>.
            </p>
          </section>

          <section className="space-y-4">
            <SectionHeading>Officers</SectionHeading>
            {officerRows.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <Alert>
                    <User className="text-primary" strokeWidth={1.65} aria-hidden />
                    <AlertTitle>No officers listed</AlertTitle>
                    <AlertDescription>
                      Officer rosters are loaded from the database. Add rows to the{' '}
                      <code className="bg-muted rounded px-1 py-0.5 text-xs">officers</code> table to show leadership here.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {officerRows.map((o) => (
                  <Card key={o.id}>
                    <CardHeader className="flex flex-row items-start gap-3 py-4">
                      <User className="mt-0.5 size-8 shrink-0 text-primary/70" strokeWidth={1.65} aria-hidden />
                      <div className="min-w-0 space-y-1">
                        <CardDescription>{o.title}</CardDescription>
                        <CardTitle className="text-base">{o.name}</CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="lg:sticky lg:top-4">
          <Card className="border-primary/20 bg-card shadow-md">
            <CardHeader>
              <CardTitle className="text-primary font-heading text-xl font-semibold tracking-tight lg:text-2xl">Contact us</CardTitle>
              <CardDescription>
                Reach the association by mail or email. We do not accept walk-in legal questions or referrals through this site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary/75" strokeWidth={1.65} aria-hidden />
                <div>
                  <p className="font-medium text-foreground">Mailing address</p>
                  <p className="text-muted-foreground mt-1">{site.poBoxLine}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary/75" strokeWidth={1.65} aria-hidden />
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <TextLink className="mt-1 inline-block" href={`mailto:${site.email}`}>
                    {site.email}
                  </TextLink>
                </div>
              </div>
              <p className="text-muted-foreground flex gap-2 border-t pt-3 text-xs leading-relaxed">
                <Scale className="mt-0.5 size-3.5 shrink-0 text-primary/70" strokeWidth={1.65} aria-hidden />
                <span>
                  For lawyer referrals, please use the{' '}
                  <TextLink href={nysbaLawyerReferralUrl} target="_blank" rel="noopener noreferrer">
                    NYSBA Lawyer Referral Service
                  </TextLink>
                  .
                </span>
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>

      <HeritageGallery />
    </div>
  )
}
