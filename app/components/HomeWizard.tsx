'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { recordRecruiterEvent } from '@/lib/telemetry';

type ReviewIntent = 'hiring' | 'enterprise' | 'autodesk' | 'workflow';

type WizardStep =
  | 'welcome'
  | 'intent'
  | 'fit'
  | 'credibility'
  | 'outcomes'
  | 'proof'
  | 'process'
  | 'references'
  | 'next';

type IntentPack = {
  id: ReviewIntent;
  label: string;
  shortLabel: string;
  fitTitle: string;
  fitBody: string;
  credibility: string[];
  outcomes: string[];
  proofTitle: string;
  proofBody: string;
  proofHref: string;
  proofLabel: string;
  process: string[];
  references: Array<{
    label: string;
    href: string;
  }>;
};

type SavedState = {
  step: WizardStep;
  intent: ReviewIntent | null;
};

const saveKey = 'guided-proof-story-state';
const steps: WizardStep[] = [
  'welcome',
  'intent',
  'fit',
  'credibility',
  'outcomes',
  'proof',
  'process',
  'references',
  'next',
];

const intentPacks: IntentPack[] = [
  {
    id: 'hiring',
    label: 'I am reviewing hiring fit',
    shortLabel: 'Hiring fit',
    fitTitle: 'This path shows role level and strongest proof first.',
    fitBody:
      'Use this path when you want a fast and trustworthy review of principal-level fit without searching through a large site.',
    credibility: [
      'Principal-level workflow and systems proof',
      'Clear product and operator thinking',
      'Evidence organized for fast recruiter review',
    ],
    outcomes: [
      'Complex work made easier to understand',
      'Proof of business value before deep technical detail',
      'Stronger trust through simple guided review',
    ],
    proofTitle: 'Operator Search Platform',
    proofBody:
      'A large CAD archive was turned into a faster search tool so people could find the right information in seconds instead of relying on tribal knowledge.',
    proofHref: '/case-studies/operator-search-platform',
    proofLabel: 'Open operator search proof',
    process: [
      'Understand the real user problem',
      'Make the decision logic clear',
      'Build one trustworthy tool at a time',
      'Improve speed and reliability',
    ],
    references: [
      { label: 'OpenAI review path', href: '/contexts/openai' },
      { label: 'Resume PDF', href: '/documents/thomas-smith-architect-resume-2026.pdf' },
      { label: 'Full proof library', href: '/contexts/full-proof-library' },
    ],
  },
  {
    id: 'enterprise',
    label: 'I am reviewing enterprise consulting fit',
    shortLabel: 'Enterprise fit',
    fitTitle: 'This path focuses on governed rollout and enterprise trust.',
    fitBody:
      'Use this path when you want proof that the work can stand up inside a complex business setting with multiple systems and stakeholders.',
    credibility: [
      'Governance and rollout awareness',
      'System boundary and lifecycle thinking',
      'Proof organized for enterprise review',
    ],
    outcomes: [
      'Better trust in the system story',
      'Cleaner translation from technical work to business-safe review',
      'Less confusion for non-technical decision-makers',
    ],
    proofTitle: 'QTS Suwanee Systems Briefing',
    proofBody:
      'A focused architecture briefing for data-center construction systems, showing lifecycle thinking, governance, and platform trust.',
    proofHref: '/contexts/qts-suwanee',
    proofLabel: 'Open enterprise proof',
    process: [
      'Clarify scope and ownership',
      'Map system boundaries and risks',
      'Show the strongest governed proof',
      'Keep deep evidence available but secondary',
    ],
    references: [
      { label: 'QTS context page', href: '/contexts/qts-suwanee' },
      { label: 'Vault operations case study', href: '/case-studies/vault-ops-reliability' },
      { label: 'CAD Guardian', href: 'https://www.cadguardian.com/' },
    ],
  },
  {
    id: 'autodesk',
    label: 'I am reviewing Autodesk or CAD systems fit',
    shortLabel: 'Autodesk fit',
    fitTitle: 'This path shows engineering workflow depth without making you browse the archive.',
    fitBody:
      'Use this path when you care about Vault, Inventor, CAD operations, configurators, and engineering workflow modernization.',
    credibility: [
      'Years of Autodesk-centered systems work',
      'Video proof and case-study proof available',
      'Archive reduced into a simple first-pass review',
    ],
    outcomes: [
      'Legacy workflow made easier to use',
      'Operators given clearer tools',
      'Engineering proof made simpler to review',
    ],
    proofTitle: 'Vault Operations Reliability',
    proofBody:
      'A reliability-focused case study showing that engineering workflow issues were treated as system problems, not just support tickets.',
    proofHref: '/case-studies/vault-ops-reliability',
    proofLabel: 'Open Autodesk proof',
    process: [
      'Start with operator pain',
      'Separate signal from archive noise',
      'Show one strong artifact first',
      'Keep the full archive optional',
    ],
    references: [
      { label: 'Autodesk context page', href: '/contexts/autodesk-cad' },
      { label: 'Vault case study', href: '/case-studies/vault-ops-reliability' },
      { label: 'Full proof library', href: '/contexts/full-proof-library' },
    ],
  },
  {
    id: 'workflow',
    label: 'I am reviewing workflow product fit',
    shortLabel: 'Workflow fit',
    fitTitle: 'This path shows decision software and product-system thinking.',
    fitBody:
      'Use this path when you want proof that complex business rules can become clear software for non-technical people.',
    credibility: [
      'Decision logic made visible',
      'Operator flow treated as product quality',
      'Guided review built for first-time evaluators',
    ],
    outcomes: [
      'Business rules easier to inspect and trust',
      'Clearer one-step-at-a-time interaction model',
      'Stronger link between commercial logic and product proof',
    ],
    proofTitle: 'CPQ Decision Workbench',
    proofBody:
      'A pricing and workflow artifact that makes business logic inspectable so a reviewer can see how commercial rules become operator software.',
    proofHref: '/cpq-demo',
    proofLabel: 'Open workflow proof',
    process: [
      'Find the real decision the user must make',
      'Reduce the screen to one action at a time',
      'Expose the logic instead of hiding it',
      'Validate it in real browser conditions',
    ],
    references: [
      { label: 'Workflow context page', href: '/contexts/product-systems' },
      { label: 'CPQ workbench', href: '/cpq-demo' },
      { label: 'Operator search case study', href: '/case-studies/operator-search-platform' },
    ],
  },
];

