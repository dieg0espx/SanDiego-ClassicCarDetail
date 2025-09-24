'use client'
import { useState, useEffect } from 'react'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import LocationSelector from '../../components/cart/LocationSelector'
import DateTimePicker from '../../components/DateTimePicker'
import Image from 'next/image'
import { supabase } from '../../lib/supabase'

export default function Checkout() {
  const { items, total, location, setCustomerInfo, clearCart } = useCart()
  const { user, loading } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [customerInfo, setCustomerInfoState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const [selectedDateTime, setSelectedDateTime] = useState({
    date: '',
    time: ''
  })
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Set loading to false after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // 1 second timeout to prevent infinite loading
    
    return () => clearTimeout(timer)
  }, [])

  // Fetch user profile data
  useEffect(() => {
    if (user) {
      setCustomerInfoState({
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || ''
      })
    }
  }, [user])

  // Redirect if user is not authenticated (but only after loading is complete)
  useEffect(() => {
    console.log('Checkout auth check:', { isLoading, user: !!user, userEmail: user?.email, loading })
    if (!isLoading && !loading && !user) {
      console.log('Redirecting to auth-test')
      router.push('/auth-test?returnUrl=/checkout')
    }
  }, [user, router, isLoading, loading])

  // Redirect if cart is empty (only after loading is complete)
  useEffect(() => {
    if (!isLoading && items.length === 0) {
      router.push('/services')
    }
  }, [items.length, router, isLoading])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const handleLocationSelected = (locationData) => {
    // Automatically set customer info from profile and move to date/time selection
    setCustomerInfo(customerInfo)
    setCurrentStep(2)
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDateTimeSelected = (dateTime) => {
    setSelectedDateTime(dateTime)
  }

  const handleScheduleNext = () => {
    if (selectedDateTime.date && selectedDateTime.time) {
      setCurrentStep(3)
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }


  const handlePayment = async () => {
    setIsProcessing(true)
    
    try {
      // Check if user is authenticated
      if (!user) {
        alert('Please log in to complete your order.')
        router.push('/auth-test?returnUrl=/checkout')
        return
      }

      // Final availability check to prevent overbooking
      if (selectedDateTime.date && selectedDateTime.time) {
        console.log('🔍 Performing final availability check...')
        
        const { data: existingBookings, error: availabilityError } = await supabase
          .from('orders')
          .select('id, scheduled_time, status, customer_info')
          .eq('scheduled_date', selectedDateTime.date)
          .eq('scheduled_time', selectedDateTime.time)

        if (availabilityError) {
          console.error('❌ Error checking final availability:', availabilityError)
          alert('Unable to verify appointment availability. Please try again.')
          setIsProcessing(false)
          return
        }

        if (existingBookings && existingBookings.length > 0) {
          console.log('❌ Time slot is no longer available:', existingBookings)
          
          // Get the conflicting booking info for better error message
          const conflictingBooking = existingBookings[0]
          const customerName = conflictingBooking.customer_info?.firstName || 'Another customer'
          
          alert(`Sorry, this time slot is no longer available. ${customerName} has already booked this time slot. Please select a different time.`)
          
          // Reset to step 2 to allow user to select a new time
          setCurrentStep(2)
          setSelectedDateTime({ date: selectedDateTime.date, time: '' })
          setIsProcessing(false)
          
          // Scroll to top and refresh availability
          window.scrollTo({ top: 0, behavior: 'smooth' })
          setRefreshTrigger(prev => prev + 1)
          return
        }
        
        console.log('✅ Time slot is available, proceeding with order creation...')
      }

      // Create order in Supabase
      const serviceAreaCost = location?.serviceAreaCost || 0
      const finalTotal = total + serviceAreaCost
      
      const orderData = {
        user_id: user.id,
        customer_info: customerInfo,
        location: location,
        items: items,
        total: finalTotal,
        service_area_cost: serviceAreaCost,
        status: 'pending',
        payment_method: 'cash', // Default to cash for now
        scheduled_date: selectedDateTime.date,
        scheduled_time: selectedDateTime.time,
        created_at: new Date().toISOString()
      }

      console.log('Creating order with data:', orderData)
      
      // First, let's test if the table exists by trying to select from it
      const { data: testData, error: testError } = await supabase
        .from('orders')
        .select('*')
        .limit(1)
      
      if (testError) {
        console.error('Table test error:', testError)
        throw new Error(`Database table issue: ${testError.message}`)
      }
      
      console.log('Table exists, proceeding with insert...')
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single()

      if (orderError) {
        console.error('Order creation error:', orderError)
        console.error('Full error details:', JSON.stringify(orderError, null, 2))
        throw orderError
      }

      console.log('Order created successfully:', order)

      // Trigger refresh of availability
      setRefreshTrigger(prev => prev + 1)

      // Send booking confirmation emails
      try {
        const emailResponse = await fetch('/api/send-booking-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: order.id }),
        })

        if (emailResponse.ok) {
          console.log('Booking confirmation emails sent successfully')
        } else {
          console.error('Failed to send booking confirmation emails')
          // Don't block the flow if email fails
        }
      } catch (emailError) {
        console.error('Error sending booking confirmation emails:', emailError)
        // Don't block the flow if email fails
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear cart and redirect to confirmation page
      clearCart()
      console.log('Redirecting to confirmation page with order ID:', order.id)
      
      const confirmationUrl = `/confirmation?orderId=${order.id}`
      console.log('Confirmation URL:', confirmationUrl)
      
      // Use window.location.href for more reliable redirect
      try {
        window.location.href = confirmationUrl
      } catch (error) {
        console.error('Redirect failed, trying router.push:', error)
        router.push(confirmationUrl)
      }
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Error creating order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const steps = [
    { id: 1, name: 'Location', description: 'Set service location' },
    { id: 2, name: 'Schedule', description: 'Choose date & time' },
    { id: 3, name: 'Payment', description: 'Complete your order' }
  ]

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <a href="/services" className="bg-gold hover:bg-gold text-white font-medium px-6 py-3 rounded-lg transition-colors">
            Browse Services
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="mt-2 text-gray-600">Complete your mobile detailing service order</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          {/* Mobile Layout */}
          <div className="block sm:hidden">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, stepIdx) => (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 transition-all duration-300 ${
                    currentStep >= step.id 
                      ? 'bg-gold text-white shadow-lg shadow-gold/25' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step.id ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-sm font-semibold">{step.id}</span>
                    )}
                  </div>
                  <div className="text-center">
                    <div className={`text-xs font-semibold ${
                      currentStep >= step.id ? 'text-gold' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{step.description}</div>
                  </div>
                  {stepIdx < steps.length - 1 && (
                    <div className={`absolute top-5 left-1/2 w-full h-0.5 ${
                      currentStep > step.id ? 'bg-gold' : 'bg-gray-200'
                    }`} style={{ transform: 'translateX(50%)', zIndex: -1 }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:block">
            <div className="flex items-center justify-center">
              {steps.map((step, stepIdx) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    currentStep >= step.id 
                      ? 'bg-gold text-white shadow-lg shadow-gold/25' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step.id ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium transition-colors duration-300 ${
                      currentStep >= step.id ? 'text-gold' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                  {stepIdx < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 transition-colors duration-300 ${
                      currentStep > step.id ? 'bg-gold' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* Step 1: Location Selection */}
            {currentStep === 1 && (
              <LocationSelector onLocationSelected={handleLocationSelected} />
            )}

            {/* Step 2: Date & Time Selection */}
            {currentStep === 2 && (
              <DateTimePicker 
                onDateTimeSelected={handleDateTimeSelected}
                selectedDate={selectedDateTime.date}
                selectedTime={selectedDateTime.time}
                onNext={handleScheduleNext}
                refreshTrigger={refreshTrigger}
              />
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Payment Information</h2>
                
                {/* Customer Information Display */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Name:</span>
                      <span className="ml-2 text-gray-900">{customerInfo.firstName} {customerInfo.lastName}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Email:</span>
                      <span className="ml-2 text-gray-900">{customerInfo.email}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Phone:</span>
                      <span className="ml-2 text-gray-900">{customerInfo.phone || 'Not provided'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Source:</span>
                      <span className="ml-2 text-gray-900">Profile Information</span>
                    </div>
                  </div>
                </div>

                {/* Scheduled Appointment Display */}
                <div className="bg-gold/10 border border-gold/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gold mb-3">Scheduled Appointment</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Date:</span>
                      <span className="ml-2 text-gray-900">
                        {selectedDateTime.date ? new Date(selectedDateTime.date + 'T00:00:00').toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        }) : 'Not selected'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Time:</span>
                      <span className="ml-2 text-gray-900">
                        {selectedDateTime.time ? 
                          (() => {
                            const hour = parseInt(selectedDateTime.time.split(':')[0])
                            return hour === 12 ? '12:00 PM' : 
                                   hour > 12 ? `${hour - 12}:00 PM` : 
                                   `${hour}:00 AM`
                          })() : 'Not selected'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method Selection */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg">
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      defaultChecked
                      className="w-4 h-4 text-gold focus:ring-gold"
                    />
                    <label htmlFor="cash" className="ml-3 flex items-center">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                      </svg>
                      <span className="font-medium">Cash Payment</span>
                    </label>
                  </div>

                  <div className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      className="w-4 h-4 text-gold focus:ring-gold"
                    />
                    <label htmlFor="card" className="ml-3 flex items-center">
                      <svg className="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v2H4V6zm0 4h12v2H4v-2z" />
                      </svg>
                      <span className="font-medium">Credit/Debit Card</span>
                    </label>
                  </div>
                </div>

                {/* Payment Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Payment Information</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        We accept cash payments on-site or credit/debit cards. 
                        For card payments, we'll process the payment when we arrive at your location.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center sm:justify-end">
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors ${
                      isProcessing
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gold hover:bg-gold text-white'
                    }`}
                  >
                    {isProcessing ? 'Processing...' : 'Complete Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 sticky top-4 lg:top-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Order Summary</h3>
              
              {/* Services */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 sm:space-x-3">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                      <Image
                        src={item.image || '/stock/1.png'}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>


              {/* Service Area Fee */}
              {location?.serviceAreaCost > 0 && (
                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <div className="flex justify-between items-center text-xs sm:text-sm mb-2 sm:mb-0">
                    <span className="text-gray-600">Service Area Fee</span>
                    <span className="font-medium text-gold">+${location.serviceAreaCost}</span>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="border-t border-gray-200 pt-3 sm:pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg sm:text-xl font-bold text-gold">{formatPrice(total + (location?.serviceAreaCost || 0))}</span>
                </div>
              </div>

              {/* Back Button */}
              {currentStep > 1 && (
                <button
                  onClick={() => {
                    setCurrentStep(currentStep - 1)
                    // Scroll to top of page
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="w-full mt-3 sm:mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 sm:py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
