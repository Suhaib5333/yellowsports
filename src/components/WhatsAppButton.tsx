import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function WhatsAppButton() {
  const { isRTL } = useLanguage()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href="https://wa.me/97336692966"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 end-6 z-50 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
      style={{
        background: '#25D366',
        boxShadow: '0 4px 20px rgba(37,211,102,0.3), 0 0 0 1px rgba(37,211,102,0.1)',
      }}
      initial={{ y: 80, scale: 0, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 2 }}
      whileHover={{
        scale: 1.1,
        boxShadow: '0 0 40px rgba(37,211,102,0.4), 0 0 80px rgba(37,211,102,0.15), 0 0 0 1px rgba(37,211,102,0.2)',
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Pulse ring — yellow to match brand */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: 'rgba(37,211,102,0.3)' }}
        animate={{
          scale: [1, 1.6],
          opacity: [0.35, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />

      {/* WhatsApp icon */}
      <svg
        className="w-6 h-6 relative z-10"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>

      {/* Tooltip — premium dark glass with yellow accent */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -10 : 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: isRTL ? -10 : 10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute end-[calc(100%+14px)] top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: 'rgba(10, 10, 10, 0.92)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,224,32,0.12)',
              borderRadius: '4px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,224,32,0.06), inset 0 1px 0 rgba(255,255,255,0.03)',
              whiteSpace: 'nowrap',
            }}
          >
            {/* Yellow accent dot */}
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#FFE020',
                boxShadow: '0 0 8px rgba(255,224,32,0.5)',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: isRTL ? '0' : '0.08em',
                color: '#F5F5F0',
                textTransform: isRTL ? 'none' : 'uppercase',
              }}
            >
              {isRTL ? 'تواصل معنا' : 'Chat with us'}
            </span>
            {/* Arrow pointing toward button */}
            <span
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                ...(isRTL
                  ? { right: '-5px', borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderRight: '5px solid rgba(10,10,10,0.92)' }
                  : { left: 'calc(100% - 1px)', borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '5px solid rgba(10,10,10,0.92)' }),
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  )
}
