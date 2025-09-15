'use client'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { FiUsers } from "react-icons/fi"

export default function AdminDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)) // September 2025
  const [selectedDate, setSelectedDate] = useState(null)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingOrder, setEditingOrder] = useState(null)
  const [editNotes, setEditNotes] = useState('')
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [orderToComplete, setOrderToComplete] = useState(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // Fetch orders from Supabase
  const fetchOrders = async () => {
    setOrdersLoading(true)
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error)
        return
      }

      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setOrdersLoading(false)
    }
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    } else if (user) {
      // Check if user is admin
      const adminEmail = 'aletxa.pascual@gmail.com'
      if (user.email === adminEmail) {
        setIsAdmin(true)
        fetchOrders() // Fetch orders when admin loads
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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
          <p className="text-sm text-gray-500 mt-2">Debug: isAdmin = {isAdmin.toString()}, user = {user?.email || 'null'}</p>
        </div>
      </div>
    )
  }

  const getUserDisplayName = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
    }
    return user?.email || 'Admin'
  }

  // Helper functions to calculate real statistics from orders
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeStr) => {
    if (!timeStr) return 'N/A'
    const hour = parseInt(timeStr.split(':')[0])
    return hour === 12 ? '12:00 PM' :
           hour > 12 ? `${hour - 12}:00 PM` :
           `${hour}:00 AM`
  }


  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')
  }

  // Helper functions to get all users (from orders only)
  const getUniqueUsers = () => {
    const userMap = new Map()
    
    // Add users from orders
    orders.forEach(order => {
      if (order.user_id && order.customer_info) {
        if (!userMap.has(order.user_id)) {
          userMap.set(order.user_id, {
            id: order.user_id,
            first_name: order.customer_info.firstName || 'Unknown',
            last_name: order.customer_info.lastName || 'User',
            email: order.customer_info.email || 'No email',
            phone: order.customer_info.phone || 'No phone',
            created_at: order.created_at,
            order_count: 0,
            total_spent: 0,
            recent_orders: []
          })
        }
        const user = userMap.get(order.user_id)
        user.order_count++
        user.total_spent += order.total || 0
        user.recent_orders.push(order)
      }
    })
    
    // Sort recent orders by date (newest first) and limit to 10
    userMap.forEach(user => {
      user.recent_orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      user.recent_orders = user.recent_orders.slice(0, 10)
    })
    
    const users = Array.from(userMap.values()).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    return users
  }

  const getUsersCount = () => {
    return getUniqueUsers().length
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


  const getAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return orders
      .filter(order => 
        order.scheduled_date === dateStr && 
        order.scheduled_time &&
        order.status !== 'cancelled'
      )
      .map(order => ({
        id: order.id,
        customer: `${order.customer_info?.firstName || ''} ${order.customer_info?.lastName || ''}`.trim() || 'Unknown Customer',
        service: order.items?.[0]?.name || 'Service',
        time: formatTime(order.scheduled_time),
        amount: order.total || 0,
        phone: order.customer_info?.phone || 'No phone',
        email: order.customer_info?.email || 'No email',
        notes: order.notes || 'No notes',
        status: order.status || 'pending',
        location: order.location?.fullAddress || 'No address',
        serviceArea: order.location?.serviceAreaName || '',
        scheduled_time: order.scheduled_time // Keep original time for sorting
      }))
      .sort((a, b) => {
        // Sort by scheduled_time (HH:MM format)
        if (a.scheduled_time && b.scheduled_time) {
          return a.scheduled_time.localeCompare(b.scheduled_time)
        }
        // If one doesn't have time, put it at the end
        if (a.scheduled_time && !b.scheduled_time) return -1
        if (!a.scheduled_time && b.scheduled_time) return 1
        return 0
      })
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

  const handleEditAppointment = (appointment) => {
    setEditingOrder(appointment)
    setEditNotes(appointment.notes || '')
    setShowEditModal(true)
  }

  const handleSaveNotes = async () => {
    if (!editingOrder) return

    try {
      console.log('Updating notes for order:', editingOrder.id)
      console.log('Notes to save:', editNotes)
      
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          notes: editNotes
        })
        .eq('id', editingOrder.id)
        .select()

      if (error) {
        console.error('Error updating notes:', error)
        console.error('Full error details:', error)
        alert(`Failed to update notes: ${error.message}`)
        return
      }

      console.log('Successfully updated notes:', data)

      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === editingOrder.id 
            ? { ...order, notes: editNotes }
            : order
        )
      )

      setShowEditModal(false)
      setEditingOrder(null)
      setEditNotes('')
    } catch (error) {
      console.error('Error updating notes:', error)
      alert('Failed to update notes. Please try again.')
    }
  }

  const handleMarkCompleteClick = (order) => {
    setOrderToComplete(order)
    setShowConfirmModal(true)
  }

  const handleConfirmComplete = async () => {
    if (!orderToComplete) return

    try {
      console.log('Updating status for order:', orderToComplete.id, 'to: completed')
      
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', orderToComplete.id)
        .select()

      if (error) {
        console.error('Error updating status:', error)
        alert(`Failed to update status: ${error.message}`)
        return
      }

      console.log('Successfully updated status:', data)

      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderToComplete.id 
            ? { ...order, status: 'completed' }
            : order
        )
      )

      alert(`Order #${orderToComplete.id.slice(-8)} has been marked as completed!`)
      
      // Close modal and reset state
      setShowConfirmModal(false)
      setOrderToComplete(null)
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status. Please try again.')
    }
  }

  const handleCancelComplete = () => {
    setShowConfirmModal(false)
    setOrderToComplete(null)
  }

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const handleCloseUserModal = () => {
    setShowUserModal(false)
    setSelectedUser(null)
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
    { id: 'orders', label: 'Services', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'calendar', label: 'Calendar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
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

  // Analytics functions
  const getServicePopularity = () => {
    const serviceCounts = {}
    let totalServices = 0

    orders.forEach(order => {
      if (order.items && order.items.length > 0) {
        order.items.forEach(item => {
          const serviceName = item.name
          serviceCounts[serviceName] = (serviceCounts[serviceName] || 0) + item.quantity
          totalServices += item.quantity
        })
      }
    })

    return Object.entries(serviceCounts)
      .map(([service, count]) => ({
        name: service,
        count,
        percentage: totalServices > 0 ? Math.round((count / totalServices) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count)
  }

  const getMonthlyRevenue = () => {
    const monthlyData = {}
    
    orders.forEach(order => {
      if (order.created_at && order.total) {
        const date = new Date(order.created_at)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = {
            month: monthName,
            revenue: 0,
            orders: 0
          }
        }
        
        monthlyData[monthKey].revenue += order.total
        monthlyData[monthKey].orders += 1
      }
    })

    const realData = Object.values(monthlyData)
      .sort((a, b) => b.month.localeCompare(a.month))
      .slice(0, 6) // Show last 6 months

    // If no real data, return sample data for demonstration
    if (realData.length === 0) {
      const currentDate = new Date()
      return [
        {
          month: currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          revenue: 2500,
          orders: 12
        },
        {
          month: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          revenue: 3200,
          orders: 15
        },
        {
          month: new Date(currentDate.getFullYear(), currentDate.getMonth() - 2).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          revenue: 1800,
          orders: 8
        },
        {
          month: new Date(currentDate.getFullYear(), currentDate.getMonth() - 3).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          revenue: 4100,
          orders: 18
        }
      ]
    }

    return realData
  }

  const generatePieChart = (data) => {
    if (!data || data.length === 0) return null

    const totalRevenue = data.reduce((sum, month) => sum + month.revenue, 0)
    if (totalRevenue === 0) return null

    let cumulativePercentage = 0
    const colors = [
      '#AF945B', // Gold
      '#3B82F6', // Blue
      '#10B981', // Green
      '#F59E0B', // Amber
      '#EF4444', // Red
      '#8B5CF6'  // Purple
    ]

    return data.map((month, index) => {
      const percentage = (month.revenue / totalRevenue) * 100
      const startAngle = (cumulativePercentage / 100) * 360
      const endAngle = ((cumulativePercentage + percentage) / 100) * 360
      
      cumulativePercentage += percentage

      return {
        ...month,
        percentage: Math.round(percentage * 10) / 10,
        startAngle,
        endAngle,
        color: colors[index % colors.length]
      }
    })
  }

  const getStatusDistribution = () => {
    const statusCounts = {}
    
    orders.forEach(order => {
      const status = order.status || 'unknown'
      statusCounts[status] = (statusCounts[status] || 0) + 1
    })

    return Object.entries(statusCounts)
      .map(([status, count]) => ({
        status: formatStatus(status),
        count,
        percentage: orders.length > 0 ? Math.round((count / orders.length) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count)
  }

  const getRecentActivity = () => {
    return orders
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10)
      .map(order => ({
        id: order.id,
        customer: `${order.customer_info?.firstName || ''} ${order.customer_info?.lastName || ''}`.trim() || 'Unknown',
        service: order.items?.[0]?.name || 'Service',
        amount: order.total || 0,
        status: order.status || 'pending',
        date: new Date(order.created_at).toLocaleDateString(),
        time: new Date(order.created_at).toLocaleTimeString()
      }))
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
                <FiUsers className="w-6 h-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{getUsersCount()}</div>
                <div className="text-sm text-gray-500">
                  {getUsersCount() === 0 ? 'No users yet' : 'Total Users'}
                </div>
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
                <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
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
                <div className="text-2xl font-bold text-gray-900">{formatPrice(orders.reduce((total, order) => total + (order.total || 0), 0))}</div>
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
                <div className="text-2xl font-bold text-gray-900">{orders.filter(order => order.status === 'pending' && order.scheduled_date).length}</div>
                <div className="text-sm text-gray-500">Pending Appointments</div>
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
                        {getUniqueUsers().length > 0 ? (
                          getUniqueUsers().slice(0, 3).map((user) => (
                            <div key={user.id} className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {user.first_name} {user.last_name}
                                </h4>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.order_count} orders
                                </div>
                                <div className="text-xs text-gray-500">
                                  {new Date(user.created_at).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <FiUsers className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Users Yet</h3>
                            <p className="text-gray-500 mb-4">Users will appear here once customers start placing orders.</p>
                            <p className="text-sm text-gray-400">The admin dashboard will show real-time data as your business grows.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Recent Services */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Services</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-4">
                        {orders.filter(order => order.scheduled_date).slice(0, 3).map((order) => (
                          <div key={order.id} className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {order.customer_info?.firstName} {order.customer_info?.lastName}
                              </h4>
                              <p className="text-sm text-gray-500">{order.items?.[0]?.name || 'Service'}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">{formatPrice(order.total)}</div>
                              <div className={getStatusBadgeClasses(order.status)}>
                                {formatStatus(order.status)}
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

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Services</h2>
                  <button
                    onClick={fetchOrders}
                    disabled={ordersLoading}
                    className="bg-gold hover:bg-gold text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {ordersLoading ? 'Loading...' : 'Refresh'}
                  </button>
                </div>

                {ordersLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No orders found. Orders will appear here when customers complete checkout.</p>
                  </div>
                ) : (
                  <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                #{order.id.slice(-8)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div>
                                  <div className="font-medium">{order.customer_info?.firstName} {order.customer_info?.lastName}</div>
                                  <div className="text-gray-500">{order.customer_info?.email}</div>
                                  <div className="text-gray-500">{order.customer_info?.phone}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900">
                                <div>
                                  <div className="font-medium">{order.location?.fullAddress}</div>
                                  {order.location?.serviceAreaCost > 0 && (
                                    <div className="text-gold text-xs">+${order.location.serviceAreaCost} {order.location.serviceAreaName}</div>
                                  )}
                                  {order.location?.serviceAreaCost === 0 && order.location?.serviceAreaName && (
                                    <div className="text-green-600 text-xs">FREE - {order.location.serviceAreaName}</div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900">
                                <div className="space-y-1">
                                  {order.items?.map((item, index) => (
                                    <div key={index} className="flex justify-between">
                                      <span>{item.name}</span>
                                      <span className="text-gray-500">x{item.quantity}</span>
                                    </div>
                                  ))}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                ${order.total?.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(order.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.status !== 'completed' && order.status !== 'cancelled' && (
                                  <button
                                    onClick={() => handleMarkCompleteClick(order)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
                                  >
                                    Mark Complete
                                  </button>
                                )}
                                {order.status === 'completed' && (
                                  <span className="text-green-600 text-xs font-medium">
                                    ✓ Completed
                                  </span>
                                )}
                                {order.status === 'cancelled' && (
                                  <span className="text-red-600 text-xs font-medium">
                                    ✗ Cancelled
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
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
                                  title={`${appointment.customer} - ${appointment.service} - ${appointment.location}`}
                                >
                                  <div className="truncate">
                                    {appointment.time} {appointment.customer}
                                  </div>
                                  <div className="truncate text-xs opacity-90">
                                    {appointment.location}
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
                      {getUniqueUsers().length > 0 ? (
                        getUniqueUsers().map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">
                                {user.first_name} {user.last_name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-gray-900">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-gray-900">{user.phone || 'N/A'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-gray-900">
                                {user.order_count}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-gray-900">
                                {new Date(user.created_at).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button 
                                onClick={() => handleViewUser(user)}
                                className="text-gold hover:text-gold transition-colors"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <FiUsers className="w-6 h-6 text-gray-400" />
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Users Yet</h3>
                              <p className="text-gray-500 mb-2">Users will appear here once customers start placing orders.</p>
                              <p className="text-sm text-gray-400">The admin dashboard will show real-time data as your business grows.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}


            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Analytics & Reports</h3>
                  <div className="text-sm text-gray-500">
                    Last updated: {new Date().toLocaleString()}
                  </div>
                </div>
                

                {/* Charts and Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Service Popularity */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Service Popularity</h4>
                    <div className="space-y-4">
                      {getServicePopularity().length > 0 ? (
                        getServicePopularity().map((service, index) => (
                          <div key={service.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-700">{service.name}</span>
                              <span className="text-sm font-bold text-gray-900">{service.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gold h-2 rounded-full transition-all duration-300"
                                style={{ width: `${service.percentage}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500">
                              {service.count} order{service.count !== 1 ? 's' : ''}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p>No service data available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Monthly Revenue */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Monthly Revenue</h4>
                    {(() => {
                      const monthlyData = getMonthlyRevenue()
                      
                      if (monthlyData.length > 0) {
                        const maxRevenue = Math.max(...monthlyData.map(m => m.revenue))
                        
                        return (
                          <div className="space-y-4">
                            {/* Bar Chart */}
                            <div className="space-y-4">
                              {monthlyData.map((month, index) => {
                                const percentage = maxRevenue > 0 ? (month.revenue / maxRevenue) * 100 : 0
                                const colors = ['bg-gold', 'bg-blue-500', 'bg-green-500', 'bg-amber-500', 'bg-red-500', 'bg-purple-500']
                                const colorClass = colors[index % colors.length]
                                
                                return (
                                  <div key={index} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm font-medium text-gray-700">{month.month}</span>
                                      <div className="text-right">
                                        <span className="text-sm font-bold text-gray-900">{formatPrice(month.revenue)}</span>
                                        <div className="text-xs text-gray-500">{month.orders} orders</div>
                                      </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                      <div 
                                        className={`${colorClass} h-3 rounded-full transition-all duration-500 ease-out`}
                                        style={{ 
                                          width: `${percentage}%`,
                                          animationDelay: `${index * 100}ms`
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                            
                            {/* Summary Stats */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-gold">
                                    {formatPrice(monthlyData.reduce((sum, month) => sum + month.revenue, 0))}
                                  </div>
                                  <div className="text-sm text-gray-500">Total Revenue</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-gold">
                                    {monthlyData.reduce((sum, month) => sum + month.orders, 0)}
                                  </div>
                                  <div className="text-sm text-gray-500">Total Orders</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      } else {
                        return (
                          <div className="text-center py-8 text-gray-500">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </div>
                            <p className="text-lg font-medium text-gray-900 mb-2">No Revenue Data</p>
                            <p className="text-sm text-gray-500">Revenue data will appear here once customers start placing orders.</p>
                          </div>
                        )
                      }
                    })()}
                  </div>
                </div>

                {/* Status Distribution and Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Status Distribution */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Order Status Distribution</h4>
                    <div className="space-y-3">
                      {getStatusDistribution().map((status) => (
                        <div key={status.status} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(status.status.toLowerCase().replace(' ', '_'))}`}></div>
                            <span className="text-sm text-gray-700">{status.status}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-gray-900">{status.count}</div>
                            <div className="text-xs text-gray-500">{status.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {getRecentActivity().length > 0 ? (
                        getRecentActivity().map((activity) => (
                          <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">{activity.customer}</div>
                              <div className="text-xs text-gray-500">{activity.service}</div>
                              <div className="text-xs text-gray-400">{activity.date} at {activity.time}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-900">{formatPrice(activity.amount)}</div>
                              <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(activity.status)}`}>
                                {formatStatus(activity.status)}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p>No recent activity</p>
                        </div>
                      )}
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
                        <div className="flex items-center mb-2">
                          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium text-gray-700">Email:</span>
                          <span className="ml-2 text-gray-900">{appointment.email}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="font-medium text-gray-700">Location:</span>
                          <span className="ml-2 text-gray-900">{appointment.location}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-2">
                          <div className="flex items-center mb-2">
                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span className="font-medium text-gray-700">Notes:</span>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <p className="text-gray-900 text-sm">
                              {appointment.notes && appointment.notes !== 'No notes' 
                                ? appointment.notes 
                                : 'No notes added for this appointment'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => handleEditAppointment(appointment)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
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

      {/* Edit Notes Modal */}
      {showEditModal && editingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Edit Appointment Notes
                </h3>
                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingOrder(null)
                    setEditNotes('')
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Customer: {editingOrder.customer}</h4>
                  <p className="text-gray-600 mb-2">Service: {editingOrder.service}</p>
                  <p className="text-gray-600">Date: {editingOrder.time}</p>
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Notes
                  </label>
                  <textarea
                    id="notes"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold resize-none"
                    placeholder="Add notes about this appointment..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    These notes will be visible to the customer and admin.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingOrder(null)
                    setEditNotes('')
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="px-4 py-2 text-sm font-medium text-white bg-gold hover:bg-gold rounded-lg transition-colors"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && orderToComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Confirm Service Completion</h3>
                <button
                  onClick={handleCancelComplete}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Are you sure you want to mark this service as completed?
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">
                      Order #{orderToComplete.id.slice(-8)}
                    </div>
                    <div className="text-gray-600 mt-1">
                      {orderToComplete.customer_info?.firstName} {orderToComplete.customer_info?.lastName}
                    </div>
                    <div className="text-gray-600">
                      {orderToComplete.items?.[0]?.name || 'Service'}
                    </div>
                    <div className="text-gray-600">
                      ${orderToComplete.total?.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancelComplete}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmComplete}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  Mark as Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">User Details</h3>
                <button
                  onClick={handleCloseUserModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* User Basic Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Full Name</label>
                      <p className="text-gray-900">{selectedUser.first_name} {selectedUser.last_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{selectedUser.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <p className="text-gray-900">{selectedUser.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Member Since</label>
                      <p className="text-gray-900">{new Date(selectedUser.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Service History */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Service History</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">Total Services</span>
                      <span className="text-lg font-semibold text-gold">{selectedUser.order_count}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">Total Spent</span>
                      <span className="text-lg font-semibold text-gold">
                        ${selectedUser.total_spent?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Directions */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Service Locations</h4>
                  {selectedUser.recent_orders && selectedUser.recent_orders.length > 0 ? (
                    <div className="space-y-3">
                      {selectedUser.recent_orders
                        .filter((order, index, self) => 
                          // Get unique locations only
                          order.location?.fullAddress && 
                          self.findIndex(o => o.location?.fullAddress === order.location?.fullAddress) === index
                        )
                        .slice(0, 5)
                        .map((order, index) => (
                        <div key={index} className="py-3 border-b border-gray-200 last:border-b-0">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {order.location?.fullAddress || 'No address provided'}
                              </p>
                              {order.location?.serviceAreaName && (
                                <p className="text-xs text-gold font-medium mt-1">
                                  {order.location.serviceAreaName}
                                </p>
                              )}
                              {order.scheduled_date && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Last service: {new Date(order.scheduled_date).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No service locations found.</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleCloseUserModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
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
