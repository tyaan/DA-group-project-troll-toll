import Bridges from './Bridges.tsx'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()
  return (
    <>
      <div className="app">
      <header>
        
        {isAuthenticated ? (
          <>
            <p>Welcome, {user?.given_name} { user?.family_name} {user?.email } </p>
            
            <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
          </>
        ) : (
          <button onClick={() => loginWithRedirect()}>Log in</button>
        )}
      </header>


        <h1 className="text-3xl font-bold underline">Troll Toll Calculator</h1>
        <Bridges />
      </div>
    </>
  )
}

export default App
