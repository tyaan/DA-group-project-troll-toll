import { useLocation, useNavigate } from 'react-router-dom'

export default function Register() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = location.state || {}

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const registrationData = {
      auth0_sub: user?.sub,
      name: formData.get('name'),
      last_name: formData.get('last_name'),
      email: user?.email,
      image: user?.picture,
    }

    fetch('/api/v1/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData),
    })
      .then((res) => res.json())
      .then(() => navigate('/'))
      .catch((err) => console.error('Error registering user:', err))
  }

  return (
    <form onSubmit={handleRegister} className="registration-form">
      <h1>Complete Your Registration</h1>
      <label>
        First Name:
        <input type="text" name="name" required />
      </label>
      <label>
        Last Name:
        <input type="text" name="last_name" required />
      </label>
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
        Register
      </button>
    </form>
  )
}
