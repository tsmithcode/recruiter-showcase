"use client";

import DemoProjects from "@/components/DemoProjects";
// import ProjectProcess from "./components/ProjectProcess";
import TeamHighlights from "@/components/TeamHighlights";
import SkillsMatrix from "@/components/SkillsMatrix";
// import Metrics from "@/components/Metrics";
import Hero from "@/components/Hero";
// import CPQConfigurator from "@/components/CPQConfigurator";
// import TargetMarkets from '@/components/TargetMarkets';
import ServicesSection from "@/components/ServicesSection";
import CompensationSection from "@/components/CompensationSection";
// import NavigationCards from "@/components/NavigationCards";

import { motion } from "framer-motion"; // Import motion

import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      {/* <Metrics/> */}
      <Hero />
      <DemoProjects />
      <ServicesSection />
      {/* <CPQConfigurator/> */}
       <CompensationSection />
      {/* <ProjectProcess/> */}
      <TeamHighlights/>
      <SkillsMatrix/>
      {/* <TargetMarkets /> */}
      {/* <NavigationCards/> */}
      
      
      <motion.div // Changed div to motion.div
      className="flex flex-col items-center gap-4 pt-2 pb-6 max-w-2xl px-4 text-center mx-auto" // Added mx-auto to center it
      initial={{ opacity: 0, y: 20 }} // Start invisible and slightly below
      whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position
      viewport={{ once: true, amount: 0.5 }} // Animate once when 50% in view
      transition={{ delay: 0.1, duration: 0.5 }} // Quick animation
    >
      <Image
        src="/tsmithcode-logo.png"
        alt="TSmithCode.ai logo"
        width={256}
        height={256}
        priority
        className="select-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
      />
      {/* Added caption below the image */}
      <motion.p // Also animate the caption for a subtle delayed appearance
        className="text-sm text-gray-400 mt-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.4, duration: 0.5 }} // Slight delay after logo appears
      >
        tsmithcode.ai brand logo
      </motion.p>
    </motion.div>
      <Footer/>
    </main>
  );
}
