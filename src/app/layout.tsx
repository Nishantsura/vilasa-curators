import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter_Tight } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { AudioToggle } from '@/components/layout/AudioToggle'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter-tight',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vilasa Curators — Global Luxury Sourcing',
  description:
    "We source the world's most considered objects for spaces that feel inevitable. Global luxury furniture sourcing from Italy, Vietnam, Bali, China, and Mexico.",
  openGraph: {
    title: 'Vilasa Curators',
    description: 'More than objects. We compose atmospheres.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory text-espresso">
        <SmoothScrollProvider>
          <Navigation />
          <main>{children}</main>
          <AudioToggle />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
