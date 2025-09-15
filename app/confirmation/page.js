'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '../../lib/supabase'

export default function ConfirmationPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [order, setOrder] = useState(null)
  const [loading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get the order ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const orderId = urlParams.get('orderId')
    
    console.log('Confirmation page loaded with orderId:', orderId)
    console.log('User state:', { user: !!user, userId: user?.id })
    
    if (orderId) {
      fetchOrderDetails(orderId)
    } else {
      // If no order ID, redirect to services
      console.log('No order ID found, redirecting to services')
      router.push('/services')
    }
  }, [router])

  const fetchOrderDetails = async (orderId) => {
    try {
      // Try to fetch with user authentication first
      let query = supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
      
      // Only add user filter if user is authenticated
      if (user?.id) {
        query = query.eq('user_id', user.id)
      }
      
      const { data, error } = await query.single()

      if (error) {
        console.error('Error fetching order:', error)
        // If user is not authenticated, try without user filter
        if (!user?.id) {
          const { data: publicData, error: publicError } = await supabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single()
          
          if (publicError) {
            console.error('Error fetching order (public):', publicError)
            router.push('/services')
            return
          }
          
          setOrder(publicData)
        } else {
          router.push('/services')
          return
        }
      } else {
        setOrder(data)
      }
    } catch (error) {
      console.error('Error fetching order:', error)
      router.push('/services')
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading confirmation...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
          <a
            href="/services"
            className="bg-gold hover:bg-gold text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Browse Services
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Thank you for choosing San Diego Classic Car Detail
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Order Header */}
          <div className="bg-gold px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Order #{order.id.slice(-8)}</h2>
                <p className="text-gold-100">
                  Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {formatPrice(order.total)}
                </div>
                <div className="text-gold-100 capitalize">
                  {order.status.replace('_', ' ')}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Customer Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Name:</span>
                    <span className="ml-2 text-gray-900">
                      {order.customer_info.firstName} {order.customer_info.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Email:</span>
                    <span className="ml-2 text-gray-900">{order.customer_info.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Phone:</span>
                    <span className="ml-2 text-gray-900">
                      {order.customer_info.phone || 'Not provided'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Payment Method:</span>
                    <span className="ml-2 text-gray-900 capitalize">{order.payment_method}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scheduled Appointment */}
            {order.scheduled_date && order.scheduled_time && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Scheduled Appointment</h3>
                <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Date:</span>
                      <span className="ml-2 text-gray-900">
                        {new Date(order.scheduled_date + 'T00:00:00').toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Time:</span>
                      <span className="ml-2 text-gray-900">
                        {(() => {
                          const hour = parseInt(order.scheduled_time.split(':')[0])
                          return hour === 12 ? '12:00 PM' : 
                                 hour > 12 ? `${hour - 12}:00 PM` : 
                                 `${hour}:00 AM`
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Service Location */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Location</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm">
                  <div className="font-medium text-gray-900 mb-1">{order.location.fullAddress}</div>
                  {order.location.specialInstructions && (
                    <div className="text-gray-600 mt-2">
                      <span className="font-medium">Special Instructions:</span>
                      <span className="ml-2">{order.location.specialInstructions}</span>
                    </div>
                  )}
                  {order.service_area_cost > 0 && (
                    <div className="text-gold font-medium mt-2">
                      Service Area Fee: +{formatPrice(order.service_area_cost)} ({order.location.serviceAreaName})
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Services Ordered */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Services Ordered</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatPrice(item.price)} each
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">{formatPrice(order.total - order.service_area_cost)}</span>
                </div>
                {order.service_area_cost > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Area Fee:</span>
                    <span className="text-gray-900">{formatPrice(order.service_area_cost)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total:</span>
                  <span className="text-gold">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">What's Next?</h3>
          <div className="space-y-2 text-sm text-blue-800">
            {order.scheduled_date && order.scheduled_time ? (
              <>
                <p>• Your appointment is scheduled for {new Date(order.scheduled_date + 'T00:00:00').toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })} at {(() => {
                  const hour = parseInt(order.scheduled_time.split(':')[0])
                  return hour === 12 ? '12:00 PM' : 
                         hour > 12 ? `${hour - 12}:00 PM` : 
                         `${hour}:00 AM`
                })()}</p>
                <p>• We'll contact you within 24 hours to confirm your appointment details</p>
                <p>• You'll receive a text message with our technician's contact information</p>
                <p>• Our team will arrive at your specified location at the scheduled time</p>
                <p>• Payment will be collected on-site after service completion</p>
              </>
            ) : (
              <>
                <p>• We'll contact you within 24 hours to confirm your appointment details</p>
                <p>• You'll receive a text message with our technician's contact information</p>
                <p>• Our team will arrive at your specified location at the scheduled time</p>
                <p>• Payment will be collected on-site after service completion</p>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/services"
            className="bg-gold hover:bg-gold text-white font-medium px-6 py-3 rounded-lg transition-colors text-center"
          >
            Book Another Service
          </a>
          <a
            href="/dashboard"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors text-center"
          >
            View My Orders
          </a>
        </div>
      </div>
    </div>
  )
}
