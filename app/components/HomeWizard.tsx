'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import type {
  HomepageAction,
  HomepageIssue,
  HomepageSpread,
  HomepageSpreadId,
} from '@/lib/homepageIssue';
import { getEditorialSlot } from '@/lib/editorialSlots';
import { recordRecruiterEvent } from '@/lib/telemetry';

import EditorialSlotPlate from './showcase/EditorialSlotPlate';

type SavedState = {
  step: HomepageSpreadId;
};

const saveKey = 'guided-editorial-issue-state';

function getStepIndex(spreads: HomepageSpread[], step: HomepageSpreadId) {
  return spreads.findIndex((spread) => spread.id === step);
}

function actionClassName(style: HomepageAction['style'] = 'secondary') {
  if (style === 'primary') {
    return 'inline-flex min-h-16 items-center justify-center rounded-[1.4rem] bg-[#111827] px-6 py-4 text-lg font-semibold text-white transition hover:bg-black';
  }

  return 'inline-flex min-h-16 items-center justify-center rounded-[1.4rem] border border-slate-300 bg-white px-6 py-4 text-lg font-semibold text-slate-950 transition hover:border-slate-500';
}

function PlaceholderBadge({ status }: { status: HomepageSpread['placeholderStatus'] }) {
  const isComplete = status === 'complete';

  return (
    <div
      className={`inline-flex items-center rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
        isComplete
          ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
          : 'border-amber-300 bg-amber-50 text-amber-900'
      }`}
    >
      {isComplete ? 'Asset ready' : status.replaceAll('_', ' ')}
    </div>
  );
}

function SpreadFrame({
  issueLabel,
  spread,
  children,
}: {
  issueLabel: string;
  spread: HomepageSpread;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-8">
      <div className="grid gap-6 border-b border-slate-300/90 pb-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)] lg:items-end">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
            <span>{issueLabel}</span>
            <span className="h-px w-10 bg-slate-300" aria-hidden="true" />
            <span>Spread {spread.sequence}</span>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            {spread.kicker}
          </p>
          <h2
            className="max-w-4xl text-4xl font-semibold leading-none tracking-[-0.07em] text-slate-950 sm:text-5xl lg:text-[4.6rem]"
            data-testid="wizard-step-title"
          >
            {spread.headline}
          </h2>
          <p className="max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl">{spread.deck}</p>
        </div>

        <aside className="space-y-4 rounded-[1.5rem] border border-slate-300 bg-[#f6f3eb] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Primary claim
          </p>
          <p className="text-lg font-semibold leading-7 text-slate-950">{spread.primaryClaim}</p>
          <div className="space-y-2 border-t border-slate-300 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Emotional target
            </p>
            <p className="text-base text-slate-700">{spread.emotionalTarget}</p>
          </div>
          <PlaceholderBadge status={spread.placeholderStatus} />
        </aside>
      </div>

      {spread.caption ? (
        <div className="max-w-4xl border-l-2 border-slate-300 pl-4 text-sm leading-7 text-slate-600 sm:text-base">
          {spread.caption}
        </div>
      ) : null}

      {children}
    </section>
  );
}

function renderAction(
  action: HomepageAction,
  spreadId: HomepageSpreadId,
  onNext: (nextStepId: HomepageSpreadId) => void,
) {
  if (action.href) {
    return (
      <Link
        key={`${spreadId}-${action.label}`}
        href={action.href}
        className={actionClassName(action.style)}
        onClick={() =>
          recordRecruiterEvent('editorial_issue_cta_clicked', {
            step: spreadId,
            label: action.label,
          })
        }
      >
        {action.label}
      </Link>
    );
  }

  if (!action.nextStepId) {
    return null;
  }

  return (
    <button
      key={`${spreadId}-${action.label}`}
      type="button"
      onClick={() => onNext(action.nextStepId as HomepageSpreadId)}
      className={actionClassName(action.style)}
    >
      {action.label}
    </button>
  );
}

