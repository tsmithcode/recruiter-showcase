import type { Metadata } from 'next';
import Image from 'next/image';

import RecruiterLink from '@/components/showcase/RecruiterLink';
import { demoStories, getPersonaLabel } from '@/lib/demoStories';

export const metadata: Metadata = {
  title: 'Live Demo Portfolio | Thomas Smith',
  description:
    'A control-tower view of six live demo products plus the recruiter showcase itself, all created from scratch and maintained as one principal-run portfolio system.',
  alternates: {
    canonical: '/demos',
  },
};

export default function DemosPage() {
  return (
    <main id="main-content" className="demo-proof-index pb-20 pt-12 sm:pt-14">
      <section className="showcase-hero border-b border-white/10">
        <div className="showcase-shell relative grid gap-8 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:py-20">
          <div className="space-y-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="showcase-chip">Live demo system</span>
              <span className="showcase-chip">7 live products total</span>
            </div>
            <div className="space-y-4">
              <p className="showcase-eyebrow">Portfolio control tower</p>
              <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">
                Six external products, one showcase, all created from scratch and maintained as one
                principal-run system.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                Thomas Smith is challenging himself as a principal to maintain seven live products at
                once. This site stays the control tower. The six demo apps stay the proof surfaces.
                Together they show differentiated product judgment instead of one repeated portfolio
                claim.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <RecruiterLink
                href="/"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
              >
                Back to showcase
              </RecruiterLink>
              <RecruiterLink
                href="/contexts/full-proof-library"
                className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
              >
                Open full proof library
              </RecruiterLink>
            </div>
          </div>

          <aside className="showcase-panel-strong bg-[#091120]/88">
            <p className="showcase-eyebrow">Operating model</p>
            <div className="mt-4 grid gap-4">
              <div className="showcase-panel-subtle bg-white/[0.05]">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Control tower</p>
                <p className="mt-2 text-base leading-7 text-slate-200">
                  This recruiter-showcase site organizes the narrative, proof order, and trust layer.
                </p>
              </div>
              <div className="showcase-panel-subtle bg-white/[0.05]">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Live proof surfaces</p>
                <p className="mt-2 text-base leading-7 text-slate-200">
                  Each external product proves a different kind of principal-level judgment instead of
                  repeating the same story.
                </p>
              </div>
              <div className="showcase-panel-subtle bg-white/[0.05]">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">CMS note</p>
                <p className="mt-2 text-base leading-7 text-slate-200">
                  These demo pages currently run on local CMS-shaped data while the Storyblok versus
                  Sanity decision is still being finalized.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="showcase-shell showcase-section">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {demoStories.map((story) => (
            <article key={story.id} className="showcase-panel demo-card">
              <div className="space-y-4">
                <div className="demo-poster-stage">
                  <Image
                    src={story.previewImage}
                    alt={story.previewAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="showcase-chip">{story.primaryEyebrow}</span>
                  <span className="showcase-chip demo-chip-wide">
                    {story.framePolicy === 'frameable'
                      ? 'Inline view available'
                      : story.framePolicy === 'protected'
                        ? 'Protected product'
                        : 'External launch only'}
                  </span>
                </div>
                <div className="space-y-3">
                  <p className="showcase-eyebrow demo-chip-wide">{story.brandLabel}</p>
                  <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white">
                    {story.productName}
                  </h2>
                  <p className="text-base leading-7 text-slate-300">{story.oneLineValueProp}</p>
                </div>
                <div className="showcase-panel-subtle bg-white/[0.03]">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Lead persona</p>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    {getPersonaLabel(story.leadPersona)}
                  </p>
                </div>
                <div className="showcase-panel-subtle bg-white/[0.03]">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Distinct proof angle</p>
                  <p className="mt-2 text-sm leading-7 text-slate-200">{story.principalClaim}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <RecruiterLink
                  href={`/demos/${story.slug}`}
                  className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
                >
                  Open demo proof page
                </RecruiterLink>
                <RecruiterLink
                  href={story.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
                >
                  Open live product
                </RecruiterLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
