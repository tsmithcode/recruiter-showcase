import { caseStudies, proofArtifacts } from './showcaseContent';

export type PortfolioContextSlug =
  | 'openai'
  | 'qts-suwanee'
  | 'autodesk-cad'
  | 'product-systems'
  | 'creative-ai'
  | 'full-proof-library';

export type ArtifactLink = {
  label: string;
  href: string;
};

export type PortfolioContext = {
  slug: PortfolioContextSlug;
  title: string;
  audience: string;
  summary: string;
  whyItMatters: string;
  strongestProof: string;
  ctaLabel: string;
  ctaHref: string;
  featuredArtifacts: ArtifactLink[];
  priority: number;
  visualMode: 'default' | 'cad-ambient';
};

export type VideoArtifact = {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  domain: 'autodesk' | 'workflow' | 'erp' | 'automation';
  stackTags: string[];
  businessContext: string;
  whatItProves: string;
  relatedArtifacts: ArtifactLink[];
  featured?: boolean;
};

export type InterviewFocusBlock = {
  title: string;
  summary: string;
  talkingPoints: string[];
  relatedProof: ArtifactLink[];
  priority: number;
};

export type LifecycleMapping = {
  phase: string;
  accModule: string;
  roles: string[];
  documents: string[];
  operationalGoal: string;
};

export type GovernanceCapability = {
  title: string;
  businessNeed: string;
  systemsInvolved: string[];
  governanceConcern: string;
  expectedOutcome: string;
};

export type DiagramSpec = {
  id: string;
  title: string;
  questionAnswered: string;
  layoutType: 'clusters' | 'overlay' | 'timeline' | 'roadmap';
  sourceContent: string;
  audience: string;
  exportable: boolean;
};

export type AnimationPolicy = {
  entryMode: 'none' | 'one-time';
  repeatBehavior: 'never' | 'manual-only';
  backgroundMode: 'static' | 'cad-ambient';
  reducedMotionFallback: 'static';
};

function getThumb(url: string) {
  try {
    const id = new URL(url).searchParams.get('v');
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
  } catch {
    return '';
  }
}

