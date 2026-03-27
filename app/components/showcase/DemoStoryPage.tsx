import Image from 'next/image';
import { DemoStory, getPersonaLabel } from '@/lib/demoStories';

import EditorialSlotPlate from './EditorialSlotPlate';
import RecruiterLink from './RecruiterLink';
import DemoViewerShell from './DemoViewerShell';

type DemoStoryPageProps = {
  story: DemoStory;
};

export default function DemoStoryPage({ story }: DemoStoryPageProps) {
  return (
    <main id="main-content" className="demo-proof-page pb-20 pt-12 sm:pt-14">
      <section className="showcase-hero border-b border-white/10">
        <div className="showcase-shell relative grid gap-8 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:py-20">
          <div className="space-y-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="showcase-chip">{story.primaryEyebrow}</span>
              <span className="showcase-chip demo-chip-wide">{story.brandLabel}</span>
            </div>
            <div className="space-y-4">
              <p className="showcase-eyebrow">{story.supportLabel}</p>
              <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">
                {story.productName}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">{story.oneLineValueProp}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="showcase-chip demo-chip-wide">
                Lead persona: {getPersonaLabel(story.leadPersona)}
              </span>
              <span className="showcase-chip demo-chip-wide">
                Secondary: {getPersonaLabel(story.secondaryPersona)}
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <RecruiterLink
                href={story.liveUrl}
                target="_blank"
                rel="noreferrer"
                eventName="demo_live_product_opened"
                eventPayload={{ demo: story.slug, source: 'hero' }}
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
              >
                {story.launchCtaLabel}
              </RecruiterLink>
              <RecruiterLink
                href="/demos"
                className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
              >
                Back to all live demos
              </RecruiterLink>
            </div>
          </div>

          <aside className="showcase-panel-strong bg-[#091120]/88">
            <p className="showcase-eyebrow">Principal proof claim</p>
            <p className="mt-4 text-xl font-semibold leading-8 text-white">{story.principalClaim}</p>
            <div className="mt-6 showcase-panel-subtle bg-white/[0.05]">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Distinct value</p>
              <p className="mt-2 text-base leading-7 text-slate-200">{story.distinctValueLabel}</p>
            </div>
            <div className="showcase-inline-metadata mt-8">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Built from scratch</p>
                <p className="mt-2 text-sm leading-7 text-slate-200">{story.createdFromScratchNote}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Portfolio scale</p>
                <p className="mt-2 text-sm leading-7 text-slate-200">{story.portfolioScaleNote}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Current status</p>
                <p className="mt-2 text-sm leading-7 capitalize text-slate-200">{story.status}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="showcase-shell showcase-section">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="showcase-panel">
            <p className="showcase-eyebrow">What this proves</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {story.whatItProves.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="showcase-panel">
            <p className="showcase-eyebrow">Reviewer lens</p>
            <p className="mt-4 text-lg font-semibold leading-8 text-white">{story.reviewerPrompt}</p>
          </div>
          <div className="showcase-panel">
            <p className="showcase-eyebrow">Why this matters commercially</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {story.commercialWhyItMatters.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="showcase-shell showcase-section pt-0">
        <DemoViewerShell story={story} />
      </section>

      <section className="showcase-shell showcase-section pt-0">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="showcase-panel">
            <p className="showcase-eyebrow">Poster frame</p>
            <div className="demo-poster-stage mt-4">
              <Image
                src={story.previewImage}
                alt={story.previewAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              This screenshot stays in the page even when the live product is frameable, so the proof
              surface still reads cleanly for fast reviewers and for blocked embed scenarios.
            </p>
          </div>

          <div className="space-y-6">
            <div className="showcase-panel">
            <p className="showcase-eyebrow">Metric snapshot</p>
            <div className="mt-4 grid gap-4">
              {story.metrics.map((metric) => (
                <article key={metric.label} className="showcase-panel-subtle bg-white/[0.02]">
                  <p className="text-3xl font-semibold tracking-[-0.05em] text-white">{metric.value}</p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{metric.detail}</p>
                </article>
              ))}
            </div>
            </div>
            <EditorialSlotPlate
              slot={{
                id: `${story.id}-plate`,
                storyId: story.slug,
                slotId: 'hero-proof',
                family: 'demo',
                label: 'Portfolio proof plate',
                title: story.productName,
                questionAnswered: 'Why does this product belong inside a principal-level portfolio?',
                primaryClaim: story.principalClaim,
                caption: story.createdFromScratchNote,
                status: 'live',
                aspectRatio: '16:9',
                surface: 'light',
                sourceStoryIds: [story.slug],
                nodes: [
                  { label: 'Persona', detail: getPersonaLabel(story.leadPersona) },
                  { label: 'Product', detail: story.supportLabel },
                  { label: 'Proof', detail: 'One of seven live products under active maintenance' },
                ],
                ctaLabel: story.launchCtaLabel,
                ctaHref: story.liveUrl,
              }}
            />
            <div className="showcase-panel">
              <p className="showcase-eyebrow">Trust notes</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {story.trustNotes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="showcase-shell showcase-section pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="showcase-panel">
            <p className="showcase-eyebrow">Stay inside the proof system</p>
            <p className="mt-4 text-base leading-7 text-slate-300">
              These demo pages are driven by local CMS-shaped data right now so the front end stays
              stable while the Storyblok versus Sanity decision is still being finalized.
            </p>
          </div>
          <div className="showcase-panel">
            <p className="showcase-eyebrow">Related proof routes</p>
            <div className="mt-4 flex flex-wrap gap-4">
              <RecruiterLink
                href={story.relatedCaseStudyHref}
                eventName="demo_related_proof_opened"
                eventPayload={{ demo: story.slug, source: 'related_case_study' }}
                className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
              >
                Related case study
              </RecruiterLink>
              <RecruiterLink
                href={story.relatedContextHref}
                eventName="demo_related_proof_opened"
                eventPayload={{ demo: story.slug, source: 'related_context' }}
                className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
              >
                Related context
              </RecruiterLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
