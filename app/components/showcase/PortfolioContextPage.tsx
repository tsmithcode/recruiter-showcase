import SkillsMatrix from '@/components/SkillsMatrix';
import {
  chronologyGroups,
  getVideoChronology,
  parseContextViewState,
  PhaseId,
  resumeArtifact,
  RoleLens,
} from '@/lib/controlCenter';
import {
  autodeskVideoArtifacts,
  getAllProofArtifacts,
  getFeaturedAutodeskVideos,
  getPortfolioContext,
  PortfolioContext,
  PortfolioContextSlug,
  qtsDiagramSpecs,
  qtsFirstThirtyDays,
  qtsGovernanceCapabilities,
  qtsLifecycleMappings,
  qtsResponsibilities,
} from '@/lib/portfolioContent';
import {
  audienceTracks,
  caseStudies,
  ProofArtifact,
  proofArtifacts,
  systemMap,
} from '@/lib/showcaseContent';

import ArtifactBadge from './ArtifactBadge';
import AutodeskVideoLibrary from './AutodeskVideoLibrary';
import CadAmbientBackdrop from './CadAmbientBackdrop';
import CadGuardianBranch from './CadGuardianBranch';
import CaseStudyCard from './CaseStudyCard';
import ContextControlHeader from './ContextControlHeader';
import ProofLibrary from './ProofLibrary';
import {
  FirstThirtyDaysDiagram,
  GovernanceOverlayDiagram,
  LifecycleTimelineDiagram,
  QtsAppendixImages,
  ResponsibilitiesArchitectureDiagram,
} from './QtsArchitectureDiagrams';
import RecruiterLink from './RecruiterLink';
import SectionHeading from './SectionHeading';
import SystemsMap from './SystemsMap';
import ZoomableImage from './ZoomableImage';

type PortfolioContextPageProps = {
  context: PortfolioContext;
  searchParams?: Record<string, string | string[] | undefined>;
};

