'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function LoyaltyClub() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1000)
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          {/* Image Column */}
          <div className="order-2 lg:order-1">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/stay-classy.png"
                alt="Stay Classy - San Diego Classic Auto Detail"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2 text-white">
            <div className="px-2 sm:px-0">
              <div className="inline-block bg-gold rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
                <span className="text-xs sm:text-sm font-semibold text-black uppercase tracking-wider">
                  Loyalty Club
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Stay Classy with Our
                <span className="text-gold block">Loyalty Club</span>
              </h2>
              
              <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                Join our exclusive loyalty club and be the first to know about special holiday deals, 
                seasonal promotions, and member-only discounts. Plus, get priority booking for busy periods!
              </p>

              {/* Benefits List */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-300 leading-relaxed">Exclusive holiday deals & seasonal promotions</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-300 leading-relaxed">Member-only discounts on premium services</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-300 leading-relaxed">Priority booking during busy periods</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-300 leading-relaxed">Early access to new services & packages</span>
                </div>
              </div>

              {/* Subscription Form */}
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-3 sm:px-4 py-3 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-gold focus:border-transparent transition-colors text-sm sm:text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gold hover:bg-gold/90 text-black font-bold px-4 sm:px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isLoading ? 'Joining...' : 'Join Loyalty Club'}
                  </button>
                </form>
              ) : (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 sm:p-6 text-center">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 text-green-400 mx-auto mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Welcome to the Club!</h3>
                  <p className="text-sm sm:text-base text-gray-300">
                    You're now part of our exclusive loyalty club. Check your email for your first member discount!
                  </p>
                </div>
              )}

              <p className="text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4">
                No spam, just great deals. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
