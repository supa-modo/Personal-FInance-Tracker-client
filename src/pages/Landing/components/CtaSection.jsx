import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";
import { TbArrowRight, TbCalendarStats, TbShieldCheck, TbCrown } from "react-icons/tb";
import { HiOutlineSparkles } from "react-icons/hi";

const CtaSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[url('/img/grid-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-600/5 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/5 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium CTA card with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto overflow-hidden"
        >
          <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-slate-700/50 shadow-2xl transform hover:scale-[1.01] transition-all duration-500 group">
            {/* Premium badge */}
            <div className="absolute -top-5 -right-5 z-10">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-md bg-primary-500/30"></div>
                <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border border-primary-400/20 flex items-center">
                  <TbCrown className="mr-1 h-3.5 w-3.5" />
                  PREMIUM
                </div>
              </div>
            </div>
            
            {/* Animated glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-500 animate-pulse-slow"></div>
            
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-1.5 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent rounded-full blur-sm"></div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="text-center md:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex items-center justify-center md:justify-start mb-4"
                  >
                    <HiOutlineSparkles className="h-5 w-5 text-primary-400 mr-2" />
                    <span className="text-primary-300 text-sm font-medium tracking-wide uppercase">Premium Experience</span>
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-extrabold text-white mb-4"
                  >
                    Transform Your Financial Future
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl text-slate-300 mb-6 max-w-xl"
                  >
                    Join thousands of users who've unlocked their financial potential with our premium analytics platform for just <span className="text-primary-300 font-semibold">$2/month</span>.
                  </motion.p>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex-shrink-0 flex flex-col gap-4"
                >
                  <Link
                    to="/register"
                    className="group relative overflow-hidden px-8 py-4 rounded-xl text-white font-medium text-lg shadow-xl"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 group-hover:scale-105 transition-transform duration-500"></span>
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-white/20 to-transparent transition-opacity duration-500 ease-out"></span>
                    <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent transform translate-y-px"></span>
                    <span className="relative flex items-center justify-center">
                      Get Premium Access
                      <TbArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Link>
                  
                  <Link
                    to="/login"
                    className="group relative overflow-hidden px-8 py-4 rounded-xl text-white font-medium text-lg"
                  >
                    <span className="absolute inset-0 bg-slate-800/80 border border-slate-700/50 group-hover:bg-slate-700/80 transition-colors duration-300"></span>
                    <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent transform translate-y-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center justify-center">
                      Sign In
                    </span>
                  </Link>
                </motion.div>
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-6 text-sm text-slate-400 text-center md:text-left"
              >
                By signing up, you agree to our{" "}
                <a href="#" className="text-primary-400 hover:text-primary-300 underline underline-offset-2">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary-400 hover:text-primary-300 underline underline-offset-2">
                  Privacy Policy
                </a>
              </motion.p>
            </div>
          </div>
        </motion.div>
        
        {/* Enhanced feature highlights */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: "14-Day Premium Trial",
              description: "Experience all premium features free for 14 days with no commitment",
              icon: <TbCalendarStats className="h-6 w-6" />,
              color: "from-primary-500 to-primary-600",
            },
            {
              title: "No Credit Card Required",
              description: "Start your premium journey without entering payment information",
              icon: <TbShieldCheck className="h-6 w-6" />,
              color: "from-blue-500 to-blue-600",
            },
            {
              title: "Cancel Anytime",
              description: "Flexible subscription with no long-term contracts or hidden fees",
              icon: <TbCrown className="h-6 w-6" />,
              color: "from-purple-500 to-purple-600",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + (0.1 * index) }}
              className="relative group"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 h-full flex flex-col hover:border-slate-600/50 transition-colors duration-300">
                <div className="mb-5">
                  <div className={`inline-flex items-center justify-center p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300 flex-grow">{feature.description}</p>
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                  <Link to="/register" className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center">
                    Get started
                    <TbArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
