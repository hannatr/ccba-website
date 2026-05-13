import { createFileRoute } from '@tanstack/react-router'
import { Users } from 'lucide-react'

import type { CommitteeMemberRow } from '@/db/schema'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { absoluteUrl, site } from '@/content/site'
import { fetchCommitteeMembers } from '@/server/bar-data'

export const Route = createFileRoute('/committees')({
  loader: async () => await fetchCommitteeMembers(),
  head: () => ({
    meta: [
      { title: `Committees | ${site.name}` },
      {
        name: 'description',
        content: 'Committees of the Cayuga County Bar Association — members and chairs by committee.',
      },
      { property: 'og:title', content: `Committees | ${site.name}` },
      {
        property: 'og:image',
        content: absoluteUrl('/images/hero/courthouse.jpg'),
      },
    ],
    links: [{ rel: 'canonical', href: absoluteUrl('/committees') }],
  }),
  component: CommitteesPage,
})

type CommitteeGroup = { committeeName: string; members: Array<CommitteeMemberRow> }

function groupByCommittee(rows: Array<CommitteeMemberRow>): Array<CommitteeGroup> {
  const order: Array<string> = []
  const map = new Map<string, Array<CommitteeMemberRow>>()
  for (const row of rows) {
    if (!map.has(row.committeeName)) {
      order.push(row.committeeName)
      map.set(row.committeeName, [])
    }
    map.get(row.committeeName)!.push(row)
  }
  return order.map((committeeName) => ({
    committeeName,
    members: map.get(committeeName)!,
  }))
}

/** Matches committee names that include the word Executive (e.g. "Executive Committee", "CCBA Executive Committee"). */
function isExecutiveCommittee(committeeName: string): boolean {
  return /\bexecutive\b/i.test(committeeName.trim())
}

function partitionExecutive(groups: Array<CommitteeGroup>): { executive: CommitteeGroup | null; other: Array<CommitteeGroup> } {
  const idx = groups.findIndex((g) => isExecutiveCommittee(g.committeeName))
  if (idx === -1) return { executive: null, other: groups }
  const executive = groups[idx]
  const other = groups.filter((_, i) => i !== idx)
  return { executive, other }
}

function CommitteeRosterCard({ committeeName, members }: CommitteeGroup) {
  return (
    <Card className="gap-0 overflow-hidden border-border/50 py-0 shadow-sm ring-1 ring-border/30 transition-[border-color,box-shadow] duration-200 hover:border-primary/20 hover:shadow-md hover:ring-primary/10 dark:ring-border/40">
      <CardHeader className="rounded-none border-b border-border/40 bg-muted/25 px-6 py-4 pl-5 border-l-4 border-l-primary">
        <CardTitle className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">{committeeName}</CardTitle>
        <CardDescription className="mt-0.5">
          {members.length} member{members.length === 1 ? '' : 's'}
        </CardDescription>
      </CardHeader>
      <CardContent className="border-t-0 bg-card px-0 py-0">
        <ul className="divide-y divide-border/60">
          {members.map((m) => (
            <li key={m.id} className="flex flex-wrap items-center gap-x-2 gap-y-1 px-6 py-3 text-sm transition-colors hover:bg-muted/35">
              <span className="min-w-0 flex-1 font-medium text-foreground">{m.name}</span>
              {m.isChair ? (
                <Badge variant="outline" className="shrink-0 border-primary/30 bg-primary/5 font-medium text-primary">
                  Chair
                </Badge>
              ) : null}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function CommitteesPage() {
  const rows = Route.useLoaderData()
  const groups = groupByCommittee(rows)
  const { executive, other } = partitionExecutive(groups)

  return (
    <div className="space-y-8">
      {groups.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <Alert>
              <Users className="text-primary" strokeWidth={1.65} aria-hidden />
              <AlertTitle>No committees listed</AlertTitle>
              <AlertDescription>
                Add rows to the <code className="bg-muted rounded px-1 py-0.5 text-xs">committee_members</code> table to show rosters here.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      ) : (
        <>
          {executive ? <CommitteeRosterCard committeeName={executive.committeeName} members={executive.members} /> : null}
          {other.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {other.map((g) => (
                <CommitteeRosterCard key={g.committeeName} committeeName={g.committeeName} members={g.members} />
              ))}
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
