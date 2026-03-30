import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import {
  staggerContainer,
  fadeUpItem,
  springTransition,
} from '../lib/animations'

gsap.registerPlugin(ScrollTrigger)

import jerseysImg from '../assets/images/jerseys.jpeg'
import trophiesImg from '../assets/images/trophies.jpeg'
import pinsImg from '../assets/images/pins.jpeg'
import footballsImg from '../assets/images/footballs.jpeg'
import bagsImg from '../assets/images/bags.jpeg'

// ── Ornament ──────────────────────────────────────
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

// ── Category data ─────────────────────────────────
interface CategoryStrip {
  src: string
  labelKey: 'jerseys' | 'trophies' | 'collectibles' | 'footballs' | 'accessories'
  count: string
}

const categoryStrips: CategoryStrip[] = [
  { src: jerseysImg, labelKey: 'jerseys', count: '50+' },
  { src: trophiesImg, labelKey: 'trophies', count: '30+' },
  { src: pinsImg, labelKey: 'collectibles', count: '40+' },
  { src: footballsImg, labelKey: 'footballs', count: '20+' },
  { src: bagsImg, labelKey: 'accessories', count: '25+' },
]

// ── Expanding Strip (Desktop) ─────────────────────
function ExpandingStrip({
  strip,
  label,
  index,
  isRTL,
  activeIndex,
  onHover,
  onLeave,
}: {
  strip: CategoryStrip
  label: string
  index: number
  isRTL: boolean
  activeIndex: number | null
  onHover: (i: number) => void
  onLeave: () => void
}) {
  const isActive = activeIndex === index
  const isAnyActive = activeIndex !== null
  const isCollapsed = isAnyActive && !isActive

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer"
      style={{
        flex: isActive ? 4 : isCollapsed ? 0.6 : 1,
        transition: 'flex 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        borderRadius: '16px',
        minWidth: 0,
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      {/* Image */}
      <img
        src={strip.src}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: isActive ? 'scale(1.05)' : 'scale(1.02)',
          transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        draggable={false}
      />

      {/* Permanent gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isActive
            ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(255,224,32,0.03) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)',
          transition: 'background 0.5s ease',
        }}
      />

      {/* Yellow top accent */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, #FFE020, rgba(255,224,32,0.3))',
          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: isRTL ? 'right' : 'left',
          transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {/* Side accent line */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none z-10"
        style={{
          width: '2px',
          ...(isRTL ? { right: 0 } : { left: 0 }),
          background: 'linear-gradient(180deg, #FFE020, rgba(255,224,32,0.05))',
          transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          transition: 'transform 0.6s 0.1s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {/* Corner glow */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          top: '-20%',
          ...(isRTL ? { right: '-20%' } : { left: '-20%' }),
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(255,224,32,0.1) 0%, transparent 70%)',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* ── COLLAPSED: Vertical label ── */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        style={{
          opacity: isActive ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        <span
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: isRTL ? 'rotate(180deg)' : 'none',
            fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-display)',
            fontSize: isRTL ? '16px' : '18px',
            fontWeight: isRTL ? 700 : 400,
            letterSpacing: isRTL ? '0.04em' : '0.12em',
            color: '#F5F5F0',
            textShadow: '0 2px 12px rgba(0,0,0,0.8)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      </div>

      {/* ── EXPANDED: Full info ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          padding: '36px 32px',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s 0.15s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Yellow dot + count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            backgroundColor: '#FFE020',
            boxShadow: '0 0 10px rgba(255,224,32,0.6)',
          }} />
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,224,32,0.7)',
            fontFamily: 'var(--font-sans)',
          }}>
            {strip.count} {label}
          </span>
        </div>

        {/* Category name */}
        <h3 style={{
          fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-display)',
          fontSize: isRTL ? '26px' : '36px',
          fontWeight: isRTL ? 700 : 400,
          letterSpacing: isRTL ? '0.02em' : '0.06em',
          color: '#FFFFFF',
          textShadow: '0 2px 16px rgba(0,0,0,0.5)',
          marginBottom: '16px',
          lineHeight: 1.1,
        }}>
          {label}
        </h3>

        {/* Yellow underline */}
        <div style={{
          width: '44px',
          height: '2px',
          backgroundColor: '#FFE020',
          borderRadius: '1px',
          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: isRTL ? 'right' : 'left',
          transition: 'transform 0.5s 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }} />
      </div>

      {/* Index number — top corner */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          top: '20px',
          ...(isRTL ? { left: '20px' } : { right: '20px' }),
          opacity: isActive ? 1 : 0.3,
          transition: 'opacity 0.4s ease',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '14px',
          letterSpacing: '0.1em',
          color: isActive ? '#FFE020' : 'rgba(255,255,255,0.4)',
          transition: 'color 0.3s ease',
        }}>
          0{index + 1}
        </span>
      </div>

      {/* Hover border */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: '16px',
          border: `1px solid ${isActive ? 'rgba(255,224,32,0.2)' : 'rgba(255,255,255,0.05)'}`,
          transition: 'border-color 0.4s ease',
        }}
      />
    </motion.div>
  )
}

// ── Mobile Card ───────────────────────────────────
function MobileCard({
  strip,
  label,
  index,
  isRTL,
  wide,
}: {
  strip: CategoryStrip
  label: string
  index: number
  isRTL: boolean
  wide?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden cursor-pointer ys-mobile-category-card ${wide ? 'col-span-2' : ''}`}
      style={{ borderRadius: '14px', aspectRatio: wide ? '16/9' : '4/5' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={strip.src}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        draggable={false}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 100%)',
        }}
      />
      {/* Yellow top line */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '2px',
          backgroundColor: '#FFE020',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: isRTL ? 'right' : 'left',
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <span style={{
            width: '5px', height: '5px', borderRadius: '50%',
            backgroundColor: '#FFE020',
            boxShadow: '0 0 8px rgba(255,224,32,0.5)',
          }} />
          <span style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'rgba(255,224,32,0.7)',
            fontFamily: 'var(--font-sans)',
          }}>
            {strip.count}
          </span>
        </div>
        <span style={{
          fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-display)',
          fontSize: isRTL ? '18px' : '22px',
          fontWeight: isRTL ? 700 : 400,
          letterSpacing: isRTL ? '0.02em' : '0.06em',
          color: '#FFFFFF',
          textShadow: '0 2px 12px rgba(0,0,0,0.6)',
        }}>
          {label}
        </span>
      </div>
      {/* Hover border */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: '14px',
          border: '1px solid rgba(255,224,32,0.25)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />
    </motion.div>
  )
}

// ── Main Section ──────────────────────────────────
export default function ProductsCTA() {
  const { t, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // GSAP parallax — header moves slightly slower than cards
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Parallax on mobile cards
      const cards = sectionRef.current?.querySelectorAll('.ys-mobile-category-card')
      if (cards?.length) {
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            { yPercent: 8 + (i % 2 === 0 ? 0 : 4) },
            {
              yPercent: -(4 + (i % 2 === 0 ? 0 : 3)),
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const labels: Record<CategoryStrip['labelKey'], string> = {
    jerseys: t.products.jerseys,
    trophies: t.products.trophies,
    collectibles: t.products.collectibles,
    footballs: t.products.footballs,
    accessories: t.products.accessories,
  }

  return (
    <section
      id="products-cta"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        paddingTop: 'clamp(96px, 14vw, 180px)',
        paddingBottom: 'clamp(96px, 14vw, 180px)',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none hero-grain"
        style={{ opacity: 0.02, mixBlendMode: 'overlay' }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(255,224,32,0.025) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '24px',
          paddingRight: '24px',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Section Header ── */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: 'clamp(56px, 8vw, 96px)' }}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span
            variants={fadeUpItem}
            style={{
              display: 'inline-block',
              fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontSize: isRTL ? '14px' : '11px',
              fontWeight: isRTL ? 700 : 600,
              letterSpacing: isRTL ? '0.04em' : '0.35em',
              textTransform: isRTL ? 'none' : 'uppercase',
              color: '#FFE020',
              marginBottom: '20px',
              textShadow: '0 0 18px rgba(255,224,32,0.4)',
            }}
          >
            {t.nav.products}
          </motion.span>

          <motion.div variants={fadeUpItem} style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <YellowStripe />
          </motion.div>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40, rotateX: -8, filter: 'blur(6px)' },
              visible: {
                opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            style={{
              fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-display)',
              fontWeight: isRTL ? 700 : 400,
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              lineHeight: 1.1,
              color: '#F5F5F0',
              letterSpacing: isRTL ? '0.02em' : '0.04em',
              marginBottom: '20px',
              textShadow: '0 2px 12px rgba(0,0,0,0.3)',
              perspective: '800px',
            }}
          >
            {t.productsCta.title}
          </motion.h2>

          <motion.p
            variants={fadeUpItem}
            style={{
              fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
              color: 'rgba(245,245,240,0.45)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.75,
            }}
          >
            {t.productsCta.subtitle}
          </motion.p>
        </motion.div>

        {/* ── Desktop: Expanding Strips ── */}
        <div
          style={{
            display: 'none',
            gap: '20px',
            height: '540px',
            width: '100%',
            maxWidth: '1100px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          className="lg:!flex"
        >
          {categoryStrips.map((strip, index) => (
            <ExpandingStrip
              key={strip.labelKey}
              strip={strip}
              label={labels[strip.labelKey]}
              index={index}
              isRTL={isRTL}
              activeIndex={activeIndex}
              onHover={setActiveIndex}
              onLeave={() => setActiveIndex(null)}
            />
          ))}
        </div>

        {/* ── Mobile / Tablet: Grid ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 lg:!hidden"
          style={{ width: '100%', maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.15 },
            },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {categoryStrips.map((strip, index) => (
            <MobileCard
              key={strip.labelKey}
              strip={strip}
              label={labels[strip.labelKey]}
              index={index}
              isRTL={isRTL}
              wide={index === categoryStrips.length - 1}
            />
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 'clamp(56px, 8vw, 96px)',
            textAlign: 'center',
          }}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUpItem}>
            <YellowStripe />
          </motion.div>

          {/* Muted text above button */}
          <motion.p
            variants={fadeUpItem}
            style={{
              marginTop: '24px',
              marginBottom: '28px',
              fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontSize: '13px',
              color: 'rgba(245,245,240,0.35)',
              letterSpacing: isRTL ? '0.02em' : '0.1em',
              textTransform: isRTL ? 'none' : 'uppercase',
              fontWeight: 500,
            }}
          >
            {t.productsCta.subtitle}
          </motion.p>

          <motion.div variants={fadeUpItem}>
            <motion.div
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 40px rgba(255,224,32,0.3), 0 0 80px rgba(255,224,32,0.12)',
              }}
              whileTap={{ scale: 0.96 }}
              transition={springTransition}
            >
              <Link
                to="/products"
                className="cursor-pointer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: 'clamp(16px, 3vw, 20px) clamp(28px, 8vw, 52px)',
                  backgroundColor: '#FFE020',
                  color: '#0A0A0A',
                  border: 'none',
                  borderRadius: '2px',
                  fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                  fontSize: isRTL ? '15px' : '13px',
                  fontWeight: 800,
                  letterSpacing: isRTL ? '0.06em' : '0.25em',
                  textTransform: isRTL ? 'none' : 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 0 24px rgba(255,224,32,0.2), 0 4px 20px rgba(0,0,0,0.3)',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                {t.productsCta.cta}
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