export const portfolioContexts: PortfolioContext[] = [
  {
    slug: 'qts-suwanee',
    title: 'QTS Suwanee / Autodesk Systems',
    audience: 'Autodesk systems managers, business support leaders, and construction platform stakeholders',
    summary:
      'A focused architecture briefing for ACC rollout, integration, governance, lifecycle mapping, and first-30-day execution in a hyperscale data-center environment.',
    whyItMatters:
      'This page routes an interviewer into the exact areas that matter for the role: Docs rollout, Cost Management understanding, integration governance, and a credible single-source-of-truth mindset.',
    strongestProof: 'QTS solution architect briefing with embedded responsibilities, governance, lifecycle, and 30-day architecture maps.',
    ctaLabel: 'Open the QTS focus page',
    ctaHref: '/contexts/qts-suwanee',
    featuredArtifacts: [
      { label: 'QTS architecture briefing', href: '/contexts/qts-suwanee' },
      { label: 'Vault operations case study', href: '/case-studies/vault-ops-reliability' },
      { label: 'Autodesk video library', href: '/contexts/autodesk-cad' },
    ],
    priority: 1,
    visualMode: 'cad-ambient',
  },
  {
    slug: 'openai',
    title: 'OpenAI',
    audience: 'Principal B2B engineering recruiters and hiring managers',
    summary:
      'A context path for internal tools, workflow products, operator software, and evidence of product judgment under operational constraints.',
    whyItMatters:
      'This route prioritizes the proof that best maps to B2B systems ownership, business-rule clarity, and high-leverage internal tooling.',
    strongestProof: 'Operator search platform, CPQ decision workbench, and systems-oriented case study set.',
    ctaLabel: 'Review the OpenAI path',
    ctaHref: '/contexts/openai',
    featuredArtifacts: [
      { label: 'OpenAI recruiter path', href: '/contexts/openai' },
      { label: 'CPQ decision workbench', href: '/cpq-demo' },
      { label: 'Operator search case study', href: '/case-studies/operator-search-platform' },
    ],
    priority: 2,
    visualMode: 'default',
  },
  {
    slug: 'autodesk-cad',
    title: 'Autodesk / CAD Systems',
    audience: 'CAD, Vault, Inventor, configurator, and Autodesk-adjacent hiring managers',
    summary:
      'A dedicated video-and-proof destination for Autodesk, Inventor, Vault, configurators, desktop tools, and engineering workflow automation.',
    whyItMatters:
      'This page shows the breadth of 12+ years of CAD systems work without making the homepage carry the full archive.',
    strongestProof: 'Focused Autodesk video library cross-linked to case studies and systems proof.',
    ctaLabel: 'Open Autodesk proof',
    ctaHref: '/contexts/autodesk-cad',
    featuredArtifacts: [
      { label: 'Autodesk video library', href: '/contexts/autodesk-cad' },
      { label: 'Vault operations case study', href: '/case-studies/vault-ops-reliability' },
      { label: 'Operator search case study', href: '/case-studies/operator-search-platform' },
    ],
    priority: 3,
    visualMode: 'cad-ambient',
  },
  {
    slug: 'product-systems',
    title: 'Product Systems',
    audience: 'Hiring managers looking for internal tools, workflow products, and operator-facing software',
    summary:
      'A context view that groups the strongest product-system artifacts: decision logic, workflow clarity, and case studies that translate complexity into usable software.',
    whyItMatters:
      'This page keeps the business-system story visible without tying it to one employer or domain.',
    strongestProof: 'CPQ workbench, systems map, and flagship case studies.',
    ctaLabel: 'Open product systems proof',
    ctaHref: '/contexts/product-systems',
    featuredArtifacts: [
      { label: 'CPQ decision workbench', href: '/cpq-demo' },
      { label: 'Operator search case study', href: '/case-studies/operator-search-platform' },
      { label: 'Full proof library', href: '/contexts/full-proof-library' },
    ],
    priority: 4,
    visualMode: 'default',
  },
  {
    slug: 'creative-ai',
    title: 'Creative AI / aJam',
    audience: 'Interviewers who care about AI-native interaction, teaching flow, and prompt-first creation',
    summary:
      'A supporting context centered on aJam, where feelings and lyric ideas become theory-checked, playable outputs with layered guidance.',
    whyItMatters:
      'aJam demonstrates a stronger ingestion pattern than a typical form flow: prompt-first, controlled, interpretable, and oriented toward reliable outputs.',
    strongestProof: 'External aJam app plus a curated explanation of what it proves.',
    ctaLabel: 'Open creative AI context',
    ctaHref: '/contexts/creative-ai',
    featuredArtifacts: [
      { label: 'Open aJam', href: 'https://4chord.vercel.app' },
      { label: 'CPQ decision workbench', href: '/cpq-demo' },
    ],
    priority: 5,
    visualMode: 'default',
  },
  {
    slug: 'full-proof-library',
    title: 'Full Proof Library',
    audience: 'Recruiters and hiring managers who want full-depth evidence',
    summary:
      'A preserved archive view containing case studies, supporting proof, skills depth, and recruiter-reference material.',
    whyItMatters:
      'This keeps all interview-winning depth reachable without forcing every first-time visitor through the full archive.',
    strongestProof: 'Combined proof library, skills matrix, and supporting article depth.',
    ctaLabel: 'Browse the full library',
    ctaHref: '/contexts/full-proof-library',
    featuredArtifacts: [
      { label: 'Full proof library', href: '/contexts/full-proof-library' },
      { label: 'Resume', href: '/documents/thomas-smith-architect-resume-2026.pdf' },
    ],
    priority: 6,
    visualMode: 'default',
  },
];

