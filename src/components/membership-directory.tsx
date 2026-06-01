import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import * as React from 'react'
import { ListFilter, Search, Users } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'

import type { MemberRow } from '@/db/schema'
import { MemberUpdateRequest } from '@/components/member-update-request'
import { MembershipDirectoryDisclaimer } from '@/components/membership-directory-disclaimer'
import { TextLink } from '@/components/text-link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

function websiteHref(raw: string | null): string | null {
  const u = raw?.trim()
  if (!u) return null
  if (/^https?:\/\//i.test(u)) return u
  return `https://${u}`
}

function emailHref(raw: string | null): string | null {
  const e = raw?.trim()
  if (!e) return null
  return `mailto:${e}`
}

function fieldValue(value: string | null | undefined) {
  const v = value?.trim()
  return v || '—'
}

function formatMemberName(displayName: string) {
  const commaIndex = displayName.indexOf(',')
  if (commaIndex === -1) return displayName.trim()
  const last = displayName.slice(0, commaIndex).trim()
  const first = displayName.slice(commaIndex + 1).trim()
  if (!first || !last) return displayName.trim()
  return `${first} ${last}`
}

function MemberDetailField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-3">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm whitespace-normal">{children}</dd>
    </div>
  )
}

function MemberDetailsDialog({
  member,
  open,
  onOpenChange,
}: {
  member: MemberRow | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!member) return null

  const email = member.email?.trim()
  const emailLink = emailHref(member.email)
  const website = member.website?.trim()
  const websiteLink = websiteHref(member.website)
  const websiteLabel = website?.replace(/^https?:\/\//i, '')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(calc(100vw-2rem),32rem)]">
        <DialogHeader>
          <DialogTitle>{formatMemberName(member.displayName)}</DialogTitle>
          <DialogDescription>Full directory listing for this member.</DialogDescription>
        </DialogHeader>
        <dl className="space-y-4">
          <MemberDetailField label="Firm">{fieldValue(member.firm)}</MemberDetailField>
          <MemberDetailField label="Address">{fieldValue(member.address)}</MemberDetailField>
          <MemberDetailField label="Phone">{fieldValue(member.phone)}</MemberDetailField>
          <MemberDetailField label="Fax">{fieldValue(member.fax)}</MemberDetailField>
          <MemberDetailField label="Email">
            {email && emailLink ? (
              <TextLink href={emailLink} className="whitespace-normal">
                {email}
              </TextLink>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </MemberDetailField>
          <MemberDetailField label="Website">
            {website && websiteLink ? (
              <TextLink href={websiteLink} target="_blank" rel="noopener noreferrer">
                {websiteLabel}
              </TextLink>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </MemberDetailField>
          <MemberDetailField label="Practice areas">
            {member.practiceAreas.length > 0 ? member.practiceAreas.join(', ') : '—'}
          </MemberDetailField>
        </dl>
      </DialogContent>
    </Dialog>
  )
}

function createColumns(onViewDetails: (member: MemberRow) => void): Array<ColumnDef<MemberRow>> {
  return [
    {
      accessorKey: 'displayName',
      header: 'Name',
      cell: ({ getValue }) => <span className="whitespace-normal font-medium">{formatMemberName(getValue<string>())}</span>,
    },
    {
      accessorKey: 'firm',
      header: 'Firm',
      cell: ({ getValue }) => <span className="whitespace-normal text-muted-foreground">{getValue<string | null>() || '—'}</span>,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ getValue }) => <span className="whitespace-nowrap text-muted-foreground">{getValue<string | null>() || '—'}</span>,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => {
        const raw = row.original.email?.trim()
        if (!raw) return <span className="text-muted-foreground">—</span>
        const href = emailHref(row.original.email)
        if (!href) return <span className="text-muted-foreground">—</span>
        return (
          <TextLink href={href} className="whitespace-normal">
            {raw}
          </TextLink>
        )
      },
    },
    {
      accessorKey: 'practiceAreas',
      header: 'Practice areas',
      cell: ({ getValue }) => <span className="whitespace-normal">{getValue<Array<string>>().join(', ') || '—'}</span>,
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Details</span>,
      cell: ({ row }) => (
        <Button type="button" variant="outline" size="sm" onClick={() => onViewDetails(row.original)}>
          Details
        </Button>
      ),
    },
  ]
}

function globalMemberFilter(row: MemberRow, filter: string) {
  const q = filter.trim().toLowerCase()
  if (!q) return true
  const name = formatMemberName(row.displayName).toLowerCase()
  const storedName = row.displayName.toLowerCase()
  const firm = (row.firm ?? '').toLowerCase()
  const address = (row.address ?? '').toLowerCase()
  const phone = (row.phone ?? '').toLowerCase()
  const fax = (row.fax ?? '').toLowerCase()
  const email = (row.email ?? '').toLowerCase()
  const website = (row.website ?? '').toLowerCase()
  const areas = row.practiceAreas.join(' ').toLowerCase()
  return (
    name.includes(q) ||
    storedName.includes(q) ||
    firm.includes(q) ||
    address.includes(q) ||
    phone.includes(q) ||
    fax.includes(q) ||
    email.includes(q) ||
    website.includes(q) ||
    areas.includes(q)
  )
}

function practiceAreaFilter(row: MemberRow, filter: string) {
  const v = filter.trim().toLowerCase()
  if (!v) return true
  return row.practiceAreas.some((a) => a.toLowerCase().includes(v))
}

function columnClassName(columnId: string, part: 'head' | 'cell') {
  switch (columnId) {
    case 'phone':
      return 'w-[1%] min-w-[10.5rem] whitespace-nowrap'
    case 'practiceAreas':
      return 'w-36 max-w-36 whitespace-normal'
    case 'actions':
      return part === 'cell' ? 'w-0 whitespace-nowrap text-right' : 'w-0 text-right'
    default:
      return part === 'cell' ? 'whitespace-normal' : undefined
  }
}

export function MembershipDirectory({ members }: { members: Array<MemberRow> }) {
  const [nameOrFirm, setNameOrFirm] = React.useState('')
  const [practiceArea, setPracticeArea] = React.useState('')
  const [selectedMember, setSelectedMember] = React.useState<MemberRow | null>(null)

  const data = React.useMemo(() => {
    return members.filter((m) => globalMemberFilter(m, nameOrFirm) && practiceAreaFilter(m, practiceArea))
  }, [members, nameOrFirm, practiceArea])

  const columns = React.useMemo(() => createColumns(setSelectedMember), [])

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
      <MemberDetailsDialog
        member={selectedMember}
        open={selectedMember !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedMember(null)
        }}
      />
      <MembershipDirectoryDisclaimer />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">Need to change your directory listing?</p>
        <MemberUpdateRequest members={members} />
      </div>
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
                    <TableHead key={header.id} className={columnClassName(header.column.id, 'head')}>
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
                    <TableCell key={cell.id} className={columnClassName(cell.column.id, 'cell')}>
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
