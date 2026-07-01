'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ease } from '@/lib/animations'

interface InstagramPost {
  id: string
  caption?: string
  media_type: string
  media_url: string
  permalink: string
  timestamp: string
}

export function InstagramSection() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loaded, setLoaded] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-5%' })

  useEffect(() => {
    fetch('/api/instagram')
      .then(res => res.json())
      .then((data: InstagramPost[]) => {
        setPosts(data)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  if (loaded && posts.length === 0) return null

  return (
    <section className="bg-ivory py-16 xs:py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Header */}
      <div ref={headerRef} className="section-px content-max mb-10 md:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionLabel className="text-bronze block mb-6">Follow the Journey</SectionLabel>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="font-heading text-espresso font-light leading-[0.95]"
              style={{ fontSize: 'clamp(28px, 4.5vw, 64px)' }}
            >
              From our studio.
              <br />
              <em className="text-espresso/60" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                To your feed.
              </em>
            </h2>
            <a
              href="https://www.instagram.com/vilasa.luxuriousliving/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase font-body font-medium whitespace-nowrap transition-all duration-300 hover:opacity-80 self-start sm:self-auto"
              style={{
                backgroundColor: 'rgba(26,23,19,0.08)',
                border: '1px solid rgba(26,23,19,0.2)',
                color: '#1a1713',
                borderRadius: '9999px',
                padding: '12px 28px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              @vilasa.luxuriousliving
            </a>
          </div>
        </motion.div>
      </div>

      {/* Carousel */}
      {posts.length > 0 && (
        <div
          className="instagram-track flex gap-4 md:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory section-px"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollPaddingLeft: '20px',
          }}
        >
          <style>{`.instagram-track::-webkit-scrollbar { display: none; }`}</style>
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 snap-start group block"
              style={{ width: 'clamp(200px, 42vw, 320px)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.7, delay: 0.06 * index, ease }}
            >
              {/* Square image */}
              <div className="relative overflow-hidden aspect-square" style={{ borderRadius: 10 }}>
                <Image
                  src={post.media_url}
                  alt={post.caption?.slice(0, 80) || 'Instagram post'}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 42vw, 320px"
                  priority={index === 0}
                  unoptimized
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/40 transition-colors duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center gap-2">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f5f0eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1" fill="#f5f0eb" stroke="none" />
                    </svg>
                    <span className="text-ivory text-[10px] tracking-[0.2em] uppercase font-body font-medium">
                      View Post
                    </span>
                  </div>
                </div>
              </div>

              {/* Caption */}
              {post.caption && (
                <p
                  className="mt-3 text-charcoal/50 font-light leading-relaxed line-clamp-2"
                  style={{ fontSize: 'clamp(11px, 0.85vw, 13px)' }}
                >
                  {post.caption}
                </p>
              )}
            </motion.a>
          ))}

          {/* Follow CTA card at end */}
          <motion.a
            href="https://www.instagram.com/vilasa.luxuriousliving/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 snap-start flex items-center justify-center"
            style={{ width: 'clamp(160px, 32vw, 240px)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            <div className="flex flex-col items-center gap-4 text-center px-6">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300"
                style={{ backgroundColor: 'rgba(26,23,19,0.06)', border: '1px solid rgba(26,23,19,0.12)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1713" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="#1a1713" stroke="none" style={{ opacity: 0.6 }} />
                </svg>
              </div>
              <span className="text-espresso/50 text-[10px] tracking-[0.2em] uppercase font-body font-medium leading-relaxed">
                See more on
                <br />
                Instagram
              </span>
            </div>
          </motion.a>
        </div>
      )}

      {/* Loading skeleton */}
      {!loaded && (
        <div className="flex gap-4 md:gap-5 section-px overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 aspect-square animate-pulse"
              style={{
                width: 'clamp(200px, 42vw, 320px)',
                borderRadius: 10,
                backgroundColor: 'rgba(26,23,19,0.05)',
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
