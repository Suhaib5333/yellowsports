import { motion } from 'framer-motion'

interface SectionDividerProps {
  /** Background must match the section BELOW the divider */
  bg?: string
  /** Flip gradient direction (dark-to-light vs light-to-dark) */
  variant?: 'default' | 'glow'
}

export default function SectionDivider({ bg = 'transparent', variant = 'default' }: SectionDividerProps) {
  return (
    <div
      style={{ backgroundColor: bg, position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle top gradient blend */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40px',
          background: variant === 'glow'
            ? 'linear-gradient(to bottom, transparent, transparent)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(24px, 6vw, 40px) 24px',
          gap: '0',
        }}
      >
        {/* Left line */}
        <motion.div
          style={{
            flex: 1,
            maxWidth: 'clamp(80px, 30vw, 180px)',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(255,224,32,0.2))',
          }}
          initial={{ scaleX: 0, originX: 1 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        />

        {/* Center diamond */}
        <motion.div
          style={{
            width: '6px',
            height: '6px',
            backgroundColor: 'rgba(255,224,32,0.35)',
            flexShrink: 0,
            margin: '0 4px',
            boxShadow: '0 0 12px rgba(255,224,32,0.15)',
          }}
          initial={{ scale: 0, opacity: 0, rotate: 135 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 45 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        />

        {/* Right line */}
        <motion.div
          style={{
            flex: 1,
            maxWidth: 'clamp(80px, 30vw, 180px)',
            height: '1px',
            background: 'linear-gradient(to left, transparent, rgba(255,224,32,0.2))',
          }}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  )
}
