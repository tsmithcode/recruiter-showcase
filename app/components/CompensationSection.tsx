"use client";

import { motion } from "framer-motion";

export default function CompensationSection() {
  return (
    <section className="py-6 px-4 max-w-7xl mx-auto container">
      <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Compensation Philosophy{" "}
          <span className="text-[#05c8fb]">& Lifestyle Fit</span>
        </motion.h2>
        <div></div>
      </header>

      {/* Main content card - now full width */}
      <div
        className="
          bg-white/5 border border-white/10
          p-6
          rounded-xl
          text-white
          shadow-lg
          hover:shadow-xl
          transition
          w-full /* Ensures it takes full available width within the section container */
        "
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-4"
        >
          <p className="mb-4">
            As a{" "}
            <span className="text-[#e2e8ea] font-semibold">
              seasoned .NET & Automation Engineer
            </span>{" "}
            based in Atlanta, I operate within a{" "}
            <span className="text-[#e2e8ea] font-semibold">
              {" "}
              flexible rate range
            </span>
            —
            <span className="text-[#e2e8ea] font-semibold">
              $120–$160/hr
            </span>{" "}
            for{" "}
            <span className="text-[#e2e8ea] font-semibold">
              advanced automation
            </span>
            ,{" "}
            <span className="text-[#e2e8ea] font-semibold">
              {" "}
              $90–$140/hr
            </span>{" "}
            for{" "}
            <span className="text-[#e2e8ea] font-semibold">
              cloud-native services
            </span>
            , and{" "}
            <span className="text-[#e2e8ea] font-semibold">
              {" "}
              $60–$100/hr
            </span>{" "}
            for{" "}
            <span className="text-[#e2e8ea] font-semibold">
              operations support
            </span>
            —depending on scope and commitment.
          </p>

          <p className="mb-2">
            For ongoing or strategic partnerships, I prioritize compensation
            models that reflect impact and promote well-being. These include:
          </p>

          {/* Apply grid to the ul for two columns on sm screens and up */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {[
              "Performance-based bonuses (10–20%)",
              "Equity or profit-sharing in product-driven environments",
              "Comprehensive health coverage (medical, dental, vision, mental health)",
              "Remote-first schedules, 4-day weeks, or async flexibility",
              "Dependent coverage for two children and elder care benefits",
              "Professional development stipends for AI, CAD, or cloud certifications",
              "Sabbaticals or recharge leave after long-term tenure",
            ].map((item, idx) => (
              <motion.li
                key={idx}
                className="relative p-3 border border-white/10 rounded-xl bg-white/5 text-white/90 backdrop-blur-md shadow-inner group overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-[#05c8fb] animate-pulse rounded-r" />
                <span className="text-sm sm:text-base leading-relaxed text-[#cbefff] group-hover:text-white transition">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>

          <p>
            I believe in a{" "}
            <strong className="text-white">work hard, play smart</strong>{" "}
            rhythm—
            <span className="text-[#bbebf7] font-semibold">
              executing with precision
            </span>{" "}
            during focused sprints while preserving time for{" "}
            <span className="text-[#bbebf7] font-semibold">family</span>,{" "}
            <span className="text-[#bbebf7] font-semibold">
              creative pursuits
            </span>
            , and restoration. I’m not just seeking a job—I’m{" "}
            <span className="text-[#bbebf7] font-semibold">
              {" "}
              aligning with organizations
            </span>{" "}
            that value{" "}
            <span className="text-[#bbebf7] font-semibold"> deep work</span>,{" "}
            <span className="text-[#bbebf7] font-semibold">
              {" "}
              respect personal boundaries
            </span>
            , and{" "}
            <span className="text-[#bbebf7] font-semibold">
              {" "}
              champion inclusive leadership
            </span>{" "}
            in{" "}
            <span className="text-[#bbebf7] font-semibold">
              automation and enterprise innovation
            </span>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}