export type AudienceTrack = 'openai' | 'construction';

export type Metric = {
  value: string;
  label: string;
  detail: string;
};

export type AudienceTrackContent = {
  slug: AudienceTrack;
  label: string;
  navLabel: string;
  eyebrow: string;
  headline: string;
  summary: string;
  recruiterQuestion: string;
  focusAreas: string[];
  proofArtifactIds: string[];
  featuredCaseStudySlugs: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaEvent: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  strapline: string;
  summary: string;
  domain: string;
  timeline: string;
  role: string;
  proofType: string;
  challenge: string;
  constraints: string[];
  systemBoundaries: string[];
  architectureSummary: string;
  architectureLayers: Array<{
    name: string;
    detail: string;
  }>;
  leadershipScope: string[];
  decisions: string[];
  outcomes: string[];
  relevanceTags: AudienceTrack[];
  image: string;
  visualEvidence?: Array<{
    image: string;
    alt: string;
    title: string;
    interpretation: string;
  }>;
  primaryLink?: {
    label: string;
    href: string;
  };
  appendixLinks?: Array<{
    label: string;
    href: string;
  }>;
};

export type ProofArtifact = {
  id: string;
  type: 'case-study' | 'demo' | 'article' | 'video' | 'diagram';
  title: string;
  summary: string;
  href: string;
  context: string;
  relevanceTags: AudienceTrack[];
};

export const principalMetrics: Metric[] = [
  {
    value: '17,000+',
    label: 'legacy drawings translated into searchable product data',
    detail: 'Ground truth lifted from a high-friction CAD archive into operator-friendly filters.',
  },
  {
    value: '2s',
    label: 'target retrieval time for technical search workflows',
    detail: 'Built for operational speed, reuse, and lower onboarding drag.',
  },
  {
    value: '12',
    label: 'industry datasets modeled in the CPQ proof workbench',
    detail: 'One pricing surface, multiple domain scenarios, reusable business-rule patterns.',
  },
  {
    value: '3',
    label: 'flagship proof narratives on this site',
    detail: 'Each one framed around system boundaries, decisions, and measurable outcomes.',
  },
];

export const domainSignals = [
  {
    title: 'Internal tools with business leverage',
    description:
      'Operator-facing systems for search, quoting, workflow execution, and decision support.',
  },
  {
    title: 'Cross-system integration',
    description:
      'Experience bridging CAD, ERP, CRM, file stores, APIs, and human approval loops.',
  },
  {
    title: 'Delivery under operational constraints',
    description:
      'Preference for systems that improve throughput fast without requiring fragile process change.',
  },
];

export const leadershipPrinciples = [
  'Translate vague business pain into explicit system boundaries, KPIs, and release slices.',
  'Favor workflows that reduce operator decision fatigue instead of shifting complexity downstream.',
  'Treat architecture, UI, and operational runbooks as one product surface when reliability matters.',
];

export const systemMap = [
  {
    title: 'Workflow engines',
    items: ['Search and retrieval flows', 'Approval and quote sequencing', 'Role-specific operator modes'],
  },
  {
    title: 'Integration surfaces',
    items: ['CAD and PDM ecosystems', 'ERP and CRM handoffs', 'CLI, API, and document generation layers'],
  },
  {
    title: 'Decision systems',
    items: ['Pricing logic', 'Margin visibility', 'Business-rule transparency for non-engineering users'],
  },
  {
    title: 'Execution model',
    items: ['Rapid sprint delivery', 'Architecture review and refactoring', 'Runbooks and troubleshooting depth'],
  },
];

