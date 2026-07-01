'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ease } from '@/lib/animations'
import { toSentenceCase } from '@/lib/utils'
import { sanityImageUrl } from '../../../sanity/lib/image'
import type { HomePage, PhilosophyCard } from '@/types'

const CARD_LAYOUT = [
  { rotate: -7, x: -36, y: 28, zIndex: 1 },
  { rotate: 1, x: 0, y: 0, zIndex: 2 },
  { rotate: 8, x: 36, y: -22, zIndex: 3 },
]

const LOCAL_CARD_IMAGES = ['/images/Phil 1.jpeg', '/images/Phil 2.jpeg', '/images/Phil 3.jpeg']

const DEFAULT_CARDS: PhilosophyCard[] = [
  { heading: 'The Sourcing\nVoyage.', sub: '' },
  { heading: 'The Artisan\nAlliance.', sub: '' },
  { heading: 'Crafted in\nSingularity.', sub: 'Access to private reserves and singular creations that no international buying guide has ever documented.' },
]

export function PhilosophySection({ homePage }: { homePage?: HomePage | null }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const isInView = useInView(outerRef, { once: true, margin: '-5%' })
  const [topIndex, setTopIndex] = useState<number | null>(null)

  const cards = homePage?.philosophyCards?.length ? homePage.philosophyCards : DEFAULT_CARDS

  const handleCardNext = useCallback(() => {
    setTopIndex(prev => {
      const current = prev ?? cards.length - 1
      return current <= 0 ? cards.length - 1 : current - 1
    })
  }, [cards.length])

  const handleCardPrev = useCallback(() => {
    setTopIndex(prev => {
      const current = prev ?? cards.length - 1
      return (current + 1) % cards.length
    })
  }, [cards.length])

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 768) return
    const interval = setInterval(handleCardNext, 3000)
    return () => clearInterval(interval)
  }, [handleCardNext])

  useEffect(() => {
    let cancelled = false
    let ctx: { revert: () => void } | undefined

    const init = async () => {
      if (window.innerWidth < 768) return

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

        cardEls.forEach((_, i) => {
          const layout = CARD_LAYOUT[i % CARD_LAYOUT.length]
          tl.to(
            cardEls[i],
            {
              y: layout.y,
              x: layout.x,
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
    <div ref={outerRef} className="philosophy-outer">
      <div className="philosophy-sticky md:overflow-hidden">
        <div className="content-max section-px flex flex-col md:grid md:grid-cols-[1fr_1fr] md:items-center h-full py-20 xs:py-24 md:py-0">

          {/* ── Text ── */}
          <div className="flex flex-col justify-center">
            <motion.span
              className="section-label block mb-6 md:mb-8 text-bronze"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease }}
            >
              Our Philosophy
            </motion.span>

            <motion.h2
              className="font-heading text-espresso leading-[0.95] mb-4 md:mb-6"
              style={{ fontSize: 'clamp(32px, 5.5vw, 78px)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease }}
            >
              {toSentenceCase(homePage?.philosophyHeading || 'Sourcing the world.')}
              <br />
              <em
                className="font-heading"
                style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(26,23,19,0.65)' }}
              >
                {toSentenceCase(homePage?.philosophyHeadingItalic || 'It starts here.')}
              </em>
            </motion.h2>

            <motion.p
              className="font-body text-espresso/60 font-light leading-relaxed mb-8 md:mb-10"
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
              <a
                href="#process"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase font-body font-medium whitespace-nowrap transition-all duration-300 hover:opacity-80"
                style={{ backgroundColor: 'rgba(26,23,19,0.08)', border: '1px solid rgba(26,23,19,0.2)', color: '#1a1713', borderRadius: '9999px', padding: '14px 32px' }}
              >
                How We Source
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* ── Cards ── */}
          <div className="relative flex items-center justify-center mt-10 md:mt-0" style={{ minHeight: 'clamp(240px, 55vw, 420px)' }}>
            <div
              className="relative"
              style={{
                width: 'clamp(180px, 48vw, 360px)',
                height: 'clamp(200px, 52vw, 400px)',
              }}
            >
              {cards.map((card, i) => {
                const layout = CARD_LAYOUT[i % CARD_LAYOUT.length]
                const imgSrc = LOCAL_CARD_IMAGES[i] || (card.image?.asset ? sanityImageUrl(card.image, 600) : null)
                const zOverride = topIndex !== null ? (i === topIndex ? 10 : i) : layout.zIndex
                return (
                  <div
                    key={card.heading + i}
                    ref={(el) => { cardRefs.current[i] = el }}
                    className="absolute cursor-pointer"
                    onClick={handleCardNext}
                    style={{ zIndex: zOverride, transformOrigin: 'center center', willChange: 'transform', transition: 'z-index 0s' }}
                  >
                    <div
                      className="relative flex flex-col justify-between overflow-hidden"
                      style={{
                        width: 'clamp(200px, 55vw, 360px)',
                        height: 'clamp(220px, 58vw, 400px)',
                        backgroundColor: '#f5f0eb',
                        border: '1px solid rgba(26,23,19,0.1)',
                        borderRadius: 12,
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
                            {...(card.image?.asset?.metadata?.lqip ? { blurDataURL: card.image.asset.metadata.lqip, placeholder: 'blur' as const } : {})}
                          />
                          <div className="absolute inset-0 bg-espresso/50" />
                        </>
                      )}
                      <h3
                        className={`relative z-10 font-heading font-light leading-[1.0] whitespace-pre-line ${imgSrc ? 'text-ivory' : 'text-espresso'}`}
                        style={{ fontSize: 'clamp(26px, 3.2vw, 52px)' }}
                      >
                        {toSentenceCase(card.heading)}
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
