import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  TbArrowRight,
  TbShieldLock,
  TbTargetArrow,
  TbDeviceAnalytics,
} from "react-icons/tb";
import {
  FiBarChart2,
  FiTrendingUp,
  FiPieChart,
  FiTarget,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import { RiRobot2Line } from "react-icons/ri";

const Hero = () => {
  // Refs for scroll animations
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: false, amount: 0.1 });

  // Interactive dashboard state
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);


  // For the animated counter
  const [count, setCount] = useState({ savings: 0, growth: 0, insights: 0 });

  // Rotate through features automatically unless user is hovering
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setActiveFeature((current) => (current + 1) % features.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovering]);

  // Animate counters when in view
  useEffect(() => {
    if (isInView) {
      const targetValues = { savings: 2750, growth: 27, insights: 15 };
      const duration = 2000; // ms
      const steps = 50;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setCount({
          savings: Math.floor(progress * targetValues.savings),
          growth: Math.floor(progress * targetValues.growth),
          insights: Math.floor(progress * targetValues.insights),
        });

        if (step >= steps) clearInterval(timer);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  // Features for the interactive showcase
  const features = [
    {
      id: "insights",
      icon: <FiPieChart className="h-6 w-6" />,
      title: "Smart Insights",
      description:
        "AI-powered analysis of your spending patterns and investment opportunities.",
      color: "from-violet-500 to-purple-600",
      stat: { label: "Avg. Savings", value: `$${count.savings}` },
    },
    {
      id: "tracking",
      icon: <FiBarChart2 className="h-6 w-6" />,
      title: "Financial Tracking",
      description:
        "Real-time monitoring of all your accounts, investments, and expenses in one place.",
      color: "from-primary-500 to-blue-600",
      stat: { label: "Growth Rate", value: `${count.growth}%` },
    },
    {
      id: "goals",
      icon: <FiTarget className="h-6 w-6" />,
      title: "Goal Planning",
      description:
        "Set financial goals and track your progress with personalized recommendations.",
      color: "from-emerald-500 to-green-600",
      stat: { label: "New Insights", value: count.insights },
    },
  ];

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Enhanced background with advanced animated elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 overflow-hidden">
        {/* Base grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-35"></div>

        {/* Animated digital lines */}
        <div className="absolute inset-0">
          {/* Horizontal running lines */}
          <div className="absolute h-px w-full top-1/4 left-0 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent animate-scan-line-horizontal"></div>
          <div className="absolute h-px w-full top-2/3 left-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-scan-line-horizontal animation-delay-2000"></div>

          {/* Vertical running lines */}
          <div className="absolute w-px h-full top-0 left-1/3 bg-gradient-to-b from-transparent via-primary-500/20 to-transparent animate-scan-line-vertical"></div>
          <div className="absolute w-px h-full top-0 left-2/3 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-scan-line-vertical animation-delay-3000"></div>
        </div>

      
      </div>

      {/* Main Hero content */}
      <div className="relative container mx-auto px-4 py-12 z-10">
        <div className="flex flex-col xl:flex-row items-center gap-12 xl:gap-16">
          {/* Left column - Enhanced Text content */}
          <div className="flex-1 max-w-3xl">
            {/* Premium animated badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-slate-800/80 to-slate-900/80 text-primary-300 backdrop-blur-xl border border-primary-500/30 mb-8 shadow-lg shadow-primary-900/20 overflow-hidden relative"
            >
              <span className="absolute inset-0 overflow-hidden">
                <span className="absolute -inset-[100%] animate-[spin_7s_linear_infinite] bg-gradient-to-r from-primary-500/0 via-primary-500/25 to-primary-500/0 opacity-30"></span>
              </span>
              <span className="flex items-center relative z-10">
                <span className="font-medium tracking-wide flex items-center">
                  <RiRobot2Line className="mr-1.5 h-4 w-4" />
                  AI-Powered Financial Intelligence
                </span>
              </span>
            </motion.div>

            {/* Enhanced headline with animated text reveal */}
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight"
              >
                <div className="overflow-hidden">
                  <motion.span
                    initial={{ y: 80 }}
                    animate={isInView ? { y: 0 } : { y: 80 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="block text-white"
                  >
                    Take Control of
                  </motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span
                    initial={{ y: 80 }}
                    animate={isInView ? { y: 0 } : { y: 80 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-400 to-blue-400"
                  >
                    Your Financial Future
                  </motion.span>
                </div>
              </motion.div>

              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-1 w-24 bg-gradient-to-r from-primary-500 to-primary-900 mt-4 rounded-full"
              />
            </div>

            {/* Enhanced subheadline with staggered reveal */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-slate-300 mb-10 leading-relaxed"
            >
              A premium platform that revolutionizes how you
              <span className="relative inline-block mx-2">
                <span className="absolute inset-x-0 bottom-0 h-3 bg-primary-500/20 -rotate-1"></span>
                <span className="relative text-white font-medium">
                  visualize, analyze, and optimize
                </span>
              </span>
              your finances with sophisticated AI-driven insights at just
              <span className="relative inline-block mx-2 text-white font-semibold">
                <span className="absolute inset-x-0 bottom-0 h-3 bg-green-500/20 -rotate-1"></span>
                <span className="relative">$2/month</span>
              </span>
            </motion.p>

            {/* Enhanced CTA Buttons with advanced hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                to="/register"
                className="group relative overflow-hidden px-8 py-4 rounded-xl text-white font-medium text-lg shadow-xl"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 "></span>
                <span className="relative flex items-center justify-center">
                  Get Premium Access
                  <TbArrowRight className="h-5 w-5" />
                </span>
              </Link>

              <a
                href="#features"
                className="group relative overflow-hidden px-8 py-4 rounded-xl text-white font-medium text-lg"
              >
                <span className="absolute inset-0 bg-slate-800/80 border border-slate-700/50 group-hover:bg-slate-700/80 transition-colors duration-300"></span>
                <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/60 to-transparent transform translate-y-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center">
                  Explore Features
                </span>
              </a>
            </motion.div>

            {/* Enhanced trust indicators with interactive animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-wrap gap-6"
            >
              {[
                {
                  icon: <TbShieldLock className="h-5 w-5" />,
                  text: "Enterprise-grade security",
                },
                {
                  icon: <TbTargetArrow className="h-5 w-5" />,
                  text: "Personalized insights",
                },
                {
                  icon: <TbDeviceAnalytics className="h-5 w-5" />,
                  text: "Premium analytics",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center text-sm bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 text-slate-300"
                >
                  <span className="mr-2 text-primary-400">{item.icon}</span>
                  {item.text}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right column - Advanced Interactive Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1 relative"
          >
            <div className="relative perspective-1200 mx-auto max-w-xl xl:max-w-full">
              <motion.div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900">
                  {/* Dashboard header with tabs */}
                  <div className="p-3 bg-slate-800/90 border-b border-slate-700/50 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex space-x-4">
                      {["overview", "insights", "planning"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`text-xs px-3 py-1 rounded-full transition-colors duration-300 ${
                            activeTab === tab
                              ? "bg-primary-500/20 text-primary-300"
                              : "text-slate-400 hover:text-slate-300"
                          }`}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dashboard content - Interactive feature showcase */}
                  <div className="p-6 bg-slate-900/80">
                    <div className="mb-4 flex justify-between items-center">
                      <h3 className="text-white text-lg font-medium">
                        Financial Dashboard
                      </h3>
                      <div className="text-xs text-primary-400 bg-primary-900/30 px-2 py-1 rounded-full border border-primary-700/30">
                        Premium
                      </div>
                    </div>

                    {/* Feature showcase with tabs */}
                    <div className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-5">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeFeature}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.6 }}
                          className="relative z-10"
                        >
                          {/* Feature header */}
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div
                                className={`inline-flex items-center justify-center p-2 rounded-lg bg-gradient-to-br ${features[activeFeature].color} mb-2`}
                              >
                                <span className="text-white">
                                  {features[activeFeature].icon}
                                </span>
                              </div>
                              <h4 className="text-white font-medium">
                                {features[activeFeature].title}
                              </h4>
                              <p className="text-slate-400 text-sm mt-1">
                                {features[activeFeature].description}
                              </p>
                            </div>
                            <div className="bg-slate-900/70 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50">
                              <div className="text-xs text-slate-500 uppercase">
                                {features[activeFeature].stat.label}
                              </div>
                              <div className="text-xl font-bold text-white">
                                {features[activeFeature].stat.value}
                              </div>
                            </div>
                          </div>

                          {/* Feature visualization (placeholder) */}
                          <div className="mt-4 rounded-lg overflow-hidden border border-slate-700/50 bg-slate-900/50 h-40 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="inline-block p-3 rounded-full bg-primary-900/30 mb-2">
                                  {features[activeFeature].icon}
                                </div>
                                <div className="text-xs text-slate-400">
                                  Interactive {features[activeFeature].title}{" "}
                                  Chart
                                </div>
                              </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary-500/10 to-transparent"></div>
                            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Feature selector dots */}
                      <div className="flex justify-center mt-4 space-x-2">
                        {features.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveFeature(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              activeFeature === index
                                ? "bg-primary-500 w-4"
                                : "bg-slate-600 hover:bg-slate-500"
                            }`}
                            aria-label={`View feature ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced glowing effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
              </motion.div>

             

              {/* Floating UI elements - Quick stats */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: -10 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0, y: 0 }
                    : { opacity: 0, x: -30, y: -10 }
                }
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -right-6 top-3/4 z-10 w-56 transform translate-z-30"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="bg-slate-800/90 backdrop-blur-xl rounded-xl overflow-hidden shadow-xl border border-slate-700/50">
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <FiTrendingUp className="h-4 w-4 text-green-400 mr-1" />
                        <span className="text-xs font-medium text-white">
                          Investment Growth
                        </span>
                      </div>
                      <span className="text-xs bg-green-900/30 text-green-400 px-1.5 py-0.5 rounded">
                        +18.2%
                      </span>
                    </div>
                    <div className="h-10 bg-slate-900/60 rounded overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-green-500/20 to-green-500/40 relative">
                        <div className="absolute inset-0 flex items-center justify-end pr-2">
                          <span className="text-xs text-green-300 font-medium">
                            $8,245
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced custom divider with animated elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>

      {/* Animated wave divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-16"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,0,0,0"
              fill="#0f172a"
              fillOpacity="1"
              className="animate-wave"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
