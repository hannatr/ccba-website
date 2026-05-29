import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'

import appCss from '../styles.css?url'
import { AppShell } from '@/components/app-shell'
import { DevtoolsPanel } from '@/components/devtools-panel'
import { site, siteFaviconPath } from '@/content/site'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: site.name,
      },
      {
        name: 'description',
        content:
          'Cayuga County Bar Association — member directory, public legal resources, and membership information for Auburn and Cayuga County, New York.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'icon',
        href: siteFaviconPath,
        type: 'image/png',
        sizes: '192x192',
      },
      {
        rel: 'apple-touch-icon',
        href: siteFaviconPath,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          // Apply stored theme before paint (pairs with ThemeToggle in header).
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ccba-theme');document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
        {import.meta.env.DEV ? <DevtoolsPanel /> : null}
        <Analytics />
        <Scripts />
      </body>
    </html>
  )
}
