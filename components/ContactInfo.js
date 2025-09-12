export default function ContactInfo() {
  return (
    <div className="space-y-4 sm:space-y-6 flex flex-col h-full">
      {/* Contact Details */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-black mb-6 sm:mb-8">Contact Information</h3>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Phone */}
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 011.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-black">Phone</h4>
              <p className="text-gray-600 text-sm sm:text-base">(760) 518-8451</p>
              <p className="text-xs sm:text-sm text-gray-600">Available 7 days a week</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-black">Address</h4>
              <p className="text-gray-600 text-sm sm:text-base">Vista, CA 92081</p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-black">Business Hours</h4>
              <p className="text-gray-600">Monday - Sunday</p>
              <p className="text-gray-600">8:00 AM - 6:00 PM</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-black">Email</h4>
              <p className="text-gray-600">info@sandiegoclassiccardetail.com</p>
              <p className="text-sm text-gray-600">We respond within 24 hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-black mb-6">Quick Actions</h3>
        
        <div className="space-y-4">
          <a
            href="tel:(760) 518-8451"
            className="flex items-center justify-center w-full bg-gold hover:bg-gold/90 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 011.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call Now: (760) 518-8451
          </a>
          
          <a
            href="/packages"
            className="flex items-center justify-center w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            View Our Packages
          </a>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-black mb-6">Follow Us</h3>
        
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <i className="bi bi-facebook text-xl"></i>
          </a>
          
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-colors duration-200"
          >
            <i className="bi bi-instagram text-xl"></i>
          </a>
          
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-gold hover:bg-gold/90 text-white rounded-lg transition-colors duration-200"
          >
            <i className="bi bi-youtube text-xl"></i>
          </a>
          
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors duration-200"
          >
            <i className="bi bi-tiktok text-xl"></i>
          </a>
        </div>
        
        <p className="text-sm text-gray-600 mt-4">
          Follow us for car care tips, before & after photos, and special offers!
        </p>
      </div>
    </div>
  )
}
