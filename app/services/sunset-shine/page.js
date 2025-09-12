import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function SunsetShine() {
  return (
    <div className="min-h-screen bg-white">
     
      
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-white bg-opacity-20 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold">Most Popular Service</span>
            </div>
            <h1 className="text-4xl font-bold sm:text-5xl">
              The Sunset Shine
            </h1>
            <p className="mt-4 text-xl text-gold">
              Our most popular service - a deeper clean with that signature SoCal sunset glow
            </p>
            <div className="mt-6 text-3xl font-bold text-white">$200</div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">
                The Perfect Balance of Quality & Value
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The Sunset Shine is our most requested service, combining the thoroughness of a full detail 
                with the efficiency of a premium wash. Named after San Diego's famous sunsets, this service 
                gives your vehicle that perfect glow and protection.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                This comprehensive service includes everything from The Classic Wash plus advanced protection 
                treatments, deeper interior cleaning, and UV protection to keep your vehicle looking great 
                longer in our sunny San Diego climate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:(760) 518-8451" className="bg-gold hover:bg-gold text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center">
                  Book Now - (760) 518-8451
                </a>
                <Link href="/services" className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center">
                  View All Services
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/stock/2.png"
                alt="Sunset Shine Service in Action"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              What's Included in The Sunset Shine
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Everything from The Classic Wash plus premium protection and enhancement treatments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Enhanced Exterior */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black">Enhanced Exterior</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-black">Everything in Classic Wash</span>
                    <p className="text-gray-600 text-sm">Complete two-stage wash, wheel cleaning, and safe drying</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-black">Door Jambs Cleaning</span>
                    <p className="text-gray-600 text-sm">Thorough cleaning of door jambs and hinges for complete coverage</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-black">Spray Wax Protection</span>
                    <p className="text-gray-600 text-sm">Premium spray wax for enhanced shine and UV protection</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-black">Plastic Dressing</span>
                    <p className="text-gray-600 text-sm">Revitalizing plastic dressing for trim and exterior components</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Premium Interior */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black">Premium Interior</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-black">In-Depth Interior Vacuum</span>
                    <p className="text-gray-600 text-sm">Comprehensive vacuuming of all interior surfaces and crevices</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-black">UV Protectant Treatment</span>
                    <p className="text-gray-600 text-sm">Complete UV protectant wipe down for all interior surfaces</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-black">Leather Protection</span>
                    <p className="text-gray-600 text-sm">Specialized leather conditioning and protection treatment</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-black">Enhanced Window Cleaning</span>
                    <p className="text-gray-600 text-sm">Streak-free interior and exterior window cleaning</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why It's Popular */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Why The Sunset Shine is Our Most Popular
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              The perfect balance of thoroughness, protection, and value
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="/stock/11.png"
                  alt="UV Protection Benefits"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">UV Protection</h3>
              <p className="text-gray-600">
                Essential for San Diego's sunny climate, our UV protectant treatments help prevent 
                fading and cracking of interior surfaces, keeping your vehicle looking newer longer.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="/stock/12.png"
                  alt="Enhanced Shine"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Enhanced Shine</h3>
              <p className="text-gray-600">
                The spray wax treatment gives your vehicle that signature "sunset glow" - a deep, 
                rich shine that catches the light beautifully and lasts for weeks.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="/stock/13.png"
                  alt="Complete Protection"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Complete Protection</h3>
              <p className="text-gray-600">
                From exterior paint to interior leather, every surface gets the protection it needs 
                to withstand San Diego's elements and daily use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Perfect For
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              The Sunset Shine is ideal for these situations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Regular Maintenance</h3>
              <p className="text-gray-600 text-sm">Perfect for monthly or bi-monthly vehicle care</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Special Occasions</h3>
              <p className="text-gray-600 text-sm">Great for events, dates, or important meetings</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Value Seekers</h3>
              <p className="text-gray-600 text-sm">Maximum protection and shine for your investment</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-black mb-2">San Diego Living</h3>
              <p className="text-gray-600 text-sm">Perfect for our sunny, coastal climate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Experience The Sunset Shine Today
          </h2>
          <p className="text-xl text-gold mb-8">
            Join thousands of satisfied customers who choose The Sunset Shine for their vehicle care needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:(760) 518-8451" className="bg-white hover:bg-gray-100 text-gold font-bold px-8 py-3 rounded-lg transition-colors">
              Call (760) 518-8451
            </a>
            <Link href="/services" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gold font-bold px-8 py-3 rounded-lg transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  )
}
