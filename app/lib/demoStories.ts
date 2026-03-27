export type DemoPersona =
  | 'product-ux'
  | 'enterprise-ops'
  | 'technical-director'
  | 'founder-ceo'
  | 'operations-executive'
  | 'manufacturing-workflow';

export type DemoFramePolicy = 'frameable' | 'blocked' | 'protected';

export type DemoViewportMode = 'web' | 'mobile-portrait' | 'mobile-landscape';

export type DemoMetric = {
  value: string;
  label: string;
  detail: string;
};

export type DemoStory = {
  id: string;
  slug: string;
  productName: string;
  brandLabel: string;
  previewImage: string;
  previewAlt: string;
  liveUrl: string;
  framePolicy: DemoFramePolicy;
  status: 'live' | 'maintenance' | 'gated';
  leadPersona: DemoPersona;
  secondaryPersona: DemoPersona;
  distinctValueLabel: string;
  reviewerPrompt: string;
  oneLineValueProp: string;
  principalClaim: string;
  whatItProves: string[];
  commercialWhyItMatters: string[];
  createdFromScratchNote: string;
  portfolioScaleNote: string;
  relatedCaseStudyHref: string;
  relatedContextHref: string;
  launchCtaLabel: string;
  frameModes: DemoViewportMode[];
  metrics: DemoMetric[];
  trustNotes: string[];
  fallbackPreviewLabel: string;
  primaryEyebrow: string;
  supportLabel: string;
};

