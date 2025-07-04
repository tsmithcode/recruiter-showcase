"use client";

import DemoProjects from "@/components/DemoProjects";
import TeamHighlights from "@/components/TeamHighlights";
import SkillsMatrix from "@/components/SkillsMatrix";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import CompensationSection from "@/components/CompensationSection";
import DevDocLinks from "@/components/DevDocLinks";
import LogoPair from "@/components/LogoPair";

// import WebPageEmbed from "@/components/WebpageEmbed"; // Import the GitHub webpage component


import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <Hero />
      <DemoProjects />
      <ServicesSection />
      <CompensationSection />
      <TeamHighlights/>
      <SkillsMatrix/>
      <DevDocLinks/>
      <LogoPair/>

      <Footer/>
    </main>
  );
}
