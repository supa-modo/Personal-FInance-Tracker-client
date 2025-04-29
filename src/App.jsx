

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { FinancialProvider } from './context/FinancialContext';

// Custom Hooks
import useAuth from './hooks/useAuth';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import FinancialSourcesList from './pages/FinancialSources/FinancialSourcesList';
import FinancialSourceDetail from './pages/FinancialSources/FinancialSourceDetail';
import NotFound from './pages/NotFound/NotFound';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
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
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
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
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </FinancialProvider>
    </AuthProvider>
  );
}

export default App;
