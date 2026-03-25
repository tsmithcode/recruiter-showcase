import {
  DiagramSpec,
  GovernanceCapability,
  InterviewFocusBlock,
  LifecycleMapping,
} from '@/lib/portfolioContent';

import ZoomableImage from './ZoomableImage';

type ResponsibilitiesDiagramProps = {
  groups: Array<{
    title: string;
    items: string[];
  }>;
};

export function ResponsibilitiesArchitectureDiagram({ groups }: ResponsibilitiesDiagramProps) {
  return (
    <section className="showcase-panel-strong">
      <div className="mb-6 max-w-3xl space-y-2">
        <p className="showcase-eyebrow">Responsibilities architecture map</p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">
          What the Suwanee solution architect role actually has to orchestrate
        </h2>
        <p className="text-sm leading-7 text-slate-300">
          The responsibilities are grouped here as capability clusters so the role reads like a
          real architecture mandate rather than a generic list of duties.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="showcase-panel-subtle">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Center of gravity</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Enterprise data and Autodesk systems architecture</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Tie ACC, analytics, finance, operational systems, and implementation stakeholders into
            one governed program view across the full construction lifecycle.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {groups.map((group) => (
            <section key={group.title} className="showcase-panel-subtle">
              <h3 className="text-lg font-semibold text-white">{group.title}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

type GovernanceOverlayDiagramProps = {
  capabilities: GovernanceCapability[];
};

export function GovernanceOverlayDiagram({ capabilities }: GovernanceOverlayDiagramProps) {
  return (
    <section className="showcase-panel">
      <div className="mb-6 max-w-3xl space-y-2">
        <p className="showcase-eyebrow">Enterprise integration and governance overlay</p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">
          Governance is the architecture, not an afterthought
        </h2>
        <p className="text-sm leading-7 text-slate-300">
          This view turns the governance diagram into a readable architecture overlay anchored by
          integration, lineage, analytics, and cross-functional advisory.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr_1fr]">
        <div className="grid gap-4">
          {capabilities.slice(0, 2).map((capability) => (
            <CapabilityCard key={capability.title} capability={capability} />
          ))}
        </div>

        <div className="rounded-[1.55rem] border border-teal-300/20 bg-[#0b1428] p-5 text-center shadow-[0_24px_90px_rgba(5,12,24,0.34)]">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Core outcome</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
            Single source of truth
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            A governed architecture where project data, document flows, analytics, and handover
            records are trustworthy enough to support operations, finance, project controls, and IT
            without fragmentation.
          </p>
          <div className="mt-6 grid gap-3 text-left">
            <div className="showcase-panel-subtle">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Inputs</p>
              <p className="mt-2 text-sm text-slate-200">
                ACC, ERP, analytics, procurement, and operational source systems
              </p>
            </div>
            <div className="showcase-panel-subtle">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Controls</p>
              <p className="mt-2 text-sm text-slate-200">
                Metadata, ownership, lineage, auditability, and performance governance
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {capabilities.slice(2).map((capability) => (
            <CapabilityCard key={capability.title} capability={capability} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({ capability }: { capability: GovernanceCapability }) {
  return (
    <section className="showcase-panel-subtle bg-[#091120]/80">
      <h3 className="text-lg font-semibold text-white">{capability.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{capability.businessNeed}</p>
      <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-500">Systems</p>
      <p className="mt-2 text-sm text-slate-200">{capability.systemsInvolved.join(' • ')}</p>
      <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-500">Governance concern</p>
      <p className="mt-2 text-sm text-slate-300">{capability.governanceConcern}</p>
      <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-500">Expected outcome</p>
      <p className="mt-2 text-sm text-slate-200">{capability.expectedOutcome}</p>
    </section>
  );
}

type LifecycleDiagramProps = {
  mappings: LifecycleMapping[];
};

export function LifecycleTimelineDiagram({ mappings }: LifecycleDiagramProps) {
  return (
    <section className="showcase-panel">
      <div className="mb-6 max-w-3xl space-y-2">
        <p className="showcase-eyebrow">Construction lifecycle + ACC mapping</p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">
          How the project lifecycle maps into the program
        </h2>
        <p className="text-sm leading-7 text-slate-300">
          This timeline makes the module-to-role-to-document relationship explicit so the page
          reads like program understanding, not just ACC familiarity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {mappings.map((mapping) => (
          <section key={mapping.phase} className="relative rounded-[1.5rem] border border-white/10 bg-[#091120]/85 p-5">
            <div className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{mapping.phase}</p>
            <h3 className="mt-3 text-lg font-semibold text-white">{mapping.accModule}</h3>
            <p className="mt-3 text-sm font-medium text-slate-100">{mapping.operationalGoal}</p>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Roles</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                {mapping.roles.map((role) => (
                  <li key={role} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Documents</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                {mapping.documents.map((document) => (
                  <li key={document} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    <span>{document}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

type FirstThirtyDaysProps = {
  blocks: InterviewFocusBlock[];
};

export function FirstThirtyDaysDiagram({ blocks }: FirstThirtyDaysProps) {
  return (
    <section className="showcase-panel-strong">
      <div className="mb-6 max-w-3xl space-y-2">
        <p className="showcase-eyebrow">First 30 days architecture focus</p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">
          A practical Suwanee onboarding map
        </h2>
        <p className="text-sm leading-7 text-slate-300">
          This is not a claim that every issue will be solved in a month. It is a disciplined
          sequence for understanding the environment, prioritizing governance, and closing the
          first month with useful architectural clarity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {blocks.map((block) => (
          <section key={block.title} className="showcase-panel-subtle">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Week {block.priority}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">{block.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{block.summary}</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {block.talkingPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}

type AppendixImagesProps = {
  specs: DiagramSpec[];
};

export function QtsAppendixImages({ specs }: AppendixImagesProps) {
  const imageMap = {
    'responsibilities-architecture-map': '/images/qts/sa-responsibilities.png',
    'integration-governance-overlay': '/images/qts/governance-overlay.png',
    'construction-lifecycle-map': '/images/qts/lifecycle-map.png',
  } as const;

  return (
    <section className="showcase-panel">
      <div className="max-w-3xl space-y-2">
        <p className="showcase-eyebrow">Supporting appendix</p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">
          Original source images preserved for reference
        </h2>
        <p className="text-sm leading-7 text-slate-300">
          The primary reading experience uses embedded diagrams. The original source images remain
          here as reference inputs for wording, layout, and exact role/module language.
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {specs
          .filter((spec) => spec.id in imageMap)
          .map((spec) => (
            <article key={spec.id} className="rounded-[1.4rem] border border-white/10 bg-[#091120]/80 p-4">
              <h3 className="text-lg font-semibold text-white">{spec.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{spec.sourceContent}</p>
              <div className="showcase-media-stage mt-4 aspect-[4/3] rounded-[1rem]">
                <ZoomableImage
                  src={imageMap[spec.id as keyof typeof imageMap]}
                  alt={spec.title}
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  imageClassName="object-contain bg-white"
                  hintLabel="Open diagram source"
                />
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
