'use client'; // This component will run on the client-side for animations and interactive elements

import React, { useState, useCallback, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/20/solid"; // For close icon

/* ────────────────────────────────────────────────────────────
   1 — MOTION VARIANTS (same as blog)
   ──────────────────────────────────────────────────────────── */
const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};
const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
};
const dialogVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
};

/* ────────────────────────────────────────────────────────────
   2 — MAIN COMPONENT
   ──────────────────────────────────────────────────────────── */
export default function HomePageVideoFeature() {
  const [open, setOpen] = useState(false);

  // Close on Escape
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);
  useEffect(() => {
    if (open) document.addEventListener("keydown", onKeyDown);
    else document.removeEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onKeyDown]);

  const videoId = "jXnunvPM9Ec";
  const videoStart = 180;

  return (
    <>
      {/* ───── Video Preview Card ───── */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={contentVariants}
        className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 lg:p-10 shadow-lg text-gray-300 w-full mb-12"
      >
        <motion.h2 variants={textItemVariants} className="text-3xl font-bold text-white mb-4">
          Door Frame Configurator | CAD/BOM/Quote in 1-Click{" "}
          <span className="text-[#05c8fb]">[WinForms + Inventor]</span>
        </motion.h2>
        <motion.p variants={textItemVariants} className="text-base text-gray-300 leading-relaxed mb-6">
          Watch a WinForms desktop app turn an Excel quote into a parametric 3-D model, full BOM, and
          customer-ready price in under <strong>5 minutes</strong>—built for an architectural-metals
          manufacturer.
        </motion.p>
        <motion.button
          variants={textItemVariants}
          type="button"
          aria-label="Play video"
          onClick={() => setOpen(true)}
          className="relative w-full aspect-[16/9] overflow-hidden rounded-lg group focus:outline-none"
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Door Frame Configurator thumbnail"
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="h-16 w-16 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </span>
        </motion.button>
      </motion.section>

      {/* ───── Video Modal ───── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={overlayVariants}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            onClick={() => setOpen(false)}
          >
            <motion.div
              key="dialog"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={dialogVariants}
              className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close video"
                className="absolute top-3 right-3 text-white/80 hover:text-white"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=${videoStart}`}
                title="Door Frame Configurator | CAD/BOM/Quote in 1-Click"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───── One-Click Actions & Tech Stack ───── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={contentVariants}
        className="py-12 px-4 max-w-4xl mx-auto"
      >
        <motion.h2 variants={textItemVariants} className="text-3xl font-bold text-white mb-6">
          One-Click Automation & Tech Stack Overview
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.article variants={textItemVariants} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="text-2xl font-semibold text-white">One-Click Actions</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Load Excel quote & parameters instantly</li>
              <li>Generate parametric 3D assembly via Inventor API</li>
              <li>Auto-create BOM & cost breakdown</li>
              <li>Export IDW drawings & DXF cut-lists</li>
              <li>Commit to PDM with version logging</li>
            </ul>
          </motion.article>
          <motion.article variants={textItemVariants} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="text-2xl font-semibold text-white">Tech Stack & Architecture</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>WinForms (.NET Framework 4.8) & Visual Studio Pro</li>
              <li>.NET Standard 2.0 shared libraries via DI</li>
              <li>Autodesk Inventor 2019 API (iLogic & custom iProperties)</li>
              <li>Excel VBA & Open XML for quote automation</li>
              <li>SQL Server & file-system PDM governance</li>
              <li>Realtime log console (read-only) for audit</li>
            </ul>
          </motion.article>
        </div>
      </motion.section>
    </>
  );
}
