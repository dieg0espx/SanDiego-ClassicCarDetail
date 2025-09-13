'use client'
import { useAuth } from '../contexts/AuthContext'

export default function AuthTest() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700">Loading authentication...</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="text-green-800 font-semibold mb-2">Authentication Status:</h3>
      {user ? (
        <div>
          <p className="text-green-700">✅ User is authenticated</p>
          <p className="text-green-600 text-sm">Email: {user.email}</p>
          {user.user_metadata && (
            <div className="text-green-600 text-sm">
              {user.user_metadata.first_name && (
                <p>Name: {user.user_metadata.first_name} {user.user_metadata.last_name}</p>
              )}
              {user.user_metadata.phone && (
                <p>Phone: {user.user_metadata.phone}</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="text-green-700">❌ User is not authenticated</p>
      )}
    </div>
  )
}
