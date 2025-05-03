import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from "./components/ui/ScrollToTop";

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { FinancialProvider } from './context/FinancialContext';

// Custom Hooks
import useAuth from './hooks/useAuth';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import FinancialSourcesList from './pages/FinancialSources/FinancialSourcesList';
import FinancialSourceDetail from './pages/FinancialSources/FinancialSourceDetail';
import ProfilePage from './pages/Profile/ProfilePage';
import NotFound from './pages/NotFound/NotFound';
import LandingPage from './pages/Landing/LandingPage';
import { TbLoader2 } from 'react-icons/tb';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen"><TbLoader2 className='w-10 h-10 text-primary-500 animate-spin'/></div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <FinancialProvider>
        <Router>
          
        <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/financial-sources" element={
              <ProtectedRoute>
                <FinancialSourcesList />
              </ProtectedRoute>
            } />
            <Route path="/financial-sources/:id" element={
              <ProtectedRoute>
                <FinancialSourceDetail />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </FinancialProvider>
    </AuthProvider>
  );
}

export default App;
