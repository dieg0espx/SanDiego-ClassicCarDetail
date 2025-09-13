'use client'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

export default function RegisterForm({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const { signUp } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // Clear field-specific errors when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: ''
      })
    }
  }

  const getFieldValidation = (fieldName, value) => {
    switch (fieldName) {
      case 'firstName':
      case 'lastName':
        if (value && !validateName(value)) {
          return 'Must be 2-50 characters and contain only letters'
        }
        break
      case 'email':
        if (value && !validateEmail(value)) {
          return 'Please enter a valid email address'
        }
        break
      case 'phone':
        if (value && !validatePhone(value)) {
          return 'Please enter a valid phone number (7-15 digits)'
        }
        break
      case 'password':
        if (value && !validatePassword(value)) {
          return 'Must be 8+ characters with uppercase, lowercase, and number'
        }
        break
      case 'confirmPassword':
        if (value && formData.password && value !== formData.password) {
          return 'Passwords do not match'
        }
        break
    }
    return ''
  }

  const getInputClassName = (fieldName, value) => {
    const baseClass = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
    const errorClass = "border-red-300 focus:ring-red-500"
    const successClass = "border-green-300 focus:ring-green-500"
    
    if (!value) return baseClass + " border-gray-300"
    
    const validation = getFieldValidation(fieldName, value)
    if (validation) return baseClass + " " + errorClass
    return baseClass + " " + successClass
  }

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-\(\)]{7,15}$/
    return phoneRegex.test(phone)
  }

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/
    return nameRegex.test(name.trim())
  }

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validate first name
    if (!validateName(formData.firstName)) {
      setError('First name must be 2-50 characters and contain only letters')
      setLoading(false)
      return
    }

    // Validate last name
    if (!validateName(formData.lastName)) {
      setError('Last name must be 2-50 characters and contain only letters')
      setLoading(false)
      return
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    // Validate phone format
    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid phone number (7-15 digits)')
      setLoading(false)
      return
    }

    // Validate password strength
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters with uppercase, lowercase, and number')
      setLoading(false)
      return
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Check if email already exists by attempting a sign in
    try {
      const { data: testSignIn, error: testError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: 'fake-password-for-testing-123'
      })
      
      // If we get here without an "Invalid login credentials" error, the email exists
      if (testSignIn && testSignIn.user) {
        setError('This email address is already registered. Please use a different email or try signing in.')
        setLoading(false)
        return
      }
      
      // If the error is NOT "Invalid login credentials", the email might exist
      if (testError && !testError.message.includes('Invalid login credentials')) {
        console.log('Test sign in error (email might exist):', testError)
        setError('This email address is already registered. Please use a different email or try signing in.')
        setLoading(false)
        return
      }
    } catch (testError) {
      console.log('Error during email check:', testError)
      // Continue with registration attempt
    }

    const { data, error } = await signUp(formData.email, formData.password, {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: `${formData.countryCode}${formData.phone}`
    })
    
    if (error) {
      console.log('Registration error details:', {
        message: error.message,
        status: error.status,
        statusText: error.statusText,
        error: error
      })
      
      // Check for various duplicate email error messages
      if (error.message.includes('already registered') || 
          error.message.includes('already exists') ||
          error.message.includes('already been registered') ||
          error.message.includes('User already registered') ||
          error.message.includes('duplicate') ||
          error.message.toLowerCase().includes('email')) {
        setError('This email address is already registered. Please use a different email or try signing in.')
      } else {
        setError(`Registration failed: ${error.message}`)
      }
    } else {
      setSuccess('Account created successfully! Please check your email to verify your account.')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+1',
        password: '',
        confirmPassword: ''
      })
    }
    
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={getInputClassName('firstName', formData.firstName)}
                placeholder="First name"
              />
              {formData.firstName && getFieldValidation('firstName', formData.firstName) && (
                <p className="text-red-500 text-xs mt-1">{getFieldValidation('firstName', formData.firstName)}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={getInputClassName('lastName', formData.lastName)}
                placeholder="Last name"
              />
              {formData.lastName && getFieldValidation('lastName', formData.lastName) && (
                <p className="text-red-500 text-xs mt-1">{getFieldValidation('lastName', formData.lastName)}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={getInputClassName('email', formData.email)}
              placeholder="Enter your email"
            />
            {formData.email && getFieldValidation('email', formData.email) && (
              <p className="text-red-500 text-xs mt-1">{getFieldValidation('email', formData.email)}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex">
              <select
                name="countryCode"
                value={formData.countryCode || '+1'}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-white"
              >
                <option value="+1">🇺🇸 +1</option>
                <option value="+52">🇲🇽 +52</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+39">🇮🇹 +39</option>
                <option value="+34">🇪🇸 +34</option>
                <option value="+55">🇧🇷 +55</option>
                <option value="+54">🇦🇷 +54</option>
                <option value="+56">🇨🇱 +56</option>
                <option value="+57">🇨🇴 +57</option>
                <option value="+51">🇵🇪 +51</option>
                <option value="+58">🇻🇪 +58</option>
                <option value="+593">🇪🇨 +593</option>
                <option value="+595">🇵🇾 +595</option>
                <option value="+598">🇺🇾 +598</option>
                <option value="+591">🇧🇴 +591</option>
                <option value="+86">🇨🇳 +86</option>
                <option value="+81">🇯🇵 +81</option>
                <option value="+82">🇰🇷 +82</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+64">🇳🇿 +64</option>
                <option value="+27">🇿🇦 +27</option>
                <option value="+20">🇪🇬 +20</option>
                <option value="+234">🇳🇬 +234</option>
                <option value="+254">🇰🇪 +254</option>
                <option value="+966">🇸🇦 +966</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+90">🇹🇷 +90</option>
                <option value="+7">🇷🇺 +7</option>
                <option value="+380">🇺🇦 +380</option>
                <option value="+48">🇵🇱 +48</option>
                <option value="+420">🇨🇿 +420</option>
                <option value="+36">🇭🇺 +36</option>
                <option value="+40">🇷🇴 +40</option>
                <option value="+359">🇧🇬 +359</option>
                <option value="+385">🇭🇷 +385</option>
                <option value="+386">🇸🇮 +386</option>
                <option value="+421">🇸🇰 +421</option>
                <option value="+372">🇪🇪 +372</option>
                <option value="+371">🇱🇻 +371</option>
                <option value="+370">🇱🇹 +370</option>
                <option value="+47">🇳🇴 +47</option>
                <option value="+46">🇸🇪 +46</option>
                <option value="+45">🇩🇰 +45</option>
                <option value="+358">🇫🇮 +358</option>
                <option value="+354">🇮🇸 +354</option>
                <option value="+353">🇮🇪 +353</option>
                <option value="+31">🇳🇱 +31</option>
                <option value="+32">🇧🇪 +32</option>
                <option value="+41">🇨🇭 +41</option>
                <option value="+43">🇦🇹 +43</option>
                <option value="+423">🇱🇮 +423</option>
                <option value="+352">🇱🇺 +352</option>
                <option value="+377">🇲🇨 +377</option>
                <option value="+378">🇸🇲 +378</option>
                <option value="+39">🇻🇦 +39</option>
                <option value="+376">🇦🇩 +376</option>
              </select>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`flex-1 px-3 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent ${
                  formData.phone 
                    ? getFieldValidation('phone', formData.phone) 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-green-300 focus:ring-green-500'
                    : 'border-gray-300'
                }`}
                placeholder="(555) 123-4567"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter your phone number without the country code
            </p>
            {formData.phone && getFieldValidation('phone', formData.phone) && (
              <p className="text-red-500 text-xs mt-1">{getFieldValidation('phone', formData.phone)}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={getInputClassName('password', formData.password)}
              placeholder="Create a password"
            />
            {formData.password && getFieldValidation('password', formData.password) && (
              <p className="text-red-500 text-xs mt-1">{getFieldValidation('password', formData.password)}</p>
            )}
            {formData.password && !getFieldValidation('password', formData.password) && (
              <p className="text-green-600 text-xs mt-1">✓ Password is strong</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={getInputClassName('confirmPassword', formData.confirmPassword)}
              placeholder="Confirm your password"
            />
            {formData.confirmPassword && getFieldValidation('confirmPassword', formData.confirmPassword) && (
              <p className="text-red-500 text-xs mt-1">{getFieldValidation('confirmPassword', formData.confirmPassword)}</p>
            )}
            {formData.confirmPassword && !getFieldValidation('confirmPassword', formData.confirmPassword) && formData.password && (
              <p className="text-green-600 text-xs mt-1">✓ Passwords match</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-gold hover:text-yellow-600 font-medium transition-colors"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
