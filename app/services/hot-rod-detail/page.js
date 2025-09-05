import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function HotRodDetail() {
  return (
    <div className="min-h-screen bg-white">
    
      
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-red-600 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold">Premium Service</span>
            </div>
            <h1 className="text-4xl font-bold sm:text-5xl">
              The Hot Rod Detail
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Show-quality detailing inspired by classic hot rods - for when you want your ride to turn heads
            </p>
            <div className="mt-6 text-3xl font-bold text-red-400">$250</div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Show-Quality Detailing
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The Hot Rod Detail is our premium service, inspired by the meticulous care given to classic 
                show cars and hot rods. This comprehensive service transforms your vehicle into a head-turning 
                masterpiece that commands attention wherever you go.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Perfect for special occasions, car shows, or when you simply want the absolute best for your 
                vehicle. This service includes everything from The Sunset Shine plus advanced techniques like 
                three-step washing, full interior shampoo, and leather reconditioning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:(760) 518-8451" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center">
                  Book Now - (760) 518-8451
                </a>
                <Link href="/services" className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center">
                  View All Services
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/stock/3.png"
                alt="Hot Rod Detail Service in Action"
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
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              What's Included in The Hot Rod Detail
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Everything from The Sunset Shine plus premium show-quality treatments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Premium Exterior */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Premium Exterior</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">Everything in Sunset Shine</span>
                    <p className="text-gray-600 text-sm">Complete exterior cleaning, protection, and enhancement</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">Three-Step Wash & Wax</span>
                    <p className="text-gray-600 text-sm">Prewash, contact wash, and hydro foam with wax sealant</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">Detailed Wheel & Tire Cleaning</span>
                    <p className="text-gray-600 text-sm">Comprehensive wheel cleaning including barrel and lug nut areas</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">Premium Tire Dressing</span>
                    <p className="text-gray-600 text-sm">High-quality tire dressing for that show-car finish</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Show-Quality Interior */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Show-Quality Interior</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">Full Interior Shampoo</span>
                    <p className="text-gray-600 text-sm">Deep cleaning of all carpeted surfaces and upholstery</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">Leather Reconditioning</span>
                    <p className="text-gray-600 text-sm">Professional leather cleaning, conditioning, and protection</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">In-Depth Vacuum & Cleaning</span>
                    <p className="text-gray-600 text-sm">Comprehensive vacuuming of all interior areas and crevices</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">Premium Interior Protection</span>
                    <p className="text-gray-600 text-sm">Advanced UV protection and conditioning for all surfaces</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Show Quality Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Show-Quality Process
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Every step performed with the precision and care of a professional show car detailer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/stock/4.png"
                  alt="Step 1: Prewash"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 1: Prewash</h3>
              <p className="text-gray-600 text-sm">Thorough prewash to remove loose contaminants and prepare the surface.</p>
            </div>

            <div className="text-center">
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/stock/5.png"
                  alt="Step 2: Contact Wash"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 2: Contact Wash</h3>
              <p className="text-gray-600 text-sm">Hand washing with premium products and microfiber mitts for safe cleaning.</p>
            </div>

            <div className="text-center">
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/stock/6.png"
                  alt="Step 3: Hydro Foam"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 3: Hydro Foam</h3>
              <p className="text-gray-600 text-sm">Hydro foam application with wax sealant for enhanced protection and shine.</p>
            </div>

            <div className="text-center">
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/stock/7.png"
                  alt="Step 4: Interior Detail"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 4: Interior Detail</h3>
              <p className="text-gray-600 text-sm">Full interior shampoo, leather conditioning, and premium protection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Perfect For
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              The Hot Rod Detail is ideal for these special situations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Car Shows</h3>
              <p className="text-gray-600 text-sm">Show-quality finish for competitions and exhibitions</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Special Events</h3>
              <p className="text-gray-600 text-sm">Weddings, graduations, and milestone celebrations</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Luxury Vehicles</h3>
              <p className="text-gray-600 text-sm">Premium care for high-end and classic automobiles</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Seasonal Prep</h3>
              <p className="text-gray-600 text-sm">Quarterly deep cleaning and protection treatment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Protection */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Protect Your Investment
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              The Hot Rod Detail helps maintain and enhance your vehicle's value
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="/stock/14.png"
                  alt="Paint Protection"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Paint Protection</h3>
              <p className="text-gray-600">
                Our three-step process and premium wax sealant provide superior protection against 
                UV rays, oxidation, and environmental contaminants that can damage your paint.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="/stock/8.png"
                  alt="Interior Preservation"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Interior Preservation</h3>
              <p className="text-gray-600">
                Professional leather conditioning and UV protection help prevent cracking, fading, 
                and premature aging of your vehicle's interior surfaces.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="/stock/9.png"
                  alt="Resale Value"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Resale Value</h3>
              <p className="text-gray-600">
                Regular premium detailing helps maintain your vehicle's condition, potentially 
                increasing its resale value and making it more attractive to buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready for Show-Quality Detailing?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Experience the difference that professional show-quality detailing makes. 
            Your vehicle deserves the best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:(760) 518-8451" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition-colors">
              Call (760) 518-8451
            </a>
            <Link href="/services" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 font-bold px-8 py-3 rounded-lg transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  )
}
