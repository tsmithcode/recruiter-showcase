import { PortfolioContext } from '@/lib/portfolioContent';

import ArtifactBadge from './ArtifactBadge';
import RecruiterLink from './RecruiterLink';

type ContextCardProps = {
  context: PortfolioContext;
};

export default function ContextCard({ context }: ContextCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_80px_rgba(5,12,24,0.2)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(94,234,212,0.14),transparent_38%)] opacity-90" />
      <div className="relative flex h-full flex-col gap-5">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <ArtifactBadge kind="context-page" />
          </div>
          <p className="showcase-eyebrow">{context.audience}</p>
          <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">{context.title}</h3>
          <p className="max-w-xl text-sm leading-7 text-slate-300">{context.summary}</p>
        </div>

        <div className="showcase-rail-list">
          <div className="showcase-rail-item">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Why open this first
            </p>
            <p className="text-sm leading-7 text-slate-300">{context.whyItMatters}</p>
          </div>
          <div className="showcase-rail-item">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Strongest proof</p>
            <p className="text-sm font-medium leading-7 text-slate-100">{context.strongestProof}</p>
          </div>
        </div>

        <RecruiterLink
          href={context.ctaHref}
          eventName="portfolio_context_opened"
          eventPayload={{ context: context.slug }}
          className="mt-auto inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
        >
          {context.ctaLabel}
          <span aria-hidden="true">↗</span>
        </RecruiterLink>
      </div>
    </article>
  );
}
