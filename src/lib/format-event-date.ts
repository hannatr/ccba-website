import type { EventRow } from '@/db/schema'

function formatLongDate(eventDate: string): string {
  const [year, month, day] = eventDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatEventDate(row: Pick<EventRow, 'displayDate' | 'eventDate'>): string {
  if (row.displayDate?.trim()) return row.displayDate.trim()
  if (row.eventDate) return formatLongDate(row.eventDate)
  return 'Date to be announced'
}
