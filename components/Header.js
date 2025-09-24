'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import AuthModal from './auth/AuthModal'
import CartModal from './cart/CartModal'
import { FiShoppingCart } from 'react-icons/fi'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const pathname = usePathname()
  const { user, signOut, loading } = useAuth()
  const { getItemCount } = useCart()

  // Debug logging
  useEffect(() => {
    console.log('Header - User state:', user?.email || 'No user', 'Loading:', loading)
  }, [user, loading])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSignOut = async () => {
    await signOut()
    setShowUserMenu(false)
  }

  const getUserDisplayName = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
    }
    return user?.email || 'User'
  }

  const getUserPhone = () => {
    return user?.user_metadata?.phone || ''
  }

  const getUserEmail = () => {
    return user?.email || ''
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrolled = scrollTop > 50
      setIsScrolled(scrolled)
      
      // Add/remove body class for CSS targeting
      if (scrolled) {
        document.body.classList.add('scrolled')
      } else {
        document.body.classList.remove('scrolled')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.classList.remove('scrolled')
    }
  }, [])

  // Check if we're on the home page
  const isHomePage = pathname === '/'
  
  // Determine header background class
  const headerBgClass = isHomePage && !isScrolled 
    ? 'bg-black/30 backdrop-blur-md border-b border-white/10' 
    : 'bg-black/90 backdrop-blur-md border-b border-white/10'

  // Debug logging
  console.log('Header Debug:', { isHomePage, isScrolled, headerBgClass })

  return (
    <>
      {/* Top Information Bar - Desktop Only */}
      <div className="bg-gold text-white shadow-lg hidden sm:block w-full">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout - Horizontal */}
          <div className="flex items-center justify-between py-2 text-sm">
            {/* Location - Left */}
            <div className="flex items-center group">
              <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full mr-2 sm:group-hover:bg-white/30 transition-colors">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium">Vista, CA 92081</span>
            </div>

            {/* Phone - Center */}
            <div className="flex items-center group">
              <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full mr-2 sm:group-hover:bg-white/30 transition-colors">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 011.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div className="flex items-center">
                <span className="text-sm opacity-90 mr-2">Fleet Services:</span>
                <a href="tel:+17605188451" className="font-semibold hover:text-yellow-200 transition-colors">
                  (760) 518-8451
                </a>
              </div>
            </div>

            {/* Hours - Right */}
            <div className="flex items-center group">
              <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full mr-2 sm:group-hover:bg-white/30 transition-colors">
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
      <header 
        className="text-white sticky top-0 z-50 transition-all duration-300 w-full"
        style={isHomePage && !isScrolled 
          ? { 
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(8px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
            } 
          : { 
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }
        }
      >
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-2">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="block hover:opacity-90 transition-opacity duration-200">
                <Image
                  src="/logo.png"
                  alt="San Diego Classic Auto Detail"
                  width={200}
                  height={60}
                  className="h-10 sm:h-12 lg:h-16 w-auto"
                />
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="hover:text-gray-300 transition-colors">Home</a>
              <a href="/services" className="hover:text-gray-300 transition-colors">Services</a>
              <a href="/packages" className="hover:text-gray-300 transition-colors">Packages</a>
              <a href="/contact" className="hover:text-gray-300 transition-colors">Contact</a>
            </nav>

            {/* Desktop Call-to-Action Button & Auth */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {getUserDisplayName().charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden xl:block">{getUserDisplayName()}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <div className="font-medium">{getUserDisplayName()}</div>
                        {getUserEmail() && (
                          <div className="text-xs text-gray-500 mt-1">{getUserEmail()}</div>
                        )}
                      </div>
                      {(user?.user_metadata?.role === 'admin' || getUserEmail() === 'admin@test.com') ? (
                        // Admin menu - only admin dashboard and sign out
                        <>
                          <a
                            href="/admin"
                            className="block w-full text-left px-4 py-2 text-sm text-gold hover:bg-gray-100 transition-colors font-medium"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Admin Dashboard
                          </a>
                          <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            Sign Out
                          </button>
                        </>
                      ) : (
                        // Regular user menu
                        <>
                          <a
                            href="/dashboard"
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Go to Dashboard
                          </a>
                          <a
                            href="/profile"
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Edit Profile
                          </a>
                          <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            Sign Out
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="hidden xl:block">Sign In</span>
                </button>
              )}
              {/* Cart Icon */}
              <button
                onClick={() => setShowCartModal(true)}
                className="relative text-white hover:text-gray-300 transition-colors"
              >
                <FiShoppingCart className="w-6 h-6" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getItemCount()}
                  </span>
                )}
              </button>
              <a href="#quote" className="bg-white hover:bg-gray-100 text-gold font-bold px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <i className="bi bi-calendar-check"></i>
                <span>Book Now</span>
              </a>
            </div>

            {/* Mobile Cart Icon & Menu Button */}
            <div className="lg:hidden flex items-center space-x-1">
              {/* Mobile Cart Icon */}
              <button
                onClick={() => setShowCartModal(true)}
                className="relative p-2 rounded-md text-white hover:text-gray-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
              >
                <FiShoppingCart className="w-5 h-5" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {getItemCount()}
                  </span>
                )}
              </button>

              {/* Mobile Auth Button (if not logged in) */}
              {!user && (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="p-2 rounded-md text-white hover:text-gray-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-white hover:text-gray-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
                aria-expanded={isMenuOpen}
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
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${isHomePage && !isScrolled ? 'bg-black/30 backdrop-blur-md border border-white/20' : 'bg-black/50 backdrop-blur-md border border-white/20'} rounded-lg mt-2 shadow-lg`}>
                <a
                  href="/"
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="/services"
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </a>
                <a
                  href="/packages"
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Packages
                </a>
                <a
                  href="/contact"
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>

                {/* Mobile Auth */}
                {user ? (
                  <div className="border-t border-white/20 pt-3 mt-3">
                    <div className="px-3 py-2 text-white">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {getUserDisplayName().charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{getUserDisplayName()}</div>
                          {getUserEmail() && (
                            <div className="text-xs opacity-75">{getUserEmail()}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    {(user?.user_metadata?.role === 'admin' || getUserEmail() === 'admin@test.com') ? (
                      // Admin menu - only admin dashboard and sign out
                      <a
                        href="/admin"
                        className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-gold hover:text-gray-300 hover:bg-white/10 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        🔐 Admin Dashboard
                      </a>
                    ) : (
                      // Regular user menu
                      <>
                        <a
                          href="/dashboard"
                          className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Go to Dashboard
                        </a>
                        <a
                          href="/profile"
                          className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Edit Profile
                        </a>
                      </>
                    )}
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowAuthModal(true)
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      {/* Cart Modal */}
      <CartModal 
        isOpen={showCartModal} 
        onClose={() => setShowCartModal(false)} 
      />

      {/* Click outside handler for user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </>
  )
}
