import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { springTransition } from '../lib/animations'

// Yellow ornament — consistent with Hero + About + Footer
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

// Reusable icon components
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.81.07 4.84 4.84 0 01-.38-4.7z" />
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const DIRECTIONS_URL = 'https://www.google.com/maps?gs_lcrp=EgRlZGdlKgYIABBFGDkyBggAEEUYOTIGCAEQRRg9MgYIAhBFGD3SAQgxNjYxajBqMagCALACAA&um=1&ie=UTF-8&fb=1&gl=bh&sa=X&geocode=KSvSmE0Ar0k-MSr57joOxC9g&daddr=%D9%85%D8%A8%D9%86%D9%89+221a%D8%8C+%D8%B7%D8%B1%D9%8A%D9%82+77,+Isa+Town'
const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.5!2d50.5477!3d26.1697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEwJzEwLjkiTiA1MMKwMzInNTEuNyJF!5e0!3m2!1sen!2sbh!4v1'

interface ContactItemData {
  key: string
  label: string
  value: string
  href: string
  icon: React.ReactNode
  accent?: 'whatsapp' | 'insta' | 'tiktok'
}

function ContactCard({
  item,
  index,
  isRTL,
}: {
  item: ContactItemData
  index: number
  isRTL: boolean
}) {
  const hasAccent = !!item.accent

  // Color map per social platform
  const colorMap = {
    whatsapp: { r: 37, g: 211, b: 102, hex: '#25D366', text: 'rgba(37,211,102,0.75)' },
    insta: { r: 221, g: 42, b: 123, hex: '#DD2A7B', text: 'rgba(221,120,170,0.75)' },
    tiktok: { r: 255, g: 255, b: 255, hex: '#F5F5F0', text: 'rgba(245,245,240,0.6)' },
  }

  const c = item.accent ? colorMap[item.accent] : null
  const bgDefault = c ? `rgba(${c.r},${c.g},${c.b},0.04)` : 'rgba(255,255,255,0.02)'
  const borderDefault = c ? `rgba(${c.r},${c.g},${c.b},0.12)` : 'rgba(255,255,255,0.05)'
  const bgHover = c ? `rgba(${c.r},${c.g},${c.b},0.09)` : 'rgba(255,255,255,0.04)'
  const borderHover = c ? `rgba(${c.r},${c.g},${c.b},0.3)` : 'rgba(255,224,32,0.25)'
  const hoverShadow = c
    ? `0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(${c.r},${c.g},${c.b},0.12)`
    : '0 12px 40px rgba(0,0,0,0.3)'

  return (
    <motion.a
      href={item.href}
      target={item.key === 'phone' ? undefined : '_blank'}
      rel={item.key !== 'phone' ? 'noopener noreferrer' : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: 'clamp(14px, 2.5vw, 18px) clamp(14px, 3vw, 20px)',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: bgDefault,
        border: `1px solid ${borderDefault}`,
        borderRadius: '2px',
        transition: 'all 0.35s ease',
        cursor: 'pointer',
      }}
      initial={{ opacity: 0, y: 30, rotateX: -6, filter: 'blur(3px)' }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{
        y: -3,
        boxShadow: hoverShadow,
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = borderHover
        e.currentTarget.style.backgroundColor = bgHover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = borderDefault
        e.currentTarget.style.backgroundColor = bgDefault
      }}
    >
      {/* Left accent bar for highlighted items */}
      {hasAccent && (
        <div style={{
          position: 'absolute',
          top: '20%', bottom: '20%',
          [isRTL ? 'right' : 'left']: 0,
          width: '2px',
          ...(item.accent === 'insta'
            ? { background: 'linear-gradient(180deg, #F58529, #DD2A7B, #8134AF)' }
            : { backgroundColor: c?.hex ?? '#FFE020' }),
          borderRadius: '1px',
          opacity: 0.6,
        }} />
      )}

      {/* Icon */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px', height: '44px',
        flexShrink: 0,
        borderRadius: '50%',
        ...(item.accent === 'insta'
          ? {
              background: 'linear-gradient(135deg, rgba(245,133,41,0.12), rgba(221,42,123,0.12), rgba(129,52,175,0.12))',
              border: '1px solid rgba(221,42,123,0.2)',
              color: '#DD2A7B',
            }
          : c
            ? {
                backgroundColor: `rgba(${c.r},${c.g},${c.b},0.08)`,
                border: `1px solid rgba(${c.r},${c.g},${c.b},0.18)`,
                color: c.hex,
              }
            : {
                backgroundColor: 'rgba(255,255,255,0.04)',
                color: 'rgba(245,245,240,0.5)',
                border: '1px solid rgba(255,255,255,0.06)',
              }),
        transition: 'color 0.3s ease, border-color 0.3s ease',
      }}>
        {item.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
          fontSize: '10px',
          letterSpacing: isRTL ? '0.04em' : '0.18em',
          textTransform: isRTL ? 'none' : 'uppercase',
          color: 'rgba(245,245,240,0.35)',
          fontWeight: 500,
          marginBottom: '4px',
        }}>
          {item.label}
        </p>
        <p style={{
          fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
          fontSize: '14px',
          fontWeight: 600,
          color: c ? c.text : '#F5F5F0',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          direction: 'ltr',
        }}>
          {item.value}
        </p>
      </div>

      {/* Arrow */}
      <div style={{
        flexShrink: 0,
        color: 'rgba(245,245,240,0.15)',
        transition: 'color 0.3s ease, transform 0.3s ease',
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
          style={{
            width: '16px', height: '16px',
            transform: isRTL ? 'scaleX(-1)' : 'none',
          }}
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
  const headerInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const contactItems: ContactItemData[] = [
    {
      key: 'whatsapp',
      label: t.contact.whatsapp,
      value: '+973 3669 2966',
      href: 'https://wa.me/97336692966',
      icon: <WhatsAppIcon />,
      accent: 'whatsapp',
    },
    {
      key: 'phone',
      label: t.contact.phone,
      value: '+973 3669 2966',
      href: 'tel:+97336692966',
      icon: <PhoneIcon />,
    },
    {
      key: 'instagram',
      label: t.contact.instagram,
      value: '@yellow_sports_23',
      href: 'https://www.instagram.com/yellow_sports_23/',
      icon: <InstagramIcon />,
      accent: 'insta',
    },
    {
      key: 'tiktok',
      label: t.contact.tiktok,
      value: '@yellow_sports_23',
      href: 'https://www.tiktok.com/@yellow_sports_23',
      icon: <TikTokIcon />,
      accent: 'tiktok',
    },
    {
      key: 'hours',
      label: t.contact.hours,
      value: t.contact.hoursValue,
      href: DIRECTIONS_URL,
      icon: <ClockIcon />,
    },
    {
      key: 'directions',
      label: t.contact.getDirections,
      value: isRTL ? 'مبنى 221a، طريق 77، مدينة عيسى' : 'Bldg 221a, Road 77, Isa Town',
      href: DIRECTIONS_URL,
      icon: <MapPinIcon />,
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ backgroundColor: '#100F0A', position: 'relative', overflow: 'hidden' }}
    >
      {/* ── Atmosphere layers ── */}
      {/* Radial glow — yellow tint from top */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '450px',
        background: 'radial-gradient(ellipse at top, rgba(255,224,32,0.03) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Secondary glow — warm from bottom-right */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '500px', height: '400px',
        background: 'radial-gradient(ellipse at bottom right, rgba(255,224,32,0.015) 0%, transparent 70%)',
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

      {/* ── Content ── */}
      <div className="ys-contact-content" style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '96px 64px 112px',
      }}>

        {/* ═══ SECTION HEADER ═══ */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '72px',
        }}>
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
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
              {t.contact.reachOut}
            </span>
            <YellowOrnament isRTL={isRTL} />
          </motion.div>

          {/* Title */}
          <motion.h2
            style={{
              fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-display)',
              fontWeight: isRTL ? 700 : 400,
              fontSize: 'clamp(2.8rem, 5vw, 5.5rem)',
              lineHeight: isRTL ? 1.3 : 1.05,
              color: '#FFFFFF',
              marginBottom: '20px',
              letterSpacing: isRTL ? '0.01em' : '0.03em',
              textShadow: '0 2px 16px rgba(0,0,0,0.4)',
              perspective: '800px',
            }}
            initial={{ opacity: 0, y: 40, rotateX: -8, filter: 'blur(6px)' }}
            animate={headerInView ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' } : { opacity: 0, y: 40, rotateX: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.contact.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            style={{
              fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
              lineHeight: isRTL ? 2 : 1.85,
              color: 'rgba(245,245,240,0.45)',
              maxWidth: '480px',
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.contact.subtitle}
          </motion.p>
        </div>

        {/* ═══ MAIN GRID — Map + Contact Info ═══ */}
        <div className="ys-contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
        }}>

          {/* ── MAP COLUMN ── */}
          <div style={{ position: 'relative', order: isRTL ? 2 : 0 }}>
            {/* Map container with accent frame */}
            <motion.div
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '2px',
                border: '3px solid #100F0A',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
              }}
              initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '0px' }}
            >
              <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  display: 'block',
                  aspectRatio: '4 / 3',
                  filter: 'brightness(0.75) contrast(1.1) saturate(0.3)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Yellow Sports 23 Location"
              />

              {/* Inner yellow border overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                border: '1px solid rgba(255,224,32,0.15)',
                pointerEvents: 'none',
                zIndex: 1,
              }} />

              {/* Bottom gradient fade */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '40%',
                background: 'linear-gradient(to top, rgba(16,15,10,0.5) 0%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 1,
              }} />
            </motion.div>

            {/* Address badge — floating over map bottom */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '16px',
                ...(isRTL ? { right: '16px' } : { left: '16px' }),
                zIndex: 4,
                padding: '8px 16px',
                backgroundColor: 'rgba(10,10,10,0.85)',
                border: '1px solid rgba(255,224,32,0.3)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <span style={{
                fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                fontSize: '9px',
                letterSpacing: isRTL ? '0.04em' : '0.24em',
                color: '#FFE020',
                textTransform: isRTL ? 'none' : 'uppercase',
                fontWeight: 600,
                direction: isRTL ? 'rtl' : 'ltr',
              }}>
                {isRTL ? 'مدينة عيسى · البحرين' : 'Isa Town · Bahrain'}
              </span>
            </motion.div>

            {/* Yellow vertical accent line */}
            <motion.div
              className="ys-contact-accent-line"
              style={{
                position: 'absolute',
                top: '10%', bottom: '15%',
                ...(isRTL ? { right: '-24px' } : { left: '-24px' }),
                width: '1px',
                backgroundColor: '#FFE020',
                transformOrigin: 'top',
                opacity: 0.3,
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            />

            {/* Get Directions CTA — below map */}
            <motion.a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '20px',
                padding: 'clamp(14px, 2.5vw, 16px) clamp(20px, 5vw, 32px)',
                backgroundColor: '#FFE020',
                color: '#0A0A0A',
                border: 'none',
                borderRadius: '2px',
                textDecoration: 'none',
                fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                fontSize: isRTL ? '14px' : '11px',
                fontWeight: 800,
                letterSpacing: isRTL ? '0.06em' : '0.25em',
                textTransform: isRTL ? 'none' : 'uppercase',
                boxShadow: '0 0 20px rgba(255,224,32,0.2), 0 4px 16px rgba(0,0,0,0.3)',
                transition: 'box-shadow 0.3s ease',
                cursor: 'pointer',
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 40px rgba(255,224,32,0.35), 0 8px 32px rgba(0,0,0,0.4)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {t.contact.getDirections}
            </motion.a>
          </div>

          {/* ── CONTACT INFO COLUMN ── */}
          <div style={{ order: isRTL ? 1 : 0 }}>
            {/* Column sub-header */}
            <motion.div
              style={{ marginBottom: '28px' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <span style={{
                fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: isRTL ? '0.04em' : '0.28em',
                textTransform: isRTL ? 'none' : 'uppercase',
                color: 'rgba(245,245,240,0.3)',
                fontWeight: 600,
              }}>
                {t.contact.findUs}
              </span>
            </motion.div>

            {/* Contact cards stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {contactItems.map((item, index) => (
                <ContactCard key={item.key} item={item} index={index} isRTL={isRTL} />
              ))}
            </div>

            {/* Bottom ornament */}
            <motion.div
              style={{ display: 'flex', justifyContent: isRTL ? 'flex-end' : 'flex-start', marginTop: '32px' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <YellowOrnament isRTL={isRTL} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 1024px) {
          .ys-contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .ys-contact-accent-line {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .ys-contact-content {
            padding: 64px 24px 80px !important;
          }
          .ys-contact-grid {
            gap: 36px !important;
          }
        }
        @media (max-width: 480px) {
          .ys-contact-content {
            padding: 48px 16px 64px !important;
          }
        }
      `}</style>
    </section>
  )
}
