'use client'
import { useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import Image from 'next/image'
import { LuShoppingCart } from 'react-icons/lu'

export default function CartModal({ isOpen, onClose }) {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart()
  const { user, loading } = useAuth()
  const [isAnimating, setIsAnimating] = useState(false)

  // Debug logging
  console.log('CartModal - User state:', { user: !!user, userEmail: user?.email, loading })

  if (!isOpen) return null

  const handleClose = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
      onClose()
    }, 200)
  }

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
      onClick={handleClose}
    >
      <div 
        className={`bg-white shadow-xl w-full max-w-md h-full flex flex-col transform transition-all duration-300 ${
          isAnimating ? 'translate-x-full' : 'translate-x-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LuShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some services to get started!</p>
              <a
                href="/services"
                onClick={handleClose}
                className="inline-block bg-gold hover:bg-gold text-white font-medium px-6 py-2 rounded-lg transition-colors"
              >
                Browse Services
              </a>
            </div>
          ) : (
            <div className="p-6">
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    {/* Service Image */}
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image || '/stock/1.png'}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    {/* Service Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{item.description}</p>
                      <div className="text-lg font-semibold text-gold">{formatPrice(item.price)}</div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-700 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-gold">{formatPrice(total)}</span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Continue Shopping
              </button>
              <a
                href={!loading && user ? "/checkout" : "/auth-test?returnUrl=/checkout"}
                onClick={handleClose}
                className="flex-1 bg-gold hover:bg-gold text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
              >
                {loading ? "Loading..." : (user ? "Proceed to Checkout" : "Login to Checkout")}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
