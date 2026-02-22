import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { SidebarWrapper } from '@/components/sidebar-wrapper'

export const metadata: Metadata = {
  title: 'VC Intelligence Platform',
  description: 'VC discovery and enrichment platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <SidebarWrapper>
          {children}
        </SidebarWrapper>

        <Analytics />
      </body>
    </html>
  )
}