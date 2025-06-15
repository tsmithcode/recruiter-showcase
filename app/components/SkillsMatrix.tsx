"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion } from "framer-motion"; // Import motion

const CURRENT_YEAR = new Date().getFullYear();

const skills = [
  {
    category: "Backend",
    tools: [
      { name: ".NET, VB.NET, C#", startYear: 2017 },
      { name: "Blazor Server", startYear: 2019 },
      { name: "Entity Framework, EFCore", startYear: 2018 },
      { name: "Dapper ORM", startYear: 2019 },
      { name: "ASP.NET Core APIs", startYear: 2018 },
      { name: "Node.js", startYear: 2013 },
      { name: "Express", startYear: 2013 },
      { name: "Python (CLI/ETL)", startYear: 2013 },
    ],
  },
  {
    category: "Frontend",
    tools: [
      { name: "React.js", startYear: 2016 },
      { name: "Blazor WASM", startYear: 2020 },
      { name: "Next.js", startYear: 2022 },
      { name: "Django", startYear: 2018 },
      { name: "Flask", startYear: 2019 },
      { name: "Tailwind CSS", startYear: 2022 },
      { name: "Bootstrap", startYear: 2019 },
      { name: "Three.js", startYear: 2020 },
      { name: "TypeScript", startYear: 2021 },
    ],
  },
  {
    category: "CAD & Automation",
    tools: [
      { name: "Revit", startYear: 2006 },
      { name: "Inventor, API, iLogic, Vault", startYear: 2006 },
      { name: "SolidWorks API, PDM (C#)", startYear: 2012 },
      { name: "AutoCAD, AutoLISP", startYear: 2006 },
      { name: "Excel VBA / Macros", startYear: 2006 },
      { name: "WinForms Automation", startYear: 2017 },
    ],
  },
  {
    category: "DevOps / Infra",
    tools: [
      { name: "Git / GitHub", startYear: 2017 },
      { name: "CLI / Terminal Workflows", startYear: 2004 },
      { name: "Vercel", startYear: 2022 },
      { name: "Azure", startYear: 2018 },
      { name: "CI/CD Pipelines", startYear: 2019 },
    ],
  },
  {
    category: "Data & Integration",
    tools: [
      { name: "SQL", startYear: 2018 },
      { name: "SSMS", startYear: 2018 },
      { name: "MongoDB", startYear: 2022 },
      { name: "REST API", startYear: 2019 },
      { name: "ETL Pipelines", startYear: 2021 },
    ],
  },
  {
    category: "Business & Productivity",
    tools: [
      { name: "Excel API", startYear: 2019 },
      { name: "Office 365 Automation", startYear: 2019 },
      { name: "ERP Integration", startYear: 2015 },
      { name: "CRM Integration", startYear: 2023 },
      { name: "Power BI", startYear: 2022 },
    ],
  },
  {
    category: "AI & Copilot Tools",
    tools: [
      { name: "GitHub Copilot", startYear: 2023 },
      { name: "OpenAI / ChatGPT", startYear: 2022 },
      { name: "Claude, Gemini", startYear: 2024 },
    ],
  },
];

function getYears(startYear: number) {
  return `${CURRENT_YEAR - startYear} yrs`;
}

export default function SkillsMatrix() {
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
      "(min-width: 1024px)": {
        slides: { perView: 4.25, spacing: 24 },
      },
    },
  });

  return (
    <section className="py-6 px-4 max-w-7xl mx-auto container">
      <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Tools & <span className="text-[#05c8fb]">Experience</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
            <span>Swipe on mobile or hold mouse click </span>
            <span className="inline-block px-2 py-0.5 bg-white/10 rounded text-white text-xs">
              ←
            </span>
            <span className="inline-block px-2 py-0.5 bg-white/10 rounded text-white text-xs">
              →
            </span>
          </p>
        </div>
        <span className="text-base text-gray-400">{skills.length} SKILLS</span>
      </header>

      <div ref={sliderRef} className="keen-slider">
        {skills.map((group, idx) => ( // Added idx for card animation stagger
          <motion.div // Changed div to motion.div
            key={group.category}
            className="keen-slider__slide bg-white/5 border border-white/10 p-6 rounded-xl shadow-md hover:shadow-lg transition"
            initial={{ opacity: 0, y: 50 }} // Initial state for card
            whileInView={{ opacity: 1, y: 0 }} // Animate card to visible
            viewport={{ once: true, amount: 0.2 }} // Animate once when 20% of card is in view
            transition={{ delay: 0.1 * idx, duration: 0.5 }} // Staggered delay for each card
          >
            <h3 className="text-white font-semibold text-lg mb-3">
              {group.category}
            </h3>
            <ul className="text-sm text-gray-300 space-y-2">
              {group.tools.map((tool, toolIdx) => ( // Added toolIdx for item animation stagger
                <motion.li // Changed li to motion.li
                  key={tool.name}
                  className="flex justify-between border-b border-white/10 pb-1"
                  initial={{ opacity: 0, x: -20 }} // Initial state for item
                  whileInView={{ opacity: 1, x: 0 }} // Animate item to visible
                  viewport={{ once: true, amount: 0.5 }} // Animate once when 50% of item is in view
                  // Delay calculated relative to card delay + its own index for a smooth cascading effect
                  transition={{ delay: (0.1 * idx) + (0.05 * toolIdx) + 0.3, duration: 0.4 }}
                >
                  <span>{tool.name}</span>
                  <span className="text-[#05c8fb]">{getYears(tool.startYear)}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}