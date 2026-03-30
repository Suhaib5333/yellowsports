import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { staggerContainer, fadeUpItem, springTransition } from '../lib/animations'
import logo from '../assets/logos/logo.jpeg'

export default function Footer() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: true, margin: '-50px' })

  const navItems = [
    { label: t.nav.home, id: 'hero' },
    { label: t.nav.about, id: 'about' },
    { label: t.nav.products, id: 'products-cta' },
    { label: t.nav.contact, id: 'contact' },
  ]

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(id)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(id)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      ref={footerRef}
      className="bg-black py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center"
        >
          {/* Yellow stripe line */}
          <motion.div variants={fadeUpItem} className="mb-8">
            <div className="w-12 h-[2px] bg-primary/40 mx-auto" />
          </motion.div>

          {/* Logo */}
          <motion.div variants={fadeUpItem} className="mb-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="block cursor-pointer bg-transparent border-none p-0"
            >
              <img
                src={logo}
                alt="23 Yellow Sports"
                className="h-12 w-12 rounded-sm object-cover"
              />
            </button>
          </motion.div>

          {/* Brand name */}
          <motion.p
            variants={fadeUpItem}
            className="text-sm text-primary/70 font-display tracking-[0.3em] mb-8"
          >
            23 YELLOW SPORTS
          </motion.p>

          {/* Nav links */}
          <motion.nav variants={fadeUpItem} className="mb-8">
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="cursor-pointer border-none bg-transparent text-xs uppercase tracking-[0.15em] text-white/40 hover:text-primary transition-colors duration-200 font-sans"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Social icons */}
          <motion.div variants={fadeUpItem} className="mb-8 flex items-center gap-3">
            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com/23yellowsports/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-white/40 hover:text-primary hover:bg-primary/10 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={springTransition}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/97366694911"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-white/40 hover:text-primary hover:bg-primary/10 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={springTransition}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={fadeUpItem}
            className="h-px bg-white/8 max-w-xs w-full mx-auto mb-6"
          />

          {/* Copyright */}
          <motion.p
            variants={fadeUpItem}
            className="text-[11px] text-white/25 font-sans"
          >
            &copy; {new Date().getFullYear()} 23 Yellow Sports. {t.footer.rights}
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}
