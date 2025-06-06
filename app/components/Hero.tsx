import { motion } from "framer-motion";
import Logo from "./Logo";
import Link from "next/link";

import SocialLinks from "@/components/SocialLinks";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-6 max-w-4xl mx-auto px-4 md:px-0">
      {/* Left column: Logo + SocialLinks */}
      <div className="flex flex-col items-center md:items-start md:w-1/2 gap-4">
        <Logo />
      </div>
      
      {/* Right column: Heading, tagline, CTAs */}
      <div className="bg-white/5 border border-white/10
              mt-6
              p-6 
              rounded-xl 
              text-white 
              shadow-lg 
              hover:shadow-xl 
              transition flex flex-col items-center md:items-start md:w-1/2 gap-4 md:text-left">
        <SocialLinks />
        <p className="text-[#05c8fb] text-base sm:text-lg leading-relaxed">
          I’m <span className="font-semibold text-[#c8d6d9]">Thomas Smith</span>, a results-driven software architect who designs user-focused systems that streamline operations and generate ROI in weeks — not months.
        </p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-row justify-center md:justify-start gap-3"
        >
          <Link
            href="https://calendly.com/tsmithcode"
            target="_blank"
            className="bg-[#05c8fb] text-[#0b253f] font-semibold rounded-full px-5 py-2.5 hover:opacity-90 transition"
          >
            Schedule Call
          </Link>
          <Link
            href="https://github.com/tsmithcode/jobs/blob/main/THOMAS%20SMITH%202026%20Resume.pdf"
            target="_blank"
            className="border border-[#05c8fb] rounded-full px-5 py-2.5 hover:bg-[#05c8fb]/10 transition"
          >
            Resume
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
