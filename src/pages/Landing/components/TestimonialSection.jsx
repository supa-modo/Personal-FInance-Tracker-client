import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    content:
      "This platform completely transformed how I manage my finances. The visualizations make it easy to understand my spending patterns and the goal tracking keeps me motivated.",
    author: "Sarah Johnson",
    role: "Small Business Owner",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    content:
      "I've tried several finance apps, but this one stands out. The ability to track multiple account types in one place is a game-changer. Worth every penny!",
    author: "Michael Chen",
    role: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    content:
      "The analytics and insights have helped me identify areas where I can save money. I've already increased my monthly savings by 15% in just two months.",
    author: "Emily Rodriguez",
    role: "Marketing Director",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-600/10 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-600/10 rounded-full filter blur-3xl opacity-30"></div>
      
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
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-white sm:text-4xl"
          >
            <span className="block">Loved by thousands of</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">
              financial enthusiasts
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-slate-300"
          >
            Don't just take our word for it. See what our users have to say about how our platform
            has helped them take control of their financial future.
          </motion.p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 relative overflow-hidden group hover:border-primary-500/30 transition-all duration-300"
            >
              {/* Quote icon */}
              <svg
                className="absolute top-6 right-6 h-16 w-16 text-primary-500/10 group-hover:text-primary-500/20 transition-colors duration-300"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              
              {/* Content */}
              <p className="text-slate-300 mb-6 relative z-10">"{testimonial.content}"</p>
              
              {/* Author */}
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={testimonial.avatar}
                  alt={testimonial.author}
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{testimonial.author}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl opacity-0 group-hover:opacity-10 blur transition duration-500"></div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50"
        >
          <dl className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Active Users", value: "10,000+" },
              { label: "Customer Satisfaction", value: "4.9/5" },
              { label: "Accounts Managed", value: "$250M+" },
              { label: "Countries", value: "50+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="text-base text-slate-400">{stat.label}</dt>
                <dd className="mt-2 text-3xl font-extrabold text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
        
        {/* Brands */}
        <div className="mt-16">
          <p className="text-center text-base text-slate-400 mb-8">
            Trusted by individuals and businesses worldwide
          </p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex justify-center grayscale opacity-40 hover:opacity-70 transition-opacity duration-300">
                <img
                  className="h-8"
                  src={`https://via.placeholder.com/150x50/ffffff/000000?text=Brand+${i}`}
                  alt={`Brand ${i}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
