// components/TeamHighlights.tsx – Randomize 3-item display + auto-cycle + Show More/Show Less (no animation)
"use client";

import { useState, useEffect } from "react";
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

// Helper: return a new array of 3 random items from 'arr'
function sampleThree<T>(arr: T[]): T[] {
  if (arr.length <= 3) return [...arr];
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 3);
}

export default function TeamHighlights() {
  const [showAll, setShowAll] = useState(false);

  // Initialize to empty array so SSR & initial client match
  const [visibleItems, setVisibleItems] = useState<typeof highlights>([]);

  // On first client render, pick 3 random items
  useEffect(() => {
    setVisibleItems(sampleThree(highlights));
  }, []);

  // When showAll toggles, update visibleItems accordingly
  useEffect(() => {
    if (showAll) {
      setVisibleItems(highlights);
    } else {
      setVisibleItems(sampleThree(highlights));
    }
  }, [showAll]);

  // Auto-cycle every 7 seconds when not showing all
  useEffect(() => {
    if (showAll) return;
    const interval = setInterval(() => {
      setVisibleItems(sampleThree(highlights));
    }, 7000);
    return () => clearInterval(interval);
  }, [showAll]);

  return (
    <section className="py-14 px-6 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Team & <span className="text-[#05c8fb]">Leadership</span>
        </h2>
        <span className="text-base text-gray-400">
          {highlights.length} HIGHLIGHTS
        </span>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleItems.map((item) => (
          <div
            key={item.title}
            className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition"
          >
            <div className="text-[#05c8fb] text-3xl mb-3">{item.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Show More / Show Less button */}
      {highlights.length > 3 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-[#05c8fb] text-[#0b253f] font-semibold rounded-full px-7 py-2 shadow transition hover:bg-[#05c8fb]/90"
          >
            {showAll
              ? "Show Less"
              : `Show More (${highlights.length - 3} more)`}
          </button>
        </div>
      )}
    </section>
  );
}