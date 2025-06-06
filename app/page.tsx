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
      
      <div className="flex flex-col items-center gap-4 pt-2 pb-6 max-w-2xl px-4 text-center">
                <Image
                  src="/tsmithcode-logo.png"
                  alt="TSmithCode.ai logo"
                  width={256}
                  height={256}
                  priority
                  className="select-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
                />
                </div>
      <Footer/>
    </main>
  );
}
