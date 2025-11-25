'use client'
import { useState, useEffect } from 'react'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import LocationSelector from '../../components/cart/LocationSelector'
import DateTimePicker from '../../components/DateTimePicker'
import Image from 'next/image'
import { supabase } from '../../lib/supabase'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripePaymentForm from '../../components/StripePaymentForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Checkout() {
  // Debug: Log Stripe key on component mount
  useEffect(() => {
    console.log('Stripe publishable key:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    console.log('Stripe promise:', stripePromise)
  }, [])
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
  const [clientSecret, setClientSecret] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [subscriptionId, setSubscriptionId] = useState('')
  const [errorBanner, setErrorBanner] = useState(null)
  const [isCreatingPaymentIntent, setIsCreatingPaymentIntent] = useState(false)

  // Check if cart contains monthly maintenance package
  const hasMonthlyMaintenance = items.some(item => item.id === 'monthly-maintenance')
  const isSubscription = hasMonthlyMaintenance

  // Set loading to false after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // 1 second timeout to prevent infinite loading

    return () => clearTimeout(timer)
  }, [])

  // Auto-select card payment for subscriptions
  useEffect(() => {
    if (isSubscription && paymentMethod === 'cash') {
      setPaymentMethod('card')
    }
  }, [isSubscription, paymentMethod])

  // Fetch user profile data
  useEffect(() => {
    if (user) {
      console.log('User metadata:', user.user_metadata)
      const customerData = {
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || ''
      }
      console.log('Setting customer info:', customerData)
      setCustomerInfoState(customerData)
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

  const handleScheduleNext = async () => {
    if (selectedDateTime.date && selectedDateTime.time) {
      setCurrentStep(3)
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' })

      // If subscription OR card payment is selected, create payment intent immediately
      if (isSubscription || paymentMethod === 'card') {
        await createPaymentIntent()
      }
    }
  }

  const createPaymentIntent = async () => {
    // Prevent duplicate payment intent creation
    if (isCreatingPaymentIntent) {
      console.log('⚠️ Payment intent creation already in progress, skipping...')
      return
    }

    // If we already have a client secret, don't create another one
    if (clientSecret) {
      console.log('⚠️ Client secret already exists, skipping payment intent creation')
      return
    }

    setIsCreatingPaymentIntent(true)

    try {
      const serviceAreaCost = location?.serviceAreaCost || 0
      const finalTotal = total + serviceAreaCost

      console.log('Creating payment intent...', { isSubscription, finalTotal })

      // If this is a subscription (monthly maintenance), use subscription endpoint
      if (isSubscription) {
        console.log('Creating subscription...')
        const response = await fetch('/api/create-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderData: {
              user_id: user?.id,
              customer_info: customerInfo,
              scheduled_date: selectedDateTime.date,
              scheduled_time: selectedDateTime.time,
              location: location,
              items: items,
            },
          }),
        })

        console.log('Subscription response status:', response.status)
        const data = await response.json()
        console.log('Subscription response data:', data)

        if (data.error) {
          console.error('Subscription error:', data.error)
          alert('Error creating subscription: ' + data.error)
          return
        }

        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
          setSubscriptionId(data.subscriptionId)
          console.log('Client secret set successfully')
        } else {
          console.error('No clientSecret in response')
        }
      } else {
        // Regular one-time payment
        console.log('Creating payment intent...')
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: finalTotal,
            orderData: {
              user_id: user?.id,
              customer_info: customerInfo,
              scheduled_date: selectedDateTime.date,
              scheduled_time: selectedDateTime.time,
            },
          }),
        })

        console.log('Payment intent response status:', response.status)
        const data = await response.json()
        console.log('Payment intent response data:', data)

        if (data.error) {
          console.error('Payment intent error:', data.error)
          alert('Error creating payment: ' + data.error)
          return
        }

        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
          console.log('Client secret set successfully')
        } else {
          console.error('No clientSecret in response')
        }
      }
    } catch (error) {
      console.error('Error creating payment intent:', error)
      alert('Error: ' + error.message)
      setIsCreatingPaymentIntent(false)
    } finally {
      setIsCreatingPaymentIntent(false)
    }
  }


  const handlePaymentSuccess = async () => {
    // This function is called after successful Stripe payment
    return handlePayment(true)
  }

  const handlePayment = async (paymentCompleted = false) => {
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
          .select('id, scheduled_time, status, payment_status, customer_info')
          .eq('scheduled_date', selectedDateTime.date)
          .eq('scheduled_time', selectedDateTime.time)

        if (availabilityError) {
          console.error('❌ Error checking final availability:', availabilityError)
          alert('Unable to verify appointment availability. Please try again.')
          setIsProcessing(false)
          return
        }

        // Filter out cancelled and completed bookings
        const activeBookings = existingBookings?.filter(booking => {
          const status = booking.status || ''
          const paymentStatus = booking.payment_status || ''

          // Exclude if status is explicitly cancelled or completed
          if (['cancelled', 'completed'].includes(status.toLowerCase())) {
            console.log('✅ Ignoring cancelled/completed booking:', booking.id)
            return false
          }

          // Include booking if status OR payment_status indicates it's active
          const isActiveStatus = ['pending', 'confirmed', 'in_progress', 'paid'].includes(status.toLowerCase())
          const isActivePayment = ['pending', 'confirmed', 'paid'].includes(paymentStatus.toLowerCase())

          return isActiveStatus || isActivePayment
        }) || []

        if (activeBookings.length > 0) {
          console.log('❌ Time slot is no longer available:', activeBookings)

          // Get the conflicting booking info for better error message
          const conflictingBooking = activeBookings[0]
          const customerName = conflictingBooking.customer_info?.firstName || 'Another customer'

          setErrorBanner(`Sorry, this time slot is no longer available. ${customerName} has already booked this time slot. Please select a different time.`)

          // Reset to step 2 to allow user to select a new time
          setCurrentStep(2)
          setSelectedDateTime({ date: selectedDateTime.date, time: '' })
          setIsProcessing(false)

          // Auto-hide banner after 10 seconds
          setTimeout(() => setErrorBanner(null), 10000)

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
        status: paymentMethod === 'card' && paymentCompleted ? 'confirmed' : 'pending',
        payment_method: paymentMethod,
        payment_status: paymentMethod === 'card' && paymentCompleted ? 'paid' : 'pending',
        scheduled_date: selectedDateTime.date,
        scheduled_time: selectedDateTime.time,
        is_subscription: isSubscription,
        subscription_id: subscriptionId || null,
        created_at: new Date().toISOString()
      }

      console.log('Creating order with data:', orderData)
      console.log('Customer info being saved:', customerInfo)

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

        {/* Error Banner */}
        {errorBanner && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-red-800 font-medium">{errorBanner}</p>
            </div>
            <button
              onClick={() => setErrorBanner(null)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

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

                {/* Monthly Subscription Notice */}
                {isSubscription && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-medium text-purple-800 mb-1">Monthly Recurring Subscription</h4>
                        <p className="text-sm text-purple-700">
                          You've selected our Monthly Maintenance package. You'll be charged <strong>$160/month</strong> and receive priority booking each month. You can cancel anytime from your account dashboard.
                        </p>
                        {paymentMethod === 'card' && (
                          <p className="text-sm text-purple-700 mt-2">
                            <strong>Note:</strong> Payment method is required for recurring subscriptions. Your card will be charged monthly on the same day.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {/* Cash payment option - disabled for subscriptions */}
                    {!isSubscription && (
                      <div
                        className={`flex items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentMethod === 'cash' ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/50'
                        }`}
                        onClick={() => setPaymentMethod('cash')}
                      >
                        <input
                          type="radio"
                          id="cash"
                          name="paymentMethod"
                          value="cash"
                          checked={paymentMethod === 'cash'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-gold focus:ring-gold"
                        />
                        <label htmlFor="cash" className="ml-3 flex items-center cursor-pointer flex-1">
                          <svg className="w-6 h-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                          </svg>
                          <span className="font-medium">Cash Payment (Pay on site)</span>
                        </label>
                      </div>
                    )}

                    <div
                      className={`flex items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === 'card' ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/50'
                      }`}
                      onClick={async () => {
                        setPaymentMethod('card')
                        if (!clientSecret) {
                          await createPaymentIntent()
                        }
                      }}
                    >
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={async (e) => {
                          setPaymentMethod(e.target.value)
                          if (!clientSecret) {
                            await createPaymentIntent()
                          }
                        }}
                        className="w-4 h-4 text-gold focus:ring-gold"
                      />
                      <label htmlFor="card" className="ml-3 flex items-center cursor-pointer flex-1">
                        <svg className="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v2H4V6zm0 4h12v2H4v-2z" />
                        </svg>
                        <span className="font-medium">Credit/Debit Card (Pay now)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Stripe Payment Form (only shown when card is selected) */}
                {paymentMethod === 'card' && (
                  <div className="mb-6">
                    {!clientSecret ? (
                      <div className="bg-gray-50 rounded-lg p-6 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading payment form...</p>
                      </div>
                    ) : (
                      <Elements
                        stripe={stripePromise}
                        options={{
                          clientSecret,
                          appearance: {
                            theme: 'stripe',
                            variables: {
                              colorPrimary: '#d4af37',
                            }
                          }
                        }}
                      >
                        <StripePaymentForm
                          orderData={{
                            totalAmount: total + (location?.serviceAreaCost || 0)
                          }}
                          onSuccess={handlePaymentSuccess}
                        />
                      </Elements>
                    )}
                  </div>
                )}

                {/* Cash Payment Button */}
                {paymentMethod === 'cash' && (
                  <>
                    {/* Payment Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <h4 className="text-sm font-medium text-blue-800">Cash Payment Information</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            You can pay with cash when we arrive at your location. Please have the exact amount ready.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center sm:justify-end">
                      <button
                        onClick={() => handlePayment(false)}
                        disabled={isProcessing}
                        className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors ${
                          isProcessing
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gold hover:bg-gold/90 text-white'
                        }`}
                      >
                        {isProcessing ? 'Processing...' : 'Complete Order'}
                      </button>
                    </div>
                  </>
                )}
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
