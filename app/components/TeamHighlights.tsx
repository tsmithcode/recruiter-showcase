"use client";

import { motion } from "framer-motion";
import { FaCheckCircle, FaUsers, FaCogs, FaLightbulb, FaProjectDiagram } from "react-icons/fa";

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
  return (
    <section className="py-14 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center"
      >
        👥 Team Contributions & Leadership Highlights
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition"
          >
            <div className="text-[#05c8fb] text-3xl mb-3">{item.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
