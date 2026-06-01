import { createServerFn } from '@tanstack/react-start'
import { getRequestIP, setResponseHeader, setResponseStatus } from '@tanstack/react-start/server'
import { eq } from 'drizzle-orm'

import type { MemberRow } from '@/db/schema'
import type { MemberUpdateFormValues } from '@/lib/member-update-schema'
import { getDb } from '@/db'
import { members } from '@/db/schema'
import { formValuesToUpdates, submitMemberUpdateRequestSchema } from '@/lib/member-update-schema'
import { checkRateLimitByIp } from '@/lib/rate-limit-by-ip'

type MemberUpdates = ReturnType<typeof formValuesToUpdates>

const MEMBER_FIELD_LABELS: Record<keyof MemberUpdates, string> = {
  displayName: 'Name',
  firm: 'Firm',
  address: 'Address',
  phone: 'Phone',
  fax: 'Fax',
  email: 'Email',
  website: 'Website',
  practiceAreas: 'Practice areas',
}

function formatMemberValue(value: string | null | undefined | Array<string>) {
  if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : '—'
  const trimmed = value?.trim()
  return trimmed || '—'
}

function emailsMatch(stored: string | null | undefined, lookup: string) {
  return (stored?.trim().toLowerCase() ?? '') === lookup.trim().toLowerCase()
}

async function postMemberUpdateToDiscord(webhookUrl: string, member: MemberRow, lookupEmail: string, updates: MemberUpdates) {
  const current = formValuesToUpdates({
    displayName: member.displayName,
    firm: member.firm ?? '',
    address: member.address ?? '',
    phone: member.phone ?? '',
    fax: member.fax ?? '',
    email: member.email ?? '',
    website: member.website ?? '',
    practiceAreas: member.practiceAreas.join(', '),
  } satisfies MemberUpdateFormValues)

  const changedFields = (Object.keys(MEMBER_FIELD_LABELS) as Array<keyof MemberUpdates>)
    .map((key) => {
      const before = formatMemberValue(current[key])
      const after = formatMemberValue(updates[key])
      if (before === after) return null
      return {
        name: MEMBER_FIELD_LABELS[key],
        value: `**Before:** ${before}\n**After:** ${after}`.slice(0, 1024),
      }
    })
    .filter((field): field is { name: string; value: string } => field !== null)

  const embed = {
    title: 'Member directory update request',
    description: `Update request for **${member.displayName}** (${lookupEmail}).`,
    color: 0x2563eb,
    fields: changedFields.length > 0 ? changedFields : [{ name: 'Changes', value: 'No field changes were submitted.' }],
    timestamp: new Date().toISOString(),
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] }),
  })

  if (!response.ok) {
    throw new Error('Unable to send update request. Please try again later.')
  }
}

export const submitMemberUpdateRequest = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => submitMemberUpdateRequestSchema.parse(data))
  .handler(async ({ data }) => {
    const ip = getRequestIP({ xForwardedFor: true }) ?? 'unknown'
    const rateLimit = checkRateLimitByIp(ip)
    if (!rateLimit.allowed) {
      setResponseStatus(429)
      setResponseHeader('Retry-After', String(rateLimit.retryAfterSeconds))
      throw new Error('Too many update requests. Please wait a few minutes and try again.')
    }

    const webhookUrl = process.env.MEMBER_UPDATE_DISCORD_WEBHOOK_URL?.trim()
    if (!webhookUrl) {
      throw new Error('Update requests are not configured yet. Please contact the bar association directly.')
    }

    const db = getDb()
    if (!db) {
      throw new Error('Update requests are unavailable right now. Please try again later.')
    }

    const memberRows = await db.select().from(members).where(eq(members.id, data.memberId)).limit(1)
    const member = memberRows.at(0)
    if (member === undefined) {
      throw new Error('No member was found for that email address.')
    }
    if (!emailsMatch(member.email, data.lookupEmail)) {
      throw new Error('No member was found for that email address.')
    }

    const updates = formValuesToUpdates(data.updates)
    await postMemberUpdateToDiscord(webhookUrl, member, data.lookupEmail, updates)

    return { ok: true as const }
  })
