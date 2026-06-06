'use client'

import { useLayoutEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Navigation } from './Navigation'
import { SmoothScrollProvider } from './SmoothScrollProvider'
import { AudioToggle } from './AudioToggle'
import { killAllScrollTriggers } from '@/lib/gsapStore'

// Fires synchronously (useLayoutEffect) on route change, before React's DOM
// deletion phase, so GSAP-pinned elements are restored to their original
// parents before React calls removeChild on them.
function RouteChangeHandler() {
  const pathname = usePathname()
  const isFirst = useRef(true)

  useLayoutEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    killAllScrollTriggers()
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname.startsWith('/studio')) {
    return <>{children}</>
  }

  return (
    <SmoothScrollProvider>
      <RouteChangeHandler />
      <Navigation />
      <main>{children}</main>
      <AudioToggle />
    </SmoothScrollProvider>
  )
}
