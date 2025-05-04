import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ScrollToTop from "./components/ui/ScrollToTop";
import { Analytics } from "@vercel/analytics/react"

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
import OAuthSuccess from './pages/Auth/OAuthSuccess';
import OAuthFailure from './pages/Auth/OAuthFailure';
import Dashboard from './pages/Dashboard/Dashboard';
import FinancialSourcesList from './pages/FinancialSources/FinancialSourcesList';
import FinancialSourceDetail from './pages/FinancialSources/FinancialSourceDetail';
import ProfilePage from './pages/Profile/ProfilePage';
import NotFound from './pages/NotFound/NotFound';
import LandingPage from './pages/Landing/LandingPage';
import { TbLoader2 } from 'react-icons/tb';


// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <TbLoader2 className='w-10 h-10 text-primary-500 animate-spin'/>
  </div>
);

// Protected routes layout with both Auth and Financial providers
const ProtectedLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <FinancialProvider>
      <Outlet />
    </FinancialProvider>
  );
};

function App() {
  return (
    <Router>
      <Analytics />
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          {/* Public Routes - No Financial Provider */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/oauth-failure" element={<OAuthFailure />} />
          {/* <Route path="/" element={<LandingPage />} /> */}
          
          {/* Protected Routes with Financial Provider */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/financial-sources" element={<FinancialSourcesList />} />
            <Route path="/financial-sources/:id" element={<FinancialSourceDetail />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
