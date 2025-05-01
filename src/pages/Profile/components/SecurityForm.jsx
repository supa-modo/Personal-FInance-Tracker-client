import React from 'react';
import { motion } from 'framer-motion';
import {
  TbLock,
  TbShieldLock,
  TbLoader2,
  TbAlertCircle,
  TbEye,
  TbEyeOff,
  TbCircleCheck
} from 'react-icons/tb';
import { PiLockDuotone, PiPasswordDuotone } from 'react-icons/pi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

/**
 * SecurityForm Component
 * Handles the security settings form
 */
const SecurityForm = ({ 
  passwordForm, 
  handlePasswordChange, 
  handlePasswordUpdate, 
  passwordErrors, 
  passwordLoading,
  passwordStrength,
  showCurrentPassword,
  showNewPassword,
  showConfirmPassword,
  setShowCurrentPassword,
  setShowNewPassword,
  setShowConfirmPassword
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      layout
    >
      <div className="mb-6 pb-4 md:pb-6 border-b border-white/10">
        <div className="flex items-center justify-between">
            
            <div>
              <h3 className="text-base md:text-lg font-medium text-primary-500/80">Password & Security</h3>
              <p className="text-sm md:text-base text-white/60">Manage your account security settings</p>
            </div>
          <div className="flex items-center text-[0.85rem] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
            <TbCircleCheck className="w-3.5 h-3.5 mr-1" />
            Secure
          </div>
        </div>
      </div>

      <motion.form 
        onSubmit={handlePasswordUpdate} 
        className="space-y-4 md:space-y-6"
        variants={containerVariants}
        layout
      >
        <div className="space-y-2">
          <label htmlFor="currentPassword" className="block text-sm font-medium text-white/80 ml-2">
            Current Password
          </label>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative">
              <PiPasswordDuotone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500" />
              <input
                id="currentPassword"
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className={`block w-full pl-12 pr-8 py-3 border ${
                  passwordErrors.currentPassword ? 'border-rose-500/50' : 'border-white/10'
                } bg-white/5 backdrop-blur-sm rounded-xl tracking-wide text-white focus:outline-none focus:ring-1 focus:ring-primary-500/60 focus:border-primary-500/60 transition-all duration-200 shadow-sm`}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                tabIndex="-1"
              >
                {showCurrentPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          {passwordErrors.currentPassword && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-rose-400 ml-2 flex items-center"
              layout
            >
              <TbAlertCircle className="w-4 h-4 mr-1" />
              {passwordErrors.currentPassword}
            </motion.p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="newPassword" className="block text-sm font-medium text-white/80 ml-2">
            New Password
          </label>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative">
              <TbShieldLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500" />
              <input  
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className={`block w-full pl-12 pr-10 py-3 border ${
                  passwordErrors.newPassword ? 'border-rose-500/50' : 'border-white/10'
                } bg-white/5 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-primary-500/60 focus:border-primary-500/60 transition-all duration-200 shadow-sm`}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
                onClick={() => setShowNewPassword(!showNewPassword)}
                tabIndex="-1"
              >
                {showNewPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          {passwordErrors.newPassword && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-rose-400 ml-2 flex items-center"
              layout
            >
              <TbAlertCircle className="w-4 h-4 mr-1" />
              {passwordErrors.newPassword}
            </motion.p>
          )}
          
          {/* Password strength indicator */}
          {passwordForm.newPassword && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-white/60">Password Strength</span>
                <span className="text-xs font-medium" style={{ color: passwordStrength.color }}>{passwordStrength.label}</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${passwordStrength.color} transition-all duration-300`} 
                  style={{ width: `${passwordStrength.strength}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="newPasswordConfirm" className="block text-sm font-medium text-white/80 ml-2">
            Confirm New Password
          </label>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative">
              <TbShieldLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500" />
              <input
                id="newPasswordConfirm"
                name="newPasswordConfirm"
                type={showConfirmPassword ? "text" : "password"}
                value={passwordForm.newPasswordConfirm}
                onChange={handlePasswordChange}
                className={`block w-full pl-12 pr-10 py-3 border ${
                  passwordErrors.newPasswordConfirm ? 'border-rose-500/50' : 'border-white/10'
                } bg-white/5 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-primary-500/60 focus:border-primary-500/60 transition-all duration-200 shadow-sm`}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex="-1"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          {passwordErrors.newPasswordConfirm && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-rose-400 ml-2 flex items-center"
              layout
            >
              <TbAlertCircle className="w-4 h-4 mr-1" />
              {passwordErrors.newPasswordConfirm}
            </motion.p>
          )}
        </div>
        
        <motion.div className="pt-6" variants={itemVariants} layout>
          <button
            type="submit"
            disabled={passwordLoading}
            className="group relative w-full flex justify-center items-center text-[0.9rem] md:text-base py-3 px-4 rounded-xl text-white overflow-hidden transition-all duration-300 transform disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
          >
            {/* Button background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300 group-hover:from-primary-600 group-hover:to-primary-500"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>

            {/* Button content */}
            <span className="relative flex items-center">
              {passwordLoading ? (
                <>
                  <TbLoader2 className="animate-spin mr-2 h-5 w-5 text-white" />
                  <span className="font-medium">Updating...</span>
                </>
              ) : (
                <>
                  <TbShieldLock className="mr-2 h-5 w-5" />
                  <span className="font-medium">Update Password</span>
                </>
              )}
            </span>
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default SecurityForm;
