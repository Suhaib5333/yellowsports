import Hero from '../components/Hero'
import About from '../components/About'
import ProductsCTA from '../components/ProductsCTA'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import SectionDivider from '../components/SectionDivider'
import SEO from '../components/SEO'

export default function Home() {
  return (
    <main>
      <SEO
        title="Football Jerseys, Trophies & Sports Collectibles in Bahrain"
        titleAr="قمصان كرة قدم، كؤوس ومقتنيات رياضية في البحرين"
        description="Yellow Sports 23 is Bahrain's #1 sports store in Isa Town. Shop football jerseys (Ronaldo, Messi), custom trophies, medals, collectible pins, figurines, sports bags & more. Open daily 10AM–10PM."
        descriptionAr="يلو سبورتس ٢٣ — الوجهة الأولى في البحرين لقمصان كرة القدم، الكؤوس المخصصة، الميداليات، الدبابيس، المجسمات، حقائب الرياضة والمزيد. مفتوح يومياً من ١٠ صباحاً حتى ١٠ مساءً."
        path="/"
        keywords="Yellow Sports 23, sports store Bahrain, football jerseys Bahrain, Ronaldo jersey, Messi jersey, custom trophies Bahrain, sports collectibles, medals, pins, figurines, sports bags, Isa Town, buy jerseys Bahrain, football store"
        keywordsAr="يلو سبورتس ٢٣, محل رياضي البحرين, قمصان كرة قدم البحرين, قميص رونالدو, قميص ميسي, كؤوس مخصصة, مقتنيات رياضية, ميداليات, دبابيس, مجسمات, حقائب رياضة, مدينة عيسى, شراء قمصان البحرين"
      />
      <Hero />
      <About />
      <SectionDivider bg="#0D0B06" />
      <ProductsCTA />
      <SectionDivider bg="#100F0A" />
      <Contact />
      <SectionDivider bg="#050505" />
      <Footer />
    </main>
  )
}
