import Hero from '../components/Hero'
import BrandLogos from '../components/BrandLogos'
import AboutUs from '../components/AboutUs'
import Stats from '../components/Stats'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import ContactCTA from '../components/ContactCTA'
import Pricing from '../components/PricingTable'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      
       {/* Stats Section */}
       <Stats />

      {/* About Us Section */}
      <AboutUs />

      {/* Brand Logos Section */}
      <BrandLogos />
     

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      <Pricing />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      <ContactCTA />
    </main>
  )
}
