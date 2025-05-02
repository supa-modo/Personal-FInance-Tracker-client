import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbCheck, TbX } from "react-icons/tb";

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started with basic financial tracking",
    price: "$0",
    period: "forever",
    cta: "Get Started",
    ctaLink: "/register",
    highlighted: false,
    features: [
      { name: "Up to 5 financial sources", included: true },
      { name: "Basic dashboard", included: true },
      { name: "Monthly reports", included: true },
      { name: "Mobile access", included: true },
      { name: "Advanced analytics", included: false },
      { name: "Goal tracking", included: false },
      { name: "Premium reports", included: false },
      { name: "Priority support", included: false },
    ],
  },
  {
    name: "Premium",
    description: "Full-featured financial management for serious users",
    price: "$2",
    period: "per month",
    cta: "Get Premium",
    ctaLink: "/register?plan=premium",
    highlighted: true,
    features: [
      { name: "Unlimited financial sources", included: true },
      { name: "Advanced dashboard", included: true },
      { name: "Real-time reports", included: true },
      { name: "Mobile access", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Goal tracking", included: true },
      { name: "Premium reports", included: true },
      { name: "Priority support", included: true },
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary-600/10 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary-600/10 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 text-sm font-medium text-primary-400 bg-primary-900/30 rounded-full border border-primary-700/50 mb-3"
          >
            Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-white sm:text-4xl"
          >
            <span className="block">Simple, transparent</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">
              pricing for everyone
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-slate-300"
          >
            Start for free and upgrade when you need more powerful features.
            No hidden fees, no complicated tiers - just straightforward value.
          </motion.p>
        </div>

        {/* Pricing cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`relative rounded-2xl overflow-hidden border ${
                plan.highlighted
                  ? "border-primary-500/50 bg-gradient-to-b from-primary-900/40 to-slate-800/40"
                  : "border-slate-700/50 bg-slate-800/30"
              } backdrop-blur-sm p-8 hover:shadow-xl transition-all duration-300`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0">
                  <div className="text-xs font-semibold text-white px-3 py-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              {/* Plan header */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-slate-400 ml-2">{plan.period}</span>
                </div>
              </div>
              
              {/* Features list */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.name} className="flex items-start">
                    <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                      feature.included ? "bg-primary-900/50 text-primary-400" : "bg-slate-800 text-slate-500"
                    }`}>
                      {feature.included ? <TbCheck className="h-4 w-4" /> : <TbX className="h-4 w-4" />}
                    </div>
                    <span className={`ml-3 ${feature.included ? "text-slate-300" : "text-slate-500"}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              
              {/* CTA button */}
              <div className="text-center">
                <Link
                  to={plan.ctaLink}
                  className={`inline-block w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-primary-500/25"
                      : "bg-slate-700 text-white hover:bg-slate-600"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
              
              {/* Glow effect for highlighted plan */}
              {plan.highlighted && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl opacity-0 group-hover:opacity-10 blur transition duration-500"></div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-slate-800/50 border border-slate-700/50 mb-4">
            <svg className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">30-Day Money-Back Guarantee</h3>
          <p className="text-slate-400">
            Try Premium risk-free. If you're not completely satisfied, simply cancel within 30 days for a full refund.
          </p>
        </motion.div>
        
        {/* FAQ teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-300">
            Have questions about our pricing or features?{" "}
            <a href="#faq" className="text-primary-400 hover:text-primary-300 font-medium">
              Check out our FAQ section
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
