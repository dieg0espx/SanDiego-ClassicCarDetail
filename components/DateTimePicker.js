'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function DateTimePicker({ onDateTimeSelected, selectedDate, selectedTime, onNext, refreshTrigger, showDebug = false }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [availableTimes, setAvailableTimes] = useState([])
  const [selectedDateState, setSelectedDateState] = useState(selectedDate || '')
  const [selectedTimeState, setSelectedTimeState] = useState(selectedTime || '')
  const [bookedSlots, setBookedSlots] = useState(new Set())
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false)
  const [availabilityError, setAvailabilityError] = useState(null)

  // Generate calendar data for current and next month
  const generateCalendarData = (date) => {
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
        value: currentDate.toISOString().split('T')[0],
        label: day.toString(),
        date: currentDate,
        isToday: currentDate.getTime() === today.getTime(),
        isPast: currentDate < today,
        isCurrentMonth: true
      })
    }
    
    return calendar
  }

  const [currentMonthCalendar, setCurrentMonthCalendar] = useState([])

  useEffect(() => {
    const current = generateCalendarData(currentMonth)
    setCurrentMonthCalendar(current)
  }, [currentMonth])

  // Generate available times (8AM-6PM, hourly slots)
  useEffect(() => {
    const times = []
    for (let hour = 8; hour <= 18; hour++) {
      const timeString = hour === 12 ? '12:00 PM' : 
                        hour > 12 ? `${hour - 12}:00 PM` : 
                        `${hour}:00 AM`
      times.push({
        value: `${hour.toString().padStart(2, '0')}:00`,
        label: timeString
      })
    }
    setAvailableTimes(times)
  }, [])

  // Check for existing bookings when date changes
  useEffect(() => {
    if (selectedDateState) {
      checkAvailability(selectedDateState)
    }
  }, [selectedDateState])

  // Refresh availability when refreshTrigger changes (e.g., after a booking is made)
  useEffect(() => {
    if (refreshTrigger && selectedDateState) {
      checkAvailability(selectedDateState)
    }
  }, [refreshTrigger, selectedDateState])

  const checkAvailability = async (date) => {
    setIsLoadingAvailability(true)
    setAvailabilityError(null)
    try {
      if (showDebug) console.log('🔍 Checking availability for date:', date)
      
      const { data: existingBookings, error } = await supabase
        .from('orders')
        .select('scheduled_time, status, customer_info, items')
        .eq('scheduled_date', date)
        .in('status', ['pending', 'confirmed', 'in_progress'])

      if (error) {
        console.error('❌ Error checking availability:', error)
        setAvailabilityError('Failed to check availability. Please try again.')
        return
      }

      if (showDebug) console.log('📅 Existing bookings found:', existingBookings)

      // Create a set of booked time slots
      const bookedTimes = new Set()
      existingBookings?.forEach(booking => {
        if (booking.scheduled_time) {
          // Normalize time format - convert HH:MM:SS to HH:MM
          const normalizedTime = booking.scheduled_time.substring(0, 5) // Take only HH:MM part
          if (showDebug) console.log('⏰ Adding booked time:', booking.scheduled_time, '-> normalized:', normalizedTime)
          bookedTimes.add(normalizedTime)
        }
      })

      if (showDebug) console.log('🚫 Booked time slots:', Array.from(bookedTimes))
      setBookedSlots(bookedTimes)
      
      // Clear selected time if it becomes booked
      if (selectedTimeState && bookedTimes.has(selectedTimeState)) {
        if (showDebug) console.log('⚠️ Selected time is now booked, clearing selection')
        setSelectedTimeState('')
        if (onDateTimeSelected) {
          onDateTimeSelected({ date: selectedDateState, time: '' })
        }
      }
    } catch (error) {
      console.error('❌ Error checking availability:', error)
      setAvailabilityError('Failed to check availability. Please try again.')
    } finally {
      setIsLoadingAvailability(false)
    }
  }

  const handleDateChange = (date) => {
    setSelectedDateState(date)
    setSelectedTimeState('') // Reset time when date changes
    if (onDateTimeSelected) {
      onDateTimeSelected({ date, time: '' })
    }
  }

  const handleTimeChange = (time) => {
    setSelectedTimeState(time)
    if (onDateTimeSelected && selectedDateState) {
      onDateTimeSelected({ date: selectedDateState, time })
    }
  }

  const handleNext = () => {
    if (selectedDateState && selectedTimeState && onNext) {
      onNext()
    }
  }

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(currentMonth.getMonth() + direction)
    setCurrentMonth(newMonth)
  }

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const getDayName = (dayIndex) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[dayIndex]
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
      
      {/* Date Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose a Date</h3>
        
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
            {currentMonthCalendar.map((day, index) => (
              <button
                key={index}
                onClick={() => day && !day.isPast && handleDateChange(day.value)}
                disabled={!day || day.isPast}
                className={`p-3 sm:p-4 text-center rounded-lg transition-all min-h-[48px] sm:min-h-[56px] flex items-center justify-center ${
                  !day
                    ? 'invisible'
                    : day.isPast
                    ? 'text-gray-300 cursor-not-allowed'
                    : selectedDateState === day.value
                    ? 'bg-gold text-white font-semibold'
                    : day.isToday
                    ? 'bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {day?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Month Navigation - Moved below calendar for mobile */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] touch-manipulation flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 min-w-[180px] sm:min-w-[200px] text-center">
            {formatMonthYear(currentMonth)}
          </h4>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] touch-manipulation flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Time Selection */}
      {selectedDateState && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose a Time</h3>
          
          {isLoadingAvailability ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
              <span className="ml-3 text-gray-600">Checking availability...</span>
            </div>
          ) : availabilityError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-red-800">Error</h4>
                  <p className="text-sm text-red-700 mt-1">{availabilityError}</p>
                  <button 
                    onClick={() => checkAvailability(selectedDateState)}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
              {availableTimes
                .filter(time => !bookedSlots.has(time.value)) // Hide booked slots completely
                .map((time) => {
                  const isSelected = selectedTimeState === time.value
                  
                  return (
                    <button
                      key={time.value}
                      onClick={() => handleTimeChange(time.value)}
                      className={`p-2 sm:p-3 text-center rounded-lg border-2 transition-all text-sm sm:text-base ${
                        isSelected
                          ? 'border-gold bg-gold text-white'
                          : 'border-gray-200 hover:border-gold/50 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{time.label}</div>
                    </button>
                  )
                })}
            </div>
          )}
        </div>
      )}

      {/* Selected Date/Time Display */}
      {selectedDateState && selectedTimeState && (
        <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
          <h4 className="font-semibold text-gold mb-2">Selected Appointment</h4>
          <div className="text-gray-900">
            <div className="font-medium">
              {new Date(selectedDateState + 'T00:00:00').toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-sm text-gray-600">
              {availableTimes.find(t => t.value === selectedTimeState)?.label}
            </div>
          </div>
        </div>
      )}

      {/* Debug Panel - Only show when showDebug is true */}
      {showDebug && selectedDateState && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">Debug Info</h4>
          <div className="text-xs text-yellow-700 space-y-1">
            <div><strong>Selected Date:</strong> {selectedDateState}</div>
            <div><strong>Selected Time:</strong> {selectedTimeState || 'None'}</div>
            <div><strong>Booked Slots:</strong> {Array.from(bookedSlots).join(', ') || 'None'}</div>
            <div><strong>Total Booked:</strong> {bookedSlots.size}</div>
            <div><strong>Available Times:</strong> {availableTimes.length}</div>
            <div className="mt-2 p-2 bg-white rounded border">
              <strong>Time Slot Status:</strong>
              <div className="text-xs">
                <div>Total Available: {availableTimes.length}</div>
                <div>Booked (Hidden): {bookedSlots.size}</div>
                <div>Shown to User: {availableTimes.length - bookedSlots.size}</div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <strong>Hidden Slots:</strong> {Array.from(bookedSlots).join(', ') || 'None'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Business Hours Notice */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-800">Business Hours</h4>
            <p className="text-sm text-blue-700 mt-1">
              We're open 7 days a week from 8:00 AM to 6:00 PM. 
              Please select your preferred date and time for service.
            </p>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!selectedDateState || !selectedTimeState}
          className={`px-8 py-3 rounded-lg font-medium transition-colors ${
            selectedDateState && selectedTimeState
              ? 'bg-gold hover:bg-gold text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}
