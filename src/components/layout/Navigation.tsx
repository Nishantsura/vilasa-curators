'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FullscreenMenu } from './FullscreenMenu'

const NAV_LINKS = [
  { label: 'COLLECTIONS', href: '/#collections' },
  { label: 'DESTINATIONS', href: '/#destinations' },
  { label: 'ABOUT US', href: '/about' },
]

function DotsIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
      {[0, 6, 12].map((x) =>
        [0, 6].map((y) => (
          <circle key={`${x}-${y}`} cx={x + 2} cy={y + 2} r="1.6" />
        ))
      )}
    </svg>
  )
}

function VDivider({ className }: { className?: string }) {
  return <span className={`h-4 w-[1px] bg-ivory/20 flex-shrink-0 ${className ?? ''}`} />
}

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex flex-col overflow-visible"
        style={{ backgroundColor: 'rgba(22, 19, 15, 0.9)', backdropFilter: 'blur(14px)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── ROW 1: Logo + utility + CTA ── */}
        <div
          className="flex items-center justify-between h-[52px] px-4 xs:px-5 sm:px-6 md:px-10 lg:px-12"
          style={{ borderBottom: '1px solid rgba(245,240,235,0.08)' }}
        >
          {/* Left: Logo + menu toggle */}
          <div className="flex items-center gap-0 h-full min-w-0">
            <Link href="/" className="flex items-center pr-3 sm:pr-5">
              <Image
                src="/images/Vilasa png.png"
                alt="Vilasa"
                width={120}
                height={30}
                className="h-[100px] sm:h-[110px] md:h-[120px] w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
                priority
              />
            </Link>

            <VDivider />

            {/* Dots menu — only on mobile/tablet */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden flex items-center justify-center h-full px-3 sm:px-4 text-ivory/65 hover:text-ivory transition-colors duration-300"
            >
              <DotsIcon />
            </button>
          </div>

          {/* Right: CTA */}
          <Link
            href="/about"
            className="btn-primary-dark !py-2 !px-5 !text-[10px] flex-shrink-0"
          >
            BEGIN<span className="hidden sm:inline">&nbsp;SOURCING</span>
            <svg width="13" height="9" viewBox="0 0 14 10" fill="none">
              <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* ── ROW 2: Nav links (desktop only) ── */}
        <div className="hidden lg:flex items-center justify-center h-[38px] gap-9">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ivory/60 hover:text-ivory text-[10px] tracking-[0.22em] uppercase font-body font-medium transition-colors duration-300 whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </motion.header>

      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
