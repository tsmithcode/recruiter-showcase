import { CaseStudy } from '@/lib/showcaseContent';

import ArtifactBadge from './ArtifactBadge';
import RecruiterLink from './RecruiterLink';
import ZoomableImage from './ZoomableImage';

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <article className="grid gap-6 border-t border-white/10 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div className="space-y-5">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <ArtifactBadge kind="case-study" />
          </div>
          <p className="showcase-eyebrow">{caseStudy.domain}</p>
          <h3 className="max-w-3xl text-2xl font-semibold tracking-[-0.04em] text-white sm:text-[2rem]">
            {caseStudy.title}
          </h3>
          <p className="max-w-2xl text-base leading-7 text-slate-300">{caseStudy.summary}</p>
        </div>

        <div className="showcase-inline-metadata">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Timeline</p>
            <p className="mt-2 text-sm text-slate-200">{caseStudy.timeline}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Role</p>
            <p className="mt-2 text-sm text-slate-200">{caseStudy.role}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Proof type</p>
            <p className="mt-2 text-sm text-slate-200">{caseStudy.proofType}</p>
          </div>
        </div>

        <ul className="grid gap-3 text-sm text-slate-300">
          {caseStudy.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-4 pt-2">
          <RecruiterLink
            href={`/case-studies/${caseStudy.slug}`}
            eventName="case_study_opened"
            eventPayload={{ slug: caseStudy.slug }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
          >
            Read case study
          </RecruiterLink>

          {caseStudy.primaryLink ? (
            <RecruiterLink
              href={caseStudy.primaryLink.href}
              eventName="supporting_proof_opened"
              eventPayload={{ slug: caseStudy.slug, href: caseStudy.primaryLink.href }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
            >
              {caseStudy.primaryLink.label}
            </RecruiterLink>
          ) : null}
        </div>
      </div>

      <div className="showcase-media-stage aspect-[5/4] min-h-[16rem] lg:sticky lg:top-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.25),transparent_40%)]" />
        <ZoomableImage
          src={caseStudy.image}
          alt={caseStudy.title}
          sizes="(max-width: 1024px) 100vw, 35vw"
          imageClassName="object-cover mix-blend-screen opacity-80"
          hintLabel="Open preview"
        />
      </div>
    </article>
  );
}
