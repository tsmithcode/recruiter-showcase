import Link from 'next/link';

import { cadGuardianBranch } from '@/lib/controlCenter';

import ArtifactBadge from './ArtifactBadge';

export default function CadGuardianBranch() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#081223]/88 p-6 shadow-[0_24px_80px_rgba(5,12,24,0.28)]">
      <div className="flex flex-wrap items-center gap-3">
        <ArtifactBadge kind="external-site" />
        <span className="showcase-chip">LLC / C2C</span>
      </div>

      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
        {cadGuardianBranch.title}
      </h3>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
        {cadGuardianBranch.summary}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {cadGuardianBranch.highlights.map((highlight) => (
          <div
            key={highlight}
            className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-200"
          >
            {highlight}
          </div>
        ))}
      </div>

      <Link
        href={cadGuardianBranch.href}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
      >
        Visit CAD Guardian
      </Link>
    </section>
  );
}
