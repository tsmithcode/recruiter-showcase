"use client";
import { motion, Variants } from "framer-motion"; // Removed CubicBezier from import
import { FC } from "react";
import {
  FaLaptopCode,
  FaCogs,
  FaCloud,
  FaNetworkWired,
} from "react-icons/fa";

type Service = {
  Icon: FC<{ className?: string }>;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    Icon: FaLaptopCode,
    title: "Custom .NET Solutions",
    description:
      "Building enterprise-grade .NET Core/Blazor applications that scale—reducing time-to-market and maximizing ROI.",
  },
  {
    Icon: FaCogs,
    title: "CAD & Automation Integration",
    description:
      "Seamlessly integrate Inventor API, iLogic, and AutoCAD workflows to automate repetitive engineering tasks and boost throughput.",
  },
  {
    Icon: FaCloud,
    title: "Cloud & DevOps Architecture",
    description:
      "Designing cloud-native infrastructures (Azure & Vercel) with CI/CD pipelines that cut deployment time by 60%.",
  },
  {
    Icon: FaNetworkWired,
    title: "Data & ERP Integrations",
    description:
      "Connecting CRM/ERP (Epicor, SugarCRM, Dynamics NAV) and SQL/NoSQL pipelines to automate end-to-end business workflows.",
  },
];

// --- Animation Variants ---

// Parent container variant to orchestrate children animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger animation of children by 0.1s
    },
  },
};

// Child item variant for a fade-in-up effect
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      // Using cubic-bezier array for 'easeOut'.
      // TypeScript will now correctly infer this as compatible with Easing.
      ease: [0, 0, 0.2, 1], // Removed 'as CubicBezier'
    },
  },
};

export default function ServicesSection() {
  return (
    <motion.section
      className="py-6 px-4 max-w-7xl mx-auto"
      // ✅ Use variants to control animation flow
      variants={containerVariants}
      initial="hidden"
      // ✅ Trigger animation when section is in view
      whileInView="visible"
      // ✅ Ensure animation repeats every time
      viewport={{ once: false, amount: 0.2 }}
    >
      {/* Header */}
      <motion.header
        className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
        // ✅ Animate header as a child item
        variants={itemVariants}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          <span className="text-white">Services</span>
        </h2>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#05c8fb] text-[#05c8fb] text-sm">
          {/* Pulsing dot animation is independent and can remain */}
          <motion.span
            className="h-3 w-3 rounded-full bg-[#05c8fb]"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          />
          From $60-$160/hr
        </div>
      </motion.header>

      {/* Grid of Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {services.map((svc) => (
          <motion.div
            key={svc.title}
            className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition"
            // ✅ Animate each card as a child item
            variants={itemVariants}
          >
            <div className="flex-shrink-0 mb-3">
              <svc.Icon className="text-[#05c8fb] text-3xl" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{svc.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {svc.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}