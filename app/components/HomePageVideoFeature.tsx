'use client'; // Client-side animations

import React, { useState, useCallback, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/20/solid';

// ────────────────────────────────────────────────────────
// 1 — MOTION VARIANTS
// ────────────────────────────────────────────────────────
const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 },
  },
};
const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
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
    transition: { type: 'spring', stiffness: 200, damping: 25 },
  },
};


// ────────────────────────────────────────────────────────
// 3 — MAIN COMPONENT
// ────────────────────────────────────────────────────────
export default function CombinedFeature() {
  const [open, setOpen] = useState(false);

  // Close on ESC
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  }, []);
  useEffect(() => {
    if (open) document.addEventListener('keydown', onKeyDown);
    else document.removeEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onKeyDown]);

  const videoId = 'jXnunvPM9Ec';
  const videoStart = 180;

  return (
    <>
      {/* ───── VIDEO PREVIEW + TITLE / DESCRIPTION ───── */}
      <motion.section
        className="py-12 px-4 max-w-4xl mx-auto"
        variants={contentVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* Page title & subtitle */}
        <motion.h1
          variants={textItemVariants}
          className="text-3xl md:text-4xl font-bold text-white mb-4 text-center"
        >
          Door Frame Configurator<br/>
          <span className="text-[#05c8fb]">CAD, BOM & Quote in 1-Click</span>
        </motion.h1>
        <motion.p
          variants={textItemVariants}
          className="text-center text-gray-300 mb-8 leading-relaxed"
        >
          Watch a WinForms app turn an Excel quote into a fully-parametric 3D model,
          complete Bill-of-Materials and customer quote in under 5 minutes for
          an architectural-metals manufacturer.
        </motion.p>

        {/* video thumbnail button */}
        <motion.div variants={textItemVariants}>
          <button
            onClick={() => setOpen(true)}
            aria-label="Play video"
            className="relative w-full aspect-video overflow-hidden rounded-lg group focus:outline-none"
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Door Frame Configurator video thumbnail"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                className="h-16 w-16 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </span>
          </button>
        </motion.div>
      </motion.section>

      {/* ───── VIDEO MODAL ───── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={overlayVariants}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              key="dialog"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={dialogVariants}
              className="relative w-full max-w-5xl aspect-video"
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

    </>
  );
}
