import React from 'react'

export default function Pricing() {
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
      bestValue: false,
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
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gold text-white rounded-full text-sm font-semibold mb-6">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Choose Your Service
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Professional Auto Detailing
            <span className="block text-gold">Pricing Plans</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From quick refreshers to complete transformations - we have a service package designed to meet your vehicle's specific needs.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative group ${
                plan.popular 
                  ? '' 
                  : ''
              } ${
                plan.bestValue
                  ? ''
                  : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gold text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Best Value Badge */}
              {plan.bestValue && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gold text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Best Value
                  </div>
                </div>
              )}

              {/* Pricing Card */}
              <div className={`h-full bg-white border ${
                plan.popular || plan.bestValue 
                  ? 'border-gold' 
                  : 'border-gray-200'
              } rounded-2xl p-8 transition-all duration-300 group-hover:border-gold group-hover:shadow-2xl group-hover:shadow-gold/20 flex flex-col`}>
                
                {/* Plan Name & Description */}
                <div className="text-center mb-8 h-24 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8 h-20 flex items-center justify-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-black text-gold">{plan.price}</span>
                    {plan.priceNote && (
                      <span className="text-xl text-gray-500 ml-2">{plan.priceNote}</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-5 h-5 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm ml-3 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="text-center mt-auto">
                  <button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gold hover:bg-gold/90 text-white' 
                        : 'bg-transparent hover:bg-gold hover:text-white text-gold border-2 border-gold'
                    } font-bold py-4 px-6 rounded-xl transition-all duration-300 group-hover:scale-105`}
                  >
                    {plan.popular ? 'Choose Popular' : 'Select Plan'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Need a custom service? We're here to help create the perfect solution for your vehicle.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/contact"
              className="bg-gold hover:bg-gold/90 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Get Custom Quote
            </a>
            <a
              href="tel:(760) 518-8451"
              className="text-gold hover:text-white border border-gold hover:bg-gold px-8 py-3 rounded-lg transition-all duration-300"
            >
              Call (760) 518-8451
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}