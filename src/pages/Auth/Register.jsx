import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TbChartPie, 
  TbChevronRight,
  TbCreditCard,
  TbPigMoney,
  TbReportMoney,
  TbShield,
  TbArrowRight,
  TbDeviceAnalytics,
  TbBuildingBank,
  TbCircleCheck
} from 'react-icons/tb';
import useAuth from '../../hooks/useAuth';
import { isValidEmail, validatePassword } from '../../utils/validators';

// Import the enhanced register form component
import RegisterFormEnhanced from './RegisterFormEnhanced';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  
  const { register, signInWithGoogle, signInWithApple, isAuthenticated, error: authError } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        await register(formData.name, formData.email, formData.password);
        navigate('/dashboard');
      } catch (error) {
        console.error('Registration error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const features = [
    { icon: <TbPigMoney className="h-6 w-6" />, title: "Smart Budgeting", description: "Set and track budgets with intelligent categorization" },
    { icon: <TbCreditCard className="h-6 w-6" />, title: "Financial Sources", description: "Connect and manage all your accounts in one place" },
    { icon: <TbReportMoney className="h-6 w-6" />, title: "Wealth Insights", description: "Visualize your net worth and financial growth" },
    { icon: <TbShield className="h-6 w-6" />, title: "Secure & Private", description: "Bank-level security with your data always protected" }
  ];


  const navigateToLogin = () => {
    navigate('/login');
  };
  
  // Handle Google Sign-in
  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign-in error:', error);
    } finally {
      setIsGoogleLoading(false);
    }
  };
  
  // Handle Apple Sign-in
  const handleAppleSignIn = async () => {
    try {
      setIsAppleLoading(true);
      await signInWithApple();
      navigate('/dashboard');
    } catch (error) {
      console.error('Apple sign-in error:', error);
    } finally {
      setIsAppleLoading(false);
    }
  };

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
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden z-10 pl-10">
        <div className="relative w-full h-full flex flex-col justify-between p-12">
          {/* Top section with logo and headline */}
          <div className="pt-8 pl-6">
            <div className="flex items-center space-x-3 mb-10">
              <a href="/" className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-primary-500/30 to-primary-700/30 rounded-2xl backdrop-blur-xl shadow-xl border border-primary-500/20">
                  <TbChartPie className="h-8 w-8 text-primary-300" />
                </div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">FinanceFlow</h1>
              </a>
            </div>
            
            <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight max-w-3xl">
              Start tracking your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-primary-200">financial journey</span> today
            </h2>
            
            <p className="text-xl text-white/80 mb-10 max-w-xl">
              Join thousands of users who are already mastering their finances with our intuitive platform designed for everyone.
            </p>
            
           
          </div>
          
          {/* Middle section with features */}
          <div className="space-y-6 mb-14">
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
          
          {/* Bottom section CTA */}
          <div className="mb-8">
            
            {/* CTA */}
            <div className="flex items-center">
              <p className="text-white/80 mr-4">
                Already have an account?
              </p>
              <button 
                onClick={navigateToLogin} 
                className="flex items-center px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-600 hover:to-primary-500 text-white rounded-xl transition-all duration-300 shadow-lg shadow-primary-900/30 hover:shadow-primary-900/50 font-medium"
              >
                Sign in <TbArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Enhanced Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center mt-20 lg:mt-0 p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-primary-600/20 to-primary-400/50 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-tr from-primary-600/40 to-primary-400/50 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        
        {/* Use the enhanced register form component */}
        <RegisterFormEnhanced 
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          setShowPassword={setShowPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          navigateToLogin={navigateToLogin}
          authError={authError}
          handleGoogleSignIn={handleGoogleSignIn}
          handleAppleSignIn={handleAppleSignIn}
          isGoogleLoading={isGoogleLoading}
          isAppleLoading={isAppleLoading}
        />
        
        {/* Mobile features - only visible on small screens */}
        <div className="lg:hidden mt-12 space-y-6 max-w-md">
          <h3 className="text-xl font-semibold text-white/90 text-center">Why choose FinanceFlow?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.slice(0, 2).map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10"
              >
                <div className="p-2 bg-gradient-to-br from-primary-500/20 to-primary-700/20 rounded-lg backdrop-blur-md border border-primary-500/20">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base">{feature.title}</h3>
                  <p className="text-white/70 text-xs">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile CTA */}
          <div className="hidden lg:flex flex-col text-center pt-4">
            <p className="text-white/80 mb-4">
              Already have an account?
            </p>
            <button 
              onClick={navigateToLogin} 
              className="flex items-center px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-600 hover:to-primary-500 text-white rounded-xl transition-all duration-300 shadow-lg shadow-primary-900/30 hover:shadow-primary-900/50 font-medium mx-auto"
            >
              Sign in <TbArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* CSS for animations and patterns */}
      <style >{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes pulse-slow {
          0% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 0.4;
          }
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
    </div>
  );
}

export default Register;
