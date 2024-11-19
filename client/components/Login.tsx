import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Checking user authentication...');

    // If the user is authenticated and user data is available
    if (isAuthenticated && user) {
      console.log('User is authenticated:', user);

      // Send request to check if user exists in the database
      console.log('Sending request to check if user exists in database...');
      fetch('/api/v1/users/check', {
        method: 'POST',
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
            fetch('/api/v1/users/register', {
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

                // After successfully registering the user, navigate to the home page
                navigate('/');
              })
              .catch((err) => {
                // Log error during user creation
                console.error('Error during user creation:', err);
                setError('There was an issue creating your account. Please try again.');
                return; // Stop further execution
              });
          } else {
            console.log('User exists. Redirecting to the home page.');
            navigate('/');
          }
        })
        .catch((err) => {
          // Log error during user check
          console.error('Error during user check:', err);
          setError('There was an issue verifying your account. Please try again.');
          return; // Stop further execution
        });
    } else {
      console.log('User is not authenticated or no user data available.');
    }
  }, [isAuthenticated, user, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <div>Loading user data...</div>;
  }

  // If not authenticated, show the login button
  return (
    <div className="login-page">
      <h1 className="text-3xl font-bold underline">Welcome to Troll Toll Calculator</h1>
      <p>Please log in to access the application.</p>
      {error && <p className="text-red-600">{error}</p>}
      <button
        onClick={() => loginWithRedirect()}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Log In
      </button>
    </div>
  );
}
