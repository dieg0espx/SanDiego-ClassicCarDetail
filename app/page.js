import Hero from '../components/Hero'
import BrandLogos from '../components/BrandLogos'
import AboutUs from '../components/AboutUs'
import Stats from '../components/Stats'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import LoyaltyClub from '../components/LoyaltyClub'
import ContactCTA from '../components/ContactCTA'
import Pricing from '../components/Pricing'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
       <Stats />
      <AboutUs />
      <BrandLogos />     
      <WhyChooseUs />
      <Pricing />
      <Testimonials />
      <FAQ />
      <ContactCTA />
      <LoyaltyClub />
    </main>
  )
}
