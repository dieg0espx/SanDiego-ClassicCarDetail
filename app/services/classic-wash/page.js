'use client'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../../../contexts/CartContext'

export default function ClassicWash() {
  const { addItem } = useCart()

  const serviceData = {
    id: 'classic-wash',
    name: 'The Classic Wash',
    description: 'Perfect for a quick, refreshing clean that gets your vehicle looking great in no time.',
    price: 170,
    image: '/stock/1.png',
    duration: '60-90 minutes',
    features: [
      'Two-stage hand wash',
      'Wheel & tire cleaning',
      'Interior vacuum & wipe down'
    ]
  }

  const handleAddToCart = () => {
    addItem(serviceData)
    alert('Service added to cart! You can review your order in the cart.')
  }

  return (
    <div className="min-h-screen bg-white">
   
      
      {/* Hero Section */}
      <section className="bg-black text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              The Classic Wash
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Perfect for a quick, refreshing clean that gets your vehicle looking great
            </p>
            <div className="mt-6 text-2xl sm:text-3xl font-bold text-gold">$170</div>
            <p className="mt-3 text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
              Prices are base rates for vehicles in average condition. Oversize vehicles may incur a small surcharge.
            </p>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-6">
                The Perfect Quick Clean
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                Our Classic Wash is designed for busy San Diego residents who want a professional, 
                thorough cleaning without the time commitment of a full detail. Perfect for regular 
                maintenance or when you need your vehicle looking its best quickly.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                This service combines efficiency with quality, using our proven two-stage washing 
                process to safely remove dirt, grime, and road contaminants while protecting your 
                vehicle's finish.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="bg-gold hover:bg-gold text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-center text-sm sm:text-base"
                >
                  Add to Cart - $170
                </button>
                <a href="tel:(760) 518-8451" className="bg-gray-600 hover:bg-gray-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-center text-sm sm:text-base">
                  Call (760) 518-8451
                </a>
                <Link href="/services" className="bg-transparent border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-center text-sm sm:text-base">
                  View All Services
                </Link>
              </div>
            </div>
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden mt-8 lg:mt-0">
              <Image
                src="/stock/1.png"
                alt="Classic Wash Service in Action"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
              What's Included in The Classic Wash
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
              Every service is performed with attention to detail and professional care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Exterior Services */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-black">Exterior Cleaning</h3>
              </div>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-black text-sm sm:text-base">Two-Stage Hand Wash</span>
                    <p className="text-gray-600 text-xs sm:text-sm">Prewash to loosen dirt, followed by contact wash with premium soap</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-black text-sm sm:text-base">Wheel & Tire Cleaning</span>
                    <p className="text-gray-600 text-xs sm:text-sm">Thorough cleaning of wheels, rims, and tire dressing application</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-black text-sm sm:text-base">Safe Drying</span>
                    <p className="text-gray-600 text-xs sm:text-sm">Professional drying techniques to prevent water spots and swirls</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Interior Services */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-black">Interior Cleaning</h3>
              </div>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-black text-sm sm:text-base">Light Interior Vacuum</span>
                    <p className="text-gray-600 text-xs sm:text-sm">Thorough vacuuming of seats, carpets, and floor mats</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-black text-sm sm:text-base">Dashboard & Console Wipe Down</span>
                    <p className="text-gray-600 text-xs sm:text-sm">Cleaning and protection of all interior surfaces</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-black text-sm sm:text-base">Window Cleaning</span>
                    <p className="text-gray-600 text-xs sm:text-sm">Interior and exterior window cleaning for crystal clear visibility</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Gallery */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
              Our Classic Wash Process
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
              See how we transform your vehicle with our professional techniques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="relative h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/stock/8.png"
                  alt="Step 1: Prewash"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-black mb-2">Step 1: Prewash</h3>
              <p className="text-gray-600 text-sm sm:text-base">We start with a thorough prewash to loosen dirt and contaminants before the main wash.</p>
            </div>

            <div className="text-center">
              <div className="relative h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/stock/9.png"
                  alt="Step 2: Contact Wash"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-black mb-2">Step 2: Contact Wash</h3>
              <p className="text-gray-600 text-sm sm:text-base">Hand washing with premium soap and microfiber mitts for a safe, thorough clean.</p>
            </div>

            <div className="text-center">
              <div className="relative h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/stock/10.png"
                  alt="Step 3: Final Touches"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-black mb-2">Step 3: Final Touches</h3>
              <p className="text-gray-600 text-sm sm:text-base">Professional drying, tire dressing, and interior cleaning for a complete transformation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
              Perfect For
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
              The Classic Wash is ideal for these situations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-black mb-2">Regular Maintenance</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Keep your vehicle looking great between full details</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-black mb-2">Quick Refresh</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Perfect for when you need your car looking great fast</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-black mb-2">Budget-Friendly</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Professional quality at an affordable price point</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-black mb-2">Mobile Service</h3>
              <p className="text-gray-600 text-xs sm:text-sm">We come to you - no need to drive anywhere</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready for The Classic Wash?
          </h2>
          <p className="text-lg sm:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto">
            Book your Classic Wash today and experience the difference professional mobile detailing makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <button 
              onClick={handleAddToCart}
              className="bg-white hover:bg-gray-100 text-gold font-bold px-6 sm:px-8 py-3 rounded-lg transition-colors text-sm sm:text-base"
            >
              Add to Cart - $170
            </button>
            <a href="tel:(760) 518-8451" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gold font-bold px-6 sm:px-8 py-3 rounded-lg transition-colors text-sm sm:text-base">
              Call (760) 518-8451
            </a>
            <Link href="/services" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gold font-bold px-6 sm:px-8 py-3 rounded-lg transition-colors text-sm sm:text-base">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  )
}
