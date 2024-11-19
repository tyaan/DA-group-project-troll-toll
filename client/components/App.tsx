import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import Bridges from './Bridges.tsx';

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('User is authenticated:', user);

      // Check if the user exists in the database
      fetch('/api/v1/users/check', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auth0_sub: user.sub }),
      })
        .then((res) => {
          console.log('Received response from user check:', res);
          if (!res.ok) {
            throw new Error('Failed to check user existence.');
          }
          return res.json();
        })
        .then((data) => {
          console.log('User check result:', data);

          if (!data.exists) {
            console.log('User does not exist. Creating user in the database.');

            // Prepare user data for database insertion
            const registrationData = {
              auth0_sub: user.sub,
              name: user.given_name,
              last_name: user.family_name,
              email: user.email,
              image: user.picture,
            };

            // Send the data to create the user in the database
            return fetch('/api/v1/users/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(registrationData),
            })
              .then((response) => {
                console.log('Received response from user creation:', response);
                if (!response.ok) {
                  throw new Error('Failed to create user in the database.');
                }
                return response.json();
              })
              .then((data) => {
                console.log('User created in the database:', data);
                // User successfully created, now proceed to the main app.
              })
              .catch((err) => {
                // Log error during user creation
                console.error('Error during user creation:', err);
                setError('There was an issue creating your account. Please try again.');
                return; // Stop further execution
              });
          }
        })
        .catch((err) => {
          // Log error during user check
          console.error('Error during user check:', err);
          setError('There was an issue verifying your account. Please try again.');
          return; // Stop further execution
        });
    }
  }, [isAuthenticated, user]);

  return (
    <div className="app">
      <header>
        {isAuthenticated ? (
          <>
            <p>Welcome, {user?.given_name} {user?.family_name} ({user?.email})</p>
            <button onClick={() => logout({ returnTo: window.location.origin })}>
              Log out
            </button>
          </>
        ) : (
          <button onClick={() => loginWithRedirect()}>Log in</button>
        )}
      </header>

      <h1 className="text-3xl font-bold underline">Troll Toll Calculator</h1>
      {error && <p className="text-red-600">{error}</p>} {/* Display error if any */}
      <Bridges />
    </div>
  );
}

export default App;
