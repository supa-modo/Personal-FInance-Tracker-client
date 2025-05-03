import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TbChartPie, 
  TbArrowLeft,
  TbDeviceAnalytics,
  TbBuildingBank,
  TbCircleCheck,
  TbPigMoney, 
  TbCreditCard,
  TbReportMoney,
  TbShield,
  TbArrowRight,
} from 'react-icons/tb';
import { motion } from 'framer-motion';
import { forgotPassword } from '../../services/auth.service';

// Import the enhanced form component
import ForgotPasswordFormEnhanced from './ForgotPasswordFormEnhanced';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // Email validation function
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleTryAgain = () => {
    setIsSuccess(false);
    setEmail('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate email
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await forgotPassword(email);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    { icon: <TbPigMoney className="h-6 w-6" />, title: "Smart Budgeting", description: "Set and track budgets with intelligent categorization" },
    { icon: <TbCreditCard className="h-6 w-6" />, title: "Financial Sources", description: "Connect and manage all your accounts in one place" },
    { icon: <TbReportMoney className="h-6 w-6" />, title: "Wealth Insights", description: "Visualize your net worth and financial growth" },
    { icon: <TbShield className="h-6 w-6" />, title: "Secure & Private", description: "Bank-level security with your data always protected" }
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden relative">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-0"></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-40 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-purple-800/20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-primary-600/20 via-transparent to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary-400/10 via-transparent to-transparent rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      
      {/* Left side - Content */}
      <div className="lg:w-1/2 relative overflow-hidden z-10 xl:pl-10">
        <div className="relative w-full h-full flex flex-col justify-between p-6 xl:p-12">
          {/* Top section with logo and headline */}
          <div className="pt-5 md:pt-8 pl-0 md:pl-6">
            <div className="flex items-center space-x-3 mb-4 md:mb-10">
              <a href="/" className="flex items-center space-x-3">
                <div className="p-2 md:p-3 bg-gradient-to-br from-primary-500/30 to-primary-700/30 rounded-xl md:rounded-2xl backdrop-blur-xl shadow-xl border border-primary-500/20">
                  <TbChartPie className="h-6 md:h-8 w-6 md:w-8 text-primary-300" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-primary-100">FinanceFlow</h1>
              </a>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight max-w-xl lg:max-w-3xl">
              Reset your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-primary-400">password</span> securely
            </h2>
            
            <p className="text-[1.1rem] md:text-xl text-white/80 mb-10 max-w-xl">
              We'll send you a secure link to reset your password and get you back to managing your finances.
            </p>
            
            <Link 
              to="/login" 
              className="hidden lg:flex items-center text-primary-400 hover:text-primary-300 transition-colors"
            >
              <TbArrowLeft className="mr-2 h-5 w-5" />
              Back to login
            </Link>
          </div>
          
          {/* Middle section with features */}
          <div className="hidden lg:inline space-y-6 lg:mb-14">
            <h3 className="text-xl font-semibold text-white/90 mb-4">Why choose FinanceFlow?</h3>
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex flex-col p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/8 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-900/20"
                >
                  <div className="p-3 bg-gradient-to-br from-primary-500/20 to-primary-700/20 rounded-xl backdrop-blur-md w-fit mb-4 border border-primary-500/20">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Enhanced Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center -mt-12 lg:mt-0 p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Mobile-only back button */}
        <div className="lg:hidden w-full max-w-lg mb-6 flex justify-start">
          <Link 
            to="/login" 
            className="flex items-center text-primary-400 hover:text-primary-300 transition-colors"
          >
            <TbArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-primary-600/20 to-primary-400/50 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-tr from-primary-600/40 to-primary-400/50 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        
        {/* Use the enhanced form component */}
        <ForgotPasswordFormEnhanced 
          email={email}
          error={error}
          isSubmitting={isSubmitting}
          isSuccess={isSuccess}
          handleEmailChange={handleEmailChange}
          handleSubmit={handleSubmit}
          handleTryAgain={handleTryAgain}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
