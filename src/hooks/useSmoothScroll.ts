import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis
    window.__lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
      window.__lenis = undefined
    }
  }, [])

  return lenisRef
}

/** Scroll to a DOM element using Lenis if available, native fallback.
 *  Stops any in-progress scroll first to prevent conflicts. */
export function smoothScrollTo(el: HTMLElement) {
  const lenis = window.__lenis
  if (lenis) {
    // Kill any ongoing scroll momentum
    lenis.stop()
    // Resume and scroll to target on next frame
    requestAnimationFrame(() => {
      lenis.start()
      lenis.scrollTo(el, { offset: 0, duration: 1.2 })
    })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
