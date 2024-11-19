// File: client/components/Login.tsx

import { useAuth0 } from '@auth0/auth0-react'

export default function Login() {
  const { loginWithRedirect } = useAuth0()

  return (
    <div className="login-page">
      <h1 className="text-3xl font-bold underline">Welcome to Troll Toll Calculator</h1>
      <p>Please log in to access the application.</p>
      <button
        onClick={() => loginWithRedirect()}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Log In
      </button>
    </div>
  )
}
