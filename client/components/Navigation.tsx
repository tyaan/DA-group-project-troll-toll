// import React from "react"
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
// import { useNavigate } from 'react-router-dom'

function Navigation() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()

  // const { loginWithRedirect} = useAuth0()
  // const navigate = useNavigate()

  return (
    <nav className="navigation">
      <div className="navigation-icon">
        <Link to="/" aria-label="Go to home page">
          <img src="/images/fav-icon-96x96.png" alt="Troll icon" />
        </Link>
      </div>
      <h1 className="navigation-title">Troll toll calculator</h1>

      <div className="auth-buttons">
        {isAuthenticated ? (
          <>
            <p>
              Welcome, {user?.given_name} {user?.family_name}
              {/* ({user?.email}) ({user?.sub}) */}
            </p>
            <button
              className="login-btn"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log out
            </button>
          </>
        ) : (
          <button className="login-btn" onClick={() => loginWithRedirect()}>
            Log in
          </button>
        )}
        <Link to="/" className="home-btn">
          Home
        </Link>
      </div>
    </nav>
  )
}

export default Navigation
