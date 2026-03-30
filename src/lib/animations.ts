import type { Variants, Transition } from 'framer-motion'

// ─────────────────────────────────────────────
// Easing Presets
// ─────────────────────────────────────────────

export const easings = {
  /** Smooth deceleration — great for entrances */
  smooth: [0.22, 1, 0.36, 1] as const,
  /** Overshoot bounce — playful interactions */
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  /** Sharp snap — instant feel with soft land */
  snap: [0.5, 0, 0, 1] as const,
}

// ─────────────────────────────────────────────
// Spring Physics Transitions
// ─────────────────────────────────────────────

/** Default natural spring — balanced for most entrance animations */
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 24,
  mass: 0.9,
}

/** Snappy spring — buttons, toggles, quick interactions */
export const snappySpring: Transition = {
  type: 'spring',
  stiffness: 350,
  damping: 28,
  mass: 0.6,
}

/** Slow spring — hero entrances, large element reveals */
export const slowSpring: Transition = {
  type: 'spring',
  stiffness: 50,
  damping: 20,
  mass: 1.2,
}

// ─────────────────────────────────────────────
// Stagger Containers
// ─────────────────────────────────────────────

/** Standard stagger — 0.08s between children, 0.15s initial delay */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

/** Slow stagger — 0.15s between children for dramatic reveals */
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

/** Fast stagger — 0.05s for rapid-fire list items / grids */
export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

// ─────────────────────────────────────────────
// Core Animation Variants
// ─────────────────────────────────────────────

/** Simple opacity fade — blur-to-sharp */
export const fadeIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [...easings.smooth] },
  },
}

/** Fade + slide up from below — the workhorse entrance animation */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...springTransition },
  },
}

/** Slide up — shorter travel, good for cards and list items */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...springTransition },
  },
}

/** Slide down — content dropping in from above */
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...springTransition },
  },
}

/** Zoom in — scale + opacity with blur clear */
export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { ...springTransition },
  },
}

/** Scale in — larger scale change for dramatic reveals */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { ...slowSpring },
  },
}

/** Rotate in — slight rotation + scale for playful entrances */
export const rotateIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -6, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { ...springTransition },
  },
}

// ─────────────────────────────────────────────
// Directional Slides
// ─────────────────────────────────────────────

/** Slide from left — with blur */
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -50, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { ...springTransition },
  },
}

/** Slide from right — with blur */
export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 50, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { ...springTransition },
  },
}

// ─────────────────────────────────────────────
// Clip-Path Reveals
// ─────────────────────────────────────────────

/** Reveal from left edge — wipe effect */
export const clipRevealLeft: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 0.8, ease: [...easings.smooth] },
  },
}

/** Reveal from right edge — wipe effect */
export const clipRevealRight: Variants = {
  hidden: { clipPath: 'inset(0 0 0 100%)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0 0 0%)',
    opacity: 1,
    transition: { duration: 0.8, ease: [...easings.smooth] },
  },
}

// ─────────────────────────────────────────────
// Typography Animations
// ─────────────────────────────────────────────

/** Character-by-character reveal container */
export const charRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
}

/** Character reveal item — 3D flip with blur */
export const charRevealItem: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -90, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { ...snappySpring },
  },
}

/** Word-by-word reveal container */
export const wordRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

/** Word reveal item — rise + tilt */
export const wordRevealItem: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -45, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { ...springTransition },
  },
}

// ─────────────────────────────────────────────
// Scroll-Triggered Section Variants
// ─────────────────────────────────────────────

/** Scroll reveal with subtle 3D tilt — for section headings on mobile */
export const scrollReveal3D: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -8, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [...easings.smooth] },
  },
}

/** Scroll reveal from side — for alternating left/right content */
export const scrollRevealLeft: Variants = {
  hidden: { opacity: 0, x: -40, rotateY: 6, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [...easings.smooth] },
  },
}

export const scrollRevealRight: Variants = {
  hidden: { opacity: 0, x: 40, rotateY: -6, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [...easings.smooth] },
  },
}

/** Scale up from distance — dramatic section entrance */
export const scrollScaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [...easings.smooth] },
  },
}

// ─────────────────────────────────────────────
// Hover / Interaction Variants
// ─────────────────────────────────────────────

/** Reusable hover lift — elevate with shadow. Use with whileHover. */
export const hoverLift: Variants = {
  rest: {
    y: 0,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: { ...snappySpring },
  },
  hover: {
    y: -4,
    boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
    transition: { ...snappySpring },
  },
}

/** Pulsing glow — yellow for Yellow Sports brand */
export const pulseGlow: Variants = {
  initial: {
    boxShadow: '0 0 0 0 rgba(255, 224, 32, 0.4)',
  },
  pulse: {
    boxShadow: [
      '0 0 0 0 rgba(255, 224, 32, 0.4)',
      '0 0 20px 10px rgba(255, 224, 32, 0.15)',
      '0 0 0 0 rgba(255, 224, 32, 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/** Magnetic hover — enhanced variant for buttons. Use with whileHover. */
export const magneticHover: Variants = {
  rest: {
    scale: 1,
    transition: { ...snappySpring },
  },
  hover: {
    scale: 1.05,
    transition: { ...snappySpring },
  },
  tap: {
    scale: 0.97,
    transition: { ...snappySpring },
  },
}

// ─────────────────────────────────────────────
// Interaction Helpers
// ─────────────────────────────────────────────

/**
 * Calculate magnetic pull values from cursor position.
 */
export function getMagneticValues(
  e: React.MouseEvent<HTMLElement>,
  strength: number = 0.3,
  deadZone: number = 0,
): { x: number; y: number } {
  const rect = e.currentTarget.getBoundingClientRect()
  const rawX = e.clientX - rect.left - rect.width / 2
  const rawY = e.clientY - rect.top - rect.height / 2
  const distance = Math.sqrt(rawX * rawX + rawY * rawY)

  if (distance < deadZone) {
    return { x: 0, y: 0 }
  }

  const scale = deadZone > 0 ? (distance - deadZone) / distance : 1
  return {
    x: rawX * strength * scale,
    y: rawY * strength * scale,
  }
}

/**
 * Calculate 3D tilt rotation from cursor position.
 */
export function getTiltValues(
  e: React.MouseEvent<HTMLElement>,
  maxTilt: number = 15,
): { rotateX: number; rotateY: number } {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
  const y = -(e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
  return {
    rotateX: x * maxTilt,
    rotateY: y * maxTilt,
  }
}

/** Smooth reset transition config */
export const tiltResetTransition: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 20,
  mass: 0.5,
}

/**
 * Generate inline parallax transform styles from scroll progress.
 */
export function getParallaxStyle(
  scrollProgress: number,
  speed: number = 0.3,
  direction: 'x' | 'y' = 'y',
): React.CSSProperties {
  const offset = (scrollProgress - 0.5) * speed * 100
  const axis = direction === 'y' ? `translate3d(0, ${offset}px, 0)` : `translate3d(${offset}px, 0, 0)`
  return {
    transform: axis,
    willChange: 'transform',
  }
}

// ─────────────────────────────────────────────
// Scroll Helpers
// ─────────────────────────────────────────────

/**
 * Map scroll progress to an opacity value, fading out near the end.
 */
export function getScrollOpacity(progress: number, fadeStart: number = 0.8): number {
  if (progress < fadeStart) return 1
  return 1 - (progress - fadeStart) / (1 - fadeStart)
}
