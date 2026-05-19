'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function getLenis(): Lenis | null {
  return lenisInstance
}

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenisInstance = lenis

    // Integrate Lenis with GSAP ScrollTrigger so scroll-driven animations work
    let gsapTicker: ((time: number) => void) | undefined

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        // Keep ScrollTrigger in sync with every Lenis scroll event
        lenis.on('scroll', ScrollTrigger.update)

        // Drive Lenis via GSAP ticker (replaces manual RAF loop)
        gsapTicker = (time: number) => lenis.raf(time * 1000)
        gsap.ticker.add(gsapTicker)
        gsap.ticker.lagSmoothing(0)
      }
    )

    return () => {
      if (gsapTicker) {
        // Dynamic import already resolved — clean up ticker
        import('gsap').then(({ gsap }) => gsap.ticker.remove(gsapTicker!))
      }
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
