// app/blog/habasit-drawing-automation/page.tsx
"use client"; // This component will run on the client-side for animations and interactive elements

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'; // For expand/collapse icons
import Image from 'next/image';

export default function HabasitDrawingAutomation() {
  // Define blog post metadata
  const post = {
    title: "Rapid Development: Delivering a Custom Drawing Automation Suite for Habasit America in 3 Weeks",
    date: "2025-06-29",
    description: "Discover how a custom .NET WinForms desktop application for Habasit America streamlined CAD drawing management, achieving an 80% increase in drawing delivery for one CAD drafter in just three weeks, and paving the way for broader SQL database access.",
    image: "/images/blog/pdm-system-rev2-1.jpeg", // Main feature image
    author: "Thomas Smith",
    tags: ["WinForms", ".NET", "Desktop App", "CAD Automation", "PDM", "Agile Development", "Rapid Prototyping", "Habasit", "Engineering Software", "Process Improvement", "SQL Database"],
  };

  // Framer Motion variants for staggered content entry
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Helper component for consistently styled list items
  const StyledListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.li
      variants={textItemVariants}
      className="relative p-3 border border-white/10 rounded-xl bg-white/5 text-white/90 backdrop-blur-md shadow-inner group overflow-hidden"
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-[#05c8fb] animate-pulse rounded-r" />
      <span className="text-sm sm:text-base leading-relaxed text-[#cbefff] group-hover:text-white transition">
        {children}
      </span>
    </motion.li>
  );

  // Reusable ExpandableSection component (not directly used in this blog but kept for consistency if needed later)
  const ExpandableSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
      <motion.div variants={textItemVariants} className="mb-4 last:mb-0">
        <button
          onClick={toggleOpen}
          className="flex items-center justify-between w-full p-4 bg-white/10 border border-white/15 rounded-lg text-white font-semibold text-left shadow-md hover:bg-white/20 transition-colors"
        >
          <span>{title}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
          </motion.span>
        </button>
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="p-4 border border-white/10 border-t-0 rounded-b-lg bg-white/5 space-y-4">
            {children}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto container min-h-screen">
      <motion.article
        initial="hidden"
        animate="show"
        variants={contentVariants}
        className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 lg:p-10 shadow-lg text-gray-300"
      >
        {/* Blog Post Header */}
        <motion.header variants={textItemVariants} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            {post.title}
          </h1>
          <p className="text-sm text-gray-400 mb-2">
            By <span className="text-[#05c8fb]">{post.author}</span> on{" "}
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-base text-gray-300 leading-relaxed mb-4">
            {post.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#05c8fb]/20 text-[#05c8fb] text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Featured Image */}
        {post.image && (
          <motion.div variants={textItemVariants} className="w-full mb-8 rounded-lg overflow-hidden border border-white/10 shadow-md">
            <Image
              src={post.image}
              alt={post.title}
              width={800} // Example intrinsic width, adjust based on actual image ratio
              height={450} // Example intrinsic height, adjust based on actual image ratio
              layout="responsive"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/800x450/2D3748/A0AEC0?text=Featured+Image`;
              }}
            />
            <p className="text-xs text-gray-500 text-center p-2">_Featured Image: The PDM System from Scratch Rev 2.1 Interface_</p>
          </motion.div>
        )}

        {/* Introduction */}
        <motion.section variants={contentVariants} className="mb-8">
          <motion.h2 variants={textItemVariants} className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">
            The Challenge: Streamlining Drawing Management at Habasit America
          </motion.h2>
          <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-4">
            In the world of engineered products, efficient management and generation of technical drawings are critical. For Habasit America, a global leader in conveyor belts, the process of creating and modifying "special build plastic modular belt drawings" for their U.S. operations presented a significant opportunity for improvement. The existing workflow, involving manual search across a globally shared network drive and tedious modifications, was time-consuming and ripe for automation.
          </motion.p>
          <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-4">
            A key underlying challenge was the initial lack of direct access to the ERP department's crucial SQL database tables. This data was essential for a truly streamlined automation solution. Thus, the development of this application served a dual purpose: to solve the immediate drawing generation bottleneck and to act as a proof-of-concept (POC) to secure this vital database access.
          </motion.p>
        </motion.section>

        {/* The Solution */}
        <motion.section variants={contentVariants} className="mb-8">
          <motion.h2 variants={textItemVariants} className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">
            The Solution: A Rapidly Developed .NET WinForms Desktop Application
          </motion.h2>
          <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-4">
            To address these challenges, I embarked on developing a custom .NET WinForms desktop application. This powerful tool was designed to empower Habasit's CAD drafters by automating the laborious process of finding existing drawings on a network drive and rapidly generating new or modified drawings with minimal user input. The primary goal was to facilitate quick "duplication with user providing minor modifications for quicker delivery."
          </motion.p>

          <motion.div variants={textItemVariants} className="mb-6 rounded-lg overflow-hidden border border-white/10 shadow-md">
            <Image
              src="/images/blog/cad-automation-project.jpg"
              alt="CAD Automation Project UI"
              width={800} // Adjust based on actual image ratio
              height={450} // Adjust based on actual image ratio
              layout="responsive"
              objectFit="cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/800x450/2D3748/A0AEC0?text=CAD+Automation+UI`;
              }}
            />
            <p className="text-xs text-gray-500 text-center p-2">
              _Figure 1: The Intuitive UI of the Custom CAD Automation Tool, enabling rapid parameter modification and drawing generation. (Sensitive information redacted)._
            </p>
          </motion.div>
          <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-4">
            As seen in Figure 1, the application provides a streamlined interface where users can quickly input or adjust drawing parameters, which were previously manually handled. This direct input system significantly reduces the time required for generating a new drawing, turning a multi-step process into a few clicks.
          </motion.p>
        </motion.section>


        {/* Development Journey */}
        <motion.section variants={contentVariants} className="mb-8">
          <motion.h2 variants={textItemVariants} className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">
            The Development Journey: Agile Sprints & Iterative Delivery in Under 3 Weeks
          </motion.h2>
          <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-4">
            One of the most remarkable aspects of this project was its rapid development cycle. The entire functional application, from concept to deployment, was completed in **less than three weeks** through an agile and iterative approach. This allowed for quick feedback loops and continuous improvement across successive sprints.
          </motion.p>

          <motion.div variants={textItemVariants} className="mb-6 rounded-lg overflow-hidden border border-white/10 shadow-md">
            <Image
              src="/images/blog/pdm-system-rev1.jpeg"
              alt="PDM System Rev 1"
              width={800} // Adjust based on actual image ratio
              height={450} // Adjust based on actual image ratio
              layout="responsive"
              objectFit="cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/800x450/2D3748/A0AEC0?text=PDM+System+Rev+1`;
              }}
            />
            <p className="text-xs text-gray-500 text-center p-2">
              _Figure 2: Sprint 1 - The Initial Proof of Concept: Basic Search and Attribute Display._
            </p>
          </motion.div>
          <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-4">
            **Sprint 1 (Figure 2):** The first iteration focused on a fundamental proof of concept. This involved establishing basic search capabilities and displaying key drawing attributes. It was a raw, functional prototype designed to validate the core idea and gather initial feedback.
          </motion.p>

          <motion.div variants={textItemVariants} className="mb-6 rounded-lg overflow-hidden border border-white/10 shadow-md">
            <Image
              src="/images/blog/pdm-system-rev2-1.jpeg"
              alt="PDM System Rev 2.1"
              width={800} // Adjust based on actual image ratio
              height={450} // Adjust based on actual image ratio
              layout="responsive"
              objectFit="cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/800x450/2D3748/A0AEC0?text=PDM+System+Rev+2.1`;
              }}
            />
            <p className="text-xs text-gray-500 text-center p-2">
              _Figure 3: Sprint 2 - Functional Prototype with Enhanced Filtering and Detailed Drawing Attributes._
            </p>
          </motion.div>
          <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-4">
            **Sprint 2 (Figure 3):** Building on the initial success, this sprint rapidly evolved the application into a more robust functional prototype. Key enhancements included advanced filtering options for more precise searches, a comprehensive display of detailed drawing attributes, and a more refined user interface, making the tool significantly more powerful and user-friendly.
          </motion.p>

          <motion.div variants={textItemVariants} className="mb-6 rounded-lg overflow-hidden border border-white/10 shadow-md">
            <Image
              src="/images/blog/special-build-drawing-search.jpg"
              alt="Special Build Drawing Search Rev 3"
              width={800} // Adjust based on actual image ratio
              height={450} // Adjust based on actual image ratio
              layout="responsive"
              objectFit="cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/800x450/2D3748/A0AEC0?text=Special+Build+Drawing+Search`;
              }}
            />
            <p className="text-xs text-gray-500 text-center p-2">
              _Figure 4: Sprint 3 - The Polished User Experience: Featuring an Intuitive Search Interface and Color-Coded Console for Enhanced Feedback._
            </p>
          </motion.div>
          <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-4">
            **Sprint 3 (Figure 4):** The final sprint brought polish and enhanced usability. This iteration introduced a highly intuitive search interface, coupled with a color-coded console that provided immediate and clear feedback to the user. This iterative development process allowed for quick adaptation to user needs and a swift path to a highly effective solution.
          </motion.p>
        </motion.section>

        {/* Under the Hood */}
        <motion.section variants={contentVariants} className="mb-8">
          <motion.h2 variants={textItemVariants} className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">
            Under the Hood: Technology Stack & Architecture
          </motion.h2>
          <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-4">
            The application was developed using **.NET Framework (4.x)** and the **WinForms** UI framework. WinForms was chosen for its ability to facilitate **rapid desktop application development** and its seamless capability to **access local servers and machines with existing permissions**, a crucial factor for onsite-only IP protection.
          </motion.p>
          <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-4">
            The codebase is structured to be modular and efficient, leveraging various components to manage complex drawing data and business logic. Key modules include:
          </motion.p>
          <ul className="space-y-3 mb-6">
            <StyledListItem>
              <span className="font-semibold">DrawingNumberGenerator:</span> Responsible for creating and managing unique drawing identifiers.
            </StyledListItem>
            <StyledListItem>
              <span className="font-semibold">PartListService:</span> Handles the retrieval and management of parts data essential for drawing specifications, likely utilizing `Newtonsoft.Json` for robust data parsing.
            </StyledListItem>
            <StyledListItem>
              <span className="font-semibold">BELTlayoutGenerator:</span> Assists in the automated generation or modification of belt layouts.
            </StyledListItem>
            <StyledListItem>
              <span className="font-semibold">Rule.cs:</span> Implements the business rules and validation logic to ensure data integrity and process compliance.
            </StyledListItem>
          </ul>
          <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-4">
            A significant aspect of the application's functionality involved direct interaction with SQL database tables using `System.Data.SqlClient`, enabling dynamic data retrieval and updates crucial for the drawing automation process.
          </motion.p>
          <motion.div variants={textItemVariants} className="mb-6 rounded-lg overflow-hidden border border-white/10 shadow-md">
            <Image
              src="/images/blog/habasit-suite.jpeg"
              alt="Habasit Drawing Suite Codebase"
              width={800} // Adjust based on actual image ratio
              height={450} // Adjust based on actual image ratio
              layout="responsive"
              objectFit="cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/800x450/2D3748/A0AEC0?text=Codebase+Structure`;
              }}
            />
            <p className="text-xs text-gray-500 text-center p-2">
              _Figure 5: A Look at the Core: The .NET Solution Explorer and Codebase of the Drawing Automation Suite._
            </p>
          </motion.div>
        </motion.section>

        {/* Tangible Impact & Strategic Win */}
        <motion.section variants={contentVariants} className="mb-8">
          <motion.h2 variants={textItemVariants} className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">
            Tangible Impact: 80% Efficiency Gain & Strategic SQL Access
          </motion.h2>
          <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-4">
            The impact of this rapid development was immediate and profound. The application enabled **one CAD drafter to deliver an astounding 80% of all United States special build plastic modular belt drawings**. This represents a massive increase in efficiency, significantly reduced manual errors, and drastically faster delivery times for critical engineering outputs.
          </motion.p>
          <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-4">
            Beyond the direct productivity gains, this project achieved a crucial strategic objective: it served as a successful proof-of-concept that convinced the ERP department to **relinquish direct access to critical SQL database tables**. This was a pivotal moment, as it opened up new possibilities for automation. Following this success, the database access was granted to the **entire engineering team of eight**, all of whom I personally trained in two comprehensive meetings, spearheading the integration of this new capability.
          </motion.p>
          <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-4">
            One of the initial technical challenges successfully overcome was **parsing the existing complex drawing number convention** to develop a robust and rapid search functionality, whether by drawing code or attribute name. This foundational capability was key to the application's overall effectiveness.
          </motion.p>

          <motion.div variants={textItemVariants} className="mb-6 rounded-lg overflow-hidden border border-white/10 shadow-md">
            <Image
              src="/images/blog/habasit-outputs-drawings.jpg"
              alt="Habasit Drawing Outputs and Task Management"
              width={800} // Adjust based on actual image ratio
              height={450} // Adjust based on actual image ratio
              layout="responsive"
              objectFit="cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/800x450/2D3748/A0AEC0?text=Outputs+and+Tasks`;
              }}
            />
            <p className="text-xs text-gray-500 text-center p-2">
              _Figure 6: Real-World Results: Accelerated Drawing Output and Efficient Task Management within the System._
            </p>
          </motion.div>
        </motion.section>

        {/* Conclusion */}
        <motion.section variants={contentVariants} className="mb-8">
          <motion.h2 variants={textItemVariants} className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">
            Conclusion: The Power of Targeted Automation
          </motion.h2>
          <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-4">
            This project at Habasit America stands as a testament to the power of focused, rapid software development. By leveraging familiar technologies like .NET WinForms and employing an agile approach, a highly impactful custom solution was delivered in an incredibly short timeframe. It not only addressed a critical operational bottleneck but also secured strategic data access, leading to significant productivity gains and empowering the entire engineering team. This exemplifies how targeted automation can yield immediate, measurable results and transform core business processes.
          </motion.p>
        </motion.section>

      </motion.article>
    </section>
  );
}