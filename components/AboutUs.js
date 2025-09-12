'use client';

import { useState, useRef, useCallback } from 'react';

export default function AboutUs() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const updateSliderPosition = useCallback((e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
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

  return (
    <section id="about" className="py-16 relative bg-gray-50">
 
      {/* Content Overlay */}
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <span className="text-sm font-semibold text-gold uppercase tracking-wider mb-2 block">
              About Us
            </span>
          </div>
          <h2 className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl mb-4">
            San Diego Classic Auto Detail
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in automotive excellence, bringing over a decade of passion and expertise to every vehicle we touch.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Column - Before/After Image Slider */}
          <div 
            ref={containerRef}
            className="relative min-h-[500px] lg:min-h-[600px] rounded-2xl overflow-hidden shadow-lg select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
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
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            ></div>
            
            {/* Slider Handle */}
            <div 
              className="absolute top-1/2 z-20 cursor-grab active:cursor-grabbing"
              style={{ left: `${sliderPosition}%`, transform: 'translate(-50%, -50%)' }}
              onMouseDown={handleMouseDown}
            >
              <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gold">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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

          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 lg:space-y-8 flex flex-col justify-center">
            {/* Mission Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-gold">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-black mb-3">Our Mission</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    To provide exceptional automotive detailing services that exceed expectations while building lasting relationships with our customers through trust, quality, and convenience.
                  </p>
                </div>
              </div>
            </div>

            {/* Values Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-gold">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-black mb-3">Our Values</h4>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0"></div>
                      <span>Quality craftsmanship in every detail</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0"></div>
                      <span>Honest, transparent pricing</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0"></div>
                      <span>Environmental responsibility</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0"></div>
                      <span>Customer satisfaction guarantee</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Service Area Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-gold">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-black mb-3">Serving San Diego</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    We proudly serve all of San Diego County with our mobile detailing services, bringing professional automotive care directly to your home or office.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
