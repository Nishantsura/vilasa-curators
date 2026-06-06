// Module-level cache for GSAP instances loaded via dynamic import.
// Storing here gives any component a synchronous reference after first load.
import type { ScrollTrigger as ST } from 'gsap/ScrollTrigger'

let _ScrollTrigger: typeof ST | null = null

export function setScrollTrigger(st: typeof ST) {
  _ScrollTrigger = st
}

export function killAllScrollTriggers() {
  _ScrollTrigger?.killAll()
}
