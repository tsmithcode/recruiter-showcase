// components/DemoProjects.tsx – YouTube thumbnails clickable, finished component
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const demoProjects = [
  {
    title: "SLC Airport Automation",
    tags: ["#WinForms", "#InventorAPI", "#ExcelAPI"],
    videoUrl: "https://www.youtube.com/watch?v=9YA3J85JKRI",
  },
  {
    title: "Door Frame Configurator",
    tags: ["#CAD", "#ExcelAPI", "#Automation"],
    videoUrl: "https://www.youtube.com/watch?v=EVuWhw88N20",
  },
  {
    title: "LED Reveal Accelerator",
    tags: ["#InventorMacro", "#NoCode"],
    videoUrl: "https://www.youtube.com/watch?v=wJehm7rSqC4",
  },
  {
    title: "LED Automation Tool",
    tags: ["#Macros", "#PDF", "#InventorAPI"],
    videoUrl: "https://www.youtube.com/watch?v=2ce70aH0PmY",
  },
  {
    title: "ERP & CRM Web App",
    tags: ["#Blazor", "#API", "#NoSQL"],
    videoUrl: "https://www.youtube.com/watch?v=gWDy964I97Y",
  },
  {
    title: "Fry Tools Automation",
    tags: ["#CSharp", "#InventorAPI", "#WinForms"],
    videoUrl: "https://www.youtube.com/watch?v=TsECnuxQhKw",
  },
  {
    title: "LED QT BOM ATO Tool",
    tags: ["#Excel", "#VBA", "#Sales"],
    videoUrl: "https://www.youtube.com/watch?v=RKEe9TrNgyE",
  },
  {
    title: "BOM Project Info Fill",
    tags: ["#VB.NET", "#ExcelAPI"],
    videoUrl: "https://www.youtube.com/watch?v=aHmYna-aanw",
  },
  {
    title: "Label Generator",
    tags: ["#ExcelVBA", "#PDF", "#Validation"],
    videoUrl: "https://www.youtube.com/watch?v=ka0wfOce8ps",
  },
  {
    title: "Ceiling Trim Tool",
    tags: ["#ERP", "#Inventor", "#ExcelAPI"],
    videoUrl: "https://www.youtube.com/watch?v=gGhLi_qxDZY",
  },
  {
    title: "Hourly Allocation Tool",
    tags: ["#Excel", "#Macro"],
    videoUrl: "https://www.youtube.com/watch?v=MQNGRKhiU6s",
  },
  {
    title: "Ceiling System Automation",
    tags: ["#Inventor", "#Excel", "#VBA"],
    videoUrl: "https://www.youtube.com/watch?v=3i9q_dJqPGk",
  },
  {
    title: "Quote Request Web Form",
    tags: ["#Form", "#Request", "#Blazor"],
    videoUrl: "https://www.youtube.com/watch?v=Ye8ihfO-FmE",
  },
  {
    title: "Door Frame Automation",
    tags: ["#VisualStudio", "#Inventor", "#SQL"],
    videoUrl: "https://www.youtube.com/watch?v=jXnunvPM9Ec",
  },
  {
    title: "3D Quote Tool",
    tags: ["#ERP", "#VB.NET", "#Inventor"],
    videoUrl: "https://www.youtube.com/watch?v=NtwpK8-7Ef0",
  },
  {
    title: "Employee Allocation Tool",
    tags: ["#Excel", "#Validation", "#Finance"],
    videoUrl: "https://www.youtube.com/watch?v=jaab3b_ttIo",
  },
  {
    title: "LED Quote Tool",
    tags: ["#ERP", "#VBA", "#Pricing"],
    videoUrl: "https://www.youtube.com/watch?v=xmLHainqgVU",
  },
  {
    title: "SLC Column Configurator",
    tags: ["#iLogic", "#Inventor", "#VB.NET"],
    videoUrl: "https://www.youtube.com/watch?v=Kl84rkNXGwc",
  },
  {
    title: "Frame Generator Form",
    tags: ["#iLogic", "#GenerativeDesign"],
    videoUrl: "https://www.youtube.com/watch?v=hvMBMv1JEgg",
  },
  {
    title: "Part Number Generator",
    tags: ["#Python", "#CLI", "#Automation"],
    videoUrl: "https://www.youtube.com/watch?v=NWHDp9UDY_0",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: (i % 9) * 0.05, duration: 0.4 },
  }),
};

const getThumb = (url: string) => {
  try {
    const id = new URL(url).searchParams.get("v");
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
  } catch {
    return "";
  }
};

export default function DemoProjects() {
  const [titleQuery, setTitleQuery] = useState("");
  const [tagQuery, setTagQuery] = useState("");
  const [itemsToShow, setItemsToShow] = useState(12);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    return demoProjects.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(titleQuery.toLowerCase());
      const matchTag = tagQuery
        ? p.tags.some((t) => t.toLowerCase().includes(tagQuery.toLowerCase()))
        : true;
      return matchTitle && matchTag;
    });
  }, [titleQuery, tagQuery]);

  const visible = useMemo(() => filtered.slice(0, itemsToShow), [filtered, itemsToShow]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setItemsToShow((prev) => Math.min(prev + 6, filtered.length));
      }
    });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [filtered.length]);

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <header className="mb-6 flex items-end justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-white">
          TODAY'S <span className="text-[#05c8fb]">VIDEOS</span>
        </h2>
        <span className="text-sm text-gray-400">{filtered.length} VIDEOS</span>
      </header>

      {/* Search */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title…"
          value={titleQuery}
          onChange={(e) => setTitleQuery(e.target.value)}
          className="bg-white/10 text-white placeholder-gray-400 px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Search by tag…"
          value={tagQuery}
          onChange={(e) => setTagQuery(e.target.value)}
          className="bg-white/10 text-white placeholder-gray-400 px-3 py-2 rounded"
        />
      </div>

      {/* Grid */}
      <div className="project-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {visible.map((proj, i) => (
    <motion.div
      key={proj.title}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      custom={i}
      className="project-card bg-white/5 rounded-xl p-4 flex flex-col transition transform hover:scale-[1.015] hover:shadow-[0_6px_16px_rgba(5,200,251,0.15)]"
    >
      <Link href={proj.videoUrl} target="_blank" className="block group">
        <div className="relative aspect-video rounded-lg mb-3 overflow-hidden">
          <Image
            src={getThumb(proj.videoUrl)}
            alt={proj.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-[1.05] transition-transform duration-300 ease-in-out"
          />
        </div>
      </Link>

      <h3 className="font-semibold text-white text-[14px] sm:text-sm leading-snug mb-1 line-clamp-2">
        {proj.title}
      </h3>

      <div className="flex flex-wrap gap-1">
        {proj.tags.map((tag) => (
          <span
            key={tag}
            className="bg-[#05c8fb]/10 text-[#05c8fb] text-[11px] px-2 py-0.5 rounded-full font-medium tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  ))}
</div>


      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-8" />
    </section>
  );
}

