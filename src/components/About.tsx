import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import {
  staggerContainerSlow,
  fadeUpItem,
  slowSpring,
} from '../lib/animations'
import storeInterior from '../assets/images/store-interior.jpeg'

gsap.registerPlugin(ScrollTrigger)

// Animated counter component
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
      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

export default function About() {
  const { t, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const textInView = useInView(textRef, { once: true, margin: '-100px' })
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' })

  // GSAP ScrollTrigger — image zoom on scroll
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const image = imageRef.current
      const container = imageContainerRef.current
      if (!image || !container) return

      gsap.fromTo(
        image,
        { scale: 1 },
        {
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1.5,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isRTL])

  // Image slide-in variant (direction-aware)
  const imageSlideVariant = {
    hidden: { opacity: 0, x: isRTL ? 60 : -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  // Accent line variant
  const accentLineVariant = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        ...slowSpring,
        delay: 0.75,
      },
    },
  }

  // Stats data — sports store
  const stats = [
    {
      value: 2020,
      prefix: '',
      suffix: '',
      label: isRTL ? 'تأسست' : 'Est.',
    },
    {
      value: 500,
      prefix: '',
      suffix: '+',
      label: isRTL ? 'منتج' : 'Products',
    },
    {
      value: 50,
      prefix: '',
      suffix: '+',
      label: isRTL ? 'قميص نادي' : 'Club Jerseys',
    },
  ] as const

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-40 bg-bg"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start ${
            isRTL ? 'direction-rtl' : ''
          }`}
        >
          {/* === IMAGE COLUMN === */}
          <motion.div
            className={`lg:col-span-5 ${isRTL ? 'lg:order-2' : ''}`}
            variants={imageSlideVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <div
              ref={imageContainerRef}
              className="overflow-hidden rounded-lg"
            >
              <img
                ref={imageRef}
                src={storeInterior}
                alt={isRTL ? '٢٣ يلو سبورتس' : '23 Yellow Sports'}
                className="w-full aspect-[3/4] object-cover will-change-transform"
              />
            </div>
            {/* Caption */}
            <p
              className={`mt-4 text-sm text-text-muted ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              Est. 2020 — Bahrain
            </p>
          </motion.div>

          {/* === TEXT COLUMN === */}
          <div
            className={`lg:col-span-6 ${
              isRTL ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'
            }`}
            ref={textRef}
          >
            <motion.div
              variants={staggerContainerSlow}
              initial="hidden"
              animate={textInView ? 'visible' : 'hidden'}
              className={`flex flex-col ${
                isRTL ? 'items-end text-right' : 'items-start text-left'
              }`}
            >
              {/* Subtitle label with yellow accent line */}
              <motion.div
                variants={fadeUpItem}
                className={`flex items-center gap-3 mb-6 ${
                  isRTL ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <motion.span
                  variants={accentLineVariant}
                  className="inline-block w-6 h-px bg-primary"
                  style={{
                    transformOrigin: isRTL ? 'right' : 'left',
                  }}
                />
                <span
                  className={`text-xs font-sans font-medium uppercase text-primary ${
                    isRTL ? 'tracking-normal font-arabic' : 'tracking-[0.2em]'
                  }`}
                >
                  {t.about.subtitle}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                variants={fadeUpItem}
                className={`text-4xl md:text-5xl lg:text-6xl text-text leading-[1.1] mb-8 ${
                  isRTL ? 'font-arabic font-bold' : 'font-display'
                }`}
              >
                {t.about.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={fadeUpItem}
                className="text-base md:text-lg text-text-muted leading-relaxed max-w-lg mb-12"
              >
                {t.about.description}
              </motion.p>

              {/* Stats row */}
              <motion.div
                ref={statsRef}
                variants={fadeUpItem}
                className={`flex ${
                  isRTL ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className={`flex flex-col px-6 first:ps-0 last:pe-0 ${
                      isRTL ? 'items-end' : 'items-start'
                    } ${
                      i < stats.length - 1
                        ? isRTL
                          ? 'border-l border-text-muted/20'
                          : 'border-r border-text-muted/20'
                        : ''
                    }`}
                  >
                    <span className={`text-3xl tabular-nums text-primary ${
                      isRTL ? 'font-arabic' : 'font-display'
                    }`}>
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                        inView={statsInView}
                      />
                    </span>
                    <span className="text-xs text-text-muted uppercase mt-1 font-medium tracking-wide">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
