'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ease } from '@/lib/animations'
import { sanityImageUrl } from '../../../sanity/lib/image'
import type { HomePage, PhilosophyCard } from '@/types'

const CARD_LAYOUT = [
  { rotate: -7, x: -36, y: 28, zIndex: 1 },
  { rotate: 1, x: 0, y: 0, zIndex: 2 },
  { rotate: 8, x: 36, y: -22, zIndex: 3 },
]

const DEFAULT_CARDS: PhilosophyCard[] = [
  { heading: 'THE SOURCING\nVOYAGE.', sub: '' },
  { heading: 'THE ARTISAN\nALLIANCE.', sub: '' },
  { heading: 'CRAFTED IN\nSINGULARITY.', sub: 'Access to private reserves and singular creations that no international buying guide has ever documented.' },
]

export function PhilosophySection({ homePage }: { homePage?: HomePage | null }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const isInView = useInView(outerRef, { once: true, margin: '-5%' })

  const cards = homePage?.philosophyCards?.length ? homePage.philosophyCards : DEFAULT_CARDS

  useEffect(() => {
    let cancelled = false
    let ctx: { revert: () => void } | undefined

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled) return

      const cardEls = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      if (!outerRef.current || cardEls.length === 0) return

      gsap.set(cardEls, { y: 580, x: 0, rotation: 0, opacity: 0 })

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.4,
          },
        })

        const offsetScale = window.innerWidth < 768 ? 0.45 : 1

        cardEls.forEach((_, i) => {
          const layout = CARD_LAYOUT[i % CARD_LAYOUT.length]
          tl.to(
            cardEls[i],
            {
              y: layout.y,
              x: layout.x * offsetScale,
              rotation: layout.rotate,
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
  }, [cards.length])

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
              style={{ fontSize: 'clamp(48px, 6vw, 88px)' }}
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
              <Link href="/process" className="btn-dark">
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
                width: 'clamp(230px, 62vw, 360px)',
                height: 'clamp(250px, 66vw, 400px)',
              }}
            >
              {cards.map((card, i) => {
                const layout = CARD_LAYOUT[i % CARD_LAYOUT.length]
                const imgSrc = card.image?.asset ? sanityImageUrl(card.image, 600) : null
                return (
                  <div
                    key={card.heading + i}
                    ref={(el) => { cardRefs.current[i] = el }}
                    className="absolute"
                    style={{ zIndex: layout.zIndex, transformOrigin: 'center center', willChange: 'transform' }}
                  >
                    <div
                      className="relative flex flex-col justify-between overflow-hidden"
                      style={{
                        width: 'clamp(230px, 62vw, 360px)',
                        height: 'clamp(250px, 66vw, 400px)',
                        backgroundColor: '#f5f0eb',
                        border: '1px solid rgba(26,23,19,0.1)',
                        padding: 'clamp(22px, 2.5vw, 36px)',
                        boxShadow: '0 8px 40px rgba(26,23,19,0.12)',
                      }}
                    >
                      {imgSrc && (
                        <>
                          <Image
                            src={imgSrc}
                            alt={card.heading.replace('\n', ' ')}
                            fill
                            className="object-cover"
                            sizes="360px"
                            blurDataURL={card.image?.asset?.metadata?.lqip}
                            placeholder={card.image?.asset?.metadata?.lqip ? 'blur' : undefined}
                          />
                          <div className="absolute inset-0 bg-espresso/50" />
                        </>
                      )}
                      <h3
                        className={`relative z-10 font-heading font-light leading-[1.0] whitespace-pre-line ${imgSrc ? 'text-ivory' : 'text-espresso'}`}
                        style={{ fontSize: 'clamp(26px, 3.2vw, 52px)' }}
                      >
                        {card.heading}
                      </h3>
                      {card.sub && (
                        <p
                          className={`relative z-10 font-heading italic font-light leading-snug ${imgSrc ? 'text-ivory/80' : 'text-espresso/60'}`}
                          style={{ fontSize: 'clamp(13px, 1.1vw, 17px)' }}
                        >
                          {card.sub}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
