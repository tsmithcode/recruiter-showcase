"use client";

import { motion } from "framer-motion";

export default function CompensationSection() {
  return (
    <section className="py-6 px-4 max-w-5xl mx-auto">
           <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
  <div>
     <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Compensation Philosophy <span className="text-[#05c8fb]">& Lifestyle Fit</span>
        </motion.h2>

  </div>
  
</header>
      <div
        className="
          bg-white/5 border border-white/10
          p-6 
          rounded-xl 
          text-white 
          shadow-lg 
          hover:shadow-xl 
          transition
        "
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-4"
        >
          <p className="mb-4">
  As a <span className="text-[#e2e8ea] font-semibold">seasoned .NET & Automation Engineer</span> based in Atlanta, I operate within a 
  <span className="text-[#e2e8ea] font-semibold"> flexible rate range</span>—
  <span className="text-[#e2e8ea] font-semibold">$120–$160/hr</span> for 
  <span className="text-[#e2e8ea] font-semibold"> advanced automation</span>, 
  <span className="text-[#e2e8ea] font-semibold"> $90–$140/hr</span> for 
  <span className="text-[#e2e8ea] font-semibold"> cloud-native services</span>, and 
  <span className="text-[#e2e8ea] font-semibold"> $60–$100/hr</span> for 
  <span className="text-[#e2e8ea] font-semibold"> operations support</span>—depending on scope and commitment.
</p>


          <p className="mb-2">
            For ongoing or strategic partnerships, I prioritize compensation models that reflect impact and promote well-being. These include:
          </p>

          <ul className="space-y-4 mt-4">
  {[
    "Performance-based bonuses (10–20%)",
    "Equity or profit-sharing in product-driven environments",
    "Comprehensive health coverage (medical, dental, vision, mental health)",
    "Remote-first schedules, 4-day weeks, or async flexibility",
    "Dependent coverage for two children and elder care benefits",
    "Professional development stipends for AI, CAD, or cloud certifications",
    "Sabbaticals or recharge leave after long-term tenure",
  ].map((item, idx) => (
    <li
      key={idx}
      className="relative p-3 border border-white/10 rounded-xl bg-white/5 text-white/90 backdrop-blur-md shadow-inner group overflow-hidden"
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-[#05c8fb] animate-pulse rounded-r" />
      <span className="text-sm sm:text-base leading-relaxed text-[#cbefff] group-hover:text-white transition">
        {item}
      </span>
    </li>
  ))}
</ul>


          <p>
            I believe in a <strong className="text-white">work hard, play smart</strong> rhythm—executing with precision during focused sprints while preserving time for family, creative pursuits, and restoration. I’m not just seeking a job—I’m aligning with organizations that value deep work, respect personal boundaries, and champion inclusive leadership in automation and enterprise innovation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
