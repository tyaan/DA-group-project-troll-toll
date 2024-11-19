import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if no user data is passed
    }
  }, [user, navigate]);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const registrationData = {
      auth0_sub: user?.sub,
      name: formData.get('name') as string,
      last_name: formData.get('last_name') as string,
      email: user?.email,
      image: user?.picture,
    };

    try {
      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register user');
      }

      navigate('/'); // Redirect to the main app upon successful registration
    } catch (err: unknown) {
      console.error('Error registering user:', err);
      setError((err as Error).message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <h1 className="text-2xl font-bold mb-4">Complete Your Registration</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <label className="block">
          <span>First Name:</span>
          <input
            type="text"
            name="name"
            required
            className="border rounded p-2 w-full"
          />
        </label>
        <label className="block">
          <span>Last Name:</span>
          <input
            type="text"
            name="last_name"
            required
            className="border rounded p-2 w-full"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-white rounded ${
            loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
