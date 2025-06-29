"use client"; // This component needs to run on the client-side

import React from 'react';
import { motion, Variant } from 'framer-motion';

// Component to embed Web Page Embed in an iframe
export default function WebPageEmbed() {
  const githubRepoUrl = "https://github.com/tsmithcode/recruiter-showcase/commits/main/";

  // Framer Motion variants for section entry
  const sectionVariants: Variant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto container">
      <motion.div
        className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 shadow-lg text-gray-300 flex flex-col items-center"
        initial="hidden"
        animate="show"
        variants={sectionVariants}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 border-b border-white/10 pb-3 w-full text-center">
          Web Page Embed{" "}
          <span className="text-[#05c8fb]">Embedded</span>
        </h2>

        {/* Iframe for embedding Web Page Embed */}
        <div className="w-full h-[500px] sm:h-[600px] lg:h-[700px] rounded-lg overflow-hidden border border-white/20 shadow-inner">
          <iframe
            src={githubRepoUrl}
            title="Web Page Embed"
            className="w-full h-full border-none"
            allowFullScreen // Allows the iframe content to go full screen if it supports it
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" // Security best practice for iframes
          >
            {/* Fallback content for browsers that don't support iframes */}
            <p className="p-4 text-center text-gray-400">
              Your browser does not support iframes. Please visit the GitHub repository directly:
              <br />
              <a href={githubRepoUrl} target="_blank" rel="noopener noreferrer" className="text-[#05c8fb] hover:underline">
                {githubRepoUrl}
              </a>
            </p>
          </iframe>
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center">
          This log is managed directly on GitHub and updates automatically.
        </p>
        <a
          href={githubRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#05c8fb] hover:underline mt-2 text-sm"
        >
          View on GitHub
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      </motion.div>
    </section>
  );
}