export const animationPolicy: AnimationPolicy = {
  entryMode: 'one-time',
  repeatBehavior: 'never',
  backgroundMode: 'cad-ambient',
  reducedMotionFallback: 'static',
};

export const qtsResponsibilities = [
  {
    title: 'Enterprise data architecture',
    items: [
      'Define and maintain end-to-end data architecture across construction, financial, and operational systems.',
      'Translate complex construction workflows into sustainable architecture patterns.',
    ],
  },
  {
    title: 'Integration and interoperability',
    items: [
      'Enable API-led and middleware-driven integration across ACC, ERP, analytics, and operational systems.',
      'Align product, project, and portfolio data flows across stakeholders.',
    ],
  },
  {
    title: 'Governance and compliance',
    items: [
      'Champion metadata management, data lineage, auditability, and integration governance.',
      'Ensure compliance with corporate, safety, regulatory, and contractual data requirements.',
    ],
  },
  {
    title: 'Analytics and delivery advisory',
    items: [
      'Oversee governed self-service dashboards and analytics for executives, PMs, and field teams.',
      'Serve as trusted advisor to operations, finance, project controls, and IT.',
    ],
  },
  {
    title: 'Optimization and enablement',
    items: [
      'Mentor teams on data architecture, analytics strategy, and workflow best practices.',
      'Lead PoCs for predictive analytics, automation, and project-performance insight while optimizing cloud cost and integration efficiency.',
    ],
  },
];

export const qtsGovernanceCapabilities: GovernanceCapability[] = [
  {
    title: 'APIs and middleware',
    businessNeed: 'Move data cleanly across ACC, ERP, analytics, and downstream tools.',
    systemsInvolved: ['ACC', 'MuleSoft', 'Snowflake', 'Oracle/Fusion', 'Workday'],
    governanceConcern: 'Inconsistent contracts and unclear ownership create brittle integrations.',
    expectedOutcome: 'Repeatable, observable, governed integration patterns.',
  },
  {
    title: 'Dashboards and analytics',
    businessNeed: 'Support executives, PMs, and field teams with governed self-service analytics.',
    systemsInvolved: ['Snowflake', 'Tableau', 'Palantir'],
    governanceConcern: 'Metrics drift when lineage and definitions are weak.',
    expectedOutcome: 'Shared definitions, auditable metrics, and trusted reporting.',
  },
  {
    title: 'Compliance, lineage, and auditability',
    businessNeed: 'Meet corporate, safety, and contractual data obligations.',
    systemsInvolved: ['ACC', 'Build', 'Assets', 'Procurement systems'],
    governanceConcern: 'No single source of truth without ownership, lineage, and retention rules.',
    expectedOutcome: 'Traceable, reviewable, policy-aligned project records.',
  },
  {
    title: 'Digital twins and field data',
    businessNeed: 'Connect design, construction, and operational readiness with usable field information.',
    systemsInvolved: ['BIM Collaborate Pro', 'Build', 'Assets'],
    governanceConcern: 'Field data is easy to collect but hard to normalize and operationalize.',
    expectedOutcome: 'Lifecycle-aligned asset records and cleaner handover.',
  },
  {
    title: 'Cloud cost and performance optimization',
    businessNeed: 'Keep analytics and integration architecture sustainable at portfolio scale.',
    systemsInvolved: ['Snowflake', 'MuleSoft', 'Palantir'],
    governanceConcern: 'Performance and cost drift when architecture evolves without visibility.',
    expectedOutcome: 'Measured, right-sized data movement and platform usage.',
  },
  {
    title: 'Cross-functional advisory',
    businessNeed: 'Align operations, finance, IT, project controls, and implementation teams.',
    systemsInvolved: ['ACC', 'Workday', 'Procurement', 'Analytics platforms'],
    governanceConcern: 'Program value erodes when systems are optimized in silos.',
    expectedOutcome: 'Architecture decisions that are intelligible across the business.',
  },
];

