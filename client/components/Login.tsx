import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
import routes from '../../client/routes.tsx'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

export default function Login() {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && user) {
      // Check if user exists in the database
      fetch('/api/v1/users/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auth0_sub: user.sub }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.exists) {
            
            navigate('/register', { state: { user } })
          } else {
           
            navigate('/')
          }
        })
        .catch((err) => {
          console.error('Error checking user:', err)
        })
    }
  }, [isAuthenticated, user, navigate])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="login-page">
      <h1 className="text-3xl font-bold underline">Welcome to Troll Toll Calculator</h1>
      <p>Please log in to access the application.</p>
      <button onClick={() => loginWithRedirect()} className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Log In
      </button>
    </div>
  )
}
