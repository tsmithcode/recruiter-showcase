// components/SkillsMatrix.tsx
"use client";

import { motion } from "framer-motion";

const skills = [
  {
    category: "Backend",
    tools: [
      { name: ".NET / C#", years: "7+" },
      { name: "Blazor", years: "2" },
      { name: "Entity Framework Core", years: "5" },
      { name: "Dapper ORM", years: "4" },
      { name: "ASP.NET Core APIs", years: "6" },
      { name: "Node.js", years: "2" },
      { name: "Python (CLI/ETL)", years: "2" },
    ],
  },
  {
    category: "Frontend",
    tools: [
      { name: "React.js", years: "4" },
      { name: "Next.js", years: "2" },
      { name: "Tailwind CSS", years: "2" },
      { name: "Bootstrap", years: "5" },
      { name: "Framer Motion", years: "1" },
      { name: "TypeScript", years: "3" },
    ],
  },
  {
    category: "CAD & Automation",
    tools: [
      { name: "Inventor API / VB.NET", years: "4" },
      { name: "SolidWorks API (C#)", years: "1" },
      { name: "AutoCAD LT", years: "6" },
      { name: "Excel VBA / Macros", years: "6" },
      { name: "WinForms Automation", years: "5" },
    ],
  },
  {
    category: "DevOps / Infra",
    tools: [
      { name: "Git / GitHub", years: "7+" },
      { name: "CLI / Terminal Workflows", years: "7+" },
      { name: "Vercel (Next.js Hosting)", years: "2" },
      { name: "Azure Functions / Hosting", years: "2" },
      { name: "CI/CD Pipelines", years: "3" },
    ],
  },
  {
    category: "Data & Integration",
    tools: [
      { name: "SQL (PostgreSQL, MS SQL)", years: "6" },
      { name: "SSMS (SQL Server Management Studio)", years: "6" },
      { name: "NoSQL (MongoDB, JSON)", years: "2" },
      { name: "REST API Integration", years: "5" },
      { name: "ETL Pipelines", years: "3" },
    ],
  },
  {
    category: "Business & Productivity",
    tools: [
      { name: "Excel API / Interop", years: "5" },
      { name: "Office 365 Automation", years: "5" },
      { name: "ERP Integration (Epicor, Dynamics NAV)", years: "2" },
      { name: "CRM Integration (SugarCRM)", years: "2" },
      { name: "Power BI (KPI Dashboards)", years: "2" },
    ],
  },
  {
    category: "AI & Copilot Tools",
    tools: [
      { name: "GitHub Copilot", years: "2" },
      { name: "ChatGPT / OpenAI API", years: "2" },
      { name: "Claude, Gemini, Grok, DeepSeek", years: "1" },
    ],
  },
];

export default function SkillsMatrix() {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold text-white text-center mb-8"
      >
        Skills by Tool & Experience
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
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
                  <span className="text-[#05c8fb] font-mono">{tool.years} yrs</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