export const qtsLifecycleMappings: LifecycleMapping[] = [
  {
    phase: 'Planning / Early Development',
    accModule: 'ACC Docs',
    roles: ['Owner development', 'Executive stakeholders'],
    documents: ['Charter', 'Site studies', 'Feasibility', 'Early requirements'],
    operationalGoal: 'Establish the early project record and baseline stakeholder alignment.',
  },
  {
    phase: 'Design',
    accModule: 'ACC Docs',
    roles: ['Architect', 'Engineers', 'Design manager', 'BIM/VDC'],
    documents: ['Models', 'Drawings', 'Markups', 'RFIs', 'Design packages'],
    operationalGoal: 'Structure design collaboration and document control before execution pressure starts.',
  },
  {
    phase: 'Preconstruction',
    accModule: 'Autodesk BIM Collaborate Pro',
    roles: ['Estimators', 'Precon', 'PM', 'GC leadership'],
    documents: ['Quantity takeoffs', 'Scope', 'Schedules', 'Logistics', 'Bid packages'],
    operationalGoal: 'Tie model coordination and commercial planning to one governed preconstruction flow.',
  },
  {
    phase: 'Construction Execution',
    accModule: 'Autodesk Build',
    roles: ['PM', 'Superintendent', 'Field engineer', 'Safety'],
    documents: ['Submittals', 'RFIs', 'Meeting minutes', 'Daily reports', 'Inspections', 'Safety', 'Schedules', 'Cost / change'],
    operationalGoal: 'Run field execution with traceable documentation, cost visibility, and operational feedback loops.',
  },
  {
    phase: 'Handover / Operations Readiness',
    accModule: 'Autodesk Build Assets',
    roles: ['Owner', 'Commissioning', 'Facilities', 'Maintenance'],
    documents: ['As-builts', 'O&M manuals', 'Closeout packages', 'Asset records'],
    operationalGoal: 'Deliver usable asset intelligence rather than a disconnected closeout archive.',
  },
];

export const qtsFirstThirtyDays: InterviewFocusBlock[] = [
  {
    title: 'Current-state architecture map',
    summary: 'Clarify where project data enters, transforms, and becomes business-critical across construction, finance, analytics, and operations.',
    talkingPoints: [
      'Inventory ACC, Workday, Snowflake, Tableau, Oracle/Fusion supply chain, MuleSoft, Smartsheet, procurement tooling, and Palantir rollout dependencies.',
      'Identify where “single source of truth” is stated versus actually enforced.',
      'Map ownership boundaries and system-of-record assumptions before proposing changes.',
    ],
    relatedProof: [{ label: 'QTS Suwanee context', href: '/contexts/qts-suwanee' }],
    priority: 1,
  },
  {
    title: 'ACC rollout and cost-management readiness',
    summary: 'Treat Docs rollout and Cost Management understanding as immediate execution signals, not secondary platform details.',
    talkingPoints: [
      'Assess current Docs adoption posture, naming conventions, folder governance, and training dependencies.',
      'Determine what cost-management data needs to connect with execution workflows and reporting.',
      'Coordinate with the ACC trainer role so governance and enablement move together.',
    ],
    relatedProof: [{ label: 'Autodesk / CAD Systems', href: '/contexts/autodesk-cad' }],
    priority: 2,
  },
  {
    title: 'Governance gaps and control points',
    summary: 'Focus quickly on metadata, lineage, approvals, and auditability rather than only building more dashboards.',
    talkingPoints: [
      'Identify missing metadata standards and lifecycle state definitions.',
      'Highlight where approvals, retention, or lineage are implicit instead of governed.',
      'Define practical governance checkpoints without slowing project teams down.',
    ],
    relatedProof: [{ label: 'Vault operations case study', href: '/case-studies/vault-ops-reliability' }],
    priority: 3,
  },
  {
    title: 'Early-value architecture roadmap',
    summary: 'Close the first month with a realistic architecture view: what to stabilize, what to standardize, and what to pilot.',
    talkingPoints: [
      'Recommend quick wins that reduce fragmentation before larger transformation work.',
      'Separate near-term governance and integration fixes from longer-horizon analytics or digital-twin ambitions.',
      'Frame decisions in business language for operations, finance, project controls, and IT.',
    ],
    relatedProof: [{ label: 'Operator search case study', href: '/case-studies/operator-search-platform' }],
    priority: 4,
  },
];

