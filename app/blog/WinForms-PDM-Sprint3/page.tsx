'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';


/* ────────────────────────────────────────────────────────────
   1 — POST METADATA
   ──────────────────────────────────────────────────────────── */
const post = {
  title:
    'Building a WinForms PDM From Scratch — Our Sprint-3 Journey & 50 % Faster Drawing Retrieval',
  date: '2025-07-08',
  description:
    'How Habasit America slashed drawing-search time in half by layering SOLID architecture, dependency-injection, and three rapid WinForms sprints over a massive CAD library.',
  image: '/images/blog/sbp-pdm-sprint3.jpeg',
  author: 'Thomas Smith',
  tags: [
    'WinForms',
    '.NET 8',
    'Dependency Injection',
    'SOLID',
    'Design Patterns',
    'SDLC',
    'PDM',
    'CAD Automation',
  ],
};

/* ────────────────────────────────────────────────────────────
   2 — MOTION VARIANTS
   ──────────────────────────────────────────────────────────── */
const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

/* ────────────────────────────────────────────────────────────
   3 — HELPER COMPONENTS
   ──────────────────────────────────────────────────────────── */
const PSIBlock: React.FC<{
  problem: string;
  solution: string;
  impact: string;
}> = ({ problem, solution, impact }) => (
  <motion.div variants={textItemVariants} className="mb-4 space-y-1">
    <p className="text-sm sm:text-base text-gray-300">
      <span className="text-red-300 font-semibold">Problem:</span> {problem}
    </p>
    <p className="text-sm sm:text-base text-gray-300">
      <span className="text-green-300 font-semibold">Solution:</span> {solution}
    </p>
    <p className="text-sm sm:text-base text-gray-300">
      <span className="text-[#05c8fb] font-semibold">Impact:</span> {impact}
    </p>
  </motion.div>
);

const StyledListItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <motion.li
    variants={textItemVariants}
    className="relative p-3 border border-white/10 rounded-xl bg-white/5 text-white/90 backdrop-blur-md shadow-inner group overflow-hidden"
  >
    <div className="absolute left-0 top-0 h-full w-1 bg-[#05c8fb] animate-pulse rounded-r" />
    <span className="text-sm sm:text-base leading-relaxed text-[#cbefff] group-hover:text-white transition">
      {children}
    </span>
  </motion.li>
);

const ExpandableSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div variants={textItemVariants} className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 bg-white/10 border border-white/15 rounded-lg text-white font-semibold text-left shadow-md hover:bg-white/20 transition"
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="p-4 border border-white/10 border-t-0 rounded-b-lg bg-white/5 space-y-4">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────
   4 — MAIN COMPONENT
   ──────────────────────────────────────────────────────────── */