export const audienceTracks: Record<AudienceTrack, AudienceTrackContent> = {
  openai: {
    slug: 'openai',
    label: 'OpenAI Track',
    navLabel: 'OpenAI',
    eyebrow: 'Principal B2B engineering path',
    headline: 'A systems builder for internal tools, workflow products, and high-leverage operator software.',
    summary:
      'This track reframes legacy automation work as proof of product judgment: taking messy operating reality, clarifying decision logic, and shipping tools that make teams faster and more consistent.',
    recruiterQuestion: 'Can this engineer turn ambiguous operational pain into software that changes throughput?',
    focusAreas: [
      'Internal platform and workflow acceleration',
      'Operator UX for complex business rules',
      'Cross-functional delivery with measurable ROI',
      'Systems thinking that is compatible with AI-assisted work',
    ],
    proofArtifactIds: [
      'case-operator-search',
      'case-cpq-workbench',
      'article-winforms-pdm',
      'video-erp-crm',
      'demo-cpq',
    ],
    featuredCaseStudySlugs: [
      'operator-search-platform',
      'cpq-decision-workbench',
      'vault-ops-reliability',
    ],
    ctaLabel: 'Review the OpenAI-fit proof',
    ctaHref: '/tracks/openai',
    ctaEvent: 'track_openai_selected',
  },
  construction: {
    slug: 'construction',
    label: 'Construction / Data Center Platforms Track',
    navLabel: 'Construction',
    eyebrow: 'Construction systems and platform path',
    headline: 'Operational software for design, coordination, quoting, and workflow reliability in construction-heavy environments.',
    summary:
      'This track emphasizes Autodesk, CAD, PDM, and implementation realism: building systems that survive field complexity, legacy data, and the coordination burden across design and operations.',
    recruiterQuestion: 'Can this engineer connect engineering data, commercial logic, and execution workflows without romanticizing the domain?',
    focusAreas: [
      'Autodesk and CAD-adjacent workflow systems',
      'Operational tooling for data-rich environments',
      'Implementation constraints, troubleshooting, and runbooks',
      'Pricing, configuration, and coordination workflows for project teams',
    ],
    proofArtifactIds: [
      'case-vault-reliability',
      'case-operator-search',
      'demo-cpq',
      'article-vault',
      'video-slc-airport',
    ],
    featuredCaseStudySlugs: [
      'vault-ops-reliability',
      'operator-search-platform',
      'cpq-decision-workbench',
    ],
    ctaLabel: 'Review the construction systems proof',
    ctaHref: '/tracks/construction',
    ctaEvent: 'track_construction_selected',
  },
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'operator-search-platform',
    title: 'Operator Search Platform for a 17,000-Drawing CAD Archive',
    strapline: 'A WinForms workflow system that turned tribal-knowledge lookup into structured retrieval.',
    summary:
      'A legacy drawing archive was slowing reuse, onboarding, and engineering throughput. The system was redesigned around attribute parsing, filterable search, and a cleaner services layer so operators could find and open relevant drawings in seconds.',
    domain: 'Manufacturing / CAD operations',
    timeline: 'Three sprint release sequence',
    role: 'Lead application engineer across product framing, architecture, and delivery slicing',
    proofType: 'Client system',
    challenge:
      'Searching by opaque drawing numbers forced users to memorize naming conventions and rely on experienced teammates for retrieval.',
    constraints: [
      'Needed to work inside an existing Windows-heavy operator environment.',
      'Large legacy catalog with inconsistent human naming habits.',
      'Adoption depended on speed and clarity, not on introducing a new workflow philosophy.',
    ],
    systemBoundaries: [
      'Desktop search experience for engineering operators.',
      'Attribute parsing layer for drawing-number decomposition.',
      'Service boundaries that could later support a hybrid or web UI.',
    ],
    architectureSummary:
      'The system separates drawing-number parsing, search logic, and UI interaction so lookup speed and operator clarity can improve without binding the product to one interface forever.',
    architectureLayers: [
      {
        name: 'Input normalization',
        detail: 'Transforms encoded drawing identifiers into a stable set of searchable attributes.',
      },
      {
        name: 'Search and filtering',
        detail: 'Applies fast filtering across a large legacy catalog with operator-friendly columns.',
      },
      {
        name: 'Operator surface',
        detail: 'Delivers quick scanning, lookup, and drawing-open workflows inside a familiar desktop shell.',
      },
    ],
    leadershipScope: [
      'Converted user pain into a measurable retrieval KPI and sprint plan.',
      'Used DI and SOLID structure to keep the MVP fast to ship but extensible.',
      'Prioritized reuse and onboarding impact over feature volume.',
    ],
    decisions: [
      'Chose WinForms to meet operators where they already worked instead of forcing a platform migration first.',
      'Decomposed drawing numbers into attributes so search could map to human reasoning instead of memorized codes.',
      'Structured code for later reuse in hybrid UI paths rather than letting the MVP harden into a dead end.',
    ],
    outcomes: [
      'Search latency reduced to roughly two seconds for target workflows.',
      'Daily reused drawings increased from 8 to 18 on average.',
      'Full lookup and open flow dropped under 30 seconds for common operator scenarios.',
    ],
    relevanceTags: ['openai', 'construction'],
    image: '/images/blog/sbp-pdm-sprint3.jpeg',
    visualEvidence: [
      {
        image: '/images/blog/sbp-pdm-sprint1.jpeg',
        alt: 'Early Special Build Plastic Drawing PDM system overview',
        title: 'Revision 1: the product blueprint became visible',
        interpretation:
          'This first screen is less interesting as UI polish than as systems framing. It shows the product boundary clearly: file explorer, drawing list, decoded attributes, action layer, and an advanced filter concept. It proves the problem was understood as a workflow system, not a single search box.',
      },
      {
        image: '/images/blog/sbp-pdm-sprint2.jpeg',
        alt: 'Second revision of the Special Build Plastic Drawing PDM with heavy filters',
        title: 'Revision 2: operator filtering moved to the center',
        interpretation:
          'The left-heavy filtering surface makes the intent obvious: retrieval speed depended on translating encoded drawing data into human-scannable categories. The image supports the claim that search moved from tribal memory to structured operator controls.',
      },
      {
        image: '/images/blog/sbp-pdm-sprint3.jpeg',
        alt: 'Third revision of the Special Build Plastic Drawing PDM with analysis console and live attributes',
        title: 'Revision 3: the tool matured into an analysis workbench',
        interpretation:
          'The final interface shows the strongest proof. Console output, parsed attributes, tree summaries, and quick filters all coexist. This is no longer just retrieval; it is an operator analysis surface that supports trust, debugging, and repeated use at scale.',
      },
    ],
    primaryLink: {
      label: 'Read the original PDM article',
      href: '/blog/WinForms-PDM-Sprint3',
    },
  },
  {
    slug: 'vault-ops-reliability',
    title: 'Vault Operations Reliability for a Multi-Client CAD/PDM Environment',
    strapline: 'A troubleshooting and operations discipline for Autodesk Vault, Job Processor, and client coordination.',
    summary:
      'This work focused on making a fragile Vault environment legible and supportable. The proof is not just setup knowledge, but a repeatable operational model: isolate failures, classify dependencies, and stabilize the workflow chain end to end.',
    domain: 'Construction / CAD infrastructure',
    timeline: 'Operational hardening and support cycle',
    role: 'Systems troubleshooter and workflow reliability owner',
    proofType: 'Client system',
    challenge:
      'Vault View, Job Processor, and surrounding client/server setup could fail for network, permission, SQL, installation, or app-level reasons, making diagnosis expensive and slow.',
    constraints: [
      'The environment included one Vault server, one job processor, and nine client instances.',
      'Failures often crossed system boundaries, so UI symptoms were rarely the root cause.',
      'The value came from reliable runbooks and environment literacy, not from a flashy front end.',
    ],
    systemBoundaries: [
      'Server and client installation health.',
      'Job processor configuration, permissions, and queue behavior.',
      'Operational documentation and recovery patterns for ongoing support.',
    ],
    architectureSummary:
      'The architecture was treated as a dependency graph: IIS, SQL, Vault services, client state, permissions, and external applications all had to be debugged as one workflow system.',
    architectureLayers: [
      {
        name: 'Environment health',
        detail: 'Verifies server, SQL, storage, and client prerequisites before higher-level debugging.',
      },
      {
        name: 'Workflow execution',
        detail: 'Tracks job queue behavior, processor credentials, app dependencies, and failure logs.',
      },
      {
        name: 'Operational runbook',
        detail: 'Turns repeated incidents into a predictable troubleshooting sequence for future support.',
      },
    ],
    leadershipScope: [
      'Systematized diagnosis rather than treating each incident as a one-off support ticket.',
      'Connected infrastructure, permissions, and user workflow into one support model.',
      'Emphasized documentation and checkpoint testing so future failures were cheaper to isolate.',
    ],
    decisions: [
      'Framed troubleshooting around dependency order, not around whatever symptom appeared first.',
      'Pushed for documented checkpoints after each major setup or recovery step.',
      'Used operations guidance as part of the product, because fragile environments fail socially as well as technically.',
    ],
    outcomes: [
      'Established a repeatable path for isolating Vault, Job Processor, and client-side failures.',
      'Reduced ambiguity in a multi-client CAD/PDM environment by documenting what to test, where to look, and what each failure mode implied.',
      'Improved readiness for ongoing support, maintenance, and handoff.',
    ],
    relevanceTags: ['construction', 'openai'],
    image: '/images/blog/inventor-vault.png',
    visualEvidence: [
      {
        image: '/images/blog/inventor-vault.png',
        alt: 'Autodesk Inventor, Autodesk Vault, Visual Studio and .NET framework tooling collage',
        title: 'The operating stack was multi-system from the start',
        interpretation:
          'This image matters because it captures the real dependency shape: Inventor, Vault, Visual Studio, and .NET were not separate resume bullets, they were one operational chain. The support burden came from their interaction points.',
      },
      {
        image: '/images/blog/column-configurator-solution.png',
        alt: 'Fry Reglet web-based column cover configurator with 3D preview and submittal actions',
        title: 'The operator-facing product sat on top of the Vault workflow',
        interpretation:
          'The configurator UI shows why reliability mattered. This was not abstract infrastructure work; a real commercial and engineering surface depended on downstream job execution, generated outputs, and CAD-adjacent coordination.',
      },
      {
        image: '/images/blog/source-code-structure.png',
        alt: 'Column Cover Configurator source code structure showing API, configuration, data, jobs, rules, and job processor projects',
        title: 'The codebase was intentionally split along workflow boundaries',
        interpretation:
          'The project structure proves the system was treated as a platform, not a script. Separate API, data, jobs, rules, configuration, and processor projects reflect a design built for extensibility and operational clarity.',
      },
    ],
    primaryLink: {
      label: 'Read the Vault troubleshooting article',
      href: '/blog/autodesk-vault-troubleshooting',
    },
  },
  {
    slug: 'cpq-decision-workbench',
    title: 'CPQ Decision Workbench for Multi-Industry Service Packaging',
    strapline: 'A recruiter-facing product artifact that exposes pricing logic, margins, and configurable workflows.',
    summary:
      'The CPQ demo was turned into a systems proof artifact: a visible pricing engine, multiple domain datasets, role-based modes, and a clear explanation of what the product proves architecturally.',
    domain: 'Commercial workflow systems',
    timeline: 'Showcase product iteration',
    role: 'Product designer, engineer, and technical storyteller',
    proofType: 'Showcase system',
    challenge:
      'Most portfolio demos show screens but hide the decision model. This project needed to prove business-rule thinking, product framing, and operator clarity in the open.',
    constraints: [
      'The demo had to stay local and lightweight inside the current portfolio stack.',
      'It needed to support multiple industries without pretending they were identical.',
      'The value had to come from system transparency, not from mock enterprise complexity.',
    ],
    systemBoundaries: [
      'Pricing engine with labor, materials, markup, and discount logic.',
      'Dataset-driven scenario loading across industries.',
      'Role-specific customer and manager views.',
    ],
    architectureSummary:
      'The workbench is organized around reusable pricing logic and scenario data, with the UI making the assumptions visible so a recruiter can understand the product model as well as the interface.',
    architectureLayers: [
      {
        name: 'Scenario datasets',
        detail: 'Prebuilt component collections model different verticals without changing the core quote engine.',
      },
      {
        name: 'Pricing core',
        detail: 'Computes labor cost, material markup, discounts, revenue, and profit consistently across scenarios.',
      },
      {
        name: 'Role-aware interface',
        detail: 'Shows the same system through customer and manager lenses while preserving business-rule clarity.',
      },
    ],
    leadershipScope: [
      'Used the demo to explain systems thinking, not just frontend execution.',
      'Created a reusable proof artifact that can be interpreted through different recruiter tracks.',
      'Connected product strategy, business rules, and UI communication in one surface.',
    ],
    decisions: [
      'Modeled scenarios as data rather than hardcoding industry-specific UI flows.',
      'Kept the pricing engine small and explicit so recruiters could inspect logic quickly.',
      'Added proof framing and scenario narratives so the artifact reads like a product decision system.',
    ],
    outcomes: [
      'One quote engine now supports 12 vertical datasets inside the same experience.',
      'Recruiters can inspect revenue, profit, role modes, and scenario assumptions in one pass.',
      'The demo now serves as product proof for both the OpenAI and construction-oriented tracks.',
    ],
    relevanceTags: ['openai', 'construction'],
    image: '/images/blog/column-configurator-solution.png',
    visualEvidence: [
      {
        image: '/images/blog/column-configurator-solution.png',
        alt: 'Column cover configurator with form inputs and 3D preview',
        title: 'A precedent for why configurable operator software is worth showing',
        interpretation:
          'This earlier configurator screenshot is useful context for the CPQ workbench because it shows the same product instinct in a different domain: make complex commercial and engineering choices inspectable through one surface instead of scattering them across spreadsheets and tribal knowledge.',
      },
    ],
    primaryLink: {
      label: 'Open the CPQ proof artifact',
      href: '/cpq-demo',
    },
  },
];

