
// components/ProjectProcess.tsx – Randomize 3-item display + auto-cycle + Show More/Show Less (no animation)
"use client";

import { useState, useEffect } from "react";
import {
  LightBulbIcon,
  WrenchScrewdriverIcon,
  DocumentCheckIcon,
  ChartPieIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

const categories = [
  {
    icon: WrenchScrewdriverIcon,
    title: "CAD & Configurators",
    pain: "Hours lost to manual model edits & quoting",
    win: "Parametric generators cut cycle-time 80%",
    projects: [
      "Door Frame Configurator",
      "SLC Airport Column Configurator",
      "Ceiling Trim Automation",
    ],
  },
  {
    icon: LightBulbIcon,
    title: "LED & Electrical",
    pain: "Mis-sized BOMs and pricing errors",
    win: "No-code accelerators output error-free BOMs",
    projects: ["LED Reveal Accelerator", "LED Automation Tool"],
  },
  {
    icon: DocumentCheckIcon,
    title: "BOM / Quote / Labels",
    pain: "Spreadsheet chaos & duplicate data",
    win: "Rule-driven generators ensure single source of truth",
    projects: ["Fry Tools Automation", "CertainTeed Label Generator"],
  },
  {
    icon: ChartPieIcon,
    title: "Excel Analytics",
    pain: "Finance stuck in copy-paste loops",
    win: "Macros compress monthly reporting from days → minutes",
    projects: ["Hourly Allocation Tool", "LED Quote Macro"],
  },
  {
    icon: CpuChipIcon,
    title: "Web & ERP Apps",
    pain: "Disconnected tools & siloed data",
    win: "Full-stack APIs bridge CRM, ERP & CAD in real-time",
    projects: ["Project Services Web App", "Part Number Generator"],
  },
];

const sdlcSteps = ["Discover", "Design", "Develop", "Deploy", "Iterate"];
// Helper: return 3 random items
function sampleThree<T>(arr: T[]): T[] {
  if (arr.length <= 3) return [...arr];
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 3);
}

export default function ProjectProcess() {
  const [showAll, setShowAll] = useState(false);

  // Start with empty array to avoid any SSR vs client mismatch
  const [visibleCategories, setVisibleCategories] = useState<typeof categories>([]);

  // On first client render, pick 3 random categories
  useEffect(() => {
    setVisibleCategories(sampleThree(categories));
  }, []);

  // Whenever showAll toggles OR the original categories list changes, update visibleCategories
  useEffect(() => {
    if (showAll) {
      setVisibleCategories(categories);
    } else {
      setVisibleCategories(sampleThree(categories));
    }
  }, [showAll]);

  // Auto-cycle every 7 seconds when not showing all
  useEffect(() => {
    if (showAll) return;
    const interval = setInterval(() => {
      setVisibleCategories(sampleThree(categories));
    }, 7000);
    return () => clearInterval(interval);
  }, [showAll]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Projects <span className="text-[#05c8fb]">Completed</span>
        </h2>
        <span className="text-base text-gray-400">
          {categories.length} CATEGORIES
        </span>
      </header>

      {/* SDLC Visual */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12">
        {sdlcSteps.map((step, i) => (
          <div
            key={step}
            className="bg-[#05c8fb]/10 text-[#05c8fb] px-4 py-2 rounded-full text-sm font-semibold backdrop-blur"
          >
            {`${i + 1}. ${step}`}
          </div>
        ))}
      </div>

      {/* Category Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCategories.map((cat) => (
          <article
            key={cat.title}
            className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl flex flex-col gap-4 hover:shadow-[0_6px_16px_rgba(5,200,251,0.1)] transition"
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-3">
              <div className="bg-[#05c8fb]/20 p-2 rounded-full">
                <cat.icon className="h-5 w-5 text-[#05c8fb]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{cat.title}</h3>
            </div>

            {/* Pain & Win */}
            <div className="text-xs text-gray-300 leading-relaxed space-y-1">
              <div>
                <span className="inline-block bg-[#05c8fb]/10 text-[#05c8fb] px-2 py-0.5 rounded-full font-medium mr-1">
                  Pain
                </span>
                {cat.pain}
              </div>
              <div>
                <span className="inline-block bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-medium mr-1">
                  Win
                </span>
                {cat.win}
              </div>
            </div>

            {/* Project List */}
            <ul className="text-[11px] text-gray-400 list-disc list-inside space-y-1 mt-1">
              {cat.projects.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* Show More / Show Less */}
      {categories.length > 3 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-[#05c8fb] text-[#0b253f] font-semibold rounded-full px-7 py-2 shadow transition hover:bg-[#05c8fb]/90"
          >
            {showAll
              ? "Show Less"
              : `Show More (${categories.length - 3} more)`}
          </button>
        </div>
      )}
    </section>
  );
}