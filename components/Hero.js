export default function Hero() {
  return (
    <section className="relative h-[calc(100vh+120px)] sm:h-[calc(100vh+120px)] flex items-center justify-center overflow-hidden rounded-b-[40px] -mt-[120px] w-full">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://res.cloudinary.com/dku1gnuat/video/upload/v1757677265/Untitled_design_5_v03wjj.mp4" type="video/mp4" />
      </video>

      {/* Palm trees overlay */}
      {/* <div className="absolute inset-0">
        <img 
          src="/palmtrees.png" 
          alt="Palm trees" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </div> */}

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 pt-32 sm:pt-16 w-full max-w-full">
        {/* Badge */}
        {/* <div className="inline-flex items-center bg-gold/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-gold/30">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          San Diego's Premier Mobile Detailing
        </div> */}

        {/* Main Heading */}
        <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight mb-4 sm:mb-6 leading-tight">
          <span className="inline text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-slide-up-delay-1">
            PRECISION
          </span>
          <span className="inline text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-gold font-bold ml-1 sm:ml-2 animate-slide-up-delay-2">
            DETAILING
          </span>
        </h1>

        {/* Sub-heading */}
        <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 animate-fade-in-delay-3">
          <span className="text-white block animate-slide-up-delay-3">Where Every Detail</span>
          <span className="text-gold block animate-slide-up-delay-4">Matters</span>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium animate-bounce-in-delay-5 hover:bg-white/20 sm:hover:scale-110 transition-all duration-300 cursor-default">
            ✨ Ceramic Coating
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium animate-bounce-in-delay-6 hover:bg-white/20 sm:hover:scale-110 transition-all duration-300 cursor-default">
            🚗 Mobile Service
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium animate-bounce-in-delay-7 hover:bg-white/20 sm:hover:scale-110 transition-all duration-300 cursor-default">
            ⭐ 5-Star Rated
          </div>
        </div>

        {/* Descriptive Text */}
        <div className="text-base sm:text-xl md:text-2xl mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay-8">
          <p className="mb-2 sm:mb-3 animate-slide-up-delay-8">Professional automotive care that comes to you</p>
          <p className="text-sm sm:text-lg text-gray-300 animate-slide-up-delay-9">Experience the difference of showroom-quality detailing in the comfort of your own space</p>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 animate-fade-in-delay-10">
          <a
            href="tel:(760) 518-8451"
            className="text-gold hover:text-white border border-gold/50 hover:border-gold hover:bg-gold/10 px-5 py-2 rounded-md text-sm font-normal transition-all duration-200 w-full sm:w-auto text-center animate-slide-up-delay-10"
          >
            Call Now
          </a>
          <a
            href="/contact"
            className="text-white hover:text-gold border border-white/30 hover:border-white/60 px-5 py-2 rounded-md text-sm font-normal transition-all duration-200 w-full sm:w-auto text-center animate-slide-up-delay-11"
          >
            Get Free Quote
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm text-gray-300 animate-fade-in-delay-12">
          <div className="flex items-center animate-float-delay-12 sm:hover:scale-110 transition-all duration-300 cursor-default">
            <svg className="w-5 h-5 text-yellow-400 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            500+ Happy Customers
          </div>
          <div className="flex items-center animate-float-delay-13 sm:hover:scale-110 transition-all duration-300 cursor-default">
            <svg className="w-5 h-5 text-green-400 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Insured & Licensed
          </div>
          <div className="flex items-center animate-float-delay-14 sm:hover:scale-110 transition-all duration-300 cursor-default">
            <svg className="w-5 h-5 text-blue-400 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Same Day Service
          </div>
        </div>
      </div>

    </section>
  )
}
