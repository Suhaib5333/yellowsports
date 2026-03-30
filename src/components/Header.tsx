import { useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useMotionValueEvent, useSpring, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { smoothScrollTo } from '../hooks/useSmoothScroll'
import LanguageToggle from './LanguageToggle'
import logo from '../assets/logos/logo.jpeg'

const NAV_SECTION_IDS = ['hero', 'about', 'products-cta', 'contact'] as const

export default function Header() {
  const { t, isRTL } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('hero')
  const { scrollY, scrollYProgress } = useScroll()

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const isHome = location.pathname === '/'

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80)
  })

  // Observe sections on home page
  useEffect(() => {
    if (!isHome) return
    const observers: IntersectionObserver[] = []
    NAV_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [isHome])

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => setMenuOpen(false)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close menu on Escape key
  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const scrollToSection = useCallback(
    (id: string) => {
      setMenuOpen(false)
      setActiveSection(id)

      const doScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          smoothScrollTo(el)
          return true
        }
        return false
      }

      if (!isHome) {
        navigate('/')
        // Retry until section mounts
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
    },
    [isHome, navigate]
  )

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setActiveSection('hero')
    if (isHome) {
      const lenis = window.__lenis
      if (lenis) {
        lenis.stop()
        requestAnimationFrame(() => {
          lenis.start()
          lenis.scrollTo(0, { duration: 1.2 })
        })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      navigate('/')
    }
  }, [isHome, navigate])

  const navItems = [
    { label: t.nav.home, id: 'hero' },
    { label: t.nav.about, id: 'about' },
    { label: t.nav.products, id: 'products-cta' },
    { label: t.nav.contact, id: 'contact' },
  ] as const

  // Determine active nav item
  const getIsActive = (id: string) => {
    // If user just clicked a nav item, activeSection is already set
    if (activeSection === id) return true
    // Fallback: highlight "Products" when on /products page and nothing was clicked
    if (!isHome && id === 'products-cta' && activeSection === 'hero') return true
    return false
  }

  const mobileBg = menuOpen
    ? 'rgba(10, 10, 10, 0.98)'
    : scrolled
    ? 'rgba(10, 10, 10, 0.95)'
    : 'rgba(0, 0, 0, 0.35)'
  const mobileBlur = scrolled || menuOpen ? 'blur(12px)' : 'none'
  const mobileBorder = scrolled || menuOpen ? '1px solid rgba(255,224,32,0.08)' : '1px solid transparent'

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
        }}
      >
        {/* ====== MOBILE NAVBAR (below lg) ====== */}
        <div
          className="nav-mobile"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            boxSizing: 'border-box',
            height: scrolled ? '60px' : '68px',
            paddingLeft: '20px',
            paddingRight: '20px',
            backgroundColor: mobileBg,
            backdropFilter: mobileBlur,
            WebkitBackdropFilter: mobileBlur,
            borderBottom: mobileBorder,
            transition: 'background-color 0.4s ease-out, height 0.4s ease-out, border-color 0.4s ease-out',
          }}
        >
          {/* Logo */}
          <a
            href="/"
            onClick={handleLogoClick}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flex: '1', minWidth: 0, overflow: 'hidden' }}
          >
            <img
              src={logo}
              alt="Yellow Sports 23"
              style={{ width: '38px', height: '38px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                letterSpacing: '0.08em',
                color: scrolled ? '#FFE020' : '#FFFFFF',
                transition: 'color 0.4s ease-out',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              YELLOW SPORTS 23
            </span>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <span style={{
              display: 'block', width: '22px', height: '2px',
              backgroundColor: menuOpen ? '#FFE020' : '#FFFFFF',
              borderRadius: '1px', transition: 'all 0.3s ease-out',
              transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px',
              backgroundColor: menuOpen ? '#FFE020' : '#FFFFFF',
              borderRadius: '1px', transition: 'all 0.3s ease-out',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px',
              backgroundColor: menuOpen ? '#FFE020' : '#FFFFFF',
              borderRadius: '1px', transition: 'all 0.3s ease-out',
              transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>

        {/* ====== DESKTOP NAVBAR (lg and above) ====== */}
        <div
          className="nav-desktop"
          style={{
            display: 'none',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            height: scrolled ? '72px' : '96px',
            paddingLeft: '7rem',
            paddingRight: '7rem',
            backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.92)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,224,32,0.06)' : '1px solid transparent',
            transition: 'height 0.5s ease-out, background-color 0.5s ease-out, border-color 0.5s ease-out',
          }}
        >
          {/* LEFT — Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a
              href="/"
              onClick={handleLogoClick}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}
            >
              <img
                src={logo}
                alt="Yellow Sports 23"
                style={{
                  width: '48px', height: '48px',
                  borderRadius: '8px', objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    letterSpacing: '0.06em',
                    lineHeight: 1,
                    color: scrolled ? '#FFE020' : '#FFFFFF',
                    transition: 'color 0.5s ease-out',
                  }}
                >
                  YELLOW SPORTS 23
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: scrolled ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.6)',
                    transition: 'color 0.5s ease-out',
                  }}
                >
                  {isRTL ? 'البحرين' : 'Bahrain'}
                </span>
              </div>
            </a>
          </div>

          {/* CENTER — Nav Links */}
          <nav>
            <ul style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', listStyle: 'none', margin: 0, padding: 0 }}>
              {navItems.map((item) => {
                const isActive = getIsActive(item.id)
                const inactiveColor = scrolled ? 'rgba(245,245,240,0.45)' : 'rgba(255,255,255,0.5)'
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      style={{
                        position: 'relative',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                        fontWeight: 600,
                        textTransform: isRTL ? 'none' : 'uppercase',
                        fontSize: '14px',
                        letterSpacing: isRTL ? '0' : '0.14em',
                        padding: '10px 22px',
                        color: isActive ? '#FFE020' : inactiveColor,
                        transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.color = '#FFFFFF'
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.color = inactiveColor
                      }}
                    >
                      {item.label}
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '4px',
                          left: '22px',
                          right: '22px',
                          height: '2px',
                          backgroundColor: '#FFE020',
                          borderRadius: '1px',
                          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: 'center',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* RIGHT — Language Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <LanguageToggle variant={scrolled ? 'dark' : 'light'} />
          </div>
        </div>

        {/* ====== SCROLL PROGRESS BAR ====== */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: '#FFE020',
            transformOrigin: isRTL ? 'right' : 'left',
            scaleX: smoothProgress,
            opacity: scrolled ? 1 : 0,
            zIndex: 60,
            boxShadow: '0 0 8px rgba(255,224,32,0.4)',
          }}
          transition={{ opacity: { duration: 0.3 } }}
        />
      </header>

      {/* ====== MOBILE MENU OVERLAY ====== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Yellow radial glow */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: '500px', height: '300px',
              background: 'radial-gradient(ellipse at top, rgba(255,224,32,0.04) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <motion.ul
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', listStyle: 'none', margin: 0, padding: 0 }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
                  },
                }}
              >
                {navItems.map((item) => {
                  const isActive = getIsActive(item.id)
                  return (
                    <motion.li
                      key={item.id}
                      variants={{
                        hidden: { opacity: 0, y: 24 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <button
                        onClick={() => scrollToSection(item.id)}
                        style={{
                          fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-display)',
                          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                          fontWeight: isRTL ? 700 : 400,
                          padding: '14px 28px',
                          color: isActive ? '#FFE020' : '#FFFFFF',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {item.label}
                      </button>
                    </motion.li>
                  )
                })}
              </motion.ul>

              <motion.div
                style={{ marginTop: '48px' }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <LanguageToggle size="large" variant="light" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
