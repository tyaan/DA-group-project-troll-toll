import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Bridges from './Bridges';
import Header from './Header';
import MainContent from './MainContent';
import {registerUser } from '../../client/apis/users.ts';
// import Login from './Login.tsx';

export default function Main() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const checkAndRegisterUser = async () => {
    if (!user) return;

    try {
      const userExistsResponse = await fetch('http://localhost:5173/api/v1/users/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth0Sub: user.sub }), 
      });

      const userExists = await userExistsResponse.json();

      if (userExists.exists) {
        console.log('User already exists.');
        navigate('/');
      } else {
        const userData = {
          auth0_sub: user.sub,
          name: user.given_name,
          last_name: user.family_name,
          email: user.email,
          picture: user.picture,
        };

        await registerUser(userData);
        console.log('User registered successfully');
        navigate('/');
      }
    } catch (err) {
      console.error('Error during user registration or check:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      checkAndRegisterUser();
    }
  }, [isAuthenticated, user, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Header>
        <div className="header-left">
          <h2 className="header-title">The troll toll calculator</h2>
          <p className="container-text">
            The troll toll calculator is here to help friendly Auckland trolls
            with their bridge toll needs. You can check out Auckland bridges or
            sign up to our platform to save your favourites or make bridges your
            own!
          </p>
        </div>
        <div className="header-right">
          <img
            src="/images/troll-under-bridge.jpg"
            alt="Troll under a bridge"
          />
        </div>
      </Header>

      <div className="auth-section">
        {isAuthenticated ? (
          <>
            <p>
              Welcome, {user?.given_name} {user?.family_name} ({user?.email}) ({user?.sub})
            </p>
            <button onClick={() => logout({ returnTo: window.location.origin })}>
              Log out
            </button>
          </>
        ) : (
          <button onClick={() => loginWithRedirect()}>Log in</button>

        )}
      </div>

      <MainContent>
        {/* Display the Bridges component only when authenticated */}
        {/* {isAuthenticated && <Bridges />} */}
        {<Bridges />}
      </MainContent>
    </main>
  );
}
