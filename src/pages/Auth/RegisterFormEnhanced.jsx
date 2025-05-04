import React from "react";
import {
  TbLock,
  TbMail,
  TbUser,
  TbEye,
  TbEyeOff,
  TbArrowRight,
  TbChevronRight,
  TbBrandGoogle,
  TbBrandApple,
  TbChartPie,
  TbMailFilled,
  TbLoader2,
  TbUserCircle,
  TbAlertTriangle,
} from "react-icons/tb";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { PiPasswordDuotone, PiUserDuotone } from "react-icons/pi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiUserAddLine } from "react-icons/ri";

const RegisterFormEnhanced = ({
  formData,
  errors,
  isSubmitting,
  showPassword,
  showConfirmPassword,
  isFormFocused,
  authError,
  handleChange,
  setShowPassword,
  setShowConfirmPassword,
  handleSubmit,
  navigateToLogin,
  handleGoogleSignIn,
  handleAppleSignIn,
  isGoogleLoading,
  isAppleLoading,
}) => {
  return (
    <div
      className={`max-w-2xl w-full space-y-8 backdrop-blur-xl px-2 pt-8 pb-14 lg:p-10 lg:pb-12 rounded-3xl shadow-lg md:shadow-xl shadow-primary-600/30 transition-all duration-300 relative
        bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-white/10
        `}
    >
      {/* Decorative elements */}
      <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-primary-600 blur-xl opacity-70"></div>
      <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-blue-600 blur-xl opacity-70"></div>

      {/* Glass card effect */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-white/5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 backdrop-blur-xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mb-2">
            <div className="mx-auto w-fit p-3 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl backdrop-blur-xl shadow-xl border border-primary-500">
              <TbChartPie className="h-10 w-10 text-primary-300" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-[0.9rem] md:text-base text-primary-500">
            Start your financial journey today
          </p>
        </div>

        {/* Social login buttons */}
        <div className="flex space-x-4 mb-6 lg:mb-8">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary-800/20"
          >
            {isGoogleLoading ? (
              <TbLoader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <FcGoogle className="h-5 w-5 mr-2 text-red-400" />
                <span className="text-sm font-medium">Google</span>
              </>
            )}
          </motion.button>
          <motion.button
          whileTap={{scale: 0.98}}
            onClick={handleAppleSignIn}
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary-800/20"
          >
            {isAppleLoading ? (
              <TbLoader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <TbBrandApple className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Apple</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Divider */}
        <div className="relative mt-6 mb-3 lg:mt-8 lg:mb-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 text-white/60 backdrop-blur-xl">
              Or continue with email
            </span>
          </div>
        </div>

        <div className="space-y-4 md:space-y-5">
          {/* Auth error message */}
          {authError && (
            <div className="rounded-xl bg-red-500/20 backdrop-blur-sm p-4 border border-red-500/40">
              <p className="text-sm font-medium text-red-300 flex items-center">
                <TbAlertTriangle className="mr-2 h-5 w-5 text-red-400" />
                {authError}
              </p>
            </div>
          )}
          {/* Name field */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-white/80 ml-3"
            >
              Full name
            </label>
            <div className="relative group mt-1.5">
              <PiUserDuotone className="absolute z-20 left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-primary-500" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className={`block w-full pl-14 pr-3 py-3 md:py-3.5 border ${
                  errors.name
                    ? "border-red-500/50"
                    : formData.name
                    ? "border-primary-500/30"
                    : "border-white/10"
                } 
                  bg-white/5 backdrop-blur-sm rounded-xl placeholder-white/30 text-white 
                  focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 
                  transition-all duration-200 shadow-inner shadow-black/10`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
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
                {errors.name}
              </p>
            )}
          </div>

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
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full pl-14 pr-3 py-3 md:py-3.5 border ${
                  errors.email
                    ? "border-red-500/50"
                    : formData.email
                    ? "border-primary-500/30"
                    : "border-white/10"
                } 
                  bg-white/5 backdrop-blur-sm rounded-xl placeholder-white/30 text-white 
                  focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 
                  transition-all duration-200 shadow-inner shadow-black/10`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
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
                {errors.email}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-white/80 ml-3"
            >
              Password
            </label>
            <div className="relative group">
              <PiPasswordDuotone className="absolute z-20 left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-primary-500" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
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
                className="absolute inset-y-0 right-0 pr-8 flex items-center text-white/60 hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
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
              htmlFor="confirmPassword"
              className="text-sm font-medium text-white/80 ml-3"
            >
              Confirm Password
            </label>
            <div className="relative group">
              <PiPasswordDuotone className="absolute z-20 left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-primary-500" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`block w-full pl-14 pr-10 py-3.5 border ${
                  errors.confirmPassword
                    ? "border-red-500/50"
                    : formData.confirmPassword
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
                className="absolute inset-y-0 right-0 pr-8 flex items-center text-white/60 hover:text-white transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
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
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="group relative w-full flex justify-center items-center py-3 md:py-3.5 px-4 rounded-xl text-white overflow-hidden transition-all duration-300 transform disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {/* Button background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/80 to-primary-600 transition-all duration-300 group-hover:from-primary-700 group-hover:to-primary-500"></div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>

              {/* Button content */}
              <span className="relative flex items-center text-gray-300 font-medium">
                {isSubmitting ? (
                  <>
                    <TbLoader2 className="animate-spin mr-2 h-4 w-4 " />
                    Creating account...
                  </>
                ) : (
                  <>
                    <RiUserAddLine className="mr-2 h-5 w-5 " />
                    Create account
                    <TbArrowRight className="inline h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Login link */}
          <div className="text-center pt-2">
            <p className="text-sm text-white/60">
              Already have an account?{" "}
              <button
                onClick={navigateToLogin}
                className="text-primary-500 font-medium hover:text-primary-400 transition-colors inline-flex items-center"
              >
                Sign in <TbChevronRight className="inline h-3 w-3 ml-0.5" />
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Set default props
RegisterFormEnhanced.defaultProps = {
  isGoogleLoading: false,
  isAppleLoading: false,
  handleGoogleSignIn: () => console.warn("Google sign-in handler not provided"),
  handleAppleSignIn: () => console.warn("Apple sign-in handler not provided"),
};

export default RegisterFormEnhanced;
