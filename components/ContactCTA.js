export default function ContactCTA() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Schedule your mobile detailing service today. We come to you with professional equipment and years of experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">Get In Touch</h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center group">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gold rounded-xl flex items-center justify-center group-hover:bg-gold/90 transition-colors">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Phone</p>
                  <a href="tel:(760) 518-8451" className="text-base sm:text-lg font-semibold text-black hover:text-gold transition-colors">
                    (760) 518-8451
                  </a>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gold rounded-xl flex items-center justify-center group-hover:bg-gold/90 transition-colors">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Email</p>
                  <a href="mailto:SDclassicautodetail@outlook.com" className="text-sm sm:text-base lg:text-lg font-semibold text-black hover:text-gold transition-colors break-all">
                    SDclassicautodetail@outlook.com
                  </a>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gold rounded-xl flex items-center justify-center group-hover:bg-gold/90 transition-colors">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Location</p>
                  <p className="text-base sm:text-lg font-semibold text-black">
                    Vista, CA 92081
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-black mb-6">Service Areas</h3>
            <p className="text-gray-600 mb-4">We proudly serve Vista, Oceanside, Carlsbad, and surrounding areas throughout San Diego County including:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                <span className="text-gray-700">Vista</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                <span className="text-gray-700">Oceanside</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                <span className="text-gray-700">Carlsbad</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                <span className="text-gray-700">San Marcos</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                <span className="text-gray-700">Escondido</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                <span className="text-gray-700">Poway</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                <span className="text-gray-700">Encinitas</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                <span className="text-gray-700">Solana Beach</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                <span className="text-gray-700">Del Mar</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                <span className="text-gray-700">La Jolla</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                <span className="text-gray-700">Rancho Santa Fe</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                <span className="text-gray-700">San Diego</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4 italic">And many more areas throughout San Diego County</p>
          </div>

          {/* Main Call to Action */}
          <div className="bg-gradient-to-br from-gold to-gold rounded-2xl shadow-xl p-6 sm:p-8 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white opacity-10 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-white opacity-10 rounded-full translate-y-10 sm:translate-y-12 -translate-x-10 sm:-translate-x-12"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Schedule Your Service</h3>
                <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Available 7 days a week throughout San Diego County. Get a personalized quote and book your appointment today.
                </p>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <a
                  href="tel:(760) 518-8451"
                  className="w-full bg-white text-gold hover:bg-gray-100 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-base sm:text-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 011.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call Now
                </a>
                
                <a
                  href="mailto:SDclassicautodetail@outlook.com"
                  className="w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-gold font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-base sm:text-lg transition-all duration-300 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </a>
              </div>
            </div>
          </div>

          {/* Service Hours */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <h4 className="text-2xl font-bold text-black mb-6">Service Hours</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700 font-medium">Monday - Friday</span>
                <span className="font-bold text-black">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700 font-medium">Saturday</span>
                <span className="font-bold text-black">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-700 font-medium">Sunday</span>
                <span className="font-bold text-black">10:00 AM - 4:00 PM</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gold rounded-xl">
              <p className="text-sm text-white font-medium">
                <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Emergency services available outside normal hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
