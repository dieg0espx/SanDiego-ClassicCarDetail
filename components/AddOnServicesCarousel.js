'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function AddOnServicesCarousel() {
  const addOnServices = [
    {
      title: "Excessive Mud or Off-road Dirt",
      price: "$20-50",
      description: "Deep cleaning for heavily soiled vehicles",
      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    },
    {
      title: "Heavy Pet Hair Removal",
      price: "$25-50",
      description: "Specialized tools for stubborn pet hair",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    },
    {
      title: "Deeply Stained Carpets/Seats",
      price: "$30-60",
      description: "Professional stain removal and deep cleaning",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    },
    {
      title: "Excessive Sand",
      price: "$20-40",
      description: "Thorough sand removal from all surfaces",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
      title: "Mold or Foul Odor Treatment",
      price: "Quote after inspection",
      description: "Specialized treatment for odor and mold issues",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    },
    {
      title: "Headlight Restoration",
      price: "$150-250",
      description: "Professional headlight restoration to crystal clear visibility",
      icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    }
  ]

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }

  return (
    <div className="px-4">
      {/* Desktop/Tablet Slider */}
      <div className="hidden md:block">
        <Slider {...sliderSettings}>
          {addOnServices.map((service, index) => (
            <div key={index} className="p-6">
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-[400px] group hover:-translate-y-1 flex flex-col">
                {/* Icon Section */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                    </svg>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="text-center h-[280px] flex flex-col">
                  <h3 className="text-xl font-bold text-black mb-4 leading-tight h-[4rem] flex items-center justify-center">
                    {service.title}
                  </h3>
                  
                  <div className="mb-4 h-[4rem]">
                    <div className={`font-bold text-gold ${service.price.includes('Quote') ? 'text-2xl' : 'text-4xl'}`}>
                      {service.price}
                    </div>
                    {!service.price.includes('Quote') && (
                      <div className="text-sm text-gray-600 mt-1">Additional fee</div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed h-[100px] flex items-center justify-center">
                    {service.description}
                  </p>
                </div>
                
                {/* Decorative Element */}
                <div className="mt-6 flex justify-center">
                  <div className="w-12 h-1 bg-gold rounded-full group-hover:bg-gold/80 transition-colors duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Mobile Layout - Each service on its own row */}
      <div className="md:hidden space-y-4">
        {addOnServices.map((service, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center space-x-4">
              {/* Icon Section */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                  </svg>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-black mb-2 leading-tight">
                  {service.title}
                </h3>
                
                <div className="mb-2">
                  <div className={`font-bold text-gold ${service.price.includes('Quote') ? 'text-lg' : 'text-xl'}`}>
                    {service.price}
                  </div>
                  {!service.price.includes('Quote') && (
                    <div className="text-xs text-gray-600">Additional fee</div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
