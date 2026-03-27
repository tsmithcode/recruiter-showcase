'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { recordRecruiterEvent } from '@/lib/telemetry';

type IntentId = 'hiring-fit' | 'enterprise-fit' | 'autodesk-fit' | 'workflow-fit';

type WizardStepId =
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
  id: IntentId;
  label: string;
  shortLabel: string;
  fitTitle: string;
  fitSummary: string;
  credibility: string[];
  outcomes: string[];
  proofTitle: string;
  proofSummary: string;
  proofHref: string;
  proofLabel: string;
  process: string[];
  references: Array<{
    label: string;
    href: string;
  }>;
};

type SavedWizardState = {
  intent: IntentId | null;
  step: WizardStepId;
};

const saveKey = 'homepage-story-wizard-state-v2';
const orderedSteps: WizardStepId[] = [
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
    id: 'hiring-fit',
    label: 'I am reviewing hiring fit',
    shortLabel: 'Hiring fit',
    fitTitle: 'This path shows role level, business judgment, and strongest evidence first.',
    fitSummary:
      'Use this if you need a fast, trustworthy review of principal-level fit without digging through a large website.',
    credibility: [
      'Principal-level systems and workflow proof',
      'Evidence across product, operator, and integration work',
      'Review path built for fast recruiter understanding',
    ],
    outcomes: [
      'Clear examples of tools that reduced friction for real users',
      'Proof that complex systems were turned into understandable software',
      'Visible business outcomes before deep technical detail',
    ],
    proofTitle: 'Operator Search Platform',
    proofSummary:
      'A large CAD archive was turned into a faster, easier search workflow so operators could find the right information in seconds instead of relying on tribal knowledge.',
    proofHref: '/case-studies/operator-search-platform',
    proofLabel: 'Open operator search proof',
    process: [
      'Understand the real user problem',
      'Make the decision logic clear',
      'Build the smallest trustworthy tool',
      'Improve speed, clarity, and reliability',
    ],
    references: [
      { label: 'OpenAI recruiter path', href: '/contexts/openai' },
      { label: 'Resume PDF', href: '/documents/thomas-smith-architect-resume-2026.pdf' },
      { label: 'Full proof library', href: '/contexts/full-proof-library' },
    ],
  },
  {
    id: 'enterprise-fit',
    label: 'I am reviewing enterprise consulting fit',
    shortLabel: 'Enterprise fit',
    fitTitle: 'This path focuses on governance, rollout judgment, and reliable execution.',
    fitSummary:
      'Use this if you need to know whether the work can stand up in a complex business setting with multiple systems and stakeholders.',
    credibility: [
      'Experience framing systems in business-safe language',
      'Governance, lifecycle, and operating-model awareness',
      'Proof paths for construction, Autodesk, and workflow operations',
    ],
    outcomes: [
      'Complex system work explained without hype',
      'Implementation realism instead of abstract architecture claims',
      'A review flow that makes evidence easier to verify',
    ],
    proofTitle: 'QTS Suwanee Systems Briefing',
    proofSummary:
      'A focused architecture and governance narrative for a data-center construction environment, showing lifecycle thinking, system boundaries, and platform trust.',
    proofHref: '/contexts/qts-suwanee',
    proofLabel: 'Open enterprise proof',
    process: [
      'Clarify scope and ownership',
      'Map system boundaries and risks',
      'Show the strongest governed proof',
      'Offer a clean handoff to deeper evidence',
    ],
    references: [
      { label: 'QTS context page', href: '/contexts/qts-suwanee' },
      { label: 'Vault operations case study', href: '/case-studies/vault-ops-reliability' },
      { label: 'CAD Guardian', href: 'https://www.cadguardian.com/' },
    ],
  },
  {
    id: 'autodesk-fit',
    label: 'I am reviewing Autodesk or CAD systems fit',
    shortLabel: 'Autodesk fit',
    fitTitle:
      'This path shows long-term engineering workflow depth without making you browse an archive.',
    fitSummary:
      'Use this if you care about Inventor, Vault, CAD operations, configurators, and engineering workflow modernization.',
    credibility: [
      'Years of Autodesk and engineering-systems work',
      'Video proof and case-study proof available',
      'Archive moved behind a simpler guided review path',
    ],
    outcomes: [
      'Legacy workflows made easier to use',
      'Operators given clearer tools and faster retrieval',
      'Engineering systems framed in plain language first',
    ],
    proofTitle: 'Vault Operations Reliability',
    proofSummary:
      'A reliability-focused case study showing how engineering workflow issues were treated as system problems, not just support tickets.',
    proofHref: '/case-studies/vault-ops-reliability',
    proofLabel: 'Open Autodesk proof',
    process: [
      'Start with operator pain',
      'Separate signal from archive noise',
      'Show the strongest artifact first',
      'Let the full library stay optional',
    ],
    references: [
      { label: 'Autodesk proof page', href: '/contexts/autodesk-cad' },
      { label: 'Vault operations case study', href: '/case-studies/vault-ops-reliability' },
      { label: 'Full proof library', href: '/contexts/full-proof-library' },
    ],
  },
  {
    id: 'workflow-fit',
    label: 'I am reviewing workflow product fit',
    shortLabel: 'Workflow fit',
    fitTitle: 'This path shows decision software, operator workflows, and product-system thinking.',
    fitSummary:
      'Use this if you want proof that complex business rules can become clear, usable software for non-technical people.',
    credibility: [
      'Workflow products explained as operator systems',
      'Proof that logic is visible instead of hidden',
      'Guided path built for first-time reviewers',
    ],
    outcomes: [
      'Decision logic made easier to inspect and trust',
      'User flow designed around one step at a time',
      'Commercial and technical proof shown together',
    ],
    proofTitle: 'CPQ Decision Workbench',
    proofSummary:
      'A pricing and workflow artifact that makes business logic inspectable so a reviewer can see how commercial rules become operator software.',
    proofHref: '/cpq-demo',
    proofLabel: 'Open workflow proof',
    process: [
      'Identify the real decision the user must make',
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

function getStepNumber(step: WizardStepId) {
  return orderedSteps.indexOf(step) + 1;
}

function isLinearStep(step: WizardStepId) {
  return step !== 'welcome' && step !== 'intent';
}

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<WizardStepId>('welcome');
  const [selectedIntent, setSelectedIntent] = useState<IntentId | null>(null);
  const [resumeAvailable, setResumeAvailable] = useState(false);
  const [hasLoadedState, setHasLoadedState] = useState(false);

  const selectedPack = useMemo(() => {
    return intentPacks.find((pack) => pack.id === selectedIntent) ?? null;
  }, [selectedIntent]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(saveKey);
      if (!raw) {
        setHasLoadedState(true);
        return;
      }

      const saved = JSON.parse(raw) as SavedWizardState;
      const validIntent =
        saved.intent && intentPacks.some((pack) => pack.id === saved.intent) ? saved.intent : null;
      const validStep = orderedSteps.includes(saved.step) ? saved.step : 'welcome';

      setResumeAvailable(validIntent !== null && validStep !== 'welcome');
      if (validIntent) {
        setSelectedIntent(validIntent);
      }
      setHasLoadedState(true);
    } catch {
      setHasLoadedState(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedState) {
      return;
    }

    if (currentStep === 'welcome') {
      return;
    }

    const nextState: SavedWizardState = {
      intent: selectedIntent,
      step: currentStep,
    };

    window.localStorage.setItem(saveKey, JSON.stringify(nextState));
    setResumeAvailable(Boolean(selectedIntent));
  }, [currentStep, selectedIntent, hasLoadedState]);

  const openStep = (step: WizardStepId) => {
    setCurrentStep(step);
    recordRecruiterEvent('wizard_step_opened', {
      step,
      intent: selectedIntent ?? 'none',
    });
  };

  const startNew = () => {
    setSelectedIntent(null);
    openStep('intent');
  };

  const resumeFlow = () => {
    try {
      const raw = window.localStorage.getItem(saveKey);
      if (!raw) {
        setCurrentStep('intent');
        return;
      }

      const saved = JSON.parse(raw) as SavedWizardState;
      const validIntent =
        saved.intent && intentPacks.some((pack) => pack.id === saved.intent) ? saved.intent : null;
      const validStep = orderedSteps.includes(saved.step) ? saved.step : 'intent';

      setSelectedIntent(validIntent);
      setCurrentStep(validIntent ? validStep : 'intent');
    } catch {
      setCurrentStep('intent');
    }
  };

  const clearSavedState = () => {
    window.localStorage.removeItem(saveKey);
    setResumeAvailable(false);
  };

  const chooseIntent = (intent: IntentId) => {
    setSelectedIntent(intent);
    recordRecruiterEvent('wizard_intent_selected', { intent });
    openStep('fit');
  };

  const goBack = () => {
    if (currentStep === 'welcome') {
      return;
    }

    if (currentStep === 'intent') {
      setCurrentStep('welcome');
      return;
    }

    if (currentStep === 'fit') {
      setCurrentStep('intent');
      return;
    }

    const currentIndex = orderedSteps.indexOf(currentStep);
    const previousStep = orderedSteps[currentIndex - 1];
    setCurrentStep(previousStep ?? 'welcome');
  };

  const nextStep = () => {
    if (!selectedPack) {
      return;
    }

    const currentIndex = orderedSteps.indexOf(currentStep);
    const followingStep = orderedSteps[currentIndex + 1];

    if (followingStep) {
      openStep(followingStep);
    }
  };

  const progressLabel = isLinearStep(currentStep)
    ? `Step ${getStepNumber(currentStep) - 1} of 7`
    : currentStep === 'welcome'
      ? 'Start'
      : 'Choose path';

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_42%,#e2e8f0_100%)] text-slate-950"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[860px] flex-col px-4 py-4 sm:px-6 sm:py-6">
        <header className="rounded-[1.8rem] border border-slate-300/80 bg-white/96 px-5 py-4 shadow-[0_18px_70px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Thomas Smith review guide
              </p>
              <h1 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-2xl">
                One screen at a time
              </h1>
            </div>
            <p
              className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
              data-testid="wizard-progress-label"
            >
              {progressLabel}
            </p>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
            <div
              className="h-full rounded-full bg-sky-700 transition-[width] duration-200"
              style={{
                width: `${((Math.max(getStepNumber(currentStep) - 1, 0) / 7) * 100).toFixed(0)}%`,
              }}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {currentStep !== 'welcome' ? (
              <button
                type="button"
                onClick={goBack}
                className="min-h-12 rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 transition hover:border-slate-500"
              >
                Go back
              </button>
            ) : null}
            <button
              type="button"
              onClick={clearSavedState}
              className="min-h-12 rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 transition hover:border-slate-500"
            >
              Clear saved place
            </button>
            <Link
              href="/contexts/full-proof-library"
              className="inline-flex min-h-12 items-center rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 transition hover:border-slate-500"
            >
              Open full archive
            </Link>
          </div>
        </header>

        <section
          className="mt-4 flex flex-1 items-center"
          aria-live="polite"
          data-testid="story-wizard"
        >
          <div className="w-full rounded-[2rem] border border-slate-300/80 bg-white px-5 py-8 shadow-[0_24px_100px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10">
            {currentStep === 'welcome' ? (
              <div className="space-y-8 text-center">
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Calm review flow
                  </p>
                  <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">
                    This guide will walk you through the proof.
                  </h2>
                  <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-700">
                    You will see one thing at a time. You can go back. You can stop and come back
                    later. You do not need to search the whole site.
                  </p>
                </div>

                <div className="mx-auto max-w-xl space-y-4">
                  <button
                    type="button"
                    onClick={startNew}
                    className="w-full rounded-[1.6rem] bg-sky-800 px-6 py-5 text-xl font-semibold text-white transition hover:bg-sky-900"
                  >
                    Start
                  </button>
                  {resumeAvailable ? (
                    <button
                      type="button"
                      onClick={resumeFlow}
                      className="w-full rounded-[1.6rem] border-2 border-slate-300 bg-white px-6 py-5 text-xl font-semibold text-slate-950 transition hover:border-slate-500"
                    >
                      Resume where I left off
                    </button>
                  ) : null}
                  <Link
                    href="/documents/thomas-smith-architect-resume-2026.pdf"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-900 transition hover:border-slate-500"
                  >
                    Open resume instead
                  </Link>
                </div>
              </div>
            ) : null}

            {currentStep === 'intent' ? (
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Step 1
                  </p>
                  <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                    What are you here to review?
                  </h2>
                  <p className="max-w-2xl text-lg leading-8 text-slate-700">
                    Choose the reason that matches your review today.
                  </p>
                </div>

                <div className="grid gap-4">
                  {intentPacks.map((pack) => (
                    <button
                      key={pack.id}
                      type="button"
                      onClick={() => chooseIntent(pack.id)}
                      className="rounded-[1.6rem] border-2 border-slate-300 bg-white px-5 py-5 text-left transition hover:border-sky-700"
                    >
                      <span className="block text-2xl font-semibold text-slate-950">
                        {pack.label}
                      </span>
                      <span className="mt-2 block text-base leading-7 text-slate-700">
                        {pack.fitSummary}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {currentStep !== 'welcome' && currentStep !== 'intent' && selectedPack ? (
              <div className="space-y-8">
                {currentStep === 'fit' ? (
                  <>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Step 2
                      </p>
                      <h2
                        className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl"
                        data-testid="wizard-screen-title"
                      >
                        {selectedPack.fitTitle}
                      </h2>
                      <p
                        className="max-w-2xl text-lg leading-8 text-slate-700"
                        data-testid="wizard-fit-summary"
                      >
                        {selectedPack.fitSummary}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="min-h-16 w-full rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                    >
                      See credibility
                    </button>
                  </>
                ) : null}

                {currentStep === 'credibility' ? (
                  <>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Step 3
                      </p>
                      <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                        Why this review path is credible
                      </h2>
                    </div>
                    <div className="grid gap-4">
                      {selectedPack.credibility.map((item) => (
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
                      onClick={nextStep}
                      className="min-h-16 w-full rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                    >
                      See outcomes
                    </button>
                  </>
                ) : null}

                {currentStep === 'outcomes' ? (
                  <>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Step 4
                      </p>
                      <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                        What this work helped people do
                      </h2>
                    </div>
                    <div className="grid gap-4">
                      {selectedPack.outcomes.map((item) => (
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
                      onClick={nextStep}
                      className="min-h-16 w-full rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                    >
                      See strongest proof
                    </button>
                  </>
                ) : null}

                {currentStep === 'proof' ? (
                  <>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Step 5
                      </p>
                      <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                        Strongest proof for this path
                      </h2>
                      <p className="text-2xl font-semibold text-slate-950">
                        {selectedPack.proofTitle}
                      </p>
                      <p className="max-w-2xl text-lg leading-8 text-slate-700">
                        {selectedPack.proofSummary}
                      </p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Link
                        href={selectedPack.proofHref}
                        className="inline-flex min-h-16 items-center justify-center rounded-[1.6rem] border-2 border-slate-300 bg-white px-6 py-4 text-xl font-semibold text-slate-950 transition hover:border-slate-500"
                      >
                        {selectedPack.proofLabel}
                      </Link>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="min-h-16 w-full rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                      >
                        See process
                      </button>
                    </div>
                  </>
                ) : null}

                {currentStep === 'process' ? (
                  <>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Step 6
                      </p>
                      <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                        How the work is done
                      </h2>
                    </div>
                    <div className="grid gap-4">
                      {selectedPack.process.map((item, index) => (
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
                      onClick={nextStep}
                      className="min-h-16 w-full rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                    >
                      See references
                    </button>
                  </>
                ) : null}

                {currentStep === 'references' ? (
                  <>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Step 7
                      </p>
                      <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                        References and trust notes
                      </h2>
                      <div className="rounded-[1.4rem] border border-slate-300 bg-slate-50 px-5 py-5 text-lg leading-8 text-slate-700">
                        <p>
                          <strong>Last updated:</strong> March 26, 2026
                        </p>
                        <p>
                          <strong>Reviewed by:</strong> Thomas Smith
                        </p>
                        <p>
                          <strong>Use:</strong> This guide is for recruiter and enterprise review.
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      {selectedPack.references.map((reference) => (
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
                      onClick={nextStep}
                      className="min-h-16 w-full rounded-[1.6rem] bg-sky-800 px-6 py-4 text-xl font-semibold text-white transition hover:bg-sky-900"
                    >
                      Choose next step
                    </button>
                  </>
                ) : null}

                {currentStep === 'next' ? (
                  <>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Finish
                      </p>
                      <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                        What would you like to do now?
                      </h2>
                      <p className="max-w-2xl text-lg leading-8 text-slate-700">
                        You have reached the end of the guided review. Choose one clear next step.
                      </p>
                    </div>
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
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
