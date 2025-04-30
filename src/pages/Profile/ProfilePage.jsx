import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import useAuth  from '../../hooks/useAuth';
import {
  TbX,
  TbUser,
  TbMail,
  TbLock,
  TbBell,
  TbDeviceFloppy,
  TbLoader2,
  TbCheck,
  TbAlertCircle,
  TbShieldLock,
  TbSettings,
  TbUserCircle,
  TbInfoCircle,
} from 'react-icons/tb';

// Notification Modal Component
const NotificationModal = ({ type, message, isVisible, onClose }) => {
  if (!isVisible) return null;
  
  // Define styles and icons based on notification type
  let bgColor, iconColor, icon;
  
  switch (type) {
    case 'success':
      bgColor = 'bg-green-500/20';
      iconColor = 'text-green-400';
      icon = <TbCheck className="h-6 w-6" />;
      break;
    case 'error':
      bgColor = 'bg-red-500/20';
      iconColor = 'text-red-400';
      icon = <TbAlertCircle className="h-6 w-6" />;
      break;
    case 'info':
    default:
      bgColor = 'bg-blue-500/20';
      iconColor = 'text-blue-400';
      icon = <TbInfoCircle className="h-6 w-6" />;
      break;
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative rounded-xl ${bgColor} backdrop-blur-md p-4 border border-white/10 shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 ease-in-out scale-100`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/60 hover:text-white transition-colors"
        >
          <TbX className="h-5 w-5" />
        </button>
        <div className="flex items-center">
          <div className={`mr-3 ${iconColor}`}>{icon}</div>
          <p className="text-white text-sm font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const { user, updateProfile, updatePassword, updateNotificationSettings, loading } = useAuth();
  
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
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }));
    }, 3000);
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
    
    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!passwordForm.newPasswordConfirm) {
      errors.newPasswordConfirm = 'Please confirm your new password';
    } else if (passwordForm.newPassword !== passwordForm.newPasswordConfirm) {
      errors.newPasswordConfirm = 'Passwords do not match';
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
      await updatePassword(passwordForm);
      showNotification('success', 'Password updated successfully');
      
      // Reset password form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      });
    } catch (error) {
      console.error('Error updating password:', error);
      showNotification('error', error.response?.data?.message || 'Failed to update password');
      
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
  
  // Tab content components
  const ProfileTabContent = () => (
    <form onSubmit={handleProfileUpdate} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-white/80 ml-1">
          Full Name
        </label>
        <div className="relative">
          <TbUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500" />
          <input
            id="name"
            name="name"
            type="text"
            value={profileForm.name}
            onChange={handleProfileChange}
            className={`block w-full pl-10 pr-3 py-2.5 border ${
              profileErrors.name ? 'border-red-500/50' : 'border-white/10'
            } bg-white/5 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
            placeholder="Your full name"
          />
        </div>
        {profileErrors.name && (
          <p className="mt-1 text-sm text-red-400 ml-1">{profileErrors.name}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-white/80 ml-1">
          Email Address
        </label>
        <div className="relative">
          <TbMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500" />
          <input
            id="email"
            name="email"
            type="email"
            value={profileForm.email}
            onChange={handleProfileChange}
            className={`block w-full pl-10 pr-3 py-2.5 border ${
              profileErrors.email ? 'border-red-500/50' : 'border-white/10'
            } bg-white/5 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
            placeholder="you@example.com"
          />
        </div>
        {profileErrors.email && (
          <p className="mt-1 text-sm text-red-400 ml-1">{profileErrors.email}</p>
        )}
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          disabled={profileLoading}
          className="group relative w-full flex justify-center items-center py-2.5 px-4 rounded-xl text-white overflow-hidden transition-all duration-300 transform disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {/* Button background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/80 to-primary-600 transition-all duration-300 group-hover:from-primary-700 group-hover:to-primary-500"></div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>

          {/* Button content */}
          <span className="relative flex items-center">
            {profileLoading ? (
              <>
                <TbLoader2 className="animate-spin mr-2 h-4 w-4 text-white" />
                Updating...
              </>
            ) : (
              <>
                <TbDeviceFloppy className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
  
  const SecurityTabContent = () => (
    <form onSubmit={handlePasswordUpdate} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="currentPassword" className="block text-sm font-medium text-white/80 ml-1">
          Current Password
        </label>
        <div className="relative">
          <TbLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500" />
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            className={`block w-full pl-10 pr-3 py-2.5 border ${
              passwordErrors.currentPassword ? 'border-red-500/50' : 'border-white/10'
            } bg-white/5 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
            placeholder="••••••••"
          />
        </div>
        {passwordErrors.currentPassword && (
          <p className="mt-1 text-sm text-red-400 ml-1">{passwordErrors.currentPassword}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="newPassword" className="block text-sm font-medium text-white/80 ml-1">
          New Password
        </label>
        <div className="relative">
          <TbShieldLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500" />
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            className={`block w-full pl-10 pr-3 py-2.5 border ${
              passwordErrors.newPassword ? 'border-red-500/50' : 'border-white/10'
            } bg-white/5 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
            placeholder="••••••••"
          />
        </div>
        {passwordErrors.newPassword && (
          <p className="mt-1 text-sm text-red-400 ml-1">{passwordErrors.newPassword}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="newPasswordConfirm" className="block text-sm font-medium text-white/80 ml-1">
          Confirm New Password
        </label>
        <div className="relative">
          <TbShieldLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500" />
          <input
            id="newPasswordConfirm"
            name="newPasswordConfirm"
            type="password"
            value={passwordForm.newPasswordConfirm}
            onChange={handlePasswordChange}
            className={`block w-full pl-10 pr-3 py-2.5 border ${
              passwordErrors.newPasswordConfirm ? 'border-red-500/50' : 'border-white/10'
            } bg-white/5 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
            placeholder="••••••••"
          />
        </div>
        {passwordErrors.newPasswordConfirm && (
          <p className="mt-1 text-sm text-red-400 ml-1">{passwordErrors.newPasswordConfirm}</p>
        )}
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          disabled={passwordLoading}
          className="group relative w-full flex justify-center items-center py-2.5 px-4 rounded-xl text-white overflow-hidden transition-all duration-300 transform disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {/* Button background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/80 to-primary-600 transition-all duration-300 group-hover:from-primary-700 group-hover:to-primary-500"></div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>

          {/* Button content */}
          <span className="relative flex items-center">
            {passwordLoading ? (
              <>
                <TbLoader2 className="animate-spin mr-2 h-4 w-4 text-white" />
                Updating...
              </>
            ) : (
              <>
                <TbShieldLock className="mr-2 h-4 w-4" />
                Update Password
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
  
  const NotificationsTabContent = () => (
    <form onSubmit={handleNotificationUpdate} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TbBell className="h-5 w-5 text-primary-500 mr-3" />
            <span className="text-sm font-medium text-white">Email Notifications</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="email_notifications"
              checked={notificationSettings.email_notifications}
              onChange={handleNotificationChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
        
        <div className="space-y-2 pl-8">
          <label htmlFor="reminder_frequency" className="block text-sm font-medium text-white/80">
            Reminder Frequency
          </label>
          <select
            id="reminder_frequency"
            name="reminder_frequency"
            value={notificationSettings.reminder_frequency}
            onChange={handleNotificationChange}
            className="block w-full py-2.5 px-3 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            disabled={!notificationSettings.email_notifications}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="never">Never</option>
          </select>
        </div>
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          disabled={notificationsLoading}
          className="group relative w-full flex justify-center items-center py-2.5 px-4 rounded-xl text-white overflow-hidden transition-all duration-300 transform disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {/* Button background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/80 to-primary-600 transition-all duration-300 group-hover:from-primary-700 group-hover:to-primary-500"></div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>

          {/* Button content */}
          <span className="relative flex items-center">
            {notificationsLoading ? (
              <>
                <TbLoader2 className="animate-spin mr-2 h-4 w-4 text-white" />
                Saving...
              </>
            ) : (
              <>
                <TbDeviceFloppy className="mr-2 h-4 w-4" />
                Save Preferences
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
  
  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTabContent />;
      case 'security':
        return <SecurityTabContent />;
      case 'notifications':
        return <NotificationsTabContent />;
      default:
        return <ProfileTabContent />;
    }
  };
  
  return (
    <MainLayout>
      {/* Custom notification modal */}
      <NotificationModal
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Profile Settings</h1>
          <p className="mt-2 text-white/60">
            Manage your account settings and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-lg">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center text-white mb-3">
                  <TbUserCircle className="w-12 h-12" />
                </div>
                <h3 className="text-lg font-semibold text-white">{user?.name}</h3>
                <p className="text-sm text-white/60">{user?.email}</p>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary-600/30 text-primary-300'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <TbUser className={`mr-3 h-5 w-5 ${activeTab === 'profile' ? 'text-primary-400' : 'text-white/60'}`} />
                  Personal Information
                </button>
                
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'security'
                      ? 'bg-primary-600/30 text-primary-300'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <TbShieldLock className={`mr-3 h-5 w-5 ${activeTab === 'security' ? 'text-primary-400' : 'text-white/60'}`} />
                  Security
                </button>
                
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'notifications'
                      ? 'bg-primary-600/30 text-primary-300'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <TbBell className={`mr-3 h-5 w-5 ${activeTab === 'notifications' ? 'text-primary-400' : 'text-white/60'}`} />
                  Notifications
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                {activeTab === 'profile' && (
                  <>
                    <TbUser className="mr-2 h-5 w-5 text-primary-500" />
                    Personal Information
                  </>
                )}
                {activeTab === 'security' && (
                  <>
                    <TbShieldLock className="mr-2 h-5 w-5 text-primary-500" />
                    Security Settings
                  </>
                )}
                {activeTab === 'notifications' && (
                  <>
                    <TbBell className="mr-2 h-5 w-5 text-primary-500" />
                    Notification Preferences
                  </>
                )}
              </h2>
              
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
