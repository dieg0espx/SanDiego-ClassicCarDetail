'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import AuthModal from './auth/AuthModal'
import CartModal from './cart/CartModal'
import { FiShoppingCart } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const pathname = usePathname()
  const { user, signOut, loading } = useAuth()
  const { getItemCount } = useCart()


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


  return (
    <>
      {/* Top Information Bar - Desktop Only */}
     

      {/* Main Navigation Bar */}
      <motion.header 
        className="text-white fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full bg-black"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 items-center py-3 sm:py-2">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0 flex lg:justify-start justify-start"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.a 
                href="/" 
                className="block hover:opacity-90 transition-opacity duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/logo.png"
                  alt="San Diego Classic Auto Detail"
                  width={200}
                  height={60}
                  className="h-10 sm:h-12 lg:h-16 w-auto"
                />
              </motion.a>
            </motion.div>

            {/* Desktop Navigation Links - Center Column */}
            <motion.nav 
              className="hidden lg:flex items-center space-x-8 justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/packages", label: "Packages" },
                { href: "/contact", label: "Contact" }
              ].map((link, index) => (
                <motion.a 
                  key={link.href}
                  href={link.href} 
                  className="hover:text-gray-300 transition-colors"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>

            {/* Desktop Call-to-Action Button & Auth */}
            <motion.div 
              className="hidden lg:flex items-center space-x-8 flex-shrink-0 justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
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
              <motion.button
                onClick={() => setShowCartModal(true)}
                className="relative text-white hover:text-gray-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiShoppingCart className="w-6 h-6" />
                <AnimatePresence>
                  {getItemCount() > 0 && (
                    <motion.span 
                      className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {getItemCount()}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <motion.a 
                href="#quote" 
                className="bg-gold hover:bg-gold/90 text-white font-bold px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="bi bi-calendar-check"></i>
                <span>Book Now</span>
              </motion.a>
            </motion.div>

            {/* Mobile Menu Button - Only burger menu */}
            <motion.div 
              className="lg:hidden flex items-center justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                onClick={toggleMenu}
                className="p-2 rounded-md text-white hover:text-gray-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
                aria-expanded={isMenuOpen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Open main menu</span>
                <AnimatePresence mode="wait">
                  {!isMenuOpen ? (
                    <motion.svg 
                      key="menu"
                      className="h-6 w-6" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      aria-hidden="true"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </motion.svg>
                  ) : (
                    <motion.svg 
                      key="close"
                      className="h-6 w-6" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      aria-hidden="true"
                      initial={{ rotate: 90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Sidebar Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.div 
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Sidebar */}
                <motion.div 
                  className="fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-md border-l border-white/10 z-50 lg:hidden"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                >
                <div className="flex flex-col h-full">
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-semibold text-white">Menu</h2>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-md text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Navigation Links */}
                  <nav className="flex-1 px-6 py-6 space-y-2">
                    <a
                      href="/"
                      className="block px-4 py-3 rounded-lg text-lg font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </a>
                    <a
                      href="/services"
                      className="block px-4 py-3 rounded-lg text-lg font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Services
                    </a>
                    <a
                      href="/packages"
                      className="block px-4 py-3 rounded-lg text-lg font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Packages
                    </a>
                    <a
                      href="/contact"
                      className="block px-4 py-3 rounded-lg text-lg font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </a>
                  </nav>
                  
                  {/* User Section */}
                  <div className="border-t border-white/10 p-6">
                    {user ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                              {getUserDisplayName().charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="text-lg font-medium text-white">{getUserDisplayName()}</div>
                            {getUserEmail() && (
                              <div className="text-sm text-gray-400">{getUserEmail()}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {(user?.user_metadata?.role === 'admin' || getUserEmail() === 'admin@test.com') ? (
                            <a
                              href="/admin"
                              className="block w-full text-left px-4 py-3 rounded-lg text-lg font-medium text-gold hover:text-gray-300 hover:bg-white/10 transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              🔐 Admin Dashboard
                            </a>
                          ) : (
                            <>
                              <a
                                href="/dashboard"
                                className="block w-full text-left px-4 py-3 rounded-lg text-lg font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                Go to Dashboard
                              </a>
                              <a
                                href="/profile"
                                className="block w-full text-left px-4 py-3 rounded-lg text-lg font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
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
                            className="block w-full text-left px-4 py-3 rounded-lg text-lg font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <button
                          onClick={() => {
                            setShowAuthModal(true)
                            setIsMenuOpen(false)
                          }}
                          className="block w-full text-left px-4 py-3 rounded-lg text-lg font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => {
                            setShowCartModal(true)
                            setIsMenuOpen(false)
                          }}
                          className="flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg text-lg font-medium text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                        >
                          <FiShoppingCart className="w-6 h-6" />
                          <span>Cart</span>
                          {getItemCount() > 0 && (
                            <span className="bg-gold text-white text-sm rounded-full h-6 w-6 flex items-center justify-center font-medium">
                              {getItemCount()}
                            </span>
                          )}
                        </button>
                      </div>
                    )}
                    
                    {/* Book Now Button */}
                    <a 
                      href="#quote" 
                      className="block w-full bg-gold hover:bg-gold/90 text-white font-bold px-6 py-3 rounded-lg transition-colors text-center mt-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Book Now
                    </a>
                  </div>
                </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

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
