export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-20px)] flex items-center justify-center overflow-hidden rounded-b-[40px] -mt-[80px]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover animate-pulse-slow"
      >
        <source src="https://res.cloudinary.com/dku1gnuat/video/upload/v1757438619/Untitled_design_4_uei0ec.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        {/* <div className="inline-flex items-center bg-red-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-red-500/30">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          San Diego's Premier Mobile Detailing
        </div> */}

        {/* Main Heading */}
        <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight mb-6 leading-tight">
          <span className="inline text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-slide-up-delay-1">
            PRECISION
          </span>
          <span className="inline text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-red-500 font-bold ml-2 animate-slide-up-delay-2">
            DETAILING
          </span>
        </h1>

        {/* Sub-heading */}
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 animate-fade-in-delay-3">
          <span className="text-white block animate-slide-up-delay-3">Where Every Detail</span>
          <span className="text-red-500 block animate-slide-up-delay-4">Matters</span>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium animate-bounce-in-delay-5 hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-default">
            ✨ Ceramic Coating
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium animate-bounce-in-delay-6 hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-default">
            🚗 Mobile Service
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium animate-bounce-in-delay-7 hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-default">
            ⭐ 5-Star Rated
          </div>
        </div>

        {/* Descriptive Text */}
        <div className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay-8">
          <p className="mb-3 animate-slide-up-delay-8">Professional automotive care that comes to you</p>
          <p className="text-base sm:text-lg text-gray-300 animate-slide-up-delay-9">Experience the difference of showroom-quality detailing in the comfort of your own space</p>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-delay-10">
          <a
            href="tel:(760) 518-8451"
            className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl flex items-center text-lg sm:text-xl font-bold transition-all duration-500 shadow-2xl hover:shadow-red-500/25 w-full sm:w-auto justify-center transform hover:scale-110 hover:-translate-y-1 animate-slide-up-delay-10"
          >
            <svg className="w-6 h-6 mr-3 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 011.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call Now
          </a>
          <a
            href="/contact"
            className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-bold transition-all duration-500 shadow-lg w-full sm:w-auto transform hover:scale-110 hover:-translate-y-1 animate-slide-up-delay-11"
          >
            Get Free Quote
            <svg className="w-5 h-5 ml-2 inline group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-300 animate-fade-in-delay-12">
          <div className="flex items-center animate-float-delay-12 hover:scale-110 transition-all duration-300 cursor-default">
            <svg className="w-5 h-5 text-yellow-400 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            500+ Happy Customers
          </div>
          <div className="flex items-center animate-float-delay-13 hover:scale-110 transition-all duration-300 cursor-default">
            <svg className="w-5 h-5 text-green-400 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Insured & Licensed
          </div>
          <div className="flex items-center animate-float-delay-14 hover:scale-110 transition-all duration-300 cursor-default">
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
