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
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wide mb-4">
          <span className="block">SAN DIEGO CLASSIC</span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">CAR DETAIL</span>
        </h1>

        {/* Sub-heading */}
        <div className="text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-6">
          <span className="text-white">&</span>
          <span className="text-red-500 ml-2">CERAMIC COATING SPECIALISTS</span>
        </div>

        {/* Descriptive Text */}
        <div className="text-lg sm:text-xl md:text-2xl mb-8 space-y-2">
          <p>Professional mobile detailing service at your doorstep</p>
          <p>Available 7 days a week • Serving all of San Diego County</p>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a
            href="tel:(619) 745-4634"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg flex items-center text-lg font-semibold transition-colors shadow-lg"
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 011.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            CALL NOW
          </a>
          <a
            href="#book"
            className="bg-white hover:bg-gray-100 text-red-600 px-8 py-4 rounded-lg text-lg font-bold transition-colors shadow-lg"
          >
            SCHEDULE SERVICE
          </a>
        </div>
      </div>

      {/* Decorative Element - Simulated gloved hand with microfiber towel */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-30">
        <div className="relative">
          {/* Gloved hand */}
          <div className="w-16 h-20 bg-blue-900 rounded-full transform rotate-12"></div>
          {/* Microfiber towel */}
          <div className="absolute -top-2 -right-2 w-12 h-8 bg-yellow-400 rounded-lg transform rotate-45"></div>
        </div>
      </div>
    </section>
  )
}
