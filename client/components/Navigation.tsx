// import React from "react"
import { Link } from 'react-router-dom'


import { useAuth0 } from '@auth0/auth0-react'
// import { useNavigate } from 'react-router-dom'

function Navigation() {

  const { loginWithRedirect} = useAuth0()
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
        <button onClick={() => loginWithRedirect()} className="login-btn">Log in</button>
        
        <button className="signup-btn">Sign up</button>
      </div>
    </nav>
  )
}

export default Navigation
