import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CTALinkProps {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
}

export function CTALink({ href, children, className, external }: CTALinkProps) {
  const classes = cn(
    'cta-underline section-label text-espresso tracking-[0.2em] uppercase text-[11px] font-medium transition-opacity duration-300 hover:opacity-70',
    className,
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
