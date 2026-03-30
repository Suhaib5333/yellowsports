import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from '@dr.pogodin/react-helmet'
import { useLanguage } from '../i18n/LanguageContext'

export default function NotFound() {
  const { isRTL } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A0A0A',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <Helmet>
        <title>{isRTL ? 'الصفحة غير موجودة | يلو سبورتس ٢٣' : 'Page Not Found | Yellow Sports 23'}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(6rem, 15vw, 12rem)',
        lineHeight: 1,
        color: '#FFE020',
        textShadow: '0 0 40px rgba(255,224,32,0.2)',
        marginBottom: '16px',
      }}>
        404
      </span>

      <p style={{
        fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
        fontSize: '16px',
        color: 'rgba(245,245,240,0.5)',
        marginBottom: '40px',
        maxWidth: '400px',
      }}>
        {isRTL
          ? 'الصفحة التي تبحث عنها غير موجودة.'
          : "The page you're looking for doesn't exist."
        }
      </p>

      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '16px 36px',
          backgroundColor: '#FFE020',
          color: '#0A0A0A',
          textDecoration: 'none',
          borderRadius: '2px',
          fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
          fontSize: isRTL ? '14px' : '11px',
          fontWeight: 800,
          letterSpacing: isRTL ? '0.06em' : '0.25em',
          textTransform: isRTL ? 'none' : 'uppercase',
        }}
      >
        {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
      </Link>
    </motion.div>
  )
}
