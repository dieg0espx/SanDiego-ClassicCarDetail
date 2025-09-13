'use client'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)) // September 2025
  const [selectedDate, setSelectedDate] = useState(null)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    } else if (user) {
      // Check if user is admin
      const adminEmail = 'aletxa.pascual@gmail.com'
      if (user.email === adminEmail) {
        setIsAdmin(true)
      } else {
        router.push('/dashboard')
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  const getUserDisplayName = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
    }
    return user?.email || 'Admin'
  }

  // Mock data for admin dashboard
  const mockData = {
    totalUsers: 156,
    totalServices: 342,
    totalRevenue: 68400,
    pendingAppointments: 8,
    recentUsers: [
      {
        id: 1,
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        joinDate: '2024-01-15',
        services: 3
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+1 (555) 987-6543',
        joinDate: '2024-01-14',
        services: 1
      },
      {
        id: 3,
        name: 'Mike Davis',
        email: 'mike@example.com',
        phone: '+1 (555) 456-7890',
        joinDate: '2024-01-13',
        services: 5
      }
    ],
    recentServices: [
      {
        id: 1,
        customer: 'John Smith',
        service: 'The Sunset Shine',
        date: '2024-01-20',
        status: 'completed',
        amount: 200
      },
      {
        id: 2,
        customer: 'Sarah Johnson',
        service: 'The Classic Wash',
        date: '2024-01-19',
        status: 'completed',
        amount: 170
      },
      {
        id: 3,
        customer: 'Mike Davis',
        service: 'The Hot Rod Detail',
        date: '2024-01-18',
        status: 'pending',
        amount: 270
      }
    ],
    appointments: [
      // September 3, 2025 - Single appointment
      {
        id: 1,
        customer: 'John Smith',
        service: 'The Sunset Shine',
        date: '2025-09-03',
        time: '09:00 AM',
        status: 'confirmed',
        amount: 200,
        phone: '+1 (555) 123-4567',
        email: 'john@example.com',
        notes: 'Customer requested extra attention to paint protection'
      },
      // September 6, 2025 - Busy day with 4 appointments
      {
        id: 2,
        customer: 'Sarah Johnson',
        service: 'The Classic Wash',
        date: '2025-09-06',
        time: '08:00 AM',
        status: 'confirmed',
        amount: 170,
        phone: '+1 (555) 987-6543',
        email: 'sarah@example.com',
        notes: 'First time customer'
      },
      {
        id: 3,
        customer: 'Mike Davis',
        service: 'The Hot Rod Detail',
        date: '2025-09-06',
        time: '10:30 AM',
        status: 'confirmed',
        amount: 270,
        phone: '+1 (555) 456-7890',
        email: 'mike@example.com',
        notes: 'Classic 1969 Mustang'
      },
      {
        id: 4,
        customer: 'Emily Rodriguez',
        service: 'The Sunset Shine',
        date: '2025-09-06',
        time: '02:00 PM',
        status: 'pending',
        amount: 200,
        phone: '+1 (555) 234-5678',
        email: 'emily@example.com',
        notes: 'Luxury SUV - premium package'
      },
      {
        id: 5,
        customer: 'Robert Martinez',
        service: 'The Classic Wash',
        date: '2025-09-06',
        time: '04:00 PM',
        status: 'confirmed',
        amount: 170,
        phone: '+1 (555) 345-6789',
        email: 'robert@example.com',
        notes: 'Regular customer - monthly service'
      },
      // September 8, 2025 - Two appointments
      {
        id: 6,
        customer: 'Lisa Thompson',
        service: 'The Hot Rod Detail',
        date: '2025-09-08',
        time: '11:00 AM',
        status: 'confirmed',
        amount: 270,
        phone: '+1 (555) 456-7890',
        email: 'lisa@example.com',
        notes: 'Sports car - needs paint correction'
      },
      {
        id: 7,
        customer: 'David Chen',
        service: 'The Sunset Shine',
        date: '2025-09-08',
        time: '03:30 PM',
        status: 'pending',
        amount: 200,
        phone: '+1 (555) 567-8901',
        email: 'david@example.com',
        notes: 'Tesla Model S - ceramic coating'
      },
      // September 10, 2025 - Three appointments
      {
        id: 8,
        customer: 'Amanda Wilson',
        service: 'The Classic Wash',
        date: '2025-09-10',
        time: '09:30 AM',
        status: 'confirmed',
        amount: 170,
        phone: '+1 (555) 678-9012',
        email: 'amanda@example.com',
        notes: 'BMW 3 Series - regular maintenance'
      },
      {
        id: 9,
        customer: 'Carlos Mendez',
        service: 'The Hot Rod Detail',
        date: '2025-09-10',
        time: '01:00 PM',
        status: 'confirmed',
        amount: 270,
        phone: '+1 (555) 789-0123',
        email: 'carlos@example.com',
        notes: '1970 Chevrolet Camaro - show prep'
      },
      {
        id: 10,
        customer: 'Jennifer Lee',
        service: 'The Sunset Shine',
        date: '2025-09-10',
        time: '04:30 PM',
        status: 'pending',
        amount: 200,
        phone: '+1 (555) 890-1234',
        email: 'jennifer@example.com',
        notes: 'Mercedes-Benz - luxury detail'
      },
      // September 12, 2025 - Single appointment
      {
        id: 11,
        customer: 'Thomas Brown',
        service: 'The Classic Wash',
        date: '2025-09-12',
        time: '10:00 AM',
        status: 'confirmed',
        amount: 170,
        phone: '+1 (555) 901-2345',
        email: 'thomas@example.com',
        notes: 'Audi A4 - weekly wash'
      },
      // September 14, 2025 - Two appointments
      {
        id: 12,
        customer: 'Maria Garcia',
        service: 'The Sunset Shine',
        date: '2025-09-14',
        time: '08:30 AM',
        status: 'confirmed',
        amount: 200,
        phone: '+1 (555) 012-3456',
        email: 'maria@example.com',
        notes: 'Range Rover - family vehicle'
      },
      {
        id: 13,
        customer: 'James Taylor',
        service: 'The Hot Rod Detail',
        date: '2025-09-14',
        time: '02:00 PM',
        status: 'pending',
        amount: 270,
        phone: '+1 (555) 123-4567',
        email: 'james@example.com',
        notes: 'Porsche 911 - track day prep'
      },
      // September 16, 2025 - Very busy day with 5 appointments
      {
        id: 14,
        customer: 'Rachel Green',
        service: 'The Classic Wash',
        date: '2025-09-16',
        time: '07:30 AM',
        status: 'confirmed',
        amount: 170,
        phone: '+1 (555) 234-5678',
        email: 'rachel@example.com',
        notes: 'Honda Civic - eco-friendly wash'
      },
      {
        id: 15,
        customer: 'Kevin Johnson',
        service: 'The Sunset Shine',
        date: '2025-09-16',
        time: '09:45 AM',
        status: 'confirmed',
        amount: 200,
        phone: '+1 (555) 345-6789',
        email: 'kevin@example.com',
        notes: 'Ford F-150 - truck detailing'
      },
      {
        id: 16,
        customer: 'Nicole Adams',
        service: 'The Classic Wash',
        date: '2025-09-16',
        time: '12:00 PM',
        status: 'confirmed',
        amount: 170,
        phone: '+1 (555) 456-7890',
        email: 'nicole@example.com',
        notes: 'Toyota Prius - hybrid vehicle'
      },
      {
        id: 17,
        customer: 'Steven Clark',
        service: 'The Hot Rod Detail',
        date: '2025-09-16',
        time: '02:15 PM',
        status: 'pending',
        amount: 270,
        phone: '+1 (555) 567-8901',
        email: 'steven@example.com',
        notes: 'Dodge Challenger - muscle car detail'
      },
      {
        id: 18,
        customer: 'Ashley White',
        service: 'The Sunset Shine',
        date: '2025-09-16',
        time: '05:00 PM',
        status: 'confirmed',
        amount: 200,
        phone: '+1 (555) 678-9012',
        email: 'ashley@example.com',
        notes: 'Lexus RX - luxury SUV'
      },
      // September 18, 2025 - Single appointment
      {
        id: 19,
        customer: 'Daniel Kim',
        service: 'The Classic Wash',
        date: '2025-09-18',
        time: '11:30 AM',
        status: 'confirmed',
        amount: 170,
        phone: '+1 (555) 789-0123',
        email: 'daniel@example.com',
        notes: 'Subaru Outback - adventure vehicle'
      },
      // September 20, 2025 - Two appointments
      {
        id: 20,
        customer: 'Michelle Chang',
        service: 'The Sunset Shine',
        date: '2025-09-20',
        time: '09:00 AM',
        status: 'confirmed',
        amount: 200,
        phone: '+1 (555) 890-1234',
        email: 'michelle@example.com',
        notes: 'Lexus IS - premium sedan'
      },
      {
        id: 21,
        customer: 'Ryan O\'Connor',
        service: 'The Hot Rod Detail',
        date: '2025-09-20',
        time: '01:30 PM',
        status: 'pending',
        amount: 270,
        phone: '+1 (555) 901-2345',
        email: 'ryan@example.com',
        notes: '1967 Shelby GT500 - concours prep'
      },
      // September 22, 2025 - Single appointment
      {
        id: 22,
        customer: 'Patricia Williams',
        service: 'The Classic Wash',
        date: '2025-09-22',
        time: '10:30 AM',
        status: 'confirmed',
        amount: 170,
        phone: '+1 (555) 012-3456',
        email: 'patricia@example.com',
        notes: 'Volvo XC90 - family SUV'
      },
      // September 25, 2025 - Three appointments
      {
        id: 23,
        customer: 'Marcus Johnson',
        service: 'The Sunset Shine',
        date: '2025-09-25',
        time: '08:00 AM',
        status: 'confirmed',
        amount: 200,
        phone: '+1 (555) 123-4567',
        email: 'marcus@example.com',
        notes: 'Cadillac Escalade - luxury detail'
      },
      {
        id: 24,
        customer: 'Sophie Anderson',
        service: 'The Classic Wash',
        date: '2025-09-25',
        time: '11:15 AM',
        status: 'confirmed',
        amount: 170,
        phone: '+1 (555) 234-5678',
        email: 'sophie@example.com',
        notes: 'Mini Cooper - fun car wash'
      },
      {
        id: 25,
        customer: 'Brandon Lee',
        service: 'The Hot Rod Detail',
        date: '2025-09-25',
        time: '03:45 PM',
        status: 'pending',
        amount: 270,
        phone: '+1 (555) 345-6789',
        email: 'brandon@example.com',
        notes: 'Nissan GT-R - performance detail'
      },
      // September 27, 2025 - Single appointment
      {
        id: 26,
        customer: 'Victoria Torres',
        service: 'The Sunset Shine',
        date: '2025-09-27',
        time: '02:00 PM',
        status: 'confirmed',
        amount: 200,
        phone: '+1 (555) 456-7890',
        email: 'victoria@example.com',
        notes: 'Infiniti QX80 - luxury SUV detail'
      }
    ]
  }

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const getAppointmentsForDate = (date) => {
    const dateStr = formatDate(date)
    return mockData.appointments.filter(appointment => appointment.date === dateStr)
  }

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const handleDateClick = (date) => {
    const appointments = getAppointmentsForDate(date)
    if (appointments.length > 0) {
      setSelectedDate(date)
      setShowAppointmentModal(true)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
    { id: 'calendar', label: 'Calendar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
    { id: 'services', label: 'Services', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-gold text-white'
      case 'cancelled': return 'bg-black text-white'
      case 'confirmed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeClasses = (status) => {
    const colorClasses = getStatusColor(status)
    return `px-2 py-0.5 text-xs rounded-full font-medium text-center leading-tight ${colorClasses}`
  }

  const capitalizeStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {getUserDisplayName()}</p>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{mockData.totalUsers}</div>
                <div className="text-sm text-gray-500">Total Users</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{mockData.totalServices}</div>
                <div className="text-sm text-gray-500">Total Services</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">${mockData.totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Total Revenue</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{mockData.pendingAppointments}</div>
                <div className="text-sm text-gray-500">Pending</div>
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Users */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-4">
                        {mockData.recentUsers.map((user) => (
                          <div key={user.id} className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{user.name}</h4>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">{user.services} services</div>
                              <div className="text-xs text-gray-500">{user.joinDate}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Services */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Services</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-4">
                        {mockData.recentServices.map((service) => (
                          <div key={service.id} className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{service.customer}</h4>
                              <p className="text-sm text-gray-500">{service.service}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">${service.amount}</div>
                              <div className={getStatusBadgeClasses(service.status)}>
                                {capitalizeStatus(service.status)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Calendar Tab */}
            {activeTab === 'calendar' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Appointment Calendar</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h4 className="text-lg font-medium text-gray-900 min-w-[200px] text-center">
                      {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h4>
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
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-7 bg-gray-50">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-4 text-center font-medium text-gray-500 border-r border-gray-200 last:border-r-0">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7">
                    {Array.from({ length: getFirstDayOfMonth(currentDate) }, (_, i) => (
                      <div key={`empty-${i}`} className="h-40 border-r border-b border-gray-200 last:border-r-0"></div>
                    ))}
                    {Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => {
                      const day = i + 1
                      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                      const appointments = getAppointmentsForDate(date)
                      const isToday = formatDate(date) === formatDate(new Date())
                      
                      return (
                        <div
                          key={day}
                          onClick={() => handleDateClick(date)}
                          className={`h-40 border-r border-b border-gray-200 last:border-r-0 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                            isToday ? 'bg-gold bg-opacity-10' : ''
                          } ${appointments.length > 0 ? 'bg-blue-50' : ''}`}
                        >
                          <div className={`text-sm font-medium ${isToday ? 'text-gold' : 'text-gray-900'}`}>
                            {day}
                          </div>
                          {appointments.length > 0 && (
                            <div className="mt-1 space-y-1">
                              {appointments.slice(0, 3).map(appointment => (
                                <div
                                  key={appointment.id}
                                  className="text-xs bg-gold text-white px-2 py-1 rounded w-full"
                                  title={`${appointment.customer} - ${appointment.service}`}
                                >
                                  <div className="truncate">
                                    {appointment.time} {appointment.customer}
                                  </div>
                                </div>
                              ))}
                              {appointments.length > 3 && (
                                <div className="text-xs text-gray-500">
                                  +{appointments.length - 3} more
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
                  <button className="bg-gold hover:bg-gold text-white font-medium px-4 py-2 rounded-lg transition-colors">
                    Export Users
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockData.recentUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{user.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{user.services}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{user.joinDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-gold hover:text-gold mr-4">View</button>
                            <button className="text-gray-600 hover:text-gray-800">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Service Management</h3>
                  <div className="flex space-x-3">
                    <button className="bg-gold hover:bg-gold text-white font-medium px-4 py-2 rounded-lg transition-colors">
                      Add Service
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors">
                      Export Data
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockData.recentServices.map((service) => (
                        <tr key={service.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{service.customer}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{service.service}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{service.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">${service.amount}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={getStatusBadgeClasses(service.status)}>
                              {capitalizeStatus(service.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-gold hover:text-gold mr-4">View</button>
                            <button className="text-gray-600 hover:text-gray-800">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Analytics & Reports</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Service Popularity</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">The Sunset Shine</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">The Classic Wash</span>
                        <span className="font-medium">35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">The Hot Rod Detail</span>
                        <span className="font-medium">20%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Monthly Revenue</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">January 2024</span>
                        <span className="font-medium">$18,400</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">December 2023</span>
                        <span className="font-medium">$22,100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">November 2023</span>
                        <span className="font-medium">$19,800</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      {showAppointmentModal && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Appointments for {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {getAppointmentsForDate(selectedDate).map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{appointment.customer}</h4>
                        <p className="text-gray-600">{appointment.service}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">${appointment.amount}</div>
                        <span className={getStatusBadgeClasses(appointment.status)}>
                          {capitalizeStatus(appointment.status)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center mb-2">
                          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium text-gray-700">Time:</span>
                          <span className="ml-2 text-gray-900">{appointment.time}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="font-medium text-gray-700">Phone:</span>
                          <span className="ml-2 text-gray-900">{appointment.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium text-gray-700">Email:</span>
                          <span className="ml-2 text-gray-900">{appointment.email}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-2">
                          <span className="font-medium text-gray-700">Notes:</span>
                          <p className="text-gray-900 mt-1">{appointment.notes}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-gray-100">
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        Edit
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-gold hover:bg-gold rounded-lg transition-colors">
                        Call Customer
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