function getStepIndex(step: WizardStep) {
  return steps.indexOf(step);
}

function getLinearProgress(step: WizardStep) {
  if (step === 'welcome') {
    return 0;
  }

  return Math.min(getStepIndex(step), 7);
}

function StepShell({
  stepNumber,
  title,
  body,
  children,
}: {
  stepNumber: number;
  title: string;
  body?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Step {stepNumber}
        </p>
        <h2
          className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl"
          data-testid="wizard-step-title"
        >
          {title}
        </h2>
        {body ? <p className="max-w-2xl text-lg leading-8 text-slate-700">{body}</p> : null}
      </div>
      {children}
    </section>
  );
}

export default function HomeWizard() {
  const [step, setStep] = useState<WizardStep>('welcome');
  const [intent, setIntent] = useState<ReviewIntent | null>(null);
  const [resumeAvailable, setResumeAvailable] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const pack = useMemo(() => {
    return intentPacks.find((item) => item.id === intent) ?? null;
  }, [intent]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(saveKey);
      if (!raw) {
        setLoaded(true);
        return;
      }

      const saved = JSON.parse(raw) as SavedState;
      const validIntent = intentPacks.some((item) => item.id === saved.intent);
      const validStep = steps.includes(saved.step);

      if (validIntent && validStep && saved.step !== 'welcome') {
        setIntent(saved.intent);
        setResumeAvailable(true);
      }
    } catch {
      // Ignore saved-state parsing errors.
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded || step === 'welcome') {
      return;
    }

    const saved: SavedState = { step, intent };
    window.localStorage.setItem(saveKey, JSON.stringify(saved));
    setResumeAvailable(Boolean(intent));
  }, [intent, loaded, step]);

  const progress = getLinearProgress(step);
  const progressLabel = step === 'welcome' ? 'Start' : `Step ${progress} of 7`;

  const goToStep = (nextStep: WizardStep) => {
    setStep(nextStep);
    recordRecruiterEvent('guided_story_step_opened', {
      step: nextStep,
      intent: intent ?? 'none',
    });
  };

  const goBack = () => {
    const currentIndex = getStepIndex(step);
    if (currentIndex <= 0) {
      return;
    }

    setStep(steps[currentIndex - 1]);
  };

  const resetWizard = () => {
    window.localStorage.removeItem(saveKey);
    setIntent(null);
    setStep('welcome');
    setResumeAvailable(false);
    recordRecruiterEvent('guided_story_reset');
  };

  const resume = () => {
    try {
      const raw = window.localStorage.getItem(saveKey);
      if (!raw) {
        goToStep('intent');
        return;
      }

      const saved = JSON.parse(raw) as SavedState;
      if (saved.intent && steps.includes(saved.step)) {
        setIntent(saved.intent);
        setStep(saved.step);
      } else {
        goToStep('intent');
      }
    } catch {
      goToStep('intent');
    }
  };

  const chooseIntent = (selectedIntent: ReviewIntent) => {
    setIntent(selectedIntent);
    recordRecruiterEvent('guided_story_intent_selected', { intent: selectedIntent });
    goToStep('fit');
  };

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
                Guided proof review
              </p>
              <h1 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-2xl">
                One thing at a time
              </h1>
            </div>
            <p
              className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
              data-testid="wizard-progress-label"
            >
              {progressLabel}
            </p>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-sky-800 transition-[width] duration-200"
              style={{ width: `${(progress / 7) * 100}%` }}
            />
          </div>
        </header>

        <section className="flex flex-1 items-center py-4 sm:py-6" data-testid="story-wizard">
          <div className="w-full rounded-[2rem] border border-slate-300 bg-white px-5 py-8 shadow-[0_24px_100px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10">
            {step === 'welcome' ? (
              <div className="space-y-8 text-center">
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Calm review flow
                  </p>
                  <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">
                    This guide will walk you through the proof.
                  </h2>
                  <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-700">
                    You will see one page at a time. You can go back. You can stop and come back
                    later. You do not need to search the whole site.
                  </p>
                </div>

                <div className="mx-auto max-w-xl space-y-4">
                  <button
                    type="button"
                    onClick={() => goToStep('intent')}
                    className="w-full rounded-[1.6rem] bg-sky-800 px-6 py-5 text-xl font-semibold text-white transition hover:bg-sky-900"
                  >
                    Start
                  </button>
                  {resumeAvailable ? (
                    <button
                      type="button"
                      onClick={resume}
                      className="w-full rounded-[1.6rem] border-2 border-slate-300 bg-white px-6 py-5 text-xl font-semibold text-slate-950 transition hover:border-slate-500"
                    >
                      Resume where I left off
                    </button>
                  ) : null}
                  <Link
                    href="/documents/thomas-smith-architect-resume-2026.pdf"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-950 transition hover:border-slate-500"
                  >
                    Open resume instead
                  </Link>
                </div>
              </div>
            ) : null}

            {step === 'intent' ? (
              <StepShell
                stepNumber={1}
                title="What are you here to review?"
                body="Choose the reason that matches your review today."
              >
                <div className="grid gap-4">
                  {intentPacks.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => chooseIntent(item.id)}
                      className="rounded-[1.6rem] border-2 border-slate-300 bg-white px-5 py-5 text-left transition hover:border-sky-700"
                    >
                      <span className="block text-2xl font-semibold text-slate-950">
                        {item.label}
                      </span>
                      <span className="mt-2 block text-base leading-7 text-slate-700">
                        {item.fitBody}
                      </span>
                    </button>
                  ))}
                </div>
              </StepShell>
            ) : null}

            {pack && step === 'fit' ? (
              <StepShell stepNumber={2} title={pack.fitTitle} body={pack.fitBody}>
                <button
                  type="button"
                  onClick={() => goToStep('credibility')}
                  className="min-h-16 w-full rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                >
                  Next page
                </button>
              </StepShell>
            ) : null}

            {pack && step === 'credibility' ? (
              <StepShell stepNumber={3} title="Why this path is credible">
                <div className="grid gap-4">
                  {pack.credibility.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.4rem] border border-slate-300 bg-slate-50 px-5 py-5"
                    >
                      <p className="text-xl font-semibold text-slate-950">{item}</p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => goToStep('outcomes')}
                  className="min-h-16 w-full rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                >
                  Next page
                </button>
              </StepShell>
            ) : null}

            {pack && step === 'outcomes' ? (
              <StepShell stepNumber={4} title="What this work helped people do">
                <div className="grid gap-4">
                  {pack.outcomes.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.4rem] border border-slate-300 bg-slate-50 px-5 py-5"
                    >
                      <p className="text-xl font-semibold text-slate-950">{item}</p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => goToStep('proof')}
                  className="min-h-16 w-full rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                >
                  Next page
                </button>
              </StepShell>
            ) : null}

            {pack && step === 'proof' ? (
              <StepShell stepNumber={5} title={pack.proofTitle} body={pack.proofBody}>
                <div className="grid gap-4">
                  <Link
                    href={pack.proofHref}
                    className="inline-flex min-h-16 items-center justify-center rounded-[1.6rem] border-2 border-slate-300 bg-white px-6 py-4 text-xl font-semibold text-slate-950 transition hover:border-slate-500"
                  >
                    {pack.proofLabel}
                  </Link>
                  <button
                    type="button"
                    onClick={() => goToStep('process')}
                    className="min-h-16 w-full rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                  >
                    Next page
                  </button>
                </div>
              </StepShell>
            ) : null}

            {pack && step === 'process' ? (
              <StepShell stepNumber={6} title="How the work is done">
                <div className="grid gap-4">
                  {pack.process.map((item, index) => (
                    <div
                      key={item}
                      className="rounded-[1.4rem] border border-slate-300 bg-slate-50 px-5 py-5"
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Part {index + 1}
                      </p>
                      <p className="mt-2 text-xl font-semibold text-slate-950">{item}</p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => goToStep('references')}
                  className="min-h-16 w-full rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                >
                  Next page
                </button>
              </StepShell>
            ) : null}

            {pack && step === 'references' ? (
              <StepShell
                stepNumber={7}
                title="References and trust notes"
                body="This review path is for enterprise and recruiter review. It is designed to keep the first pass simple."
              >
                <div className="grid gap-4">
                  {pack.references.map((reference) => (
                    <Link
                      key={reference.href}
                      href={reference.href}
                      className="inline-flex min-h-16 items-center rounded-[1.4rem] border border-slate-300 bg-white px-5 py-4 text-xl font-semibold text-slate-950 transition hover:border-slate-500"
                    >
                      {reference.label}
                    </Link>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => goToStep('next')}
                  className="min-h-16 w-full rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                >
                  Next page
                </button>
              </StepShell>
            ) : null}

            {pack && step === 'next' ? (
              <StepShell
                stepNumber={7}
                title="What would you like to do now?"
                body="You have reached the end of the guided review."
              >
                <div className="grid gap-4">
                  <Link
                    href="mailto:job@tsmithcode.ai?subject=Guided%20Review%20Follow%20Up"
                    className="inline-flex min-h-16 items-center justify-center rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                  >
                    Contact Thomas Smith
                  </Link>
                  <Link
                    href="/documents/thomas-smith-architect-resume-2026.pdf"
                    className="inline-flex min-h-16 items-center justify-center rounded-[1.6rem] border-2 border-slate-300 bg-white px-6 py-4 text-xl font-semibold text-slate-950 transition hover:border-slate-500"
                  >
                    Open resume
                  </Link>
                  <Link
                    href="/contexts/full-proof-library"
                    className="inline-flex min-h-16 items-center justify-center rounded-[1.6rem] border-2 border-slate-300 bg-white px-6 py-4 text-xl font-semibold text-slate-950 transition hover:border-slate-500"
                  >
                    Open full proof library
                  </Link>
                </div>
              </StepShell>
            ) : null}
          </div>
        </section>

        {step !== 'welcome' ? (
          <footer className="pb-2">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 'intent'}
                className="inline-flex min-h-12 items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Previous page
              </button>
              <button
                type="button"
                onClick={resetWizard}
                className="inline-flex min-h-12 items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500"
              >
                Start over
              </button>
            </div>
          </footer>
        ) : null}
      </div>
    </main>
  );
}
