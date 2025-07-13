// components/DiagonalProjectsMarquee.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Data source: list all your demoProjects here (same as before)
const demoProjects = [
  {
    title: 'SLC Airport Automation',
    tags: ['#WinForms', '#InventorAPI', '#ExcelAPI'],
    videoUrl: 'https://www.youtube.com/watch?v=9YA3J85JKRI',
  },
  {
    title: 'Door Frame Configurator',
    tags: ['#CAD', '#ExcelAPI', '#Automation'],
    videoUrl: 'https://www.youtube.com/watch?v=EVuWhw88N20',
  },
  {
    title: 'LED Reveal Accelerator',
    tags: ['#InventorMacro', '#NoCode'],
    videoUrl: 'https://www.youtube.com/watch?v=wJehm7rSqC4',
  },
  {
    title: 'LED Automation Tool',
    tags: ['#Macros', '#PDF', '#InventorAPI'],
    videoUrl: 'https://www.youtube.com/watch?v=2ce70aH0PmY',
  },
  {
    title: 'ERP & CRM Web App',
    tags: ['#Blazor', '#API', '#NoSQL'],
    videoUrl: 'https://www.youtube.com/watch?v=gWDy964I97Y',
  },
  {
    title: 'Fry Tools Automation',
    tags: ['#CSharp', '#InventorAPI', '#WinForms'],
    videoUrl: 'https://www.youtube.com/watch?v=TsECnuxQhKw',
  },
  {
    title: 'LED QT BOM ATO Tool',
    tags: ['#Excel', '#VBA', '#Sales'],
    videoUrl: 'https://www.youtube.com/watch?v=RKEe9TrNgyE',
  },
  {
    title: 'BOM Project Info Fill',
    tags: ['#VB.NET', '#ExcelAPI'],
    videoUrl: 'https://www.youtube.com/watch?v=aHmYna-aanw',
  },
  {
    title: 'Label Generator',
    tags: ['#ExcelVBA', '#PDF', '#Validation'],
    videoUrl: 'https://www.youtube.com/watch?v=ka0wfOce8ps',
  },
  {
    title: 'Ceiling Trim Tool',
    tags: ['#ERP', '#Inventor', '#ExcelAPI'],
    videoUrl: 'https://www.youtube.com/watch?v=gGhLi_qxDZY',
  },
  {
    title: 'Hourly Allocation Tool',
    tags: ['#Excel', '#Macro'],
    videoUrl: 'https://www.youtube.com/watch?v=MQNGRKhiU6s',
  },
  {
    title: 'Ceiling System Automation',
    tags: ['#Inventor', '#Excel', '#VBA'],
    videoUrl: 'https://www.youtube.com/watch?v=3i9q_dJqPGk',
  },
  {
    title: 'Quote Request Web Form',
    tags: ['#Form', '#Request', '#Blazor'],
    videoUrl: 'https://www.youtube.com/watch?v=Ye8ihfO-FmE',
  },
  {
    title: 'Door Frame Automation',
    tags: ['#VisualStudio', '#Inventor', '#SQL'],
    videoUrl: 'https://www.youtube.com/watch?v=jXnunvPM9Ec',
  },
  {
    title: '3D Quote Tool',
    tags: ['#ERP', '#VB.NET', '#Inventor'],
    videoUrl: 'https://www.youtube.com/watch?v=NtwpK8-7Ef0',
  },
  {
    title: 'Employee Allocation Tool',
    tags: ['#Excel', '#Validation', '#Finance'],
    videoUrl: 'https://www.youtube.com/watch?v=jaab3b_ttIo',
  },
  {
    title: 'LED Quote Tool',
    tags: ['#ERP', '#VBA', '#Pricing'],
    videoUrl: 'https://www.youtube.com/watch?v=xmLHainqgVU',
  },
  {
    title: 'SLC Column Configurator',
    tags: ['#iLogic', '#Inventor', '#VB.NET'],
    videoUrl: 'https://www.youtube.com/watch?v=Kl84rkNXGwc',
  },
  {
    title: 'Frame Generator Form',
    tags: ['#iLogic', '#GenerativeDesign'],
    videoUrl: 'https://www.youtube.com/watch?v=hvMBMv1JEgg',
  },
  {
    title: 'Part Number Generator',
    tags: ['#Python', '#CLI', '#Automation'],
    videoUrl: 'https://www.youtube.com/watch?v=NWHDp9UDY_0',
  },
];

// Helper: extract YouTube thumbnail from a video URL
const getThumb = (url: string) => {
  try {
    const id = new URL(url).searchParams.get('v');
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
  } catch {
    return '';
  }
};

export default function DiagonalProjectsMarquee() {
  // We want to duplicate the entire array twice so that it can scroll seamlessly.
  // On mount, we create a "looped" array of items = [allProjects, allProjects], so by the time the first set scrolls out,
  // the second set is coming in. Once set, it never changes.
  const [loopedProjects, setLoopedProjects] = useState<typeof demoProjects>([]);

  useEffect(() => {
    setLoopedProjects([...demoProjects, ...demoProjects]);
  }, []);

  return (
    <section className="relative w-full h-80 overflow-hidden rounded-xl">
      {/* 
        Container is fixed-height (h-80 here), overflow-hidden.
        Inside: an absolutely positioned "strip" that moves
        from top-left (0,0) down & left (negative) to create diagonal motion.
      */}
      <div
        className="
          absolute
          w-[200%] h-[200%] 
          top-0 left-0
          grid 
          grid-cols-4 
          gap-6 
          p-4 
          animate-diagonal-scroll
        "
      >
        {loopedProjects.map((proj, idx) => (
          <Link
            key={`${proj.title}-${idx}`}
            href={proj.videoUrl}
            target="_blank"
            className="
              relative 
              w-full 
              h-48 
              flex-shrink-0 
              overflow-hidden 
              rounded-lg 
              bg-white/10 
              border border-white/20 
              backdrop-blur-md 
              transition-transform transform hover:scale-[1.02] hover:shadow-lg
            "
          >
            <Image
              src={getThumb(proj.videoUrl)}
              alt={proj.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-2 text-white text-xs">
              <div className="font-semibold">{proj.title}</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {proj.tags.map((t) => (
                  <span key={t} className="bg-[#05c8fb]/30 text-[#05c8fb] rounded-full px-1 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Tailwind custom keyframes injected via arbitrary CSS. */}
      <style jsx>{`
        @keyframes diagonal-scroll {
          0% {
            transform: translate(0%, 0%);
          }
          100% {
            transform: translate(-50%, -50%);
          }
        }
        .animate-diagonal-scroll {
          animation: diagonal-scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
