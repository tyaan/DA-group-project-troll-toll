// import React from "react"


import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

function Navigation() {

  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0()
    const navigate = useNavigate()
  
  return (
    <nav className="navigation">
      <div className="navigation-icon">
        <img src="/images/fav-icon-96x96.png" alt="Troll icon" />
      </div>
      <h1 className="navigation-title">Troll toll calculator</h1>

      <div className="auth-buttons">
        <button onClick={() => loginWithRedirect()} className="login-btn">Log in</button>
        
        <button className="signup-btn">Sign up</button>
      </div>
    </nav>
  )
}

export default Navigation
