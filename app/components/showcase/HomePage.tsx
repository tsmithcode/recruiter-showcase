import { portfolioContexts, getFeaturedAutodeskVideos } from '@/lib/portfolioContent';
import { cadGuardianBranch } from '@/lib/controlCenter';
import {
  caseStudies,
  domainSignals,
  principalMetrics,
  proofArtifacts,
} from '@/lib/showcaseContent';

import CaseStudyCard from './CaseStudyCard';
import ContextCard from './ContextCard';
import ProofLibrary from './ProofLibrary';
import RecruiterLink from './RecruiterLink';
import SearchTriggerButton from './SearchTriggerButton';
import SectionHeading from './SectionHeading';

export default function HomePage() {
  const featuredCaseStudies = caseStudies.slice(0, 2);
  const featuredProof = proofArtifacts.slice(0, 6);
  const featuredContexts = [...portfolioContexts].sort((a, b) => a.priority - b.priority);
  const featuredVideos = getFeaturedAutodeskVideos().slice(0, 3);

  return (
    <main className="pb-20">
      <section className="showcase-hero">
        <div className="showcase-shell relative z-10 grid gap-10 py-14 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:py-24">
          <div className="space-y-9">
            <p className="showcase-eyebrow">Multi-context recruiter showcase</p>
            <div className="space-y-6">
              <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.065em] text-white sm:text-7xl">
                Principal software and Autodesk systems proof, routed by context instead of buried
                in one story.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Thomas Smith builds workflow systems, operator tooling, Autodesk-centered
                automation, and integration-heavy software. Start with the path that matches what
                your interview or hiring context actually cares about.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <RecruiterLink
                href="/contexts/qts-suwanee"
                eventName="portfolio_context_opened"
                eventPayload={{ context: 'qts-suwanee', source: 'homepage_hero' }}
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
              >
                Open the QTS Suwanee focus
              </RecruiterLink>
              <RecruiterLink
                href="/contexts/openai"
                eventName="portfolio_context_opened"
                eventPayload={{ context: 'openai', source: 'homepage_hero' }}
                className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
              >
                Review the OpenAI path
              </RecruiterLink>
              <SearchTriggerButton
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-100"
                label="Search the portfolio"
              />
            </div>

            <div className="grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
              {principalMetrics.slice(0, 3).map((metric) => (
                <div key={metric.label}>
                  <p className="text-3xl font-semibold tracking-[-0.05em] text-white">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-100">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase-panel-strong backdrop-blur">
            <p className="showcase-eyebrow">Start here</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.05em] text-white">
              One narrative system, intentionally routed for different enterprise reads.
            </h2>
            <div className="mt-6 showcase-rail-list">
              <div className="showcase-rail-item">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Who this is for
                </p>
                <p className="text-base leading-7 text-slate-200">
                  Recruiters, hiring managers, and technical leaders who need proof fast without
                  losing architectural depth.
                </p>
              </div>
              <div className="showcase-rail-item">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Best route</p>
                <p className="text-base leading-7 text-slate-200">
                  QTS for governed construction systems. OpenAI for B2B workflow products. Autodesk
                  for the full CAD and automation archive.
                </p>
              </div>
              <div className="showcase-rail-item">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Reading order</p>
                <p className="text-base leading-7 text-slate-200">
                  Orientation first, flagship proof second, supporting library third. The depth is
                  still there; the entry point is disciplined.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="showcase-shell showcase-section grid gap-5 border-t border-white/8 sm:grid-cols-2 xl:grid-cols-4">
        {principalMetrics.map((metric) => (
          <div key={metric.label} className="border-t border-white/10 py-5">
            <p className="text-4xl font-semibold tracking-[-0.05em] text-white">{metric.value}</p>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-100">{metric.label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">{metric.detail}</p>
          </div>
        ))}
      </section>

      <section className="showcase-shell showcase-section space-y-8">
        <SectionHeading
          eyebrow="Choose your context"
          title="Guided entry points for different interview and recruiter reads"
          description="Each context routes to a focused narrative. The content underneath is shared and preserved, but the ordering changes so the right proof appears first."
        />
        <div className="grid gap-5 xl:grid-cols-2">
          {featuredContexts.map((context) => (
            <ContextCard key={context.slug} context={context} />
          ))}
        </div>
      </section>

      <section className="showcase-shell showcase-section space-y-8">
        <SectionHeading
          eyebrow="Operating profile"
          title="The same patterns repeat across the work"
          description="The stack changes by domain. The operating model stays consistent: clarify the real decision logic, reduce operator friction, and protect reliability with structure."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="showcase-panel">
            <p className="showcase-eyebrow">Where the work lands</p>
            <div className="mt-6 space-y-6">
              {domainSignals.map((signal) => (
                <div
                  key={signal.title}
                  className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
                >
                  <h3 className="text-xl font-semibold text-white">{signal.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{signal.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase-panel">
            <p className="showcase-eyebrow">Preserved depth</p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>Case studies stay public and remain the main architecture narratives.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>
                  The Autodesk video archive is still accessible, now through a focused page.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>
                  The older long-form material and skills depth remain in the full proof library.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="showcase-shell showcase-section space-y-8">
        <SectionHeading
          eyebrow="Flagship proof"
          title="Case studies first"
          description="These pages carry the strongest signal because they explain architecture, operating constraints, and outcomes without burying the point."
        />
        <div>
          {featuredCaseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </section>

      <section className="showcase-shell showcase-section space-y-8">
        <SectionHeading
          eyebrow="Autodesk proof"
          title="The video archive now has a focused home"
          description="The homepage only surfaces the strongest few. The full Autodesk library lives behind its own context page so interviewers can stay in that lane."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {featuredVideos.map((video) => (
            <article key={video.id} className="showcase-panel-subtle">
              <div className="flex flex-wrap gap-2">
                {video.stackTags.slice(0, 3).map((tag) => (
                  <span key={tag} className="showcase-chip">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{video.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{video.whatItProves}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <RecruiterLink
                  href={video.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  eventName="autodesk_video_opened"
                  eventPayload={{ video: video.id, source: 'homepage' }}
                  className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
                >
                  Open video
                </RecruiterLink>
                <RecruiterLink
                  href="/contexts/autodesk-cad"
                  eventName="portfolio_context_opened"
                  eventPayload={{ context: 'autodesk-cad', source: 'homepage_video_section' }}
                  className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
                >
                  Open Autodesk page
                </RecruiterLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="showcase-shell showcase-section space-y-8">
        <SectionHeading
          eyebrow="Supporting evidence"
          title="Archive depth remains available"
          description="The older proof has not disappeared. It now sits behind a cleaner routing layer so people can go as deep as they need."
        />
        <ProofLibrary artifacts={featuredProof} />
      </section>

      <section className="showcase-shell py-10">
        <div className="showcase-panel-strong">
          <div className="flex flex-wrap items-center gap-3">
            <span className="showcase-chip">External business branch</span>
            <span className="showcase-chip">LLC / C2C</span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
            CAD Guardian for C2C opportunities
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            {cadGuardianBranch.summary}
          </p>
          <RecruiterLink
            href={cadGuardianBranch.href}
            target="_blank"
            rel="noreferrer"
            eventName="external_branch_opened"
            eventPayload={{ branch: 'cad-guardian', source: 'homepage' }}
            className="mt-4 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
          >
            Visit CAD Guardian
          </RecruiterLink>
        </div>
      </section>

      <section className="showcase-shell py-16">
        <div className="showcase-banner">
          <div className="space-y-3">
            <p className="showcase-eyebrow">Action</p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Multi-context onboarding up front, full proof depth still intact.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-300">
              Start with the context that matches the interview, then use the case studies, Autodesk
              proof, and full library to go deeper without losing the narrative.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <RecruiterLink
              href="/documents/thomas-smith-architect-resume-2026.pdf"
              target="_blank"
              rel="noreferrer"
              eventName="resume_clicked"
              eventPayload={{ source: 'homepage_footer' }}
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
            >
              Open resume
            </RecruiterLink>
            <RecruiterLink
              href="/contexts/full-proof-library"
              eventName="portfolio_context_opened"
              eventPayload={{ context: 'full-proof-library', source: 'homepage_footer' }}
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
            >
              Browse full proof library
            </RecruiterLink>
          </div>
        </div>
      </section>
    </main>
  );
}
