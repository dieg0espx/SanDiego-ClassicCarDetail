'use client'

import { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

export default function StripePaymentForm({ orderData, onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    try {
      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setErrorMessage(submitError.message)
        setIsProcessing(false)
        return
      }

      // Confirm the payment
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/confirmation`,
        },
        redirect: 'if_required', // Only redirect if necessary (e.g., 3D Secure)
      })

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer
        setErrorMessage(error.message)
        setIsProcessing(false)
      } else {
        // Payment successful!
        if (onSuccess) {
          await onSuccess()
        }
      }
    } catch (err) {
      console.error('Payment error:', err)
      setErrorMessage('An unexpected error occurred. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-black mb-4">Payment Details</h3>
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full bg-gold hover:bg-gold/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Payment...
          </>
        ) : (
          `Pay $${orderData.totalAmount.toFixed(2)}`
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Your payment information is secure and encrypted
      </p>
    </form>
  )
}
