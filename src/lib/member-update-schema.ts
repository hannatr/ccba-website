import { z } from 'zod'

const optionalText = z.string()

function isValidOptionalEmail(value: string) {
  if (!value.trim()) return true
  return z.string().email().safeParse(value.trim()).success
}

function isValidOptionalWebsite(value: string) {
  const v = value.trim()
  if (!v) return true
  if (/^https?:\/\//i.test(v)) {
    try {
      new URL(v)
      return true
    } catch {
      return false
    }
  }
  return /^[\w.-]+\.[a-z]{2,}/i.test(v)
}

export const memberUpdateEmailSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
})

export const memberUpdateFormSchema = z.object({
  displayName: z.string().trim().min(1, 'Name is required'),
  firm: optionalText,
  address: optionalText,
  phone: optionalText,
  fax: optionalText,
  email: optionalText.refine(isValidOptionalEmail, { message: 'Enter a valid email address' }),
  website: optionalText.refine(isValidOptionalWebsite, { message: 'Enter a valid website URL' }),
  practiceAreas: optionalText,
})

export type MemberUpdateFormValues = z.infer<typeof memberUpdateFormSchema>

export const submitMemberUpdateRequestSchema = z.object({
  lookupEmail: z.string().trim().email(),
  memberId: z.string().uuid(),
  updates: memberUpdateFormSchema,
})

export type SubmitMemberUpdateRequestInput = z.infer<typeof submitMemberUpdateRequestSchema>

export function parsePracticeAreas(raw: string): Array<string> {
  return raw
    .split(',')
    .map((area) => area.trim())
    .filter(Boolean)
}

export function normalizeOptionalText(value: string): string | null {
  const trimmed = value.trim()
  return trimmed || null
}

export function formValuesToUpdates(values: MemberUpdateFormValues) {
  return {
    displayName: values.displayName.trim(),
    firm: normalizeOptionalText(values.firm),
    address: normalizeOptionalText(values.address),
    phone: normalizeOptionalText(values.phone),
    fax: normalizeOptionalText(values.fax),
    email: normalizeOptionalText(values.email),
    website: normalizeOptionalText(values.website),
    practiceAreas: parsePracticeAreas(values.practiceAreas),
  }
}
