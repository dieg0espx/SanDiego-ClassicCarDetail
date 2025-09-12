import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo.png"
                alt="San Diego Classic Auto Detail"
                width={280}
                height={98}
                className="h-16 sm:h-20 lg:h-24 w-auto filter brightness-110"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-base sm:text-lg">
              Professional mobile detailing services and ceramic coating specialists serving San Diego County. 
              We bring our expertise directly to your location for your convenience.
            </p>
            
            {/* Location */}
            <div className="flex items-center mb-6 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center justify-center w-10 h-10 bg-gold rounded-lg mr-4">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">Service Area</p>
                <p className="text-gray-300 text-sm">Vista, CA 92081 & Surrounding Areas</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a href="#" className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 hover:bg-gold rounded-lg transition-all duration-300 transform hover:scale-110">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 hover:bg-gold rounded-lg transition-all duration-300 transform hover:scale-110">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 hover:bg-gold rounded-lg transition-all duration-300 transform hover:scale-110">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 hover:bg-gold rounded-lg transition-all duration-300 transform hover:scale-110">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white relative">
              Our Services
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gold rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {[
                'Exterior Detailing',
                'Interior Detailing', 
                'Ceramic Coating',
                'Paint Correction',
                'Fleet Services',
                'Mobile Service'
              ].map((service, index) => (
                <li key={index} className="group flex items-center text-gray-300 hover:text-white transition-colors duration-200">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="hover:translate-x-1 transition-transform duration-200">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white relative">
              Contact & Hours
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gold rounded-full"></div>
            </h4>
            <div className="space-y-4">
              <div className="group flex items-start p-3 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-all duration-300 border border-gray-700/30 hover:border-gold/30">
                <div className="flex items-center justify-center w-10 h-10 bg-gold rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 011.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-white">Call Now</p>
                  <a href="tel:7605188451" className="text-gold hover:text-white transition-colors font-medium">(760) 518-8451</a>
                </div>
              </div>
              
              <div className="group flex items-start p-3 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-all duration-300 border border-gray-700/30 hover:border-gold/30">
                <div className="flex items-center justify-center w-10 h-10 bg-gold rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-white">Hours</p>
                  <p className="text-gray-300">Open 7 Days a Week</p>
                </div>
              </div>
              
              <div className="group flex items-start p-3 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-all duration-300 border border-gray-700/30 hover:border-gold/30">
                <div className="flex items-center justify-center w-10 h-10 bg-gold rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <a href="mailto:SDclassicautodetail@outlook.com" className="text-gold hover:text-white transition-colors break-all">SDclassicautodetail@outlook.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 San Diego Classic Auto Detail. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline">Privacy Policy</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline">Terms of Service</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
