import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

import storeWide from '../assets/images/store-wide.jpeg'
import jerseys from '../assets/images/jerseys.jpeg'
import trophies from '../assets/images/trophies.jpeg'
import pins from '../assets/images/pins.jpeg'
import figurines from '../assets/images/figurines.jpeg'
import bags from '../assets/images/bags.jpeg'
import footballs from '../assets/images/footballs.jpeg'
import medals from '../assets/images/medals.jpeg'
import flags from '../assets/images/flags.jpeg'
import football from '../assets/images/football.jpeg'
import counter from '../assets/images/counter.jpeg'
import customTrophy from '../assets/images/custom-trophy.jpeg'
import storeDetail from '../assets/images/store-detail.jpeg'
import storeInterior from '../assets/images/store-interior.jpeg'
import storeHero from '../assets/images/store-hero.jpeg'

const pageTransition = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

type Category = 'all' | 'jerseys' | 'trophies' | 'collectibles' | 'footballs' | 'accessories'

interface ProductItem {
  src: string
  alt: string
  category: Category
}

const products: ProductItem[] = [
  { src: jerseys, alt: 'Football jerseys collection', category: 'jerseys' },
  { src: storeInterior, alt: 'Store interior with jerseys', category: 'jerseys' },
  { src: trophies, alt: 'Trophy display', category: 'trophies' },
  { src: medals, alt: 'Medals and trophies', category: 'trophies' },
  { src: customTrophy, alt: 'Custom trophy', category: 'trophies' },
  { src: pins, alt: 'Collectible pins', category: 'collectibles' },
  { src: figurines, alt: 'Football figurines', category: 'collectibles' },
  { src: storeDetail, alt: 'Store display', category: 'collectibles' },
  { src: footballs, alt: 'Footballs collection', category: 'footballs' },
  { src: football, alt: 'Football product', category: 'footballs' },
  { src: bags, alt: 'Sports bags', category: 'accessories' },
  { src: flags, alt: 'Football flags', category: 'accessories' },
  { src: counter, alt: 'Store counter', category: 'accessories' },
  { src: storeHero, alt: 'Store overview', category: 'all' },
  { src: storeWide, alt: 'Full store view', category: 'all' },
]

export default function ProductsPage() {
  const { t, isRTL } = useLanguage()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: t.products.all },
    { key: 'jerseys', label: t.products.jerseys },
    { key: 'trophies', label: t.products.trophies },
    { key: 'collectibles', label: t.products.collectibles },
    { key: 'footballs', label: t.products.footballs },
    { key: 'accessories', label: t.products.accessories },
  ]

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory || p.category === 'all')

  return (
    <motion.div
      className="min-h-screen bg-bg"
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Header Banner */}
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={storeWide}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'} z-20 flex items-center gap-2 text-white/70 hover:text-primary text-sm transition-colors cursor-pointer bg-transparent border-none`}
        >
          <svg
            className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t.products.back}
        </button>

        {/* Title */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <h1
            className={`text-4xl md:text-5xl text-white ${isRTL ? 'font-arabic font-bold' : 'font-display'}`}
          >
            {t.products.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category filter tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 cursor-pointer border ${
                activeCategory === cat.key
                  ? 'bg-primary text-bg-dark border-primary'
                  : 'bg-transparent text-text-muted border-white/10 hover:border-primary/40 hover:text-text'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Category tag */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-wider font-medium bg-primary text-bg-dark rounded-sm">
                    {item.category === 'all' ? 'Store' : categories.find(c => c.key === item.category)?.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-text-muted mb-6 font-sans">
            {t.products.visitCta}
          </p>
          <a
            href="https://wa.me/97366694911"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white uppercase tracking-[0.15em] text-xs font-bold px-8 py-4 hover:bg-[#20BD5A] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.products.whatsappCta}
          </a>
        </div>
      </div>
    </motion.div>
  )
}
