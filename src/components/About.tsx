import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import storeInterior from '../assets/images/store-interior.jpeg'
import storeDetail from '../assets/images/store-detail.jpeg'

gsap.registerPlugin(ScrollTrigger)

// Animated counter — eased count-up triggered by inView
function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  inView,
}: {
  value: number
  suffix?: string
  prefix?: string
  inView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame: number
    const duration = 2000
    const start = performance.now()
    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  return <>{prefix}{count}{suffix}</>
}

// Yellow stripe ornament — matching hero style
const YellowOrnament = ({ isRTL }: { isRTL: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', width: '56px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
    <div style={{ flex: 1, height: '1px', backgroundColor: '#FFE020' }} />
    <div style={{
      width: '4px', height: '4px',
      backgroundColor: '#FFE020',
      transform: 'rotate(45deg)',
      flexShrink: 0,
      margin: '0 6px',
    }} />
    <div style={{ flex: 1, height: '1px', backgroundColor: '#FFE020' }} />
  </div>
)

// Accent frame styles for the overlapping image
const accentFrameStyle: React.CSSProperties = {
  overflow: 'hidden',
  borderRadius: '2px',
  border: '3px solid #0D0B06',
  boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
  position: 'relative',
}
const accentInnerBorder: React.CSSProperties = {
  position: 'absolute', inset: 0,
  border: '1px solid rgba(255,224,32,0.2)',
  pointerEvents: 'none',
  zIndex: 1,
}

export default function About() {
  const { t, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const mainImageRef = useRef<HTMLImageElement>(null)
  const accentImageRef = useRef<HTMLImageElement>(null)
  const mobileAccentImageRef = useRef<HTMLImageElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const mainImgContainerRef = useRef<HTMLDivElement>(null)
  const mainImgInView = useInView(mainImgContainerRef, { once: true, margin: '0px' })
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  // GSAP scroll-triggered zoom effects on images
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      if (mainImageRef.current) {
        gsap.fromTo(mainImageRef.current,
          { scale: 1.08 },
          {
            scale: 1, ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%', end: 'bottom 15%', scrub: 1.5,
            },
          }
        )
      }
      if (accentImageRef.current) {
        gsap.fromTo(accentImageRef.current,
          { scale: 1.1, yPercent: -4 },
          {
            scale: 1, yPercent: 4, ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%', end: 'bottom 15%', scrub: 2,
            },
          }
        )
      }
      if (mobileAccentImageRef.current) {
        gsap.fromTo(mobileAccentImageRef.current,
          { scale: 1.08 },
          {
            scale: 1, ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%', end: 'bottom 15%', scrub: 2,
            },
          }
        )
      }

      // Subtle parallax on the text column — different speed than images
      const textCol = sectionRef.current?.querySelector('.ys-about-text')
      if (textCol) {
        gsap.fromTo(textCol,
          { yPercent: 4 },
          {
            yPercent: -4, ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%', end: 'bottom 20%', scrub: 1.8,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { value: 2020, prefix: '', suffix: '', label: isRTL ? 'تأسست' : 'Est.' },
    { value: 500, prefix: '', suffix: '+', label: isRTL ? 'منتج' : 'Products' },
    { value: 50, prefix: '', suffix: '+', label: isRTL ? 'قميص نادي' : 'Club Jerseys' },
  ] as const

  const badgeLabel = isRTL ? 'تأسست ٢٠٢٠ · البحرين' : 'Est. 2020 · Bahrain'

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ backgroundColor: '#0D0B06', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle radial glow — yellow tint from top */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '500px',
        background: 'radial-gradient(ellipse at top, rgba(255,224,32,0.03) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Grain overlay */}
      <div
        className="hero-grain"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          opacity: 0.03, mixBlendMode: 'overlay',
        }}
      />

      <div className="ys-about-grid" style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '96px 64px 128px',
        display: 'grid',
        gridTemplateColumns: '45% 1fr',
        gap: '80px',
        alignItems: 'center',
      }}>

        {/* ═══ IMAGE COLUMN ═══ */}
        <div style={{ position: 'relative', order: isRTL ? 2 : 0 }}>

          {/* Main portrait — clip-path reveal */}
          <motion.div
            ref={mainImgContainerRef}
            style={{ overflow: 'hidden', borderRadius: '2px', position: 'relative', zIndex: 2 }}
            animate={{ clipPath: mainImgInView ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              ref={mainImageRef}
              src={storeInterior}
              alt={isRTL ? 'يلو سبورتس ٢٣' : 'Yellow Sports 23'}
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                objectFit: 'cover',
                display: 'block',
                willChange: 'transform',
              }}
            />
            {/* Bottom gradient fade on image */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '40%',
              background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 100%)',
            }} />
          </motion.div>

          {/* Desktop accent image — offset overlapping into the gap */}
          <motion.div
            className="ys-about-accent-desktop"
            style={{
              ...accentFrameStyle,
              position: 'absolute',
              bottom: '-48px',
              ...(isRTL ? { left: '-36px' } : { right: '-36px' }),
              width: '52%',
              zIndex: 3,
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '0px' }}
          >
            <img
              ref={accentImageRef}
              src={storeDetail}
              alt=""
              aria-hidden
              style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block', willChange: 'transform' }}
            />
            <div style={accentInnerBorder} />
          </motion.div>

          {/* Mobile accent image — relative, overlaps from below */}
          <motion.div
            className="ys-about-accent-mobile"
            style={{
              ...accentFrameStyle,
              display: 'none',
              width: '62%',
              marginTop: '-80px',
              marginInlineStart: 'auto',
              position: 'relative',
              zIndex: 3,
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '0px' }}
          >
            <img
              ref={mobileAccentImageRef}
              src={storeDetail}
              alt=""
              aria-hidden
              style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block', willChange: 'transform' }}
            />
            <div style={accentInnerBorder} />
          </motion.div>

          {/* Yellow vertical accent line */}
          <motion.div
            className="ys-about-accent-line"
            style={{
              position: 'absolute',
              top: '15%', bottom: '20%',
              ...(isRTL ? { right: '-24px' } : { left: '-24px' }),
              width: '1px',
              backgroundColor: '#FFE020',
              transformOrigin: 'top',
              opacity: 0.35,
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          />

          {/* Caption badge — floating over the main image */}
          <motion.div
            style={{
              position: 'absolute',
              top: '20px',
              ...(isRTL ? { left: '16px' } : { right: '16px' }),
              zIndex: 4,
              padding: '6px 14px',
              backgroundColor: 'rgba(10,10,10,0.82)',
              border: '1px solid rgba(255,224,32,0.35)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <span style={{
              fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontSize: '9px',
              letterSpacing: isRTL ? '0.04em' : '0.28em',
              color: '#FFE020',
              textTransform: isRTL ? 'none' : 'uppercase',
              fontWeight: 600,
              direction: isRTL ? 'rtl' : 'ltr',
            }}>
              {badgeLabel}
            </span>
          </motion.div>
        </div>

        {/* ═══ TEXT COLUMN ═══ */}
        <div
          className="ys-about-text"
          dir={isRTL ? 'rtl' : 'ltr'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: isRTL ? 'right' : 'left',
            paddingBottom: '48px',
            order: isRTL ? 1 : 0,
          }}
        >

          {/* Label + ornament */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '28px',
              flexDirection: isRTL ? 'row-reverse' : 'row',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '0px' }}
          >
            <YellowOrnament isRTL={isRTL} />
            <span style={{
              fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontSize: '10px',
              letterSpacing: isRTL ? '0.04em' : '0.32em',
              color: '#FFE020',
              textTransform: isRTL ? 'none' : 'uppercase',
              fontWeight: 700,
              textShadow: '0 0 12px rgba(255,224,32,0.3)',
            }}>
              {t.about.subtitle}
            </span>
          </motion.div>

          {/* Title — 3D perspective reveal */}
          <motion.h2
            style={{
              fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-display)',
              fontWeight: isRTL ? 700 : 400,
              fontSize: 'clamp(2.8rem, 5vw, 5.5rem)',
              lineHeight: isRTL ? 1.3 : 1.05,
              color: '#FFFFFF',
              marginBottom: '32px',
              letterSpacing: isRTL ? '0.01em' : '0.03em',
              textShadow: '0 2px 16px rgba(0,0,0,0.4)',
              perspective: '800px',
            }}
            initial={{ opacity: 0, y: 40, rotateX: -8, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-60px' }}
          >
            {t.about.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            style={{
              fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
              lineHeight: isRTL ? 2 : 1.85,
              color: 'rgba(245,245,240,0.6)',
              maxWidth: '480px',
              marginBottom: '32px',
              direction: isRTL ? 'rtl' : 'ltr',
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '0px' }}
          >
            {t.about.description}
          </motion.p>

          {/* Second paragraph */}
          <motion.p
            style={{
              fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
              lineHeight: isRTL ? 2 : 1.85,
              color: 'rgba(245,245,240,0.45)',
              maxWidth: '480px',
              marginBottom: '36px',
              direction: isRTL ? 'rtl' : 'ltr',
              fontStyle: 'italic',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '0px' }}
          >
            {t.about.description2}
          </motion.p>

          {/* Two bullet groups side by side */}
          <div
            className="ys-about-bullets"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '28px',
              maxWidth: '520px',
              width: '100%',
              marginBottom: '40px',
            }}
          >
            {/* Group 1 — What Sets Us Apart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '0px' }}
            >
              <span style={{
                fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: isRTL ? '0.04em' : '0.2em',
                textTransform: isRTL ? 'none' : 'uppercase',
                color: '#FFE020',
                display: 'block',
                marginBottom: '14px',
              }}>
                {t.about.whyUsLabel}
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[t.about.diff1, t.about.diff2, t.about.diff3].map((diff, i) => (
                  <motion.li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      direction: isRTL ? 'rtl' : 'ltr',
                    }}
                    initial={{ opacity: 0, x: isRTL ? 12 : -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    <span style={{
                      width: '4px', height: '4px', borderRadius: '50%',
                      backgroundColor: '#FFE020',
                      boxShadow: '0 0 6px rgba(255,224,32,0.4)',
                      flexShrink: 0,
                      marginTop: isRTL ? '9px' : '7px',
                    }} />
                    <span style={{
                      fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                      fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                      lineHeight: isRTL ? 1.7 : 1.55,
                      color: 'rgba(245,245,240,0.4)',
                      fontWeight: 500,
                    }}>
                      {diff}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Group 2 — Our Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '0px' }}
            >
              <span style={{
                fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: isRTL ? '0.04em' : '0.2em',
                textTransform: isRTL ? 'none' : 'uppercase',
                color: '#FFE020',
                display: 'block',
                marginBottom: '14px',
              }}>
                {t.about.servicesLabel}
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[t.about.diff5, t.about.diff6, t.about.diff7, t.about.diff8].map((diff, i) => (
                  <motion.li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      direction: isRTL ? 'rtl' : 'ltr',
                    }}
                    initial={{ opacity: 0, x: isRTL ? 12 : -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    <span style={{
                      width: '4px', height: '4px', borderRadius: '50%',
                      backgroundColor: '#FFE020',
                      boxShadow: '0 0 6px rgba(255,224,32,0.4)',
                      flexShrink: 0,
                      marginTop: isRTL ? '9px' : '7px',
                    }} />
                    <span style={{
                      fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                      fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                      lineHeight: isRTL ? 1.7 : 1.55,
                      color: 'rgba(245,245,240,0.4)',
                      fontWeight: 500,
                    }}>
                      {diff}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Trusted line — spans full width */}
          <motion.p
            style={{
              fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
              lineHeight: isRTL ? 1.9 : 1.7,
              color: 'rgba(255,224,32,0.45)',
              maxWidth: '520px',
              width: '100%',
              marginBottom: '40px',
              direction: isRTL ? 'rtl' : 'ltr',
              fontWeight: 500,
              borderTop: '1px solid rgba(255,224,32,0.08)',
              paddingTop: '20px',
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {t.about.trustedLine}
          </motion.p>

          {/* Yellow ornament divider */}
          <motion.div
            style={{ marginBottom: '40px' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <YellowOrnament isRTL={isRTL} />
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '0px' }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  paddingInlineStart: i > 0 ? 'clamp(12px, 4vw, 24px)' : '0',
                  paddingInlineEnd: i < stats.length - 1 ? 'clamp(12px, 4vw, 24px)' : '0',
                  borderInlineEnd: i < stats.length - 1 ? '1px solid rgba(255,224,32,0.15)' : 'none',
                }}
              >
                <span style={{
                  fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  fontWeight: isRTL ? 700 : 400,
                  color: '#FFE020',
                  lineHeight: 1,
                  marginBottom: '6px',
                  fontVariantNumeric: 'tabular-nums',
                  textShadow: '0 0 20px rgba(255,224,32,0.2)',
                }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} inView={statsInView} />
                </span>
                <span style={{
                  fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                  fontSize: '10px',
                  letterSpacing: isRTL ? '0.03em' : '0.2em',
                  color: 'rgba(245,245,240,0.35)',
                  textTransform: isRTL ? 'none' : 'uppercase',
                  fontWeight: 500,
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .ys-about-accent-desktop { display: block; }
        .ys-about-accent-mobile  { display: none !important; }

        @media (min-width: 769px) and (max-width: 1024px) {
          .ys-about-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 48px !important;
            padding: 80px 40px 100px !important;
          }
        }

        @media (max-width: 768px) {
          .ys-about-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
            padding: 64px 24px 72px !important;
          }
          .ys-about-accent-desktop { display: none !important; }
          .ys-about-accent-mobile  { display: block !important; }
          .ys-about-accent-line { display: none !important; }
        }

        @media (max-width: 480px) {
          .ys-about-bullets {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
