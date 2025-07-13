'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { FaYoutube } from 'react-icons/fa';

interface Project {
  title: string;
  tags: string[];
  videoUrl: string;
}

// ─── Your playlist data ─────────────────────────────────────────────
const demoProjects: Project[] = [
  {
    title: 'SLC Airport Automation',
    tags: ['WinForms', 'InventorAPI', 'ExcelAPI'],
    videoUrl: 'https://www.youtube.com/watch?v=9YA3J85JKRI',
  },
  {
    title: 'Door Frame Configurator',
    tags: ['CAD', 'ExcelAPI', 'Automation'],
    videoUrl: 'https://www.youtube.com/watch?v=EVuWhw88N20',
  },
  {
    title: 'LED Reveal Accelerator',
    tags: ['InventorMacro', 'NoCode'],
    videoUrl: 'https://www.youtube.com/watch?v=wJehm7rSqC4',
  },
  {
    title: 'LED Automation Tool',
    tags: ['Macros', 'PDF', 'InventorAPI'],
    videoUrl: 'https://www.youtube.com/watch?v=2ce70aH0PmY',
  },
  {
    title: 'ERP & CRM Web App',
    tags: ['Blazor', 'API', 'NoSQL'],
    videoUrl: 'https://www.youtube.com/watch?v=gWDy964I97Y',
  },
  {
    title: 'Fry Tools Automation',
    tags: ['CSharp', 'InventorAPI', 'WinForms'],
    videoUrl: 'https://www.youtube.com/watch?v=TsECnuxQhKw',
  },
  {
    title: 'LED QT BOM ATO Tool',
    tags: ['Excel', 'VBA', 'Sales'],
    videoUrl: 'https://www.youtube.com/watch?v=RKEe9TrNgyE',
  },
  {
    title: 'BOM Project Info Fill',
    tags: ['VB.NET', 'ExcelAPI'],
    videoUrl: 'https://www.youtube.com/watch?v=aHmYna-aanw',
  },
  {
    title: 'Label Generator',
    tags: ['ExcelVBA', 'PDF', 'Validation'],
    videoUrl: 'https://www.youtube.com/watch?v=ka0wfOce8ps',
  },
  {
    title: 'Ceiling Trim Tool',
    tags: ['ERP', 'Inventor', 'ExcelAPI'],
    videoUrl: 'https://www.youtube.com/watch?v=gGhLi_qxDZY',
  },
  {
    title: 'Hourly Allocation Tool',
    tags: ['Excel', 'Macro'],
    videoUrl: 'https://www.youtube.com/watch?v=MQNGRKhiU6s',
  },
  {
    title: 'Ceiling System Automation',
    tags: ['Inventor', 'Excel', 'VBA'],
    videoUrl: 'https://www.youtube.com/watch?v=3i9q_dJqPGk',
  },
  {
    title: 'Quote Request Web Form',
    tags: ['Form', 'Request', 'Blazor'],
    videoUrl: 'https://www.youtube.com/watch?v=Ye8ihfO-FmE',
  },
  {
    title: 'Door Frame Automation',
    tags: ['VisualStudio', 'Inventor', 'SQL'],
    videoUrl: 'https://www.youtube.com/watch?v=jXnunvPM9Ec',
  },
  {
    title: '3D Quote Tool',
    tags: ['ERP', 'VB.NET', 'Inventor'],
    videoUrl: 'https://www.youtube.com/watch?v=NtwpK8-7Ef0',
  },
  {
    title: 'Employee Allocation Tool',
    tags: ['Excel', 'Validation', 'Finance'],
    videoUrl: 'https://www.youtube.com/watch?v=jaab3b_ttIo',
  },
  {
    title: 'LED Quote Tool',
    tags: ['ERP', 'VBA', 'Pricing'],
    videoUrl: 'https://www.youtube.com/watch?v=xmLHainqgVU',
  },
  {
    title: 'SLC Column Configurator',
    tags: ['iLogic', 'Inventor', 'VB.NET'],
    videoUrl: 'https://www.youtube.com/watch?v=Kl84rkNXGwc',
  },
  {
    title: 'Frame Generator Form',
    tags: ['iLogic', 'GenerativeDesign'],
    videoUrl: 'https://www.youtube.com/watch?v=hvMBMv1JEgg',
  },
  {
    title: 'Part Number Generator',
    tags: ['Python', 'CLI', 'Automation'],
    videoUrl: 'https://www.youtube.com/watch?v=NWHDp9UDY_0',
  },
];
// Thumbnail helper
const getThumb = (url: string) => {
  try {
    const id = new URL(url).searchParams.get('v');
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
  } catch {
    return '';
  }
};

