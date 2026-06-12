import { boolean, date, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const members = pgTable('members', {
  id: uuid('id').defaultRandom().primaryKey(),
  displayName: text('display_name').notNull(),
  firm: text('firm'),
  address: text('address'),
  phone: text('phone'),
  fax: text('fax'),
  email: text('email'),
  website: text('website'),
  practiceAreas: text('practice_areas').array().notNull(),
  sortKey: integer('sort_key').notNull().default(0),
})

export const lostWillCustodians = pgTable('lost_will_custodians', {
  id: uuid('id').defaultRandom().primaryKey(),
  firmName: text('firm_name').notNull(),
  phone: text('phone'),
  holdingFor: text('holding_for').array().notNull(),
  sortKey: integer('sort_key').notNull().default(0),
})

export const officers = pgTable('officers', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  sortKey: integer('sort_key').notNull().default(0),
})

export const committeeMembers = pgTable('committee_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  committeeName: text('committee_name').notNull(),
  isChair: boolean('is_chair').notNull().default(false),
  sortKey: integer('sort_key').notNull().default(0),
})

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  eventDate: date('event_date'),
  displayDate: text('display_date'),
  location: text('location'),
  sortKey: integer('sort_key').notNull().default(0),
})

export type MemberRow = typeof members.$inferSelect
export type LostWillCustodianRow = typeof lostWillCustodians.$inferSelect
export type OfficerRow = typeof officers.$inferSelect
export type CommitteeMemberRow = typeof committeeMembers.$inferSelect
export type EventRow = typeof events.$inferSelect
