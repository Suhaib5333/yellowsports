import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LanguageProvider } from './i18n/LanguageContext'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Header from './components/Header'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import ProductsPage from './pages/Products'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    const lenis = window.__lenis
    if (lenis) lenis.scrollTo(0, { immediate: true })
  }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

function AppContent() {
  useSmoothScroll()

  // Disable browser's automatic scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  return (
    <>
      <Header />
      <AnimatedRoutes />
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  )
}
