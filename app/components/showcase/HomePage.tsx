'use client';

import { useMemo, useState } from 'react';

import {
  portfolioContexts,
  getFeaturedAutodeskVideos,
  type PortfolioContextSlug,
} from '@/lib/portfolioContent';
import { cadGuardianBranch } from '@/lib/controlCenter';
import {
  caseStudies,
  domainSignals,
  principalMetrics,
  proofArtifacts,
  type AudienceTrack,
} from '@/lib/showcaseContent';
import { recordRecruiterEvent } from '@/lib/telemetry';

import CaseStudyCard from './CaseStudyCard';
import ContextCard from './ContextCard';
import ProofLibrary from './ProofLibrary';
import RecruiterLink from './RecruiterLink';
import SearchTriggerButton from './SearchTriggerButton';
import SectionHeading from './SectionHeading';

const wizardAudienceOrder: PortfolioContextSlug[] = [
  'qts-suwanee',
  'openai',
  'autodesk-cad',
  'product-systems',
];

const wizardProfiles: Record<
  PortfolioContextSlug,
  {
    shortLabel: string;
    reviewerType: string;
    question: string;
    primaryActionLabel: string;
    primaryActionHref: string;
    secondaryActionLabel: string;
    secondaryActionHref: string;
    systemStatus: string;
    browserFocus: string;
  }
> = {
  'qts-suwanee': {
    shortLabel: 'Construction governance',
    reviewerType: 'Construction platform leaders and Autodesk-aligned enterprise stakeholders',
    question:
      'Can this person lead governed rollout, system mapping, and platform trust in a data-rich environment?',
    primaryActionLabel: 'Open the QTS guided path',
    primaryActionHref: '/contexts/qts-suwanee',
    secondaryActionLabel: 'Review construction proof',
    secondaryActionHref: '/tracks/construction',
    systemStatus: 'Governance-heavy intake route selected',
    browserFocus:
      'Prioritize mobile-safe review for recruiter calls, stakeholder laptops, and field-adjacent browsing.',
  },
  openai: {
    shortLabel: 'Principal B2B tools',
    reviewerType: 'Principal B2B engineering recruiters and operator-software hiring managers',
    question:
      'Can this engineer convert ambiguous operational pain into trustworthy software that changes throughput?',
    primaryActionLabel: 'Review the OpenAI path',
    primaryActionHref: '/contexts/openai',
    secondaryActionLabel: 'Open workflow proof',
    secondaryActionHref: '/tracks/openai',
    systemStatus: 'Operator-software intake route selected',
    browserFocus:
      'Prioritize clarity for high-speed recruiter review on desktop and managed browser environments.',
  },
  'autodesk-cad': {
    shortLabel: 'Autodesk systems',
    reviewerType: 'CAD, Vault, Inventor, and engineering workflow hiring teams',
    question:
      'Can this person modernize legacy engineering operations without breaking the operator reality underneath them?',
    primaryActionLabel: 'Open Autodesk proof',
    primaryActionHref: '/contexts/autodesk-cad',
    secondaryActionLabel: 'See Vault case study',
    secondaryActionHref: '/case-studies/vault-ops-reliability',
    systemStatus: 'CAD systems intake route selected',
    browserFocus:
      'Keep archive-heavy proof discoverable without letting it overwhelm the first screen.',
  },
  'product-systems': {
    shortLabel: 'Workflow products',
    reviewerType: 'Internal tools and workflow-product decision makers',
    question:
      'Can this system builder make decision logic legible enough for operators and commercial teams to trust?',
    primaryActionLabel: 'Open product systems proof',
    primaryActionHref: '/contexts/product-systems',
    secondaryActionLabel: 'Inspect CPQ workbench',
    secondaryActionHref: '/cpq-demo',
    systemStatus: 'Workflow-product intake route selected',
    browserFocus: 'Keep task flow obvious, short, and testable for first-time evaluators.',
  },
  'creative-ai': {
    shortLabel: 'Creative AI',
    reviewerType: 'AI-native interaction reviewers',
    question: 'Can this person turn guided generation into a dependable product surface?',
    primaryActionLabel: 'Open creative AI context',
    primaryActionHref: '/contexts/creative-ai',
    secondaryActionLabel: 'Open aJam',
    secondaryActionHref: 'https://4chord.vercel.app',
    systemStatus: 'Creative AI intake route selected',
    browserFocus: 'Preserve interpretability and trust over novelty.',
  },
  'full-proof-library': {
    shortLabel: 'Full archive',
    reviewerType: 'Deep-dive recruiters and hiring managers',
    question: 'Does the archive have enough depth to support a full diligence pass?',
    primaryActionLabel: 'Browse the full library',
    primaryActionHref: '/contexts/full-proof-library',
    secondaryActionLabel: 'Open resume',
    secondaryActionHref: '/documents/thomas-smith-architect-resume-2026.pdf',
    systemStatus: 'Archive intake route selected',
    browserFocus: 'Preserve depth while keeping first actions obvious.',
  },
};

