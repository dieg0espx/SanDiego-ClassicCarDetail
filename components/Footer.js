'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Company Info */}
          <motion.div 
            className="sm:col-span-2 lg:col-span-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="mb-4 sm:mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src="/logo.png"
                alt="San Diego Classic Auto Detail"
                width={280}
                height={98}
                className="h-12 sm:h-16 lg:h-20 xl:h-24 w-auto filter brightness-110"
              />
            </motion.div>
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base lg:text-lg">
              Professional mobile detailing services and ceramic coating specialists serving San Diego County. 
              We bring our expertise directly to your location for your convenience.
            </p>
            
            {/* Location */}
            <div className="flex items-center mb-4 sm:mb-6 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gold rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-white text-sm sm:text-base">Service Area</p>
                <p className="text-gray-300 text-xs sm:text-sm">Vista, CA 92081 & Surrounding Areas</p>
              </div>
            </div>

          </motion.div>

          {/* Services */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white relative">
              Our Services
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-8 sm:w-12 h-1 bg-gold rounded-full"></div>
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                'Exterior Detailing',
                'Interior Detailing', 
                'Ceramic Coating',
                'Paint Correction',
                'Fleet Services',
                'Mobile Service'
              ].map((service, index) => (
                <li key={index} className="group flex items-center text-gray-300 hover:text-white transition-colors duration-200">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gold rounded-full mr-2 sm:mr-3 group-hover:scale-125 transition-transform duration-200 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base hover:translate-x-1 transition-transform duration-200">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white relative">
              Contact & Hours
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-8 sm:w-12 h-1 bg-gold rounded-full"></div>
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="group flex items-start p-2 sm:p-3 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-all duration-300 border border-gray-700/30 hover:border-gold/30">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gold rounded-lg mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 011.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-sm sm:text-base">Call Now</p>
                  <a href="tel:7605188451" className="text-gold hover:text-white transition-colors font-medium text-sm sm:text-base">(760) 518-8451</a>
                </div>
              </div>
              
              <div className="group flex items-start p-2 sm:p-3 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-all duration-300 border border-gray-700/30 hover:border-gold/30">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gold rounded-lg mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-sm sm:text-base">Hours</p>
                  <p className="text-gray-300 text-sm sm:text-base">Open 7 Days a Week</p>
                </div>
              </div>
              
              <div className="group flex items-start p-2 sm:p-3 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-all duration-300 border border-gray-700/30 hover:border-gold/30">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gold rounded-lg mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-sm sm:text-base">Email</p>
                  <a href="mailto:SDclassicautodetail@outlook.com" className="text-gold hover:text-white transition-colors break-all text-xs sm:text-sm lg:text-base">SDclassicautodetail@outlook.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm text-center lg:text-left">
              © 2024 San Diego Classic Auto Detail. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-6">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline text-xs sm:text-sm">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline text-xs sm:text-sm">Terms of Service</Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline text-xs sm:text-sm">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
