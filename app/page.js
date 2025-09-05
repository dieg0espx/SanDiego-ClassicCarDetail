import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import ContactCTA from '../components/ContactCTA'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Comprehensive detailing packages designed for all vehicle types
            </p>
            <div className="mt-6">
              <a href="/services" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
                View All Packages & Pricing
              </a>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="w-12 h-12 bg-red-600 rounded-md flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Exterior Detailing</h3>
              <p className="mt-2 text-gray-500">
                Complete exterior wash, clay bar treatment, and protective wax application.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="w-12 h-12 bg-red-600 rounded-md flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Interior Detailing</h3>
              <p className="mt-2 text-gray-500">
                Deep cleaning of seats, carpets, dashboard, and all interior surfaces.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="w-12 h-12 bg-red-600 rounded-md flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Paint Correction</h3>
              <p className="mt-2 text-gray-500">
                Professional paint correction to remove scratches, swirls, and oxidation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      <ContactCTA />
    </main>
  )
}
