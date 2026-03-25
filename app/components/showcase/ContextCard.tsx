import { PortfolioContext } from '@/lib/portfolioContent';

import ArtifactBadge from './ArtifactBadge';
import RecruiterLink from './RecruiterLink';

type ContextCardProps = {
  context: PortfolioContext;
};

export default function ContextCard({ context }: ContextCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(5,12,24,0.24)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(94,234,212,0.12),transparent_38%)] opacity-90" />
      <div className="relative space-y-4">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <ArtifactBadge kind="context-page" />
          </div>
          <p className="showcase-eyebrow">{context.audience}</p>
          <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">{context.title}</h3>
          <p className="text-sm leading-7 text-slate-300">{context.summary}</p>
        </div>

        <div className="showcase-panel-subtle bg-[#091120]/70">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Why open this first</p>
          <p className="mt-2 text-sm leading-7 text-slate-300">{context.whyItMatters}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Strongest proof</p>
          <p className="mt-2 text-sm font-medium leading-7 text-slate-100">{context.strongestProof}</p>
        </div>

        <RecruiterLink
          href={context.ctaHref}
          eventName="portfolio_context_opened"
          eventPayload={{ context: context.slug }}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
        >
          {context.ctaLabel}
          <span aria-hidden="true">↗</span>
        </RecruiterLink>
      </div>
    </article>
  );
}