type SectionFrameProps = {
  id: string;
  phase: PhaseId;
  currentPhase: PhaseId;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

const programFrames = [
  {
    title: 'Target operating model',
    description:
      'Frame ACC, analytics, procurement, finance, and operational data as one future-state operating model instead of isolated tool rollouts.',
  },
  {
    title: 'Governance boards and decision points',
    description:
      'Use sponsor, program-manager, and business-change-manager patterns to keep architecture, adoption, and business accountability aligned.',
  },
  {
    title: 'Benefit tracking',
    description:
      'Treat the benefit register as a delivery control, not paperwork: define ownership, KPIs, and whether centralization is actually reducing friction.',
  },
  {
    title: 'Phased execution and transition',
    description:
      'Move from feasibility to definition to delivery with handover in mind so Docs, Build, Cost, and analytics do not become disconnected initiatives.',
  },
];

const archiveLinks = [
  {
    label: 'Original WinForms PDM article',
    href: '/blog/WinForms-PDM-Sprint3',
    summary: 'Long-form walkthrough of the drawing-search system evolution.',
    kind: 'section' as const,
  },
  {
    label: 'Original Vault troubleshooting article',
    href: '/blog/autodesk-vault-troubleshooting',
    summary: 'Detailed runbook-style proof for Vault, Job Processor, and client issues.',
    kind: 'section' as const,
  },
  {
    label: 'Legacy OpenAI recruiter track',
    href: '/tracks/openai',
    summary: 'Earlier recruiter-oriented ordering of the same proof set.',
    kind: 'context-page' as const,
  },
  {
    label: 'Legacy construction recruiter track',
    href: '/tracks/construction',
    summary: 'Earlier construction/data-center ordering of the same proof set.',
    kind: 'context-page' as const,
  },
  {
    label: resumeArtifact.title,
    href: resumeArtifact.href,
    summary: resumeArtifact.summary,
    kind: resumeArtifact.kind,
  },
];

export default function PortfolioContextPage({
  context,
  searchParams = {},
}: PortfolioContextPageProps) {
  const viewState = parseContextViewState(context.slug, searchParams);

  switch (context.slug) {
    case 'qts-suwanee':
      return <QtsContextPage context={context} lens={viewState.lens} phase={viewState.phase} />;
    case 'autodesk-cad':
      return <AutodeskCadContextPage context={context} lens={viewState.lens} phase={viewState.phase} />;
    case 'openai':
      return <OpenAiContextPage context={context} lens={viewState.lens} phase={viewState.phase} />;
    case 'product-systems':
      return <ProductSystemsContextPage context={context} lens={viewState.lens} phase={viewState.phase} />;
    case 'creative-ai':
      return <CreativeAiContextPage context={context} lens={viewState.lens} phase={viewState.phase} />;
    case 'full-proof-library':
      return <FullProofLibraryContextPage context={context} lens={viewState.lens} phase={viewState.phase} />;
    default:
      return null;
  }
}

function QtsContextPage({
  context,
  lens,
  phase,
}: {
  context: PortfolioContext;
  lens: RoleLens;
  phase: PhaseId;
}) {
  const featuredVideos = getFeaturedAutodeskVideos().slice(0, 4);
  const supportingCaseStudies = caseStudies.filter((caseStudy) =>
    ['vault-ops-reliability', 'operator-search-platform', 'cpq-decision-workbench'].includes(
      caseStudy.slug
    )
  );
  const lensSummary = getQtsLensSummary(lens);

  return (
    <main className="pb-20">
      <section id="overview" className="showcase-hero context-hero context-hero-cad">
        <CadAmbientBackdrop variant="hero" />
        <div className="showcase-shell relative z-10 grid gap-8 py-14 lg:grid-cols-[1fr_0.95fr] lg:items-end lg:py-18">
          <div className="space-y-7">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <ArtifactBadge kind="context-page" />
                <span className="showcase-chip">QTS reference context</span>
                <span className="showcase-chip">{roleLensLabel(lens)}</span>
              </div>
              <p className="showcase-eyebrow">QTS Suwanee / Autodesk systems</p>
              <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">
                Autodesk architecture for a governed construction lifecycle, not just a tool rollout.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">{lensSummary.hero}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {lensSummary.chips.map((chip) => (
                <span key={chip} className="showcase-chip">
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <RecruiterLink
                href="/contexts/autodesk-cad?lens=business&phase=proof"
                eventName="qts_crosslink_opened"
                eventPayload={{ source: 'qts_hero', target: 'autodesk-cad' }}
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
              >
                Open Autodesk proof
              </RecruiterLink>
              <RecruiterLink
                href={resumeArtifact.href}
                target="_blank"
                rel="noreferrer"
                eventName="resume_clicked"
                eventPayload={{ source: 'qts_hero' }}
                className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
              >
                Open resume PDF
              </RecruiterLink>
            </div>
          </div>

          <div className="showcase-media-stage bg-[#081223]/88">
            <div className="relative min-h-[19rem] sm:min-h-[21rem]">
              <ZoomableImage
                src="/images/qts/suwanee-hero.jpeg"
                alt="QTS Suwanee, Georgia data center campus"
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                imageClassName="object-cover opacity-52"
                hintLabel="Open campus image"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,12,24,0.18),rgba(5,12,24,0.86))]" />
              <div className="relative z-10 flex min-h-[19rem] flex-col justify-end gap-4 p-5 sm:min-h-[21rem] sm:p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-sky-200/80">
                    Suwanee context
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                    Hyperscale delivery with cross-system accountability
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-slate-200">{lensSummary.aside}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {lensSummary.panels.map((panel) => (
                    <div key={panel.title} className="showcase-panel-subtle bg-white/[0.06]">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                        {panel.title}
                      </p>
                      <p className="mt-2 text-sm text-slate-100">{panel.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContextControlHeader context={context} />

      <SectionFrame
        id="role-lens"
        phase="role-lens"
        currentPhase={phase}
        eyebrow="Role lens"
        title={`${roleLensLabel(lens)} view of the QTS role`}
        description={lensSummary.sectionDescription}
      >
        <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="showcase-panel">
            <div className="flex flex-wrap gap-2">
              <ArtifactBadge kind="section" />
              <span className="showcase-chip">{roleLensLabel(lens)}</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white">{lensSummary.heading}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              {lensSummary.body}
            </p>
          </div>

          <div className="showcase-panel-strong bg-[#091120]/88">
            <p className="showcase-eyebrow">What this lens prioritizes</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              {lensSummary.priorities.map((priority) => (
                <li key={priority} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{priority}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame
        id="systems"
        phase="systems"
        currentPhase={phase}
        eyebrow="Systems"
        title="The system model behind the Suwanee assignment"
        description="This is the architecture layer: responsibilities, governance overlay, and lifecycle mapping anchored in ACC and enterprise integration."
      >
        <div id="responsibilities-map">
          <ResponsibilitiesArchitectureDiagram groups={qtsResponsibilities} />
        </div>
        <div id="governance-overlay" className="mt-8">
          <GovernanceOverlayDiagram capabilities={qtsGovernanceCapabilities} />
        </div>

        <div className="showcase-panel-strong mt-8 bg-[#081223]/88">
          <div className="flex flex-wrap items-center gap-2">
            <ArtifactBadge kind="diagram" />
            <span className="showcase-chip">Lifecycle rail</span>
            <span className="showcase-chip">Scoped to QTS</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-white">
            ACC modules, roles, and documents aligned to lifecycle phases
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            This nested rail keeps the ACC conversation inside the QTS program boundary instead of
            turning it into generic Autodesk terminology.
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
            {qtsLifecycleMappings.map((mapping) => (
              <div key={mapping.phase} className="showcase-panel-subtle">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{mapping.phase}</p>
                <p className="mt-2 text-sm font-semibold text-white">{mapping.accModule}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="lifecycle-map" className="mt-8">
          <LifecycleTimelineDiagram mappings={qtsLifecycleMappings} />
        </div>
      </SectionFrame>

      <SectionFrame
        id="proof"
        phase="proof"
        currentPhase={phase}
        eyebrow="Proof"
        title="Autodesk depth and systems proof that reinforce the QTS read"
        description="The QTS path stays scoped. These supporting artifacts carry deeper Autodesk and workflow evidence without dropping you out of the current discussion."
      >
        <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="showcase-panel-strong bg-[#091120]/88">
            <div className="flex flex-wrap gap-2">
              <ArtifactBadge kind="video" />
              <span className="showcase-chip">Autodesk chronology</span>
            </div>
            <p className="showcase-eyebrow mt-5">Featured Autodesk proof</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              These are the strongest video proofs to open in a QTS conversation. The full Autodesk
              chronology stays available in its own context page.
            </p>
            <div className="mt-5 grid gap-4">
              {featuredVideos.map((video) => {
                const chronology = getVideoChronology(video);
                return (
                  <article
                    key={video.id}
                    className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex flex-wrap gap-2">
                      <ArtifactBadge kind="video" compact />
                      <span className="showcase-chip">{chronology.chronologyGroup}</span>
                      {chronology.yearHint ? <span className="showcase-chip">{chronology.yearHint}</span> : null}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">{video.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{video.whatItProves}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <RecruiterLink
                        href={video.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        eventName="autodesk_video_opened"
                        eventPayload={{ video: video.id, source: 'qts_context' }}
                        className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
                      >
                        Open video
                      </RecruiterLink>
                      <RecruiterLink
                        href="/contexts/autodesk-cad?lens=architecture&phase=proof"
                        eventName="qts_crosslink_opened"
                        eventPayload={{ source: 'qts_proof', target: 'autodesk-cad' }}
                        className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
                      >
                        Open Autodesk page
                      </RecruiterLink>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div>
            {supportingCaseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
            ))}
          </div>
        </div>
      </SectionFrame>

      <SectionFrame
        id="deep-dive"
        phase="deep-dive"
        currentPhase={phase}
        eyebrow="Deep Dive"
        title="Governance, onboarding sequence, and supporting appendix"
        description="This is the layer for the parts of the conversation that get dirty: program shape, first-30-day action, and the original diagram inputs."
      >
        <div id="first-30-days">
          <FirstThirtyDaysDiagram blocks={qtsFirstThirtyDays} />
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-4">
          {programFrames.map((frame) => (
            <article
              key={frame.title}
              className="showcase-panel-subtle"
            >
              <h3 className="text-xl font-semibold text-white">{frame.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{frame.description}</p>
            </article>
          ))}
        </div>

        {lens === 'technical' ? (
          <div className="mt-8">
            <QtsAppendixImages specs={qtsDiagramSpecs} />
          </div>
        ) : null}
      </SectionFrame>
    </main>
  );
}

function AutodeskCadContextPage({
  context,
  lens,
  phase,
}: {
  context: PortfolioContext;
  lens: RoleLens;
  phase: PhaseId;
}) {
  const featuredCaseStudies = caseStudies.filter((caseStudy) =>
    ['vault-ops-reliability', 'operator-search-platform', 'cpq-decision-workbench'].includes(
      caseStudy.slug
    )
  );

  const chronologySummary = chronologyGroups.map((group) => {
    const items = autodeskVideoArtifacts.filter(
      (video) => getVideoChronology(video).chronologyGroup === group
    );

    return {
      group,
      count: items.length,
      yearHint: items.find((item) => getVideoChronology(item).yearHint)?.id
        ? getVideoChronology(items.find((item) => getVideoChronology(item).yearHint)!).yearHint
        : undefined,
    };
  });

  return (
    <main className="pb-20">
      <section id="overview" className="showcase-hero context-hero context-hero-cad">
        <CadAmbientBackdrop variant="hero" />
        <div className="showcase-shell relative z-10 grid gap-8 py-14 lg:grid-cols-[1fr_0.95fr] lg:items-end lg:py-18">
          <div className="space-y-7">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <ArtifactBadge kind="context-page" />
                <span className="showcase-chip">{roleLensLabel(lens)}</span>
                <span className="showcase-chip">Autodesk chronology</span>
              </div>
              <p className="showcase-eyebrow">{context.title}</p>
              <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">
                Twelve-plus years of CAD work, organized like an architecture system instead of a media dump.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                This context groups the Autodesk archive by chronology, proof type, and business use so a hiring manager can see both long-run depth and current relevance immediately.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="showcase-chip">Inventor API</span>
              <span className="showcase-chip">Vault + PDM</span>
              <span className="showcase-chip">Pre-AI continuity</span>
              <span className="showcase-chip">2017-era archive signal</span>
            </div>
          </div>

          <div className="showcase-panel-strong bg-[#081223]/88">
            <p className="showcase-eyebrow">Why this context matters</p>
            <div className="mt-5 grid gap-4">
              <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.05] p-4">
                <h2 className="text-xl font-semibold text-white">Long-run Autodesk depth</h2>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  The archive proves durable Autodesk development experience that predates the current AI wave.
                </p>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.05] p-4">
                <h2 className="text-xl font-semibold text-white">Business-safe navigation</h2>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Videos are grouped by maturity and purpose, not just listed as raw demos.
                </p>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.05] p-4">
                <h2 className="text-xl font-semibold text-white">Searchable chronology</h2>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Terms like Inventor, Vault, Configurator, ERP, and 2017 route to the right era fast.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContextControlHeader context={context} />

      <SectionFrame
        id="role-lens"
        phase="role-lens"
        currentPhase={phase}
        eyebrow="Role lens"
        title={`${roleLensLabel(lens)} view of the Autodesk archive`}
        description="This lens keeps the same proof set but changes the emphasis so you can speak to hiring managers, delivery stakeholders, architects, or deep technical reviewers without losing the thread."
      >
        <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="showcase-panel">
            <h3 className="text-2xl font-semibold text-white">{getAutodeskLensSummary(lens).heading}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {getAutodeskLensSummary(lens).body}
            </p>
          </div>
          <div className="showcase-panel-strong bg-[#091120]/88">
            <p className="showcase-eyebrow">What this lens prioritizes</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              {getAutodeskLensSummary(lens).priorities.map((priority) => (
                <li key={priority} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{priority}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame
        id="systems"
        phase="systems"
        currentPhase={phase}
        eyebrow="Systems"
        title="Chronology and business context before the raw media"
        description="The Autodesk body of work is grouped by evolution so the page communicates maturity and continuity instead of feeling like a playlist."
      >
        <div className="grid gap-4 lg:grid-cols-4">
          {chronologySummary.map((group) => (
            <article
              key={group.group}
              id={`era-${group.group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="showcase-panel-subtle"
            >
              <div className="flex flex-wrap gap-2">
                <ArtifactBadge kind="video" compact />
                <span className="showcase-chip">{group.group}</span>
                {group.yearHint ? <span className="showcase-chip">{group.yearHint}</span> : null}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{group.group}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {group.count} artifacts in this era, organized to show the progression from foundational Autodesk automation to broader workflow and integration maturity.
              </p>
            </article>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame
        id="proof"
        phase="proof"
        currentPhase={phase}
        eyebrow="Proof"
        title="Focused archive"
        description="The archive is still deep, but it is now grouped, searchable, and easier to speak through live."
      >
        <AutodeskVideoLibrary videos={autodeskVideoArtifacts} />
      </SectionFrame>

      <SectionFrame
        id="deep-dive"
        phase="deep-dive"
        currentPhase={phase}
        eyebrow="Deep Dive"
        title="Related architecture proof and business branch"
        description="The videos are one proof layer. These case studies and the CAD Guardian branch show architecture, operations, and C2C positioning around the same body of work."
      >
        <div>
          {featuredCaseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
        <div className="mt-8">
          <CadGuardianBranch />
        </div>
      </SectionFrame>
    </main>
  );
}

function OpenAiContextPage({
  context,
  lens,
  phase,
}: {
  context: PortfolioContext;
  lens: RoleLens;
  phase: PhaseId;
}) {
  const content = audienceTracks.openai;
  const featuredCaseStudies = caseStudies.filter((caseStudy) =>
    caseStudy.relevanceTags.includes('openai')
  );
  const featuredProof = proofArtifacts.filter((artifact) =>
    artifact.relevanceTags.includes('openai')
  );
  const openAiSummary = getOpenAiLensSummary(lens);

  return (
    <main className="pb-20">
      <section id="overview" className="showcase-hero context-hero">
        <div className="showcase-shell relative z-10 grid gap-8 py-14 lg:grid-cols-[1fr_0.92fr] lg:items-end lg:py-18">
          <div className="space-y-7">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <ArtifactBadge kind="context-page" />
                <span className="showcase-chip">Codex 5.4</span>
                <span className="showcase-chip">{roleLensLabel(lens)}</span>
              </div>
              <p className="showcase-eyebrow">{content.eyebrow}</p>
              <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">
                Workflow systems, operator tooling, and current AI leverage under operational constraints.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">{openAiSummary.hero}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <RecruiterLink
                href="/cpq-demo"
                eventName="proof_artifact_opened"
                eventPayload={{ artifactId: 'demo-cpq', source: 'openai_hero' }}
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
              >
                Open CPQ proof
              </RecruiterLink>
              <RecruiterLink
                href={resumeArtifact.href}
                target="_blank"
                rel="noreferrer"
                eventName="resume_clicked"
                eventPayload={{ source: 'openai_hero' }}
                className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
              >
                Open resume PDF
              </RecruiterLink>
            </div>
          </div>

          <div className="showcase-panel-strong bg-[#091120]/88">
            <p className="showcase-eyebrow">Current leverage</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              {openAiSummary.priorities.map((priority) => (
                <li key={priority} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{priority}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContextControlHeader context={context} />

      <SectionFrame
        id="role-lens"
        phase="role-lens"
        currentPhase={phase}
        eyebrow="Role lens"
        title={`${roleLensLabel(lens)} view of the OpenAI path`}
        description={openAiSummary.description}
      >
        <div className="showcase-panel">
          <h3 className="text-2xl font-semibold text-white">{openAiSummary.heading}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            {openAiSummary.body}
          </p>
        </div>
      </SectionFrame>

      <SectionFrame
        id="systems"
        phase="systems"
        currentPhase={phase}
        eyebrow="Systems"
        title="The common pattern is controlled decision-making"
        description="Different domains, same operating model: expose the logic, reduce operator drag, and use the right tool at the right time."
      >
        <SystemsMap lanes={systemMap} />
      </SectionFrame>

      <SectionFrame
        id="proof"
        phase="proof"
        currentPhase={phase}
        eyebrow="Proof"
        title="Case studies most relevant to internal tools and workflow systems"
        description="These are the strongest examples of translating ambiguous operational pain into inspectable software and usable operator surfaces."
      >
        <div>
          {featuredCaseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </SectionFrame>

      <SectionFrame
        id="deep-dive"
        phase="deep-dive"
        currentPhase={phase}
        eyebrow="Deep Dive"
        title="Supporting artifacts and current-state tooling"
        description="This layer clarifies current OpenAI-era leverage without replacing the deeper Autodesk foundation elsewhere in the site."
      >
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="showcase-panel-subtle">
            <div className="flex flex-wrap gap-2">
              <ArtifactBadge kind="section" />
              <span className="showcase-chip">Current stack</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white">Codex 5.4 and AI-native workflow thinking</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              This path speaks to current operating edge: using Codex 5.4, prompt-aware workflow design, and AI-assisted iteration without hiding the system boundaries or the business logic.
            </p>
          </div>
          <ProofLibrary artifacts={featuredProof} />
        </div>
      </SectionFrame>
    </main>
  );
}

function ProductSystemsContextPage({
  context,
  lens,
  phase,
}: {
  context: PortfolioContext;
  lens: RoleLens;
  phase: PhaseId;
}) {
  const featuredProof = getAllProofArtifacts();

  return (
    <main className="pb-20">
      <section id="overview" className="showcase-hero context-hero">
        <div className="showcase-shell relative z-10 grid gap-8 py-14 lg:grid-cols-[1fr_0.92fr] lg:items-end lg:py-18">
          <div className="space-y-7">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <ArtifactBadge kind="context-page" />
                <span className="showcase-chip">{roleLensLabel(lens)}</span>
              </div>
              <p className="showcase-eyebrow">Product systems context</p>
              <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">
                Business-rule software that makes the workflow legible before it makes it pretty.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                This context groups the strongest operator-system artifacts so the product logic stays clearer than the tech stack.
              </p>
            </div>
          </div>
          <div className="showcase-panel-strong bg-[#091120]/88">
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              {[
                'Internal tools and operator-facing software',
                'Visible business rules instead of hidden spreadsheet logic',
                'Case studies that show system boundaries, not just UI',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContextControlHeader context={context} />

      <SectionFrame
        id="systems"
        phase="systems"
        currentPhase={phase}
        eyebrow="Systems"
        title="Workflow engines, integration surfaces, decision systems, and execution"
        description="This is the common structure behind the portfolio: practical systems that survive real operational constraints."
      >
        <SystemsMap lanes={systemMap} />
      </SectionFrame>

      <SectionFrame
        id="proof"
        phase="proof"
        currentPhase={phase}
        eyebrow="Proof"
        title="The strongest workflow-system narratives"
        description="These examples show how product framing, architecture, and delivery judgment reinforce each other."
      >
        <div>
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </SectionFrame>

      <SectionFrame
        id="deep-dive"
        phase="deep-dive"
        currentPhase={phase}
        eyebrow="Deep Dive"
        title="Supporting evidence"
        description="The archive remains available; this path simply keeps the workflow-system signal strongest."
      >
        <ProofLibrary artifacts={featuredProof} />
      </SectionFrame>
    </main>
  );
}

function CreativeAiContextPage({
  context,
  phase,
}: {
  context: PortfolioContext;
  lens: RoleLens;
  phase: PhaseId;
}) {
  const selectedProof = [
    proofArtifacts.find((artifact) => artifact.id === 'demo-cpq'),
    proofArtifacts.find((artifact) => artifact.id === 'video-erp-crm'),
  ].filter(Boolean) as ProofArtifact[];

  return (
    <main className="pb-20">
      <section id="overview" className="showcase-hero context-hero">
        <div className="showcase-shell relative z-10 grid gap-8 py-14 lg:grid-cols-[1fr_0.92fr] lg:items-end lg:py-18">
          <div className="space-y-7">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <ArtifactBadge kind="context-page" />
                <span className="showcase-chip">aJam</span>
              </div>
              <p className="showcase-eyebrow">Creative AI / aJam</p>
              <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">
                Prompt-first interaction, musical structure, and guided output reliability.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                aJam stays a supporting context here: proof that creative interaction and controlled output can coexist without collapsing into AI gimmickry.
              </p>
            </div>
          </div>

          <div className="showcase-panel-strong bg-[#091120]/88">
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              {[
                'Prompt-first capture instead of rigid forms',
                'Interpretability and guided output',
                'Creative interaction tied back to portfolio systems thinking',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContextControlHeader context={context} />

      <SectionFrame
        id="proof"
        phase="proof"
        currentPhase={phase}
        eyebrow="Proof"
        title="Related portfolio artifacts"
        description="aJam belongs here as supporting evidence, not as the center of gravity for the entire site."
      >
        <ProofLibrary artifacts={selectedProof} />
      </SectionFrame>
    </main>
  );
}

function FullProofLibraryContextPage({
  context,
  phase,
}: {
  context: PortfolioContext;
  lens: RoleLens;
  phase: PhaseId;
}) {
  return (
    <main className="pb-20">
      <section id="overview" className="showcase-hero context-hero">
        <div className="showcase-shell relative z-10 grid gap-8 py-14 lg:grid-cols-[1fr_0.92fr] lg:items-end lg:py-18">
          <div className="space-y-7">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <ArtifactBadge kind="context-page" />
                <span className="showcase-chip">Archive</span>
              </div>
              <p className="showcase-eyebrow">Full proof library</p>
              <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">
                The full archive stays available; it just no longer competes with the first 20 seconds.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                This is the preserved depth layer: case studies, supporting proof, resume, skills, Autodesk video chronology, and business branches like CAD Guardian.
              </p>
            </div>
          </div>
          <div className="showcase-panel-strong bg-[#091120]/88">
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              {[
                'Flagship case studies first',
                'Supporting proof library second',
                'Skills depth, archive material, and business branch third',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContextControlHeader context={context} />

      <SectionFrame
        id="proof"
        phase="proof"
        currentPhase={phase}
        eyebrow="Proof"
        title="Case studies and supporting evidence"
        description="This route keeps the deep archive legible by grouping the strongest proof first."
      >
        <div>
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
        <div className="mt-8">
          <ProofLibrary artifacts={getAllProofArtifacts()} />
        </div>
      </SectionFrame>

      <SectionFrame
        id="deep-dive"
        phase="deep-dive"
        currentPhase={phase}
        eyebrow="Deep Dive"
        title="Skills archive, preserved links, and business branch"
        description="This is where the older depth remains available for recruiters or hiring managers who want the full landscape."
      >
        <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-2">
          <SkillsMatrix />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {archiveLinks.map((link) => (
            <article
              key={link.href}
              className="showcase-panel-subtle"
            >
              <div className="flex flex-wrap gap-2">
                <ArtifactBadge kind={link.kind} compact />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{link.label}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{link.summary}</p>
              <RecruiterLink
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                eventName="archive_link_opened"
                eventPayload={{ href: link.href }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-200 transition hover:text-white"
              >
                Open link
                <span aria-hidden="true">↗</span>
              </RecruiterLink>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <CadGuardianBranch />
        </div>
      </SectionFrame>
    </main>
  );
}

function SectionFrame({
  id,
  phase,
  currentPhase,
  eyebrow,
  title,
  description,
  children,
}: SectionFrameProps) {
  const active = phase === currentPhase;

  return (
    <section id={id} className="showcase-shell showcase-section">
      <div
        className={`rounded-[1.8rem] border p-5 sm:p-6 ${
          active
            ? 'border-cyan-300/40 bg-white/[0.05] shadow-[0_22px_70px_rgba(8,145,178,0.12)]'
            : 'border-white/10 bg-transparent'
        }`}
      >
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function roleLensLabel(lens: RoleLens) {
  switch (lens) {
    case 'business':
      return 'Business';
    case 'delivery':
      return 'Delivery';
    case 'architecture':
      return 'Architecture';
    case 'technical':
      return 'Technical';
  }
}

function getQtsLensSummary(lens: RoleLens) {
  switch (lens) {
    case 'business':
      return {
        hero:
          'This view keeps the role simple: centralize project information, govern what matters, and help operations, finance, project controls, and IT trust the same environment.',
        aside:
          'The role is best understood as business-safe architecture: simplify the operating picture while making governance and accountability stronger, not heavier.',
        chips: ['Business-safe framing', 'Centralization', 'Trusted records', 'Stakeholder clarity'],
        panels: [
          {
            title: 'Immediate lens',
            body: 'Docs rollout, clean ownership, and usable information flow across the program.',
          },
          {
            title: 'Business value',
            body: 'Less fragmentation, clearer accountability, and a more trustworthy project record.',
          },
        ],
        sectionDescription:
          'What business leaders need to hear first: what gets cleaner, what gets governed, and why the role matters beyond Autodesk administration.',
        heading: 'Business-safe architecture view',
        body:
          'The message here is straightforward: centralization only matters if it creates a trustworthy operating picture for the business. This lens emphasizes governance, single source of truth thinking, and risk reduction in plain language.',
        priorities: [
          'Centralization without jargon overload',
          'Governed records that finance and operations can trust',
          'Single source of truth as an accountability mechanism',
          'Architecture that improves clarity instead of adding process noise',
        ],
      };
    case 'delivery':
      return {
        hero:
          'This view emphasizes rollout, enablement, and sequencing: ACC Docs posture, Cost Management readiness, stakeholder coordination, and what to assess first in the first 30 days.',
        aside:
          'Delivery discipline here means understanding where the rollout stands, what is blocked by adoption or metadata quality, and how to move governance and training together.',
        chips: ['Docs rollout', 'Enablement', 'First 30 days', 'Stakeholder sequencing'],
        panels: [
          {
            title: 'Immediate lens',
            body: 'Assess rollout posture, training dependencies, and practical adoption barriers.',
          },
          {
            title: 'Delivery value',
            body: 'Move the program forward without losing business alignment or overcomplicating the toolset.',
          },
        ],
        sectionDescription:
          'What delivery stakeholders need: sequencing, readiness, training alignment, and a realistic first-month path.',
        heading: 'Delivery readiness view',
        body:
          'This lens frames the role around rollout control: where Docs stands now, how Cost Management fits next, what integration dependencies exist, and how to keep governance from getting separated from adoption.',
        priorities: [
          'ACC Docs rollout posture and naming/folder control',
          'Cost Management readiness and downstream reporting implications',
          'Trainer alignment and business change pacing',
          'First-30-day architecture map that is realistic under operational pressure',
        ],
      };
    case 'architecture':
      return {
        hero:
          'This view focuses on the architecture mandate: connect ACC, analytics, finance, procurement, and operational systems into a governed lifecycle-aware data model.',
        aside:
          'Architecture is the center of gravity here. The tools matter, but the real mandate is trustworthy system interaction, ownership, lineage, and lifecycle clarity.',
        chips: ['Governance overlay', 'Lifecycle mapping', 'Integration control', 'System boundaries'],
        panels: [
          {
            title: 'Immediate lens',
            body: 'System boundaries, integration ownership, lifecycle stages, and governance controls.',
          },
          {
            title: 'Architecture value',
            body: 'A program view that is coherent enough for both operations and technical teams to work from.',
          },
        ],
        sectionDescription:
          'What architects and hiring managers need: systems, boundaries, governance, and lifecycle alignment in one readable structure.',
        heading: 'Architecture systems view',
        body:
          'This lens centers the role on system design: APIs, middleware, analytics, project record governance, and lifecycle-aligned ACC usage that can survive change rather than just enable a rollout.',
        priorities: [
          'System-of-record boundaries and data ownership',
          'Metadata, lineage, auditability, and integration governance',
          'ACC modules tied to real roles and document states',
          'Single source of truth designed as an architectural outcome',
        ],
      };
    case 'technical':
      return {
        hero:
          'This view reveals the deepest layer: exact lifecycle mappings, governance concerns, system dependencies, and the appendix inputs behind the QTS diagrams.',
        aside:
          'When the conversation gets technical, the structure remains the same. This lens simply exposes more detail without losing orientation or business framing.',
        chips: ['Deeper mappings', 'Dependencies', 'Appendix', 'Exact terminology'],
        panels: [
          {
            title: 'Immediate lens',
            body: 'Exact module, role, document, and systems detail with supporting diagrams.',
          },
          {
            title: 'Technical value',
            body: 'You can go into the weeds without losing the story or the audience.',
          },
        ],
        sectionDescription:
          'What deep technical reviewers need: exact mappings, sharper vocabulary, and the appendix evidence without changing the navigation model.',
        heading: 'Technical detail view',
        body:
          'This is the most detailed read of the QTS context. It preserves business-safe structure, but adds the exact language and deeper diagram layer that technical stakeholders will care about when the conversation gets specific.',
        priorities: [
          'Exact ACC module, role, and document mapping',
          'System dependencies and governance concerns',
          'First-30-day technical assessment priorities',
          'Appendix images and original wording inputs',
        ],
      };
  }
}

function getAutodeskLensSummary(lens: RoleLens) {
  switch (lens) {
    case 'business':
      return {
        heading: 'Business-safe archive view',
        body:
          'This lens explains the Autodesk history as business leverage: long-run reliability, repeatable operator tooling, and architecture that kept engineering work moving.',
        priorities: [
          'Long-run Autodesk depth without forcing the viewer through every video',
          'Clear chronology from foundational work to broader system maturity',
          'Business outcomes tied to engineering tools',
        ],
      };
    case 'delivery':
      return {
        heading: 'Delivery and adoption view',
        body:
          'This lens emphasizes the practical side of the archive: configurators, repeated engineering workflows, documentation handoff, and the operational surfaces that people actually used.',
        priorities: [
          'Operator workflows rather than abstract automation',
          'Configurators and automation that reduce delivery friction',
          'Evidence that the tools were usable under real constraints',
        ],
      };
    case 'architecture':
      return {
        heading: 'Architecture continuity view',
        body:
          'This lens emphasizes how the Autodesk archive supports systems thinking: API work, data persistence, ERP coupling, standards, and production-safe structure over time.',
        priorities: [
          'API and data integration discipline',
          'Cross-system continuity from CAD to ERP and downstream outputs',
          'Tooling organized as system proof, not demo clips',
        ],
      };
    case 'technical':
      return {
        heading: 'Technical chronology view',
        body:
          'This lens is closest to the raw archive. It highlights deeper tags, chronology groups, and the exact flavors of Inventor, Vault, WinForms, SQL, and integration work underneath the video surface.',
        priorities: [
          'Detailed chronology grouping',
          'Specific technology tags and workflow types',
          'Direct path from archive media into case-study depth',
        ],
      };
  }
}

function getOpenAiLensSummary(lens: RoleLens) {
  switch (lens) {
    case 'business':
      return {
        hero:
          'This path shows current leverage: how Thomas applies modern AI tools like Codex 5.4 to workflow systems and operator software without losing product clarity or accountability.',
        description:
          'Business-safe framing for the OpenAI path: current leverage, clearer systems, and operator productivity.',
        heading: 'Business-safe current-state view',
        body:
          'This lens positions the OpenAI path as the current operating edge. The point is not novelty; it is better decision support, faster delivery, and clearer system behavior.',
        priorities: [
          'Current AI leverage without hype',
          'Operator productivity and workflow clarity',
          'Business-rule transparency under ambiguity',
        ],
      };
    case 'delivery':
      return {
        hero:
          'This path emphasizes how current AI-native workflows reduce delivery friction, accelerate iteration, and support faster refinement without losing control.',
        description:
          'Delivery framing for the OpenAI path: faster iteration, system clarity, and usable operator surfaces.',
        heading: 'Delivery-oriented OpenAI view',
        body:
          'The strongest delivery signal here is controlled acceleration: using current AI tooling like Codex 5.4 while keeping outputs grounded in system boundaries, reviewability, and business use.',
        priorities: [
          'Workflow acceleration with reviewability',
          'Faster iteration without losing business context',
          'Usable systems for non-engineering operators',
        ],
      };
    case 'architecture':
      return {
        hero:
          'This path focuses on architecture under current AI conditions: operator surfaces, tool boundaries, decision systems, and how modern tooling fits inside accountable workflows.',
        description:
          'Architecture framing for the OpenAI path: current tooling, system boundaries, and product logic.',
        heading: 'Architecture-oriented OpenAI view',
        body:
          'This lens makes the OpenAI path less about “using AI” and more about building systems that remain legible and controllable when AI-assisted tools enter the workflow.',
        priorities: [
          'System boundaries under AI-assisted workflows',
          'Operator tools with explicit business logic',
          'Current tooling as leverage, not as the product thesis',
        ],
      };
    case 'technical':
      return {
        hero:
          'This path reveals the current tooling layer more directly: Codex 5.4, AI-assisted workflows, explicit decision systems, and the technical proof that connects them back to real software delivery.',
        description:
          'Technical framing for the OpenAI path: current tooling details and how they support real systems work.',
        heading: 'Technical current-state view',
        body:
          'This lens makes the present-day toolkit more visible while keeping it attached to actual workflow systems, operator needs, and technical accountability.',
        priorities: [
          'Codex 5.4 and present-day AI-assisted workflow usage',
          'Explicit business logic and inspectable system behavior',
          'Technical depth without letting the Autodesk foundation disappear',
        ],
      };
  }
}

export function getContextMetadata(slug: PortfolioContextSlug) {
  const context = getPortfolioContext(slug);

  if (!context) {
    return null;
  }

  return {
    title: `${context.title} | Thomas Smith`,
    description: context.summary,
    openGraphImage:
      slug === 'qts-suwanee' ? '/images/qts/suwanee-hero.jpeg' : '/images/tsmithcode-dark.png',
  };
}
