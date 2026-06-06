'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ease } from '@/lib/animations'

const CARDS = [
  {
    heading: 'THE SOURCING\nVOYAGE.',
    sub: '',
    rotate: -7,
    x: -36,
    y: 28,
    zIndex: 1,
  },
  {
    heading: 'THE ARTISAN\nALLIANCE.',
    sub: '',
    rotate: 1,
    x: 0,
    y: 0,
    zIndex: 2,
  },
  {
    heading: 'WITHOUT\nREPETITION.',
    sub: 'Access to private reserves and singular creations that no international buying guide has ever documented.',
    rotate: 8,
    x: 36,
    y: -22,
    zIndex: 3,
  },
]

import type { HomePage } from '@/types'

export function PhilosophySection({ homePage }: { homePage?: HomePage | null }) {
  // outerRef = tall wrapper that provides scroll distance; no GSAP pin touches the DOM
  const outerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const isInView = useInView(outerRef, { once: true, margin: '-5%' })

  useEffect(() => {
    let cancelled = false
    let ctx: { revert: () => void } | undefined

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled) return

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      if (!outerRef.current || cards.length === 0) return

      gsap.set(cards, { y: 580, x: 0, rotation: 0, opacity: 0 })

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            // trigger = outer wrapper; scrub without pin — CSS sticky handles the lock
            trigger: outerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.4,
          },
        })

        CARDS.forEach((card, i) => {
          tl.to(
            cards[i],
            {
              y: card.y,
              x: card.x,
              rotation: card.rotate,
              opacity: 1,
              duration: 0.55,
              ease: 'power3.out',
            },
            i * 0.22
          )
        })

        tl.to({}, { duration: 0.25 })
      }, outerRef)
    }

    init()
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    /*
     * Outer wrapper height = 100vh + 1000px
     * Math: sticky holds for exactly (outerHeight - 100vh) = 1000px of scroll,
     * then exits at the same rate Destinations enters — zero gap, no DOM mutation.
     */
    <div
      ref={outerRef}
      style={{ height: 'calc(100vh + 1000px)', backgroundColor: '#e8e2d8' }}
    >
      {/* CSS sticky panel — locks to viewport during the 1000px scroll sequence */}
      <div
        className="overflow-hidden"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          backgroundColor: '#e8e2d8',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-14 grid md:grid-cols-[1fr_1fr] gap-12 md:gap-0 items-center h-full">

          {/* ── LEFT: Text ── */}
          <div className="flex flex-col justify-center">

            <motion.span
              className="section-label block mb-8 text-bronze"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease }}
            >
              Our Philosophy
            </motion.span>

            <motion.h2
              className="font-heading text-espresso leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(44px, 5.5vw, 82px)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease }}
            >
              {homePage?.philosophyHeading || 'SOURCING THE WORLD.'}
              <br />
              <em
                className="font-heading"
                style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(26,23,19,0.65)' }}
              >
                {homePage?.philosophyHeadingItalic || 'IT STARTS HERE.'}
              </em>
            </motion.h2>

            <motion.p
              className="font-body text-espresso/60 font-light leading-relaxed mb-10"
              style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', maxWidth: 420 }}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.22, ease }}
            >
              {homePage?.philosophyBody || 'At Vilasa Curators, every object we source is chosen in person — in the workshops of Umbria, the lacquer ateliers of Hanoi, the stone yards of Bali. We bring back what no catalogue can represent.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35, ease }}
            >
              <Link
                href="/process"
                className="inline-flex items-center gap-3 px-6 py-3.5 font-body font-medium uppercase tracking-[0.18em] text-ivory transition-opacity duration-300 hover:opacity-80"
                style={{ backgroundColor: '#1a1713', fontSize: 11 }}
              >
                HOW WE SOURCE
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT: Cards ── */}
          <div className="relative flex items-center justify-center" style={{ height: '100%' }}>
            <div
              className="relative"
              style={{
                width: 'clamp(280px, 24vw, 360px)',
                height: 'clamp(300px, 26vw, 400px)',
              }}
            >
              {CARDS.map((card, i) => (
                <div
                  key={card.heading}
                  ref={(el) => { cardRefs.current[i] = el }}
                  className="absolute"
                  style={{ zIndex: card.zIndex, transformOrigin: 'center center', willChange: 'transform' }}
                >
                  <div
                    className="flex flex-col justify-between"
                    style={{
                      width: 'clamp(280px, 24vw, 360px)',
                      height: 'clamp(300px, 26vw, 400px)',
                      backgroundColor: '#f5f0eb',
                      border: '1px solid rgba(26,23,19,0.1)',
                      padding: 'clamp(24px, 2.5vw, 36px)',
                      boxShadow: '0 8px 40px rgba(26,23,19,0.12)',
                    }}
                  >
                    <h3
                      className="font-heading text-espresso font-light leading-[1.0] whitespace-pre-line"
                      style={{ fontSize: 'clamp(32px, 3.2vw, 52px)' }}
                    >
                      {card.heading}
                    </h3>
                    <p
                      className="font-heading italic text-espresso/60 font-light leading-snug"
                      style={{ fontSize: 'clamp(13px, 1.1vw, 17px)' }}
                    >
                      {card.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
