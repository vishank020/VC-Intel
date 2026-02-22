import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { Sidebar } from '@/components/sidebar'

const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <main className="ml-64 min-h-screen bg-background">
          {children}
        </main>

        <Analytics />
      </body>
    </html>
  )
}
