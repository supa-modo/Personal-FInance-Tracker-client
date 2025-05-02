import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TbChartBar,
  TbShieldLock,
  TbDeviceAnalytics,
  TbReportMoney,
  TbBuildingBank,
  TbPigMoney,
  TbWallet,
  TbBell,
  TbArrowRight,
  TbArrowNarrowRight,
  TbChartDots,
  TbChevronRight,
} from "react-icons/tb";

const features = [
  {
    name: "Comprehensive Dashboard",
    description:
      "Get a complete overview of your finances at a glance with our intuitive dashboard. Track your net worth, income, expenses, and investments all in one place.",
    icon: TbChartBar,
    color: "from-primary-500 to-primary-600",
    gradient: "from-primary-500/20 via-primary-600/10 to-transparent",
    lightColor: "text-primary-400",
  },
  {
    name: "Multiple Account Types",
    description:
      "Manage all your financial accounts in one place - bank accounts, investment portfolios, mobile money, cash, and more.",
    icon: TbBuildingBank,
    color: "from-blue-500 to-blue-600",
    gradient: "from-blue-500/20 via-blue-600/10 to-transparent",
    lightColor: "text-blue-400",
  },
  {
    name: "Secure & Private",
    description:
      "Your financial data is encrypted and secured with industry-leading security practices. We never share your data with third parties.",
    icon: TbShieldLock,
    color: "from-green-500 to-green-600",
    gradient: "from-green-500/20 via-green-600/10 to-transparent",
    lightColor: "text-green-400",
  },
  {
    name: "Advanced Analytics",
    description:
      "Gain insights into your spending patterns, investment performance, and financial health with detailed analytics and visualizations.",
    icon: TbDeviceAnalytics,
    color: "from-purple-500 to-purple-600",
    gradient: "from-purple-500/20 via-purple-600/10 to-transparent",
    lightColor: "text-purple-400",
  },
  {
    name: "Financial Goals",
    description:
      "Set and track your financial goals, whether it's saving for a home, retirement, or a vacation. We'll help you stay on track.",
    icon: TbPigMoney,
    color: "from-amber-500 to-amber-600",
    gradient: "from-amber-500/20 via-amber-600/10 to-transparent",
    lightColor: "text-amber-400",
  },
  {
    name: "Smart Notifications",
    description:
      "Receive timely alerts about unusual spending, upcoming bills, investment opportunities, and progress toward your financial goals.",
    icon: TbBell,
    color: "from-rose-500 to-rose-600",
    gradient: "from-rose-500/20 via-rose-600/10 to-transparent",
    lightColor: "text-rose-400",
  },
];

const FeatureSection = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <section id="features" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
      
      {/* Animated background orbs */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-500/10 via-primary-600/5 to-transparent filter blur-[80px] opacity-60 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-500/10 via-purple-600/5 to-transparent filter blur-[100px] opacity-40 animate-blob"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header with animated underline */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-1 bg-gradient-to-r from-primary-500 to-primary-400 mx-auto mb-6"
          ></motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
          >
            <span className="block">Powerful Features for</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-400 to-blue-400">
              Financial Excellence
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Discover how our innovative tools transform complex financial management into a seamless, insightful experience.
          </motion.p>
        </div>

        {/* Hexagonal feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              {/* Hexagon shape with gradient */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-24 h-24 bg-slate-800 rounded-2xl rotate-45 border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-500 z-0"></div>
              
              {/* Feature content */}
              <div className="relative z-10 pt-12 px-6 pb-6">
                {/* Icon */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <feature.icon className={`h-7 w-7 ${feature.lightColor} relative z-10`} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-primary-300 transition-colors duration-300">
                  {feature.name}
                </h3>
                
                <p className="text-slate-300 text-center mb-5 group-hover:text-slate-200 transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Learn more link */}
                <div className="flex justify-center">
                  <a href="#" className={`inline-flex items-center text-sm font-medium ${feature.lightColor} opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0`}>
                    Learn more
                    <TbChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
                
                {/* Animated highlight when active */}
                {activeFeature === index && (
                  <motion.div 
                    layoutId="featureHighlight"
                    className={`absolute -inset-px rounded-xl border-2 border-${feature.lightColor.split('-')[1]}-500/50`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive feature showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-blue-500/5 to-purple-500/5"></div>
          
          <div className="lg:grid lg:grid-cols-5 lg:gap-0">
            {/* Left content */}
            <div className="col-span-2 p-8 sm:p-10 lg:p-12 relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-900/50 text-primary-300 ring-1 ring-primary-700/30 mb-6">
                <TbChartDots className="mr-1.5 h-4 w-4" />
                Premium Analytics
              </div>
              
              <h3 className="text-3xl font-extrabold text-white mb-6 leading-tight">
                Visualize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">Financial Journey</span>
              </h3>
              
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Our powerful analytics engine transforms complex financial data into clear, actionable insights that help you make smarter decisions.
              </p>
              
              {/* Feature list with animated reveal */}
              <ul className="space-y-5 mb-8">
                {[
                  "Interactive data visualizations",
                  "Personalized financial insights",
                  "Trend analysis and forecasting",
                  "Goal progress tracking",
                  "Custom reporting tools",
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 p-1 bg-primary-900/30 rounded-full">
                      <TbArrowNarrowRight className="h-5 w-5 text-primary-400" />
                    </div>
                    <span className="ml-3 text-slate-200">{item}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <a href="#" className="inline-flex items-center px-5 py-3 rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transition-all duration-300 shadow-lg hover:shadow-primary-500/25 font-medium">
                  Explore Analytics
                  <TbArrowRight className="ml-2 h-5 w-5" />
                </a>
              </motion.div>
            </div>
            
            {/* Right visualization */}
            <div className="col-span-3 relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary-500/10 via-blue-500/5 to-transparent opacity-60"></div>
              
              {/* Main image with floating UI elements */}
              <div className="relative h-full flex items-center justify-center p-6 lg:p-8">
                <div className="relative w-full max-w-2xl mx-auto">
                  {/* Main dashboard image */}
                  <img
                    className="w-full h-auto rounded-xl shadow-2xl border border-slate-700/50 relative z-10"
                    src="https://via.placeholder.com/800x500/1e293b/4F46E5?text=Advanced+Analytics"
                    alt="Analytics Dashboard"
                  />
                  
                  {/* Floating UI elements */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute -top-10 -left-10 bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700/50 p-3 shadow-xl z-20"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary-900/50 flex items-center justify-center">
                        <TbChartBar className="h-5 w-5 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Monthly Growth</p>
                        <p className="text-sm font-bold text-white">+24.3%</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="absolute -bottom-8 right-10 bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700/50 p-3 shadow-xl z-20"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-900/50 flex items-center justify-center">
                        <TbReportMoney className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Savings Target</p>
                        <p className="text-sm font-bold text-white">92% Achieved</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
