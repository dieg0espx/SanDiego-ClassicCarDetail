'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function WhyChooseUs() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const images = [
    "/bmw-suv.jpg",
    "/warehouse-bg.png"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length)
        setIsTransitioning(false)
      }, 300) // Half of transition duration for smooth effect
    }, 3000) // Increased to 3 seconds for better viewing

    return () => clearInterval(interval)
  }, [images.length])
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Centered */}
        <motion.div 
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center px-3 sm:px-4 py-2 bg-gold text-white rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.svg 
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </motion.svg>
            Trusted by 500+ Customers
          </motion.div>
          <motion.h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Why Choose San Diego Classic Auto Detail?
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            We're not just another detailing service. We're passionate professionals dedicated to bringing your vehicle back to showroom condition with unmatched expertise and care.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Content */}
          <div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8">
              {/* Professional Expertise */}
              <motion.div 
                className="group flex items-center gap-4 p-6 sm:p-8 border border-gray-700 rounded-xl hover:border-gold transition-colors duration-300"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <motion.div 
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gold to-gold rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  viewport={{ once: true }}
                >
                  <motion.svg 
                    className="w-6 h-6 sm:w-8 sm:h-8 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </motion.svg>
                </motion.div>
                <div>
                  <motion.h3 
                    className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-gold transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    viewport={{ once: true }}
                  >
                    Professional Expertise
                  </motion.h3>
                  <motion.p 
                    className="text-gray-300 leading-relaxed text-sm sm:text-base"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    Over 10 years of experience in automotive detailing with specialized training in ceramic coating and paint correction techniques.
                  </motion.p>
                </div>
              </motion.div>

              {/* Mobile Convenience */}
              <motion.div 
                className="group flex items-center gap-4 p-6 sm:p-8 border border-gray-700 rounded-xl hover:border-gold transition-colors duration-300"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <motion.div 
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gold to-gold rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  viewport={{ once: true }}
                >
                  <motion.svg 
                    className="w-6 h-6 sm:w-8 sm:h-8 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </motion.svg>
                </motion.div>
                <div>
                  <motion.h3 
                    className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-gold transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    Mobile Convenience
                  </motion.h3>
                  <motion.p 
                    className="text-gray-300 leading-relaxed text-sm sm:text-base"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                    viewport={{ once: true }}
                  >
                    We come to you! Save time and hassle with our fully-equipped mobile service that brings professional detailing to your location.
                  </motion.p>
                </div>
              </motion.div>

              {/* Premium Products */}
              <motion.div 
                className="group flex items-center gap-4 p-6 sm:p-8 border border-gray-700 rounded-xl hover:border-gold transition-colors duration-300"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <motion.div 
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gold to-gold rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  viewport={{ once: true }}
                >
                  <motion.svg 
                    className="w-6 h-6 sm:w-8 sm:h-8 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.6 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </motion.svg>
                </motion.div>
                <div>
                  <motion.h3 
                    className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-gold transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                    viewport={{ once: true }}
                  >
                    Premium Products
                  </motion.h3>
                  <motion.p 
                    className="text-gray-300 leading-relaxed text-sm sm:text-base"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                    viewport={{ once: true }}
                  >
                    We use only the highest quality, professional-grade products and equipment to ensure exceptional results that last.
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px] lg:h-[600px]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="/warehouse-bg.png" 
                alt="Classic cars at sunset" 
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Badges */}
              {/* Top Left Badge */}
              <motion.div 
                className="absolute top-6 left-6"
                initial={{ opacity: 0, scale: 0, x: -50, y: -50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/95 backdrop-blur-sm border border-gold/30 rounded-xl p-4 shadow-lg max-w-xs">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Service Guaranteed</p>
                      <p className="text-gray-600 text-xs">100% Satisfaction</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Right Badge */}
              <motion.div 
                className="absolute bottom-6 right-6"
                initial={{ opacity: 0, scale: 0, x: 50, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/95 backdrop-blur-sm border border-gold/30 rounded-xl p-4 pr-10 shadow-lg max-w-xs">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 2.2 }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </motion.div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Mobile Service</p>
                      <p className="text-gray-600 text-xs">We come to you</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
