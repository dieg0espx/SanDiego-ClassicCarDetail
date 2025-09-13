'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function TestEmail() {
  const [testEmail, setTestEmail] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testSignUp = async () => {
    setLoading(true)
    setResult('')
    
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: 'testpassword123',
      options: {
        data: {
          first_name: 'Test',
          last_name: 'User',
          phone: '+15551234567',
        }
      }
    })

    console.log('Sign up result:', { data, error })
    
    if (error) {
      setResult(`Error: ${error.message}`)
    } else {
      setResult(`Success: User created with ID ${data.user?.id}`)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Email Uniqueness Test</h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Email:
              </label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="Enter email to test"
              />
            </div>
            
            <button
              onClick={testSignUp}
              disabled={loading || !testEmail}
              className="bg-gold hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-md transition-colors disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Sign Up'}
            </button>
            
            {result && (
              <div className="p-4 bg-gray-100 rounded">
                <h3 className="font-semibold mb-2">Result:</h3>
                <p className="text-sm">{result}</p>
              </div>
            )}
            
            <div className="p-4 bg-blue-50 rounded">
              <h3 className="font-semibold mb-2">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Enter an email address to test</li>
                <li>Click "Test Sign Up" to see what happens</li>
                <li>Try the same email twice to see if it prevents duplicates</li>
                <li>Check the browser console for detailed error messages</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
