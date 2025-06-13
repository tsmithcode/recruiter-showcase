"use client";

import React from "react";
import { motion } from "framer-motion"; // Import motion for animations
// import Link from "next/link"; // Replaced with <a> tags for broader compatibility

export default function SDLC() {
  // Animation variants for staggered appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger children by 0.1 seconds
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const cardHoverEffect = {
    scale: 1.03,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)", // Darker, more pronounced shadow
    transition: { type: "spring", stiffness: 300, damping: 20 },
  };

  return (
      <section className="mb-12">
        <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            My <span className="text-[#05c8fb]">SDLC Process</span>
          </h2>
          <span className="text-base text-gray-400">4 Steps to Delivery</span>
        </header>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Step 1: Discovery & Strategy */}
          <motion.div
            className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition relative overflow-hidden group"
            variants={itemVariants}
            whileHover={cardHoverEffect}
          >
            <div className="absolute inset-0 bg-[#05c8fb]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
            <h3 className="text-lg font-semibold mb-2 relative z-10">1. Discovery & Strategy</h3>
            <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 relative z-10 space-y-1">
              <p><span className="text-red-300 font-semibold">Problem:</span> Unclear objectives lead to misaligned solutions.</p>
              <p><span className="text-green-300 font-semibold">Solution:</span> I conduct deep stakeholder interviews, market research, and rigorous requirement gathering.</p>
              <p><span className="text-[#05c8fb] font-semibold">Impact:</span> This defines a clear roadmap, ensuring solutions directly address core business challenges and user needs.</p>
            </div>
            <div className="h-40 bg-white/10 rounded overflow-hidden relative z-10">
              <img
                src="/images/discovery.png"
                alt="Discovery Illustration"
                className="object-cover w-full h-full"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/400x160/2D3748/A0AEC0?text=Discovery" }}
              />
            </div>
          </motion.div>

          {/* Step 2: Ideation & Prototyping */}
          <motion.div
            className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition relative overflow-hidden group"
            variants={itemVariants}
            whileHover={cardHoverEffect}
          >
            <div className="absolute inset-0 bg-[#05c8fb]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
            <h3 className="text-lg font-semibold mb-2 relative z-10">2. Ideation & Prototyping</h3>
            <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 relative z-10 space-y-1">
              <p><span className="text-red-300 font-semibold">Problem:</span> Costly rework from late-stage design changes.</p>
              <p><span className="text-green-300 font-semibold">Solution:</span> I rapidly sketch wireframes and build interactive prototypes to validate ideas early.</p>
              <p><span className="text-[#05c8fb] font-semibold">Impact:</span> This iterative process helps iterate on user flows and interactions, significantly reducing development risk and ensuring alignment before coding begins.</p>
            </div>
            <div className="h-40 bg-white/10 rounded overflow-hidden relative z-10">
              <img
                src="/images/ideation.png"
                alt="Ideation Illustration"
                className="object-cover w-full h-full"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/400x160/2D3748/A0AEC0?text=Ideation" }}
              />
            </div>
          </motion.div>

          {/* Step 3: Design & Development */}
          <motion.div
            className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition relative overflow-hidden group"
            variants={itemVariants}
            whileHover={cardHoverEffect}
          >
            <div className="absolute inset-0 bg-[#05c8fb]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
            <h3 className="text-lg font-semibold mb-2 relative z-10">3. Design & Development</h3>
            <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 relative z-10 space-y-1">
              <p><span className="text-red-300 font-semibold">Problem:</span> Systems that can&apos;t handle growth or security threats.</p>
              <p><span className="text-green-300 font-semibold">Solution:</span> I craft high-fidelity UI designs and implement robust, scalable, and secure code.</p>
              <p><span className="text-[#05c8fb] font-semibold">Impact:</span> Leveraging cloud-native platforms (Azure, AWS) and modern frameworks (.NET, Blazor, React), I build production-ready applications engineered for long-term performance and maintainability.</p>
            </div>
            <div className="h-40 bg-white/10 rounded overflow-hidden relative z-10">
              <img
                src="/images/design.png"
                alt="Design & Development Illustration"
                className="object-cover w-full h-full"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/400x160/2D3748/A0AEC0?text=Design" }}
              />
            </div>
          </motion.div>

          {/* Step 4: Testing & Iteration */}
          <motion.div
            className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition relative overflow-hidden group"
            variants={itemVariants}
            whileHover={cardHoverEffect}
          >
            <div className="absolute inset-0 bg-[#05c8fb]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
            <h3 className="text-lg font-semibold mb-2 relative z-10">4. Testing & Iteration</h3>
            <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 relative z-10 space-y-1">
              <p><span className="text-red-300 font-semibold">Problem:</span> Deploying solutions with hidden flaws or poor user adoption.</p>
              <p><span className="text-green-300 font-semibold">Solution:</span> I conduct thorough QA, usability testing, and performance tuning, followed by continuous feedback loops.</p>
              <p><span className="text-[#05c8fb] font-semibold">Impact:</span> This rigorous approach ensures a seamless user experience, identifies and fixes issues proactively, and optimizes for maximum business value.</p>
            </div>
            <div className="h-40 bg-white/10 rounded overflow-hidden relative z-10">
              <img
                src="/images/testing.png"
                alt="Testing Illustration"
                className="object-cover w-full h-full"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/400x160/2D3748/A0AEC0?text=Testing" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>
      );
}