export const qtsDiagramSpecs: DiagramSpec[] = [
  {
    id: 'responsibilities-architecture-map',
    title: 'Responsibilities architecture map',
    questionAnswered: 'What capability clusters define the solution architect role at Suwanee?',
    layoutType: 'clusters',
    sourceContent: 'sa responsibilities.PNG',
    audience: 'QTS interviewer and recruiter',
    exportable: true,
  },
  {
    id: 'integration-governance-overlay',
    title: 'Enterprise integration and governance overlay',
    questionAnswered: 'How do integration, governance, analytics, compliance, and advisory functions fit together?',
    layoutType: 'overlay',
    sourceContent: 'Governance.PNG',
    audience: 'QTS interviewer and recruiter',
    exportable: true,
  },
  {
    id: 'construction-lifecycle-map',
    title: 'Construction lifecycle + ACC mapping',
    questionAnswered: 'How do ACC modules, project roles, and document flows align across the construction lifecycle?',
    layoutType: 'timeline',
    sourceContent: 'Lifecycle.PNG',
    audience: 'QTS interviewer and recruiter',
    exportable: true,
  },
  {
    id: 'first-thirty-days-focus-map',
    title: 'First 30 days architecture focus',
    questionAnswered: 'What should be assessed first to stabilize and align the Suwanee program environment?',
    layoutType: 'roadmap',
    sourceContent: 'Interview notes and program-management framing',
    audience: 'QTS interviewer and recruiter',
    exportable: true,
  },
];

