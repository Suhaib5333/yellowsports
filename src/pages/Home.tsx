import Hero from '../components/Hero'
import About from '../components/About'
import ProductsCTA from '../components/ProductsCTA'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ProductsCTA />
      <Contact />
      <Footer />
    </main>
  )
}
