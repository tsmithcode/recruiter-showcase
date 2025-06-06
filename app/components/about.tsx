// pages/about.tsx
"use client";

import React from "react";

export default function AboutPage() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto container">
      {/* Hero Section */}
      <header className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Hi, I’m <span className="text-[#05c8fb]">Thomas Smith</span>
        </h2>
        <p className="text-gray-400 text-base mb-6">
          I’m passionate about <span className="text-[#05c8fb] font-semibold">delivering automated software solutions</span> that streamline workflows,
          boost productivity, and drive measurable ROI for enterprises.
        </p>
       
      </header>

      
    </section>
  );
}
