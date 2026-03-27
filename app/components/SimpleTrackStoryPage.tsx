'use client';

import Link from 'next/link';
import { useState } from 'react';

import type { AudienceTrackContent, CaseStudy, ProofArtifact } from '@/lib/showcaseContent';

type TrackStoryStep = 'summary' | 'focus' | 'proof' | 'evidence' | 'next';

const orderedSteps: TrackStoryStep[] = ['summary', 'focus', 'proof', 'evidence', 'next'];

function stepNumber(step: TrackStoryStep) {
  return orderedSteps.indexOf(step) + 1;
}

export default function SimpleTrackStoryPage({
  content,
  caseStudies,
  proofArtifacts,
}: {
  content: AudienceTrackContent;
  caseStudies: CaseStudy[];
  proofArtifacts: ProofArtifact[];
}) {
  const [step, setStep] = useState<TrackStoryStep>('summary');
  const progress = stepNumber(step);
  const primaryCaseStudy = caseStudies[0];
  const secondaryCaseStudy = caseStudies[1];
  const primaryArtifact = proofArtifacts.find(
    (artifact) => artifact.href !== primaryCaseStudy?.primaryLink?.href
  );

  function goBack() {
    const index = orderedSteps.indexOf(step);
    if (index === 0) {
      return;
    }

    setStep(orderedSteps[index - 1]);
  }

  function goNext() {
    const index = orderedSteps.indexOf(step);
    if (index === orderedSteps.length - 1) {
      return;
    }

    setStep(orderedSteps[index + 1]);
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[linear-gradient(180deg,#f3f5ef_0%,#ecefe6_36%,#e4e9e1_100%)] text-slate-950"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[860px] flex-col px-4 py-4 sm:px-6 sm:py-6">
        <header className="rounded-[1.8rem] border border-slate-300 bg-white/96 px-5 py-4 shadow-[0_18px_70px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Guided review track
              </p>
              <h1 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-2xl">
                {content.label}
              </h1>
            </div>
            <p className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
              Step {progress} of 5
            </p>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-sky-800 transition-[width] duration-200"
              style={{ width: `${(progress / 5) * 100}%` }}
            />
          </div>
        </header>

        <section className="flex flex-1 items-center py-4 sm:py-6">
          <div className="w-full rounded-[2rem] border border-slate-300 bg-white px-5 py-8 shadow-[0_24px_100px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10">
            {step === 'summary' ? (
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Step 1
                  </p>
                  <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                    What this track is for
                  </h2>
                  <p className="max-w-2xl text-lg leading-8 text-slate-700">{content.summary}</p>
                </div>
              </div>
            ) : null}

            {step === 'focus' ? (
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Step 2
                  </p>
                  <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                    What you should look for
                  </h2>
                  <p className="max-w-2xl text-lg leading-8 text-slate-700">
                    {content.recruiterQuestion}
                  </p>
                </div>
                <div className="grid gap-4">
                  {content.focusAreas.slice(0, 3).map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.4rem] border border-slate-300 bg-slate-50 px-5 py-5"
                    >
                      <p className="text-xl font-semibold text-slate-950">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {step === 'proof' ? (
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Step 3
                  </p>
                  <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                    Strongest proof to open first
                  </h2>
                  <p className="max-w-2xl text-lg leading-8 text-slate-700">
                    {primaryCaseStudy?.summary ?? content.summary}
                  </p>
                </div>
                {primaryCaseStudy ? (
                  <Link
                    href={`/case-studies/${primaryCaseStudy.slug}`}
                    className="inline-flex min-h-16 items-center justify-center rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                  >
                    Open {primaryCaseStudy.title}
                  </Link>
                ) : null}
              </div>
            ) : null}

            {step === 'evidence' ? (
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Step 4
                  </p>
                  <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                    Supporting proof
                  </h2>
                  <p className="max-w-2xl text-lg leading-8 text-slate-700">
                    Open one more proof item if you want a little more detail.
                  </p>
                </div>
                <div className="grid gap-4">
                  {secondaryCaseStudy ? (
                    <Link
                      href={`/case-studies/${secondaryCaseStudy.slug}`}
                      className="inline-flex min-h-16 items-center justify-center rounded-[1.6rem] border-2 border-slate-300 bg-white px-6 py-4 text-xl font-semibold text-slate-950 transition hover:border-slate-500"
                    >
                      Open {secondaryCaseStudy.title}
                    </Link>
                  ) : null}
                  {primaryArtifact ? (
                    <Link
                      href={primaryArtifact.href}
                      className="inline-flex min-h-16 items-center justify-center rounded-[1.6rem] border-2 border-slate-300 bg-white px-6 py-4 text-xl font-semibold text-slate-950 transition hover:border-slate-500"
                    >
                      Open {primaryArtifact.title}
                    </Link>
                  ) : null}
                </div>
              </div>
            ) : null}

            {step === 'next' ? (
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Step 5
                  </p>
                  <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                    What would you like to do next?
                  </h2>
                </div>
                <div className="grid gap-4">
                  <Link
                    href={content.ctaHref}
                    className="inline-flex min-h-16 items-center justify-center rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                  >
                    {content.ctaLabel}
                  </Link>
                  <Link
                    href="/contexts/full-proof-library"
                    className="inline-flex min-h-16 items-center justify-center rounded-[1.6rem] border-2 border-slate-300 bg-white px-6 py-4 text-xl font-semibold text-slate-950 transition hover:border-slate-500"
                  >
                    Open full proof library
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex min-h-16 items-center justify-center rounded-[1.6rem] border-2 border-slate-300 bg-white px-6 py-4 text-xl font-semibold text-slate-950 transition hover:border-slate-500"
                  >
                    Go back to guided start
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <footer className="pb-2">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 'summary'}
              className="inline-flex min-h-12 items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Previous page
            </button>
            {step !== 'next' ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex min-h-12 items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500"
              >
                Next page
              </button>
            ) : null}
          </div>
        </footer>
      </div>
    </main>
  );
}
