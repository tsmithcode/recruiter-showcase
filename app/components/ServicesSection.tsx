"use client";

import { FC } from "react";
import {
  FaLaptopCode,
  FaCogs,
  FaCloud,
  FaNetworkWired,
} from "react-icons/fa";

type Service = {
  Icon: FC<{ className?: string }>;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    Icon: FaLaptopCode,
    title: "Custom .NET Solutions",
    description:
      "Building enterprise-grade .NET Core/Blazor applications that scale—reducing time-to-market and maximizing ROI.",
  },
  {
    Icon: FaCogs,
    title: "CAD & Automation Integration",
    description:
      "Seamlessly integrate Inventor API, iLogic, and AutoCAD workflows to automate repetitive engineering tasks and boost throughput.",
  },
  {
    Icon: FaCloud,
    title: "Cloud & DevOps Architecture",
    description:
      "Designing cloud-native infrastructures (Azure & Vercel) with CI/CD pipelines that cut deployment time by 60%.",
  },
  {
    Icon: FaNetworkWired,
    title: "Data & ERP Integrations",
    description:
      "Connecting CRM/ERP (Epicor, SugarCRM, Dynamics NAV) and SQL/NoSQL pipelines to automate end-to-end business workflows.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Services <span className="text-[#05c8fb]">Available</span>
        </h2>
        <span className="text-base text-gray-400">
          {services.length} SERVICES
        </span>
      </header>

      {/* Grid of Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((svc) => (
          <div
            key={svc.title}
            className="
             bg-white/5 border border-white/10
              p-6 
              rounded-xl 
              text-white 
              shadow-lg 
              hover:shadow-xl 
              transition
            "
          >
            <div className="flex-shrink-0 mb-3">
              <svc.Icon className="text-[#05c8fb] text-3xl" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{svc.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {svc.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
