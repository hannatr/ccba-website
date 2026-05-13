import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import * as React from 'react'
import { ListFilter, Search, Users } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'

import type { MemberRow } from '@/db/schema'
import { MembershipDirectoryDisclaimer } from '@/components/membership-directory-disclaimer'
import { TextLink } from '@/components/text-link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

function websiteHref(raw: string | null): string | null {
  const u = raw?.trim()
  if (!u) return null
  if (/^https?:\/\//i.test(u)) return u
  return `https://${u}`
}

const columns: Array<ColumnDef<MemberRow>> = [
  {
    accessorKey: 'displayName',
    header: 'Name',
    cell: ({ getValue }) => <span className="whitespace-normal font-medium">{getValue<string>()}</span>,
  },
  {
    accessorKey: 'firm',
    header: 'Firm',
    cell: ({ getValue }) => <span className="whitespace-normal text-muted-foreground">{getValue<string | null>() || '—'}</span>,
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ getValue }) => <span className="whitespace-normal text-muted-foreground">{getValue<string | null>() || '—'}</span>,
  },
  {
    accessorKey: 'fax',
    header: 'Fax',
    cell: ({ getValue }) => <span className="whitespace-normal text-muted-foreground">{getValue<string | null>() || '—'}</span>,
  },
  {
    accessorKey: 'website',
    header: 'Website',
    cell: ({ row }) => {
      const raw = row.original.website?.trim()
      if (!raw) return <span className="text-muted-foreground">—</span>
      const href = websiteHref(row.original.website)
      if (!href) return <span className="text-muted-foreground">—</span>
      const label = raw.replace(/^https?:\/\//i, '')
      return (
        <TextLink href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </TextLink>
      )
    },
  },
  {
    accessorKey: 'practiceAreas',
    header: 'Practice areas',
    cell: ({ getValue }) => <span className="whitespace-normal">{getValue<Array<string>>().join(', ') || '—'}</span>,
  },
]

function globalMemberFilter(row: MemberRow, filter: string) {
  const q = filter.trim().toLowerCase()
  if (!q) return true
  const name = row.displayName.toLowerCase()
  const firm = (row.firm ?? '').toLowerCase()
  const phone = (row.phone ?? '').toLowerCase()
  const fax = (row.fax ?? '').toLowerCase()
  const website = (row.website ?? '').toLowerCase()
  const areas = row.practiceAreas.join(' ').toLowerCase()
  return name.includes(q) || firm.includes(q) || phone.includes(q) || fax.includes(q) || website.includes(q) || areas.includes(q)
}

function practiceAreaFilter(row: MemberRow, filter: string) {
  const v = filter.trim().toLowerCase()
  if (!v) return true
  return row.practiceAreas.some((a) => a.toLowerCase().includes(v))
}

export function MembershipDirectory({ members }: { members: Array<MemberRow> }) {
  const [nameOrFirm, setNameOrFirm] = React.useState('')
  const [practiceArea, setPracticeArea] = React.useState('')

  const data = React.useMemo(() => {
    return members.filter((m) => globalMemberFilter(m, nameOrFirm) && practiceAreaFilter(m, practiceArea))
  }, [members, nameOrFirm, practiceArea])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const emptyMessage =
    members.length === 0
      ? 'No members are listed in the directory yet.'
      : 'No members match your filters. Try adjusting your search or practice area.'

  const EmptyIcon = members.length === 0 ? Users : Search

  return (
    <div className="space-y-6">
      <MembershipDirectoryDisclaimer />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="member-search">Search name, firm, or contact</Label>
          <div className="relative">
            <Search
              className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2"
              strokeWidth={1.65}
              aria-hidden
            />
            <Input
              id="member-search"
              className="pl-9"
              placeholder="Start typing…"
              value={nameOrFirm}
              onChange={(e) => setNameOrFirm(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="practice-search">Filter by practice area</Label>
          <div className="relative">
            <ListFilter
              className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2"
              strokeWidth={1.65}
              aria-hidden
            />
            <Input
              id="practice-search"
              className="pl-9"
              placeholder="e.g. family law, real estate…"
              value={practiceArea}
              onChange={(e) => setPracticeArea(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      {data.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <Alert>
              <EmptyIcon className="text-primary" strokeWidth={1.65} aria-hidden />
              <AlertTitle>No directory results</AlertTitle>
              <AlertDescription>{emptyMessage}</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-normal">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
