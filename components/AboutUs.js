'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function AboutUs() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const updateSliderPosition = useCallback((e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    // Handle both mouse and touch events
    const clientX = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX);
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(() => {
      setSliderPosition(percentage);
    });
  }, []);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    updateSliderPosition(e);
  }, [updateSliderPosition]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    updateSliderPosition(e);
  }, [isDragging, updateSliderPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch event handlers for mobile
  const handleTouchStart = useCallback((e) => {
    e.preventDefault(); // Prevent scrolling while dragging
    setIsDragging(true);
    updateSliderPosition(e);
  }, [updateSliderPosition]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent scrolling while dragging
    updateSliderPosition(e);
  }, [isDragging, updateSliderPosition]);

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <section id="about" className="py-16 relative bg-gray-50">
 
      {/* Content Overlay */}
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-gold uppercase tracking-wider mb-2 block">
              About Us
            </span>
          </motion.div>
          <motion.h2 
            className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            San Diego Classic Auto Detail
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gold mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          ></motion.div>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Your trusted partner in automotive excellence, bringing over a decade of passion and expertise to every vehicle we touch.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Column - Before/After Image Slider */}
          <motion.div 
            ref={containerRef}
            className="relative min-h-[500px] lg:min-h-[600px] rounded-2xl overflow-hidden shadow-lg select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Before Image (Background) */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(/dirty-porsche-interior.png)'
              }}
            ></div>
            
            {/* After Image (Overlay with clip-path) */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(/porsche-interior.jpg)',
                clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`
              }}
            ></div>
            
            {/* Slider Line */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            ></div>
            
            {/* Slider Handle */}
            <div 
              className="absolute top-1/2 z-20 cursor-grab active:cursor-grabbing"
              style={{ 
                left: `${sliderPosition}%`, 
                transform: 'translate(-50%, -50%)',
                willChange: 'transform'
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gold relative -left-[22px] md:left-0">
                {/* Center dot for better alignment reference */}
                <div className="absolute w-1 h-1 bg-gold rounded-full"></div>
                {/* Arrows */}
                <div className="flex items-center justify-center w-full h-full">
                  <svg className="w-3 h-3 text-gold mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  <svg className="w-3 h-3 text-gold ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Labels */}
            <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
              <span className="text-white font-bold text-sm">BEFORE</span>
            </div>
            <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
              <span className="text-white font-bold text-sm">AFTER</span>
            </div>

          </motion.div>

          {/* Right Column - Content */}
          <motion.div 
            className="space-y-6 lg:space-y-8 flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Mission Card */}
            <motion.div 
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-gold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="flex-shrink-0"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center shadow-sm">
                    <motion.svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </motion.svg>
                  </div>
                </motion.div>
                <div className="flex-1">
                  <motion.h4 
                    className="text-lg font-bold text-black mb-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    viewport={{ once: true }}
                  >
                    Our Mission
                  </motion.h4>
                  <motion.p 
                    className="text-gray-600 leading-relaxed text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    viewport={{ once: true }}
                  >
                    To provide exceptional automotive detailing services that exceed expectations while building lasting relationships with our customers through trust, quality, and convenience.
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Values Card */}
            <motion.div 
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-gold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="flex-shrink-0"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center shadow-sm">
                    <motion.svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </motion.svg>
                  </div>
                </motion.div>
                <div className="flex-1">
                  <motion.h4 
                    className="text-lg font-bold text-black mb-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    viewport={{ once: true }}
                  >
                    Our Values
                  </motion.h4>
                  <motion.ul 
                    className="text-gray-600 space-y-2 text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    {[
                      "Quality craftsmanship in every detail",
                      "Honest, transparent pricing",
                      "Environmental responsibility",
                      "Customer satisfaction guarantee"
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 1.6 + (index * 0.1) }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 1.8 + (index * 0.1) }}
                          viewport={{ once: true }}
                        ></motion.div>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>

            {/* Service Area Card */}
            <motion.div 
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-gold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="flex-shrink-0"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center shadow-sm">
                    <motion.svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1.4 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </motion.svg>
                  </div>
                </motion.div>
                <div className="flex-1">
                  <motion.h4 
                    className="text-lg font-bold text-black mb-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    Serving San Diego
                  </motion.h4>
                  <motion.p 
                    className="text-gray-600 leading-relaxed text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                    viewport={{ once: true }}
                  >
                    We proudly serve all of San Diego County with our mobile detailing services, bringing professional automotive care directly to your home or office.
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  )
}
