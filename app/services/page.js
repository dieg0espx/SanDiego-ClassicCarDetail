import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      
      
      {/* Hero Section */}
      <section className="bg-black text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Our Professional Services
            </h1>
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-300 px-4">
              Comprehensive mobile detailing services for every vehicle and budget
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
              Complete Detailing Solutions
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-500 px-4">
              From quick washes to show-quality details, we have the perfect service for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* The Classic Wash */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-40 sm:h-48">
                <Image
                  src="/stock/1.png"
                  alt="The Classic Wash Service"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">The Classic Wash</h3>
                <div className="text-2xl sm:text-3xl font-bold text-gold mb-3 sm:mb-4">$170</div>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">Perfect for a quick, refreshing clean that gets your vehicle looking great in no time.</p>
                <ul className="space-y-2 mb-4 sm:mb-6">
                  <li className="flex items-center text-xs sm:text-sm text-gray-700">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gold mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Two-stage hand wash
                  </li>
                  <li className="flex items-center text-xs sm:text-sm text-gray-700">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gold mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Wheel & tire cleaning
                  </li>
                  <li className="flex items-center text-xs sm:text-sm text-gray-700">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gold mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Interior vacuum & wipe down
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <Link href="/services/classic-wash" className="flex-1 bg-gold hover:bg-gold text-white text-center py-2 sm:py-2 px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base">
                    Learn More
                  </Link>
                  <a href="tel:(760) 518-8451" className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-center py-2 sm:py-2 px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base">
                    Book Now
                  </a>
                </div>
              </div>
            </div>

            {/* The Sunset Shine */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-gold">
              <div className="relative h-48">
                <Image
                  src="/stock/2.png"
                  alt="The Sunset Shine Service"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-black mb-2">The Sunset Shine</h3>
                <div className="text-3xl font-bold text-gold mb-4">$200</div>
                <p className="text-gray-600 mb-4">Our most popular service - a deeper clean with that signature SoCal sunset glow and protection.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 text-gold mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Everything in Classic Wash
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 text-gold mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    UV protectant treatment
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 text-gold mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Spray wax protection
                  </li>
                </ul>
                <div className="flex space-x-3">
                  <Link href="/services/sunset-shine" className="flex-1 bg-gold hover:bg-gold text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors">
                    Learn More
                  </Link>
                  <a href="tel:(760) 518-8451" className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors">
                    Book Now
                  </a>
                </div>
              </div>
            </div>

            {/* The Hot Rod Detail */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/stock/3.png"
                  alt="The Hot Rod Detail Service"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-black mb-2">The Hot Rod Detail</h3>
                <div className="text-3xl font-bold text-gold mb-4">$270</div>
                <p className="text-gray-600 mb-4">Show-quality detailing inspired by classic hot rods - for when you want your ride to turn heads.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 text-gold mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Three-step wash & wax
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 text-gold mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Full interior shampoo
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 text-gold mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Leather reconditioning
                  </li>
                </ul>
                <div className="flex space-x-3">
                  <Link href="/services/hot-rod-detail" className="flex-1 bg-gold hover:bg-gold text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors">
                    Learn More
                  </Link>
                  <a href="tel:(760) 518-8451" className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Additional Services
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Specialized services to keep your vehicle in perfect condition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Paint Correction */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/stock/4.png"
                  alt="Paint Correction Service"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2">Paint Correction</h3>
                <p className="text-gray-600 text-sm mb-4">Remove swirls, scratches, and oxidation for a flawless finish</p>
                <div className="flex space-x-3">
                  <a href="tel:(760) 518-8451" className="flex-1 bg-gold hover:bg-gold text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors text-sm">
                    Book Now
                  </a>
                </div>
              </div>
            </div>

            {/* Ceramic Coating */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/stock/5.png"
                  alt="Ceramic Coating Service"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2">Ceramic Coating</h3>
                <p className="text-gray-600 text-sm mb-4">Long-lasting protection with hydrophobic properties</p>
                <div className="flex space-x-3">
                  <a href="tel:(760) 518-8451" className="flex-1 bg-gold hover:bg-gold text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors text-sm">
                    Book Now
                  </a>
                </div>
              </div>
            </div>

            {/* Interior Detailing */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/stock/6.png"
                  alt="Interior Detailing Service"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2">Interior Detailing</h3>
                <p className="text-gray-600 text-sm mb-4">Deep cleaning and protection for all interior surfaces</p>
                <div className="flex space-x-3">
                  <a href="tel:(760) 518-8451" className="flex-1 bg-gold hover:bg-gold text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors text-sm">
                    Book Now
                  </a>
                </div>
              </div>
            </div>

            {/* Engine Bay Cleaning */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/stock/7.png"
                  alt="Engine Bay Cleaning Service"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2">Engine Bay Cleaning</h3>
                <p className="text-gray-600 text-sm mb-4">Safe cleaning and dressing of your engine compartment</p>
                <div className="flex space-x-3">
                  <a href="tel:(760) 518-8451" className="flex-1 bg-gold hover:bg-gold text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors text-sm">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Why Choose Our Services?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Professional Quality</h3>
              <p className="text-gray-600">We use premium products and proven techniques to deliver exceptional results every time.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Mobile Convenience</h3>
              <p className="text-gray-600">We come to you! No need to drive anywhere - we bring our professional service to your location.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Open 7 days a week with flexible scheduling to fit your busy lifestyle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-white mb-8">
            Book your service today and see why San Diego Classic Auto Detail is the trusted choice for vehicle care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:(760) 518-8451" className="bg-white hover:bg-gray-100 text-gold font-bold px-8 py-3 rounded-lg transition-colors">
              Call (760) 518-8451
            </a>
            <a href="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gold font-bold px-8 py-3 rounded-lg transition-colors">
              Request Quote
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
