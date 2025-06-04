// components/DemoProjects.tsx – Refactored without any animation or motion
"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

// Helper: return a new array of 4 random items from 'arr'
function sampleFour<T>(arr: T[]): T[] {
  if (arr.length <= 4) return [...arr];
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 4);
}

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
  const [showAll, setShowAll] = useState(false);
  // Initialize as empty to avoid hydration mismatch
  const [visibleProjects, setVisibleProjects] = useState<typeof demoProjects>([]);

  // On first client render, pick 4 at random from full list
  useEffect(() => {
    setVisibleProjects(sampleFour(demoProjects));
  }, []);

  // Filter projects by title and tag
  const filtered = useMemo(() => {
    return demoProjects.filter((p) => {
      const matchTitle = p.title
        .toLowerCase()
        .includes(titleQuery.toLowerCase());
      const matchTag = tagQuery
        ? p.tags.some((t) => t.toLowerCase().includes(tagQuery.toLowerCase()))
        : true;
      return matchTitle && matchTag;
    });
  }, [titleQuery, tagQuery]);

  // When filtered or showAll changes, update visibleProjects
  useEffect(() => {
    if (showAll) {
      setVisibleProjects(filtered);
    } else {
      setVisibleProjects(sampleFour(filtered));
    }
  }, [filtered, showAll]);

  // Auto-slideshow: reshuffle every 7 seconds when not showing all
  useEffect(() => {
    if (showAll) return;
    const interval = setInterval(() => {
      setVisibleProjects(sampleFour(filtered));
    }, 7000);
    return () => clearInterval(interval);
  }, [filtered, showAll]);

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          APP <span className="text-[#05c8fb]">VIDEOS</span>
        </h2>
        <span className="text-base text-gray-400">
          {filtered.length} VIDEOS
        </span>
      </header>

      {/* Search Inputs */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title…"
          value={titleQuery}
          onChange={(e) => setTitleQuery(e.target.value)}
          className="bg-white/10 text-white placeholder-gray-400 text-base px-4 py-2 rounded focus:outline-none"
        />
        <input
          type="text"
          placeholder="Search by tag…"
          value={tagQuery}
          onChange={(e) => setTagQuery(e.target.value)}
          className="bg-white/10 text-white placeholder-gray-400 text-base px-4 py-2 rounded focus:outline-none"
        />
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProjects.map((proj) => (
          <div
            key={proj.title}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden flex flex-col transition transform hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(5,200,251,0.15)]"
          >
            <Link href={proj.videoUrl} target="_blank" className="block">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={getThumb(proj.videoUrl)}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 ease-in-out"
                />
              </div>
            </Link>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-semibold text-white text-lg leading-snug mb-2">
                {proj.title}
              </h3>
              <div className="mt-auto flex flex-wrap gap-1">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/5 border border-white/10 backdrop-blur-md bg-[#05c8fb]/10 text-[#05c8fb] text-xs px-2 py-0.5 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Show Less button */}
      {filtered.length > 4 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-[#05c8fb] text-[#0b253f] text-base font-semibold rounded-full px-8 py-2 shadow transition hover:bg-[#05c8fb]/90"
          >
            {showAll
              ? "Show Less"
              : `Show More (${filtered.length - visibleProjects.length} more)`}
          </button>
        </div>
      )}
    </section>
  );
}
