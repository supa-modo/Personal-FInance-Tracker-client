import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbArrowRight, TbArrowLeft, TbDeviceDesktop, TbDeviceMobile, TbDeviceTablet, TbEye, TbZoomIn } from "react-icons/tb";

const screenshots = [
  {
    id: 1,
    title: "Intelligent Dashboard",
    description: "Get a comprehensive view of your finances with our AI-powered dashboard that adapts to your financial habits.",
    image: "https://via.placeholder.com/1200x800/1e293b/4F46E5?text=Smart+Dashboard",
    highlight: "AI-Powered",
    color: "from-primary-400 to-primary-600",
  },
  {
    id: 2,
    title: "Financial Sources Hub",
    description: "Connect and manage all your accounts in one secure place with automatic categorization and insights.",
    image: "https://via.placeholder.com/1200x800/1e293b/4F46E5?text=Financial+Sources",
    highlight: "Auto-Categorization",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 3,
    title: "Predictive Analytics",
    description: "Visualize trends and get personalized recommendations based on your spending patterns and financial goals.",
    image: "https://via.placeholder.com/1200x800/1e293b/4F46E5?text=Smart+Analytics",
    highlight: "Trend Prediction",
    color: "from-purple-400 to-purple-600",
  },
  {
    id: 4,
    title: "Goal Achievement Engine",
    description: "Set financial goals and receive a customized roadmap with actionable steps to achieve them faster.",
    image: "https://via.placeholder.com/1200x800/1e293b/4F46E5?text=Goal+Tracking",
    highlight: "Smart Planning",
    color: "from-green-400 to-green-600",
  },
];

const devices = [
  { id: "desktop", icon: TbDeviceDesktop, label: "Desktop" },
  { id: "tablet", icon: TbDeviceTablet, label: "Tablet" },
  { id: "mobile", icon: TbDeviceMobile, label: "Mobile" },
];

const ScreenshotShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeDevice, setActiveDevice] = useState("desktop");
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef(null);
  
  const currentScreenshot = screenshots[currentIndex];

  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
      }, 5000);
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAutoplay]);

  const handleMouseEnter = () => {
    setIsAutoplay(false);
  };

  const handleMouseLeave = () => {
    setIsAutoplay(true);
  };

  const nextSlide = () => {
    setIsAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setIsAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + screenshots.length) % screenshots.length);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Innovative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950"></div>
      
      {/* Animated circuit-like pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-primary-500"
              style={{
                height: '1px',
                width: `${Math.random() * 30 + 10}%`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 70}%`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-primary-500"
              style={{
                width: '1px',
                height: `${Math.random() * 30 + 10}%`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header with animated elements */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center border border-primary-500/30"
          >
            <TbEye className="h-8 w-8 text-primary-400" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            <span className="block mb-2">See Your Finances</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-400 to-blue-400">
              Like Never Before
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto mb-12"
          >
            Our intuitive interface transforms complex financial data into visual insights that make financial management simple, engaging, and actionable.
          </motion.p>
        </div>

        {/* Interactive device showcase */}
        <div className="max-w-6xl mx-auto">
          {/* Device selector */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50">
              {devices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => setActiveDevice(device.id)}
                  className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${activeDevice === device.id ? 'bg-primary-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <device.icon className="mr-2 h-5 w-5" />
                  <span className="text-sm font-medium">{device.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Device frame and screenshot */}
          <div 
            className="relative mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`relative mx-auto overflow-hidden ${activeDevice === 'mobile' ? 'max-w-[280px] rounded-[32px]' : activeDevice === 'tablet' ? 'max-w-[500px] rounded-[24px]' : 'max-w-[900px] rounded-[16px]'}`}
            >
              {/* Device frame */}
              <div className={`relative ${isZoomed ? 'scale-105 transition-transform duration-500' : 'transition-transform duration-500'}`}>
                {/* Device bezel */}
                <div className={`${activeDevice === 'mobile' ? 'p-3' : activeDevice === 'tablet' ? 'p-4' : 'p-5'} bg-slate-800 rounded-2xl shadow-2xl border border-slate-700/50`}>
                  {/* Device header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-slate-400">
                      {activeDevice === 'mobile' ? 'FinanceFlow Mobile' : activeDevice === 'tablet' ? 'FinanceFlow Tablet' : 'FinanceFlow Dashboard'}
                    </div>
                    <div className="w-10"></div>
                  </div>
                  
                  {/* Screenshot with animated transition */}
                  <div className="relative overflow-hidden rounded-lg">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="relative">
                          <img
                            src={currentScreenshot.image}
                            alt={currentScreenshot.title}
                            className="w-full h-auto object-cover"
                          />
                          
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                          
                          {/* Feature highlight badge */}
                          <div className="absolute top-4 right-4">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${currentScreenshot.color} text-white shadow-lg`}>
                              {currentScreenshot.highlight}
                            </div>
                          </div>
                          
                          {/* Caption */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                              {currentScreenshot.title}
                            </h3>
                            <p className="text-slate-300 text-sm sm:text-base">
                              {currentScreenshot.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Zoom button */}
                    <button
                      onClick={toggleZoom}
                      className="absolute top-4 left-4 p-2 rounded-full bg-slate-800/80 backdrop-blur-sm text-white hover:bg-primary-600 transition-colors duration-300"
                      aria-label="Zoom screenshot"
                    >
                      <TbZoomIn className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${currentScreenshot.color} rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`}></div>
              </div>
              
              {/* Navigation controls */}
              <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-20">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-slate-800/90 backdrop-blur-md text-white hover:bg-primary-600 transition-colors duration-300 shadow-lg"
                  aria-label="Previous screenshot"
                >
                  <TbArrowLeft className="h-6 w-6" />
                </button>
              </div>
              <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-slate-800/90 backdrop-blur-md text-white hover:bg-primary-600 transition-colors duration-300 shadow-lg"
                  aria-label="Next screenshot"
                >
                  <TbArrowRight className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Indicators with progress animation */}
          <div className="flex justify-center mt-8 space-x-2">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoplay(false);
                }}
                className="group relative h-3 w-12 rounded-full overflow-hidden bg-slate-700/50"
                aria-label={`Go to screenshot ${index + 1}`}
              >
                <div 
                  className={`absolute inset-0 bg-gradient-to-r ${screenshots[index].color} transform origin-left transition-transform duration-300 ${index === currentIndex ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                ></div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Feature highlights */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Intuitive Design", description: "User-friendly interface that makes financial management simple and accessible.", icon: "🎨" },
            { title: "Cross-Device Sync", description: "Seamlessly access your financial data across all your devices.", icon: "🔄" },
            { title: "Real-Time Updates", description: "Get instant notifications and updates on your financial activities.", icon: "⚡" },
            { title: "Dark Mode Support", description: "Easy on the eyes with full dark mode support for all screens.", icon: "🌙" },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary-600/10 to-primary-800/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 h-full group-hover:border-primary-500/30 transition-colors duration-300">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreenshotShowcase;
