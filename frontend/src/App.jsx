import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import Navbar from './pages/Navbar';
import AuthPage from './pages/Login';
import { ToastContainer } from 'react-toastify';
import { UserProvider, useAuth} from './context/UserContext.jsx';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? children : <Navigate to="/login" replace />;
}

function AuthRoute() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Navigate to="/home" replace /> : <AuthPage />;
}

function App() {
  return (
      <UserProvider>
            <Router>
      <Navbar />
      <div className="container mx-auto">
        <Routes>
          <Route path="/login" element={<AuthRoute />} />
          <Route path="/" element={<AuthRoute />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
      </UserProvider>
  );
}

export default App;

