import { motion } from "framer-motion";
import Logo from "./Logo";
import Link from "next/link";

import SocialLinks from "@/components/SocialLinks";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-8 pb-6 max-w-4xl mx-auto px-4 md:px-0">
      {/* Left column: Logo + SocialLinks */}
      <div className="flex flex-col items-center md:items-start md:w-1/2 gap-4">
        <Logo />
        {/* Availability Badge */}
        <motion.div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#05c8fb] text-[#05c8fb] text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <motion.span
            className="h-3 w-3 rounded-full bg-[#05c8fb]"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          />
          Available for New Projects
        </motion.div>
      </div>


      {/* Right column: Heading, tagline, CTAs */}
      <div className="flex flex-col items-center md:items-start md:w-1/2 gap-4 text-center md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold tracking-tight"
        >
          Crafting Automated Solutions
        </motion.h1>

        <p className="text-[#05c8fb] text-base sm:text-lg leading-relaxed">
          I streamline business workflows using software, automation, and cloud-native tools — delivering measurable ROI in weeks, not months.
        </p>

        <SocialLinks />

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
