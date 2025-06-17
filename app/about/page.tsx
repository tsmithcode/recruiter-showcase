"use client";

import React from "react";
import { motion } from "framer-motion"; // Import motion for animations
// import Link from "next/link"; // Replaced with <a> tags for broader compatibility
import Image from 'next/image'; 
import SDLC from "./sdlc";
import Principles from "./principles";
import Experience from "./experience";

export default function AboutPage() {
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
    <section className="py-12 px-4 max-w-7xl mx-auto container">
      {/* Header */}
      <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            About <span className="text-[#05c8fb]">Thomas Smith</span>
          </h2>
          <p className="text-gray-400 text-base mb-6">
            Learn more about my background, design approach, and cross‐industry experience.
          </p>
        </motion.div>

        {/* Header Metrics */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-3 gap-6 max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition relative overflow-hidden group"
            variants={itemVariants}
            whileHover={cardHoverEffect}
          >
            <div className="absolute inset-0 bg-[#05c8fb]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
            <h3 className="text-2xl font-bold mb-2 relative z-10">100+</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed relative z-10">
              Projects Delivered
            </p>
          </motion.div>
          <motion.div
            className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition relative overflow-hidden group"
            variants={itemVariants}
            whileHover={cardHoverEffect}
          >
            <div className="absolute inset-0 bg-[#05c8fb]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
            <h3 className="text-2xl font-bold mb-2 relative z-10">12+</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed relative z-10">
              Years of Experience
            </p>
          </motion.div>
          <motion.div
            className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition relative overflow-hidden group"
            variants={itemVariants}
            whileHover={cardHoverEffect}
          >
            <div className="absolute inset-0 bg-[#05c8fb]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
            <h3 className="text-2xl font-bold mb-2 relative z-10">99%</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed relative z-10">
              Client Satisfaction
            </p>
          </motion.div>
        </motion.div>
      </header>

      {/* Hero / Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Left side: Intro copy */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
            Hi, I’m <span className="text-[#05c8fb] font-semibold">Thomas Smith</span>, a results-driven Software Architect specializing in crafting <span className="font-semibold">secure, scalable, and resilient systems</span> that deliver rapid ROI. I&apos;m passionate about designing solutions that blend functionality and elegance, enabling enterprises to move faster, reduce costs, and delight end users.
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <span className="text-red-300 font-semibold">Problem Solved:</span> Enterprises struggle with slow operations and high costs due to disconnected systems.
            </li>
            <li>
              <span className="text-green-300 font-semibold">My Solution:</span> I design and implement automated workflows and integrated cloud-native applications.
            </li>
            <li>
              <span className="text-[#05c8fb] font-semibold">Quantifiable Impact:</span> This approach consistently streamlines operations, cuts costs, and boosts ROI in weeks, not months.
            </li>
          </ul>
        </motion.div>

        {/* Right side: Placeholder for user image or illustration */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div
            className="
              bg-white/5 
              border border-white/10 
              w-64 h-64 
              rounded-xl 
              overflow-hidden 
              shadow-lg 
              hover:shadow-xl 
              transition
              flex items-center justify-center
            "
          >
            {/* <Image
  src="/avatar.png" // Replace with your actual image path later
  alt="Thomas Smith Headshot"
  width={256} // Specify the width of the image
  height={256} // Specify the height of the image
  className="object-cover w-full h-full" // Ensure image covers its container
  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { // Add explicit type for 'e'
    e.currentTarget.onerror = null; // Prevent infinite loop if fallback also fails
    e.currentTarget.src = "https://placehold.co/256x256/2D3748/A0AEC0?text=Image+Error"; // Fallback for errors
  }}
/> */}
          </div>
        </motion.div>
      </div>

      {/* Intro Paragraph */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
          As a <span className="text-[#05c8fb] font-semibold">.NET & Automation Architect</span> based in Atlanta, I specialize in bridging the gap between complex engineering needs and business objectives. I empower organizations by <span className="font-semibold">automating recurring, high-volume tasks, integrating disparate legacy systems, and building scalable cloud-native applications</span>. My approach emphasizes <span className="text-[#05c8fb] font-semibold">deep collaboration</span> with stakeholders, ensuring solutions are aligned with strategic goals and deliver measurable value, often *reducing time-to-market by 30-50%*.
        </p>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
          Over my career, I’ve partnered with cross-functional teams across manufacturing,
          SaaS, e-commerce, and data-driven enterprises. I blend <span className="text-[#05c8fb] font-semibold">SOLID architecture principles</span>,
          <span className="text-[#05c8fb] font-semibold"> agile methodologies</span>, and
          <span className="text-[#05c8fb] font-semibold"> AI-powered insights</span> to craft solutions that scale effortlessly,
          adapt to evolving requirements, and consistently improve operational efficiency. I&apos;ve successfully led initiatives that *transformed manual, days-long processes into automated, minute-long operations*.
        </p>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          I believe in a <span className="text-white font-semibold">work hard, play smart</span> rhythm—delivering with precision during focused sprints while
          preserving time for family, creative pursuits, and restoration.
        </p>
      </motion.section>

      <SDLC />
      <Principles />
      <Experience/>

      {/* Closing Statement */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
          With a blend of <span className="text-[#05c8fb] font-semibold">technical expertise</span> and
          <span className="text-[#05c8fb] font-semibold"> business acumen</span>,
          I partner with organizations to accelerate innovation, optimize workflows, and deliver transformative outcomes.
          <span className="text-[#05c8fb] font-semibold"> Let’s build the future together.</span>
        </p>
      </motion.section>
      

      {/* “Education & Skills” Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-white mb-4">Education & Core Skills</h3>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Education Card */}
          <motion.div
            className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition flex flex-col justify-between group"
            variants={itemVariants}
            whileHover={cardHoverEffect}
          >
            <div>
              <h4 className="font-semibold text-lg mb-2">Education</h4>
              <ul className="text-sm text-gray-300 space-y-2 mb-2">
                <li>
                  <span className="font-medium text-white">Computer Engineering</span><br />
                  Tarrant County College (2012 – 2014)
                </li>
                <li>
                  <span className="font-medium text-white">General Studies</span><br />
                  Montgomery College (2009 – 2010)
                </li>
                <li>
                  <span className="font-medium text-white">Diploma</span><br />
                  Watkins Mill High School (2008)
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Skills Card */}
          <motion.div
            className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition flex flex-col justify-between group"
            variants={itemVariants}
            whileHover={cardHoverEffect}
          >
            <div>
              <h4 className="font-semibold text-lg mb-2">Key Skills & Tools</h4>
              <ul className="text-sm text-gray-300 space-y-2 mb-2">
                <li>• <span className="text-[#05c8fb] font-semibold">.NET Core, React, Node.js, Python</span>: Architecting and building scalable enterprise applications</li>
                <li>• <span className="text-[#05c8fb] font-semibold">CAD Team Leadership & Mentorship</span>: Guiding teams to implement efficient design and automation strategies.</li>
                <li>• <span className="text-[#05c8fb] font-semibold">Manufacturing Processes</span> (Sheet Metal, Fabrication): Deep understanding of how software design impacts physical production.</li>
                <li>• <span className="text-[#05c8fb] font-semibold">Product Development & Design</span>: Translating user needs into functional, elegant solutions.</li>
                <li>• <span className="text-[#05c8fb] font-semibold">Autodesk Inventor, AutoCAD, SolidWorks, Vault</span>: Expert-level proficiency in leading CAD platforms.</li>
                <li>• <span className="text-[#05c8fb] font-semibold">Engineering Change Orders Management</span>: Streamlining and automating critical change management processes.</li>
                <li>• <span className="text-[#05c8fb] font-semibold">Autodesk Construction Cloud, Autodesk Build</span>: Leveraging modern construction management platforms for data integration.</li>
                <li>• <span className="text-[#05c8fb] font-semibold">Leadership & Project Management</span>: Driving projects from concept to successful delivery, fostering cross-functional collaboration.</li>
                <li>• <span className="text-[#05c8fb] font-semibold">Version Control (Git, SVN)</span> (6+ yrs): Ensuring robust code management and collaborative development.</li>
                <li>• <span className="text-[#05c8fb] font-semibold">Workflow Optimization & Process Improvement</span>: Identifying bottlenecks and designing solutions that enhance efficiency.</li>
                <li>• <span className="text-[#05c8fb] font-semibold">CAD Automation (iLogic, AutoLISP, Python)</span>: Developing custom automation solutions to accelerate design and engineering workflows.</li>
                <li>• <span className="text-[#05c8fb] font-semibold">Quality Control & Design Review Processes</span>: Implementing rigorous reviews to ensure high-quality and error-free designs.</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ExperienceOverview component was causing compilation errors. If you have its code,
          you can re-integrate it here once the component itself is defined and
          its import path is correctly configured in your Next.js project. */}
      {/* <ExperienceOverview/> */}


      {/* “Links & Contact” Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <h3 className="text-2xl font-semibold text-white mb-4">Links & Contact</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>
            • YouTube:{" "}
            <a href="https://www.youtube.com/@tsmithcad" target="_blank" rel="noopener noreferrer" className="text-[#05c8fb] hover:underline">
              /@tsmithcad
            </a>
          </li>
          <li>
            • LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/tsmithcad" target="_blank" rel="noopener noreferrer" className="text-[#05c8fb] hover:underline">
              /in/tsmithcad
            </a>
          </li>
          {/* <li>
            • Dev Portfolio:{" "}
            <a href="https://tsmith-dev-portfolio.web.app/" target="_blank" rel="noopener noreferrer" className="text-[#05c8fb] hover:underline">
              tsmith-dev-portfolio.web.app
            </a>
          </li> */}
          {/* <li>
            • Twitter:{" "}
            <a href="https://twitter.com/nbwsmarket" target="_blank" rel="noopener noreferrer" className="text-[#05c8fb] hover:underline">
              @nbwsmarket
            </a>
          </li> */}
        </ul>
      </motion.div>
    </section>
  );
}