// Framer-Motion variants
const sectionVar: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};
const itemVar: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};
const drawerVar: Variants = {
  hidden: { height: 0, opacity: 0 },
  show: { height: 'auto', opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
};
const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function VideoPlaylist() {
  const playerRef = useRef<HTMLDivElement>(null);

  // track by URL, not index
  const [selectedUrl, setSelectedUrl] = useState(demoProjects[0].videoUrl);

  // random on mount
  useEffect(() => {
    const rnd = demoProjects[Math.floor(Math.random() * demoProjects.length)];
    setSelectedUrl(rnd.videoUrl);
  }, []);

  // search
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => demoProjects.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  // drawer open/close
  const [open, setOpen] = useState(true);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    if (open) document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open]);

  // find selected
  const selected = demoProjects.find((p) => p.videoUrl === selectedUrl);
  if (!selected) {
    return (
      <div className="p-6 text-center text-white bg-red-900 rounded-lg">
        ⚠️ Oops, selected video not found.
      </div>
    );
  }

  // handle selection + scroll into view
  const onSelect = (url: string) => {
    setSelectedUrl(url);
    setTimeout(() => {
      playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <motion.section
      className="space-y-8 px-4 py-12"
      variants={sectionVar}
      initial="hidden"
      animate="show"
    >
      {/* VIDEO PLAYER */}
      <motion.div ref={playerRef} variants={itemVar} className="mx-auto w-full max-w-4xl">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
          <iframe
            src={`${selected.videoUrl.replace('watch?v=', 'embed/')}?autoplay=0&start=0`}
            title={selected.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full h-full"
          />
        </div>
      </motion.div>

      {/* TITLE & TAGS */}
      <motion.div variants={itemVar} className="mx-auto w-full max-w-4xl space-y-2">
        <h3 className="text-2xl font-semibold text-white">{selected.title}</h3>
        <div className="flex flex-wrap gap-2">
          {selected.tags.map((t) => (
            <span
              key={t}
              className="text-xs bg-[#05c8fb]/20 text-[#05c8fb] px-2 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* SEARCH & TOGGLE */}
      <motion.div
        variants={itemVar}
        className="mx-auto flex w-full max-w-4xl flex-col sm:flex-row items-center gap-4"
      >
        <input
          type="text"
          placeholder="Search videos…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-white/10 px-4 py-2 text-white placeholder-gray-400 rounded focus:outline-none"
        />
        <button
          onClick={toggle}
          className="flex items-center gap-2 rounded bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition"
        >
          {open ? 'Hide Playlist' : 'Show Playlist'}
          {open ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
        </button>
      </motion.div>

      {/* PLAYLIST GRID */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="playlist"
            variants={drawerVar}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="
              mx-auto grid w-full max-w-7xl
              grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4
              gap-6
            "
          >
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-gray-400">No videos found.</div>
            ) : (
              filtered.map((proj) => {
                const isSel = proj.videoUrl === selectedUrl;
                return (
                  <motion.button
                    key={proj.videoUrl}
                    onClick={() => onSelect(proj.videoUrl)}
                    variants={itemVar}
                    className={`
                      flex flex-col rounded-lg border-2 bg-white/5
                      overflow-hidden transition hover:shadow-lg
                      ${isSel ? 'border-[#05c8fb]' : 'border-white/10'}
                    `}
                  >
                    <div className="relative w-full aspect-video bg-gray-800">
                      <Image
                        src={getThumb(proj.videoUrl) || '/placeholder-thumb.png'}
                        alt={proj.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/placeholder-thumb.png';
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="text-sm font-medium text-white">{proj.title}</h4>
                    </div>
                  </motion.button>
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* WATCH FULL PLAYLIST CTA */}
      <motion.div
        key="cta"
        variants={ctaVariants}
        initial="hidden"
        animate="show"
        className="mt-12 flex justify-center"
      >
        <Link
          href="https://www.youtube.com/watch?v=3i9q_dJqPGk&list=PLTgX4AbuosUVuiciOU-sHEua6VC_Gtq8h"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#FF0000]/90 hover:bg-[#FF0000] text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
        >
          <FaYoutube className="h-5 w-5" />
          <span>Watch Full Playlist on YouTube</span>
        </Link>
      </motion.div>
    </motion.section>
  );
}
