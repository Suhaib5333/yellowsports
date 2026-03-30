import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

interface LanguageToggleProps {
  size?: 'default' | 'large'
  variant?: 'light' | 'dark'
}

const UKFlag = ({ size }: { size: 'default' | 'large' }) => {
  const w = size === 'large' ? 32 : 24
  const h = size === 'large' ? 22 : 16
  return (
    <svg
      width={w} height={h}
      viewBox="0 0 60 30"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: '2px', flexShrink: 0, display: 'block' }}
    >
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30" stroke="#C8102E" strokeWidth="4" />
      <path d="M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

const BahrainFlag = ({ size }: { size: 'default' | 'large' }) => {
  const w = size === 'large' ? 32 : 24
  const h = size === 'large' ? 22 : 16
  return (
    <svg
      width={w} height={h}
      viewBox="0 0 300 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: '2px', flexShrink: 0, display: 'block' }}
    >
      <rect width="300" height="200" fill="#CE1126" />
      <path d="M0,0 H90 L65,20 L90,40 L65,60 L90,80 L65,100 L90,120 L65,140 L90,160 L65,180 L90,200 H0 Z" fill="#FFFFFF" />
    </svg>
  )
}

export default function LanguageToggle({ size = 'default', variant = 'dark' }: LanguageToggleProps) {
  const { lang, toggleLanguage, isRTL } = useLanguage()

  const isLarge = size === 'large'
  const isLight = variant === 'light'

  const textSize = isLarge ? '18px' : '15px'

  const activeStyle = isLight
    ? { color: '#FFFFFF', fontWeight: 600 }
    : { color: '#FFE020', fontWeight: 600 }
  const inactiveStyle = isLight
    ? { color: 'rgba(255,255,255,0.6)', fontWeight: 500 }
    : { color: '#9CA3AF', fontWeight: 500 }

  const dividerColor = isLight ? 'rgba(255,255,255,0.3)' : 'rgba(156,163,175,0.3)'

  return (
    <button
      onClick={toggleLanguage}
      aria-label={isRTL ? 'تغيير اللغة' : 'Change language'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      {/* English */}
      <motion.span
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          fontFamily: 'var(--font-sans)',
          fontSize: textSize,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          transition: 'color 0.25s ease',
          ...(lang === 'en' ? activeStyle : inactiveStyle),
        }}
      >
        <UKFlag size={size} />
        EN
      </motion.span>

      {/* Divider */}
      <span style={{
        display: 'inline-block',
        width: '1px',
        height: isLarge ? '24px' : '16px',
        backgroundColor: dividerColor,
        flexShrink: 0,
      }} />

      {/* Arabic */}
      <motion.span
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          fontFamily: 'var(--font-arabic)',
          fontSize: textSize,
          transition: 'color 0.25s ease',
          ...(lang === 'ar' ? activeStyle : inactiveStyle),
        }}
      >
        <BahrainFlag size={size} />
        عربي
      </motion.span>
    </button>
  )
}