export const autodeskVideoArtifacts: VideoArtifact[] = [
  {
    id: 'slc-airport-automation',
    title: 'SLC Airport Automation',
    videoUrl: 'https://www.youtube.com/watch?v=9YA3J85JKRI',
    thumbnail: getThumb('https://www.youtube.com/watch?v=9YA3J85JKRI'),
    domain: 'autodesk',
    stackTags: ['WinForms', 'InventorAPI', 'ExcelAPI'],
    businessContext: 'Automation for an airport-related engineering workflow with document and geometry coordination.',
    whatItProves: 'Cross-tool automation in a project environment where geometry and business deliverables intersect.',
    relatedArtifacts: [{ label: 'Vault operations case study', href: '/case-studies/vault-ops-reliability' }],
    featured: true,
  },
  {
    id: 'door-frame-configurator',
    title: 'Door Frame Configurator',
    videoUrl: 'https://www.youtube.com/watch?v=EVuWhw88N20',
    thumbnail: getThumb('https://www.youtube.com/watch?v=EVuWhw88N20'),
    domain: 'autodesk',
    stackTags: ['CAD', 'ExcelAPI', 'Automation'],
    businessContext: 'Configurable engineering workflow linking quoting, configuration, and output generation.',
    whatItProves: 'Commercial and engineering logic can be unified in one operator surface.',
    relatedArtifacts: [{ label: 'CPQ decision workbench', href: '/case-studies/cpq-decision-workbench' }],
    featured: true,
  },
  {
    id: 'led-reveal-accelerator',
    title: 'LED Reveal Accelerator',
    videoUrl: 'https://www.youtube.com/watch?v=wJehm7rSqC4',
    thumbnail: getThumb('https://www.youtube.com/watch?v=wJehm7rSqC4'),
    domain: 'autodesk',
    stackTags: ['InventorMacro', 'NoCode'],
    businessContext: 'Fast geometry-oriented acceleration for repeatable design work.',
    whatItProves: 'Deep CAD familiarity translated into operator speed.',
    relatedArtifacts: [{ label: 'Autodesk / CAD Systems', href: '/contexts/autodesk-cad' }],
  },
  {
    id: 'led-automation-tool',
    title: 'LED Automation Tool',
    videoUrl: 'https://www.youtube.com/watch?v=2ce70aH0PmY',
    thumbnail: getThumb('https://www.youtube.com/watch?v=2ce70aH0PmY'),
    domain: 'autodesk',
    stackTags: ['Macros', 'PDF', 'InventorAPI'],
    businessContext: 'Engineering automation tied to downstream documentation.',
    whatItProves: 'CAD automation extended into deliverable generation, not just modeling.',
    relatedArtifacts: [{ label: 'Autodesk / CAD Systems', href: '/contexts/autodesk-cad' }],
  },
  {
    id: 'erp-crm-web-app',
    title: 'ERP & CRM Web App',
    videoUrl: 'https://www.youtube.com/watch?v=gWDy964I97Y',
    thumbnail: getThumb('https://www.youtube.com/watch?v=gWDy964I97Y'),
    domain: 'workflow',
    stackTags: ['Blazor', 'API', 'NoSQL'],
    businessContext: 'Workflow software bridging customer and internal business logic.',
    whatItProves: 'Broader systems work beyond Autodesk, useful for product-system contexts.',
    relatedArtifacts: [{ label: 'OpenAI context', href: '/contexts/openai' }],
  },
  {
    id: 'fry-tools-automation',
    title: 'Fry Tools Automation',
    videoUrl: 'https://www.youtube.com/watch?v=TsECnuxQhKw',
    thumbnail: getThumb('https://www.youtube.com/watch?v=TsECnuxQhKw'),
    domain: 'autodesk',
    stackTags: ['CSharp', 'InventorAPI', 'WinForms'],
    businessContext: 'Engineering desktop tooling for repeatable Autodesk-centered work.',
    whatItProves: 'Hands-on Autodesk API depth inside real operator tooling.',
    relatedArtifacts: [{ label: 'Autodesk / CAD Systems', href: '/contexts/autodesk-cad' }],
    featured: true,
  },
  {
    id: 'led-qt-bom-ato-tool',
    title: 'LED QT BOM ATO Tool',
    videoUrl: 'https://www.youtube.com/watch?v=RKEe9TrNgyE',
    thumbnail: getThumb('https://www.youtube.com/watch?v=RKEe9TrNgyE'),
    domain: 'erp',
    stackTags: ['Excel', 'VBA', 'Sales'],
    businessContext: 'Commercial quoting and BOM generation tied to engineering deliverables.',
    whatItProves: 'The bridge between commercial structure and technical outputs.',
    relatedArtifacts: [{ label: 'CPQ decision workbench', href: '/cpq-demo' }],
  },
  {
    id: 'bom-project-info-fill',
    title: 'BOM Project Info Fill',
    videoUrl: 'https://www.youtube.com/watch?v=aHmYna-aanw',
    thumbnail: getThumb('https://www.youtube.com/watch?v=aHmYna-aanw'),
    domain: 'automation',
    stackTags: ['VB.NET', 'ExcelAPI'],
    businessContext: 'Project information propagation across BOM workflows.',
    whatItProves: 'Process discipline and automation around engineering data hygiene.',
    relatedArtifacts: [{ label: 'Full proof library', href: '/contexts/full-proof-library' }],
  },
  {
    id: 'label-generator',
    title: 'Label Generator',
    videoUrl: 'https://www.youtube.com/watch?v=ka0wfOce8ps',
    thumbnail: getThumb('https://www.youtube.com/watch?v=ka0wfOce8ps'),
    domain: 'automation',
    stackTags: ['ExcelVBA', 'PDF', 'Validation'],
    businessContext: 'Output generation tied to validation-heavy workflows.',
    whatItProves: 'Small-scope automation still handled with structured validation and delivery thinking.',
    relatedArtifacts: [{ label: 'Full proof library', href: '/contexts/full-proof-library' }],
  },
  {
    id: 'ceiling-trim-tool',
    title: 'Ceiling Trim Tool',
    videoUrl: 'https://www.youtube.com/watch?v=gGhLi_qxDZY',
    thumbnail: getThumb('https://www.youtube.com/watch?v=gGhLi_qxDZY'),
    domain: 'autodesk',
    stackTags: ['ERP', 'Inventor', 'ExcelAPI'],
    businessContext: 'Engineering tool that joins CAD logic with ERP-sensitive process steps.',
    whatItProves: 'Cross-system discipline in Autodesk-heavy environments.',
    relatedArtifacts: [{ label: 'Vault operations case study', href: '/case-studies/vault-ops-reliability' }],
  },
  {
    id: 'hourly-allocation-tool',
    title: 'Hourly Allocation Tool',
    videoUrl: 'https://www.youtube.com/watch?v=MQNGRKhiU6s',
    thumbnail: getThumb('https://www.youtube.com/watch?v=MQNGRKhiU6s'),
    domain: 'workflow',
    stackTags: ['Excel', 'Macro'],
    businessContext: 'Operational planning and allocation support.',
    whatItProves: 'Useful business tooling, even outside CAD-heavy contexts.',
    relatedArtifacts: [{ label: 'Product systems', href: '/contexts/product-systems' }],
  },
  {
    id: 'ceiling-system-automation',
    title: 'Ceiling System Automation',
    videoUrl: 'https://www.youtube.com/watch?v=3i9q_dJqPGk',
    thumbnail: getThumb('https://www.youtube.com/watch?v=3i9q_dJqPGk'),
    domain: 'autodesk',
    stackTags: ['Inventor', 'Excel', 'VBA'],
    businessContext: 'Repeatable engineering automation for ceiling-related systems.',
    whatItProves: 'Long-horizon CAD workflow mastery in configurable product spaces.',
    relatedArtifacts: [{ label: 'Autodesk / CAD Systems', href: '/contexts/autodesk-cad' }],
  },
  {
    id: 'quote-request-web-form',
    title: 'Quote Request Web Form',
    videoUrl: 'https://www.youtube.com/watch?v=Ye8ihfO-FmE',
    thumbnail: getThumb('https://www.youtube.com/watch?v=Ye8ihfO-FmE'),
    domain: 'workflow',
    stackTags: ['Form', 'Request', 'Blazor'],
    businessContext: 'Entry point for structured quoting and customer intake.',
    whatItProves: 'Front-door workflow thinking, not just back-end tooling.',
    relatedArtifacts: [{ label: 'CPQ decision workbench', href: '/cpq-demo' }],
  },
  {
    id: 'door-frame-automation',
    title: 'Door Frame Automation',
    videoUrl: 'https://www.youtube.com/watch?v=jXnunvPM9Ec',
    thumbnail: getThumb('https://www.youtube.com/watch?v=jXnunvPM9Ec'),
    domain: 'autodesk',
    stackTags: ['VisualStudio', 'Inventor', 'SQL'],
    businessContext: 'Door-frame workflow automation spanning geometry and data persistence.',
    whatItProves: 'Autodesk process depth plus application architecture discipline.',
    relatedArtifacts: [{ label: 'Autodesk / CAD Systems', href: '/contexts/autodesk-cad' }],
    featured: true,
  },
  {
    id: '3d-quote-tool',
    title: '3D Quote Tool',
    videoUrl: 'https://www.youtube.com/watch?v=NtwpK8-7Ef0',
    thumbnail: getThumb('https://www.youtube.com/watch?v=NtwpK8-7Ef0'),
    domain: 'autodesk',
    stackTags: ['ERP', 'VB.NET', 'Inventor'],
    businessContext: 'Commercial quoting paired with 3D technical configuration.',
    whatItProves: 'A direct line from engineering geometry to quote outputs.',
    relatedArtifacts: [{ label: 'CPQ decision workbench', href: '/case-studies/cpq-decision-workbench' }],
    featured: true,
  },
  {
    id: 'employee-allocation-tool',
    title: 'Employee Allocation Tool',
    videoUrl: 'https://www.youtube.com/watch?v=jaab3b_ttIo',
    thumbnail: getThumb('https://www.youtube.com/watch?v=jaab3b_ttIo'),
    domain: 'workflow',
    stackTags: ['Excel', 'Validation', 'Finance'],
    businessContext: 'Work allocation and planning support.',
    whatItProves: 'Process tooling discipline outside design-heavy contexts.',
    relatedArtifacts: [{ label: 'Full proof library', href: '/contexts/full-proof-library' }],
  },
  {
    id: 'led-quote-tool',
    title: 'LED Quote Tool',
    videoUrl: 'https://www.youtube.com/watch?v=xmLHainqgVU',
    thumbnail: getThumb('https://www.youtube.com/watch?v=xmLHainqgVU'),
    domain: 'erp',
    stackTags: ['ERP', 'VBA', 'Pricing'],
    businessContext: 'Commercial pricing tool in an engineering-adjacent sales workflow.',
    whatItProves: 'Pricing logic and technical structure meeting in one tool.',
    relatedArtifacts: [{ label: 'CPQ decision workbench', href: '/cpq-demo' }],
  },
  {
    id: 'slc-column-configurator',
    title: 'SLC Column Configurator',
    videoUrl: 'https://www.youtube.com/watch?v=Kl84rkNXGwc',
    thumbnail: getThumb('https://www.youtube.com/watch?v=Kl84rkNXGwc'),
    domain: 'autodesk',
    stackTags: ['iLogic', 'Inventor', 'VB.NET'],
    businessContext: 'Configurable column-cover workflow for engineering and submission generation.',
    whatItProves: 'Strong fit for Autodesk/QTS context because it ties geometry, options, and output packages together.',
    relatedArtifacts: [{ label: 'Vault operations case study', href: '/case-studies/vault-ops-reliability' }],
    featured: true,
  },
  {
    id: 'frame-generator-form',
    title: 'Frame Generator Form',
    videoUrl: 'https://www.youtube.com/watch?v=hvMBMv1JEgg',
    thumbnail: getThumb('https://www.youtube.com/watch?v=hvMBMv1JEgg'),
    domain: 'autodesk',
    stackTags: ['iLogic', 'GenerativeDesign'],
    businessContext: 'Generated design workflow for repeated frame configurations.',
    whatItProves: 'Parametric thinking and controlled automation in CAD environments.',
    relatedArtifacts: [{ label: 'Autodesk / CAD Systems', href: '/contexts/autodesk-cad' }],
  },
  {
    id: 'part-number-generator',
    title: 'Part Number Generator',
    videoUrl: 'https://www.youtube.com/watch?v=NWHDp9UDY_0',
    thumbnail: getThumb('https://www.youtube.com/watch?v=NWHDp9UDY_0'),
    domain: 'automation',
    stackTags: ['Python', 'CLI', 'Automation'],
    businessContext: 'Structured naming and data-standardization support.',
    whatItProves: 'Operational rigor around naming, identifiers, and repeatability.',
    relatedArtifacts: [{ label: 'Product systems', href: '/contexts/product-systems' }],
  },
];

export function getPortfolioContext(slug: PortfolioContextSlug) {
  return portfolioContexts.find((context) => context.slug === slug);
}

export function isPortfolioContextSlug(value: string): value is PortfolioContextSlug {
  return portfolioContexts.some((context) => context.slug === value);
}

export function getFeaturedCaseStudies() {
  return caseStudies;
}

export function getAllProofArtifacts() {
  return proofArtifacts;
}

export function getFeaturedAutodeskVideos() {
  return autodeskVideoArtifacts.filter((artifact) => artifact.featured);
}
