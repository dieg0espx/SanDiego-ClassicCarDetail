export default function Testimonials() {
  const testimonials = {
    testimonials: [
      {
        id: 1,
        name: "Mike Rodriguez",
        location: "La Jolla, CA",
        rating: 5,
        text: "Absolutely incredible service! My Tesla Model S has never looked better. The ceramic coating they applied is still protecting my paint after 6 months. Professional, punctual, and reasonably priced.",
        car: "Tesla Model S"
      },
      {
        id: 2,
        name: "Sarah Chen",
        location: "Del Mar, CA",
        rating: 5,
        text: "These guys are true professionals. They came to my house and transformed my BMW X5. The attention to detail is unmatched. I've recommended them to all my friends and family.",
        car: "BMW X5"
      },
      {
        id: 3,
        name: "David Thompson",
        location: "Encinitas, CA",
        rating: 5,
        text: "Best mobile detailing service in San Diego! They brought my Honda Civic back to life. The paint correction work was phenomenal. Worth every penny and then some.",
        car: "Honda Civic"
      },
      {
        id: 4,
        name: "Lisa Martinez",
        location: "Carlsbad, CA",
        rating: 5,
        text: "I was skeptical about mobile detailing, but these guys exceeded all expectations. My Mercedes-Benz S-Class looks showroom ready. They're now my go-to detailers for all my vehicles.",
        car: "Mercedes-Benz S-Class"
      },
      {
        id: 5,
        name: "Robert Kim",
        location: "Solana Beach, CA",
        rating: 5,
        text: "Outstanding work on my Toyota Camry! The ceramic coating application was flawless. They're knowledgeable, professional, and truly care about every vehicle. Highly recommended!",
        car: "Toyota Camry"
      },
      {
        id: 6,
        name: "Jennifer Walsh",
        location: "Rancho Santa Fe, CA",
        rating: 5,
        text: "San Diego Classic Auto Detail is simply the best. They treated my Range Rover with the care it deserves. The results speak for themselves - my car looks absolutely stunning.",
        car: "Range Rover"
      }
    ]
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Don't just take our word for it - hear from classic auto owners across San Diego County who trust us with their prized vehicles.
          </p>
        </div>

        {/* Auto-scrolling Testimonials */}
        <div className="relative overflow-hidden">
          {/* Fade overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
          
          {/* First Row - Scrolling Left */}
          <div className="flex animate-scroll-left mb-6 sm:mb-8">
            {[...testimonials.testimonials, ...testimonials.testimonials].map((testimonial, index) => (
              <div
                key={`left-${index}`}
                className="flex-shrink-0 w-72 sm:w-80 mx-2 sm:mx-4"
              >
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 h-full">
                  {/* Rating Stars */}
                  <div className="flex items-center mb-3 sm:mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 mb-4 sm:mb-6 italic text-xs sm:text-sm">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Car Information */}
                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm font-semibold text-gold uppercase tracking-wide">
                      {testimonial.car}
                    </p>
                  </div>

                  {/* Customer Info */}
                  <div className="border-t pt-3 sm:pt-4">
                    <p className="font-semibold text-black text-xs sm:text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row - Scrolling Right */}
          <div className="flex animate-scroll-right py-4 sm:py-6">
            {[...testimonials.testimonials, ...testimonials.testimonials].map((testimonial, index) => (
              <div
                key={`right-${index}`}
                className="flex-shrink-0 w-72 sm:w-80 mx-2 sm:mx-4"
              >
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 h-full">
                  {/* Rating Stars */}
                  <div className="flex items-center mb-3 sm:mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 mb-4 sm:mb-6 italic text-xs sm:text-sm">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Car Information */}
                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm font-semibold text-gold uppercase tracking-wide">
                      {testimonial.car}
                    </p>
                  </div>

                  {/* Customer Info */}
                  <div className="border-t pt-3 sm:pt-4">
                    <p className="font-semibold text-black text-xs sm:text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 px-4">
            Ready to experience the same level of care for your classic auto?
          </p>
          <a
            href="tel:(760) 518-8451"
            className="bg-gold hover:bg-gold text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors shadow-lg inline-block"
          >
            Get Your Quote Today
          </a>
        </div>
      </div>
    </section>
  );
}