export default function WinFormsPdmSprint3Page() {
  const copyLink = async () => {
    try {
      const ta = document.createElement('textarea');
      ta.value = window.location.href;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      alert('Link copied to clipboard!');
    } catch {
      alert('Copy failed — please copy URL manually.');
    }
  };

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto container min-h-screen">
      <motion.article
        initial="hidden"
        animate="show"
        variants={contentVariants}
        className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 lg:p-10 shadow-lg text-gray-300"
      >
        {/* ── Header */}
        <motion.header variants={textItemVariants} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {post.title}
          </h1>
          <p className="text-sm text-gray-400 mb-2">
            By{' '}
            <span className="text-[#05c8fb] font-medium">{post.author}</span> on{' '}
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-base text-gray-300 mb-4">{post.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((t) => (
              <span
                key={t}
                className="bg-[#05c8fb]/20 text-[#05c8fb] text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.header>

        {/* ── Hero */}
        <motion.div variants={textItemVariants} className="w-full mb-8">
          <div className="relative w-full aspect-[16/9] overflow-hidden group rounded-lg">
            <Image
              src={post.image}
              alt="Sprint-3 full UI"
              fill
              sizes="(max-width: 640px) 100vw, 800px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </motion.div>

        {/* ── Intro */}
        <motion.p variants={textItemVariants} className="mb-6 leading-relaxed">
          Special-build belt drawings once hid behind cryptic numbers. By
          introducing attribute-level parsing, a lightning-fast filter panel,
          and clean Dependency Injection (DI), our WinForms PDM now surfaces
          matches in ~2 seconds instead of 5 plus — a 50 % improvement that lets
          engineers reuse instead of redraw.
        </motion.p>

        {/* ── Context card */}
        <motion.section
          variants={contentVariants}
          className="mb-8 p-4 bg-white/5 border border-white/10 rounded-xl shadow-lg"
        >
          <motion.h2
            variants={textItemVariants}
            className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2"
          >
            Project Context
          </motion.h2>

          <motion.p variants={textItemVariants}>
            Habasit America maintains more than 17 000 legacy belt drawings.
            Searching by number alone forced tribal knowledge and slowed
            onboarding. Stakeholders set a KPI to double daily reuse hits within
            one fiscal quarter.
          </motion.p>

          <motion.p variants={textItemVariants}>
            We opted for a lean WinForms MVP because operators already live in
            Windows Explorer and SolidWorks; no new runtime permissions were
            needed. Source code lives in a public GitHub repo{' '}
            <a
              href="https://github.com/tsmithcode/Habasit.DrawingNumberGenerator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#05c8fb] underline"
            >
              (view here)
            </a>
            .
          </motion.p>
        </motion.section>

        {/* ── SDLC WALK-THROUGH */}
        <motion.section variants={contentVariants} className="mb-8">
          <motion.h2
            variants={textItemVariants}
            className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2"
          >
            SDLC Highlights in Three Sprints
          </motion.h2>

          {/* Requirements */}
          <ExpandableSection title="1 · Requirements & Analysis">
            <PSIBlock
              problem="Search limited to filename; junior drafters spent ~5 minutes hunting."
              solution="Break drawing number into 14 attributes (series, width, color, etc.) then expose each as a filterable column."
              impact="Lookup time dropped by half; tribal memory no longer required."
            />

            <ul className="space-y-4">
              <StyledListItem>
                Stakeholder workshops gathered 12 must-have attributes and 8
                nice-to-haves.
              </StyledListItem>
              <StyledListItem>
                Used&nbsp;
                <strong>MoSCoW</strong>
                &nbsp;prioritisation to shape the sprint backlog.
              </StyledListItem>
            </ul>
          </ExpandableSection>

          {/* Design */}
          <ExpandableSection title="2 · Architecture & Design Patterns">
            <StyledListItem>
              <strong>Dependency Injection (DIP)</strong> — 
              <code>Program.cs</code> boots <code>ServiceCollection</code> then
              resolves <code>Form1</code>; forms no longer create their own
              services.
            </StyledListItem>
            <StyledListItem>
              <strong>Repository / Service pattern</strong> — 
              <code>DrawingFileService</code> abstracts JSON vs network lookup.
            </StyledListItem>
            <StyledListItem>
              <strong>Strategy</strong> — 
              <code>IDrawingNumberDecipherService</code> is pluggable for future
              product lines.
            </StyledListItem>
            <StyledListItem>
              SOLID guidance ensures each class has one reason to change.
            </StyledListItem>
          </ExpandableSection>

          {/* Sprint cards */}
          <ExpandableSection title="3 · Sprint-by-Sprint Evolution">
            {/* Sprint-1 */}
            <motion.div variants={textItemVariants}>
              <Image
                src="/images/blog/sbp-pdm-sprint1.jpeg"
                alt="Sprint 1 UI"
                width={800}
                height={450}
                className="rounded-lg mb-2"
              />
              <PSIBlock
                problem="Static filter mock-up, no DI."
                solution="Hooked DataGrid double-buffering & basic search."
                impact="First demo proved concept to leadership."
              />
            </motion.div>

            {/* Sprint-2 */}
            <motion.div variants={textItemVariants}>
              <Image
                src="/images/blog/sbp-pdm-sprint2.jpeg"
                alt="Sprint 2 UI"
                width={800}
                height={450}
                className="rounded-lg mb-2"
              />
              <PSIBlock
                problem="Filters slow with 10 000+ rows."
                solution="Parallel LINQ (PLINQ) on file scan; binding lists."
                impact="Load time dropped from 18 s → 6 s."
              />
            </motion.div>

            {/* Sprint-3 */}
            <motion.div variants={textItemVariants}>
              <Image
                src="/images/blog/sbp-pdm-sprint3.jpeg"
                alt="Sprint 3 UI"
                width={800}
                height={450}
                className="rounded-lg mb-2"
              />
              <PSIBlock
                problem="Context menu & attribute panel missing."
                solution="Added right-click actions, logger, live decipher grid."
                impact="Users complete full lookup + open drawing in under 30 s."
              />
            </motion.div>
          </ExpandableSection>

          {/* Testing */}
          <ExpandableSection title="4 · Testing & Hardening">
            <StyledListItem>
              <code>xUnit</code> tests validate 40 + drawing-number
              permutations.
            </StyledListItem>
            <StyledListItem>
              Smoke-test script ensures DI container builds on startup.
            </StyledListItem>
          </ExpandableSection>

          {/* Deployment */}
          <ExpandableSection title="5 · Deployment & Maintenance">
            <StyledListItem>
              ClickOnce installer to internal file-share; config JSON points to
              <code> K:\ </code> drive.
            </StyledListItem>
            <StyledListItem>
              Serilog sinks to rolling JSON for analytics.
            </StyledListItem>
            <StyledListItem>
              Future: migrate UI to Blazor Hybrid while reusing all services.
            </StyledListItem>
          </ExpandableSection>
        </motion.section>

        {/* Code snippets */}
        <motion.section variants={contentVariants} className="mb-8">
          <motion.h2
            variants={textItemVariants}
            className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2"
          >
            Key Code Excerpts
          </motion.h2>

          <motion.div
            variants={textItemVariants}
            className="bg-white/10 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6"
          >
            <pre>{`// Program.cs — DI bootstrap
var services = new ServiceCollection();
services.AddScoped<IDrawingFileService, DrawingFileService>();
services.AddScoped<IDrawingNumberDecipherService, DrawingNumberDecipherService>();
services.AddHttpClient();
services.AddScoped<Form1>();
using var provider = services.BuildServiceProvider();
Application.Run(provider.GetRequiredService<Form1>());`}</pre>
          </motion.div>

          <motion.div
            variants={textItemVariants}
            className="bg-white/10 p-4 rounded-lg overflow-x-auto font-mono text-sm"
          >
            <pre>{`// DrawingNumberDecipherService.cs — Strategy + SRP
foreach (var (attr, max, lookup) in metadata)
{
    string code = drawingNumber.Substring(idx, max);
    idx += max;
    string value = lookup(code); // maps code → human attr
    result[attr] = (code, value);
    _logger.LogInformation("{Attr}:{Code}->{Val}", attr, code, value);
}`}</pre>
          </motion.div>
        </motion.section>

        {/* Metrics */}
        <motion.section variants={contentVariants} className="mb-8">
          <motion.h2
            variants={textItemVariants}
            className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2"
          >
            Before vs After
          </motion.h2>

          <ul className="space-y-4">
            <StyledListItem>
              <strong>Lookup time</strong> — ~5 min → &lt; 2.5 min (-50 %).
            </StyledListItem>
            <StyledListItem>
              <strong>Daily reused drawings</strong> — 8 → 18 on average.
            </StyledListItem>
            <StyledListItem>
              <strong>Onboarding ramp-up</strong> — 2 weeks → 3 days.
            </StyledListItem>
          </ul>
        </motion.section>

        {/* Closing */}
        <motion.p variants={textItemVariants} className="mb-6">
          Three sprints, clean architecture, and relentless user feedback turned
          a shared drive into an insight-driven PDM. Sprint-4 will layer AI
          suggestions and Blazor-Hybrid UI — stay tuned!
        </motion.p>

        {/* Share */}
        <motion.div
          variants={textItemVariants}
          className="mt-10 pt-6 border-t border-white/10 flex justify-center"
        >
          <button
            onClick={copyLink}
            className="inline-flex items-center px-6 py-3 bg-[#05c8fb] text-white font-medium rounded-lg shadow-lg hover:bg-opacity-90 transition"
          >
            Copy Link to Share
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 5H6a2 2 0 00-2 2v10a2 2 0 002 2h2m4 0h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 0V3h-2v2m0 0V3a2 2 0 012-2h2a2 2 0 012 2v2m0 0v2m0 0H8"
              />
            </svg>
          </button>
        </motion.div>
      </motion.article>
    </section>
  );
}
