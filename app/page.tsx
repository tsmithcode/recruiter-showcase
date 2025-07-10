"use client";

import DemoProjects from "@/components/DemoProjects";
import TeamHighlights from "@/components/TeamHighlights";
import SkillsMatrix from "@/components/SkillsMatrix";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import CompensationSection from "@/components/CompensationSection";
import DevDocLinks from "@/components/DevDocLinks";
import LogoPair from "@/components/LogoPair";
import Atlanta from "@/components/Atlanta";
import HomePageVideoFeature from '@/components/HomePageVideoFeature';
import { motion, Variants } from 'framer-motion';
// import WebPageEmbed from "@/components/WebpageEmbed"; // Import the GitHub webpage component

import Footer from "@/components/Footer";

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <Hero />
      <HomePageVideoFeature/>
      <DemoProjects />
      <ServicesSection />
      <Atlanta/>
      <CompensationSection />
      <TeamHighlights/>
      <SkillsMatrix/>

      <LogoPair/>


      <header className="mt-6  flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Recent <span className="text-[#05c8fb]">Blogs</span>
              </motion.h2>
            </header>

      {/* ── Context card */}
        <motion.section
          variants={contentVariants}
          className="mt-6 md:w-1/2 mb-8 p-4 bg-white/5 border border-white/10 rounded-xl shadow-lg"
        >
          <motion.h2
            variants={textItemVariants}
            className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2"
          >
            Troubleshooting Autodesk Vault View & Job Processor Issues: Best Practices
          </motion.h2>

          <motion.p variants={textItemVariants}>
            A deep dive into common Autodesk Vault View and Job Processor challenges, offering proven troubleshooting approaches and best practices to ensure seamless PDM operations.
          </motion.p>
<br/>
          <motion.p variants={textItemVariants}>
            This blog post serves as a direct response to a recent inquiry from Nitin Khare at IBM, regarding my experience troubleshooting Autodesk Vault View and Job Processor issues. It outlines my systematic approach and shares best practices refined over years of working with these complex systems.{' '}
            <a
              href="/blog/autodesk-vault-troubleshooting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#05c8fb] underline"
            >
              (view here)
            </a>
            .
          </motion.p>
        </motion.section>

{/* ── Context card */}
        <motion.section
          variants={contentVariants}
          className="mt-6 md:w-1/2 mb-8 p-4 bg-white/5 border border-white/10 rounded-xl shadow-lg"
        >
          <motion.h2
            variants={textItemVariants}
            className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2"
          >
            Building a WinForms PDM From Scratch
          </motion.h2>

          <motion.p variants={textItemVariants}>
            Habasit America maintains more than 17 000 legacy belt drawings.
            Searching by number alone forced tribal knowledge and slowed
            onboarding. Stakeholders set a KPI to double daily reuse hits within
            one fiscal quarter.
          </motion.p>
<br/>
          <motion.p variants={textItemVariants}>
            We opted for a lean WinForms MVP because operators already live in
            Windows Explorer and PDF Viewer; no new runtime permissions were
            needed. Source code lives in a public GitHub repo{' '}
            <a
              href="/blog/WinForms-PDM-Sprint3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#05c8fb] underline"
            >
              (view here)
            </a>
            .
          </motion.p>
        </motion.section>

      <DevDocLinks/>
      <Footer/>
    </main>
  );
}
