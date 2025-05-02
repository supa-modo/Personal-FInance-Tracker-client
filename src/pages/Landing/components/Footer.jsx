import React from "react";
import { Link } from "react-router-dom";
import { 
  TbBrandTwitter, 
  TbBrandLinkedin,
  TbBrandGithub,
  TbChartPie,
  TbArrowRight,
  TbHeart
} from "react-icons/tb";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
      <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-center opacity-3"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary-500/5 via-primary-600/2 to-transparent rounded-full filter blur-[80px] opacity-30"></div>
      <div className="absolute -top-60 right-0 w-[300px] h-[300px] bg-gradient-to-tr from-blue-500/5 via-purple-600/2 to-transparent rounded-full filter blur-[60px] opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
          {/* Logo and tagline */}
          <div className="mb-10 lg:mb-0 text-center lg:text-left">
            <Link to="/" className="inline-flex items-center mb-5 group">
              <div className="p-2 bg-gradient-to-br from-primary-500/30 to-primary-700/30 rounded-xl backdrop-blur-xl shadow-xl border border-primary-500/20 group-hover:border-primary-500/40 transition-all duration-300">
                <TbChartPie className="h-7 w-7 text-primary-300" />
              </div>
              <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">FinanceFlow</span>
            </Link>
            <p className="text-slate-400 max-w-md mx-auto lg:mx-0 mb-6">
              Transforming how you manage your finances with intelligent insights and powerful visualization tools.
            </p>
            
            {/* Social links */}
            <div className="flex justify-center lg:justify-start space-x-5">
              {[
                { icon: <TbBrandTwitter className="h-5 w-5" />, href: "#", label: "Twitter" },
                { icon: <TbBrandLinkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
                { icon: <TbBrandGithub className="h-5 w-5" />, href: "#", label: "GitHub" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-slate-400 hover:text-primary-400 p-2 rounded-full hover:bg-primary-900/30 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick links with visual enhancement */}
          <div className="flex flex-wrap justify-center gap-10 lg:gap-16">
            {/* Product links */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-primary-700/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="w-8 h-1 bg-primary-500 mr-3"></span>
                  Product
                </h3>
                <ul className="space-y-3">
                  {["Features", "Pricing", "FAQ"].map((item) => (
                    <li key={item}>
                      <a 
                        href={`#${item.toLowerCase()}`} 
                        className="text-slate-400 hover:text-primary-400 transition-colors duration-300 flex items-center group"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">
                          <TbArrowRight className="h-3 w-3" />
                        </span>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Company links */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-blue-700/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="w-8 h-1 bg-blue-500 mr-3"></span>
                  Company
                </h3>
                <ul className="space-y-3">
                  {["About", "Contact", "Privacy"].map((item) => (
                    <li key={item}>
                      <a 
                        href="#" 
                        className="text-slate-400 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">
                          <TbArrowRight className="h-3 w-3" />
                        </span>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* CTA button */}
          <div className="mt-10 lg:mt-0">
            <Link 
              to="/register" 
              className="group relative inline-flex items-center px-7 py-3 overflow-hidden rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
            >
              <span className="absolute right-0 top-0 bottom-0 w-8 h-full transition-all duration-300 transform translate-x-12 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="relative flex items-center">
                Get Started
                <TbArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
        
        {/* Bottom bar with copyright and minimal links */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-slate-500 mb-4 md:mb-0">
            <TbHeart className="h-4 w-4 text-primary-500 mr-2" />
            <p>
              &copy; {currentYear} FinanceFlow. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            {["Privacy", "Terms", "Cookies"].map((item, index) => (
              <a 
                key={item} 
                href="#" 
                className="text-sm text-slate-500 hover:text-primary-400 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
