import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'

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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Ready to schedule your mobile detailing service? Get in touch with us today.
            </p>
          </div>
          
          <div className="mt-16 max-w-lg mx-auto">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">(760) 518-8451</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">SDclassicautodetail@outlook.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">1745 S. Iris ln. Escondido 92026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
