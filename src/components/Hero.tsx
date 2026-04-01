import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import { smoothScrollTo } from '../hooks/useSmoothScroll'
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
    const el = document.getElementById('products-cta')
    if (el) smoothScrollTo(el)
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden will-change-transform"
      style={{ transformOrigin: 'center center' }}
    >
      {/* Background image — slight blur to mask JPEG compression artifacts */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={phase >= 1 ? { scale: 1 } : { scale: 1.06 }}
        transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ filter: 'blur(2px)' }}
      >
        <img
          src={storeHero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'scale(1.04)' }}
          draggable={false}
        />
      </motion.div>

      {/* Layered dark overlay — heavy to kill pixelation and add cinematic depth */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(170deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.72) 40%, rgba(10,8,0,0.95) 100%)',
        }}
      />
      {/* Vignette — tighter and darker */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.6) 100%)',
        }}
      />
      {/* Film grain overlay for premium texture */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none hero-grain"
        style={{ opacity: 0.035, mixBlendMode: 'overlay' }}
      />

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center"
        style={{ padding: 'clamp(80px, 14vw, 100px) 20px clamp(90px, 16vw, 120px)' }}
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
                {isRTL ? 'يلو سبورتس ٢٣' : 'Yellow Sports 23'}
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

              {/* CTA Buttons — stacked layout */}
              <div className="ys-hero-ctas" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                maxWidth: '520px',
              }}>
                {/* Explore Products — primary yellow, full width */}
                <motion.button
                  onClick={handleCtaClick}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 0 40px rgba(255,224,32,0.4), 0 0 80px rgba(255,224,32,0.15)',
                  }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: 'clamp(16px, 3vw, 22px) clamp(28px, 8vw, 52px)',
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

                {/* Second row — Instagram + WhatsApp side by side — dark ghost style */}
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  width: '100%',
                }}>
                  {/* Instagram — transparent with pink tint */}
                  <motion.a
                    href="https://www.instagram.com/yellow_sports_23/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '16px 16px',
                      backgroundColor: 'rgba(221,42,123,0.06)',
                      color: 'rgba(221,120,170,0.7)',
                      border: '1px solid rgba(221,42,123,0.12)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                      fontSize: isRTL ? '13px' : '10px',
                      fontWeight: 700,
                      letterSpacing: isRTL ? '0.04em' : '0.15em',
                      textTransform: isRTL ? 'none' : 'uppercase',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(221,42,123,0.35)'
                      e.currentTarget.style.backgroundColor = 'rgba(221,42,123,0.12)'
                      e.currentTarget.style.color = '#e8a0c0'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(221,42,123,0.12)'
                      e.currentTarget.style.backgroundColor = 'rgba(221,42,123,0.06)'
                      e.currentTarget.style.color = 'rgba(221,120,170,0.7)'
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                    {isRTL ? 'المنتجات على إنستا' : 'View on Insta'}
                  </motion.a>

                  {/* WhatsApp — transparent with green tint */}
                  <motion.a
                    href="https://wa.me/97336692966"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '16px 16px',
                      backgroundColor: 'rgba(37,211,102,0.06)',
                      color: 'rgba(37,211,102,0.6)',
                      border: '1px solid rgba(37,211,102,0.12)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                      fontSize: isRTL ? '13px' : '10px',
                      fontWeight: 700,
                      letterSpacing: isRTL ? '0.04em' : '0.15em',
                      textTransform: isRTL ? 'none' : 'uppercase',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(37,211,102,0.35)'
                      e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.12)'
                      e.currentTarget.style.color = 'rgba(37,211,102,0.85)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(37,211,102,0.12)'
                      e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.06)'
                      e.currentTarget.style.color = 'rgba(37,211,102,0.6)'
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {isRTL ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}
                  </motion.a>
                </div>
              </div>
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
          background: 'linear-gradient(to top, #0D0B06, transparent)',
        }}
      />
    </section>
  )
}
