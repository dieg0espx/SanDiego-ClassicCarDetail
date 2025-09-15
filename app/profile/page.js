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
  const [savedLocations, setSavedLocations] = useState([])
  const [showSavedLocations, setShowSavedLocations] = useState(false)
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [showAddLocationForm, setShowAddLocationForm] = useState(false)
  const [newLocationName, setNewLocationName] = useState('')
  const [newLocation, setNewLocation] = useState({
    address: '',
    city: '',
    state: 'CA',
    zipCode: '',
    specialInstructions: ''
  })

  // City options - San Diego County only
  const cityOptions = {
    'CA': [
      // Free Service Area
      'Vista', 'Oceanside', 'Carlsbad', 'San Marcos', 'Escondido', 'Poway', 'Rancho Bernardo',
      // Extended Area
      'Encinitas', 'Solana Beach', 'Del Mar', 'La Jolla', 'Mira Mesa', 'Valley Center',
      // Premium Area
      'San Diego', 'Chula Vista', 'National City', 'Imperial Beach',
      // Other San Diego County cities
      'El Cajon', 'La Mesa', 'Lemon Grove', 'Santee', 'Spring Valley', 'Lakeside', 'Ramona',
      'Alpine', 'Bonita', 'Coronado', 'La Presa', 'Rancho San Diego', 'Fallbrook'
    ]
  }

  // Service area definitions - San Diego County only
  const serviceAreas = {
    'CA': {
      'Free Service Area': {
        cost: 0,
        cities: ['Vista', 'Oceanside', 'Carlsbad', 'San Marcos', 'Escondido', 'Poway', 'Rancho Bernardo', 'El Cajon', 'La Mesa', 'Lemon Grove', 'Santee', 'Spring Valley', 'Lakeside', 'Ramona', 'Alpine', 'Bonita', 'Fallbrook']
      },
      'Extended Area': {
        cost: 20,
        cities: ['Encinitas', 'Solana Beach', 'Del Mar', 'La Jolla', 'Mira Mesa', 'Valley Center']
      },
      'Premium Area': {
        cost: 40,
        cities: ['San Diego', 'Chula Vista', 'National City', 'Imperial Beach', 'Coronado', 'La Presa', 'Rancho San Diego']
      }
    }
  }

  // Load saved locations from localStorage
  useEffect(() => {
    if (user?.id) {
      const saved = localStorage.getItem(`savedLocations_${user.id}`)
      if (saved) {
        setSavedLocations(JSON.parse(saved))
      }
    }
  }, [user])

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

  // Calculate service area cost
  const calculateServiceAreaCost = (selectedCity, selectedState) => {
    if (!selectedCity || !selectedState || !serviceAreas[selectedState]) {
      return { cost: 0, name: '' }
    }

    const stateAreas = serviceAreas[selectedState]
    
    for (const [areaName, areaData] of Object.entries(stateAreas)) {
      if (areaData.cities.some(areaCity => 
        areaCity.toLowerCase() === selectedCity.toLowerCase()
      )) {
        return { cost: areaData.cost, name: areaName }
      }
    }

    return { cost: 0, name: 'Outside Service Area' }
  }

  // Handle new location input change
  const handleNewLocationChange = (e) => {
    const { name, value } = e.target
    setNewLocation(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Save new location
  const handleSaveNewLocation = () => {
    if (!newLocationName.trim() || !newLocation.address.trim() || !newLocation.city.trim() || !newLocation.zipCode.trim()) {
      alert('Please fill in all required fields')
      return
    }

    const serviceArea = calculateServiceAreaCost(newLocation.city, newLocation.state)
    
    const locationData = {
      id: Date.now().toString(),
      name: newLocationName.trim(),
      address: newLocation.address.trim(),
      city: newLocation.city.trim(),
      state: newLocation.state,
      zipCode: newLocation.zipCode.trim(),
      specialInstructions: newLocation.specialInstructions.trim(),
      fullAddress: `${newLocation.address.trim()}, ${newLocation.city.trim()}, ${newLocation.state} ${newLocation.zipCode.trim()}`,
      serviceAreaCost: serviceArea.cost,
      serviceAreaName: serviceArea.name,
      savedAt: new Date().toISOString()
    }

    const updatedLocations = [...savedLocations, locationData]
    setSavedLocations(updatedLocations)
    localStorage.setItem(`savedLocations_${user.id}`, JSON.stringify(updatedLocations))
    
    // Reset form
    setNewLocationName('')
    setNewLocation({
      address: '',
      city: '',
      state: 'CA',
      zipCode: '',
      specialInstructions: ''
    })
    
    setMessage({ type: 'success', text: 'Location saved successfully!' })
  }

  // Delete saved location
  const handleDeleteLocation = (locationId) => {
    const updatedLocations = savedLocations.filter(loc => loc.id !== locationId)
    setSavedLocations(updatedLocations)
    localStorage.setItem(`savedLocations_${user.id}`, JSON.stringify(updatedLocations))
    setMessage({ type: 'success', text: 'Location deleted successfully!' })
  }

  // Handle city selection
  const handleCitySelect = (city) => {
    setNewLocation(prev => ({ ...prev, city }))
    setShowCityDropdown(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCityDropdown && !event.target.closest('.relative')) {
        setShowCityDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCityDropdown])

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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative overflow-visible">
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


            {/* Saved Locations Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Locations</h3>
              
              {/* Saved Locations List */}
              {savedLocations.length > 0 ? (
                <div className="space-y-3 mb-6">
                  <h4 className="text-sm font-medium text-gray-900">Your Saved Locations ({savedLocations.length})</h4>
                  
                  <div className="space-y-2">
                    {savedLocations.map((location) => (
                      <div key={location.id} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{location.name}</h5>
                            <p className="text-sm text-gray-600">{location.fullAddress}</p>
                            {location.specialInstructions && (
                              <p className="text-xs text-gray-500 mt-1">Instructions: {location.specialInstructions}</p>
                            )}
                            {location.serviceAreaCost > 0 ? (
                              <p className="text-xs text-gold mt-1">+${location.serviceAreaCost} - {location.serviceAreaName}</p>
                            ) : (
                              <p className="text-xs text-green-600 mt-1">FREE - {location.serviceAreaName}</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteLocation(location.id)}
                            className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors ml-3"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Add New Location Dropdown */}
              <div className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setShowAddLocationForm(!showAddLocationForm)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <h4 className="text-sm font-medium text-gray-900">Add New Location</h4>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      showAddLocationForm ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showAddLocationForm && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          name="newLocationName"
                          value={newLocationName}
                          onChange={(e) => setNewLocationName(e.target.value)}
                          placeholder="Location name (e.g., Home, Office)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="address"
                          value={newLocation.address}
                          onChange={handleNewLocationChange}
                          placeholder="Street Address"
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                        />
                        
                        <div className="relative z-50">
                          <button
                            type="button"
                            onClick={() => setShowCityDropdown(!showCityDropdown)}
                            className="w-full px-3 py-2 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold bg-white cursor-pointer transition-all duration-200 hover:border-gold/50 shadow-sm hover:shadow-md text-left flex items-center justify-between"
                          >
                            <span className={newLocation.city ? 'text-gray-900' : 'text-gray-500'}>
                              {newLocation.city || 'Select City'}
                            </span>
                            <svg
                              className={`w-5 h-5 text-gold transform transition-transform duration-200 ${
                                showCityDropdown ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {showCityDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                              {cityOptions.CA.map((city) => (
                                <button
                                  key={city}
                                  type="button"
                                  onClick={() => handleCitySelect(city)}
                                  className="w-full px-3 py-2 text-left text-gray-900 hover:bg-gold/10 hover:text-gold transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                                >
                                  {city}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                          California (San Diego County)
                        </div>
                        
                        <input
                          type="text"
                          name="zipCode"
                          value={newLocation.zipCode}
                          onChange={handleNewLocationChange}
                          placeholder="ZIP Code"
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                        />
                      </div>
                      
                      <div>
                        <textarea
                          name="specialInstructions"
                          value={newLocation.specialInstructions}
                          onChange={handleNewLocationChange}
                          placeholder="Special instructions (optional)"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                        />
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={handleSaveNewLocation}
                          disabled={!newLocationName.trim() || !newLocation.address.trim() || !newLocation.city.trim() || !newLocation.zipCode.trim()}
                          className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                            newLocationName.trim() && newLocation.address.trim() && newLocation.city.trim() && newLocation.zipCode.trim()
                              ? 'bg-gold hover:bg-gold text-white'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Save Location
                        </button>
                        <button
                          onClick={() => setShowAddLocationForm(false)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
