import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LanguageProvider } from './i18n/LanguageContext'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Header from './components/Header'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import ProductsPage from './pages/Products'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function AppContent() {
  useSmoothScroll()

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
