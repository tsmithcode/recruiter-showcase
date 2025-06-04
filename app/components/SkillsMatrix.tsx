// components/SkillsMatrix.tsx – Randomize 1-item display + auto-cycle + Show More/Show Less
"use client";

import { useState, useEffect } from "react";

const CURRENT_YEAR = new Date().getFullYear();

const skills = [
  {
    category: "Backend",
    tools: [
      { name: ".NET, VB.NET, C#, VBA", startYear: 2017 },
      { name: "Blazor", startYear: 2019 },
      { name: "Entity Framework, EFCore", startYear: 2018 },
      { name: "Dapper ORM", startYear: 2019 },
      { name: "ASP.NET Core APIs", startYear: 2018 },
      { name: "Node.js", startYear: 2013 },
      { name: "Python (CLI/ETL)", startYear: 2013 },
    ],
  },
  {
    category: "Frontend",
    tools: [
      { name: "React.js", startYear: 2016 },
      { name: "Next.js", startYear: 2022 },
      { name: "Tailwind CSS", startYear: 2022 },
      { name: "Bootstrap", startYear: 2019 },
      { name: "Framer Motion", startYear: 2022 },
      { name: "TypeScript", startYear: 2021 },
    ],
  },
  {
    category: "CAD & Automation",
    tools: [
      { name: "Inventor API / iLogic", startYear: 2012 },
      { name: "SolidWorks API (C#)", startYear: 2012 },
      { name: "AutoCAD (Mechanical, Architecture)", startYear: 2006 },
      { name: "Excel VBA / Macros", startYear: 2006 },
      { name: "WinForms Automation", startYear: 2017 },
    ],
  },
  {
    category: "DevOps / Infra",
    tools: [
      { name: "Git / GitHub", startYear: 2017 },
      { name: "CLI / Terminal Workflows", startYear: 2004 },
      { name: "Vercel (Next.js Hosting)", startYear: 2022 },
      { name: "Azure / Hosting", startYear: 2018 },
      { name: "CI/CD Pipelines", startYear: 2019 },
    ],
  },
  {
    category: "Data & Integration",
    tools: [
      { name: "SQL (PostgreSQL, MS SQL)", startYear: 2018 },
      { name: "SSMS (SQL Server Management Studio)", startYear: 2018 },
      { name: "NoSQL (MongoDB, JSON)", startYear: 2022 },
      { name: "REST API Integration", startYear: 2019 },
      { name: "ETL Pipelines", startYear: 2021 },
    ],
  },
  {
    category: "Business & Productivity",
    tools: [
      { name: "Excel API / Interop", startYear: 2019 },
      { name: "Office 365 Automation", startYear: 2019 },
      { name: "ERP Integration (Epicor, Dynamics NAV)", startYear: 2023 },
      { name: "CRM Integration (SugarCRM)", startYear: 2023 },
      { name: "Power BI (KPI Dashboards)", startYear: 2022 },
    ],
  },
  {
    category: "AI & Copilot Tools",
    tools: [
      { name: "GitHub Copilot", startYear: 2023 },
      { name: "ChatGPT / OpenAI API", startYear: 2022 },
      { name: "Claude, Gemini, Grok, DeepSeek", startYear: 2024 },
    ],
  },
];

// Calculate years of experience
function getYears(startYear: number) {
  return `${CURRENT_YEAR - startYear} yrs`;
}

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

export default function SkillsMatrix() {
  const [showAll, setShowAll] = useState(false);

  // Start with an empty array on both server and client
  const [visibleCategories, setVisibleCategories] = useState<typeof skills>([]);

  // On first client render, pick 3 random categories
  useEffect(() => {
    setVisibleCategories(sampleThree(skills));
  }, []);

  // When showAll toggles, update visibleCategories accordingly
  useEffect(() => {
    if (showAll) {
      setVisibleCategories(skills);
    } else {
      setVisibleCategories(sampleThree(skills));
    }
  }, [showAll]);

  // Auto-cycle every 7 seconds when not showing all
  useEffect(() => {
    if (showAll) return;
    const interval = setInterval(() => {
      setVisibleCategories(sampleThree(skills));
    }, 7000);
    return () => clearInterval(interval);
  }, [showAll]);

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          TOOLS & <span className="text-[#05c8fb]">EXPERIENCE</span>
        </h2>
        <span className="text-base text-gray-400">
          {skills.length} SKILLS
        </span>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCategories.map((group) => (
          <div
            key={group.category}
            className="bg-white/5 p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-white font-semibold text-lg mb-3">
              {group.category}
            </h3>
            <ul className="text-sm text-gray-300 space-y-2">
              {group.tools.map((tool) => (
                <li
                  key={tool.name}
                  className="flex justify-between border-b border-white/10 pb-1"
                >
                  <span>{tool.name}</span>
                  <span className="text-[#05c8fb] font-mono">
                    {getYears(tool.startYear)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Show More / Show Less button */}
      {skills.length > 3 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-[#05c8fb] text-[#0b253f] font-semibold rounded-full px-7 py-2 shadow transition hover:bg-[#05c8fb]/90"
          >
            {showAll
              ? "Show Less"
              : `Show More (${skills.length - 3} more)`}
          </button>
        </div>
      )}
    </section>
  );
}