function SpreadBody({
  issue,
  spread,
}: {
  issue: HomepageIssue;
  spread: HomepageSpread;
}) {
  if (spread.id === 'proof') {
    const proofSlot = getEditorialSlot('homepage-issue', 'proof-diagram');

    return (
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
        <div className="rounded-[1.8rem] border border-slate-300 bg-[linear-gradient(135deg,#0f172a_0%,#1f2937_100%)] p-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.16)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
            Flagship proof
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">
            {issue.proofArtifact.title}
          </h3>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-100">
            {issue.proofArtifact.summary}
          </p>
          <div className="mt-8 grid gap-4 rounded-[1.4rem] bg-white/8 p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                What it proves
              </p>
              <p className="mt-2 text-base leading-7 text-slate-100">
                {issue.proofArtifact.whatItProves}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                Business outcome
              </p>
              <p className="mt-2 text-base leading-7 text-slate-100">
                {issue.proofArtifact.businessOutcome}
              </p>
            </div>
          </div>
        </div>

        {proofSlot ? <EditorialSlotPlate slot={proofSlot} /> : null}
      </div>
    );
  }

  if (spread.id === 'trust') {
    const trustSlot = getEditorialSlot('homepage-issue', 'trust-diagram');

    return (
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="grid gap-4">
          {spread.trustItems?.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.4rem] border border-slate-300 bg-slate-50 px-5 py-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-2 text-lg font-semibold leading-7 text-slate-950">{item.value}</p>
            </div>
          ))}
          <div className="rounded-[1.4rem] border border-slate-300 bg-[#f6f3eb] px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Scope note
            </p>
            <p className="mt-2 text-base leading-7 text-slate-700">{issue.trustBlock.scopeNote}</p>
          </div>
          {trustSlot ? <EditorialSlotPlate slot={trustSlot} compact /> : null}
        </div>

        <div className="grid gap-4">
          {spread.references?.map((reference) => (
            <Link
              key={reference.href}
              href={reference.href}
              className="rounded-[1.4rem] border border-slate-300 bg-white px-5 py-5 transition hover:border-slate-500"
            >
              <p className="text-lg font-semibold text-slate-950">{reference.label}</p>
              {reference.note ? (
                <p className="mt-2 text-base leading-7 text-slate-700">{reference.note}</p>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {spread.highlights?.map((item, index) => (
        <div
          key={`${spread.id}-${item}`}
          className={`rounded-[1.5rem] border px-5 py-5 ${
            index === 0
              ? 'border-slate-900 bg-[#111827] text-white'
              : 'border-slate-300 bg-slate-50 text-slate-950'
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-[0.18em] ${
              index === 0 ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            {spread.id === 'method' ? `Part ${index + 1}` : 'Signal'}
          </p>
          <p className="mt-2 text-xl font-semibold leading-8">{item}</p>
        </div>
      ))}
    </div>
  );
}

export default function HomeWizard({ issue }: { issue: HomepageIssue }) {
  const spreads = issue.spreads;
  const [step, setStep] = useState<HomepageSpreadId>('cover');
  const [resumeAvailable, setResumeAvailable] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const spread = useMemo(() => {
    return spreads.find((item) => item.id === step) ?? spreads[0];
  }, [spreads, step]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(saveKey);
      if (!raw) {
        setLoaded(true);
        return;
      }

      const saved = JSON.parse(raw) as SavedState;
      const validStep = spreads.some((item) => item.id === saved.step);

      if (validStep && saved.step !== 'cover') {
        setResumeAvailable(true);
      }
    } catch {
      // Ignore saved-state parsing errors.
    } finally {
      setLoaded(true);
    }
  }, [spreads]);

  useEffect(() => {
    if (!loaded || step === 'cover') {
      return;
    }

    const saved: SavedState = { step };
    window.localStorage.setItem(saveKey, JSON.stringify(saved));
    setResumeAvailable(true);
  }, [loaded, step]);

  const progress = step === 'cover' ? 0 : Math.max(getStepIndex(spreads, step), 0);
  const progressLabel = step === 'cover' ? 'Start' : `Spread ${spread.sequence} of ${spreads.length}`;

  const goToStep = (nextStep: HomepageSpreadId) => {
    setStep(nextStep);
    recordRecruiterEvent('editorial_issue_step_opened', {
      step: nextStep,
      source: issue.source,
    });
  };

  const goBack = () => {
    const currentIndex = getStepIndex(spreads, step);
    if (currentIndex <= 0) {
      return;
    }

    setStep(spreads[currentIndex - 1].id);
  };

  const resetWizard = () => {
    window.localStorage.removeItem(saveKey);
    setStep('cover');
    setResumeAvailable(false);
    recordRecruiterEvent('editorial_issue_reset', { source: issue.source });
  };

  const resume = () => {
    try {
      const raw = window.localStorage.getItem(saveKey);
      if (!raw) {
        goToStep('role');
        return;
      }

      const saved = JSON.parse(raw) as SavedState;
      if (spreads.some((item) => item.id === saved.step)) {
        setStep(saved.step);
        recordRecruiterEvent('editorial_issue_resumed', {
          step: saved.step,
          source: issue.source,
        });
      } else {
        goToStep('role');
      }
    } catch {
      goToStep('role');
    }
  };

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[linear-gradient(180deg,#ece8dc_0%,#f3efe6_38%,#ebe6da_100%)] text-slate-950"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[1100px] flex-col px-4 py-4 sm:px-6 sm:py-6">
        <header className="rounded-[1.8rem] border border-slate-300 bg-white/96 px-5 py-4 shadow-[0_18px_70px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                {issue.issueLabel}
              </p>
              <h1 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-2xl">
                Single-path editorial proof review
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p
                className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                data-testid="wizard-progress-label"
              >
                {progressLabel}
              </p>
              <p className="rounded-full border border-slate-300 bg-[#f6f3eb] px-4 py-2 text-sm font-medium text-slate-700">
                {issue.source === 'storyblok' ? 'CMS live' : 'Fallback issue'}
              </p>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-900 transition-[width] duration-200"
              style={{ width: `${(progress / (spreads.length - 1)) * 100}%` }}
            />
          </div>
        </header>

        <section className="flex flex-1 items-center py-4 sm:py-6" data-testid="story-wizard">
          <div className="w-full rounded-[2rem] border border-slate-300 bg-white px-5 py-8 shadow-[0_24px_100px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10 lg:px-10">
            <SpreadFrame issueLabel={issue.issueLabel} spread={spread}>
              <SpreadBody issue={issue} spread={spread} />
              <div
                className={`grid gap-4 ${
                  spread.actions && spread.actions.length > 1 ? 'sm:grid-cols-2' : ''
                }`}
              >
                {spread.actions?.map((action) => renderAction(action, spread.id, goToStep))}
              </div>
            </SpreadFrame>
          </div>
        </section>

        <footer className="pb-2">
          <div className="flex flex-wrap gap-3">
            {step !== 'cover' ? (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex min-h-12 items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500"
              >
                Previous spread
              </button>
            ) : null}
            {resumeAvailable && step === 'cover' ? (
              <button
                type="button"
                onClick={resume}
                className="inline-flex min-h-12 items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500"
              >
                Resume where I left off
              </button>
            ) : null}
            <button
              type="button"
              onClick={resetWizard}
              className="inline-flex min-h-12 items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500"
            >
              Start over
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
