// components/NavigationCards.tsx
'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion'; // <-- Changed 'Variant' to 'Variants'
import { FaInfoCircle, FaNewspaper, FaIndustry } from 'react-icons/fa'; // Chosen icons

// Variants for the container and individual cards
const containerVariants: Variants = {
  // <-- Changed type to Variants
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1, // Small stagger between the two cards
      delayChildren: 0.2, // Delay before cards start animating
    },
  },
};

const cardItemVariants: Variants = {
  // <-- Changed type to Variants
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function NavigationCards() {
  return (
    <section className="py-6 px-4 max-w-7xl mx-auto container">
      {/* Optional Header - if you want a title for this section */}
      <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Explore More
        </motion.h2>
      </header>

      {/* Main container for the navigation cards */}
      <motion.div
        className="flex flex-col md:flex-row justify-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible" // Animate on page load
      >
        {/* About Me Card */}
        <motion.div
          className="
            flex flex-col items-center justify-center text-center
            bg-white/5 border border-white/10
            p-6 rounded-xl text-white shadow-lg
            hover:shadow-xl transition
            md:w-1/3 lg:w-1/3 flex-shrink-0
            group
          "
          variants={cardItemVariants} // Apply item animation
        >
          <Link href="/about" className="flex flex-col items-center gap-3 w-full h-full">
            <FaInfoCircle className="text-[#05c8fb] text-4xl mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-xl mb-1">About Me</h3>
            <p className="text-sm text-gray-300 leading-relaxed flex-grow">
              Discover my professional journey and core values.
            </p>
            {/* Optional "button" style within the card - replicating hero's bordered button */}
            <span
              className="mt-4 border border-[#05c8fb] rounded-full px-5 py-2.5 text-sm
                         hover:bg-[#05c8fb]/10 transition block w-fit"
            >
              Learn More
            </span>
          </Link>
        </motion.div>

        {/* Blog Card */}
        <motion.div
          className="
            flex flex-col items-center justify-center text-center
            bg-white/5 border border-white/10
            p-6 rounded-xl text-white shadow-lg
            hover:shadow-xl transition
            md:w-1/3 lg:w-1/3 flex-shrink-0
            group
          "
          variants={cardItemVariants} // Apply item animation
        >
          <Link
            href="/blog/autodesk-vault-troubleshooting"
            className="flex flex-col items-center gap-3 w-full h-full"
          >
            <FaNewspaper className="text-[#05c8fb] text-4xl mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-xl mb-1">Read Blog</h3>
            <p className="text-sm text-gray-300 leading-relaxed flex-grow">
              Insights & tutorials on software and engineering.
            </p>
            {/* Optional "button" style within the card - replicating hero's filled button */}
            <span
              className="mt-4 bg-[#05c8fb] text-[#0b253f] font-semibold rounded-full px-5 py-2.5 text-sm
                         hover:opacity-90 transition block w-fit"
            >
              Go to Blog
            </span>
          </Link>
        </motion.div>

        {/* Target Market Card */}
        <motion.div
          className="
            flex flex-col items-center justify-center text-center
            bg-white/5 border border-white/10
            p-6 rounded-xl text-white shadow-lg
            hover:shadow-xl transition
            md:w-1/3 lg:w-1/3 flex-shrink-0
            group
          "
          variants={cardItemVariants} // Apply item animation
        >
          <Link href="/targetmarket" className="flex flex-col items-center gap-3 w-full h-full">
            <FaIndustry className="text-[#05c8fb] text-4xl mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-xl mb-1">Target Market</h3>
            <p className="text-sm text-gray-300 leading-relaxed flex-grow">
              Target Markets & 1 file demo workflows.
            </p>
            {/* Optional "button" style within the card - replicating hero's filled button */}
            <span
              className="mt-4 border border-[#05c8fb] rounded-full px-5 py-2.5 text-sm
                         hover:bg-[#05c8fb]/10 transition block w-fit"
            >
              See Markets
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
