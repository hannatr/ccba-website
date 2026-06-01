import { useForm } from '@tanstack/react-form'
import { useServerFn } from '@tanstack/react-start'
import * as React from 'react'
import { PencilLine } from 'lucide-react'

import type { MemberRow } from '@/db/schema'
import type { MemberUpdateFormValues } from '@/lib/member-update-schema'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { memberUpdateEmailSchema, memberUpdateFormSchema } from '@/lib/member-update-schema'
import { submitMemberUpdateRequest } from '@/server/member-update-request'

function memberToFormValues(member: MemberRow): MemberUpdateFormValues {
  return {
    displayName: member.displayName,
    firm: member.firm ?? '',
    address: member.address ?? '',
    phone: member.phone ?? '',
    fax: member.fax ?? '',
    email: member.email ?? '',
    website: member.website ?? '',
    practiceAreas: member.practiceAreas.join(', '),
  }
}

function findMemberByEmail(members: Array<MemberRow>, email: string) {
  const normalized = email.trim().toLowerCase()
  return members.find((member) => (member.email?.trim().toLowerCase() ?? '') === normalized) ?? null
}

function formatFieldError(error: unknown): string | undefined {
  if (!error) return undefined
  if (typeof error === 'string') return error
  if (typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message
  }
  return undefined
}

function FieldError({ errors }: { errors: Array<unknown> }) {
  const message = errors.map(formatFieldError).find(Boolean)
  if (!message) return null
  return <p className="text-sm text-destructive">{message}</p>
}

function MemberUpdateForm({
  member,
  lookupEmail,
  onSuccess,
  onCancel,
}: {
  member: MemberRow
  lookupEmail: string
  onSuccess: () => void
  onCancel: () => void
}) {
  const submitUpdate = useServerFn(submitMemberUpdateRequest)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const form = useForm({
    defaultValues: memberToFormValues(member),
    validators: {
      onChange: memberUpdateFormSchema,
      onSubmit: memberUpdateFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      try {
        await submitUpdate({
          data: {
            lookupEmail,
            memberId: member.id,
            updates: value,
          },
        })
        onSuccess()
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'Unable to submit your update request.')
      }
    },
  })

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <form.Field
        name="displayName"
        children={(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name}>Name</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              aria-invalid={field.state.meta.errors.length > 0}
              autoComplete="name"
            />
            <p className="text-xs text-muted-foreground">Use the format Last, First as shown in the directory.</p>
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      />
      <form.Field
        name="firm"
        children={(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name}>Firm</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              aria-invalid={field.state.meta.errors.length > 0}
            />
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      />
      <form.Field
        name="address"
        children={(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name}>Address</Label>
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              aria-invalid={field.state.meta.errors.length > 0}
              rows={3}
            />
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field
          name="phone"
          children={(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>Phone</Label>
              <Input
                id={field.name}
                name={field.name}
                type="tel"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                aria-invalid={field.state.meta.errors.length > 0}
                autoComplete="tel"
              />
              <FieldError errors={field.state.meta.errors} />
            </div>
          )}
        />
        <form.Field
          name="fax"
          children={(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>Fax</Label>
              <Input
                id={field.name}
                name={field.name}
                type="tel"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                aria-invalid={field.state.meta.errors.length > 0}
              />
              <FieldError errors={field.state.meta.errors} />
            </div>
          )}
        />
      </div>
      <form.Field
        name="email"
        children={(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name}>Email</Label>
            <Input
              id={field.name}
              name={field.name}
              type="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              aria-invalid={field.state.meta.errors.length > 0}
              autoComplete="email"
            />
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      />
      <form.Field
        name="website"
        children={(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name}>Website</Label>
            <Input
              id={field.name}
              name={field.name}
              type="url"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              aria-invalid={field.state.meta.errors.length > 0}
              placeholder="https://example.com"
            />
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      />
      <form.Field
        name="practiceAreas"
        children={(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name}>Practice areas</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              aria-invalid={field.state.meta.errors.length > 0}
            />
            <p className="text-xs text-muted-foreground">Separate multiple practice areas with commas.</p>
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      />
      {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? 'Submitting…' : 'Submit update request'}
            </Button>
          )}
        </form.Subscribe>
      </DialogFooter>
    </form>
  )
}

export function MemberUpdateRequest({ members }: { members: Array<MemberRow> }) {
  const [open, setOpen] = React.useState(false)
  const [step, setStep] = React.useState<'verify-email' | 'edit' | 'success'>('verify-email')
  const [lookupEmail, setLookupEmail] = React.useState('')
  const [lookupError, setLookupError] = React.useState<string | null>(null)
  const [matchedMember, setMatchedMember] = React.useState<MemberRow | null>(null)

  function resetFlow() {
    setStep('verify-email')
    setLookupEmail('')
    setLookupError(null)
    setMatchedMember(null)
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) resetFlow()
  }

  function handleVerifyEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLookupError(null)

    const parsed = memberUpdateEmailSchema.safeParse({ email: lookupEmail })
    if (!parsed.success) {
      setLookupError(parsed.error.issues[0]?.message ?? 'Enter a valid email address.')
      return
    }

    const member = findMemberByEmail(members, parsed.data.email)
    if (!member) {
      setLookupError('No member was found with that email address.')
      return
    }

    setMatchedMember(member)
    setLookupEmail(parsed.data.email)
    setStep('edit')
  }

  return (
    <>
      <Button type="button" variant="outline" onClick={() => setOpen(true)}>
        <PencilLine aria-hidden />
        Request update to my listing
      </Button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="w-[min(calc(100vw-2rem),36rem)]">
          {step === 'verify-email' ? (
            <>
              <DialogHeader>
                <DialogTitle>Verify your listing</DialogTitle>
                <DialogDescription>
                  Enter the email address on file for your membership directory listing. If it matches, you can review and submit changes.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleVerifyEmail}>
                <div className="space-y-1.5">
                  <Label htmlFor="member-update-email">Email on file</Label>
                  <Input
                    id="member-update-email"
                    type="email"
                    value={lookupEmail}
                    onChange={(event) => setLookupEmail(event.target.value)}
                    autoComplete="email"
                    aria-invalid={lookupError ? true : undefined}
                  />
                  {lookupError ? <p className="text-sm text-destructive">{lookupError}</p> : null}
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Continue</Button>
                </DialogFooter>
              </form>
            </>
          ) : null}
          {step === 'edit' && matchedMember ? (
            <>
              <DialogHeader>
                <DialogTitle>Update your listing</DialogTitle>
                <DialogDescription>
                  Edit your directory information below. Your request will be reviewed before any changes are published.
                </DialogDescription>
              </DialogHeader>
              <MemberUpdateForm
                key={matchedMember.id}
                member={matchedMember}
                lookupEmail={lookupEmail}
                onSuccess={() => setStep('success')}
                onCancel={() => handleOpenChange(false)}
              />
            </>
          ) : null}
          {step === 'success' ? (
            <>
              <DialogHeader>
                <DialogTitle>Update request submitted</DialogTitle>
                <DialogDescription>
                  Thank you. Your requested changes have been sent for review. The directory will be updated after they are approved.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="button" onClick={() => handleOpenChange(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
