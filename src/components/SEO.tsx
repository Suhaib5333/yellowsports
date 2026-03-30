import { Helmet } from '@dr.pogodin/react-helmet'
import { useLanguage } from '../i18n/LanguageContext'

interface SEOProps {
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  path?: string
  keywords?: string
  keywordsAr?: string
  type?: string
}

const BASE_URL = 'https://yellowsports23.com'
const OG_IMAGE = `${BASE_URL}/logo.jpeg`

export default function SEO({
  title,
  titleAr,
  description,
  descriptionAr,
  path = '/',
  keywords,
  keywordsAr,
  type = 'website',
}: SEOProps) {
  const { lang } = useLanguage()
  const isAr = lang === 'ar'

  const currentTitle = isAr
    ? `${titleAr} | يلو سبورتس ٢٣`
    : `${title} | Yellow Sports 23`

  const currentDesc = isAr ? descriptionAr : description
  const currentKeywords = isAr ? (keywordsAr ?? keywords) : keywords
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      <html lang={lang} dir={isAr ? 'rtl' : 'ltr'} />
      <title>{currentTitle}</title>
      <meta name="description" content={currentDesc} />
      {currentKeywords && <meta name="keywords" content={currentKeywords} />}
      <meta name="author" content="Yellow Sports 23" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={isAr ? 'يلو سبورتس ٢٣' : 'Yellow Sports 23'} />
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:alt" content={isAr ? 'يلو سبورتس ٢٣ — محل رياضي في البحرين' : 'Yellow Sports 23 — sports store in Bahrain'} />
      <meta property="og:locale" content={isAr ? 'ar_BH' : 'en_US'} />
      <meta property="og:locale:alternate" content={isAr ? 'en_US' : 'ar_BH'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@yellow_sports_23" />
      <meta name="twitter:title" content={currentTitle} />
      <meta name="twitter:description" content={currentDesc} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content={isAr ? 'يلو سبورتس ٢٣' : 'Yellow Sports 23'} />

      {/* hreflang */}
      <link rel="alternate" hreflang="ar" href={url} />
      <link rel="alternate" hreflang="en" href={url} />
      <link rel="alternate" hreflang="x-default" href={url} />
    </Helmet>
  )
}
