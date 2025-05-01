import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TbX,
  TbCircleCheck,
  TbAlertCircle,
  TbInfoCircle
} from 'react-icons/tb';

/**
 * Notification Modal Component
 * Displays notifications with different styles based on type
 */
const NotificationModal = ({ type, message, isVisible, onClose }) => {
  // Define styles and icons based on notification type
  let bgColor, iconColor, icon, borderColor, title;
  
  switch (type) {
    case 'success':
      bgColor = 'bg-emerald-500/10';
      iconColor = 'text-emerald-400';
      borderColor = 'border-emerald-500/20';
      icon = <TbCircleCheck className="h-6 w-6" />;
      title = 'Success';
      break;
    case 'error':
      bgColor = 'bg-rose-500/10';
      iconColor = 'text-rose-400';
      borderColor = 'border-rose-500/20';
      icon = <TbAlertCircle className="h-6 w-6" />;
      title = 'Error';
      break;
    case 'info':
    default:
      bgColor = 'bg-blue-500/10';
      iconColor = 'text-blue-400';
      borderColor = 'border-blue-500/20';
      icon = <TbInfoCircle className="h-6 w-6" />;
      title = 'Information';
      break;
  }
  
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", bounce: 0.35 }}
            className={`relative rounded-xl ${bgColor} backdrop-blur-md p-5 border ${borderColor} shadow-2xl max-w-md w-full mx-4`}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10 p-1"
              aria-label="Close notification"
            >
              <TbX className="h-5 w-5" />
            </button>
            <div className="flex items-start">
              <div className={`mr-4 p-2 rounded-full bg-white/10 ${iconColor} flex-shrink-0`}>
                {icon}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">{title}</h3>
                <p className="text-white/80 text-sm">{message}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
