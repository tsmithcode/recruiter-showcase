'use client';

import Link from 'next/link';
import { useState } from 'react';

import { cpqScenarios, type CpqScenarioId } from '@/lib/cpqProof';

type CpqStoryStep = 'summary' | 'logic' | 'workflow' | 'evidence' | 'next';

const orderedSteps: CpqStoryStep[] = ['summary', 'logic', 'workflow', 'evidence', 'next'];

function stepNumber(step: CpqStoryStep) {
  return orderedSteps.indexOf(step) + 1;
}

export default function SimpleCpqStoryPage() {
  const [step, setStep] = useState<CpqStoryStep>('summary');
  const [selectedScenario, setSelectedScenario] = useState<CpqScenarioId>('software');
  const scenario = cpqScenarios[selectedScenario];
  const progress = stepNumber(step);

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
                Guided CPQ proof
              </p>
              <h1 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-2xl">
                One pricing story at a time
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
                    What this proof shows
                  </h2>
                  <p className="max-w-2xl text-lg leading-8 text-slate-700">
                    This page explains how pricing rules, role-based review, and commercial logic
                    can be shown clearly instead of being hidden in a spreadsheet or a pitch deck.
                  </p>
                </div>
                <div className="grid gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedScenario('software')}
                    className="rounded-[1.6rem] border-2 border-slate-300 bg-white px-5 py-5 text-left transition hover:border-sky-700"
                  >
                    <span className="block text-2xl font-semibold text-slate-950">
                      Software sales
                    </span>
                    <span className="mt-2 block text-base leading-7 text-slate-700">
                      Best fit for workflow product and internal-tools review.
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedScenario('construction')}
                    className="rounded-[1.6rem] border-2 border-slate-300 bg-white px-5 py-5 text-left transition hover:border-sky-700"
                  >
                    <span className="block text-2xl font-semibold text-slate-950">
                      Construction and infrastructure
                    </span>
                    <span className="mt-2 block text-base leading-7 text-slate-700">
                      Best fit for CAD, coordination, and project delivery review.
                    </span>
                  </button>
                </div>
              </div>
            ) : null}

            {step === 'logic' ? (
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Step 2
                  </p>
                  <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                    Pricing logic made visible
                  </h2>
                  <p className="max-w-2xl text-lg leading-8 text-slate-700">
                    {scenario.pricingLogic}
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-slate-300 bg-slate-50 px-5 py-5">
                  <p className="text-xl font-semibold text-slate-950">{scenario.headline}</p>
                  <p className="mt-2 text-base leading-7 text-slate-700">{scenario.summary}</p>
                </div>
              </div>
            ) : null}

            {step === 'workflow' ? (
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Step 3
                  </p>
                  <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                    The review flow
                  </h2>
                  <p className="max-w-2xl text-lg leading-8 text-slate-700">
                    The value is not the UI chrome. The value is that a non-technical reviewer can
                    understand who uses the tool, what changes, and what happens next.
                  </p>
                </div>
                <div className="grid gap-4">
                  {scenario.workflowStates.slice(0, 4).map((item) => (
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

            {step === 'evidence' ? (
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Step 4
                  </p>
                  <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                    Why this matters in production
                  </h2>
                </div>
                <div className="grid gap-4">
                  {scenario.productionNotes.slice(0, 3).map((item) => (
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
                    href="/case-studies/cpq-decision-workbench"
                    className="inline-flex min-h-16 items-center justify-center rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                  >
                    Open CPQ case study
                  </Link>
                  <Link
                    href={
                      scenario.relevance.includes('construction')
                        ? '/tracks/construction'
                        : '/tracks/openai'
                    }
                    className="inline-flex min-h-16 items-center justify-center rounded-[1.6rem] border-2 border-slate-300 bg-white px-6 py-4 text-xl font-semibold text-slate-950 transition hover:border-slate-500"
                  >
                    Open matching review track
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
