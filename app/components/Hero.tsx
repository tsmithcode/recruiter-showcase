"use client";

import { motion, Variants } from "framer-motion";
import Logo from "./Logo";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

// --- Animation Variants (no changes here) ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 10,
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 10,
    },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const ctaContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const ctaItemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Hero() {
  return (
    <motion.section
      className="flex flex-col sm:flex-row items-center
             gap-6 sm:gap-10 lg:gap-16 pb-4
             max-w-5xl mx-auto px-4
             pt-6 sm:pt-8 lg:pt-12"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      // ✅ FIX: Prevents animation flash on completion
      style={{ willChange: "transform,opacity" }}
    >
      {/* Left column: Logo */}
      <motion.div
        className="flex-shrink-0
    flex justify-center items-center
    sm:w-1/2
    sm:min-w-[180px]
    md:min-w-[240px]
    gap-4 py-0"
        variants={columnVariants}
        // ✅ FIX: Prevents animation flash on completion
        style={{ willChange: "transform,opacity" }}
      >
        <Logo />
      </motion.div>

      {/* Right column: Heading, tagline, CTAs */}
      <motion.div
        className="flex-1 bg-white/5 border border-white/10
             p-6 mt-6 lg:mt-0 rounded-xl text-white shadow-lg
             hover:shadow-xl transition
             flex flex-col items-center lg:items-start gap-4 lg:text-left"
        variants={columnVariants}
        // ✅ FIX: Prevents animation flash on completion
        style={{ willChange: "transform,opacity" }}
      >
        <SocialLinks />
        <motion.p
          className="text-[#05c8fb] text-base sm:text-lg leading-relaxed"
          variants={textVariants}
          // ✅ FIX: Prevents animation flash on completion
          style={{ willChange: "transform,opacity" }}
        >
          I’m <span className="font-semibold text-[#c8d6d9]">Thomas Smith</span>, a results-driven software architect who designs user-focused systems that streamline operations and generate ROI in weeks — not months.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex flex-row flex-wrap justify-center lg:justify-start gap-3"
          variants={ctaContainerVariants}
        >
          {/* Schedule Call Button */}
          <motion.div 
            variants={ctaItemVariants} 
            // ✅ FIX: Prevents animation flash on completion
            style={{ willChange: "transform,opacity" }}
          >
            <Link
              href="https://calendly.com/tsmithcode"
              target="_blank"
              className="bg-[#05c8fb] text-[#0b253f] font-semibold rounded-full px-5 py-2.5 hover:opacity-90 transition"
            >
              Schedule Call
            </Link>
          </motion.div>

          {/* Resume Button */}
          <motion.div 
            variants={ctaItemVariants} 
            // ✅ FIX: Prevents animation flash on completion
            style={{ willChange: "transform,opacity" }}
          >
            <Link
              href="https://github.com/tsmithcode/jobs/blob/main/THOMAS%20SMITH%202026%20Resume.pdf"
              target="_blank"
              className="border border-[#05c8fb] rounded-full px-5 py-2.5 hover:bg-[#05c8fb]/10 transition"
            >
              Resume
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
