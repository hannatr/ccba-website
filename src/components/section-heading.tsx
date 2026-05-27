import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

const levelClass: Record<2 | 3, string> = {
  2: 'text-2xl font-semibold tracking-tight text-primary',
  3: 'text-xl font-semibold text-foreground',
}

type SectionHeadingProps = {
  level?: 2 | 3
  className?: string
  id?: string
  children: ReactNode
}

export function SectionHeading({ level = 2, className, id, children }: SectionHeadingProps) {
  const Tag = level === 2 ? 'h2' : 'h3'
  return (
    <Tag id={id} className={cn(levelClass[level], className)}>
      {children}
    </Tag>
  )
}
