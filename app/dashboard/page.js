'use client'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Image from 'next/image'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [orders, setOrders] = useState([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('list') // 'list' or 'calendar'
  const [cancelingOrderId, setCancelingOrderId] = useState(null)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [orderToCancel, setOrderToCancel] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    if (!loading && !user) {
      console.log('No user found, redirecting to homepage')
      router.push('/')
    } else if (!loading && user) {
      console.log('User found:', user.email)
      fetchUserOrders()
    }
  }, [user, loading, router])

  const fetchUserOrders = async () => {
    if (!user?.id) return
    
    try {
      setIsLoadingOrders(true)
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error)
        return
      }

      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setIsLoadingOrders(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
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

  // Helper functions to process real data
  const getUpcomingAppointments = () => {
    return orders.filter(order => 
      order.scheduled_date && 
      new Date(order.scheduled_date) >= new Date() &&
      ['pending', 'confirmed', 'in_progress'].includes(order.status)
    )
  }

  const getNextAppointment = () => {
    const upcoming = getUpcomingAppointments()
    if (upcoming.length === 0) return null
    
    // Sort by scheduled_date and scheduled_time to get the nearest one
    return upcoming.sort((a, b) => {
      const dateA = new Date(a.scheduled_date + 'T' + a.scheduled_time)
      const dateB = new Date(b.scheduled_date + 'T' + b.scheduled_time)
      return dateA - dateB
    })[0]
  }

  const getCompletedOrders = () => {
    return orders.filter(order => order.status === 'completed')
  }

  const getTotalSpent = () => {
    return orders.reduce((total, order) => total + (order.total || 0), 0)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled'
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString) => {
    if (!timeString) return 'Not scheduled'
    const hour = parseInt(timeString.split(':')[0])
    return hour === 12 ? '12:00 PM' : 
           hour > 12 ? `${hour - 12}:00 PM` : 
           `${hour}:00 AM`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-gold text-white'
      case 'completed': return 'bg-black text-white'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')
  }

  // Calendar helper functions
  const getCalendarDays = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const calendar = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendar.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      calendar.push({
        date: currentDate,
        day: day,
        isToday: currentDate.getTime() === today.getTime(),
        isSelected: currentDate.toDateString() === selectedDate.toDateString(),
        hasAppointment: getUpcomingAppointments().some(appointment => 
          appointment.scheduled_date && 
          new Date(appointment.scheduled_date + 'T00:00:00').toDateString() === currentDate.toDateString()
        )
      })
    }
    
    return calendar
  }

  const getAppointmentsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0]
    return getUpcomingAppointments().filter(appointment => 
      appointment.scheduled_date === dateString
    )
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(selectedDate.getMonth() + direction)
    setSelectedDate(newDate)
  }

  const handleCancelClick = (order) => {
    setOrderToCancel(order)
    setShowCancelModal(true)
  }

  const cancelAppointment = async () => {
    if (!orderToCancel) return

    setCancelingOrderId(orderToCancel.id)
    setShowCancelModal(false)
    
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', orderToCancel.id)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error canceling appointment:', error)
        showNotification('Failed to cancel appointment. Please try again.', 'error')
        return
      }

      // Refresh orders data
      await fetchUserOrders()
      showNotification('Appointment cancelled successfully!')
    } catch (error) {
      console.error('Error canceling appointment:', error)
      showNotification('Failed to cancel appointment. Please try again.', 'error')
    } finally {
      setCancelingOrderId(null)
      setOrderToCancel(null)
    }
  }

  const closeCancelModal = () => {
    setShowCancelModal(false)
    setOrderToCancel(null)
  }

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-gold' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
    { id: 'appointments', label: 'Appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'history', label: 'Service History', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {getUserDisplayName().split(' ')[0]}!</h1>
              <p className="text-gray-600 mt-2">Manage your car detailing services and appointments</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {getUserDisplayName().charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>


        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-gold text-gold'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Quick Actions */}
                {/* <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a 
                      href="tel:(760) 518-8451" 
                      className="bg-gold hover:bg-gold text-white font-medium py-4 px-6 rounded-lg text-center transition-colors flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Book New Service</span>
                    </a>
                    
                    <a 
                      href="/services" 
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-4 px-6 rounded-lg text-center transition-colors flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span>View Services</span>
                    </a>
                    
                    <a 
                      href="/contact" 
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-4 px-6 rounded-lg text-center transition-colors flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>Contact Support</span>
                    </a>
                  </div>
                </div> */}

                {/* Next Service Due */}
                {getNextAppointment() ? (
                  <div className="bg-gold rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Next Service Due</h3>
                        <p className="text-white/90">
                          Your next service is scheduled for {formatDate(getNextAppointment().scheduled_date)} at {formatTime(getNextAppointment().scheduled_time)}
                        </p>
                        <a 
                          href="/services" 
                          className="mt-4 inline-block bg-white text-gold font-medium px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          Book Another Service
                        </a>
                      </div>
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">No Upcoming Services</h3>
                        <p className="text-gray-600">You don't have any scheduled services at the moment.</p>
                        {/* <a 
                          href="/services" 
                          className="mt-4 inline-block bg-gold text-white font-medium px-6 py-2 rounded-lg hover:bg-gold transition-colors"
                        >
                          Book Your First Service
                        </a> */}
                      </div>
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  {isLoadingOrders ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
                      <p className="mt-2 text-gray-600">Loading your orders...</p>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="bg-gray-50 rounded-lg p-4">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Order #{order.id.slice(-8)} - {order.items?.[0]?.name || 'Service'}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {formatDate(order.scheduled_date)} • {formatPrice(order.total)}
                            </p>
                            <p className="text-xs text-gray-400">
                              Status: {formatStatus(order.status)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">No orders yet. Book your first service!</p>
                      {/* <a 
                        href="/services" 
                        className="mt-4 inline-block bg-gold text-white font-medium px-6 py-2 rounded-lg hover:bg-gold transition-colors"
                      >
                        Browse Services
                      </a> */}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Your Appointments</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          viewMode === 'list' 
                            ? 'bg-white text-gray-900 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        List
                      </button>
                      <button
                        onClick={() => setViewMode('calendar')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          viewMode === 'calendar' 
                            ? 'bg-white text-gray-900 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Calendar
                      </button>
                    </div>
                    {/* <a 
                      href="/services" 
                      className="bg-gold hover:bg-gold text-white font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      Book New Appointment
                    </a> */}
                  </div>
                </div>

                {isLoadingOrders ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading your appointments...</p>
                  </div>
                ) : viewMode === 'calendar' ? (
                  <div className="space-y-6">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigateMonth(-1)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => navigateMonth(1)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {getCalendarDays(selectedDate).map((day, index) => (
                          <button
                            key={index}
                            onClick={() => day && setSelectedDate(day.date)}
                            disabled={!day}
                            className={`p-3 text-center rounded-lg transition-all ${
                              !day
                                ? 'invisible'
                                : day.isSelected
                                ? 'bg-gold text-white font-semibold'
                                : day.isToday
                                ? 'bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200'
                                : day.hasAppointment
                                ? 'bg-gold/20 text-gray-900 hover:bg-gold/30'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {day?.day}
                            {day?.hasAppointment && (
                              <div className="w-2 h-2 bg-gold rounded-full mx-auto mt-1"></div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Selected Date Appointments */}
                    {getAppointmentsForDate(selectedDate).length > 0 ? (
                      <div>
                        <h5 className="text-md font-semibold text-gray-900 mb-4">
                          Appointments for {formatDate(selectedDate.toISOString().split('T')[0])}
                        </h5>
                        <div className="space-y-3">
                          {getAppointmentsForDate(selectedDate).map((order) => (
                            <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </div>
                                  <div className="flex-1">
                                    <h6 className="font-medium text-gray-900">
                                      {order.items?.[0]?.name || 'Service'}
                                    </h6>
                                    <p className="text-sm text-gray-600">
                                      {formatTime(order.scheduled_time)} • {formatPrice(order.total)}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                       {order.location?.fullAddress || 'Location not specified'}
                                    </p>
                                    {order.notes && order.notes !== 'No notes' && (
                                      <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="flex items-start space-x-2">
                                          <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                          </svg>
                                          <div>
                                            <p className="text-xs font-medium text-gray-700 mb-1">Admin Notes:</p>
                                            <p className="text-xs text-gray-600">{order.notes}</p>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                    {formatStatus(order.status)}
                                  </div>
                                  {(order.status === 'pending' || order.status === 'confirmed') && (
                                    <button
                                      onClick={() => handleCancelClick(order)}
                                      disabled={cancelingOrderId === order.id}
                                      className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {cancelingOrderId === order.id ? 'Canceling...' : 'Cancel'}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600">No appointments on {formatDate(selectedDate.toISOString().split('T')[0])}</p>
                      </div>
                    )}
                  </div>
                ) : getUpcomingAppointments().length > 0 ? (
                  <div className="space-y-4">
                    {getUpcomingAppointments().map((order) => (
                      <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-900">
                                  {order.items?.[0]?.name || 'Service'}
                                </h4>
                                <p className="text-gray-600">
                                  {formatDate(order.scheduled_date)} at {formatTime(order.scheduled_time)}
                                </p>
                                <p className="text-sm text-gray-500">{order.location?.fullAddress}</p>
                                {order.notes && order.notes !== 'No notes' && (
                                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex items-start space-x-2">
                                      <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                      </svg>
                                      <div>
                                        <p className="text-sm font-medium text-gray-700 mb-1">Admin Notes:</p>
                                        <p className="text-sm text-gray-600">{order.notes}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="flex items-center justify-end space-x-3 mb-2">
                                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                    {formatStatus(order.status)}
                                  </div>
                                  {(order.status === 'pending' || order.status === 'confirmed') && (
                                    <button
                                      onClick={() => handleCancelClick(order)}
                                      disabled={cancelingOrderId === order.id}
                                      className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {cancelingOrderId === order.id ? 'Canceling...' : 'Cancel'}
                                    </button>
                                  )}
                                </div>
                                <p className="text-lg font-semibold text-gray-900">{formatPrice(order.total)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Appointments</h3>
                    <p className="text-gray-600 mb-4">You don't have any scheduled appointments at the moment.</p>
                    {/* <a 
                      href="/services" 
                      className="bg-gold text-white font-medium px-6 py-2 rounded-lg hover:bg-gold transition-colors"
                    >
                      Book Your First Service
                    </a> */}
                  </div>
                )}
              </div>
            )}

            {/* Service History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Service History</h3>
                
                {isLoadingOrders ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading your service history...</p>
                  </div>
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-900">
                                  Order #{order.id.slice(-8)} - {order.items?.[0]?.name || 'Service'}
                                </h4>
                                <p className="text-gray-600">
                                  {formatDate(order.scheduled_date)} • {formatPrice(order.total)}
                                </p>
                                <p className="text-sm text-gray-500 capitalize">
                                  Status: {formatStatus(order.status)}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Location: {order.location?.fullAddress}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Payment: {order.payment_method}
                                </p>
                                {order.notes && order.notes !== 'No notes' && (
                                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex items-start space-x-2">
                                      <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                      </svg>
                                      <div>
                                        <p className="text-sm font-medium text-gray-700 mb-1">Admin Notes:</p>
                                        <p className="text-sm text-gray-600">{order.notes}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                  {formatStatus(order.status)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Service History</h3>
                    <p className="text-gray-600 mb-4">You haven't completed any services yet.</p>
                    {/* <a 
                      href="/services" 
                      className="bg-gold text-white font-medium px-6 py-2 rounded-lg hover:bg-gold transition-colors"
                    >
                      Book Your First Service
                    </a> */}
                  </div>
                )}
              </div>
            )}


          </div>
        </div>
      </div>

      {/* Cancel Appointment Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Cancel Appointment</h3>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to cancel this appointment? This action cannot be undone.
              </p>
              
              {orderToCancel && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {orderToCancel.items?.[0]?.name || 'Service'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {formatDate(orderToCancel.scheduled_date)} at {formatTime(orderToCancel.scheduled_time)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={closeCancelModal}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Keep Appointment
              </button>
              <button
                onClick={cancelAppointment}
                disabled={cancelingOrderId === orderToCancel?.id}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {cancelingOrderId === orderToCancel?.id ? 'Canceling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 ${
            notification.type === 'error' 
              ? 'bg-red-500 text-white' 
              : 'bg-green-500 text-white'
          }`}>
            <div className="flex-shrink-0">
              {notification.type === 'error' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <p className="font-medium">{notification.message}</p>
            <button
              onClick={() => setNotification(null)}
              className="ml-2 text-white hover:text-gray-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}