import { createFileRoute } from '@tanstack/react-router'

import { SectionHeading } from '@/components/section-heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { fetchLostWillHolders } from '@/server/bar-data'
import { heroForPath } from '@/content/images'
import { absoluteUrl, site } from '@/content/site'

export const Route = createFileRoute('/lost-wills')({
  loader: async () => await fetchLostWillHolders(),
  head: () => ({
    meta: [
      { title: `Lost Wills | ${site.name}` },
      {
        name: 'description',
        content: 'Attorneys who may be holding wills for safekeeping — Cayuga County Bar Association.',
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
  const rows = Route.useLoaderData()
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <SectionHeading>Lost Wills Registry</SectionHeading>
        <p className="text-muted-foreground max-w-prose leading-relaxed">
          If you believe a retired or deceased attorney may have held your will, the following members have indicated they may hold wills
          for others. This list will be updated as the association receives information.
        </p>
      </section>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[min(40%,14rem)]">Attorney</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="whitespace-normal font-medium">{r.attorneyName}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-normal">{r.notes || '—'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-muted-foreground h-24 text-center">
                  No attorneys are listed yet. When the association provides an updated list, it will appear here.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
