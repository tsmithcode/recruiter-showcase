// app/(pages)/hire/page.tsx
"use client";

import Link from "next/link";
import { FaHandshake, FaCogs, FaCube, FaRocket } from "react-icons/fa";

export default function HireMePage() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto container">
      {/* ---------- Hero ---------- */}
      <header className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Hire <span className="text-[#05c8fb]">Thomas Smith</span>
        </h2>
        <p className="text-gray-400 text-base mb-6">
          👋 Atlanta-based engineer blending <span className="text-[#05c8fb] font-semibold">CAD automation</span>,{" "}
          <span className="text-[#05c8fb] font-semibold">.NET full-stack</span>, and{" "}
          <span className="text-[#05c8fb] font-semibold">cloud-native DevOps</span> to ship measurable ROI in weeks, not months.
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="mailto:job@tsmithcode.ai?subject=Project Inquiry&body=Hi Thomas,%0D%0A%0D%0ALet’s discuss…"
            className="bg-[#05c8fb] text-[#0b253f] font-semibold rounded-full px-6 py-2 shadow hover:bg-[#05c8fb]/90 transition focus:outline-none focus:ring-2 focus:ring-[#05c8fb]"
          >
            📧 Start a Conversation
          </Link>
          <Link
            href="/resume"
            className="bg-transparent border border-white/20 text-gray-300 font-medium rounded-md px-4 py-2 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-[#05c8fb]"
          >
            📄 Download Resume
          </Link>
        </div>
      </header>

      {/* ---------- Engagement Models ---------- */}
      <div className="mb-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: <FaHandshake className="text-3xl text-[#05c8fb]" />,
            title: "Fractional Engineering",
            text: "Plug-in leadership for sprints, migrations, or automation roll-outs (10–20 hrs/week).",
          },
          {
            icon: <FaCogs className="text-3xl text-[#05c8fb]" />,
            title: ".NET Feature Builds",
            text: "Green- or brown-field modules in Blazor, API, SQL, or cloud micro-services.",
          },
          {
            icon: <FaCube className="text-3xl text-[#05c8fb]" />,
            title: "CAD Workflow Automation",
            text: "Inventor / SolidWorks generators, Excel BOM macros, CPQ configurators.",
          },
          {
            icon: <FaRocket className="text-3xl text-[#05c8fb]" />,
            title: "End-to-End Product Launch",
            text: "Discovery → MVP → CI/CD → KPI dashboards. Scoped, sprint-driven delivery.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="
              bg-white/5 border border-white/10
              p-6 rounded-xl text-white
              shadow-lg hover:shadow-xl transition
            "
          >
            <div className="mb-4">{card.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {card.text}
            </p>
          </div>
        ))}
      </div>

      {/* ---------- Process ---------- */}
      <h3 className="text-white font-bold text-2xl mb-4">
        My <span className="text-[#05c8fb]">4-Step&nbsp;Process</span>
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          {
            n: "1",
            title: "Discovery",
            text: "Stakeholder goals, constraints, tech audit, success metrics.",
          },
          {
            n: "2",
            title: "Architecture & Estimate",
            text: "Solution design, timeline, transparent pricing & risk log.",
          },
          {
            n: "3",
            title: "Build & Automate",
            text: "Agile sprints, CI/CD, unit tests, weekly demo videos.",
          },
          {
            n: "4",
            title: "Launch & Iterate",
            text: "KPI dashboard, docs / training, continuous-improvement roadmap.",
          },
        ].map((step) => (
          <div
            key={step.n}
            className="
              bg-white/5 border border-white/10
              p-6 rounded-xl text-white
              shadow-lg hover:shadow-xl transition
            "
          >
            <span className="block text-[#05c8fb] text-4xl font-bold mb-3">
              {step.n}
            </span>
            <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {step.text}
            </p>
          </div>
        ))}
      </div>

      {/* ---------- Pricing Bands ---------- */}
      <h3 className="text-white font-bold text-2xl mb-4">
        Transparent <span className="text-[#05c8fb]">Pricing</span>
      </h3>
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        {[
          {
            band: "Operations Support",
            price: "$60 – $100 / hr",
            desc: "Legacy script maintenance, data cleanup, reports.",
          },
          {
            band: "Cloud-Native Services",
            price: "$90 – $140 / hr",
            desc: "API builds, front-end SPA, CI/CD, Azure or Vercel infra.",
          },
          {
            band: "Advanced Automation",
            price: "$120 – $160+ / hr",
            desc: "CAD generators, CPQ engines, ERP integrations with measurable ROI.",
          },
        ].map((tier) => (
          <div
            key={tier.band}
            className="
              bg-white/5 border border-white/10
              p-6 rounded-xl text-white
              shadow-lg hover:shadow-xl transition
            "
          >
            <h4 className="font-semibold text-lg mb-1">{tier.band}</h4>
            <p className="text-[#05c8fb] font-bold text-xl mb-2">
              {tier.price}
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {tier.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ---------- Call-to-Action ---------- */}
      <div className="text-center">
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
          Ready to discuss your project? Let’s book a quick intro call — no obligations.
        </p>
        <Link
          href="https://calendly.com/tsmithcode/intro"
          className="bg-[#05c8fb] text-[#0b253f] font-semibold rounded-full px-6 py-2 shadow hover:bg-[#05c8fb]/90 transition focus:outline-none focus:ring-2 focus:ring-[#05c8fb]"
        >
          📅 Schedule 15 min Chat
        </Link>
      </div>
    </section>
  );
}
