import { CaseStudy } from '@/lib/showcaseContent';
import { getEditorialSlot } from '@/lib/editorialSlots';

import ArchitectureDiagram from './ArchitectureDiagram';
import EditorialSlotPlate from './EditorialSlotPlate';
import RecruiterLink from './RecruiterLink';
import ZoomableImage from './ZoomableImage';

type CaseStudyPageTemplateProps = {
  caseStudy: CaseStudy;
};

export default function CaseStudyPageTemplate({ caseStudy }: CaseStudyPageTemplateProps) {
  const slot = getEditorialSlot(`case-${caseStudy.slug}`, 'hero-diagram');

  return (
    <main className="showcase-shell pb-16 pt-12 sm:pt-14">
      <article className="showcase-stack">
        <header className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="space-y-6">
            <p className="showcase-eyebrow">{caseStudy.domain}</p>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                {caseStudy.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">{caseStudy.summary}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
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
          </div>

          <div className="showcase-media-stage aspect-[5/4] min-h-[17rem] sm:min-h-[20rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.28),transparent_40%)]" />
            <ZoomableImage
              src={caseStudy.image}
              alt={caseStudy.title}
              sizes="(max-width: 1024px) 100vw, 40vw"
              imageClassName="object-cover mix-blend-screen opacity-80"
              hintLabel="Open case-study image"
            />
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="showcase-panel">
            <p className="showcase-eyebrow">Challenge</p>
            <p className="mt-4 text-lg leading-8 text-white/90">{caseStudy.challenge}</p>
          </div>
          <div className="showcase-panel">
            <p className="showcase-eyebrow">System boundaries</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {caseStudy.systemBoundaries.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-10">
            <div>
              <p className="showcase-eyebrow">Constraints</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {caseStudy.constraints.map((constraint) => (
                  <li key={constraint} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    <span>{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="showcase-eyebrow">Leadership scope</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {caseStudy.leadershipScope.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ArchitectureDiagram
            summary={caseStudy.architectureSummary}
            layers={caseStudy.architectureLayers}
          />
        </section>

        {slot ? (
          <section className="space-y-4">
            <p className="showcase-eyebrow">Editorial diagram</p>
            <EditorialSlotPlate slot={slot} />
          </section>
        ) : null}

        {caseStudy.visualEvidence?.length ? (
          <section className="space-y-6">
            <div className="max-w-3xl space-y-3">
              <p className="showcase-eyebrow">Visual evidence</p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">
                Screens interpreted as product and system proof
              </h2>
              <p className="text-base leading-7 text-slate-300">
                The images are used here as evidence, not decoration. Each one captures something
                different about workflow shape, interface maturity, or system boundaries.
              </p>
            </div>

            <div className="space-y-8">
              {caseStudy.visualEvidence.map((panel, index) => (
                <article key={`${panel.title}-${index}`} className="grid gap-6 border-t border-white/10 py-7 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="space-y-4">
                    <p className="showcase-chip">Frame {index + 1}</p>
                    <h3 className="text-2xl font-semibold text-white">{panel.title}</h3>
                    <p className="text-base leading-7 text-slate-300">{panel.interpretation}</p>
                  </div>

                  <div className="showcase-media-stage aspect-[5/4] min-h-[16rem]">
                    <ZoomableImage
                      src={panel.image}
                      alt={panel.alt}
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      imageClassName="object-cover"
                      hintLabel="Open proof frame"
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="showcase-panel">
            <p className="showcase-eyebrow">Key decisions</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {caseStudy.decisions.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="showcase-panel">
            <p className="showcase-eyebrow">Outcomes</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {caseStudy.outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="flex flex-wrap gap-4 border-t border-white/10 pt-8">
          {caseStudy.primaryLink ? (
            <RecruiterLink
              href={caseStudy.primaryLink.href}
              eventName="supporting_proof_opened"
              eventPayload={{ slug: caseStudy.slug, href: caseStudy.primaryLink.href }}
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
            >
              {caseStudy.primaryLink.label}
            </RecruiterLink>
          ) : null}
          {caseStudy.appendixLinks?.map((link) => (
            <RecruiterLink
              key={link.href}
              href={link.href}
              eventName="supporting_proof_opened"
              eventPayload={{ slug: caseStudy.slug, href: link.href }}
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
            >
              {link.label}
            </RecruiterLink>
          ))}
          <RecruiterLink
            href="/"
            className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
          >
            Back to showcase
          </RecruiterLink>
        </footer>
      </article>
    </main>
  );
}
