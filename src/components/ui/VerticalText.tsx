import { cn } from '@/lib/utils'

interface VerticalTextProps {
  children: React.ReactNode
  className?: string
}

export function VerticalText({ children, className }: VerticalTextProps) {
  return (
    <span className={cn('vertical-text', className)}>
      {children}
    </span>
  )
}
