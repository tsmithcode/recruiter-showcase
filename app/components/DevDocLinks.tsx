"use client"; // Keep this at the top for client-side functionality

import Link from "next/link";
import { motion } from "framer-motion"; // Import motion
import {
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaGithub, FaTerminal, FaDatabase, FaRegLightbulb, FaRobot, FaVial, FaFlask, FaCss3Alt, FaBootstrap, FaWindows, FaCogs,
} from "react-icons/fa";
import { SiDotnet, SiBlazor, SiTypescript, SiNextdotjs, SiDjango, SiMongodb, SiVercel, SiOpenai, SiAutodesk, SiAutocad, } from "react-icons/si";

const docLinks = [
  { icon: <SiDotnet />, label: ".NET", href: "https://learn.microsoft.com/en-us/dotnet/" },
  { icon: <SiBlazor />, label: "Blazor", href: "https://learn.microsoft.com/en-us/aspnet/core/blazor/" },
  { icon: <FaReact />, label: "React.js", href: "https://reactjs.org/docs/getting-started.html" },
  { icon: <SiNextdotjs />, label: "Next.js", href: "https://nextjs.org/docs" },
  { icon: <FaNodeJs />, label: "Node.js", href: "https://nodejs.org/en/docs" },
  { icon: <FaPython />, label: "Python", href: "https://docs.python.org/3/" },
  { icon: <SiDjango />, label: "Django", href: "https://docs.djangoproject.com/en/stable/" },
  { icon: <FaFlask />, label: "Flask", href: "https://flask.palletsprojects.com/en/latest/" },
  { icon: <SiTypescript />, label: "TypeScript", href: "https://www.typescriptlang.org/docs/" },
  { icon: <FaCss3Alt />, label: "Tailwind CSS", href: "https://tailwindcss.com/docs" },
  { icon: <FaBootstrap />, label: "Bootstrap", href: "https://getbootstrap.com/docs/" },
  { icon: <SiAutodesk />, label: "Inventor API", href: "https://help.autodesk.com/view/INVNTOR/2024/ENU/?guid=UserManualIndex" },
  { icon: <SiAutocad />, label: "AutoCAD", href: "https://help.autodesk.com/view/ACD/2023/ENU/" },
  { icon: <FaRegLightbulb />, label: "VB.NET", href: "https://learn.microsoft.com/en-us/dotnet/visual-basic/" },
  { icon: <FaWindows />, label: "WinForms", href: "https://learn.microsoft.com/en-us/dotnet/desktop/winforms/" },
  { icon: <FaRegLightbulb />, label: "SQL", href: "https://learn.microsoft.com/en-us/sql/" },
  { icon: <SiMongodb />, label: "MongoDB", href: "https://www.mongodb.com/docs/" },
  { icon: <FaDatabase />, label: "EF Core", href: "https://learn.microsoft.com/en-us/ef/core/" },
  { icon: <FaCogs />, label: "Dapper", href: "https://github.com/DapperLib/Dapper" },
  { icon: <FaGithub />, label: "GitHub", href: "https://docs.github.com/en" },
  { icon: <FaGitAlt />, label: "Git", href: "https://git-scm.com/doc" },
  { icon: <FaTerminal />, label: "CLI", href: "https://learn.microsoft.com/en-us/windows/terminal/" },
  { icon: <SiVercel />, label: "Vercel", href: "https://vercel.com/docs" },
  { icon: <FaRegLightbulb />, label: "Azure DevOps", href: "https://learn.microsoft.com/en-us/azure/devops/" },
  { icon: <FaRegLightbulb />, label: "Power BI", href: "https://learn.microsoft.com/en-us/power-bi/" },
  { icon: <FaRegLightbulb />, label: "ERP Concepts", href: "https://learn.microsoft.com/en-us/dynamics365/" },
  { icon: <FaVial />, label: "ETL", href: "https://www.ibm.com/cloud/learn/etl" },
  { icon: <FaRobot />, label: "Automation", href: "https://learn.microsoft.com/en-us/power-automate/" },
  { icon: <SiOpenai />, label: "OpenAI", href: "https://platform.openai.com/docs" },
  { icon: <FaRegLightbulb />, label: "ChatGPT", href: "https://openai.com/chatgpt" },
];

export default function DevDocLinks() {
  return (
    <section className="py-6 px-4 max-w-7xl mx-auto container">
      {/* Header for the section */}
      <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Tech Stack <span className="text-[#05c8fb]">Docs</span>
        </motion.h2>
      </header>

      {/* Main container for the links with Framer Motion */}
      <motion.div
        className="flex flex-wrap gap-6 text-xl text-[#afc2c8] p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {docLinks.map(({ icon, label, href }, idx) => ( // Added idx for staggered item animation
          <motion.span // Changed span to motion.span for individual item animation
            title={label}
            key={label}
            initial={{ opacity: 0, scale: 0.8 }} // Initial state: invisible, slightly smaller
            whileInView={{ opacity: 1, scale: 1 }} // Animate to visible, normal size
            viewport={{ once: true, amount: 0.5 }} // Animate once when 50% of item is in view
            transition={{ delay: (0.1 * idx) + 0.4, duration: 0.3 }} // Staggered delay for each item
          >
            <Link
              href={href}
              target="_blank"
              className="hover:text-white transition"
            >
              {icon}
            </Link>
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}