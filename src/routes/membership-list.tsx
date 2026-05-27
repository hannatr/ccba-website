import { createFileRoute } from '@tanstack/react-router'

import { MembershipDirectory } from '@/components/membership-directory'
import { fetchMembers } from '@/server/bar-data'
import { heroForPath } from '@/content/images'
import { absoluteUrl, site } from '@/content/site'

export const Route = createFileRoute('/membership-list')({
  loader: async () => await fetchMembers(),
  head: () => ({
    meta: [
      { title: `Membership List | ${site.name}` },
      {
        name: 'description',
        content:
          'Directory of Cayuga County Bar Association members with practice areas — find an attorney in Cayuga County or Auburn, NY.',
      },
      { property: 'og:title', content: `Membership List | ${site.name}` },
      {
        property: 'og:image',
        content: absoluteUrl(heroForPath('/membership-list').src),
      },
    ],
    links: [{ rel: 'canonical', href: absoluteUrl('/membership-list') }],
  }),
  component: MembershipListPage,
})

function MembershipListPage() {
  const members = Route.useLoaderData()
  return <MembershipDirectory members={members} />
}
