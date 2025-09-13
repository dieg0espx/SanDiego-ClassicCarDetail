'use client'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Profile() {
  const { user, loading, signOut, refreshUser } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    } else if (user && !isEditing) {
      // Only update form data when not editing to prevent resetting while typing
      setFormData({
        first_name: user?.user_metadata?.first_name || '',
        last_name: user?.user_metadata?.last_name || '',
        email: user?.email || '',
        phone: user?.user_metadata?.phone || ''
      })
    }
  }, [user, loading, router, isEditing])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage({ type: '', text: '' })

    try {
      // Update user metadata in Supabase
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone
        }
      })

      if (error) {
        throw error
      }

      // If email is different, update email
      if (formData.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: formData.email
        })
        
        if (emailError) {
          throw emailError
        }
        
        setMessage({ type: 'success', text: 'Profile updated successfully! Please check your email to confirm the new email address.' })
      } else {
        setMessage({ type: 'success', text: 'Profile updated successfully!' })
      }
      
      // Refresh user data to show updated information
      const updatedUser = await refreshUser()
      if (updatedUser) {
        setFormData({
          first_name: updatedUser?.user_metadata?.first_name || '',
          last_name: updatedUser?.user_metadata?.last_name || '',
          email: updatedUser?.email || '',
          phone: updatedUser?.user_metadata?.phone || ''
        })
      }
      
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage({ type: 'error', text: error.message || 'Failed to update profile. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      first_name: user?.user_metadata?.first_name || '',
      last_name: user?.user_metadata?.last_name || '',
      email: user?.email || '',
      phone: user?.user_metadata?.phone || ''
    })
    setIsEditing(false)
    setMessage({ type: '', text: '' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600 mt-2">Manage your account information</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {formData.first_name.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gold hover:bg-gold text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-gold hover:bg-gold text-white font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>

          {/* Message */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                    placeholder="Enter your first name"
                  />
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                    {formData.first_name || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                    placeholder="Enter your last name"
                  />
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                    {formData.last_name || 'Not provided'}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                  placeholder="Enter your email"
                />
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                  {formData.email}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                  {formData.phone || 'Not provided'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Status
              </label>
              <div className="flex items-center">
                <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  ✓ Verified
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Security</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div>
                <h3 className="font-medium text-gray-900">Change Password</h3>
                <p className="text-sm text-gray-500">Update your account password</p>
              </div>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors">
                Change Password
              </button>
            </div>


            <div className="flex items-center justify-between py-4">
              <div>
                <h3 className="font-medium text-gray-900">Sign Out</h3>
                <p className="text-sm text-gray-500">Sign out of your account on this device</p>
              </div>
              <button 
                onClick={signOut}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8">
          <a 
            href="/dashboard"
            className="inline-flex items-center text-gold hover:text-gold font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
