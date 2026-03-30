import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import SEO from '../components/SEO'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { useLocation } from 'react-router-dom'
import {
  fadeUpItem,
  wordRevealContainer,
  wordRevealItem,
  springTransition,
} from '../lib/animations'

import storeWide from '../assets/images/store-wide.jpeg'
import jerseys from '../assets/images/jerseys.jpeg'
import trophies from '../assets/images/trophies.jpeg'
import pins from '../assets/images/pins.jpeg'
import figurines from '../assets/images/figurines.jpeg'
import bags from '../assets/images/bags.jpeg'
import footballs from '../assets/images/footballs.jpeg'
import medals from '../assets/images/medals.jpeg'
import flags from '../assets/images/flags.jpeg'
import football from '../assets/images/football.jpeg'
import counter from '../assets/images/counter.jpeg'
import customTrophy from '../assets/images/custom-trophy.jpeg'
import storeDetail from '../assets/images/store-detail.jpeg'
import storeInterior from '../assets/images/store-interior.jpeg'
import storeHero from '../assets/images/store-hero.jpeg'

gsap.registerPlugin(ScrollTrigger)

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

// ── Data ──────────────────────────────────────────
type Category = 'all' | 'jerseys' | 'trophies' | 'collectibles' | 'footballs' | 'accessories'

interface ProductItem {
  src: string
  alt: string
  category: Category
  span?: 'tall' | 'wide' | 'featured' | 'panoramic'
}

const products: ProductItem[] = [
  // Row 1–2: featured jerseys + regular + tall trophies + regular
  { src: jerseys, alt: 'Football jerseys collection', category: 'jerseys', span: 'featured' },
  { src: storeInterior, alt: 'Store interior with jerseys', category: 'jerseys' },
  { src: trophies, alt: 'Trophy display', category: 'trophies', span: 'tall' },
  { src: medals, alt: 'Medals and trophies', category: 'trophies' },
  // Row 3: wide pins + 2 regulars
  { src: pins, alt: 'Collectible pins', category: 'collectibles', span: 'wide' },
  { src: customTrophy, alt: 'Custom trophy', category: 'trophies' },
  { src: figurines, alt: 'Football figurines', category: 'collectibles' },
  // Row 4–5: tall footballs + regular + featured store + regular
  { src: footballs, alt: 'Footballs collection', category: 'footballs', span: 'tall' },
  { src: storeDetail, alt: 'Store display', category: 'collectibles' },
  { src: storeHero, alt: 'Store overview', category: 'all', span: 'featured' },
  { src: football, alt: 'Football product', category: 'footballs' },
  // Row 6: wide bags + 2 regulars
  { src: bags, alt: 'Sports bags', category: 'accessories', span: 'wide' },
  { src: flags, alt: 'Football flags', category: 'accessories' },
  { src: counter, alt: 'Store counter', category: 'accessories' },
  // Row 7: full-width panoramic
  { src: storeWide, alt: 'Full store view', category: 'all', span: 'panoramic' },
]