export default function HomePage() {
  const [selectedAudience, setSelectedAudience] = useState<PortfolioContextSlug>('qts-suwanee');

  const featuredVideos = getFeaturedAutodeskVideos().slice(0, 3);
  const shiftAssessment = [
    {
      theme: 'Positioning',
      thought: 'The shift is directionally correct.',
      issue: 'A browse-first portfolio makes enterprise visitors assemble the story themselves.',
      solution:
        'Lead with a guided intake flow that routes by role, then reveals proof in a fixed order.',
    },
    {
      theme: 'Accessibility',
      thought: 'This improves trust for non-technical users.',
      issue:
        'Dense layouts and decorative motion can weaken clarity at the exact moment trust is needed.',
      solution:
        'Use high-contrast surfaces, large tap targets, obvious progress states, and plain-language labels.',
    },
    {
      theme: 'Enterprise trust',
      thought: 'This raises credibility when done with evidence.',
      issue: 'Claims without visible validation still feel like marketing.',
      solution:
        'Expose browser/device proof, operating constraints, and production extension points on the homepage itself.',
    },
    {
      theme: 'Brand feel',
      thought: 'The experience becomes more premium.',
      issue:
        'Conventional website cues can cheapen a systems story when the audience expects workflow software.',
      solution:
        'Treat the homepage as a wizard-like control surface with clear checkpoints instead of a brochure layout.',
    },
  ];

  const selectedContext = useMemo(() => {
    return (
      portfolioContexts.find((context) => context.slug === selectedAudience) ?? portfolioContexts[0]
    );
  }, [selectedAudience]);

  const selectedProfile = wizardProfiles[selectedContext.slug];
  const selectedTrack: AudienceTrack =
    selectedContext.slug === 'openai' || selectedContext.slug === 'product-systems'
      ? 'openai'
      : 'construction';

  const prioritizedContexts = useMemo(() => {
    return [...portfolioContexts].sort((a, b) => {
      if (a.slug === selectedAudience) {
        return -1;
      }

      if (b.slug === selectedAudience) {
        return 1;
      }

      return a.priority - b.priority;
    });
  }, [selectedAudience]);

  const recommendedCaseStudies = useMemo(() => {
    return caseStudies
      .filter((caseStudy) => caseStudy.relevanceTags.includes(selectedTrack))
      .slice(0, 2);
  }, [selectedTrack]);

  const recommendedProof = useMemo(() => {
    return proofArtifacts
      .filter((artifact) => artifact.relevanceTags.includes(selectedTrack))
      .slice(0, 6);
  }, [selectedTrack]);

  const storySteps = useMemo(() => {
    const fallbackArtifacts = selectedContext.featuredArtifacts.slice(0, 3);
    return [
      {
        step: 'Step 1',
        title: 'Confirm the reviewer context',
        description: selectedContext.audience,
        href: selectedContext.ctaHref,
        cta: selectedContext.ctaLabel,
        note: selectedProfile.systemStatus,
      },
      {
        step: 'Step 2',
        title: 'Read why this route matters',
        description: selectedContext.whyItMatters,
        href: fallbackArtifacts[0]?.href ?? selectedContext.ctaHref,
        cta: fallbackArtifacts[0]?.label ?? selectedContext.ctaLabel,
        note: selectedProfile.question,
      },
      {
        step: 'Step 3',
        title: 'Inspect the strongest proof',
        description: selectedContext.strongestProof,
        href: fallbackArtifacts[1]?.href ?? '/cpq-demo',
        cta: fallbackArtifacts[1]?.label ?? 'Open live proof',
        note: selectedProfile.browserFocus,
      },
    ];
  }, [selectedContext, selectedProfile]);

  const proofChecks = useMemo(() => {
    return [
      {
        label: 'Responsive route coverage',
        detail: `Critical paths for ${selectedProfile.shortLabel.toLowerCase()} are exercised on small phone, phone, tablet, and desktop widths.`,
      },
      {
        label: 'Trust-first interaction safety',
        detail:
          'Search, modal, and guided-path interactions are validated for keyboard access, mobile containment, and visible next actions.',
      },
      {
        label: 'Production-like delivery model',
        detail: `Next.js production builds, Vercel analytics, sitemap generation, and smoke automation support this ${selectedProfile.shortLabel.toLowerCase()} review mode.`,
      },
    ];
  }, [selectedProfile]);

  const handleAudienceSelection = (slug: PortfolioContextSlug) => {
    setSelectedAudience(slug);
    recordRecruiterEvent('homepage_wizard_audience_selected', { audience: slug });
  };

  return (
    <main id="main-content" className="pb-20">
      <section className="showcase-hero">
        <div className="showcase-shell relative z-10 py-12 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="showcase-eyebrow">Guided enterprise intake</p>
                <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.07em] text-white sm:text-7xl">
                  A story framework wizard for zero-knowledge reviewers, not a portfolio they have
                  to decode.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-slate-300">
                  This experience behaves more like a trusted public workflow system: clear entry
                  points, plain-language checkpoints, visible proof, and production-minded signals
                  that help recruiters and enterprise buyers move with confidence.
                </p>
              </div>

              <div
                className="rounded-[2rem] border border-cyan-300/15 bg-[#07111f]/92 p-5 shadow-[0_24px_100px_rgba(4,12,28,0.42)]"
                data-testid="wizard-audience-panel"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">
                      Reviewer selector
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      Choose the review path
                    </h2>
                  </div>
                  <p className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
                    {selectedProfile.systemStatus}
                  </p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {wizardAudienceOrder.map((slug) => {
                    const context = portfolioContexts.find((item) => item.slug === slug);

                    if (!context) {
                      return null;
                    }

                    const profile = wizardProfiles[slug];
                    const isSelected = slug === selectedAudience;

                    return (
                      <button
                        key={slug}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => handleAudienceSelection(slug)}
                        className={`min-h-20 rounded-[1.4rem] border px-4 py-4 text-left transition ${
                          isSelected
                            ? 'border-cyan-300/40 bg-cyan-300/12 text-white shadow-[0_18px_60px_rgba(34,211,238,0.14)]'
                            : 'border-white/10 bg-white/[0.03] text-slate-200 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                          {profile.shortLabel}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-white">{context.title}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{context.summary}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                      Active reviewer type
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {selectedProfile.reviewerType}
                    </p>
                    <p
                      className="mt-3 text-sm leading-7 text-slate-300"
                      data-testid="wizard-selected-question"
                    >
                      {selectedProfile.question}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                      Recommended artifacts
                    </p>
                    <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
                      {selectedContext.featuredArtifacts.slice(0, 3).map((artifact) => (
                        <li key={artifact.href} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                          <span>{artifact.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[1.6rem] border border-cyan-300/20 bg-[#081425]/88 p-5 shadow-[0_24px_90px_rgba(5,14,31,0.35)]">
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">
                    Experience mode
                  </p>
                  <p className="mt-3 text-xl font-semibold text-white">Guided path first</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Orientation, proof, and contact are sequenced with minimal ambiguity.
                  </p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    Accessibility posture
                  </p>
                  <p className="mt-3 text-xl font-semibold text-white">Large-target UI</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    High-contrast sections and obvious next actions for non-technical users.
                  </p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Trust signal</p>
                  <p className="mt-3 text-xl font-semibold text-white">Browser/device proof</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Production-like coverage is treated as part of the product story.
                  </p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    Selected route
                  </p>
                  <p className="mt-3 text-xl font-semibold text-white">{selectedContext.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {selectedContext.strongestProof}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <RecruiterLink
                  href={selectedProfile.primaryActionHref}
                  eventName="portfolio_context_opened"
                  eventPayload={{ context: selectedAudience, source: 'homepage_hero_primary' }}
                  className="inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
                >
                  {selectedProfile.primaryActionLabel}
                </RecruiterLink>
                <RecruiterLink
                  href={selectedProfile.secondaryActionHref}
                  eventName="portfolio_context_opened"
                  eventPayload={{ context: selectedAudience, source: 'homepage_hero_secondary' }}
                  className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
                >
                  {selectedProfile.secondaryActionLabel}
                </RecruiterLink>
                <SearchTriggerButton
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-100"
                  label="Search the portfolio"
                />
              </div>
            </div>

            <aside
              aria-labelledby="guided-review-title"
              className="rounded-[2rem] border border-white/10 bg-[#07111f]/92 p-6 shadow-[0_28px_120px_rgba(3,9,24,0.45)] backdrop-blur"
            >
              <p className="showcase-eyebrow">Review flow</p>
              <h2
                id="guided-review-title"
                className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.05em] text-white"
              >
                Review this like a high-trust civic workflow.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Each section has one job: orient the reviewer, expose proof, and move them to the
                right depth without requiring prior technical context.
              </p>
              <ol className="mt-6 space-y-4" aria-label="Guided review steps">
                {storySteps.map((item) => (
                  <li
                    key={item.step}
                    className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.28em] text-teal-200/80">
                      {item.step}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{item.note}</p>
                    <RecruiterLink
                      href={item.href}
                      className="mt-4 inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-100"
                    >
                      {item.cta}
                    </RecruiterLink>
                  </li>
                ))}
              </ol>
            </aside>
          </div>

          <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
            {principalMetrics.slice(0, 3).map((metric) => (
              <div key={metric.label}>
                <p className="text-3xl font-semibold tracking-[-0.05em] text-white">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-100">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="showcase-shell showcase-section space-y-8">
        <SectionHeading
          eyebrow="Shift assessment"
          title="How the company should feel about this product shift"
          description="The move away from a conventional website is strong. It improves trust for enterprise readers, as long as the experience stays explicit, accessible, and testable."
        />
        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#07111f]/90">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <caption className="sr-only">
                Assessment of the guided story framework shift including thoughts, issues, and
                solutions.
              </caption>
              <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.24em] text-slate-400">
                <tr>
                  <th scope="col" className="px-5 py-4 font-medium">
                    Theme
                  </th>
                  <th scope="col" className="px-5 py-4 font-medium">
                    Thought
                  </th>
                  <th scope="col" className="px-5 py-4 font-medium">
                    Issue
                  </th>
                  <th scope="col" className="px-5 py-4 font-medium">
                    Solution
                  </th>
                </tr>
              </thead>
              <tbody>
                {shiftAssessment.map((row) => (
                  <tr key={row.theme} className="align-top border-t border-white/10">
                    <th scope="row" className="px-5 py-5 text-sm font-semibold text-white">
                      {row.theme}
                    </th>
                    <td className="px-5 py-5 text-sm leading-7 text-slate-200">{row.thought}</td>
                    <td className="px-5 py-5 text-sm leading-7 text-slate-300">{row.issue}</td>
                    <td className="px-5 py-5 text-sm leading-7 text-slate-300">{row.solution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="showcase-shell showcase-section space-y-8">
        <SectionHeading
          eyebrow="Browser proof"
          title="Real browser and device conditions are part of the product story"
          description="Enterprise confidence increases when the review surface states how the experience is validated. This matters even more for recruiters and buyers reading on phones, tablets, and managed work laptops."
        />
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.9rem] border border-cyan-300/15 bg-[#081425]/92 p-6 shadow-[0_24px_100px_rgba(4,12,28,0.42)]">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">
              Production-like validation
            </p>
            <div className="mt-5 space-y-5">
              {proofChecks.map((check) => (
                <div
                  key={check.label}
                  className="border-t border-white/10 pt-5 first:border-t-0 first:pt-0"
                >
                  <h3 className="text-xl font-semibold text-white">{check.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{check.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.9rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Implementation posture
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>Use guided-path CTAs as the primary smoke path, not just free browsing.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>Keep every key action visible and keyboard reachable on mobile widths.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>{selectedProfile.browserFocus}</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>
                  Preserve the deep library behind the wizard so advanced reviewers can still branch
                  outward.
                </span>
              </li>
            </ul>
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
          eyebrow="Guided paths"
          title="Choose a route instead of decoding the whole archive"
          description="Each context still leads to the same body of proof, but the first decision is now obvious, stateful, and low-friction."
        />
        <div className="grid gap-5 xl:grid-cols-2">
          {prioritizedContexts.map((context) => (
            <ContextCard key={context.slug} context={context} />
          ))}
        </div>
      </section>

      <section className="showcase-shell showcase-section space-y-8">
        <SectionHeading
          eyebrow="Operating profile"
          title="The operating model stays consistent even as the wrapper becomes more guided"
          description="The product shift does not change the substance. It changes the reading order so business value, workflow clarity, and reliability land before implementation depth."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="showcase-panel">
            <p className="showcase-eyebrow">Why the selected route matters</p>
            <div className="mt-6 space-y-6">
              <div className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                <h3 className="text-xl font-semibold text-white">{selectedContext.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{selectedContext.summary}</p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-xl font-semibold text-white">Reviewer question</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{selectedProfile.question}</p>
              </div>
              {domainSignals.map((signal) => (
                <div key={signal.title} className="border-t border-white/10 pt-4">
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
                <span>Case studies remain the architecture-heavy proof center.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>
                  The Autodesk video archive stays accessible through its focused context page.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>
                  The full proof library still supports advanced reviewers who want the long tail.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="showcase-shell showcase-section space-y-8">
        <SectionHeading
          eyebrow="Flagship proof"
          title="Case studies now adapt to the selected audience"
          description="The wizard gets people oriented faster, then the strongest matching case studies take over for architecture, operating constraints, and outcomes."
        />
        <div>
          {recommendedCaseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </section>

      <section className="showcase-shell showcase-section space-y-8">
        <SectionHeading
          eyebrow="Autodesk proof"
          title="The archive is still available, but no longer competes with the first impression"
          description="The strongest Autodesk videos remain visible while the full archive stays routed behind its own context page."
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
          title="Archive depth remains available behind the guided wrapper"
          description="The older proof has not disappeared. It now sits behind a cleaner path so reviewers can go deep without getting lost too early."
        />
        <ProofLibrary artifacts={recommendedProof} />
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
              Guided onboarding up front, full enterprise proof still intact underneath.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-300">
              Start with {selectedContext.title}, then move into live proof, case studies, and the
              full library without losing the narrative.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <RecruiterLink
              href={selectedProfile.primaryActionHref}
              eventName="portfolio_context_opened"
              eventPayload={{ context: selectedAudience, source: 'homepage_footer_primary' }}
              className="inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
            >
              {selectedProfile.primaryActionLabel}
            </RecruiterLink>
            <RecruiterLink
              href="/contexts/full-proof-library"
              eventName="portfolio_context_opened"
              eventPayload={{ context: 'full-proof-library', source: 'homepage_footer' }}
              className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
            >
              Browse full proof library
            </RecruiterLink>
          </div>
        </div>
      </section>
    </main>
  );
}
