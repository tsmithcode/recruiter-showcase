import { DocumentArrowDownIcon, DocumentTextIcon, FilmIcon, FolderIcon, PresentationChartBarIcon, RectangleStackIcon, SparklesIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

import type { PortfolioContextSlug, VideoArtifact } from './portfolioContent';
import { portfolioContexts } from './portfolioContent';

export type RoleLens = 'business' | 'delivery' | 'architecture' | 'technical';
export type ArtifactKind =
  | 'context-page'
  | 'case-study'
  | 'diagram'
  | 'video'
  | 'demo'
  | 'resume-pdf'
  | 'external-site'
  | 'section';
export type PhaseId = 'overview' | 'role-lens' | 'systems' | 'proof' | 'deep-dive';
export type SearchScope = 'context' | 'global';

export type PhaseStep = {
  id: PhaseId;
  label: string;
  description: string;
  sectionIds: string[];
};

export type ContextViewState = {
  context: PortfolioContextSlug;
  lens: RoleLens;
  phase: PhaseId;
  section?: string;
  searchScope: SearchScope;
};

export type SearchJumpState = {
  sourceContext?: PortfolioContextSlug;
  sourceLens?: RoleLens;
  sourcePhase?: PhaseId;
  sourceQuery?: string;
  destinationHref: string;
  canReturn: boolean;
};

export type ArtifactChipSpec = {
  kind: ArtifactKind;
  label: string;
  icon: typeof Squares2X2Icon;
  tone: string;
};

export type SearchDocument = {
  id: string;
  title: string;
  kind: ArtifactKind;
  primaryContext: PortfolioContextSlug | 'site';
  contexts: PortfolioContextSlug[];
  lensTags: RoleLens[];
  phaseTags: PhaseId[];
  keywords: string[];
  summary: string;
  href: string;
  anchor?: string;
  priority: number;
  chronologyGroup?: string;
  yearHint?: string;
};

export const roleLenses: Array<{
  id: RoleLens;
  label: string;
  description: string;
}> = [
  {
    id: 'business',
    label: 'Business',
    description: 'Business value, governance, outcomes, ownership, and risk in plain language.',
  },
  {
    id: 'delivery',
    label: 'Delivery',
    description: 'Rollout, process, stakeholders, adoption, sequencing, and first-30-day execution.',
  },
  {
    id: 'architecture',
    label: 'Architecture',
    description: 'System boundaries, centralization, integration, lifecycle, and control points.',
  },
  {
    id: 'technical',
    label: 'Technical',
    description: 'Technical details, deeper mappings, data concerns, and implementation proof.',
  },
];

export const defaultPhaseRail: PhaseStep[] = [
  {
    id: 'overview',
    label: 'Overview',
    description: 'Fast orientation and business-safe framing.',
    sectionIds: ['overview'],
  },
  {
    id: 'role-lens',
    label: 'Role Lens',
    description: 'Role-specific read of the same system.',
    sectionIds: ['role-lens'],
  },
  {
    id: 'systems',
    label: 'Systems',
    description: 'System boundaries, architecture, governance, and lifecycle structure.',
    sectionIds: ['systems'],
  },
  {
    id: 'proof',
    label: 'Proof',
    description: 'Artifacts, case studies, chronology, and evidence.',
    sectionIds: ['proof'],
  },
  {
    id: 'deep-dive',
    label: 'Deep Dive',
    description: 'Appendix, detailed diagnostics, archives, and external branches.',
    sectionIds: ['deep-dive'],
  },
];

export const artifactChipSpecs: Record<ArtifactKind, ArtifactChipSpec> = {
  'context-page': {
    kind: 'context-page',
    label: 'Context Page',
    icon: Squares2X2Icon,
    tone: 'bg-sky-400/14 border-sky-300/30 text-sky-100',
  },
  'case-study': {
    kind: 'case-study',
    label: 'Case Study',
    icon: DocumentTextIcon,
    tone: 'bg-emerald-400/12 border-emerald-300/30 text-emerald-100',
  },
  diagram: {
    kind: 'diagram',
    label: 'Diagram',
    icon: PresentationChartBarIcon,
    tone: 'bg-violet-400/12 border-violet-300/30 text-violet-100',
  },
  video: {
    kind: 'video',
    label: 'Video',
    icon: FilmIcon,
    tone: 'bg-rose-400/12 border-rose-300/30 text-rose-100',
  },
  demo: {
    kind: 'demo',
    label: 'Demo',
    icon: SparklesIcon,
    tone: 'bg-amber-400/12 border-amber-300/30 text-amber-100',
  },
  'resume-pdf': {
    kind: 'resume-pdf',
    label: 'Resume PDF',
    icon: DocumentArrowDownIcon,
    tone: 'bg-cyan-400/12 border-cyan-300/30 text-cyan-100',
  },
  'external-site': {
    kind: 'external-site',
    label: 'External Site',
    icon: RectangleStackIcon,
    tone: 'bg-fuchsia-400/12 border-fuchsia-300/30 text-fuchsia-100',
  },
  section: {
    kind: 'section',
    label: 'Section',
    icon: FolderIcon,
    tone: 'bg-slate-400/12 border-slate-300/25 text-slate-100',
  },
};

export const contextSearchSynonyms: Record<PortfolioContextSlug, string[]> = {
  'qts-suwanee': [
    'qts',
    'suwanee',
    'acc',
    'autodesk construction cloud',
    'docs',
    'build',
    'cost management',
    'metadata',
    'lineage',
    'auditability',
    'project controls',
    'single source of truth',
  ],
  openai: ['openai', 'codex', 'codex 5.4', 'internal tools', 'workflow acceleration', 'operator software'],
  'autodesk-cad': ['autodesk', 'inventor', 'vault', 'configurator', 'winforms', 'erp', 'pdm'],
  'product-systems': ['workflow', 'product systems', 'cpq', 'decision logic', 'operator workbench'],
  'creative-ai': ['creative ai', 'ajam', 'prompt-first', 'music', 'guided generation'],
  'full-proof-library': ['archive', 'proof', 'library', 'resume', 'skills', 'case studies'],
};

export const contextDefaultLenses: Record<PortfolioContextSlug, RoleLens> = {
  'qts-suwanee': 'business',
  openai: 'business',
  'autodesk-cad': 'business',
  'product-systems': 'business',
  'creative-ai': 'business',
  'full-proof-library': 'business',
};

export const cadGuardianBranch = {
  title: 'CAD Guardian',
  href: 'https://www.cadguardian.com/',
  summary:
    'Thomas Smith’s LLC for C2C and enterprise consulting opportunities, centered on Inventor/Vault governance, .NET modernization, CAD integration, metadata control, and production-safe automation.',
  highlights: [
    'Enterprise Inventor and Vault governance',
    '.NET modernization for legacy add-ins and automation',
    'CAD / ERP / PLM integration discipline',
    'Metadata, standards, and lifecycle control',
    'Production-safe automation for engineering teams',
  ],
  contexts: ['autodesk-cad', 'full-proof-library'] as PortfolioContextSlug[],
  kind: 'external-site' as const,
};

export const resumeArtifact = {
  title: 'Thomas Smith Resume',
  href: '/documents/thomas-smith-architect-resume-2026.pdf',
  summary: 'Current resume with principal engineering, Autodesk systems, and integration-heavy software experience.',
  kind: 'resume-pdf' as const,
};

const chronologyByVideoId: Record<
  string,
  {
    chronologyGroup: 'Foundation' | 'Configurators and automation' | 'ERP/CAD convergence' | 'Modern workflow tooling';
    yearHint?: string;
    searchSynonyms: string[];
  }
> = {
  'slc-airport-automation': {
    chronologyGroup: 'Foundation',
    yearHint: '2017-era',
    searchSynonyms: ['2017', 'foundation', 'airport', 'inventor api', 'winforms'],
  },
  'fry-tools-automation': {
    chronologyGroup: 'Foundation',
    yearHint: '2017-era',
    searchSynonyms: ['2017', 'foundation', 'fry reglet', 'inventor api', 'winforms'],
  },
  'ceiling-system-automation': {
    chronologyGroup: 'Foundation',
    yearHint: '2017-era',
    searchSynonyms: ['2017', 'foundation', 'inventor', 'excel', 'automation'],
  },
  'door-frame-automation': {
    chronologyGroup: 'Foundation',
    yearHint: '2017-era',
    searchSynonyms: ['2017', 'foundation', 'door frame', 'sql', 'inventor'],
  },
  'door-frame-configurator': {
    chronologyGroup: 'Configurators and automation',
    searchSynonyms: ['configurator', 'cad', 'automation'],
  },
  'led-reveal-accelerator': {
    chronologyGroup: 'Configurators and automation',
    searchSynonyms: ['accelerator', 'inventor macro', 'automation'],
  },
  'led-automation-tool': {
    chronologyGroup: 'Configurators and automation',
    searchSynonyms: ['documentation', 'pdf', 'inventor api'],
  },
  'ceiling-trim-tool': {
    chronologyGroup: 'Configurators and automation',
    searchSynonyms: ['trim', 'erp', 'inventor'],
  },
  'frame-generator-form': {
    chronologyGroup: 'Configurators and automation',
    searchSynonyms: ['generator', 'ilogic', 'parametric'],
  },
  'part-number-generator': {
    chronologyGroup: 'Configurators and automation',
    searchSynonyms: ['part number', 'naming', 'python'],
  },
  'slc-column-configurator': {
    chronologyGroup: 'ERP/CAD convergence',
    searchSynonyms: ['column configurator', 'submittal', 'ilogic', 'inventor'],
  },
  '3d-quote-tool': {
    chronologyGroup: 'ERP/CAD convergence',
    searchSynonyms: ['3d quote', 'erp', 'inventor', 'pricing'],
  },
  'led-qt-bom-ato-tool': {
    chronologyGroup: 'ERP/CAD convergence',
    searchSynonyms: ['bom', 'quote', 'sales', 'erp'],
  },
  'bom-project-info-fill': {
    chronologyGroup: 'ERP/CAD convergence',
    searchSynonyms: ['bom', 'project info', 'excel api'],
  },
  'led-quote-tool': {
    chronologyGroup: 'ERP/CAD convergence',
    searchSynonyms: ['quote', 'pricing', 'vba', 'erp'],
  },
  'quote-request-web-form': {
    chronologyGroup: 'Modern workflow tooling',
    searchSynonyms: ['request', 'web form', 'blazor'],
  },
  'erp-crm-web-app': {
    chronologyGroup: 'Modern workflow tooling',
    searchSynonyms: ['erp', 'crm', 'blazor', 'workflow'],
  },
  'hourly-allocation-tool': {
    chronologyGroup: 'Modern workflow tooling',
    searchSynonyms: ['allocation', 'operations', 'planning'],
  },
  'employee-allocation-tool': {
    chronologyGroup: 'Modern workflow tooling',
    searchSynonyms: ['employee allocation', 'planning', 'finance'],
  },
  'label-generator': {
    chronologyGroup: 'Modern workflow tooling',
    searchSynonyms: ['labels', 'pdf', 'validation'],
  },
};

export const chronologyGroups = [
  'Foundation',
  'Configurators and automation',
  'ERP/CAD convergence',
  'Modern workflow tooling',
] as const;

export function getVideoChronology(video: Pick<VideoArtifact, 'id'>) {
  return chronologyByVideoId[video.id] ?? {
    chronologyGroup: 'Modern workflow tooling' as const,
    searchSynonyms: [],
  };
}

export function isRoleLens(value: string | null | undefined): value is RoleLens {
  return roleLenses.some((lens) => lens.id === value);
}

export function isPhaseId(value: string | null | undefined): value is PhaseId {
  return defaultPhaseRail.some((phase) => phase.id === value);
}

export function getContextLabel(slug: PortfolioContextSlug) {
  return portfolioContexts.find((context) => context.slug === slug)?.title ?? slug;
}

export function getContextPhaseRail(contextSlug: PortfolioContextSlug) {
  void contextSlug;
  return defaultPhaseRail;
}

export function buildContextHref(
  slug: PortfolioContextSlug,
  lens: RoleLens,
  phase: PhaseId,
  extras?: Record<string, string | undefined>,
  hash?: string
) {
  const params = new URLSearchParams();
  params.set('lens', lens);
  params.set('phase', phase);

  Object.entries(extras ?? {}).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  const base = `/contexts/${slug}?${params.toString()}`;
  return hash ? `${base}#${hash}` : base;
}

export function parseContextViewState(
  context: PortfolioContextSlug,
  searchParams?: Record<string, string | string[] | undefined>
): ContextViewState {
  const rawLens = typeof searchParams?.lens === 'string' ? searchParams.lens : undefined;
  const rawPhase = typeof searchParams?.phase === 'string' ? searchParams.phase : undefined;
  const rawScope = typeof searchParams?.searchScope === 'string' ? searchParams.searchScope : undefined;

  return {
    context,
    lens: isRoleLens(rawLens) ? rawLens : contextDefaultLenses[context],
    phase: isPhaseId(rawPhase) ? rawPhase : 'overview',
    section: typeof searchParams?.section === 'string' ? searchParams.section : undefined,
    searchScope: rawScope === 'global' ? 'global' : 'context',
  };
}
