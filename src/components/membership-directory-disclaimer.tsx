import { Info, Phone } from 'lucide-react'

import { TextLink } from '@/components/text-link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function MembershipDirectoryDisclaimer() {
  return (
    <div className="space-y-4">
      <Alert>
        <Info className="text-primary" strokeWidth={1.65} aria-hidden />
        <AlertTitle>Membership directory</AlertTitle>
        <AlertDescription>
          <p>
            <strong>The Cayuga County Bar Association does not provide lawyer referrals.</strong> We publish a membership directory with
            practice areas as a public service. Not all members are attorneys; the roster may include affiliate members. Information is
            supplied by members and may change without notice.
          </p>
        </AlertDescription>
      </Alert>
      <Alert>
        <Phone className="text-primary" strokeWidth={1.65} aria-hidden />
        <AlertTitle>Lawyer referrals</AlertTitle>
        <AlertDescription>
          <p>
            <strong>Please do not contact the bar association requesting a lawyer referral.</strong> For referrals, use the{' '}
            <TextLink href="https://nysba.intouchondemand.com/findlawyer/search" target="_blank" rel="noopener noreferrer">
              New York State Bar Association Lawyer Referral Service
            </TextLink>{' '}
            or call <span className="whitespace-nowrap">(800) 342-3661</span>.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  )
}
