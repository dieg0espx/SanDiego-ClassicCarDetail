'use client'
import { useAuth } from '../../contexts/AuthContext'

export default function AuthTest() {
  const { user, loading, signIn, signOut } = useAuth()

  const testSignIn = async () => {
    const { data, error } = await signIn('test@example.com', 'password123')
    console.log('Test sign in result:', data, error)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Authentication Test Page</h1>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded">
              <h2 className="font-semibold">Current Status:</h2>
              <p>Loading: {loading ? 'Yes' : 'No'}</p>
              <p>User: {user ? user.email : 'Not logged in'}</p>
              <p>User ID: {user ? user.id : 'N/A'}</p>
            </div>

            <div className="p-4 bg-gray-100 rounded">
              <h2 className="font-semibold">User Metadata:</h2>
              <pre className="text-sm">{JSON.stringify(user?.user_metadata, null, 2)}</pre>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={testSignIn}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Test Sign In
              </button>
              
              <button
                onClick={signOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>

            <div className="p-4 bg-blue-50 rounded">
              <h3 className="font-semibold">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Check the browser console (F12) for authentication logs</li>
                <li>If you see "No user" in the logs, you need to log in first</li>
                <li>Use the main website navbar to log in</li>
                <li>Then come back here to see if the user is detected</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
