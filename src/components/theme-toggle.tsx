import { Moon, Sun } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'ccba-theme'
const THEME_EVENT = 'ccba-theme'

function subscribe(onStoreChange: () => void) {
  window.addEventListener(THEME_EVENT, onStoreChange)
  return () => window.removeEventListener(THEME_EVENT, onStoreChange)
}

function getSnapshot() {
  return document.documentElement.classList.contains('dark')
}

function getServerSnapshot() {
  return false
}

export function ThemeToggle() {
  const dark = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => {
        const next = !document.documentElement.classList.contains('dark')
        document.documentElement.classList.toggle('dark', next)
        try {
          localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
        } catch {
          /* ignore quota / private mode */
        }
        window.dispatchEvent(new Event(THEME_EVENT))
      }}
    >
      <span className="inline-flex" suppressHydrationWarning>
        {dark ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
      </span>
    </Button>
  )
}
