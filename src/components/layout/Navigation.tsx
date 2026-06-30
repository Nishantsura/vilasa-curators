'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FullscreenMenu } from './FullscreenMenu'

const NAV_LINKS = [
  { label: 'HOW WE SOURCE', href: '/process' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'DESTINATIONS', href: '/destinations' },
  { label: 'COLLECTIONS', href: '/collections' },
  { label: 'CONTACT', href: '/contact' },
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

function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
        className="fixed top-0 left-0 right-0 z-50 flex flex-col"
        style={{ backgroundColor: 'rgba(22, 19, 15, 0.9)', backdropFilter: 'blur(14px)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── ROW 1: Logo + utility + CTA ── */}
        <div
          className="flex items-center justify-between h-[52px] px-4 sm:px-6 md:px-10"
          style={{ borderBottom: '1px solid rgba(245,240,235,0.08)' }}
        >
          {/* Left: Logo + icons */}
          <div className="flex items-center gap-0 h-full min-w-0">
            <Link
              href="/"
              className="font-heading text-ivory text-[11px] sm:text-[13px] tracking-[0.12em] sm:tracking-[0.2em] uppercase whitespace-nowrap hover:text-taupe transition-colors duration-300 pr-3 sm:pr-5"
            >
              Vilasa Curators
              <sup className="text-[8px] ml-0.5 font-body tracking-normal">®</sup>
            </Link>

            <VDivider />

            {/* Dots — only on mobile/tablet (when nav row 2 is hidden) */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden flex items-center justify-center h-full px-3 sm:px-4 text-ivory/65 hover:text-ivory transition-colors duration-300"
            >
              <DotsIcon />
            </button>

            {/* Divider only on mobile */}
            <VDivider className="lg:hidden" />

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center justify-center h-full px-3 sm:px-4 text-ivory/65 hover:text-ivory transition-colors duration-300"
            >
              <WhatsAppIcon />
            </a>
          </div>

          {/* Right: CTA */}
          <Link
            href="/contact"
            className="flex items-center gap-2.5 px-5 py-2 text-[10px] tracking-[0.22em] uppercase font-body font-medium whitespace-nowrap transition-all duration-300 hover:opacity-90 flex-shrink-0"
            style={{
              backgroundColor: '#4a5240',
              border: '1px solid rgba(245,240,235,0.18)',
              color: '#f5f0eb',
              borderRadius: '2px',
            }}
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