export const demoStories: DemoStory[] = [
  {
    id: 'demo-ajam',
    slug: 'ajam',
    productName: 'aJam',
    brandLabel: '4chord.vercel.app',
    previewImage: '/images/demos/ajam-poster.png',
    previewAlt: 'aJam guided onboarding homepage with a one-question-per-screen product flow',
    liveUrl: 'https://4chord.vercel.app',
    framePolicy: 'frameable',
    status: 'maintenance',
    leadPersona: 'product-ux',
    secondaryPersona: 'founder-ceo',
    distinctValueLabel: 'Guided onboarding and product restraint',
    reviewerPrompt: 'Can this person turn ambiguous user intent into a calm first-run product experience?',
    oneLineValueProp:
      'Intent-first song drafting that reduces creative friction by guiding users through one calm decision at a time.',
    principalClaim:
      'This demo proves product restraint, onboarding judgment, and a bias toward fast first value rather than overwhelming users with controls.',
    whatItProves: [
      'Progressive disclosure can feel premium when the first action is obvious and the interface stays quiet.',
      'Consumer-facing flows can still reflect principal-level product thinking when every step earns its place.',
      'A guided loop can move from vague intent to a usable first result without forcing account creation first.',
    ],
    commercialWhyItMatters: [
      'Teams pay for faster activation and lower abandonment when the first-run experience is calm.',
      'The same onboarding discipline transfers directly to internal tools, AI workflows, and operator software.',
      'This is a proof surface for product taste, not just a music experiment.',
    ],
    createdFromScratchNote:
      'Built from scratch by Thomas Smith as a full product surface, not a design mock or template remix.',
    portfolioScaleNote:
      'This is 1 of 7 live products Thomas Smith is maintaining at once, including this showcase.',
    relatedCaseStudyHref: '/case-studies/cpq-decision-workbench',
    relatedContextHref: '/contexts/creative-ai',
    launchCtaLabel: 'Open aJam',
    frameModes: ['web', 'mobile-portrait', 'mobile-landscape'],
    metrics: [
      {
        value: '1',
        label: 'question per screen',
        detail: 'The flow prioritizes clarity over feature density from the first interaction.',
      },
      {
        value: '0',
        label: 'accounts before first jam',
        detail: 'The product defers commitment until the user has something worth keeping.',
      },
      {
        value: '2',
        label: 'viewer modes that matter most',
        detail: 'Desktop and handheld framing stay legible without changing the product itself.',
      },
    ],
    trustNotes: [
      'Created from scratch and still being actively maintained.',
      'The current maintenance state is visible instead of hidden behind marketing copy.',
      'This page is driven by local CMS-shaped data while the CMS decision is still open.',
    ],
    fallbackPreviewLabel: 'Guided onboarding product surface',
    primaryEyebrow: 'Product UX proof',
    supportLabel: 'Guided onboarding and calm interaction design',
  },
  {
    id: 'demo-monyawn',
    slug: 'monyawn',
    productName: 'Monyawn',
    brandLabel: 'monyawn.vercel.app',
    previewImage: '/images/demos/monyawn-poster.png',
    previewAlt: 'Monyawn enterprise workflow workspace with lifecycle stages, governance overlays, and review tooling',
    liveUrl: 'https://monyawn.vercel.app',
    framePolicy: 'protected',
    status: 'gated',
    leadPersona: 'enterprise-ops',
    secondaryPersona: 'technical-director',
    distinctValueLabel: 'Governed lifecycle workflow software',
    reviewerPrompt: 'Can this person design workflow software that stays auditable without becoming painful to use?',
    oneLineValueProp:
      'A governed lifecycle workspace for opportunities, review gates, exports, and human-in-the-loop workflow operations.',
    principalClaim:
      'This demo proves that high-stakes workflow software can stay auditable, staged, and operator-friendly without collapsing into admin noise.',
    whatItProves: [
      'Lifecycle state, review gates, exports, and integrity checks can all stay visible in one operational workspace.',
      'Enterprise workflow UX can support staff, admin, and human review layers without becoming brittle.',
      'Protected access is itself part of the operating model when the product is meant to handle serious workflow state.',
    ],
    commercialWhyItMatters: [
      'Organizations need workflow systems that preserve traceability without slowing teams down.',
      'The product shows how governance can be a usable part of the interface, not a separate compliance afterthought.',
      'This is a proof surface for enterprise maturity and stateful process design.',
    ],
    createdFromScratchNote:
      'Built from scratch by Thomas Smith as a governed workflow product with real review structure and export logic.',
    portfolioScaleNote:
      'This is 2 of 7 live products Thomas Smith is maintaining at once, including this showcase.',
    relatedCaseStudyHref: '/case-studies/operator-search-platform',
    relatedContextHref: '/contexts/product-systems',
    launchCtaLabel: 'Open Monyawn',
    frameModes: ['web', 'mobile-portrait', 'mobile-landscape'],
    metrics: [
      {
        value: '10',
        label: 'lifecycle stages',
        detail: 'The product models workflow progression explicitly instead of implying it through screens alone.',
      },
      {
        value: '3',
        label: 'mode families',
        detail: 'Guided workspace, staff operations, and admin governance are clearly separated.',
      },
      {
        value: '1',
        label: 'integrity discipline',
        detail: 'Integrity checks and export paths are part of the experience, not a hidden admin concern.',
      },
    ],
    trustNotes: [
      'Access is protected, so this site will show a premium fallback instead of pretending the iframe is broken.',
      'Created from scratch and framed as operational software, not a superficial wizard.',
      'This page is driven by local CMS-shaped data while the CMS decision is still open.',
    ],
    fallbackPreviewLabel: 'Governed lifecycle operations workspace',
    primaryEyebrow: 'Enterprise workflow proof',
    supportLabel: 'Governed workflow and human review visibility',
  },
  {
    id: 'demo-mds',
    slug: 'million-dollar-dot-net-snippets',
    productName: 'Million Dollar Dot Net Snippets',
    brandLabel: 'mds-mu-six.vercel.app',
    previewImage: '/images/demos/mds-poster.png',
    previewAlt: 'Million Dollar Dot Net Snippets about page showing founder credibility and enterprise engineering proof',
    liveUrl: 'https://mds-mu-six.vercel.app/about',
    framePolicy: 'blocked',
    status: 'live',
    leadPersona: 'technical-director',
    secondaryPersona: 'founder-ceo',
    distinctValueLabel: 'Framework positioning and technical credibility',
    reviewerPrompt: 'Can this person turn enterprise engineering depth into a reusable premium delivery narrative?',
    oneLineValueProp:
      'A founder-facing framework site that turns Autodesk, .NET, and enterprise systems depth into a reusable premium delivery narrative.',
    principalClaim:
      'This demo proves that messy enterprise engineering knowledge can be translated into a clear, premium framework surface with leadership credibility.',
    whatItProves: [
      'Founder credibility can be structured as product-facing proof instead of biography filler.',
      'Autodesk depth, modernization work, and enterprise integration experience can be reframed for executive review.',
      'Framework thinking is a product skill when the surface teaches value, scope, and trust quickly.',
    ],
    commercialWhyItMatters: [
      'Technical credibility becomes more valuable when leaders can read it without digging through low-level details.',
      'A premium delivery framework site shortens trust-building for consulting and platform buyers.',
      'This is a proof surface for category framing and systems-led founder positioning.',
    ],
    createdFromScratchNote:
      'Built from scratch by Thomas Smith to turn technical depth into a founder-level premium product narrative.',
    portfolioScaleNote:
      'This is 3 of 7 live products Thomas Smith is maintaining at once, including this showcase.',
    relatedCaseStudyHref: '/case-studies/vault-ops-reliability',
    relatedContextHref: '/contexts/autodesk-cad',
    launchCtaLabel: 'Open MDS',
    frameModes: ['web', 'mobile-portrait', 'mobile-landscape'],
    metrics: [
      {
        value: '24%',
        label: 'Autodesk savings signal',
        detail: 'The site translates technical wins into executive-readable proof.',
      },
      {
        value: '.NET 8',
        label: 'modernization lens',
        detail: 'The framework is positioned around current delivery patterns, not stale legacy bragging.',
      },
      {
        value: 'ERP + CAD',
        label: 'cross-system signal',
        detail: 'The surface keeps multi-system fluency visible to hiring managers and technical leaders.',
      },
    ],
    trustNotes: [
      'The source site blocks cross-origin framing, so this wrapper uses a premium fallback shell.',
      'Created from scratch as a framework and credibility surface, not a static bio page.',
      'This page is driven by local CMS-shaped data while the CMS decision is still open.',
    ],
    fallbackPreviewLabel: 'Founder framework and technical credibility surface',
    primaryEyebrow: 'Framework and leadership proof',
    supportLabel: 'Founder credibility and productized technical depth',
  },
  {
    id: 'demo-gvo-smith',
    slug: 'gvo-smith',
    productName: 'GVO SMiTH',
    brandLabel: 'gvo-smith.vercel.app',
    previewImage: '/images/demos/gvo-smith-poster.png',
    previewAlt: 'GVO SMiTH homepage showing direct support, media, and creator-commerce flows in one system',
    liveUrl: 'https://gvo-smith.vercel.app',
    framePolicy: 'frameable',
    status: 'live',
    leadPersona: 'founder-ceo',
    secondaryPersona: 'product-ux',
    distinctValueLabel: 'Owned audience and creator commerce system',
    reviewerPrompt: 'Can this person unify content, commerce, and audience capture without losing product clarity?',
    oneLineValueProp:
      'A self-owned creator-commerce platform that unifies music discovery, support, mailing-list capture, and service offers in one system.',
    principalClaim:
      'This demo proves that one principal can design, build, and operate brand, content, commerce, and audience capture from one source of truth.',
    whatItProves: [
      'Commerce, media, support, and direct connection can live together without the site feeling fragmented.',
      'Creator ownership becomes a systems problem when content, checkout, and audience capture need to reinforce one another.',
      'A direct-support surface can feel intentional and premium while still staying operationally simple.',
    ],
    commercialWhyItMatters: [
      'Revenue capture gets stronger when discovery and support live in the same controlled environment.',
      'This is proof of product breadth: brand system, UX, commerce flow, and trust architecture in one place.',
      'The same integration judgment transfers to B2B products that must connect audience, action, and payment.',
    ],
    createdFromScratchNote:
      'Built from scratch by Thomas Smith as a unified product, brand, and commerce surface rather than a theme-based artist site.',
    portfolioScaleNote:
      'This is 4 of 7 live products Thomas Smith is maintaining at once, including this showcase.',
    relatedCaseStudyHref: '/case-studies/cpq-decision-workbench',
    relatedContextHref: '/contexts/product-systems',
    launchCtaLabel: 'Open GVO SMiTH',
    frameModes: ['web', 'mobile-portrait', 'mobile-landscape'],
    metrics: [
      {
        value: '3',
        label: 'direct support tiers',
        detail: 'The support path is already structured as a live product surface, not a placeholder.',
      },
      {
        value: '56',
        label: 'songs in active rotation',
        detail: 'The product keeps live catalog behavior visible instead of burying freshness.',
      },
      {
        value: '1',
        label: 'owned audience lane',
        detail: 'Discovery, updates, and direct support are deliberately kept in one system.',
      },
    ],
    trustNotes: [
      'Created from scratch with live support, media, and audience-capture flows.',
      'The platform proves ownership and operational discipline, not just visual design.',
      'This page is driven by local CMS-shaped data while the CMS decision is still open.',
    ],
    fallbackPreviewLabel: 'Creator commerce and audience ownership platform',
    primaryEyebrow: 'Commerce and brand systems proof',
    supportLabel: 'Owned audience, media, and direct support flow',
  },
  {
    id: 'demo-cadence-ops',
    slug: 'cadence-ops',
    productName: 'Cadence Ops',
    brandLabel: 'efficiency-dashboard.onrender.com',
    previewImage: '/images/demos/cadence-ops-poster.png',
    previewAlt: 'Cadence Ops overview showing operations intelligence for supervisors, managers, and executives',
    liveUrl: 'https://efficiency-dashboard.onrender.com',
    framePolicy: 'blocked',
    status: 'maintenance',
    leadPersona: 'operations-executive',
    secondaryPersona: 'enterprise-ops',
    distinctValueLabel: 'Role-aware operations intelligence',
    reviewerPrompt: 'Can this person build one control-tower product that serves floor execution and executive review at once?',
    oneLineValueProp:
      'An industrial operations control tower for supervisors, managers, and executives working from one shared product surface.',
    principalClaim:
      'This demo proves that operations intelligence is most valuable when one product supports floor execution, manager review, and executive visibility at the same time.',
    whatItProves: [
      'The same system can serve multiple operational personas without flattening their needs into one generic dashboard.',
      'Workflow state, reporting, analytics, and setup can stay unified under one role-aware shell.',
      'Control-tower thinking is a product skill when the information architecture drives action, not just monitoring.',
    ],
    commercialWhyItMatters: [
      'Operations software creates more value when the handoff between frontline and leadership is built into the product.',
      'This is strong evidence of systems thinking in environments where performance, downtime, and escalation matter.',
      'The product shows enterprise-ready clarity, not just chart-heavy dashboard styling.',
    ],
    createdFromScratchNote:
      'Built from scratch by Thomas Smith as a role-aware operations workspace and maintained as part of the broader live portfolio.',
    portfolioScaleNote:
      'This is 5 of 7 live products Thomas Smith is maintaining at once, including this showcase.',
    relatedCaseStudyHref: '/case-studies/vault-ops-reliability',
    relatedContextHref: '/contexts/qts-suwanee',
    launchCtaLabel: 'Open Cadence Ops',
    frameModes: ['web', 'mobile-portrait', 'mobile-landscape'],
    metrics: [
      {
        value: '3',
        label: 'persona lenses',
        detail: 'Supervisor, manager, and executive perspectives are deliberately supported.',
      },
      {
        value: '5',
        label: 'core operating routes',
        detail: 'Overview, operations, analytics, reports, and setup are kept in one shell.',
      },
      {
        value: '1',
        label: 'control-tower model',
        detail: 'The product is designed around shared operational truth instead of disconnected views.',
      },
    ],
    trustNotes: [
      'The source site blocks cross-origin framing, so this wrapper uses a premium fallback shell.',
      'Created from scratch as an operations product, not a dashboard mock.',
      'This page is driven by local CMS-shaped data while the CMS decision is still open.',
    ],
    fallbackPreviewLabel: 'Industrial operations control-tower software',
    primaryEyebrow: 'Operations intelligence proof',
    supportLabel: 'Role-aware execution and executive visibility',
  },
  {
    id: 'demo-special-build-studio',
    slug: 'special-build-studio',
    productName: 'Special Build Studio',
    brandLabel: 'special-build-plastic-belts.onrender.com',
    previewImage: '/images/demos/special-build-studio-poster.png',
    previewAlt: 'Special Build Studio loading state for a drawing request workspace and operator tools',
    liveUrl: 'https://special-build-plastic-belts.onrender.com',
    framePolicy: 'frameable',
    status: 'live',
    leadPersona: 'manufacturing-workflow',
    secondaryPersona: 'enterprise-ops',
    distinctValueLabel: 'Focused manufacturing support workflow',
    reviewerPrompt: 'Can this person turn a narrow industrial support process into clean operator software with clear intent?',
    oneLineValueProp:
      'A focused request and drawing-number workflow surface for special-build manufacturing support.',
    principalClaim:
      'This demo proves that narrow industrial support workflows can be turned into clean operator software with clear system intent and no unnecessary noise.',
    whatItProves: [
      'Even small manufacturing workflows benefit from explicit operator tooling instead of ad hoc request handling.',
      'Focused industrial software can still feel premium when the workflow is clear and the product stays narrow.',
      'This is a proof surface for disciplined scope control and support-system empathy.',
    ],
    commercialWhyItMatters: [
      'Manufacturing support teams save time when request logic and drawing workflow are made explicit.',
      'The product shows how a small workflow can still justify product-quality framing and operator clarity.',
      'This is strong evidence of fit for support-heavy engineering and manufacturing environments.',
    ],
    createdFromScratchNote:
      'Built from scratch by Thomas Smith as a focused manufacturing support product with operator workflow at the center.',
    portfolioScaleNote:
      'This is 6 of 7 live products Thomas Smith is maintaining at once, including this showcase.',
    relatedCaseStudyHref: '/case-studies/vault-ops-reliability',
    relatedContextHref: '/tracks/construction',
    launchCtaLabel: 'Open Special Build Studio',
    frameModes: ['web', 'mobile-portrait', 'mobile-landscape'],
    metrics: [
      {
        value: '1',
        label: 'core support workflow',
        detail: 'The product is intentionally narrow so operators can move without ambiguity.',
      },
      {
        value: '100%',
        label: 'scope focus',
        detail: 'The design emphasizes one real workflow rather than diluting value across too many features.',
      },
      {
        value: '7',
        label: 'live-product context',
        detail: 'It sits inside a broader principal-run portfolio instead of as a disconnected prototype.',
      },
    ],
    trustNotes: [
      'Created from scratch as focused industrial software, not a repackaged admin form.',
      'Frameable today, so the live product can stay inside the portfolio flow.',
      'This page is driven by local CMS-shaped data while the CMS decision is still open.',
    ],
    fallbackPreviewLabel: 'Manufacturing support and drawing workflow product',
    primaryEyebrow: 'Manufacturing workflow proof',
    supportLabel: 'Focused operator tooling for support-heavy environments',
  },
];

export function getDemoStory(slug: string) {
  return demoStories.find((story) => story.slug === slug);
}

export function getPersonaLabel(persona: DemoPersona) {
  switch (persona) {
    case 'product-ux':
      return 'Product and UX hiring managers';
    case 'enterprise-ops':
      return 'Enterprise workflow and operations leaders';
    case 'technical-director':
      return 'Technical directors and platform-minded hiring managers';
    case 'founder-ceo':
      return 'Founders, CEOs, and product-minded recruiters';
    case 'operations-executive':
      return 'Operations executives and enterprise architecture leaders';
    case 'manufacturing-workflow':
      return 'Manufacturing workflow and support-focused engineering leaders';
    default:
      return 'Recruiters and hiring managers';
  }
}
