import { createRoutesFromElements, Route } from 'react-router-dom';
import App from './components/App.tsx';
import Main from './components/Main.tsx'; // Assuming Main is part of App
import Register from './components/Register.tsx';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

export default createRoutesFromElements(
  <>
    {/* Public route for login */}
    <Route path="/login" element={<Login />} />
    
    {/* Public route for user registration */}
    <Route path="/register" element={<Register />} />
    
    {/* Protected route for the main app */}
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      }
    />
  </>
);
