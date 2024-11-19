import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export default function Layout() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()

  return (
    <>
      <header>
        <h1>Large Thumb Digital</h1>
        {isAuthenticated ? (
          <>
            <p>Welcome, {user?.given_name}</p>
            <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
          </>
        ) : (
          <button onClick={() => loginWithRedirect()}>Log in</button>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
