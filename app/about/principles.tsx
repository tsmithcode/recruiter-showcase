"use client";

import React from "react";
import { motion } from "framer-motion"; // Import motion for animations
// import Link from "next/link"; // Replaced with <a> tags for broader compatibility

export default function Principles() {
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
            My <span className="text-[#05c8fb]">Architect's Toolkit</span>
          </h2>
          <span className="text-base text-gray-400">Core Principles for Impactful Solutions</span>
        </header>

        {/* Agile & Project Management (Azure DevOps) */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">Agile & Project Management (Azure DevOps Model)</h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Epic Card */}
            <motion.div
              className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-blue-700/20 p-6 rounded-xl text-white shadow-lg backdrop-blur-sm hover:shadow-2xl transition duration-300 flex flex-col justify-between group"
              variants={itemVariants}
              whileHover={cardHoverEffect}
            >
              <div>
                <span className="text-4xl mb-3 block text-[#05c8fb] group-hover:scale-110 transition-transform duration-300">🎯</span>
                <h4 className="font-semibold text-lg mb-2">Epic: Vision & Goals</h4>
                <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 space-y-1">
                  <p><span className="text-red-300 font-semibold">Problem:</span> Lack of strategic direction leads to disconnected efforts.</p>
                  <p><span className="text-green-300 font-semibold">Solution:</span> Define large bodies of work representing overarching business goals.</p>
                  <p><span className="text-[#05c8fb] font-semibold">Impact:</span> Provides long-term vision, aligning all efforts towards major outcomes and measurable ROI.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-auto">Big Picture • Portfolio Level</p>
            </motion.div>

            {/* Feature Card */}
            <motion.div
              className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-blue-700/20 p-6 rounded-xl text-white shadow-lg backdrop-blur-sm hover:shadow-2xl transition duration-300 flex flex-col justify-between group"
              variants={itemVariants}
              whileHover={cardHoverEffect}
            >
              <div>
                <span className="text-4xl mb-3 block text-[#05c8fb] group-hover:scale-110 transition-transform duration-300">🚀</span>
                <h4 className="font-semibold text-lg mb-2">Feature: Deliverable Functionality</h4>
                <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 space-y-1">
                  <p><span className="text-red-300 font-semibold">Problem:</span> Vague product increments make progress hard to track.</p>
                  <p><span className="text-green-300 font-semibold">Solution:</span> Break Epics into distinct, shippable functionalities.</p>
                  <p><span className="text-[#05c8fb] font-semibold">Impact:</span> Delivers specific, valuable pieces of the solution to end-users or stakeholders, enabling iterative feedback and faster value realization.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-auto">Customer Value • Product Level</p>
            </motion.div>

            {/* User Story Card */}
            <motion.div
              className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-blue-700/20 p-6 rounded-xl text-white shadow-lg backdrop-blur-sm hover:shadow-2xl transition duration-300 flex flex-col justify-between group"
              variants={itemVariants}
              whileHover={cardHoverEffect}
            >
              <div>
                <span className="text-4xl mb-3 block text-[#05c8fb] group-hover:scale-110 transition-transform duration-300">👤</span>
                <h4 className="font-semibold text-lg mb-2">User Story: User Needs</h4>
                <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 space-y-1">
                  <p><span className="text-red-300 font-semibold">Problem:</span> Development detached from real user needs.</p>
                  <p><span className="text-green-300 font-semibold">Solution:</span> Smallest unit of work, describing value from an end-user perspective ("As a [user role], I want to [action], so that [benefit]").</p>
                  <p><span className="text-[#05c8fb] font-semibold">Impact:</span> Ensures solutions are user-centric, directly address a specific problem, and lead to higher adoption rates.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-auto">User-Centric • Sprint Level</p>
            </motion.div>

            {/* Task Card */}
            <motion.div
              className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-blue-700/20 p-6 rounded-xl text-white shadow-lg backdrop-blur-sm hover:shadow-2xl transition duration-300 flex flex-col justify-between group"
              variants={itemVariants}
              whileHover={cardHoverEffect}
            >
              <div>
                <span className="text-4xl mb-3 block text-[#05c8fb] group-hover:scale-110 transition-transform duration-300">🛠️</span>
                <h4 className="font-semibold text-lg mb-2">Task: Technical Breakdown</h4>
                <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 space-y-1">
                  <p><span className="text-red-300 font-semibold">Problem:</span> Overly complex or ambiguous work items for developers.</p>
                  <p><span className="text-green-300 font-semibold">Solution:</span> Detailed technical breakdown of a User Story into actionable steps.</p>
                  <p><span className="text-[#05c8fb] font-semibold">Impact:</span> Provides clear assignments for developers, facilitates efficient execution, accurate estimation, and streamlined progress tracking.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-auto">Actionable • Developer Level</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Software Design & Engineering Principles */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">Software Design & Engineering Principles</h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* OOP Card */}
            <motion.div
              className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-teal-700/20 p-6 rounded-xl text-white shadow-lg backdrop-blur-sm hover:shadow-2xl transition duration-300 flex flex-col justify-between group"
              variants={itemVariants}
              whileHover={cardHoverEffect}
            >
              <div>
                <span className="text-4xl mb-3 block text-[#05c8fb] group-hover:scale-110 transition-transform duration-300">🏛️</span>
                <h4 className="font-semibold text-lg mb-2">Object-Oriented Programming (OOP)</h4>
                <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 space-y-1">
                  <p><span className="text-red-300 font-semibold">Problem:</span> Unmanageable, monolithic codebases that are difficult to extend.</p>
                  <p><span className="text-green-300 font-semibold">Solution:</span> Structuring code using objects with Encapsulation, Inheritance, Polymorphism, and Abstraction.</p>
                  <p><span className="text-[#05c8fb] font-semibold">Impact:</span> Creates modular, reusable, and maintainable systems that scale effectively, reducing long-term development costs and bugs.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-auto">Modularity • Reusability • Scalability</p>
            </motion.div>

            {/* DRY Card */}
            <motion.div
              className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-teal-700/20 p-6 rounded-xl text-white shadow-lg backdrop-blur-sm hover:shadow-2xl transition duration-300 flex flex-col justify-between group"
              variants={itemVariants}
              whileHover={cardHoverEffect}
            >
              <div>
                <span className="text-4xl mb-3 block text-[#05c8fb] group-hover:scale-110 transition-transform duration-300">💧</span>
                <h4 className="font-semibold text-lg mb-2">DRY: Don't Repeat Yourself</h4>
                <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 space-y-1">
                  <p><span className="text-red-300 font-semibold">Problem:</span> Redundant code leads to inconsistencies, increased bugs, and hard maintenance.</p>
                  <p><span className="text-green-300 font-semibold">Solution:</span> Centralizing logic and creating single sources of truth through reusable components, functions, or services.</p>
                  <p><span className="text-[#05c8fb] font-semibold">Impact:</span> Leads to cleaner, more efficient, and less error-prone code, accelerating development and simplifying debugging.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-auto">Efficiency • Maintainability • Consistency</p>
            </motion.div>

            {/* KISS Card */}
            <motion.div
              className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-teal-700/20 p-6 rounded-xl text-white shadow-lg backdrop-blur-sm hover:shadow-2xl transition duration-300 flex flex-col justify-between group"
              variants={itemVariants}
              whileHover={cardHoverEffect}
            >
              <div>
                <span className="text-4xl mb-3 block text-[#05c8fb] group-hover:scale-110 transition-transform duration-300">✨</span>
                <h4 className="font-semibold text-lg mb-2">KISS: Keep It Simple, Stupid</h4>
                <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 space-y-1">
                  <p><span className="text-red-300 font-semibold">Problem:</span> Overly complex solutions are difficult to understand, debug, and evolve.</p>
                  <p><span className="text-green-300 font-semibold">Solution:</span> Designing systems and code to be as simple and straightforward as possible, avoiding unnecessary complexity.</p>
                  <p><span className="text-[#05c8fb] font-semibold">Impact:</span> Improves clarity, significantly reduces the likelihood of bugs, and facilitates easier onboarding for new team members and long-term support.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-auto">Clarity • Debugging • Maintainability</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Strategic Problem-Solving Frameworks */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">Strategic Problem-Solving Frameworks</h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* First Principles Card */}
            <motion.div
              className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-orange-700/20 p-6 rounded-xl text-white shadow-lg backdrop-blur-sm hover:shadow-2xl transition duration-300 flex flex-col justify-between group"
              variants={itemVariants}
              whileHover={cardHoverEffect}
            >
              <div>
                <span className="text-4xl mb-3 block text-[#05c8fb] group-hover:scale-110 transition-transform duration-300">🔬</span>
                <h4 className="font-semibold text-lg mb-2">First Principles Thinking</h4>
                <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 space-y-1">
                  <p><span className="text-red-300 font-semibold">Problem:</span> Incremental thinking often leads to suboptimal solutions, stuck in old paradigms.</p>
                  <p><span className="text-green-300 font-semibold">Solution:</span> Breaking down problems to their fundamental truths, questioning assumptions, and rebuilding solutions from scratch.</p>
                  <p><span className="text-[#05c8fb] font-semibold">Impact:</span> Fosters truly innovative, foundational solutions, often disrupting existing norms and leading to highly effective, unique outcomes.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-auto">Innovation • Foundational • Disruptive</p>
            </motion.div>

            {/* Pareto Principle Card */}
            <motion.div
              className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-orange-700/20 p-6 rounded-xl text-white shadow-lg backdrop-blur-sm hover:shadow-2xl transition duration-300 flex flex-col justify-between group"
              variants={itemVariants}
              whileHover={cardHoverEffect}
            >
              <div>
                <span className="text-4xl mb-3 block text-[#05c8fb] group-hover:scale-110 transition-transform duration-300">📈</span>
                <h4 className="font-semibold text-lg mb-2">Pareto Principle (80/20 Rule)</h4>
                <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 space-y-1">
                  <p><span className="text-red-300 font-semibold">Problem:</span> Wasted effort on low-impact tasks or unfocused development.</p>
                  <p><span className="text-green-300 font-semibold">Solution:</span> Identifying the critical 20% of efforts that will yield 80% of desired results or impact.</p>
                  <p><span className="text-[#05c8fb] font-semibold">Impact:</span> Maximizes efficiency, ensures focus on high-value activities, optimizes resource allocation, and leads to superior outcomes with less effort.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-auto">Efficiency • Prioritization • Impact</p>
            </motion.div>

            {/* Occam's Razor Card */}
            <motion.div
              className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-orange-700/20 p-6 rounded-xl text-white shadow-lg backdrop-blur-sm hover:shadow-2xl transition duration-300 flex flex-col justify-between group"
              variants={itemVariants}
              whileHover={cardHoverEffect}
            >
              <div>
                <span className="text-4xl mb-3 block text-[#05c8fb] group-hover:scale-110 transition-transform duration-300">✂️</span>
                <h4 className="font-semibold text-lg mb-2">Occam's Razor (Simplicity)</h4>
                <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 space-y-1">
                  <p><span className="text-red-300 font-semibold">Problem:</span> Solutions often become unnecessarily complex, increasing risk and cost.</p>
                  <p><span className="text-green-300 font-semibold">Solution:</span> The simplest explanation is usually the best; prioritize straightforward designs and minimal assumptions.</p>
                  <p><span className="text-[#05c8fb] font-semibold">Impact:</span> Reduces development effort, improves maintainability, and decreases the likelihood of introducing new bugs, leading to more robust systems.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-auto">Simplicity • Efficiency • Clarity</p>
            </motion.div>

            {/* MECE Principle Card */}
            <motion.div
              className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-orange-700/20 p-6 rounded-xl text-white shadow-lg backdrop-blur-sm hover:shadow-2xl transition duration-300 flex flex-col justify-between group"
              variants={itemVariants}
              whileHover={cardHoverEffect}
            >
              <div>
                <span className="text-4xl mb-3 block text-[#05c8fb] group-hover:scale-110 transition-transform duration-300">🧩</span>
                <h4 className="font-semibold text-lg mb-2">MECE (Mutually Exclusive, Collectively Exhaustive)</h4>
                <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 space-y-1">
                  <p><span className="text-red-300 font-semibold">Problem:</span> Overlapping or missing categories in analysis, leading to confusion or incomplete solutions.</p>
                  <p><span className="text-green-300 font-semibold">Solution:</span> Structuring information or problems into categories that are distinct (mutually exclusive) and cover all possibilities (collectively exhaustive).</p>
                  <p><span className="text-[#05c8fb] font-semibold">Impact:</span> Provides a clear, comprehensive framework for problem-solving, ensuring no critical aspects are overlooked and efforts are precisely targeted.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-auto">Completeness • Precision • Clarity</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
          );
}
