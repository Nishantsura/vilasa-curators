import type { Variants } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1] as const
export const easeEntrance = [0.0, 0.0, 0.2, 1] as const
export const easeExit = [0.4, 0.0, 1, 1] as const
export const easeEditorial = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease },
  },
}

export const fadeUpSlow: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: easeEditorial },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
}

export const imageReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.4, ease: easeEditorial },
  },
}

export const imageRevealLeft: Variants = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.4, ease: easeEditorial },
  },
}

export const trackingExpand: Variants = {
  hidden: { opacity: 0, letterSpacing: '0em' },
  visible: {
    opacity: 1,
    letterSpacing: '0.3em',
    transition: { duration: 1.2, ease },
  },
}

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease, staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.5, ease: easeExit },
  },
}

export const overlayVariants: Variants = {
  initial: { scaleX: 0, transformOrigin: 'left' },
  animate: {
    scaleX: 1,
    transition: { duration: 0.5, ease: easeEntrance },
  },
  exit: {
    scaleX: 0,
    transformOrigin: 'right',
    transition: { duration: 0.6, ease: easeExit },
  },
}
