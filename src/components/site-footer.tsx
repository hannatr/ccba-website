import { ExternalLink, Mail, MapPin } from 'lucide-react'
import { TextLink } from '@/components/text-link'
import { Separator } from '@/components/ui/separator'
import { site, siteLogoPath } from '@/content/site'

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-2 py-10 text-sm sm:grid-cols-[minmax(0,16rem)_1fr] sm:items-start sm:gap-10 md:grid-cols-[minmax(0,20rem)_1fr]">
        <div className="hidden sm:block">
          <img src={siteLogoPath} alt="" width={320} height={96} className="h-36 w-auto max-w-full object-contain object-left md:h-44" />
        </div>

        <div className="min-w-0 space-y-4">
          <div>
            <p className="font-semibold text-foreground">{site.name}</p>
            <p className="text-muted-foreground mt-1 flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary/70" strokeWidth={1.65} aria-hidden />
              <span>{site.poBoxLine}</span>
            </p>
            <p className="mt-1 flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-primary/70" strokeWidth={1.65} aria-hidden />
              <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
            </p>
          </div>

          <Separator />

          <p className="text-muted-foreground flex flex-wrap items-start gap-2">
            <ExternalLink className="mt-0.5 size-4 shrink-0 text-primary/70" strokeWidth={1.65} aria-hidden />
            <span>
              Attorney referral resource:{' '}
              <TextLink href="https://www.nysba.org/lawyerreferral/" target="_blank" rel="noopener noreferrer">
                New York State Bar Lawyer Referral Service
              </TextLink>
            </span>
          </p>

          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
