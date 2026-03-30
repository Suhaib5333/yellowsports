import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import {
  staggerContainer,
  fadeUpItem,
  slideFromLeft,
  slideFromRight,
  springTransition,
} from '../lib/animations'

function useContactCards() {
  const { t } = useLanguage()
  return [
    {
      key: 'phone',
      label: t.contact.phone,
      value: '+973 66694911',
      href: 'tel:+97366694911',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
    },
    {
      key: 'whatsapp',
      label: t.contact.whatsapp,
      value: '+973 66694911',
      href: 'https://wa.me/97366694911',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      key: 'instagram',
      label: t.contact.instagram,
      value: '@23yellowsports',
      href: 'https://www.instagram.com/23yellowsports/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      key: 'directions',
      label: t.contact.getDirections,
      value: t.contact.findUs,
      href: 'https://www.google.com/maps/search/yellow+sports+bahrain',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
  ]
}

function ContactCard({
  card,
  index,
  isRTL,
}: {
  card: ReturnType<typeof useContactCards>[number]
  index: number
  isRTL: boolean
}) {
  return (
    <motion.a
      href={card.href}
      target={card.key === 'phone' ? undefined : '_blank'}
      rel={card.key !== 'phone' ? 'noopener noreferrer' : undefined}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 120,
            damping: 20,
            delay: index * 0.08,
          },
        },
      }}
      className="group flex items-center gap-4 rounded-lg bg-white/5 backdrop-blur-sm p-4 no-underline border border-primary/10 transition-all duration-300 hover:shadow-md hover:border-primary/25 hover:bg-white/8"
      whileHover={{ y: -2 }}
      transition={springTransition}
    >
      {/* Icon circle */}
      <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
        {card.icon}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-text-muted mb-0.5 font-sans">{card.label}</p>
        <p className="text-sm font-bold text-text truncate font-sans">{card.value}</p>
      </div>

      {/* Arrow */}
      <div className="shrink-0 text-text-muted opacity-30 transition-all duration-200 group-hover:opacity-100 group-hover:text-primary">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-4 h-4 transition-transform duration-200 ${
            isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
          }`}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </motion.a>
  )
}

export default function Contact() {
  const { t, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const cards = useContactCards()

  const mapSlide = isRTL ? slideFromRight : slideFromLeft
  const cardsSlide = isRTL ? slideFromLeft : slideFromRight

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 md:py-40 bg-bg-alt"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Small label */}
          <motion.span
            variants={fadeUpItem}
            className={`inline-block text-xs font-medium uppercase text-primary mb-4 ${
              isRTL ? 'tracking-normal' : 'tracking-[0.2em]'
            }`}
          >
            {t.contact.findUs}
          </motion.span>

          {/* Yellow stripe line */}
          <motion.div
            variants={fadeUpItem}
            className="mx-auto mb-6"
          >
            <div className="w-8 h-[2px] bg-primary mx-auto" />
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={fadeUpItem}
            className={`text-4xl md:text-5xl text-text mb-4 ${
              isRTL ? 'font-arabic font-bold' : 'font-display'
            }`}
          >
            {t.contact.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpItem}
            className="text-base text-text-muted max-w-lg mx-auto font-sans"
          >
            {t.contact.subtitle}
          </motion.p>
        </motion.div>

        {/* Grid: map + cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Google Maps */}
          <motion.div
            variants={mapSlide}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-sm border border-white/5">
              <iframe
                src="https://maps.google.com/maps?q=yellow+sports+bahrain&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="23 Yellow Sports Location"
                className="w-full h-full"
              />
            </div>
          </motion.div>

          {/* Contact cards */}
          <motion.div
            variants={cardsSlide}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.div
              className="flex flex-col gap-3"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.2 },
                },
              }}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {cards.map((card, index) => (
                <ContactCard key={card.key} card={card} index={index} isRTL={isRTL} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
