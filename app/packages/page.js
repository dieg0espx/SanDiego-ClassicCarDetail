import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AddOnServicesCarousel from '../../components/AddOnServicesCarousel'
import CallToAction from '../../components/CallToAction'

export default function Packages() {
  return (
    <div className="min-h-screen bg-white">

      
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">
              Our Detailing Packages
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Professional mobile detailing services tailored to your needs
            </p>
          </div>
        </div>
      </section>

      {/* Main Packages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Choose Your Perfect Package
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              From quick refreshes to show-quality details
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* The Classic Wash */}
            <div className="bg-white rounded-lg shadow-lg p-8 relative">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-black mb-2">The Classic Wash</h3>
                <div className="text-4xl font-bold text-gold mb-4">$170</div>
                <p className="text-gray-600 mb-6">Perfect for a quick, refreshing clean.</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Two stage hand wash (prewash, contact wash)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Wheel cleaning, tires dressed</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Light interior vacuum</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Dashboard and console wipe down</span>
                </li>
              </ul>
              
              <div className="text-center">
                <a href="tel:(760) 518-8451" className="bg-gold hover:bg-gold text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
                  Book Now
                </a>
              </div>
            </div>

            {/* The Sunset Shine */}
            <div className="bg-white rounded-lg shadow-lg p-8 relative border-2 border-gold">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gold text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-black mb-2">The Sunset Shine</h3>
                <div className="text-4xl font-bold text-gold mb-4">$200</div>
                <p className="text-gray-600 mb-6">Our most popular wash - a deeper clean with that SoCal sunset glow.</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Everything in the classic wash</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">In depth interior vacuum and UV protectant wipe down (leather protection included)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Door jambs cleaned</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Revitalizing Plastic dressing / protectant</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Spray wax added for shine & protection</span>
                </li>
              </ul>
              
              <div className="text-center">
                <a href="tel:(760) 518-8451" className="bg-gold hover:bg-gold text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
                  Book Now
                </a>
              </div>
            </div>

            {/* The Hot Rod Detail */}
            <div className="bg-white rounded-lg shadow-lg p-8 relative">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-black mb-2">The Hot Rod Detail</h3>
                <div className="text-4xl font-bold text-gold mb-4">$270</div>
                <p className="text-gray-600 mb-6">Inspired by classic show cars - for when you want your ride to turn heads.</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Everything in the sunset shine</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Three step hand wash and wax (Pre-wash, contact wash, hydro foam with wax sealant)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Detailed wheel & tire cleaning</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Full in depth interior vacuum, shampoo, leather reconditioning</span>
                </li>
              </ul>
              
              <div className="text-center">
                <a href="tel:(760) 518-8451" className="bg-gold hover:bg-gold text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-on Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Add-on Services
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Enhance your service with premium add-ons
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Prices are base rates for vehicles in average condition. Oversize vehicles may incur a small surcharge. Final quotes provided on site before service begins.
            </p>
          </div>

          <AddOnServicesCarousel />
        </div>
      </section>

      {/* Premium Zone Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Service Area & Travel Fees
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              We serve San Diego County with transparent travel pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
  

            {/* Free Service Area Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-gold">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-1">Free Service Area</h3>
                <p className="text-sm text-gray-600">0-15 miles from Vista</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-3">FREE</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Vista, Oceanside, Carlsbad, San Marcos, Escondido, Poway, Rancho Bernardo
                </p>
              </div>
            </div>

            {/* Extended Area Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-gold">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-1">Extended Area</h3>
                <p className="text-sm text-gray-600">16-25 miles from Vista</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-3">+$20</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Encinitas, Solana Beach, Del Mar, La Jolla, Mira Mesa, Valley Center
                </p>
              </div>
            </div>

            {/* Premium Area Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-gold">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-1">Premium Area</h3>
                <p className="text-sm text-gray-600">25-30 miles from Vista</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-3">+$40</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Downtown San Diego, Chula Vista, National City, Imperial Beach
                </p>
              </div>
            </div>
          </div>
          
          {/* Custom Pricing Note */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mt-0.5 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">Need service outside our coverage?</h4>
                  <p className="text-blue-700">Contact us for custom pricing on locations beyond 30 miles. We're happy to work with you to provide service wherever you are in San Diego County.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  )
}
