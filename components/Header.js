'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* Top Information Bar */}
      <div className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-2 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Vista, CA 92081</span>
              </div>
              <div className="flex items-center">
                <span className="hidden sm:inline">For Fleet Services Call:</span>
                <span className="sm:hidden">Fleet:</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 011.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>(760) 518-8451</span>
              </div>
              <div className="flex items-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Open 7 Days a Week</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="bg-gray-900 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="San Diego Classic Car Detail"
                width={200}
                height={60}
                className="h-12 sm:h-16 w-auto"
              />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="hover:text-gray-300 transition-colors">Home</a>
              <a href="/services" className="hover:text-gray-300 transition-colors">Services</a>
              <a href="/packages" className="hover:text-gray-300 transition-colors">Packages</a>
              <a href="/contact" className="hover:text-gray-300 transition-colors">Contact</a>
            </nav>

            {/* Desktop Call-to-Action Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <a href="#quote" className="bg-white hover:bg-gray-100 text-red-600 font-bold px-6 py-2 rounded-lg transition-colors">
                REQUEST QUOTE
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-lg mt-2">
                <a
                  href="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="/services"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </a>
                <a
                  href="/packages"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Packages
                </a>
                <a
                  href="/contact"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
                <a
                  href="#quote"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-white text-red-600 hover:bg-gray-100 transition-colors text-center font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  REQUEST QUOTE
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
