import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TbChevronDown, TbMessageQuestion, TbHeadset, TbSearch } from "react-icons/tb";
import { HiOutlineSparkles } from "react-icons/hi";

const faqs = [
  {
    question: "What makes this personal finance platform different?",
    answer:
      "Our platform stands out with its intuitive interface, comprehensive financial tracking capabilities, and powerful analytics. We focus on providing actionable insights rather than just numbers, helping you make informed financial decisions. Plus, our premium features are available at just $2/month, making advanced financial management accessible to everyone.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Absolutely. Security is our top priority. We use bank-level encryption to protect your data, and we never share your information with third parties. Your financial data is stored using industry-leading security practices, and we regularly conduct security audits to ensure your information remains protected.",
  },
  {
    question: "Can I track multiple types of accounts?",
    answer:
      "Yes! Our platform supports a wide range of financial accounts including bank accounts, credit cards, investment portfolios, mobile money (like MPESA), cash, and more. You can track all your financial sources in one place for a complete view of your finances.",
  },
  {
    question: "What's included in the free plan vs. the premium plan?",
    answer:
      "The free plan includes basic financial tracking for up to 5 financial sources, a standard dashboard, and monthly reports. The premium plan ($2/month) unlocks unlimited financial sources, advanced analytics, goal tracking, premium reports, priority support, and more powerful visualization tools to help you gain deeper insights into your finances.",
  },
  {
    question: "Can I cancel my premium subscription anytime?",
    answer:
      "Yes, you can cancel your premium subscription at any time. We offer a 30-day money-back guarantee, so if you're not completely satisfied with the premium features, you can request a full refund within the first 30 days.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "We're currently developing a mobile app that will be available soon! In the meantime, our web platform is fully responsive and works great on mobile devices, so you can access your financial dashboard on the go from any smartphone or tablet.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is easy! Simply click the 'Get Started Free' button, create an account, and you can begin adding your financial sources right away. Our intuitive onboarding process will guide you through setting up your dashboard. You can upgrade to premium at any time.",
  },
  {
    question: "Do you offer support if I need help?",
    answer:
      "Yes, we provide support to all users. Free users have access to our help center and community forums, while premium users receive priority support with faster response times. Our team is dedicated to helping you make the most of our platform.",
  },
];

// Function to highlight search terms in text
const highlightSearchTerm = (text, searchTerm) => {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className="bg-primary-500/20 text-primary-200 px-0.5 rounded">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  // Filter FAQs based on search term
  const filteredFaqs = searchTerm.trim() === '' 
    ? faqs 
    : faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <section id="faq" ref={sectionRef} className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
      <div className="absolute inset-0 bg-[url('/img/grid-pattern.svg')] bg-repeat opacity-5"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 -right-64 w-[500px] h-[500px] bg-gradient-to-br from-primary-500/5 via-primary-600/2 to-transparent rounded-full filter blur-[80px] opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/5 via-purple-600/2 to-transparent rounded-full filter blur-[60px] opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-primary-500/20 to-primary-600/20 mb-4"
          >
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-full p-2">
              <TbMessageQuestion className="h-6 w-6 text-primary-400" />
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white mb-4"
          >
            <span className="block mb-1">Frequently Asked</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">
              Questions
            </span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 w-20 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto my-6 rounded-full"
            style={{ originX: 0.5 }}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Find answers to common questions about our premium financial platform. Can't find what you're looking for? Our support team is ready to help.
          </motion.p>
          
          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 max-w-md mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TbSearch className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <span className="text-xs">Clear</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Enhanced FAQ accordion with premium styling */}
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-slate-800/50 mb-4">
                <TbSearch className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
              <p className="text-slate-400">
                Try adjusting your search terms or browse all questions below
              </p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 bg-primary-600/20 text-primary-400 rounded-lg hover:bg-primary-600/30 transition-colors duration-300"
              >
                Clear search
              </button>
            </motion.div>
          ) : (
            <dl className="space-y-4">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const delay = Math.min(index * 0.05, 0.5);
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay }}
                    className={`bg-gradient-to-br ${isOpen ? 'from-slate-800/40 to-slate-800/60' : 'from-slate-800/30 to-slate-900/30'} backdrop-blur-sm rounded-xl overflow-hidden border ${isOpen ? 'border-primary-500/40' : 'border-slate-700/40'} transition-all duration-300 hover:border-slate-600/50 group`}
                  >
                    <dt>
                      <button
                        onClick={() => toggleFaq(index)}
                        className="flex justify-between w-full px-6 py-5 text-left focus:outline-none"
                        aria-expanded={isOpen}
                      >
                        <span className="text-lg font-medium text-white group-hover:text-primary-200 transition-colors duration-300">
                          {searchTerm ? (
                            highlightSearchTerm(faq.question, searchTerm)
                          ) : (
                            faq.question
                          )}
                        </span>
                        <span className="ml-6 flex-shrink-0">
                          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${isOpen ? 'bg-primary-500/20' : 'bg-slate-700/30'} group-hover:bg-primary-500/20 transition-colors duration-300`}>
                            <TbChevronDown
                              className={`h-5 w-5 ${isOpen ? 'text-primary-300' : 'text-slate-400'} group-hover:text-primary-300 transition-all duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                            />
                          </div>
                        </span>
                      </button>
                    </dt>
                    <dd
                      className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="px-6 pb-6 text-base text-slate-300 border-t border-slate-700/30 pt-4">
                        {searchTerm ? (
                          highlightSearchTerm(faq.answer, searchTerm)
                        ) : (
                          faq.answer
                        )}
                      </div>
                    </dd>
                  </motion.div>
                );
              })}
            </dl>
          )}
        </div>
        
        {/* Enhanced contact section with premium styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-8 md:p-10">
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/10 rounded-full filter blur-3xl opacity-70"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full filter blur-3xl opacity-70"></div>
            
            <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/20 p-0.5">
                  <div className="w-full h-full rounded-full bg-slate-900/80 flex items-center justify-center">
                    <TbHeadset className="h-8 w-8 text-primary-400" />
                  </div>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center md:justify-start">
                  <span>Still have questions?</span>
                  <HiOutlineSparkles className="ml-2 h-5 w-5 text-primary-400" />
                </h3>
                <p className="text-slate-300 mb-6 max-w-lg">
                  Our premium support team is available to assist you with any questions about our platform or subscription plans.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <a
                    href="mailto:premium@financeflow.com"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40 transition-all duration-300"
                  >
                    Contact Premium Support
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-medium bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all duration-300"
                  >
                    View Help Center
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
