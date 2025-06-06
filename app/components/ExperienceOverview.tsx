// components/ExperienceOverview.tsx
"use client";

import React from "react";

export default function ExperienceOverview() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto container">
      {/* Header */}
      <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Markets & <span className="text-[#05c8fb]">Expertise</span>
          </h2>
          <p className="text-gray-400 text-base mb-6">
            Leveraging 12+ years of cross-industry experience to deliver
            high-impact solutions and streamline workflows for diverse markets.
          </p>
        </div>
      </header>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Markets Served */}
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
          <h3 className="text-white font-semibold text-lg mb-3">
            Markets Served
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>Manufacturing & Industrial Automation</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>Dental & Medical Device Development</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>SaaS & Enterprise Software Solutions</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>Retail & Consumer Goods Operations</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>E-commerce & Product Data Management</span>
            </li>
          </ul>
        </div>

        {/* Industries & Vertical Experience */}
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
          <h3 className="text-white font-semibold text-lg mb-3">
            Industries & Verticals
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>Automotive & Conveyor Systems Design</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>Plastic Injection Molding & Tooling</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>Architectural Metals & Building Components</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>Digital Transformation in AEC & Construction</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>Healthcare & Dental Instrument Prototyping</span>
            </li>
          </ul>
        </div>

        {/* Soft Skills & Workflows */}
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
          <h3 className="text-white font-semibold text-lg mb-3">
            Soft Skills & Workflows
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>
                Cross-Functional <span className="text-[#05c8fb] font-semibold">Team Collaboration</span>
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>
                Lean & Kaizen-Driven <span className="text-[#05c8fb] font-semibold">Process Improvement</span>
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>
                Agile & SDLC-Based <span className="text-[#05c8fb] font-semibold">Project Delivery</span>
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>
                Stakeholder-Focused <span className="text-[#05c8fb] font-semibold">Requirement Gathering</span>
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>
                Data-Driven <span className="text-[#05c8fb] font-semibold">Decision Making</span> & Reporting
              </span>
            </li>
          </ul>
        </div>

        {/* Team Roles & Collaboration */}
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
          <h3 className="text-white font-semibold text-lg mb-3">
            Team Roles & Collaboration
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>
                Coordinated with <span className="text-[#05c8fb] font-semibold">Engineers</span>, <span className="text-[#05c8fb] font-semibold">Designers</span>, & <span className="text-[#05c8fb] font-semibold">Business Analysts</span>
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>
                Mentored <span className="text-[#05c8fb] font-semibold">Junior CAD Technicians</span> & <span className="text-[#05c8fb] font-semibold">Developers</span>
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>
                Liaised between <span className="text-[#05c8fb] font-semibold">IT</span> & <span className="text-[#05c8fb] font-semibold">Engineering</span> for seamless deployments
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>
                Collaborated with <span className="text-[#05c8fb] font-semibold">Project Managers</span>, <span className="text-[#05c8fb] font-semibold">Sales</span>, & <span className="text-[#05c8fb] font-semibold">Operations</span>
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#05c8fb] rounded-full mt-1 mr-2" />
              <span>
                Engaged with <span className="text-[#05c8fb] font-semibold">Quality Assurance</span> & <span className="text-[#05c8fb] font-semibold">Compliance Teams</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
