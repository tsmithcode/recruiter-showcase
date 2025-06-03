// components/ProjectProcess.tsx
"use client";

import { motion } from "framer-motion";
import { LightBulbIcon, WrenchScrewdriverIcon, DocumentCheckIcon, ChartPieIcon, CpuChipIcon } from "@heroicons/react/24/outline";

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

export default function ProjectProcess() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
        {/* ✨ Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
            How I Tackle Diverse Projects
        </h2>
        
      {/* SDLC VISUAL */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12"
      >
        {sdlcSteps.map((step, i) => (
          <motion.div
            key={step}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-[#05c8fb]/10 text-[#05c8fb] px-4 py-2 rounded-full text-sm font-semibold backdrop-blur"
          >
            {`${i + 1}. ${step}`}
          </motion.div>
        ))}
      </motion.div>

      {/* CATEGORY GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {categories.map((cat, i) => (
    <motion.article
      key={cat.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: i * 0.05 }}
      className="bg-white/5 p-5 rounded-xl flex flex-col gap-4 hover:shadow-[0_6px_16px_rgba(5,200,251,0.1)] transition"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-[#05c8fb]/20 p-2 rounded-full">
          <cat.icon className="h-5 w-5 text-[#05c8fb]" />
        </div>
        <h3 className="font-semibold text-white text-sm sm:text-base tracking-wide">
          {cat.title}
        </h3>
      </div>

      {/* Pain + Win */}
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
    </motion.article>
  ))}
</div>

    </section>
  );
}
