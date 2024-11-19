// import React from "react"

function Navigation() {
  return (
    <nav className="navigation">
      <div className="navigation-icon">
        <img src="/images/fav-icon-96x96.png" alt="Troll icon" />
      </div>
      <h1 className="navigation-title">Troll toll calculator</h1>

      <div className="auth-buttons">
        <button className="login-btn">Log in</button>
        <button className="signup-btn">Sign up</button>
      </div>
    </nav>
  );  
}

export default Navigation