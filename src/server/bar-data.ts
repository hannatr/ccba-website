import { createServerFn } from '@tanstack/react-start'
import { asc, desc, gte, isNull, or, sql } from 'drizzle-orm'

import type { CommitteeMemberRow, EventRow, LostWillCustodianRow, MemberRow, OfficerRow } from '@/db/schema'
import { getDb } from '@/db'
import { committeeMembers, events, lostWillCustodians, members, officers } from '@/db/schema'

export const fetchMembers = createServerFn({ method: 'GET' }).handler(async (): Promise<Array<MemberRow>> => {
  const db = getDb()
  if (!db) return []
  return db.select().from(members).orderBy(asc(members.sortKey), asc(members.displayName))
})

export const fetchLostWillCustodians = createServerFn({ method: 'GET' }).handler(async (): Promise<Array<LostWillCustodianRow>> => {
  const db = getDb()
  if (!db) return []
  return db.select().from(lostWillCustodians).orderBy(asc(lostWillCustodians.sortKey), asc(lostWillCustodians.firmName))
})

export const fetchOfficers = createServerFn({ method: 'GET' }).handler(async (): Promise<Array<OfficerRow>> => {
  const db = getDb()
  if (!db) return []
  return db.select().from(officers).orderBy(asc(officers.sortKey), asc(officers.title))
})

export const fetchCommitteeMembers = createServerFn({ method: 'GET' }).handler(async (): Promise<Array<CommitteeMemberRow>> => {
  const db = getDb()
  if (!db) return []
  return db
    .select()
    .from(committeeMembers)
    .orderBy(asc(committeeMembers.committeeName), desc(committeeMembers.isChair), asc(committeeMembers.sortKey), asc(committeeMembers.name))
})

export const fetchUpcomingEvents = createServerFn({ method: 'GET' }).handler(async (): Promise<Array<EventRow>> => {
  const db = getDb()
  if (!db) return []
  return db
    .select()
    .from(events)
    .where(or(isNull(events.eventDate), gte(events.eventDate, sql`CURRENT_DATE`)))
    .orderBy(asc(events.eventDate), asc(events.sortKey), asc(events.name))
})
