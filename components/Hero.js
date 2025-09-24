'use client'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh+120px)] sm:h-[calc(100vh+120px)] flex items-center justify-center overflow-hidden rounded-b-[40px] -mt-20  w-full">
      {/* Background Video */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <source src="https://res.cloudinary.com/dku1gnuat/video/upload/v1757677265/Untitled_design_5_v03wjj.mp4" type="video/mp4" />
      </motion.video>

      {/* Palm trees overlay */}
      {/* <div className="absolute inset-0">
        <img 
          src="/palmtrees.png" 
          alt="Palm trees" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </div> */}

      {/* Dark overlay for better text readability */}
      <motion.div 
        className="absolute inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      ></motion.div>

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
        <motion.h1 
          className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight mb-4 sm:mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.span 
            className="inline text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            PRECISION
          </motion.span>
          <motion.span 
            className="inline text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-gold font-bold ml-1 sm:ml-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            DETAILING
          </motion.span>
        </motion.h1>

        {/* Sub-heading */}
        <motion.div 
          className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.span 
            className="text-white block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            Where Every Detail
          </motion.span>
          <motion.span 
            className="text-gold block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            Matters
          </motion.span>
        </motion.div>

        {/* Feature Pills */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium hover:bg-white/20 sm:hover:scale-110 transition-all duration-300 cursor-default"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✨ Ceramic Coating
          </motion.div>
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium hover:bg-white/20 sm:hover:scale-110 transition-all duration-300 cursor-default"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🚗 Mobile Service
          </motion.div>
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium hover:bg-white/20 sm:hover:scale-110 transition-all duration-300 cursor-default"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⭐ 5-Star Rated
          </motion.div>
        </motion.div>

        {/* Descriptive Text */}
        <motion.div 
          className="text-base sm:text-xl md:text-2xl mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          <motion.p 
            className="mb-2 sm:mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3 }}
          >
            Professional automotive care that comes to you
          </motion.p>
          <motion.p 
            className="text-sm sm:text-lg text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.2 }}
          >
            Experience the difference of showroom-quality detailing in the comfort of your own space
          </motion.p>
        </motion.div>

        {/* Call-to-Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.4 }}
        >
          <motion.a
            href="tel:(760) 518-8451"
            className="text-gold hover:text-white border border-gold/50 hover:border-gold hover:bg-gold/10 px-5 py-2 rounded-md text-sm font-normal transition-all duration-200 w-full sm:w-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Call Now
          </motion.a>
          <motion.a
            href="/contact"
            className="text-white hover:text-gold border border-white/30 hover:border-white/60 px-5 py-2 rounded-md text-sm font-normal transition-all duration-200 w-full sm:w-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Free Quote
          </motion.a>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 4 }}
        >
          <motion.div 
            className="flex items-center sm:hover:scale-110 transition-all duration-300 cursor-default"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 4.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.svg 
              className="w-5 h-5 text-yellow-400 mr-2" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 4.2 }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
            500+ Happy Customers
          </motion.div>
          <motion.div 
            className="flex items-center sm:hover:scale-110 transition-all duration-300 cursor-default"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 4.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.svg 
              className="w-5 h-5 text-gold mr-2" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 4.4 }}
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </motion.svg>
            Insured & Licensed
          </motion.div>
          <motion.div 
            className="flex items-center sm:hover:scale-110 transition-all duration-300 cursor-default"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 4.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.svg 
              className="w-5 h-5 text-gold mr-2" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 4.6 }}
            >
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </motion.svg>
            Same Day Service
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
