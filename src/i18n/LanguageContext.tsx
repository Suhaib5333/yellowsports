import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import en from './en.json'
import ar from './ar.json'

type Language = 'ar' | 'en'
type Translations = typeof en

interface LanguageContextType {
  lang: Language
  t: Translations
  toggleLanguage: () => void
  isRTL: boolean
}

const translations: Record<Language, Translations> = { en, ar }

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('ys-lang') as Language
    return saved === 'en' ? 'en' : 'ar'
  })

  const toggleLanguage = useCallback(() => {
    setLang(prev => {
      const next = prev === 'ar' ? 'en' : 'ar'
      localStorage.setItem('ys-lang', next)
      return next
    })
  }, [])

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('lang', lang)
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
  }, [lang])

  return (
    <LanguageContext.Provider value={{
      lang,
      t: translations[lang],
      toggleLanguage,
      isRTL: lang === 'ar',
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
