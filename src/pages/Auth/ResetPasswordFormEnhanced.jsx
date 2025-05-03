import React from "react";
import {
  TbChartPie,
  TbShieldLock,
  TbLoader2,
  TbAlertTriangle,
  TbArrowRight,
  TbCheck
} from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ResetPasswordFormEnhanced = ({
  formData,
  errors,
  isSubmitting,
  showPassword,
  isSuccess,
  tokenValid,
  passwordStrength,
  handleChange,
  setShowPassword,
  handleSubmit,
  getStrengthColor
}) => {
  return (
    <div
      className="max-w-xl w-full space-y-8 backdrop-blur-xl px-2 pt-6 md:pt-8 pb-14 lg:p-10 lg:pb-20 rounded-3xl shadow-lg md:shadow-xl shadow-primary-600/30 transition-all duration-300 relative
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
            Create a new secure password for your account
          </p>
        </div>

        {!tokenValid ? (
          <div className="text-center">
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="p-3 bg-red-500/20 rounded-full">
                <TbAlertTriangle className="h-6 md:h-8 w-6 md:w-8 text-red-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Invalid or Expired Link</h3>
            <p className="text-slate-300 mb-6">
              This password reset link is invalid or has expired. Please request a new password reset link.
            </p>
            <Link 
              to="/forgot-password"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-600 hover:to-primary-500 text-white rounded-xl transition-all duration-300 shadow-lg shadow-primary-900/30 hover:shadow-primary-900/50 font-medium"
            >
              Request new link <TbArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        ) : isSuccess ? (
          <div className="text-center">
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="p-3 bg-green-500/20 rounded-full">
                <TbCheck className="h-6 md:h-8 w-6 md:w-8 text-green-400" />
              </div>
            </div>
            <h3 className="text-base md:text-lg font-medium text-white mb-2">Password Reset Successful</h3>
            <p className="text-slate-300 mb-6">
              Your password has been successfully reset. You will be redirected to the login page in a few seconds.
            </p>
            <Link 
              to="/login"
              className="inline-flex items-center justify-center px-5 py-2 md:py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-600 hover:to-primary-500 text-white rounded-xl transition-all duration-300 shadow-lg shadow-primary-900/30 hover:shadow-primary-900/50 font-medium"
            >
              Go to login <TbArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* General error message */}
            {errors.general && (
              <div className="rounded-xl bg-red-500/20 backdrop-blur-sm p-4 border border-red-500/40">
                <p className="text-sm font-medium text-red-300 flex items-center">
                  <TbAlertTriangle className="mr-2 h-5 w-5 text-red-400" />
                  {errors.general}
                </p>
              </div>
            )}
            
            {/* Password field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white/80 ml-3"
              >
                New Password
              </label>
              <div className="relative group">
                <TbShieldLock className="absolute z-20 left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-primary-500" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-14 pr-10 py-3.5 border ${
                    errors.password
                      ? "border-red-500/50"
                      : formData.password
                      ? "border-primary-500/30"
                      : "border-white/10"
                  } 
                  bg-white/5 backdrop-blur-sm rounded-xl placeholder-white/30 text-white 
                  focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 
                  transition-all duration-200 shadow-inner shadow-black/10`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-white/60 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-slate-400">Password strength:</div>
                    <div className={`text-xs font-medium ${
                      passwordStrength.strength < 2 ? 'text-red-400' : 
                      passwordStrength.strength < 3 ? 'text-orange-400' : 
                      passwordStrength.strength < 4 ? 'text-yellow-400' : 
                      'text-green-400'
                    }`}>
                      {passwordStrength.label}
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStrengthColor(passwordStrength.strength)} transition-all duration-300`}
                      style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-2 text-sm text-red-400 ml-1 flex items-center">
                  <svg
                    className="h-3 w-3 mr-1.5 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>
            
            {/* Confirm Password field */}
            <div className="space-y-2">
              <label
                htmlFor="passwordConfirm"
                className="text-sm font-medium text-white/80 ml-3"
              >
                Confirm Password
              </label>
              <div className="relative group">
                <TbShieldLock className="absolute z-20 left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-primary-500" />
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type={showPassword ? "text" : "password"}
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  className={`block w-full pl-14 pr-10 py-3.5 border ${
                    errors.passwordConfirm
                      ? "border-red-500/50"
                      : formData.passwordConfirm
                      ? "border-primary-500/30"
                      : "border-white/10"
                  } 
                  bg-white/5 backdrop-blur-sm rounded-xl placeholder-white/30 text-white 
                  focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 
                  transition-all duration-200 shadow-inner shadow-black/10`}
                  placeholder="••••••••"
                />
              </div>
              {errors.passwordConfirm && (
                <p className="mt-2 text-sm text-red-400 ml-1 flex items-center">
                  <svg
                    className="h-3 w-3 mr-1.5 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {errors.passwordConfirm}
                </p>
              )}
            </div>
            
            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-4 rounded-xl text-[0.95rem] md:text-base text-white font-medium text-lg relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500"></span>
              <span className="absolute inset-0 opacity-0 hover:opacity-20 bg-gradient-to-r from-white/20 to-transparent transition-opacity duration-500 ease-out"></span>
              <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent transform translate-y-px"></span>
              <span className="relative flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <TbLoader2 className="animate-spin h-5 w-5 mr-2" />
                    Resetting...
                  </>
                ) : (
                  <>
                    Reset Password
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

export default ResetPasswordFormEnhanced;