export const proofArtifacts: ProofArtifact[] = [
  {
    id: 'case-operator-search',
    type: 'case-study',
    title: 'Operator search platform',
    summary: 'WinForms search system for a 17,000-drawing archive with measurable retrieval improvements.',
    href: '/case-studies/operator-search-platform',
    context: 'Flagship case study',
    relevanceTags: ['openai', 'construction'],
  },
  {
    id: 'case-vault-reliability',
    type: 'case-study',
    title: 'Vault operations reliability',
    summary: 'Runbook-driven troubleshooting model for Autodesk Vault, Job Processor, and client coordination.',
    href: '/case-studies/vault-ops-reliability',
    context: 'Flagship case study',
    relevanceTags: ['construction', 'openai'],
  },
  {
    id: 'case-cpq-workbench',
    type: 'case-study',
    title: 'CPQ decision workbench',
    summary: 'Transparent pricing and workflow proof artifact spanning multiple business scenarios.',
    href: '/case-studies/cpq-decision-workbench',
    context: 'Flagship case study',
    relevanceTags: ['openai', 'construction'],
  },
  {
    id: 'demo-cpq',
    type: 'demo',
    title: 'Interactive CPQ proof artifact',
    summary: 'Scenario-driven quote engine that makes business rules and operator modes visible.',
    href: '/cpq-demo',
    context: 'Interactive demo',
    relevanceTags: ['openai', 'construction'],
  },
  {
    id: 'article-winforms-pdm',
    type: 'case-study',
    title: 'Operator search platform',
    summary: 'Image-led case study showing how a CAD archive became an operator workbench.',
    href: '/case-studies/operator-search-platform',
    context: 'Case study route',
    relevanceTags: ['openai', 'construction'],
  },
  {
    id: 'article-vault',
    type: 'case-study',
    title: 'Vault operations reliability',
    summary: 'Case study on environment dependencies, job processing, and configurable product support.',
    href: '/case-studies/vault-ops-reliability',
    context: 'Case study route',
    relevanceTags: ['construction', 'openai'],
  },
  {
    id: 'video-erp-crm',
    type: 'video',
    title: 'ERP and CRM web app demo',
    summary: 'A compact demo of workflow software bridging business process logic and user-facing tools.',
    href: 'https://www.youtube.com/watch?v=gWDy964I97Y',
    context: 'Video proof',
    relevanceTags: ['openai'],
  },
  {
    id: 'video-slc-airport',
    type: 'video',
    title: 'SLC airport automation',
    summary: 'Automation-heavy project proof relevant to operational and construction-adjacent coordination.',
    href: 'https://www.youtube.com/watch?v=9YA3J85JKRI',
    context: 'Video proof',
    relevanceTags: ['construction'],
  },
];

export const homeFeatureOrder = [
  'Systems ownership',
  'Audience tracks',
  'Flagship proof',
  'Supporting evidence',
  'Action',
];

export function isAudienceTrack(value: string): value is AudienceTrack {
  return value === 'openai' || value === 'construction';
}

export function getTrackContent(track: AudienceTrack) {
  return audienceTracks[track];
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getCaseStudiesForTrack(track: AudienceTrack) {
  const orderedSlugs = audienceTracks[track].featuredCaseStudySlugs;
  return orderedSlugs
    .map((slug) => getCaseStudy(slug))
    .filter((value): value is CaseStudy => Boolean(value));
}

export function getProofForTrack(track: AudienceTrack) {
  const orderedIds = audienceTracks[track].proofArtifactIds;
  return orderedIds
    .map((id) => proofArtifacts.find((artifact) => artifact.id === id))
    .filter((value): value is ProofArtifact => Boolean(value));
}
