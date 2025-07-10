'use client';

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

interface Project {
  title: string;
  tags: string[];
  videoUrl: string;
}

const demoProjects: Project[] = [
  { title: "SLC Airport Automation", tags: ["WinForms","InventorAPI","ExcelAPI"], videoUrl: "https://www.youtube.com/watch?v=9YA3J85JKRI" },
  { title: "Door Frame Configurator", tags: ["CAD","ExcelAPI","Automation"], videoUrl: "https://www.youtube.com/watch?v=EVuWhw88N20" },
  { title: "LED Reveal Accelerator", tags: ["InventorMacro","NoCode"], videoUrl: "https://www.youtube.com/watch?v=wJehm7rSqC4" },
  { title: "LED Automation Tool", tags: ["Macros","PDF","InventorAPI"], videoUrl: "https://www.youtube.com/watch?v=2ce70aH0PmY" },
  { title: "ERP & CRM Web App", tags: ["Blazor","API","NoSQL"], videoUrl: "https://www.youtube.com/watch?v=gWDy964I97Y" },
  { title: "Fry Tools Automation", tags: ["CSharp","InventorAPI","WinForms"], videoUrl: "https://www.youtube.com/watch?v=TsECnuxQhKw" },
  { title: "LED QT BOM ATO Tool", tags: ["Excel","VBA","Sales"], videoUrl: "https://www.youtube.com/watch?v=RKEe9TrNgyE" },
  { title: "BOM Project Info Fill", tags: ["VB.NET","ExcelAPI"], videoUrl: "https://www.youtube.com/watch?v=aHmYna-aanw" },
  { title: "Label Generator", tags: ["ExcelVBA","PDF","Validation"], videoUrl: "https://www.youtube.com/watch?v=ka0wfOce8ps" },
  { title: "Ceiling Trim Tool", tags: ["ERP","Inventor","ExcelAPI"], videoUrl: "https://www.youtube.com/watch?v=gGhLi_qxDZY" },
  { title: "Hourly Allocation Tool", tags: ["Excel","Macro"], videoUrl: "https://www.youtube.com/watch?v=MQNGRKhiU6s" },
  { title: "Ceiling System Automation", tags: ["Inventor","Excel","VBA"], videoUrl: "https://www.youtube.com/watch?v=3i9q_dJqPGk" },
  { title: "Quote Request Web Form", tags: ["Form","Request","Blazor"], videoUrl: "https://www.youtube.com/watch?v=Ye8ihfO-FmE" },
  { title: "Door Frame Automation", tags: ["VisualStudio","Inventor","SQL"], videoUrl: "https://www.youtube.com/watch?v=jXnunvPM9Ec" },
  { title: "3D Quote Tool", tags: ["ERP","VB.NET","Inventor"], videoUrl: "https://www.youtube.com/watch?v=NtwpK8-7Ef0" },
  { title: "Employee Allocation Tool", tags: ["Excel","Validation","Finance"], videoUrl: "https://www.youtube.com/watch?v=jaab3b_ttIo" },
  { title: "LED Quote Tool", tags: ["ERP","VBA","Pricing"], videoUrl: "https://www.youtube.com/watch?v=xmLHainqgVU" },
  { title: "SLC Column Configurator", tags: ["iLogic","Inventor","VB.NET"], videoUrl: "https://www.youtube.com/watch?v=Kl84rkNXGwc" },
  { title: "Frame Generator Form", tags: ["iLogic","GenerativeDesign"], videoUrl: "https://www.youtube.com/watch?v=hvMBMv1JEgg" },
  { title: "Part Number Generator", tags: ["Python","CLI","Automation"], videoUrl: "https://www.youtube.com/watch?v=NWHDp9UDY_0" },
];

const getThumb = (url: string) => {
  const id = new URL(url).searchParams.get("v");
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
};

// ───── Variants ───────────────────────────────────────────────────
const sectionVar: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};
const itemVar:    Variants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const drawerVar:  Variants = {
  hidden: { height: 0, opacity: 0 },
  show:   { height: "auto", opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
};

export default function VideoPlaylist() {
  // Random start video
  const [selectedIdx, setSelectedIdx] = useState(() =>
    Math.floor(Math.random() * demoProjects.length)
  );
  const selected = demoProjects[selectedIdx];

  // Search filter
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      demoProjects.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  // Playlist drawer
  const [open, setOpen] = useState(true);
  const toggle = useCallback(() => setOpen(o => !o), []);
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open]);

  return (
    <motion.section
      className="py-12 px-4 space-y-8"
      variants={sectionVar}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
    >
      {/* ─── PLAYER (matches CombinedFeature sizing) ───────────────── */}
      <motion.div variants={itemVar} className="max-w-4xl mx-auto w-full">
        <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-black">
          <iframe
            key={selected.videoUrl}
            src={`${selected.videoUrl.replace("watch?v=", "embed/")}?autoplay=0&start=0`}
            title={selected.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full h-full"
          />
        </div>
      </motion.div>

      {/* ─── TITLE & TAGS ──────────────────────────────────────────── */}
      <motion.div variants={itemVar} className="max-w-4xl mx-auto w-full space-y-2">
        <h3 className="text-2xl font-semibold text-white">{selected.title}</h3>
        <div className="flex flex-wrap gap-2">
          {selected.tags.map(t => (
            <span
              key={t}
              className="bg-[#05c8fb]/20 text-[#05c8fb] px-2 py-0.5 rounded-full text-xs"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ─── SEARCH & TOGGLE ───────────────────────────────────────── */}
      <motion.div variants={itemVar} className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search project videos…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 bg-white/10 text-white placeholder-gray-400 px-4 py-2 rounded focus:outline-none"
        />
        <button
          onClick={toggle}
          className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition"
        >
          {open ? (
            <>Hide Playlist <ChevronUpIcon className="h-5 w-5" /></>
          ) : (
            <>Show Playlist <ChevronDownIcon className="h-5 w-5" /></>
          )}
        </button>
      </motion.div>

      {/* ─── PLAYLIST (independent sizing) ──────────────────────────── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            variants={drawerVar}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filtered.map((proj, i) => {
              const isSel = i === selectedIdx;
              return (
                <motion.button
                  key={proj.videoUrl}
                  onClick={() => setSelectedIdx(i)}
                  variants={itemVar}
                  className={`
                    flex flex-col bg-white/5 border-2
                    ${isSel ? "border-[#05c8fb]" : "border-white/10"}
                    rounded-lg overflow-hidden hover:shadow-lg transition
                  `}
                >
                  <div className="relative aspect-video w-full">
                    <Image
                      src={getThumb(proj.videoUrl)}
                      alt={proj.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-medium text-white">{proj.title}</h4>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
