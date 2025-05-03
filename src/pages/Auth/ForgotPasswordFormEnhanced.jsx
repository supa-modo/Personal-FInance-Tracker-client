import React from "react";
import {
  TbChartPie,
  TbMailFilled,
  TbLoader2,
  TbAlertTriangle,
  TbArrowRight,
  TbCheck
} from "react-icons/tb";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ForgotPasswordFormEnhanced = ({
  email,
  error,
  isSubmitting,
  isSuccess,
  handleEmailChange,
  handleSubmit,
  handleTryAgain
}) => {
  return (
    <div
      className="max-w-xl w-full space-y-8 backdrop-blur-xl px-2 md:px-6 pt-8 pb-14 lg:p-10 lg:pb-12 rounded-3xl shadow-lg md:shadow-xl shadow-primary-600/30 transition-all duration-300 relative
      bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-white/10"
    >
      {/* Decorative elements */}
      <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-primary-600 blur-xl opacity-70"></div>
      <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-blue-600 blur-xl opacity-70"></div>

      {/* Glass card effect */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-white/5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/5 backdrop-blur-xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mb-2">
            <div className="mx-auto w-fit p-3 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl backdrop-blur-xl shadow-xl border border-primary-500">
              <TbChartPie className="h-8 md:h-10 w-8 md:w-10 text-primary-300" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Reset your password
          </h2>
          <p className="mt-2 text-[0.9rem] md:text-base text-primary-500">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center">
            <div className="flex justify-center mb-3 md:mb-6">
              <div className="p-3 bg-green-500/20 rounded-full">
                <TbCheck className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Check your email</h3>
            <p className="text-slate-300 mb-6">
              We've sent a password reset link to <span className="text-primary-300 font-medium">{email}</span>. 
              The link will expire in 10 minutes.
            </p>
            <div className="text-sm text-slate-400">
              Didn't receive the email? Check your spam folder or{' '}
              <button 
                onClick={handleTryAgain}
                className="text-primary-400 hover:text-primary-300"
              >
                try again
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Error message */}
            {error && (
              <div className="rounded-xl bg-red-500/20 backdrop-blur-sm p-4 border border-red-500/40">
                <p className="text-sm font-medium text-red-300 flex items-center">
                  <TbAlertTriangle className="mr-2 h-5 w-5 text-red-400" />
                  {error}
                </p>
              </div>
            )}
            
            {/* Email field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-white/80 ml-3"
              >
                Email address
              </label>
              <div className="relative group mt-1.5">
                <TbMailFilled className="absolute z-20 left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-primary-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="block w-full pl-14 pr-3 py-3.5 border border-white/10 
                    bg-white/5 backdrop-blur-sm rounded-xl placeholder-white/30 text-white 
                    focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 
                    transition-all duration-200 shadow-inner shadow-black/10"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-4 rounded-xl text-[0.95rem] md:text-base text-white font-medium  text-lg relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500"></span>
              <span className="absolute inset-0 opacity-0 hover:opacity-20 bg-gradient-to-r from-white/20 to-transparent transition-opacity duration-500 ease-out"></span>
              <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent transform translate-y-px"></span>
              <span className="relative flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <TbLoader2 className="animate-spin h-5 w-5 mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send reset link
                    <TbArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </span>
            </motion.button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordFormEnhanced;