// ── Product Card ─────────────────────────────────
function ProductCard({
  item,
  index,
  categoryLabel,
  isRTL,
}: {
  item: ProductItem
  index: number
  categoryLabel: string
  isRTL: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Determine grid span class
  const spanClass =
    item.span === 'featured' ? 'ys-card-featured' :
    item.span === 'tall' ? 'ys-card-tall' :
    item.span === 'wide' ? 'ys-card-wide' :
    item.span === 'panoramic' ? 'ys-card-panoramic' : ''

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`ys-product-card group relative overflow-hidden cursor-pointer ${spanClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image with zoom */}
      <motion.img
        src={item.src}
        alt={item.alt}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.12 : 1.02 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        draggable={false}
      />

      {/* Permanent cinematic gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* Hover overlay — deep cinematic with yellow tint at top */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'linear-gradient(170deg, rgba(255,224,32,0.06) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* Animated yellow border trace — top and left edges on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, #FFE020, rgba(255,224,32,0.3))',
          transformOrigin: isRTL ? 'right' : 'left',
        }}
      />
      <motion.div
        className="absolute top-0 bottom-0 pointer-events-none"
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '2px',
          ...(isRTL ? { right: 0 } : { left: 0 }),
          background: 'linear-gradient(180deg, #FFE020, rgba(255,224,32,0.1))',
          transformOrigin: 'top',
        }}
      />

      {/* Category badge — bottom left, slides in on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{ padding: '16px 18px' }}
        initial={false}
        animate={{
          y: hovered ? 0 : 16,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          {/* Yellow dot indicator */}
          <span style={{
            width: '5px', height: '5px', borderRadius: '50%',
            backgroundColor: '#FFE020',
            boxShadow: '0 0 8px rgba(255,224,32,0.6)',
            flexShrink: 0,
          }} />
          <span style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#F5F5F0',
            fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
          }}>
            {categoryLabel}
          </span>
        </div>
      </motion.div>

      {/* Subtle corner glow on hover */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '-30%', ...(isRTL ? { right: '-30%' } : { left: '-30%' }),
          width: '60%', height: '60%',
          background: 'radial-gradient(circle, rgba(255,224,32,0.08) 0%, transparent 70%)',
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Hover border — subtle yellow outline */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ border: '1px solid rgba(255,224,32,0.2)' }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

// ── Page ──────────────────────────────────────────
const pageTransition = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

export default function ProductsPage() {
  const { t, isRTL } = useLanguage()
  useSmoothScroll()

  // Always start at top when navigating to this page
  useEffect(() => {
    // Immediate native scroll reset
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // Also reset Lenis after it initializes
    const resetLenis = () => {
      const lenis = window.__lenis
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      }
    }
    resetLenis()
    // Retry in case Lenis isn't ready yet
    const t1 = setTimeout(resetLenis, 50)
    const t2 = setTimeout(resetLenis, 150)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [phase, setPhase] = useState(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const gridSectionRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: t.products.all },
    { key: 'jerseys', label: t.products.jerseys },
    { key: 'trophies', label: t.products.trophies },
    { key: 'collectibles', label: t.products.collectibles },
    { key: 'footballs', label: t.products.footballs },
    { key: 'accessories', label: t.products.accessories },
  ]

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  // Orchestrated hero entrance
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setPhase(3); return }
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 400),
      setTimeout(() => setPhase(3), 800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // GSAP scroll effects on hero
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const bgImg = hero.querySelector('.products-hero-bg')
      if (bgImg) {
        gsap.to(bgImg, {
          yPercent: 20,
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.2 },
        })
      }
      gsap.to(hero, {
        scale: 0.97,
        borderRadius: '16px',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
      })
      const content = hero.querySelector('.products-hero-content')
      if (content) {
        gsap.to(content, {
          yPercent: -15,
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
        })
      }
    }, hero)
    return () => ctx.revert()
  }, [])

  // GSAP staggered card reveals on scroll
  useEffect(() => {
    if (!gridSectionRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Staggered entrance
      gsap.fromTo(
        '.ys-product-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridSectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Alternating parallax — even/odd columns scroll at different speeds
      const cards = gridSectionRef.current?.querySelectorAll('.ys-product-card')
      cards?.forEach((card, i) => {
        const speed = i % 2 === 0 ? 3 : -3
        gsap.fromTo(card,
          { yPercent: speed },
          {
            yPercent: -speed,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          }
        )
      })
    }, gridSectionRef)

    return () => ctx.revert()
  }, [activeCategory])

  const titleWords = t.products.title.split(' ')

  return (
    <motion.div
      className="min-h-screen bg-bg"
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <SEO
        title="Football Jerseys, Trophies, Collectibles & More"
        titleAr="قمصان كرة قدم، كؤوس، مقتنيات والمزيد"
        description="Browse our collection of football jerseys, custom trophies, medals, collectible pins, figurines, sports bags & accessories at Yellow Sports 23 in Bahrain. Order via WhatsApp or visit us in Isa Town."
        descriptionAr="تصفح مجموعتنا من قمصان كرة القدم، الكؤوس المخصصة، الميداليات، الدبابيس، المجسمات، حقائب الرياضة والإكسسوارات في يلو سبورتس ٢٣ بالبحرين. اطلب عبر واتساب أو زرنا في مدينة عيسى."
        path="/products"
        keywords="football jerseys Bahrain, buy jerseys online Bahrain, Ronaldo jersey, Messi jersey, custom trophies, medals Bahrain, collectible pins, sports figurines, football bags, sports accessories Isa Town, Yellow Sports 23 products"
        keywordsAr="قمصان كرة قدم البحرين, شراء قمصان أونلاين, قميص رونالدو البحرين, قميص ميسي, كؤوس مخصصة, ميداليات البحرين, دبابيس رياضية, مجسمات كرة قدم, حقائب رياضة, إكسسوارات رياضية مدينة عيسى"
      />
      {/* ═══════ HERO BANNER ═══════ */}
      <div
        ref={heroRef}
        className="relative overflow-hidden will-change-transform"
        style={{ height: 'clamp(400px, 55vh, 600px)', transformOrigin: 'center center' }}
      >
        {/* Parallax bg */}
        <div className="products-hero-bg absolute inset-0" style={{ transform: 'scale(1.15)' }}>
          <img
            src={storeWide}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'blur(2px)' }}
            draggable={false}
          />
        </div>

        {/* Layered overlays — cinematic depth */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'linear-gradient(170deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 45%, rgba(10,8,0,0.92) 100%)',
          }}
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        {/* Film grain */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none hero-grain"
          style={{ opacity: 0.035, mixBlendMode: 'overlay' }}
        />

        {/* Diagonal yellow accent line — top corner decoration */}
        <div
          className="absolute z-[3] pointer-events-none"
          style={{
            top: 0, ...(isRTL ? { left: 0 } : { right: 0 }),
            width: '300px', height: '300px',
            background: `linear-gradient(${isRTL ? '225deg' : '-45deg'}, rgba(255,224,32,0.06) 0%, transparent 60%)`,
          }}
        />

        {/* Hero content — centered */}
        <div
          className="products-hero-content absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
          style={{ padding: '100px 24px 60px' }}
        >
          {/* Phase 1: Label + ornament */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', marginBottom: '28px' }}
              >
                <span style={{
                  fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                  fontSize: isRTL ? '14px' : '11px',
                  letterSpacing: isRTL ? '0.04em' : '0.35em',
                  color: '#FFE020',
                  textTransform: isRTL ? 'none' : 'uppercase',
                  fontWeight: isRTL ? 700 : 600,
                  textShadow: '0 0 18px rgba(255,224,32,0.55), 0 0 36px rgba(255,224,32,0.2)',
                }}>
                  {t.products.collection}
                </span>
                <YellowStripe />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 2: Title — word-by-word reveal */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.h1
                style={{
                  fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-display)',
                  fontWeight: isRTL ? 700 : 400,
                  fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
                  lineHeight: 1.1,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  letterSpacing: isRTL ? '0.02em' : '0.04em',
                  marginBottom: '20px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.5)',
                  perspective: '1000px',
                }}
                variants={wordRevealContainer}
                initial="hidden"
                animate="visible"
              >
                {titleWords.map((word, i) => (
                  <motion.span
                    key={`tw-${i}`}
                    style={{
                      display: 'inline-block',
                      marginLeft: '0.12em',
                      marginRight: '0.12em',
                      transformStyle: 'preserve-3d',
                    }}
                    variants={wordRevealItem}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
            )}
          </AnimatePresence>

          {/* Phase 3: Subtitle */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.p
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                  fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
                  color: 'rgba(245,245,240,0.5)',
                  maxWidth: '520px',
                  lineHeight: 1.7,
                  fontWeight: 400,
                }}
              >
                {t.products.subtitle}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom gradient fade to bg */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          style={{ height: '120px', background: 'linear-gradient(to top, var(--color-bg), transparent)' }}
        />
      </div>

      {/* ═══════ STICKY FILTER BAR ═══════ */}
      <div
        className="sticky top-0 z-30"
        style={{
          backgroundColor: 'rgba(10,10,10,0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,224,32,0.05)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            className="ys-products-filter-bar"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 0',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key

              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className="cursor-pointer"
                  style={{
                    position: 'relative',
                    padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 18px)',
                    fontSize: 'clamp(9px, 2.5vw, 10px)',
                    fontWeight: 700,
                    letterSpacing: isRTL ? '0.04em' : '0.18em',
                    textTransform: isRTL ? 'none' : 'uppercase',
                    fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                    border: 'none',
                    borderRadius: '2px',
                    backgroundColor: isActive ? '#FFE020' : 'transparent',
                    color: isActive ? '#0A0A0A' : 'rgba(245,245,240,0.4)',
                    boxShadow: isActive ? '0 0 20px rgba(255,224,32,0.2), 0 0 40px rgba(255,224,32,0.08)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#FFE020'
                      e.currentTarget.style.backgroundColor = 'rgba(255,224,32,0.06)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'rgba(245,245,240,0.4)'
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ═══════ PRODUCT GRID — EDITORIAL LAYOUT ═══════ */}
      <div
        ref={gridSectionRef}
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 24px 64px',
        }}
      >
        {/* The Grid */}
        <div className="ys-products-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => {
              const label = item.category === 'all'
                ? 'Store'
                : categories.find(c => c.key === item.category)?.label ?? ''
              return (
                <ProductCard
                  key={item.src}
                  item={item}
                  index={index}
                  categoryLabel={label}
                  isRTL={isRTL}
                />
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* ═══════ BOTTOM CTA ═══════ */}
      <div
        ref={ctaRef}
        className="relative overflow-hidden"
        style={{
          padding: '80px 24px 120px',
          background: 'linear-gradient(to bottom, #0A0A0A, #050505)',
        }}
      >
        {/* Radial yellow glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(255,224,32,0.04) 0%, transparent 70%)',
          }}
        />

        {/* Grain */}
        <div
          className="hero-grain absolute inset-0 pointer-events-none"
          style={{ opacity: 0.025, mixBlendMode: 'overlay' }}
        />

        <motion.div
          className="relative z-10 flex flex-col items-center text-center"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
          initial="hidden"
          animate={isCtaInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUpItem}>
            <YellowStripe />
          </motion.div>

          <motion.p
            variants={fadeUpItem}
            style={{
              marginTop: '28px',
              fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              color: 'rgba(245,245,240,0.45)',
              maxWidth: '420px',
              lineHeight: 1.7,
            }}
          >
            {t.products.visitCta}
          </motion.p>

          {/* Two buttons side by side — equal width */}
          <motion.div
            variants={fadeUpItem}
            className="ys-products-cta-buttons"
            style={{
              display: 'flex',
              gap: '12px',
              width: '100%',
              maxWidth: '480px',
              marginTop: '32px',
            }}
          >
            {/* Instagram — transparent with pink tint */}
            <motion.a
              href="https://www.instagram.com/yellow_sports_23/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={springTransition}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '18px 16px',
                backgroundColor: 'rgba(221,42,123,0.08)',
                color: 'rgba(221,120,170,0.75)',
                border: '1px solid rgba(221,42,123,0.15)',
                borderRadius: '2px',
                fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                fontSize: isRTL ? '13px' : '10px',
                fontWeight: 800,
                letterSpacing: isRTL ? '0.04em' : '0.15em',
                textTransform: isRTL ? 'none' : 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(221,42,123,0.4)'
                e.currentTarget.style.backgroundColor = 'rgba(221,42,123,0.14)'
                e.currentTarget.style.color = '#e8a0c0'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(221,42,123,0.15)'
                e.currentTarget.style.backgroundColor = 'rgba(221,42,123,0.08)'
                e.currentTarget.style.color = 'rgba(221,120,170,0.75)'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              {t.products.instaCta}
            </motion.a>

            {/* WhatsApp — transparent with green tint */}
            <motion.a
              href="https://wa.me/97336334237"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={springTransition}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '18px 16px',
                backgroundColor: 'rgba(37,211,102,0.08)',
                color: 'rgba(37,211,102,0.65)',
                border: '1px solid rgba(37,211,102,0.15)',
                borderRadius: '2px',
                fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                fontSize: isRTL ? '13px' : '10px',
                fontWeight: 800,
                letterSpacing: isRTL ? '0.04em' : '0.15em',
                textTransform: isRTL ? 'none' : 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37,211,102,0.4)'
                e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.14)'
                e.currentTarget.style.color = 'rgba(37,211,102,0.9)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37,211,102,0.15)'
                e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.08)'
                e.currentTarget.style.color = 'rgba(37,211,102,0.65)'
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.products.whatsappCta}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══════ GRID STYLES ═══════ */}
      <style>{`
        /* Editorial grid — varied card sizes, dense fill to prevent gaps */
        .ys-products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 280px;
          grid-auto-flow: dense;
          gap: 6px;
        }

        .ys-product-card {
          min-height: 0;
        }

        /* Featured cards span 2 cols + 2 rows */
        .ys-card-featured {
          grid-column: span 2;
          grid-row: span 2;
        }

        /* Tall cards span 2 rows */
        .ys-card-tall {
          grid-row: span 2;
        }

        /* Wide cards span 2 cols */
        .ys-card-wide {
          grid-column: span 2;
        }

        /* Panoramic — full width, shorter height for cinematic closing */
        .ys-card-panoramic {
          grid-column: 1 / -1;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .ys-products-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 240px;
            gap: 5px;
          }

          .ys-card-featured {
            grid-column: span 2;
            grid-row: span 2;
          }

          .ys-card-panoramic {
            grid-column: 1 / -1;
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .ys-products-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 200px;
            gap: 4px;
          }

          .ys-card-featured {
            grid-column: span 2;
            grid-row: span 1;
          }

          .ys-card-wide {
            grid-column: span 2;
          }

          .ys-card-tall {
            grid-row: span 1;
          }

          .ys-card-panoramic {
            grid-column: 1 / -1;
          }
        }

        /* Small mobile */
        @media (max-width: 420px) {
          .ys-products-grid {
            grid-auto-rows: 170px;
            gap: 3px;
          }

          .ys-products-cta-buttons {
            flex-direction: column !important;
          }

          .ys-products-filter-bar {
            gap: 6px !important;
          }
        }
      `}</style>
    </motion.div>
  )
}
