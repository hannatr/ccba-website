import { Link, useRouterState } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { site, siteLogoPath } from '@/content/site'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/committees', label: 'Committees' },
  { to: '/membership-list', label: 'Members' },
  { to: '/join-renew', label: 'Join' },
  { to: '/public-resources', label: 'Public Resources' },
  { to: '/lost-wills', label: 'Lost Wills' },
] as const

function NavLinks({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  return (
    <nav className={className}>
      <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-1">
        {nav.map(({ to, label }) => {
          const active = pathname === to
          return (
            <li key={to}>
              <Link
                to={to}
                onClick={onNavigate}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors md:inline-block ${
                  active ? 'bg-primary/15 text-primary dark:bg-primary/25 dark:text-white' : 'text-foreground hover:bg-accent'
                }`}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)
  return (
    <header className="border-b bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          to="/"
          className="flex min-w-0 shrink items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <img
            src={siteLogoPath}
            alt=""
            width={160}
            height={48}
            className="h-10 w-auto max-w-[min(11rem,40vw)] object-contain object-left md:h-12"
          />
          <span className="min-w-0">
            <span className="block truncate text-lg font-semibold tracking-tight text-primary md:text-xl dark:text-white">{site.name}</span>
            <span className="text-muted-foreground hidden text-xs sm:block">{site.tagline}</span>
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <NavLinks />
          </div>
          <ThemeToggle />
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(100%,20rem)]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <NavLinks className="mt-6" onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
