// components/TeamHighlights.tsx
"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion, Variants } from "framer-motion"; // <-- Changed 'Variant' to 'Variants'
import {
  FaCheckCircle,
  FaUsers,
  FaCogs,
  FaLightbulb,
  FaProjectDiagram,
} from "react-icons/fa";

const highlights = [
  {
    icon: <FaUsers />,
    title: "Cross-Functional Leadership",
    description:
      "Facilitated standups, retros, and backlog grooming with devs, designers, and business units across multiple product teams.",
  },
  {
    icon: <FaCogs />,
    title: "Automation Culture",
    description:
      "Mentored junior engineers and led architecture reviews to encourage DRY, SOLID, and object-oriented principles.",
  },
  {
    icon: <FaLightbulb />,
    title: "Business-First Engineering",
    description:
      "Translated stakeholder goals into fast, scalable .NET microservices with KPIs and async workflows.",
  },
  {
    icon: <FaProjectDiagram />,
    title: "Workflow Consolidation",
    description:
      "Unified CAD, ERP, and CRM logic into modular project tools using REST APIs, CLI workers, and data models.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Prioritization by Impact",
    description:
      "Applied Pareto and first-principles thinking to simplify scope and deliver high-value features under pressure.",
  },
];

// --- Animation Variants ---
const containerVariants: Variants = { // <-- Changed type to Variants
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the header and slider
    },
  },
};

const itemVariants: Variants = { // <-- Changed type to Variants
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut", // Assuming "easeOut" is correctly handled, if not, consider the cubic bezier array from previous fixes.
    },
  },
};

export default function TeamHighlights() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "snap",
    slides: {
      perView: 1.25,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2.25, spacing: 20 },
      },
      "(min-width: 900px)": {
        slides: { perView: 4.25, spacing: 24 },
      },
    },
  });

  return (
    <motion.section
      className="py-6 px-4 max-w-7xl mx-auto container"
      // ✅ Set up the main animation controller
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      // ✅ Make animation replayable
      viewport={{ once: false, amount: 0.1 }}
    >
      {/* Header */}
      <motion.header
        className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
        // ✅ Animate the header as a child
        variants={itemVariants}
      >
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Team & <span className="text-[#05c8fb]">Leadership</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
            <span>Swipe or drag to view more</span>
            <span className="inline-block px-2 py-0.5 bg-white/10 rounded text-white text-xs">
              ←
            </span>
            <span className="inline-block px-2 py-0.5 bg-white/10 rounded text-white text-xs">
              →
            </span>
          </p>
        </div>
        <span className="text-base text-gray-400">
          {highlights.length} HIGHLIGHTS
        </span>
      </motion.header>

      {/* Slider Wrapper */}
      <motion.div
        ref={sliderRef}
        className="keen-slider"
        // ✅ Animate the entire slider as a child
        variants={itemVariants}
      >
        {highlights.map((item) => (
          // NOTE: Individual slides are NOT motion components to avoid conflicts with Keen Slider
          <div
            key={item.title}
            className="keen-slider__slide bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition"
          >
            <div className="text-[#05c8fb] text-3xl mb-3">{item.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}