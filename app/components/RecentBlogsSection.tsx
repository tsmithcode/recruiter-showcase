'use client';

import { FC } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  FaTools,
  FaCubes,
} from 'react-icons/fa';

type BlogItem = {
  Icon: FC<{ className?: string }>;
  title: string;
  description: string;
  href: string;
};

const blogItems: BlogItem[] = [
  {
    Icon: FaTools,
    title: 'Troubleshooting Autodesk Vault View & Job Processor Issues',
    description:
      'A deep dive into common Autodesk Vault View and Job Processor challenges, with proven best practices to keep your PDM humming.',
    href: '/blog/autodesk-vault-troubleshooting',
  },
  {
    Icon: FaCubes,
    title: 'Building a WinForms PDM From Scratch',
    description:
      'How we slashed drawing-search time by 50%+ with three rapid sprints, SOLID design, and DI in a WinForms PDM.',
    href: '/blog/WinForms-PDM-Sprint3',
  },
];

// ─── Motion Variants ─────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// ─── Component ──────────────────────────────────────────────────────────
export default function RecentBlogsSection() {
  return (
    <motion.section
      className="py-12 px-4 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      {/* Header */}
      <motion.header
        className="mt-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
        variants={itemVariants}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Recent <span className="text-[#05c8fb]">Blogs</span>
        </h2>
      </motion.header>

      {/* Blog Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogItems.map(({ Icon, title, description, href }) => (
          <motion.article
            key={title}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-gray-300 shadow-lg hover:shadow-xl transition"
            variants={itemVariants}
          >
            <Icon className="text-[#05c8fb] text-3xl mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm leading-relaxed mb-4">{description}</p>
            {/* Link no longer needs nested <a> */}
            <Link
              href={href}
              className="inline-block text-[#05c8fb] font-medium hover:underline"
            >
              Read More →
            </Link>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
