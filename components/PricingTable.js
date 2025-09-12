export default function PricingTable() {
  return (
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* The Classic Wash */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 relative">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">The Classic Wash</h3>
              <div className="text-3xl sm:text-4xl font-bold text-gold mb-4">$170</div>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">Perfect for a quick, refreshing clean.</p>
            </div>
            
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <li className="flex items-start">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 text-sm sm:text-base">Two stage hand wash (prewash, contact wash)</span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 text-sm sm:text-base">Wheel cleaning, tires dressed</span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 text-sm sm:text-base">Light interior vacuum</span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 text-sm sm:text-base">Dashboard and console wipe down</span>
              </li>
            </ul>
            
            <div className="text-center">
              <a href="tel:(760) 518-8451" className="bg-gold hover:bg-gold text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors inline-block text-sm sm:text-base w-full sm:w-auto">
                Book Now
              </a>
            </div>
          </div>

          {/* The Sunset Shine */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 relative border-2 border-gold md:col-span-2 lg:col-span-1">
            <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gold text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                Most Popular
              </span>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">The Sunset Shine</h3>
              <div className="text-3xl sm:text-4xl font-bold text-gold mb-4">$200</div>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">Our most popular wash - a deeper clean with that SoCal sunset glow.</p>
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
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 relative md:col-span-2 lg:col-span-1">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">The Hot Rod Detail</h3>
              <div className="text-3xl sm:text-4xl font-bold text-gold mb-4">$270</div>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">Inspired by classic show cars - for when you want your ride to turn heads.</p>
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
  )
}
