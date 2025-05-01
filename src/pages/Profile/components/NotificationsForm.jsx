import React from "react";
import { motion } from "framer-motion";
import {
  TbBell,
  TbMail,
  TbDeviceFloppy,
  TbLoader2,
  TbEdit,
  TbCalendarTime,
  TbChevronRight,
  TbDeviceMobile,
  TbCalendarDot,
} from "react-icons/tb";
import { FaSave } from "react-icons/fa";

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

/**
 * NotificationsForm Component
 * Handles the notification preferences form
 */
const NotificationsForm = ({
  notificationSettings,
  handleNotificationChange,
  handleNotificationUpdate,
  notificationsLoading,
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      layout
    >
      <div className="mb-6 pb-4 md:pb-6 border-b border-white/10">
         <div>
            <div className="flex justify-between items-center">
            <h3 className="text-base md:text-lg font-medium text-primary-500/80">
              Notification Preferences
            </h3>
            <div className="flex items-center text-xs md:text-sm text-primary-400 bg-primary-500/10 px-2.5 py-1 rounded-full">
            <TbCalendarDot className="w-4 md:w-5 h-4 md:h-5 mr-1" />
            {notificationSettings.reminder_frequency.charAt(0).toUpperCase() +
              notificationSettings.reminder_frequency.slice(1)}
          </div>
            </div>
            
            <p className="text-sm md:text-base text-white/60">
              Manage how and when you receive notifications
            </p>
          </div>
          
      </div>

      <motion.form
        onSubmit={handleNotificationUpdate}
        className="space-y-6"
        variants={containerVariants}
        layout
      >
        <motion.div className="space-y-4 md:space-y-6" variants={itemVariants} layout>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Email Notifications
                  </h4>
                  <p className="text-xs text-white/60">
                    Receive updates and reminders via email
                  </p>
                </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="email_notifications"
                  checked={notificationSettings.email_notifications}
                  onChange={handleNotificationChange}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[5px] after:bg-white after:border-white/20 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 shadow-inner"></div>
              </label>
            </div>

            <div className="mt-4 space-y-2 md:pl-4">
               <label
                  htmlFor="reminder_frequency"
                  className="block text-sm font-medium text-primary-500/80"
                >
                  Reminder Frequency
                </label>
                
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative">
                  <TbCalendarTime className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500" />
                  <select
                    id="reminder_frequency"
                    name="reminder_frequency"
                    value={notificationSettings.reminder_frequency}
                    onChange={handleNotificationChange}
                    className="block w-full pl-10 py-3 px-3 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500/60 focus:border-primary-500/60 transition-all duration-200 appearance-none shadow-sm"
                    disabled={!notificationSettings.email_notifications}
                  >
                    <option value="daily">Daily Reminders</option>
                    <option value="weekly">Weekly Summaries</option>
                    <option value="monthly">Monthly Reports</option>
                    <option value="never">Never (Disable All)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <TbChevronRight className="h-5 w-5 text-white/40 transform rotate-90" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
               
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Push Notifications
                  </h4>
                  <p className="text-[0.8rem] text-white/60">
                    Get alerts on your devices
                  </p>
              </div>
              <div className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">
                Coming Soon
              </div>
            </div>
          </div>
        </motion.div>

        
          <motion.button
          whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={notificationsLoading}
            className="group relative w-full flex justify-center items-center py-3 px-4 rounded-xl text-gray-100 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
          >
            {/* Button background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700  group-hover:from-primary-600 group-hover:to-primary-500"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>

            {/* Button content */}
            <span className="relative flex items-center">
              {notificationsLoading ? (
                <>
                  <TbLoader2 className="animate-spin mr-2 h-5 w-5 text-white" />
                  <span className="font-medium">Saving...</span>
                </>
              ) : (
                <>
                  <FaSave className="mr-2 h-5 w-5" />
                  <span className="font-medium text-[0.93rem] md:text-base">Save Preferences</span>
                </>
              )}
            </span>
          </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default NotificationsForm;
