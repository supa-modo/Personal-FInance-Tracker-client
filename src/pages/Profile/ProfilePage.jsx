import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import MainLayout from '../../components/layout/MainLayout';

// Import components
import ProfileForm from './components/ProfileForm';
import SecurityForm from './components/SecurityForm';
import NotificationsForm from './components/NotificationsForm';
import ProfileSidebar from './components/ProfileSidebar';
import NotificationModal from './components/NotificationModal';
import { PiUserDuotone } from 'react-icons/pi';

// Animation variants for page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

/**
 * ProfilePage Component
 * Main component for user profile management
 */
const ProfilePage = () => {
  const { user, updateProfile, updatePassword, updateNotificationSettings, logout } = useAuth();
  
  // Notification state
  const [notification, setNotification] = useState({
    isVisible: false,
    type: 'info',
    message: ''
  });
  
  // Show notification helper function
  const showNotification = (type, message) => {
    setNotification({
      isVisible: true,
      type,
      message
    });
    
    // Auto-hide notification after 4 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }));
    }, 4000);
  };
  
  // Close notification helper function
  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
  });
  
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  
  // Password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    email_notifications: true,
    reminder_frequency: 'weekly',
  });
  
  // Form errors
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  
  // Loading states
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  
  // Active tab
  const [activeTab, setActiveTab] = useState('profile');
  
  // Activity log (simulated data)
  const [recentActivity] = useState([
    { type: 'login', device: 'Desktop - Chrome', location: 'New York, USA', date: new Date(Date.now() - 1000 * 60 * 5) },
    { type: 'transaction', name: 'Added expense', amount: '$45.99', category: 'Groceries', date: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    { type: 'settings', name: 'Updated profile', date: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { type: 'login', device: 'Mobile - Safari', location: 'New York, USA', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
  ]);
  
  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: 'None', color: 'bg-white/10' };
    
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const length = password.length;
    
    let strength = 0;
    if (length >= 8) strength += 1;
    if (length >= 12) strength += 1;
    if (hasLower) strength += 1;
    if (hasUpper) strength += 1;
    if (hasNumber) strength += 1;
    if (hasSpecial) strength += 1;
    
    if (strength <= 2) return { strength: 20, label: 'Weak', color: 'bg-rose-500' };
    if (strength <= 4) return { strength: 50, label: 'Moderate', color: 'bg-amber-500' };
    if (strength <= 5) return { strength: 80, label: 'Strong', color: 'bg-emerald-500' };
    return { strength: 100, label: 'Very Strong', color: 'bg-green-400' };
  };
  
  const passwordStrength = getPasswordStrength(passwordForm.newPassword);
  
  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
      });
      
      if (user.notification_settings) {
        setNotificationSettings(user.notification_settings);
      }
    }
  }, [user]);
  
  // Handle profile form change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (profileErrors[name]) {
      setProfileErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Handle password form change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Handle notification settings change
  const handleNotificationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Validate profile form
  const validateProfileForm = () => {
    const errors = {};
    
    if (!profileForm.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!profileForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileForm.email)) {
      errors.email = 'Email is invalid';
    }
    
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Validate password form
  const validatePasswordForm = () => {
    const errors = {};
    
    // Validate current password
    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    } else if (passwordForm.currentPassword.trim() === '') {
      errors.currentPassword = 'Current password cannot be empty';
    }
    
    // Validate new password
    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.trim() === '') {
      errors.newPassword = 'New password cannot be empty';
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }
    
    // Validate password confirmation
    if (!passwordForm.newPasswordConfirm) {
      errors.newPasswordConfirm = 'Please confirm your new password';
    } else if (passwordForm.newPasswordConfirm.trim() === '') {
      errors.newPasswordConfirm = 'Password confirmation cannot be empty';
    } else if (passwordForm.newPassword !== passwordForm.newPasswordConfirm) {
      errors.newPasswordConfirm = 'Passwords do not match';
    }
    
    // Check if new password is the same as current password
    if (passwordForm.currentPassword && 
        passwordForm.newPassword && 
        passwordForm.currentPassword === passwordForm.newPassword) {
      errors.newPassword = 'New password must be different from current password';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    if (!validateProfileForm()) return;
    
    setProfileLoading(true);
    try {
      await updateProfile(profileForm);
      showNotification('success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification('error', error.response?.data?.message || 'Failed to update profile');
      
      // Set form errors if they exist in the response
      if (error.response?.data?.errors) {
        setProfileErrors(error.response.data.errors);
      }
    } finally {
      setProfileLoading(false);
    }
  };
  
  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;
    
    setPasswordLoading(true);
    try {
      // Log the password data being sent (without showing actual passwords)
      console.log('Updating password with form data structure:', {
        currentPassword: passwordForm.currentPassword ? '[PROVIDED]' : '[MISSING]',
        newPassword: passwordForm.newPassword ? '[PROVIDED]' : '[MISSING]',
        newPasswordConfirm: passwordForm.newPasswordConfirm ? '[PROVIDED]' : '[MISSING]',
      });
      
      // Call the updatePassword function with the password data
      await updatePassword(passwordForm);
      
      showNotification('success', 'Password updated successfully');
      
      // Reset password form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      });
      
      // Clear any password errors
      setPasswordErrors({});
    } catch (error) {
      console.error('Error updating password:', error);
      
      // Show a more specific error message if available
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update password';
      showNotification('error', errorMessage);
      
      // Set form errors if they exist in the response
      if (error.response?.data?.errors) {
        setPasswordErrors(error.response.data.errors);
      }
    } finally {
      setPasswordLoading(false);
    }
  };
  
  // Handle notification settings update
  const handleNotificationUpdate = async (e) => {
    e.preventDefault();
    
    setNotificationsLoading(true);
    try {
      await updateNotificationSettings({ notification_settings: notificationSettings });
      showNotification('success', 'Notification settings updated');
    } catch (error) {
      console.error('Error updating notification settings:', error);
      showNotification('error', 'Failed to update notification settings');
    } finally {
      setNotificationsLoading(false);
    }
  };
  
  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileForm
            user={user}
            profileForm={profileForm}
            handleProfileChange={handleProfileChange}
            handleProfileUpdate={handleProfileUpdate}
            profileErrors={profileErrors}
            profileLoading={profileLoading}
          />
        );
      case 'security':
        return (
          <SecurityForm
            passwordForm={passwordForm}
            handlePasswordChange={handlePasswordChange}
            handlePasswordUpdate={handlePasswordUpdate}
            passwordErrors={passwordErrors}
            passwordLoading={passwordLoading}
            passwordStrength={passwordStrength}
            showCurrentPassword={showCurrentPassword}
            showNewPassword={showNewPassword}
            showConfirmPassword={showConfirmPassword}
            setShowCurrentPassword={setShowCurrentPassword}
            setShowNewPassword={setShowNewPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        );
      case 'notifications':
        return (
          <NotificationsForm
            notificationSettings={notificationSettings}
            handleNotificationChange={handleNotificationChange}
            handleNotificationUpdate={handleNotificationUpdate}
            notificationsLoading={notificationsLoading}
          />
        );
      default:
        return (
          <ProfileForm
            user={user}
            profileForm={profileForm}
            handleProfileChange={handleProfileChange}
            handleProfileUpdate={handleProfileUpdate}
            profileErrors={profileErrors}
            profileLoading={profileLoading}
          />
        );
    }
  };
  
  return (
    <MainLayout>
      <NotificationModal 
        type={notification.type} 
        message={notification.message} 
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
      
      <motion.div 
        className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-2"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div>
            <h1 className="text-xl md:ext-2xl md:text-3xl font-bold text-primary-500/80">
             
              Account Profile Settings
            </h1>
            <p className="mt-2 text-white/60 text-sm md:text-base">Manage your account settings and preferences</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-4">
            <ProfileSidebar
              user={user}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              logout={logout}
            />
          </div>
          
          {/* Main content */}
          <div className="md:col-span-8">
            <motion.div 
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl -mx-1 p-4 md:p-6 border border-white/5 shadow-xl"
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default ProfilePage;
