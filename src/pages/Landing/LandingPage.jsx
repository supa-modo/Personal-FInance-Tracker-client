import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TbChartBar,
  TbShieldLock,
  TbDeviceAnalytics,
  TbReportMoney,
  TbArrowRight,
  TbCheck,
} from "react-icons/tb";
import Hero from "./components/Hero";
import FeatureSection from "./components/FeatureSection";
import TestimonialSection from "./components/TestimonialSection";
import PricingSection from "./components/PricingSection";
import FaqSection from "./components/FaqSection";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";
import ScreenshotShowcase from "./components/ScreenshotShowcase";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-primary-900/20">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <FeatureSection />

      {/* Screenshot Showcase */}
      <ScreenshotShowcase />

      {/* Testimonials */}
      {/* <TestimonialSection /> */}

      {/* Pricing */}
      <PricingSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* CTA Section */}
      <CtaSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
