// components/TeamHighlights.tsx
"use client";

import { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
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

export default function TeamHighlights() {
  // Initialize Keen Slider with desired breakpoints
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
        slides: { perView:4, spacing: 24 },
      },
    },
  });

  // No extra logic required on mount; Keen Slider attaches automatically
  useEffect(() => {
    // sliderRef is already hooked up
  }, []);

  return (
    <section className="py-6 px-4 max-w-7xl mx-auto container">
      {/* Header */}
      <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
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
      </header>

      {/* Slider Wrapper (overflow-hidden ensures no card bleeds out) */}
       <div ref={sliderRef} className="keen-slider">
  {highlights.map((item) => (
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
</div>

    </section>
  );
}
