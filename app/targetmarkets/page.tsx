// components/TargetMarkets.tsx
'use client';

import React from 'react';
import { targetMarkets, IndustrySection, DemoItem } from '../lib/targetMarkets';

export default function TargetMarkets() {
  return (
    <section className="py-6 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-10">
        Target Markets
      </h2>

      <div className="space-y-12">
        {targetMarkets.map((industry: IndustrySection) => (
          <div key={industry.id} className="bg-[#0f0f0f] rounded-2xl p-6 shadow-lg">
            {/* Industry Title */}
            <h3 className="text-2xl font-semibold text-[#05c8fb] mb-4">{industry.title}</h3>

            {/* Demo List */}
            <ul className="space-y-4">
              {industry.demos.map((demo: DemoItem) => (
                <li
                  key={demo.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
                >
                  <h4 className="text-xl font-medium text-white mb-1">{demo.name}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{demo.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
