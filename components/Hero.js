export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/heroVideo.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wide mb-4">
          <span className="block">PREMIUM AUTO</span>
          <span className="block text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl">DETAILING</span>
        </h1>

        {/* Sub-heading */}
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase mb-6">
          <span className="text-white block sm:inline">MOBILE SERVICE</span>
          <span className="text-red-500 block sm:inline sm:ml-2">& CERAMIC PROTECTION</span>
        </div>

        {/* Descriptive Text */}
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 space-y-2 max-w-4xl mx-auto">
          <p>Transform your vehicle with expert care and attention to detail</p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl">Convenient • Professional • Results that speak for themselves</p>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a
            href="tel:(760) 518-8451"
            className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center text-base sm:text-lg font-semibold transition-colors shadow-lg w-full sm:w-auto justify-center"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 011.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            GET QUOTE
          </a>
          <a
            href="#book"
            className="bg-white hover:bg-gray-100 text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold transition-colors shadow-lg w-full sm:w-auto"
          >
            BOOK NOW
          </a>
        </div>
      </div>

    </section>
  )
}
