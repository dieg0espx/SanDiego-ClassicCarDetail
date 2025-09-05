export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-4 block">
              About Us
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl mb-6">
            San Diego Classic Car Detail
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Your trusted partner in automotive excellence, bringing over a decade of passion and expertise to every vehicle we touch.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-stretch">
          {/* Left Column - Story with Enhanced Image Gallery */}
          <div className="space-y-6 lg:space-y-8 flex flex-col">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 lg:mb-8 relative">
                Our Story
                <div className="absolute -bottom-2 left-0 w-12 sm:w-16 h-1 bg-red-600"></div>
              </h3>
              <div className="space-y-4 lg:space-y-6 text-gray-600 leading-relaxed text-base sm:text-lg">
                <p>
                  Founded in 2013, San Diego Classic Car Detail began as a passion project for automotive enthusiasts who believed that every vehicle deserves to look and feel its absolute best. What started as a small mobile detailing service has grown into San Diego's premier automotive care company.
                </p>
                <p>
                  Our founder, a certified automotive detailer with over 15 years of experience, recognized the need for professional-grade mobile detailing services that could bring showroom-quality results directly to customers' doorsteps.
                </p>
                <p>
                  Today, we're proud to serve over 500 satisfied customers across San Diego County, from classic car collectors to daily commuters who demand the best for their vehicles.
                </p>
              </div>
            </div>
            
            {/* Enhanced Image Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src="/stock/1.png" 
                  alt="Car detailing work - before and after" 
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src="/stock/2.png" 
                  alt="Professional car detailing service" 
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
   
            </div>
          </div>

          {/* Right Column - Enhanced Values & Mission Cards */}
          <div className="space-y-6 lg:space-y-8 flex flex-col justify-between">
            <div className="space-y-6 lg:space-y-8">
              {/* Mission Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border-l-4 border-red-600">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-xl flex items-center justify-center shadow-md">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Our Mission</h4>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      To provide exceptional automotive detailing services that exceed expectations while building lasting relationships with our customers through trust, quality, and convenience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Values Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border-l-4 border-red-600">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-xl flex items-center justify-center shadow-md">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Our Values</h4>
                    <ul className="text-gray-600 space-y-2 sm:space-y-3 text-sm sm:text-base">
                      <li className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                        <span>Quality craftsmanship in every detail</span>
                      </li>
                      <li className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                        <span>Honest, transparent pricing</span>
                      </li>
                      <li className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                        <span>Environmental responsibility</span>
                      </li>
                      <li className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                        <span>Customer satisfaction guarantee</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Area Card - positioned at bottom */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border-l-4 border-red-600">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Serving San Diego</h4>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    We proudly serve all of San Diego County with our mobile detailing services, bringing professional automotive care directly to your home or office.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
