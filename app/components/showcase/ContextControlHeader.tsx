'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import {
  buildContextHref,
  getContextLabel,
  getContextPhaseRail,
  isPhaseId,
  isRoleLens,
  roleLenses,
} from '@/lib/controlCenter';
import type { PortfolioContext, PortfolioContextSlug } from '@/lib/portfolioContent';

import { useSearchUI } from './SearchUIProvider';

type ContextControlHeaderProps = {
  context: PortfolioContext;
};

export default function ContextControlHeader({ context }: ContextControlHeaderProps) {
  const searchParams = useSearchParams();
  const { openSearch } = useSearchUI();
  const rawLens = searchParams.get('lens');
  const rawPhase = searchParams.get('phase');
  const lens = isRoleLens(rawLens) ? rawLens : 'business';
  const phase = isPhaseId(rawPhase) ? rawPhase : 'overview';
  const phaseRail = getContextPhaseRail(context.slug);
  const phaseIndex = phaseRail.findIndex((step) => step.id === phase);
  const previousPhase = phaseIndex > 0 ? phaseRail[phaseIndex - 1] : null;
  const nextPhase = phaseIndex < phaseRail.length - 1 ? phaseRail[phaseIndex + 1] : null;
  const fromContext = searchParams.get('fromContext');
  const fromQuery = searchParams.get('fromQuery');
  const rawFromLens = searchParams.get('fromLens');
  const rawFromPhase = searchParams.get('fromPhase');
  const fromLens = isRoleLens(rawFromLens) ? rawFromLens : 'business';
  const fromPhase = isPhaseId(rawFromPhase) ? rawFromPhase : 'overview';
  const returnHref =
    fromContext && fromQuery
      ? buildContextHref(fromContext as PortfolioContextSlug, fromLens, fromPhase, {
          openSearch: '1',
          searchQuery: fromQuery,
          searchScope: searchParams.get('fromScope') ?? 'context',
        })
      : null;

  return (
    <section className="showcase-shell pt-6">
      <div className="control-panel space-y-5 rounded-[1.8rem] border border-white/10 bg-[#07101f]/92 p-4 shadow-[0_24px_80px_rgba(5,12,24,0.32)] sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
              <span>Context</span>
              <span className="text-slate-700">/</span>
              <span className="text-slate-300">{context.title}</span>
              <span className="text-slate-700">/</span>
              <span>{roleLenses.find((entry) => entry.id === lens)?.label}</span>
              <span className="text-slate-700">/</span>
              <span>{phaseRail.find((entry) => entry.id === phase)?.label}</span>
            </div>
            <h2 className="text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">
              {getContextLabel(context.slug)}
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-slate-300">
              Use the lens for who you are speaking to, the phase rail for where you are in the story, and scoped search when you need exact retrieval without leaving the current discussion.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openSearch({ scope: 'context' })}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-100"
          >
            <MagnifyingGlassIcon className="h-4 w-4" />
            Search this context
          </button>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Role lenses</p>
            <div className="flex flex-wrap gap-2">
              {roleLenses.map((entry) => (
                <Link
                  key={entry.id}
                  href={buildContextHref(context.slug, entry.id, phase)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    entry.id === lens
                      ? 'bg-white text-slate-950'
                      : 'border border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {entry.label}
                </Link>
              ))}
            </div>
            <p className="text-sm leading-7 text-slate-400">
              {roleLenses.find((entry) => entry.id === lens)?.description}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Phase rail</p>
              <div className="flex items-center gap-2">
                {previousPhase ? (
                  <Link
                    href={buildContextHref(context.slug, lens, previousPhase.id, undefined, previousPhase.sectionIds[0])}
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
                  >
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                    Back
                  </Link>
                ) : null}
                {nextPhase ? (
                  <Link
                    href={buildContextHref(context.slug, lens, nextPhase.id, undefined, nextPhase.sectionIds[0])}
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
                  >
                    Forward
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {phaseRail.map((step) => (
                <Link
                  key={step.id}
                  href={buildContextHref(context.slug, lens, step.id, undefined, step.sectionIds[0])}
                  className={`min-w-[11.5rem] flex-1 rounded-[1.2rem] border px-3 py-3 transition sm:min-w-[10rem] ${
                    step.id === phase
                      ? 'border-cyan-300/60 bg-cyan-400/8'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <p className="text-sm font-semibold text-white">{step.label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{step.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {returnHref ? (
          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Return trail</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Jumped here from a prior search. You can reopen that scoped search without losing the current thread.
                </p>
              </div>
              <Link
                href={returnHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-100"
              >
                Back to results
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
