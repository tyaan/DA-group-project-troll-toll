import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'

export default createRoutesFromElements(
  <>
    <Route path="/login" element={<Login />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      }
    />
  </>
)
