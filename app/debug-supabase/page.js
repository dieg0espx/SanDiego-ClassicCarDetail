'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function DebugSupabase() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const addResult = (message, type = 'info') => {
    setResults(prev => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }])
  }

  const testSupabaseConfig = async () => {
    setLoading(true)
    setResults([])
    
    try {
      // Test 1: Check Supabase connection
      addResult('Testing Supabase connection...', 'info')
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        addResult(`Session error: ${sessionError.message}`, 'error')
      } else {
        addResult(`Session check successful. Current user: ${session?.user?.email || 'None'}`, 'success')
      }

      // Test 2: Try to get all users (this might not work due to RLS)
      addResult('Testing user access...', 'info')
      try {
        const { data: users, error: usersError } = await supabase.auth.admin.listUsers()
        if (usersError) {
          addResult(`Users access error: ${usersError.message}`, 'warning')
        } else {
          addResult(`Found ${users?.users?.length || 0} users in system`, 'success')
        }
      } catch (e) {
        addResult('Cannot access users list (normal for client)', 'warning')
      }

      // Test 3: Check auth settings
      addResult('Testing auth configuration...', 'info')
      const { data: authData, error: authError } = await supabase.auth.getUser()
      if (authError) {
        addResult(`Auth config error: ${authError.message}`, 'error')
      } else {
        addResult('Auth configuration seems correct', 'success')
      }

    } catch (error) {
      addResult(`Unexpected error: ${error.message}`, 'error')
    }
    
    setLoading(false)
  }

  const testEmailUniqueness = async () => {
    const testEmail = 'test@example.com'
    setLoading(true)
    addResult(`Testing email uniqueness with: ${testEmail}`, 'info')
    
    try {
      // First signup
      addResult('Attempting first signup...', 'info')
      const { data: signup1, error: signup1Error } = await supabase.auth.signUp({
        email: testEmail,
        password: 'testpassword123',
        options: {
          data: { first_name: 'Test', last_name: 'User' }
        }
      })
      
      if (signup1Error) {
        addResult(`First signup error: ${signup1Error.message}`, 'error')
      } else {
        addResult(`First signup successful: ${signup1.user?.id}`, 'success')
      }

      // Wait a moment
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Second signup attempt
      addResult('Attempting second signup with same email...', 'info')
      const { data: signup2, error: signup2Error } = await supabase.auth.signUp({
        email: testEmail,
        password: 'testpassword456',
        options: {
          data: { first_name: 'Test2', last_name: 'User2' }
        }
      })
      
      if (signup2Error) {
        addResult(`Second signup error (expected): ${signup2Error.message}`, 'success')
      } else {
        addResult(`Second signup successful (UNEXPECTED): ${signup2.user?.id}`, 'error')
      }

    } catch (error) {
      addResult(`Test error: ${error.message}`, 'error')
    }
    
    setLoading(false)
  }

  const clearResults = () => {
    setResults([])
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Supabase Debug Tool</h1>
          
          <div className="space-y-4 mb-6">
            <button
              onClick={testSupabaseConfig}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-md transition-colors disabled:opacity-50 mr-4"
            >
              {loading ? 'Testing...' : 'Test Supabase Config'}
            </button>
            
            <button
              onClick={testEmailUniqueness}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-md transition-colors disabled:opacity-50 mr-4"
            >
              {loading ? 'Testing...' : 'Test Email Uniqueness'}
            </button>
            
            <button
              onClick={clearResults}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-2 rounded-md transition-colors"
            >
              Clear Results
            </button>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.map((result, index) => (
              <div key={index} className={`p-3 rounded text-sm ${
                result.type === 'error' ? 'bg-red-100 text-red-800' :
                result.type === 'success' ? 'bg-green-100 text-green-800' :
                result.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                <span className="text-xs opacity-75">[{result.timestamp}]</span> {result.message}
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Click "Test Supabase Config" to check your connection</li>
              <li>Click "Test Email Uniqueness" to test duplicate email handling</li>
              <li>Check the results and browser console for detailed information</li>
              <li>Share the results if you need help debugging</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
