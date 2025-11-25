'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import LocationSelector from '../../components/cart/LocationSelector'
import DateTimePicker from '../../components/DateTimePicker'

export default function SubscriptionBooking() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [location, setLocation] = useState(null)
  const [selectedDateTime, setSelectedDateTime] = useState({ date: '', time: '' })
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const [hasSubscription, setHasSubscription] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth-test?returnUrl=/subscription-booking')
    } else if (!loading && user) {
      checkSubscription()
      loadCustomerInfo()
    }
  }, [user, loading, router])

  const checkSubscription = async () => {
    if (!user?.id) return

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_subscription', true)
        .in('payment_status', ['pending', 'confirmed', 'paid'])
        .limit(1)

      if (error) {
        console.error('Error checking subscription:', error)
        setIsLoading(false)
        return
      }

      if (data && data.length > 0) {
        setHasSubscription(true)
      } else {
        // No active subscription, redirect to packages
        router.push('/packages')
      }
      setIsLoading(false)
    } catch (error) {
      console.error('Error checking subscription:', error)
      setIsLoading(false)
    }
  }

  const loadCustomerInfo = () => {
    if (user) {
      setCustomerInfo({
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || ''
      })
    }
  }

  const handleLocationSelected = (locationData) => {
    setLocation(locationData)
    setCurrentStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDateTimeSelected = (dateTime) => {
    setSelectedDateTime(dateTime)
  }

  const handleScheduleNext = () => {
    if (selectedDateTime.date && selectedDateTime.time) {
      setCurrentStep(3)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBookAppointment = async () => {
    setIsProcessing(true)

    try {
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

          alert(`Sorry, this time slot is no longer available. ${customerName} has already booked this time slot. Please select a different time.`)

          // Reset to step 2 to allow user to select a new time
          setCurrentStep(2)
          setSelectedDateTime({ date: selectedDateTime.date, time: '' })
          setIsProcessing(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
          return
        }

        console.log('✅ Time slot is available, proceeding with booking...')
      }

      const orderData = {
        user_id: user.id,
        customer_info: customerInfo,
        items: [{
          id: 'monthly-maintenance',
          name: 'Monthly Maintenance',
          price: 160
        }],
        total: 160 + (location?.serviceAreaCost || 0),
        location: location,
        scheduled_date: selectedDateTime.date,
        scheduled_time: selectedDateTime.time,
        status: 'confirmed',
        payment_method: 'subscription',
        payment_status: 'paid',
        is_subscription: false, // This is a booking from subscription, not the subscription itself
        created_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()

      if (error) {
        console.error('Error creating booking:', error)
        alert('Failed to create booking. Please try again.')
        setIsProcessing(false)
        return
      }

      // Success! Show success message
      setBookingSuccess(true)
      setIsProcessing(false)
    } catch (error) {
      console.error('Error booking appointment:', error)
      alert('Failed to book appointment. Please try again.')
      setIsProcessing(false)
    }
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!hasSubscription) {
    return null
  }

  // Show success message
  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <svg className="w-20 h-20 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Appointment Booked Successfully!</h1>
            <p className="text-lg text-gray-600 mb-2">Your monthly maintenance service has been scheduled.</p>
            <p className="text-gray-600 mb-8">
              {selectedDateTime.date && new Date(selectedDateTime.date + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} at {selectedDateTime.time && `${parseInt(selectedDateTime.time.split(':')[0]) > 12
                ? `${parseInt(selectedDateTime.time.split(':')[0]) - 12}:00 PM`
                : `${selectedDateTime.time} AM`}`}
            </p>
            <div className="space-y-3">
              <a
                href="/dashboard"
                className="inline-block bg-gold hover:bg-gold text-white font-medium px-8 py-3 rounded-lg transition-colors"
              >
                View Dashboard
              </a>
              <br />
              <button
                onClick={() => {
                  setBookingSuccess(false)
                  setCurrentStep(1)
                  setLocation(null)
                  setSelectedDateTime({ date: '', time: '' })
                }}
                className="text-gold hover:text-gold/80 font-medium"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 sm:p-6 mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gold">Book Your Monthly Service</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-700">Schedule your next detailing appointment - no payment required!</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Location' },
              { num: 2, label: 'Date/Time' },
              { num: 3, label: 'Confirm' }
            ].map((step, index) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold ${
                    currentStep >= step.num
                      ? 'bg-gold text-black'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.num}
                  </div>
                  <span className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-gray-600 text-center whitespace-nowrap">{step.label}</span>
                </div>
                {index < 2 && (
                  <div className={`h-1 flex-1 mx-2 sm:mx-4 ${
                    currentStep > step.num ? 'bg-gold' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          {currentStep === 1 && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Select Service Location</h2>
              <LocationSelector onLocationSelected={handleLocationSelected} />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Choose Date & Time</h2>
              <DateTimePicker
                selectedDateTime={selectedDateTime}
                onDateTimeSelected={handleDateTimeSelected}
                hideNextButton={true}
              />
              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Back
                </button>
                <button
                  onClick={handleScheduleNext}
                  disabled={!selectedDateTime.date || !selectedDateTime.time}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                    selectedDateTime.date && selectedDateTime.time
                      ? 'bg-gold hover:bg-gold text-black'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Confirm Your Appointment</h2>

              <div className="space-y-3 sm:space-y-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2">Service Details</h3>
                  <p className="text-sm sm:text-base text-gray-700">Monthly Maintenance Detailing</p>
                  <p className="text-xs sm:text-sm text-gray-600">Two stage hand wash, wheel cleaning, interior vacuum</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2">Date & Time</h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    {new Date(selectedDateTime.date + 'T00:00:00').toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {selectedDateTime.time && `${parseInt(selectedDateTime.time.split(':')[0]) > 12
                      ? `${parseInt(selectedDateTime.time.split(':')[0]) - 12}:00 PM`
                      : `${selectedDateTime.time}:00 AM`}`}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2">Location</h3>
                  <p className="text-sm sm:text-base text-gray-700 break-words">{location?.fullAddress}</p>
                  {location?.serviceAreaCost > 0 && (
                    <p className="text-xs sm:text-sm text-gray-600">Travel fee: ${location.serviceAreaCost}</p>
                  )}
                </div>

                <div className="bg-gold/10 rounded-lg p-3 sm:p-4 border border-gold">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm sm:text-base font-medium text-gray-900">No Payment Required</p>
                      <p className="text-xs sm:text-sm text-gray-700">This appointment is covered by your monthly subscription.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto order-2 sm:order-1 px-4 sm:px-6 py-2 sm:py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Back
                </button>
                <button
                  onClick={handleBookAppointment}
                  disabled={isProcessing}
                  className={`w-full sm:w-auto order-1 sm:order-2 px-4 sm:px-6 py-3 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                    isProcessing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gold hover:bg-gold text-black'
                  }`}
                >
                  {isProcessing ? 'Booking...' : 'Confirm Appointment'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
