import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import { wordRevealContainer, wordRevealItem } from '../lib/animations'
import storeHero from '../assets/images/store-hero.jpeg'

gsap.registerPlugin(ScrollTrigger)

// Yellow stripe ornament
const YellowStripe = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '72px' }}>
    <div style={{ flex: 1, height: '2px', backgroundColor: '#FFE020', borderRadius: '1px' }} />
    <div style={{
      width: '5px', height: '5px', backgroundColor: '#FFE020',
      transform: 'rotate(45deg)', flexShrink: 0, margin: '0 8px',
    }} />
    <div style={{ flex: 1, height: '2px', backgroundColor: '#FFE020', borderRadius: '1px' }} />
  </div>
)

export default function Hero() {
  const { t, isRTL } = useLanguage()
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  // 0: nothing → 1: bg zoom → 2: label+stripe → 3: tagline → 4: stripe+CTA → 5: scroll hint
  const [phase, setPhase] = useState(0)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  // Orchestrated entrance
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setPhase(5); return }
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setPhase(1), 100))
    timers.push(setTimeout(() => setPhase(2), 400))
    timers.push(setTimeout(() => setPhase(3), 750))
    timers.push(setTimeout(() => setPhase(4), 1500))
    timers.push(setTimeout(() => setPhase(5), 2200))
    return () => timers.forEach(clearTimeout)
  }, [])

  // GSAP scroll effects
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const ctx = gsap.context(() => {
      // Card-stack scale-out
      gsap.to(hero, {
        scale: 0.97,
        borderRadius: '16px',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
      })
      // Content parallax
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -12,
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
        })
      }
      // Hide scroll indicator after slight scroll
      if (scrollIndicatorRef.current) {
        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: '10% top',
          onUpdate: (self) => { if (self.progress > 0.1) setShowScrollIndicator(false) },
        })
      }
    }, hero)
    return () => ctx.revert()
  }, [])

  // Split tagline into two lines at comma
  const taglineParts = t.hero.tagline.split(/[,،]\s*/)
  const line1Words = (taglineParts[0] ?? '').trim().split(' ')
  const line2Words = (taglineParts[1] ?? t.hero.tagline).trim().split(' ')
  const hasSecondLine = taglineParts.length > 1

  const handleCtaClick = () => {
    document.getElementById('products-cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden will-change-transform"
      style={{ transformOrigin: 'center center' }}
    >
      {/* Background image — reduced initial scale for less blur */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.04 }}
        animate={phase >= 1 ? { scale: 1 } : { scale: 1.04 }}
        transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <img
          src={storeHero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </motion.div>

      {/* Layered dark overlay — richer depth than a single gradient */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(170deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.5) 45%, rgba(10,8,0,0.85) 100%)',
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center"
        style={{ padding: '100px 24px 120px' }}
      >

        {/* Phase 2 — brand label + top stripe */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '36px',
              }}
            >
              <span style={{
                fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-display)',
                fontSize: isRTL ? '15px' : '14px',
                letterSpacing: isRTL ? '0.04em' : '0.35em',
                color: '#FFE020',
                textTransform: isRTL ? 'none' : 'uppercase',
                fontWeight: isRTL ? 700 : 400,
                textShadow: '0 0 18px rgba(255,224,32,0.55), 0 0 36px rgba(255,224,32,0.25), 0 2px 12px rgba(0,0,0,0.6)',
              }}>
                {isRTL ? '٢٣ يلو سبورتس' : '23 Yellow Sports'}
              </span>
              <YellowStripe />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 3 — two-line tagline */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.h1
              style={{
                fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-display)',
                fontWeight: isRTL ? 700 : 400,
                fontSize: 'clamp(2rem, 5.5vw, 5.5rem)',
                lineHeight: 1.15,
                color: '#FFFFFF',
                textAlign: 'center',
                letterSpacing: isRTL ? '0.02em' : '0.03em',
                maxWidth: '100%',
                marginBottom: '44px',
                textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.6), 0 0 80px rgba(0,0,0,0.4)',
                perspective: '1000px',
              }}
              variants={wordRevealContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Line 1 */}
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>
                {line1Words.map((word, i) => (
                  <motion.span
                    key={`l1-${i}`}
                    style={{ display: 'inline-block', marginLeft: '0.15em', marginRight: '0.15em', transformStyle: 'preserve-3d' }}
                    variants={wordRevealItem}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              {/* Line 2 — slightly dimmed for visual hierarchy */}
              {hasSecondLine && (
                <span style={{ display: 'block', whiteSpace: 'nowrap', marginTop: '0.08em', opacity: 0.85 }}>
                  {line2Words.map((word, i) => (
                    <motion.span
                      key={`l2-${i}`}
                      style={{ display: 'inline-block', marginLeft: '0.15em', marginRight: '0.15em', transformStyle: 'preserve-3d' }}
                      variants={wordRevealItem}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              )}
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Phase 4 — bottom stripe + Liquid Glass CTA */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '36px',
              }}
            >
              <YellowStripe />

              {/* CTA Button — bold solid yellow with glow */}
              <motion.button
                onClick={handleCtaClick}
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 0 40px rgba(255,224,32,0.4), 0 0 80px rgba(255,224,32,0.15)',
                }}
                whileTap={{ scale: 0.96 }}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '20px 52px',
                  backgroundColor: '#FFE020',
                  color: '#0A0A0A',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                  fontSize: isRTL ? '15px' : '13px',
                  fontWeight: 800,
                  letterSpacing: isRTL ? '0.06em' : '0.3em',
                  textTransform: isRTL ? 'none' : 'uppercase',
                  boxShadow: '0 0 24px rgba(255,224,32,0.25), 0 4px 20px rgba(0,0,0,0.3)',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                {t.hero.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {phase >= 5 && showScrollIndicator && (
          <motion.div
            ref={scrollIndicatorRef}
            className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,224,32,0.25)',
              fontWeight: 500,
            }}>
              {t.hero.scroll}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: 'rgba(255,224,32,0.3)' }}>
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom gradient fade to bg */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: '120px',
          background: 'linear-gradient(to top, var(--color-bg), transparent)',
        }}
      />
    </section>
  )
}
