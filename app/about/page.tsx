// app/about/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import ExperienceOverview from "@/components/ExperienceOverview";


export default function AboutPage() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto container">
      {/* Header */}
      <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            About <span className="text-[#05c8fb]">Thomas Smith</span>
          </h2>
          <p className="text-gray-400 text-base mb-6">
            Learn more about my background, design approach, and cross‐industry experience.
          </p>
        </div>

         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-2">500+</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Projects Delivered
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-2">12+</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Years of Experience
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-2">99%</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Client Satisfaction
            </p>
          </div>
        </div>
      </header>

      {/* Hero / Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Left side: Intro copy */}
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
            Hi, I’m <span className="text-[#05c8fb] font-semibold">Thomas Smith</span>. 
            I’m passionate about designing solutions that blend functionality and elegance, 
            enabling enterprises to move faster, reduce costs, and delight end users.
          </p>
          <ul className="list-disc list-inside text-[#05c8fb] space-y-2">
            <li>500+ Projects Completed: Helping clients around the world actualize ideas into reality</li>
            <li>12+ Years of Experience: Craftsman of CAD, .NET, AI, and data integration workflows</li>
            <li>99% Client Satisfaction: Building trust through transparent communication and quality</li>
          </ul>
        </div>

        {/* Right side: Placeholder for user image or illustration */}
        <div className="flex justify-center">
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
            "
          >
            {/* Replace with actual <Image> component once you have a photo */}
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">[Your Photo Here]</span>
            </div>
          </div>
        </div>
      </div>


      {/* Intro Paragraph */}
      <section className="mb-12">
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
          As a <span className="text-[#05c8fb] font-semibold">.NET & Automation Engineer</span> based in Atlanta, I help organizations
          bridge the gap between engineering and business by automating recurring tasks,
          integrating disparate systems, and building scalable cloud-native applications.
          My approach emphasizes <span className="text-[#05c8fb] font-semibold">deep collaboration</span>
          with stakeholders, ensuring solutions are aligned with strategic goals and deliver measurable value.
        </p>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
          Over my career, I’ve partnered with cross-functional teams across manufacturing,
          SaaS, e-commerce, and data-driven enterprises. I blend <span className="text-[#05c8fb] font-semibold">SOLID architecture</span>,
          <span className="text-[#05c8fb] font-semibold"> agile methodologies</span>, and
          <span className="text-[#05c8fb] font-semibold"> AI-powered insights</span> to craft solutions that scale effortlessly
          and adapt to evolving requirements.
        </p>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          I believe in a <span className="text-white font-semibold">work hard, play smart</span> rhythm—delivering with precision during focused sprints while
          preserving time for family, creative pursuits, and restoration.
        </p>
      </section>

      {/* Design & Development Process */}
      <section className="mb-12">
        <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            My <span className="text-[#05c8fb]">SDLC Process</span>
          </h2>
          <span className="text-base text-gray-400">4 Steps to Delivery</span>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1: Discovery & Strategy */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2">1. Discovery & Strategy</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              Understand business objectives, user needs, and technical constraints.
              Conduct stakeholder interviews, market research, and requirement gathering to define a clear roadmap.
            </p>
            <div className="h-40 bg-white/10 rounded overflow-hidden">
              <img
                src="/images/discovery.png"
                alt="Discovery Illustration"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Step 2: Ideation & Prototyping */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2">2. Ideation & Prototyping</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              Sketch wireframes and build interactive prototypes to validate ideas early.
              Iterate on user flows, layouts, and interactions before investing in full development.
            </p>
            <div className="h-40 bg-white/10 rounded overflow-hidden">
              <img
                src="/images/ideation.png"
                alt="Ideation Illustration"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Step 3: Design & Development */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2">3. Design & Development</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              Craft high-fidelity UI designs and implement robust, scalable code.
              Leverage cloud-native platforms (Azure, AWS) and modern frameworks (.NET, Blazor, React) to build production-ready applications.
            </p>
            <div className="h-40 bg-white/10 rounded overflow-hidden">
              <img
                src="/images/design.png"
                alt="Design & Development Illustration"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Step 4: Testing & Iteration */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2">4. Testing & Iteration</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              Conduct thorough QA, usability testing, and performance tuning.
              Gather feedback, fix issues, and optimize for a seamless user experience and business value.
            </p>
            <div className="h-40 bg-white/10 rounded overflow-hidden">
              <img
                src="/images/testing.png"
                alt="Testing Illustration"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Closing Statement */}
      <section>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
          With a blend of <span className="text-[#05c8fb] font-semibold">technical expertise</span> and
          <span className="text-[#05c8fb] font-semibold"> business acumen</span>,
          I partner with organizations to accelerate innovation, optimize workflows, and deliver transformative outcomes.
          <span className="text-[#05c8fb] font-semibold"> Let’s build the future together.</span>
        </p>
      </section>

      

      {/* “Experience” Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-white mb-4">Experience & Roles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Interroll Group */}
          <div
            className="
              bg-white/5 
              border border-white/10 
              p-6 
              rounded-xl 
              text-white 
              shadow-lg 
              hover:shadow-xl 
              transition
            "
          >
            <h4 className="font-semibold text-lg mb-2">
              IT Administrator & CAD Drafter
            </h4>
            <p className="text-xs text-gray-400 mb-4">
              Interroll Group — Hiram, GA (Nov 2015 – Sep 2016)
            </p>
            <ul className="list-disc list-inside text-[#05c8fb] space-y-2 mb-2">
              <li>Built 2D/3D conveyor system models; supported design & IT functions</li>
              <li>Led Kaizen‐based lean process training; cut waste and improved cycle times</li>
              <li>Streamlined CAD drafting workflows; reduced design‐to‐production errors by 20%</li>
            </ul>
            <p className="text-xs text-gray-400">Key Collaborators: Engineers, Production Leads, Quality Auditors</p>
          </div>

          {/* Card: Carson Tool & Mold */}
          <div
            className="
              bg-white/5 
              border border-white/10 
              p-6 
              rounded-xl 
              text-white 
              shadow-lg 
              hover:shadow-xl 
              transition
            "
          >
            <h4 className="font-semibold text-lg mb-2">CAD Drafter</h4>
            <p className="text-xs text-gray-400 mb-4">
              Carson Tool & Mold — Kennesaw, GA (Nov 2014 – Nov 2015)
            </p>
            <ul className="list-disc list-inside text-[#05c8fb] space-y-2 mb-2">
              <li>Created precision 2D/3D mold designs using Pro/E Wildfire (PTC Creo)</li>
              <li>Collaborated during ISO 9001 audit; ensured compliance with quality standards</li>
              <li>Optimized design processes to reduce lead times by 15% for core product lines</li>
            </ul>
            <p className="text-xs text-gray-400">Key Collaborators: Mold Engineers, Quality Inspectors, Project Managers</p>
          </div>

          {/* Card: KinMetal */}
          <div
            className="
              bg-white/5 
              border border-white/10 
              p-6 
              rounded-xl 
              text-white 
              shadow-lg 
              hover:shadow-xl 
              transition
            "
          >
            <h4 className="font-semibold text-lg mb-2">CAD Drafter/Designer</h4>
            <p className="text-xs text-gray-400 mb-4">
              KinMetal — Alpharetta, GA (Sep 2016 – Dec 2016)
            </p>
            <ul className="list-disc list-inside text-[#05c8fb] space-y-2 mb-2">
              <li>Improved technical ↔ business communication; reduced project errors by 20%</li>
              <li>Managed custom equipment configurations and design‐to‐production workflows</li>
              <li>Advised on technology selection; streamlined team collaboration across departments</li>
            </ul>
            <p className="text-xs text-gray-400">Key Collaborators: Mechanical Engineers, Production Leads, Procurement</p>
          </div>

          {/* Card: Fascinate */}
          <div
            className="
              bg-white/5 
              border border-white/10 
              p-6 
              rounded-xl 
              text-white 
              shadow-lg 
              hover:shadow-xl 
              transition
            "
          >
            <h4 className="font-semibold text-lg mb-2">Jr. CAD Designer</h4>
            <p className="text-xs text-gray-400 mb-4">
              Fascinate — Duluth, GA (Jan 2016 – Dec 2016)
            </p>
            <ul className="list-disc list-inside text-[#05c8fb] space-y-2 mb-2">
              <li>Delivered innovative AutoCAD/Inventor/Mastercam designs for major clients (Carnival, Samsung)</li>
              <li>Streamlined design reviews; reduced lead times by 25% through team efficiency initiatives</li>
            </ul>
            <p className="text-xs text-gray-400">Key Collaborators: Project Engineers, Design Leads, Manufacturing Teams</p>
          </div>

          {/* Card: Essential Dental Care */}
          <div
            className="
              bg-white/5 
              border border-white/10 
              p-6 
              rounded-xl 
              text-white 
              shadow-lg 
              hover:shadow-xl 
              transition
            "
          >
            <h4 className="font-semibold text-lg mb-2">CAD Technician & Technologist</h4>
            <p className="text-xs text-gray-400 mb-4">
              Essential Dental Care & Sapian R&D — Grand Prairie, TX (Nov 2014)
            </p>
            <ul className="list-disc list-inside text-[#05c8fb] space-y-2 mb-2">
              <li>Developed CAD models for surgical dental instruments (Sapian Root Remover Kit)</li>
              <li>Collaborated with R&D team to optimize part geometry for manufacturability</li>
            </ul>
            <p className="text-xs text-gray-400">Key Collaborators: R&D Engineers, Regulatory Teams, Suppliers</p>
          </div>

          {/* Card: Retail & Early Roles */}
          <div
            className="
              bg-white/5 
              border border-white/10 
              p-6 
              rounded-xl 
              text-white 
              shadow-lg 
              hover:shadow-xl 
              transition
            "
          >
            <h4 className="font-semibold text-lg mb-2">Retail & Early Roles</h4>
            <p className="text-xs text-gray-400 mb-4">
              Various (2010 – 2014)
            </p>
            <ul className="list-disc list-inside text-[#05c8fb] space-y-2 mb-2">
              <li>Retail Associate @ Ross: Managed high‐volume transactions, streamlined inventory, and hit sales targets</li>
              <li>Cashier & Membership @ Costco: Handled membership sign‐ups, replenished stock, and improved transaction flow</li>
              <li>Home Depot: Guided customers on doors/windows/millwork, coordinated custom orders</li>
            </ul>
            <p className="text-xs text-gray-400">Key Collaborators: Store Managers, Team Leads, Suppliers</p>
          </div>
        </div>
      </div>

      {/* “Education & Skills” Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-white mb-4">Education & Core Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education Card */}
          <div
            className="
              bg-white/5 
              border border-white/10 
              p-6 
              rounded-xl 
              text-white 
              shadow-lg 
              hover:shadow-xl 
              transition
            "
          >
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

          {/* Skills Card */}
          <div
            className="
              bg-white/5 
              border border-white/10 
              p-6 
              rounded-xl 
              text-white 
              shadow-lg 
              hover:shadow-xl 
              transition
            "
          >
            <h4 className="font-semibold text-lg mb-2">Key Skills & Tools</h4>
            <ul className="text-sm text-gray-300 space-y-2 mb-2">
              <li>• <span className="text-[#05c8fb] font-semibold">.NET Core, React, Node.js, Python</span> (6 yrs)</li>
              <li>• <span className="text-[#05c8fb] font-semibold">CAD Team Leadership & Mentorship</span></li>
              <li>• <span className="text-[#05c8fb] font-semibold">Manufacturing Processes</span> (Sheet Metal, Fabrication – 10 yrs)</li>
              <li>• <span className="text-[#05c8fb] font-semibold">Product Development & Design</span> (10 yrs)</li>
              <li>• <span className="text-[#05c8fb] font-semibold">Autodesk Inventor, AutoCAD, SolidWorks, Vault</span> (10 yrs)</li>
              <li>• <span className="text-[#05c8fb] font-semibold">Engineering Change Orders Management</span> (10 yrs)</li>
              <li>• <span className="text-[#05c8fb] font-semibold">Autodesk Construction Cloud, Autodesk Build</span></li>
              <li>• <span className="text-[#05c8fb] font-semibold">Leadership & Project Management</span></li>
              <li>• <span className="text-[#05c8fb] font-semibold">Version Control (Git, SVN)</span> (6 yrs)</li>
              <li>• <span className="text-[#05c8fb] font-semibold">Workflow Optimization & Process Improvement</span></li>
              <li>• <span className="text-[#05c8fb] font-semibold">CAD Automation (iLogic, AutoLISP, Python)</span> (7 yrs)</li>
              <li>• <span className="text-[#05c8fb] font-semibold">Quality Control & Design Review Processes</span></li>
            </ul>
          </div>
        </div>
      </div>

      <ExperienceOverview/>


      {/* “Links & Contact” Section */}
      <div>
        <h3 className="text-2xl font-semibold text-white mb-4">Links & Contact</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>
            • YouTube:{" "}
            <Link href="https://www.youtube.com/@tsmithcad" target="_blank" className="text-[#05c8fb] hover:underline">
              /@tsmithcad
            </Link>
          </li>
          <li>
            • LinkedIn:{" "}
            <Link href="https://www.linkedin.com/in/tsmithcad" target="_blank" className="text-[#05c8fb] hover:underline">
              /in/tsmithcad
            </Link>
          </li>
          <li>
            • Dev Portfolio:{" "}
            <Link href="https://tsmith-dev-portfolio.web.app/" target="_blank" className="text-[#05c8fb] hover:underline">
              tsmith-dev-portfolio.web.app
            </Link>
          </li>
          <li>
            • Twitter:{" "}
            <Link href="https://twitter.com/nbwsmarket" target="_blank" className="text-[#05c8fb] hover:underline">
              @nbwsmarket
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
