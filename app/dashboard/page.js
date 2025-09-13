'use client'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!loading && !user) {
      console.log('No user found, redirecting to homepage')
      router.push('/')
    } else if (!loading && user) {
      console.log('User found:', user.email)
    }
  }, [user, loading, router])

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

  // Mock data - in real app, this would come from your database
  const mockData = {
    nextServiceDue: '2024-02-15',
    totalServices: 12,
    totalSpent: 2400,
    upcomingAppointments: [
      {
        id: 1,
        service: 'The Sunset Shine',
        date: '2024-01-25',
        time: '10:00 AM',
        status: 'confirmed',
        price: 200,
        location: '123 Main St, Vista, CA'
      },
      {
        id: 2,
        service: 'The Classic Wash',
        date: '2024-02-08',
        time: '2:00 PM',
        status: 'pending',
        price: 170,
        location: '123 Main St, Vista, CA'
      }
    ],
    recentServices: [
      {
        id: 1,
        service: 'The Hot Rod Detail',
        date: '2024-01-10',
        rating: 5,
        price: 270,
        addOns: ['Headlight Restoration'],
        technician: 'Mike Johnson',
        notes: 'Excellent service! Car looks brand new.'
      },
      {
        id: 2,
        service: 'The Sunset Shine',
        date: '2023-12-28',
        rating: 5,
        price: 200,
        technician: 'Sarah Davis',
        notes: 'Perfect for the holidays!'
      },
      {
        id: 3,
        service: 'The Classic Wash',
        date: '2023-12-15',
        rating: 4,
        price: 170,
        technician: 'Mike Johnson',
        notes: 'Quick and efficient service.'
      }
    ],
    vehicles: [
      {
        id: 1,
        make: 'BMW',
        model: 'X5',
        year: '2020',
        color: 'Black',
        lastService: '2024-01-10',
        nextDue: '2024-02-15'
      },
      {
        id: 2,
        make: 'Honda',
        model: 'Civic',
        year: '2018',
        color: 'Silver',
        lastService: '2023-12-28',
        nextDue: '2024-01-28'
      }
    ]
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-gold text-white'
      case 'completed': return 'bg-black text-white'
      default: return 'bg-gray-100 text-gray-800'
    }
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
    { id: 'history', label: 'Service History', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'vehicles', label: 'My Vehicles', icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z' }
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
                <div>
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
                </div>

                {/* Next Service Due */}
                <div className="bg-gold rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Next Service Due</h3>
                      <p className="text-white/90">Your BMW X5 is due for service on {mockData.nextServiceDue}</p>
                      <button className="mt-4 bg-white text-gold font-medium px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                        Book Now
                      </button>
                    </div>
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {mockData.recentServices.slice(0, 2).map((service) => (
                      <div key={service.id} className="bg-gray-50 rounded-lg p-4">
                        <div>
                          <h4 className="font-medium text-gray-900">{service.service}</h4>
                          <p className="text-sm text-gray-500">{service.date} • ${service.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Your Appointments</h3>
                  <a 
                    href="tel:(760) 518-8451" 
                    className="bg-gold hover:bg-gold text-white font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Book New Appointment
                  </a>
                </div>

                <div className="space-y-4">
                  {mockData.upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="bg-white border border-gray-200 rounded-lg p-6">
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
                              <h4 className="text-lg font-semibold text-gray-900">{appointment.service}</h4>
                              <p className="text-gray-600">{appointment.date} at {appointment.time}</p>
                              <p className="text-sm text-gray-500">{appointment.location}</p>
                            </div>
                            <div className="text-right">
                              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                                {appointment.status}
                              </div>
                              <p className="text-lg font-semibold text-gray-900 mt-2">${appointment.price}</p>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex space-x-2">
                          <button className="text-gold hover:text-gold text-sm font-medium">
                            Reschedule
                          </button>
                          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Service History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Service History</h3>
                
                <div className="space-y-4">
                  {mockData.recentServices.map((service) => (
                    <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-6">
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
                              <h4 className="text-lg font-semibold text-gray-900">{service.service}</h4>
                              <p className="text-gray-600">{service.date} • ${service.price}</p>
                              <p className="text-sm text-gray-500">Technician: {service.technician}</p>
                              {service.addOns && (
                                <p className="text-sm text-gold font-medium">
                                  Add-ons: {service.addOns.join(', ')}
                                </p>
                              )}
                              <p className="text-sm text-gray-600 mt-2">{service.notes}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              {getRatingStars(service.rating)}
                            </div>
                          </div>
                        </div>
                        <button className="ml-4 text-gold hover:text-gold text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vehicles Tab */}
            {activeTab === 'vehicles' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">My Vehicles</h3>
                  <button className="bg-gold hover:bg-gold text-white font-medium px-4 py-2 rounded-lg transition-colors">
                    Add Vehicle
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockData.vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h4>
                          <p className="text-gray-600">{vehicle.color}</p>
                          <p className="text-sm text-gray-500">Last service: {vehicle.lastService}</p>
                          <p className="text-sm text-gold font-medium">Next due: {vehicle.nextDue}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-gold hover:text-gold text-sm font-medium">
                            Edit
                          </button>
                          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}