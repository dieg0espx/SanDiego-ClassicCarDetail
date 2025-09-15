'use client'
import { useState, useEffect } from 'react'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'

export default function LocationSelector({ onLocationSelected }) {
  const { location, setLocation } = useCart()
  const { user } = useAuth()
  const [address, setAddress] = useState(location?.address || '')
  const [city, setCity] = useState(location?.city || '')
  const [zipCode, setZipCode] = useState(location?.zipCode || '')
  const [state, setState] = useState(location?.state || 'CA')
  const [specialInstructions, setSpecialInstructions] = useState(location?.specialInstructions || '')
  const [isValid, setIsValid] = useState(false)
  const [serviceAreaCost, setServiceAreaCost] = useState(0)
  const [serviceAreaName, setServiceAreaName] = useState('')
  const [savedLocations, setSavedLocations] = useState([])
  const [showSavedLocations, setShowSavedLocations] = useState(false)
  const [locationName, setLocationName] = useState('')
  const [isUsingSavedLocation, setIsUsingSavedLocation] = useState(false)

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
      'Alpine', 'Bonita', 'Coronado', 'La Presa', 'Rancho San Diego', 'Vista', 'Fallbrook'
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



  // Handle state change and reset city
  const handleStateChange = (e) => {
    setState(e.target.value)
    setCity('') // Reset city when state changes
    setServiceAreaCost(0)
    setServiceAreaName('')
  }

  // Calculate service area cost based on city
  const calculateServiceAreaCost = (selectedCity, selectedState) => {
    if (!selectedCity || !selectedState || !serviceAreas[selectedState]) {
      setServiceAreaCost(0)
      setServiceAreaName('')
      return
    }

    const stateAreas = serviceAreas[selectedState]
    
    for (const [areaName, areaData] of Object.entries(stateAreas)) {
      if (areaData.cities.some(areaCity => 
        areaCity.toLowerCase() === selectedCity.toLowerCase()
      )) {
        setServiceAreaCost(areaData.cost)
        setServiceAreaName(areaName)
        return
      }
    }

    // If city not found in any service area
    setServiceAreaCost(0)
    setServiceAreaName('Outside Service Area')
  }

  // Save current location
  const handleSaveLocation = () => {
    if (!isValid || !locationName.trim()) return

    const newLocation = {
      id: Date.now().toString(),
      name: locationName.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      zipCode: zipCode.trim(),
      specialInstructions: specialInstructions.trim(),
      fullAddress: `${address.trim()}, ${city.trim()}, ${state.trim()} ${zipCode.trim()}`,
      serviceAreaCost,
      serviceAreaName,
      savedAt: new Date().toISOString()
    }

    const updatedLocations = [...savedLocations, newLocation]
    setSavedLocations(updatedLocations)
    localStorage.setItem(`savedLocations_${user.id}`, JSON.stringify(updatedLocations))
    setLocationName('')
    alert('Location saved successfully!')
  }

  // Load a saved location
  const handleLoadLocation = (savedLocation) => {
    setAddress(savedLocation.address)
    setCity(savedLocation.city)
    setState(savedLocation.state)
    setZipCode(savedLocation.zipCode)
    setSpecialInstructions(savedLocation.specialInstructions)
    setServiceAreaCost(savedLocation.serviceAreaCost)
    setServiceAreaName(savedLocation.serviceAreaName)
    setShowSavedLocations(false)
    setIsUsingSavedLocation(true)
  }

  // Delete a saved location
  const handleDeleteLocation = (locationId) => {
    const updatedLocations = savedLocations.filter(loc => loc.id !== locationId)
    setSavedLocations(updatedLocations)
    localStorage.setItem(`savedLocations_${user.id}`, JSON.stringify(updatedLocations))
  }

  // Calculate service area cost when city changes
  useEffect(() => {
    calculateServiceAreaCost(city, state)
  }, [city, state])

  // Validate form
  useEffect(() => {
    const valid = address.trim() !== '' && city.trim() !== '' && zipCode.trim() !== ''
    setIsValid(valid)
  }, [address, city, zipCode])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return

    const locationData = {
      address: address.trim(),
      city: city.trim(),
      zipCode: zipCode.trim(),
      state: state.trim(),
      specialInstructions: specialInstructions.trim(),
      fullAddress: `${address.trim()}, ${city.trim()}, ${state.trim()} ${zipCode.trim()}`,
      serviceAreaCost,
      serviceAreaName
    }

    setLocation(locationData)
    if (onLocationSelected) {
      onLocationSelected(locationData)
    }
  }


  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Location</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Saved Locations */}
        {savedLocations.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-900">Saved Locations</h4>
              <button
                type="button"
                onClick={() => setShowSavedLocations(!showSavedLocations)}
                className="text-sm text-gold hover:text-gold font-medium"
              >
                {showSavedLocations ? 'Hide' : 'Show'} ({savedLocations.length})
              </button>
            </div>
            
            {showSavedLocations && (
              <div className="space-y-2">
                {savedLocations.map((savedLocation) => (
                  <div key={savedLocation.id} className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{savedLocation.name}</h5>
                        <p className="text-sm text-gray-600">{savedLocation.fullAddress}</p>
                        {savedLocation.serviceAreaCost > 0 ? (
                          <p className="text-xs text-gold">+${savedLocation.serviceAreaCost} {savedLocation.serviceAreaName}</p>
                        ) : (
                          <p className="text-xs text-green-600">FREE - {savedLocation.serviceAreaName}</p>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-3">
                        <button
                          type="button"
                          onClick={() => handleLoadLocation(savedLocation)}
                          className="text-xs bg-gold hover:bg-gold/90 text-white px-2 py-1 rounded transition-colors"
                        >
                          Use
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteLocation(savedLocation.id)}
                          className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Manual Address Entry */}
        <div className="border-t border-gray-200 pt-6">
        </div>

        {/* Address Input */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Street Address *
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value)
              setIsUsingSavedLocation(false)
            }}
            placeholder="123 Main Street"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            required
          />
        </div>

        {/* City and State Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value)
                setIsUsingSavedLocation(false)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              required
            >
              <option value="">Select a city</option>
              {cityOptions[state]?.map((cityOption) => (
                <option key={cityOption} value={cityOption}>
                  {cityOption}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
              California (San Diego County)
            </div>
          </div>
        </div>

        {/* ZIP Code */}
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code *
          </label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value)
              setIsUsingSavedLocation(false)
            }}
            placeholder="92081"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            required
          />
        </div>

        {/* Special Instructions */}
        <div>
          <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-2">
            Special Instructions (Optional)
          </label>
          <textarea
            id="specialInstructions"
            value={specialInstructions}
            onChange={(e) => {
              setSpecialInstructions(e.target.value)
              setIsUsingSavedLocation(false)
            }}
            placeholder="Any specific instructions for our team? (e.g., gate code, parking restrictions, etc.)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>

        {/* Service Area Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-800">Service Area</h4>
              <p className="text-sm text-blue-700 mt-1">
                We currently serve San Diego County and surrounding areas. If you're outside our service area, 
                we'll contact you to discuss options or additional travel fees.
              </p>
            </div>
          </div>
        </div>

        {/* Service Area Cost Display */}
        {city && serviceAreaName && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Service Area</h4>
                <p className="text-sm text-gray-600">{serviceAreaName}</p>
              </div>
              <div className="text-right">
                {serviceAreaCost > 0 ? (
                  <div>
                    <span className="text-lg font-semibold text-gold">+${serviceAreaCost}</span>
                    <p className="text-xs text-gray-500">Additional fee</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-lg font-semibold text-green-600">FREE</span>
                    <p className="text-xs text-gray-500">No additional fee</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Save Location - Only show when not using a saved location */}
        {isValid && !isUsingSavedLocation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-3">Save This Location</h4>
            <div className="flex space-x-2">
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="Enter a name for this location (e.g., Home, Office)"
                className="flex-1 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                type="button"
                onClick={handleSaveLocation}
                disabled={!locationName.trim()}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  locationName.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isValid}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isValid
                ? 'bg-gold hover:bg-gold text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {location ? 'Update Location' : 'Set Location'}
          </button>
        </div>
      </form>

    </div>
  )
}
