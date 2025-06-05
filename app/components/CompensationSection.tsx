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
            As a seasoned .NET & Automation Engineer based in Atlanta, I bring over a decade of experience delivering high-ROI solutions across CAD, ERP, and cloud-native platforms. I operate within a flexible rate range—$120–$160/hr for advanced automation, $90–$140/hr for cloud-native services, and $60–$100/hr for operations support—depending on scope and commitment.
          </p>

          <p className="mb-2">
            For ongoing or strategic partnerships, I prioritize compensation models that reflect impact and promote well-being. These include:
          </p>

          <ul className="list-disc list-inside mt-2 text-[#05c8fb]">
            <li>Performance-based bonuses (10–20%)</li>
            <li>Equity or profit-sharing in product-driven environments</li>
            <li>Comprehensive health coverage (medical, dental, vision, mental health)</li>
            <li>Remote-first schedules, 4-day weeks, or async flexibility</li>
            <li>Dependent coverage for two children and elder care benefits</li>
            <li>Professional development stipends for AI, CAD, or cloud certifications</li>
            <li>Sabbaticals or recharge leave after long-term tenure</li>
          </ul>

          <p>
            I believe in a <strong className="text-white">work hard, play smart</strong> rhythm—executing with precision during focused sprints while preserving time for family, creative pursuits, and restoration. I’m not just seeking a job—I’m aligning with organizations that value deep work, respect personal boundaries, and champion inclusive leadership in automation and enterprise innovation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
