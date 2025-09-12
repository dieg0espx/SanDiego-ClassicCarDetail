'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check if we're on the home page
  const isHomePage = pathname === '/'
  
  // Determine header background class
  const headerBgClass = isHomePage && !isScrolled 
    ? 'bg-transparent' 
    : 'bg-black/80 backdrop-blur-md border-b border-white/10'

  return (
    <>
      {/* Top Information Bar */}
      <div className="bg-gold text-white shadow-lg">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-xs sm:text-sm">
            {/* Location - Left */}
            <div className="flex items-center group">
              <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full mr-2 group-hover:bg-white/30 transition-colors">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium">Vista, CA 92081</span>
            </div>

            {/* Phone - Center */}
            <div className="flex items-center group">
              <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full mr-2 group-hover:bg-white/30 transition-colors">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 011.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div className="flex items-center">
                <span className="text-xs opacity-90 hidden sm:inline mr-2">Fleet Services:</span>
                <span className="text-xs opacity-90 sm:hidden mr-2">Fleet:</span>
                <a href="tel:+17605188451" className="font-semibold hover:text-yellow-200 transition-colors">
                  (760) 518-8451
                </a>
              </div>
            </div>

            {/* Hours - Right */}
            <div className="flex items-center group">
              <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full mr-2 group-hover:bg-white/30 transition-colors">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium">Open 7 Days: 8AM-6PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className={`${headerBgClass} text-white sticky top-0 z-50 transition-colors duration-300`}>
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="San Diego Classic Auto Detail"
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
              <a href="#quote" className="bg-white hover:bg-gray-100 text-gold font-bold px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <i className="bi bi-calendar-check"></i>
                <span>Book Now</span>
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
              <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${isHomePage && !isScrolled ? 'bg-black/20 backdrop-blur-md border border-white/10' : 'bg-gray-800/20 backdrop-blur-md border border-white/10'} rounded-lg mt-2`}>
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
                  className="block px-3 py-2 rounded-md text-base font-medium bg-white text-gold hover:bg-gray-100 transition-colors text-center font-bold flex items-center justify-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="bi bi-calendar-check"></i>
                  <span>REQUEST QUOTE</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
