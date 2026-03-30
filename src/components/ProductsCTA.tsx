import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import trophiesImg from '../assets/images/trophies.jpeg'

gsap.registerPlugin(ScrollTrigger)

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export default function ProductsCTA() {
  const { t, isRTL } = useLanguage()

  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const section = sectionRef.current
    const img = imgRef.current
    if (!section || !img) return

    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=80%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        })

        tl.fromTo(
          img,
          { y: '-5%' },
          { y: '5%', ease: 'none', duration: 1 },
          0
        )
      } else {
        gsap.fromTo(
          img,
          { y: '-5%' },
          {
            y: '5%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="products-cta"
      ref={sectionRef}
      className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden"
    >
      {/* Background image with parallax */}
      <img
        ref={imgRef}
        src={trophiesImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-[120%] object-cover will-change-transform"
        style={{ top: '-10%' }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.75)' }}
      />

      {/* Centered content stack */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh] px-6 text-center">
        {/* Small label */}
        <motion.span
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={0}
          className="text-xs uppercase tracking-[0.25em] text-primary font-sans font-medium mb-4"
        >
          {t.nav.products}
        </motion.span>

        {/* Yellow stripe line */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={1}
          className="w-8 h-[2px] bg-primary mb-6"
          aria-hidden="true"
        />

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={2}
          className={`text-4xl sm:text-5xl md:text-6xl text-white mb-4 ${
            isRTL ? 'font-arabic font-bold' : 'font-display'
          }`}
        >
          {t.productsCta.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={3}
          className="text-base md:text-lg text-white/60 max-w-md mb-10 font-sans"
        >
          {t.productsCta.subtitle}
        </motion.p>

        {/* CTA button — solid yellow */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={4}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/products"
              className="
                inline-flex items-center justify-center
                bg-primary text-bg-dark
                uppercase tracking-[0.2em] text-sm font-bold
                px-10 py-4
                transition-all duration-300
                hover:bg-white hover:text-bg-dark
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary
              "
            >
              {t.productsCta.cta}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
