import { Link } from '@tanstack/react-router'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/** Shared classes for in-body links (mailto, external, router). */
export const textLinkClass =
  'text-primary font-medium underline-offset-4 hover:underline rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export function TextLink({ className, ...props }: ComponentProps<'a'>) {
  return <a className={cn(textLinkClass, className)} {...props} />
}

export function RouterTextLink({ className, ...props }: ComponentProps<typeof Link>) {
  return <Link className={cn(textLinkClass, className)} {...props} />
}
