import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { smoothScrollTo } from '../hooks/useSmoothScroll'
import logo from '../assets/logos/logo.jpeg'

// Yellow ornament — consistent with Hero + About
const YellowOrnament = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '64px' }}>
    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,224,32,0.4)' }} />
    <div style={{
      width: '4px', height: '4px', backgroundColor: 'rgba(255,224,32,0.5)',
      transform: 'rotate(45deg)', flexShrink: 0, margin: '0 7px',
    }} />
    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,224,32,0.4)' }} />
  </div>
)

export default function Footer() {
  const { t, isRTL } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { label: t.nav.home, id: 'hero' },
    { label: t.nav.about, id: 'about' },
    { label: t.nav.products, id: 'products-cta' },
    { label: t.nav.contact, id: 'contact' },
  ]

  const scrollToSection = (id: string) => {
    const doScroll = () => {
      const el = document.getElementById(id)
      if (!el) return false
      smoothScrollTo(el)
      return true
    }

    if (location.pathname !== '/') {
      navigate('/')
      let attempts = 0
      const tryScroll = () => {
        if (doScroll() || attempts >= 15) return
        attempts++
        setTimeout(tryScroll, 80)
      }
      setTimeout(tryScroll, 100)
    } else {
      doScroll()
    }
  }

  return (
    <footer
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ backgroundColor: '#050505', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle radial glow at top — yellow tint */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '200px',
        background: 'radial-gradient(ellipse at top, rgba(255,224,32,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Grain texture */}
      <div
        className="hero-grain"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          opacity: 0.025, mixBlendMode: 'overlay',
        }}
      />

      <div
        className="ys-footer-wrap"
        style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '80px 64px 48px' }}
      >

        {/* ── Top section — logo, brand, tagline, ornament ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '64px' }}>

          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '20px' }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <img
              src={logo}
              alt="Yellow Sports 23"
              style={{
                width: '64px', height: '64px',
                borderRadius: '10px',
                objectFit: 'cover',
                border: '1px solid rgba(255,224,32,0.15)',
                boxShadow: '0 0 32px rgba(255,224,32,0.08)',
              }}
            />
          </motion.button>

          {/* Brand name */}
          <motion.p
            style={{
              fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-display)',
              fontSize: isRTL ? '16px' : '14px',
              letterSpacing: isRTL ? '0.06em' : '0.35em',
              color: '#FFE020',
              textTransform: isRTL ? 'none' : 'uppercase',
              fontWeight: isRTL ? 700 : 400,
              marginBottom: '16px',
              textShadow: '0 0 18px rgba(255,224,32,0.25)',
            }}
            initial={{ opacity: 0, y: 20, rotateX: -10, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {isRTL ? 'يلو سبورتس ٢٣' : 'Yellow Sports 23'}
          </motion.p>

          {/* Tagline */}
          <motion.p
            style={{
              fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontWeight: 400,
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              color: 'rgba(245,245,240,0.3)',
              marginBottom: '32px',
              lineHeight: isRTL ? 1.7 : 1.4,
              letterSpacing: isRTL ? '0.02em' : '0.06em',
            }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {t.footer.tagline}
          </motion.p>

          {/* Yellow ornament */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <YellowOrnament />
          </motion.div>
        </div>

        {/* ── Nav links ── */}
        <motion.nav
          style={{ marginBottom: '48px' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <ul style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px 32px',
            listStyle: 'none',
            padding: 0, margin: 0,
          }}>
            {navItems.map((item) => (
              <li key={item.id}>
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
                    fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                    fontSize: '11px',
                    letterSpacing: isRTL ? '0.04em' : '0.18em',
                    textTransform: isRTL ? 'none' : 'uppercase',
                    color: 'rgba(245,245,240,0.3)',
                    fontWeight: 500,
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#FFE020' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,245,240,0.3)' }}
                >
                  {item.label}
                </motion.button>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* ── Social icons ── */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '56px' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          {/* Instagram */}
          <motion.a
            href="https://www.instagram.com/yellow_sports_23/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.94 }}
            style={{
              width: '42px', height: '42px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(245,245,240,0.4)',
              transition: 'border-color 0.3s ease, color 0.3s ease, background-color 0.3s ease, background 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF'
              e.currentTarget.style.borderColor = 'rgba(221,42,123,0.5)'
              e.currentTarget.style.background = 'linear-gradient(135deg, #F58529, #DD2A7B, #8134AF)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(245,245,240,0.4)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </motion.a>

          {/* TikTok */}
          <motion.a
            href="https://www.tiktok.com/@yellow_sports_23"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.94 }}
            style={{
              width: '42px', height: '42px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(245,245,240,0.4)',
              transition: 'border-color 0.3s ease, color 0.3s ease, background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgba(255,224,32,0.9)'
              e.currentTarget.style.borderColor = 'rgba(255,224,32,0.3)'
              e.currentTarget.style.backgroundColor = 'rgba(255,224,32,0.06)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(245,245,240,0.4)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.81.07 4.84 4.84 0 01-.38-4.7z" />
            </svg>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/97336692966"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.94 }}
            style={{
              width: '42px', height: '42px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(245,245,240,0.4)',
              transition: 'border-color 0.3s ease, color 0.3s ease, background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgba(255,224,32,0.9)'
              e.currentTarget.style.borderColor = 'rgba(255,224,32,0.3)'
              e.currentTarget.style.backgroundColor = 'rgba(255,224,32,0.06)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(245,245,240,0.4)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </motion.a>
        </motion.div>

        {/* ── Bottom divider + copyright ── */}
        <motion.div
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '28px', textAlign: 'center' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          viewport={{ once: true }}
        >
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            color: 'rgba(245,245,240,0.18)',
            letterSpacing: '0.06em',
          }}>
            &copy; {new Date().getFullYear()} Yellow Sports 23 &nbsp;&middot;&nbsp; {t.footer.rights}
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ys-footer-wrap {
            padding: 64px 24px 40px !important;
          }
        }
      `}</style>
    </footer>
  )
}
