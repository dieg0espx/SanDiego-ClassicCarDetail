'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import DateTimePicker from '../../components/DateTimePicker'

export default function TestBooking() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Fetch existing bookings
  const fetchBookings = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('id, scheduled_date, scheduled_time, status, customer_info')
        .order('scheduled_date', { ascending: true })
        .order('scheduled_time', { ascending: true })

      if (error) {
        console.error('Error fetching bookings:', error)
        return
      }

      setBookings(data || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  // Create a test booking
  const createTestBooking = async (serviceName = 'Test Service') => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time')
      return
    }

    if (!user) {
      alert('Please log in to create test bookings')
      return
    }

    setLoading(true)
    try {
      const testBooking = {
        user_id: user.id, // Use actual logged-in user
        customer_info: {
          firstName: user.user_metadata?.first_name || 'Test',
          lastName: user.user_metadata?.last_name || 'User',
          email: user.email || 'test@example.com',
          phone: user.user_metadata?.phone || '555-0123'
        },
        location: {
          address: '123 Test St',
          city: 'San Diego',
          state: 'CA',
          zipCode: '92101'
        },
        items: [{
          name: serviceName,
          price: 100
        }],
        total: 100,
        service_area_cost: 0,
        status: 'pending',
        payment_method: 'cash',
        scheduled_date: selectedDate,
        scheduled_time: selectedTime
      }

      const { data, error } = await supabase
        .from('orders')
        .insert([testBooking])
        .select()
        .single()

      if (error) {
        console.error('Error creating test booking:', error)
        alert('Error creating test booking: ' + error.message)
        return
      }

      console.log('Test booking created:', data)
      alert('Test booking created successfully!')
      
      // Refresh bookings and trigger availability refresh
      await fetchBookings()
      setRefreshTrigger(prev => prev + 1)
    } catch (error) {
      console.error('Error creating test booking:', error)
      alert('Error creating test booking: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // Delete a booking
  const deleteBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to delete this booking?')) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', bookingId)

      if (error) {
        console.error('Error deleting booking:', error)
        alert('Error deleting booking: ' + error.message)
        return
      }

      alert('Booking deleted successfully!')
      
      // Refresh bookings and trigger availability refresh
      await fetchBookings()
      setRefreshTrigger(prev => prev + 1)
    } catch (error) {
      console.error('Error deleting booking:', error)
      alert('Error deleting booking: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDateTimeSelected = ({ date, time }) => {
    setSelectedDate(date)
    setSelectedTime(time)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h1>
          <p className="text-gray-600">You need to be logged in to access the booking test page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Booking System Test</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Date/Time Picker */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Test Booking</h2>
            <DateTimePicker 
              onDateTimeSelected={handleDateTimeSelected}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              refreshTrigger={refreshTrigger}
              showDebug={true}
            />
            
            <div className="mt-4 space-y-2">
              <button
                onClick={() => createTestBooking('Classic Wash')}
                disabled={!selectedDate || !selectedTime || loading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  selectedDate && selectedTime && !loading
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'Creating...' : 'Book Classic Wash'}
              </button>
              
              <button
                onClick={() => createTestBooking('Hot Rod Detail')}
                disabled={!selectedDate || !selectedTime || loading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  selectedDate && selectedTime && !loading
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'Creating...' : 'Book Hot Rod Detail'}
              </button>
              
              <button
                onClick={() => createTestBooking('Sunset Shine')}
                disabled={!selectedDate || !selectedTime || loading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  selectedDate && selectedTime && !loading
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'Creating...' : 'Book Sunset Shine'}
              </button>
            </div>
          </div>

          {/* Existing Bookings */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Existing Bookings</h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No bookings found</p>
                ) : (
                  bookings.map((booking) => (
                    <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-900">
                            {booking.customer_info?.firstName} {booking.customer_info?.lastName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(booking.scheduled_date + 'T00:00:00').toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="text-sm text-gray-600">
                            {booking.scheduled_time}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Status: <span className={`font-medium ${
                              booking.status === 'pending' ? 'text-yellow-600' :
                              booking.status === 'confirmed' ? 'text-green-600' :
                              booking.status === 'in_progress' ? 'text-blue-600' :
                              'text-gray-600'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Debug Panel */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Debug Info</h2>
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
              <div className="space-y-2 text-sm">
                <div><strong>Selected Date:</strong> {selectedDate || 'None'}</div>
                <div><strong>Selected Time:</strong> {selectedTime || 'None'}</div>
                <div><strong>Total Bookings:</strong> {bookings.length}</div>
                <div><strong>Refresh Trigger:</strong> {refreshTrigger}</div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Bookings for Selected Date:</h4>
                {selectedDate ? (
                  <div className="space-y-1">
                    {bookings
                      .filter(booking => booking.scheduled_date === selectedDate)
                      .map(booking => (
                        <div key={booking.id} className="text-xs bg-white p-2 rounded border">
                          <div><strong>Time:</strong> {booking.scheduled_time}</div>
                          <div><strong>Service:</strong> {booking.items?.[0]?.name || 'Unknown'}</div>
                          <div><strong>Status:</strong> {booking.status}</div>
                        </div>
                      ))
                    }
                    {bookings.filter(booking => booking.scheduled_date === selectedDate).length === 0 && (
                      <div className="text-xs text-gray-500">No bookings for this date</div>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">Select a date to see bookings</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Test Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Select a date and time from the calendar</li>
            <li>Click any service button (Classic Wash, Hot Rod Detail, or Sunset Shine) to create a booking</li>
            <li>Notice that the selected time slot becomes unavailable</li>
            <li>Try booking a DIFFERENT service at the same time - it should be blocked</li>
            <li>Try selecting the same date again - the booked time should be disabled</li>
            <li>Delete a booking to make that time slot available again</li>
            <li>Check the browser console for debugging information</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
