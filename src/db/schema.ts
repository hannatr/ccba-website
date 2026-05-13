import { boolean, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const members = pgTable('members', {
  id: uuid('id').defaultRandom().primaryKey(),
  displayName: text('display_name').notNull(),
  firm: text('firm'),
  phone: text('phone'),
  fax: text('fax'),
  website: text('website'),
  practiceAreas: text('practice_areas').array().notNull(),
  sortKey: integer('sort_key').notNull().default(0),
})

export const lostWillHolders = pgTable('lost_will_holders', {
  id: uuid('id').defaultRandom().primaryKey(),
  attorneyName: text('attorney_name').notNull(),
  notes: text('notes'),
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

export type MemberRow = typeof members.$inferSelect
export type LostWillRow = typeof lostWillHolders.$inferSelect
export type OfficerRow = typeof officers.$inferSelect
export type CommitteeMemberRow = typeof committeeMembers.$inferSelect
