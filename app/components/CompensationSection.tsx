"use client";

import { motion, Easing } from "framer-motion"; // Import Easing type


// --- Animation Variants ---

// Parent container to orchestrate and stagger children animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the header and the main card
    },
  },
};

// Child variant for the header and the main card
const itemVariants = {
  // hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      // Assert the string as Easing type
      ease: "easeOut" as Easing, // <-- Change here
    },
  },
};

export default function CompensationSection() {
  return (
    <motion.section
      className="flex flex-col items-center md:items-start gap-6 pb-6 mx-auto px-4"
      // ✅ Set up the main animation controller
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      // ✅ Make animation replayable. Trigger when 10% is visible.
      viewport={{ once: false, amount: 0.1 }}
    >
    {/* flex flex-col items-center md:items-start md:w-1/2 gap-4 */}
      <header className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <motion.h2
          // ✅ Animate the header as a child of the section
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Compensation Philosophy
          <span className="text-[#05c8fb]"> & Lifestyle Fit</span>
        </motion.h2>
      </header>

      {/* Main content card - now a motion component */}
      <motion.div
        // ✅ Animate the entire card as a child of the section
        variants={itemVariants}
        className="
          bg-white/5 border border-white/10
          p-6
          rounded-xl
          text-white
          shadow-lg
          hover:shadow-xl
          transition
          w-full
        "
      >
        <div className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
          <p className="mb-4">
            As a{" "}
            <span className="text-[#e2e8ea] font-semibold">
              seasoned .NET & Automation Engineer
            </span>{" "}
            based in Atlanta, I operate within a{" "}
            <span className="text-[#e2e8ea] font-semibold">
              flexible rate range
            </span>
            —
            <span className="text-[#e2e8ea] font-semibold">$120–$160/hr</span>{" "}
            for{" "}
            <span className="text-[#e2e8ea] font-semibold">
              advanced automation
            </span>
            ,{" "}
            <span className="text-[#e2e8ea] font-semibold">$90–$140/hr</span>{" "}
            for{" "}
            <span className="text-[#e2e8ea] font-semibold">
              cloud-native services
            </span>
            , and{" "}
            <span className="text-[#e2e8ea] font-semibold">$60–$100/hr</span>{" "}
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
                // ✅ Update list items to also replay their animation
                viewport={{ once: false, amount: 0.5 }}
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
              aligning with organizations
            </span>{" "}
            that value{" "}
            <span className="text-[#bbebf7] font-semibold">deep work</span>,{" "}
            <span className="text-[#bbebf7] font-semibold">
              respect personal boundaries
            </span>
            , and{" "}
            <span className="text-[#bbebf7] font-semibold">
              champion inclusive leadership
            </span>{" "}
            in{" "}
            <span className="text-[#bbebf7] font-semibold">
              automation and enterprise innovation
            </span>
            .
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}