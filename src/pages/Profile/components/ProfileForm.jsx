import React from 'react';
import { motion } from 'framer-motion';
import {
  TbUser,
  TbMail,
  TbDeviceFloppy,
  TbLoader2,
  TbEdit,
  TbAlertCircle,
  TbUserCircle,
  TbMailFilled
} from 'react-icons/tb';
import { PiUserDuotone } from 'react-icons/pi';
import { FaSave } from "react-icons/fa";

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

/**
 * ProfileForm Component
 * Handles the personal information form
 */
const ProfileForm = ({ 
  user, 
  profileForm, 
  handleProfileChange, 
  handleProfileUpdate, 
  profileErrors, 
  profileLoading 
}) => {

  const getInitials = (name) => {
    const nameParts = name.split(' ');
    
    // If there's only one part to the name, return just the first letter
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    // Otherwise return first letter of first name and first letter of last name
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      layout
    >
      <div className="mb-4 md:mb-6 pb-3 md:pb-6 border-b border-white/10">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-500 to-gray-700 flex items-center justify-center text-white mr-4">
            {getInitials(user?.name)} 
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-white">{user?.name}</h3>
            <p className="text-[0.8rem] md:text-sm text-white/60">{user?.email}</p>
            
          </div>
        </div>
      </div>
      
      <motion.form 
        onSubmit={handleProfileUpdate} 
        className="space-y-4 md:space-y-6"
        variants={containerVariants}
        layout
      >
        <div className="space-y-2" >
            <label htmlFor="name" className="block text-sm font-medium text-white/80 ml-2">
              Full Name
            </label>
            
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative">
              <PiUserDuotone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500" />
              <input
                id="name"
                name="name"
                type="text"
                value={profileForm.name}
                onChange={handleProfileChange}
                className={`block w-full pl-10 pr-3 py-3 border ${
                  profileErrors.name ? 'border-rose-500/50' : 'border-white/10'
                } bg-white/5 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-200 shadow-sm`}
                placeholder="Your full name"
                autoComplete="name"
              />
            </div>
          </div>
          {profileErrors.name && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-rose-400 ml-2 flex items-center"
              layout
            >
              <TbAlertCircle className="w-4 h-4 mr-1" />
              {profileErrors.name}
            </motion.p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-white/80 ml-2">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative">
              <TbMailFilled className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500" />
              <input
                id="email"
                name="email"
                type="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                className={`block w-full pl-10 pr-3 py-3 border ${
                  profileErrors.email ? 'border-rose-500/50' : 'border-white/10'
                } bg-white/5 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-200 shadow-sm`}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          </div>
          {profileErrors.email && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-rose-400 ml-2 flex items-center"
              layout
            >
              <TbAlertCircle className="w-4 h-4 mr-1" />
              {profileErrors.email}
            </motion.p>
          )}
        </div>
        
        <div className="pt-3 md:pt-6">
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={profileLoading}
            className="group relative w-full flex justify-center items-center text-[0.9rem] md:text-base py-3 px-4 rounded-xl text-white overflow-hidden transition-all duration-300 transform disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
          >
            {/* Button background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300 group-hover:from-primary-600 group-hover:to-primary-500"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>

            {/* Button content */}
            <span className="relative flex items-center">
              {profileLoading ? (
                <>
                  <TbLoader2 className="animate-spin mr-2 h-5 w-5 text-white" />
                  <span className="font-medium">Updating...</span>
                </>
              ) : (
                <>
                  <FaSave className="mr-2 h-5 w-5" />
                  <span className="font-medium">Save Changes</span>
                </>
              )}
            </span>
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ProfileForm;
