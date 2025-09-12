'use client';

import React from 'react';
import Slider from 'react-slick';

// Import React Slick CSS files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PricingTable = () => {
  // React Slick configuration settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ]
  };

  // Pricing data array
  const pricingPlans = [
    {
      id: 1,
      name: "The Classic Wash",
      price: "$170",
      description: "Perfect for a quick, refreshing clean.",
      popular: false,
      features: [
        "Two stage hand wash (prewash, contact wash)",
        "Wheel cleaning, tires dressed",
        "Light interior vacuum",
        "Dashboard and console wipe down"
      ]
    },
    {
      id: 2,
      name: "The Sunset Shine",
      price: "$200",
      description: "Our most popular wash - a deeper clean with that SoCal sunset glow.",
      popular: true,
      features: [
        "Everything in the classic wash",
        "In depth interior vacuum and UV protectant wipe down (leather protection included)",
        "Door jambs cleaned",
        "Revitalizing Plastic dressing / protectant",
        "Spray wax added for shine & protection"
      ]
    },
    {
      id: 3,
      name: "The Hot Rod Detail",
      price: "$270",
      description: "Inspired by classic show cars - for when you want your ride to turn heads.",
      popular: false,
      features: [
        "Everything in the sunset shine",
        "Three step hand wash and wax (Pre-wash, contact wash, hydro foam with wax sealant)",
        "Detailed wheel & tire cleaning",
        "Full in depth interior vacuum, shampoo, leather reconditioning"
      ]
    },
    {
      id: 4,
      name: "Monthly Maintenance",
      price: "$120",
      priceNote: "/month",
      description: "Bi-weekly maintenance washes to keep your car pristine year-round.",
      popular: false,
      bestValue: true,
      features: [
        "2x Classic Wash per month",
        "Scheduled bi-weekly visits",
        "Priority scheduling",
        "10% discount on premium services",
        "Cancel anytime"
      ]
    }
  ];


  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            Choose Your Perfect Package
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From quick refreshes to show-quality details - find the perfect service for your classic car
          </p>
        </div>

        {/* React Slick Carousel */}
        <div className="pricing-carousel">
          <Slider {...sliderSettings}>
            {pricingPlans.map((plan) => (
              <div key={plan.id} className="px-3 h-full py-6">
                <div className={`relative bg-white rounded-xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-xl flex flex-col ${
                  plan.popular ? 'border-2 border-gold transform hover:scale-105' : 
                  plan.bestValue ? 'bg-gradient-to-br from-gold via-gold/95 to-gold text-white border-2 border-gold' : 
                  'border border-gray-200 hover:border-gold'
                }`}>
                  
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gold text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Best Value Badge */}
                  {plan.bestValue && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-white text-gold px-4 py-1 rounded-full text-sm font-semibold">
                        Best Value
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className={`text-2xl font-bold mb-2 ${plan.bestValue ? 'text-white' : 'text-black'}`}>
                      {plan.name}
                    </h3>
                    <div className={`text-4xl font-bold mb-4 ${plan.bestValue ? 'text-white' : 'text-gold'}`}>
                      {plan.price}
                      {plan.priceNote && (
                        <span className="text-lg font-normal">{plan.priceNote}</span>
                      )}
                    </div>
                    <p className={`text-sm ${plan.bestValue ? 'text-white/90' : 'text-gray-600'}`}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${plan.bestValue ? 'text-white' : 'text-gold'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className={`text-sm ${plan.bestValue ? 'text-white' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="text-center mt-auto">
                    <a
                      href="tel:(760) 518-8451"
                      className={`inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                        plan.bestValue
                          ? 'bg-white text-gold hover:bg-gray-100'
                          : 'bg-gold text-white hover:bg-gold/90'
                      }`}
                    >
                      {plan.id === 4 ? 'Subscribe Now' : 'Book Now'}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style jsx global>{`
        .pricing-carousel .slick-dots {
          bottom: -50px;
        }
        
        .pricing-carousel .slick-dots li button:before {
          color: #AF945B;
          font-size: 12px;
        }
        
        .pricing-carousel .slick-dots li.slick-active button:before {
          color: #AF945B;
        }
        
        .pricing-carousel .slick-prev,
        .pricing-carousel .slick-next {
          z-index: 1;
        }
        
        .pricing-carousel .slick-prev {
          left: -25px;
        }
        
        .pricing-carousel .slick-next {
          right: -25px;
        }
        
        .pricing-carousel .slick-prev:before,
        .pricing-carousel .slick-next:before {
          color: #AF945B;
          font-size: 20px;
        }

        /* Equal height cards */
        .pricing-carousel .slick-track {
          display: flex !important;
          align-items: stretch;
        }
        
        .pricing-carousel .slick-slide {
          height: auto;
          display: flex;
        }
        
        .pricing-carousel .slick-slide > div {
          height: 100%;
          display: flex;
        }

        @media (max-width: 600px) {
          .pricing-carousel .slick-dots {
            bottom: -40px;
          }
        }
      `}</style>
    </section>
  );
};

export default PricingTable;