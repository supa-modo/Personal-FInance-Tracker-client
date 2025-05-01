import React from 'react';
import { motion } from 'framer-motion';
import {
  TbUser,
  TbShieldLock,
  TbBell,
  TbChevronRight,
  TbLogout
} from 'react-icons/tb';
import { PiUserDuotone } from 'react-icons/pi';
import { RiUserSettingsLine } from "react-icons/ri";
import { LuLogOut } from 'react-icons/lu';

/**
 * ProfileSidebar Component
 * Handles the sidebar navigation in the profile page
 */
const ProfileSidebar = ({ user, activeTab, setActiveTab, logout }) => {
  return (
    <div className="bg-slate-800/50 -mx-1 backdrop-blur-xl rounded-2xl border border-white/5 shadow-xl overflow-hidden">
      <div className="relative">
        {/* Profile background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600/40 to-gray-800/60 "></div>
        
        {/* User profile info */}
        <div className="relative pt-6 md:pt-12 pb-4 px-4 md:px-6 flex flex-col items-center">
          <div className="w-20 md:w-24 h-20 md:h-24 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 p-1 shadow-xl">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-white overflow-hidden">
              <PiUserDuotone className="w-14 md:w-16 h-14 md:h-16 text-primary-400" />
            </div>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-white">{user?.name}</h3>
          <p className="text-sm text-white/60">{user?.email}</p>
          <div className="mt-1 flex items-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
            <span className="text-xs text-emerald-400">Active Account</span>
          </div>
        </div>
      </div>
      
      <div className="px-3 py-3 md:py-4">
        <nav className="space-y-1">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('profile')}
           
            className={`w-full flex items-center px-2 md:px-3 py-2 md:py-3 text-[0.9rem] md:text-[0.95rem] rounded-xl cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-primary-500/20 to-primary-700/20 text-white shadow-sm'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className={`mr-3 p-2 rounded-lg ${activeTab === 'profile' ? 'bg-primary-500/30 text-primary-300' : 'bg-white/5 text-white/60'}`}>
              <RiUserSettingsLine className="h-5 w-5" />
            </div>
            <div className="flex-1 text-left">Personal Information</div>
            {activeTab === 'profile' && <TbChevronRight className="mr-2 h-5 w-5 text-primary-400" />}
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center px-2 md:px-3 py-2 md:py-3 text-[0.9rem] md:text-[0.95rem] rounded-xl cursor-pointer ${
              activeTab === 'security'
                ? 'bg-gradient-to-r from-primary-500/20 to-primary-700/20 text-white shadow-sm'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className={`mr-3 p-2 rounded-lg ${activeTab === 'security' ? 'bg-primary-500/30 text-primary-300' : 'bg-white/5 text-white/60'}`}>
              <TbShieldLock className="h-5 w-5" />
            </div>
            <div className="flex-1 text-left">Security</div>
            {activeTab === 'security' && <TbChevronRight className="mr-2 h-5 w-5 text-primary-400" />}
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center px-2 md:px-3 py-2 md:py-3 text-[0.9rem] md:text-[0.95rem] rounded-xl cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-gradient-to-r from-primary-500/20 to-primary-700/20 text-white shadow-sm'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className={`mr-3 p-2 rounded-lg ${activeTab === 'notifications' ? 'bg-primary-500/30 text-primary-300' : 'bg-white/5 text-white/60'}`}>
              <TbBell className="h-5 w-5" />
            </div>
            <div className="flex-1 text-left">Notifications</div>
            {activeTab === 'notifications' && <TbChevronRight className="mr-2 h-5 w-5 text-primary-400" />}
          </motion.button>
        </nav>
      </div>
      
      <div className=" px-4 pb-5 md:pb-6">
        <motion.button
        whileTap={{ scale: 0.97 }}
          onClick={logout}
          className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium rounded-xl transition-all text-red-400 md:text-gray-300 bg-white/10 hover:bg-white/5 hover:text-red-500 cursor-pointer border border-white/10 mt-0 md:mt-2"
        >
          <LuLogOut className="mr-2 h-5 w-5" />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
