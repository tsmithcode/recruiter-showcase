/* app/page.tsx – compact layout */
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import DemoProjects from "@/components/DemoProjects";
import ProjectProcess from "./components/ProjectProcess";
import TeamHighlights from "@/components/TeamHighlights";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const metrics = [
  { label: "Years Full-Stack", value: "7+" },
  { label: "Projects Delivered", value: "45" },
  { label: "% Faster Deploys", value: "60%" },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-[#0b253f] text-white">
      {/* HERO */}
      <section className="flex flex-col items-center gap-4 pt-12 pb-6 max-w-2xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/tsmithcode.png"
            alt="TSmithCode.ai logo"
            width={180}
            height={180}
            priority
            className="select-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
          />
        </motion.div>

        <SocialLinks />

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold tracking-tight"
        >
          .NET & Automation Engineer
        </motion.h1>

        <p className="text-[#05c8fb] text-base sm:text-lg leading-relaxed">
          I streamline business workflows using .NET, automation, and cloud-native tools — delivering measurable ROI in weeks, not months.
        </p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Link
            href="https://calendly.com/tsmithcode"
            target="_blank"
            className="bg-[#05c8fb] text-[#0b253f] font-semibold rounded-full px-5 py-2.5 hover:opacity-90 transition"
          >
            📅 Schedule 15-min Intro
          </Link>
          <Link
            href="https://github.com/tsmithcode/jobs/blob/main/THOMAS%20SMITH%202026%20Resume.pdf"
            target="_blank"
            className="border border-[#05c8fb] rounded-full px-5 py-2.5 hover:bg-[#05c8fb]/10 transition"
          >
            📄 Download Resume
          </Link>
        </motion.div>
      </section>

      {/* METRICS */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full grid grid-cols-3 text-center text-xs sm:text-sm py-3 border-t border-white/10"
      >
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col">
            <span className="font-bold text-[#05c8fb] text-lg sm:text-xl">
              {m.value}
            </span>
            <span className="tracking-wide text-gray-300 uppercase">
              {m.label}
            </span>
          </div>
        ))}
      </motion.section>

      <DemoProjects />

      <ProjectProcess/>

      <TeamHighlights/>

      {/* FOOTER */}
      <footer className="w-full py-3 text-center text-xs text-gray-400 border-t border-white/10 flex items-center justify-center gap-4 flex-wrap">
  <span>© {new Date().getFullYear()} TSmithCode.ai</span>
  <span className="flex items-center gap-1">
    <FaEnvelope className="text-[#05c8fb]" />
    <a href="mailto:job@tsmithcode.ai" className="hover:underline text-gray-300">job@tsmithcode.ai</a>
  </span>
  <span className="flex items-center gap-1">
    <FaPhone className="text-[#05c8fb]" />
    <a href="tel:4702281918" className="hover:underline text-gray-300">(470) 228-1918</a>
  </span>
</footer>
    </main>
  );
}
