import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter_Tight } from 'next/font/google'
import './globals.css'
import { SiteChrome } from '@/components/layout/SiteChrome'
import { sanityFetch } from '../../sanity/lib/client'
import { siteSettingsQuery } from '../../sanity/lib/queries'
import type { SiteSettings } from '@/types'

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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ['siteSettings'],
  })

  const title = settings?.siteTitle ?? 'Vilasa Curators — Global Luxury Sourcing'
  const description = settings?.siteDescription ?? "We source the world's most considered objects for spaces that feel inevitable."
  const ogImageUrl = settings?.ogImage?.asset?.url

  return {
    title,
    description,
    openGraph: {
      title: settings?.siteTitle ?? 'Vilasa Curators',
      description: settings?.tagline ?? 'More than objects. We compose atmospheres.',
      type: 'website',
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory text-espresso">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
