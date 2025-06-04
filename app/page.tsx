"use client";

import DemoProjects from "@/components/DemoProjects";
import ProjectProcess from "./components/ProjectProcess";
import TeamHighlights from "@/components/TeamHighlights";
import SkillsMatrix from "@/components/SkillsMatrix";
import Metrics from "@/components/Metrics";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-[#0b253f] text-white">
      <Hero />
      <Metrics/>
      <DemoProjects />
      <ProjectProcess/>
      <TeamHighlights/>
      <SkillsMatrix/>
      <Footer/>
    </main>
  );
}
