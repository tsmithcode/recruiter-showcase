import { motion } from "framer-motion";
import Logo from "./Logo";
import Link from "next/link";

import SocialLinks from "@/components/SocialLinks";



export default function Hero() {
  return (
      <section className="flex flex-col items-center gap-4 pt-8 pb-6 max-w-2xl px-4 text-center">
        <Logo/>

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
  );
}
