export type EditorialSlotFamily =
  | 'diagram'
  | 'proof'
  | 'trust'
  | 'hero'
  | 'demo';

export type EditorialSlotStatus = 'placeholder' | 'ready' | 'live';

export type EditorialSlotNode = {
  label: string;
  detail?: string;
};

export type EditorialSlotRecord = {
  id: string;
  storyId: string;
  slotId: string;
  family: EditorialSlotFamily;
  label: string;
  title: string;
  questionAnswered: string;
  primaryClaim: string;
  caption: string;
  status: EditorialSlotStatus;
  aspectRatio: '16:9' | '5:4' | '4:3' | '1:1';
  surface: 'light' | 'dark';
  sourceStoryIds: string[];
  nodes: EditorialSlotNode[];
  ctaLabel?: string;
  ctaHref?: string;
};

const editorialSlots: EditorialSlotRecord[] = [
  {
    id: 'homepage-proof-plate',
    storyId: 'homepage-issue',
    slotId: 'proof-diagram',
    family: 'proof',
    label: 'Flagship proof plate',
    title: 'Operator search turns tribal memory into a scannable system.',
    questionAnswered: 'How does an archive become faster, cleaner, and easier to trust?',
    primaryClaim: 'One structured workflow can reduce lookup friction and improve operator confidence.',
    caption:
      'Replace this with the final proof screenshot or diagram once the narrative is approved.',
    status: 'placeholder',
    aspectRatio: '16:9',
    surface: 'light',
    sourceStoryIds: ['operator-search-platform'],
    nodes: [
      { label: 'Legacy archive', detail: 'Opaque naming and buried context' },
      { label: 'Parsing + filters', detail: 'Expose the logic in the open' },
      { label: 'Operator result', detail: 'Find and open the right asset fast' },
    ],
  },
  {
    id: 'homepage-trust-plate',
    storyId: 'homepage-issue',
    slotId: 'trust-diagram',
    family: 'trust',
    label: 'Trust plate',
    title: 'Verification stays one click away.',
    questionAnswered: 'How do we keep the issue credible without slowing the story down?',
    primaryClaim: 'Trust is strongest when sourcing, freshness, and proof routes stay structured.',
    caption:
      'This is the editorial trust layer: short, factual, and easy to swap when CMS data lands.',
    status: 'placeholder',
    aspectRatio: '5:4',
    surface: 'light',
    sourceStoryIds: ['resume', 'full-proof-library'],
    nodes: [
      { label: 'Resume', detail: 'Primary trust anchor' },
      { label: 'Context pages', detail: 'Audience-specific verification routes' },
      { label: 'Full archive', detail: 'Secondary proof stays accessible' },
    ],
  },
  {
    id: 'track-openai-diagram',
    storyId: 'track-openai',
    slotId: 'hero-diagram',
    family: 'diagram',
    label: 'Track map',
    title: 'AI-era workflow proof, reordered for recruiter speed.',
    questionAnswered: 'What do recruiters need to understand first about this path?',
    primaryClaim: 'The same proof set can be arranged to foreground product judgment and internal-tool leverage.',
    caption: 'The page keeps the visual structure calm while the evidence ordering does the work.',
    status: 'placeholder',
    aspectRatio: '5:4',
    surface: 'dark',
    sourceStoryIds: ['operator-search-platform', 'cpq-decision-workbench'],
    nodes: [
      { label: 'Problem', detail: 'Ambiguous workflow pain' },
      { label: 'System', detail: 'Operator-facing logic' },
      { label: 'Outcome', detail: 'Clearer decision support' },
    ],
  },
  {
    id: 'track-construction-diagram',
    storyId: 'track-construction',
    slotId: 'hero-diagram',
    family: 'diagram',
    label: 'Track map',
    title: 'Autodesk and construction proof, reordered for enterprise review.',
    questionAnswered: 'What matters first when the audience cares about lifecycle and governance?',
    primaryClaim: 'The proof should show reliability, integration awareness, and domain depth before breadth.',
    caption: 'Keep this plate spare so the architecture signal stays crisp.',
    status: 'placeholder',
    aspectRatio: '5:4',
    surface: 'dark',
    sourceStoryIds: ['vault-ops-reliability', 'qts-suwanee'],
    nodes: [
      { label: 'Lifecycle', detail: 'Role and document flow' },
      { label: 'Governance', detail: 'Ownership and auditability' },
      { label: 'Execution', detail: 'Practical delivery confidence' },
    ],
  },
  {
    id: 'case-operator-search-diagram',
    storyId: 'case-operator-search-platform',
    slotId: 'hero-diagram',
    family: 'diagram',
    label: 'Case-study diagram',
    title: 'Legacy archive to operator workflow.',
    questionAnswered: 'How does the work turn encoded knowledge into speed?',
    primaryClaim: 'The system boundary is explicit enough to explain the operator benefit in one glance.',
    caption: 'This should become the main diagram once the content is CMS-sourced.',
    status: 'placeholder',
    aspectRatio: '16:9',
    surface: 'light',
    sourceStoryIds: ['homepage-issue'],
    nodes: [
      { label: 'Input', detail: 'Encoded drawing data' },
      { label: 'Transform', detail: 'Parse and filter' },
      { label: 'Output', detail: 'Open the right drawing quickly' },
    ],
  },
  {
    id: 'case-vault-diagram',
    storyId: 'case-vault-ops-reliability',
    slotId: 'hero-diagram',
    family: 'diagram',
    label: 'Case-study diagram',
    title: 'Reliability as a workflow system.',
    questionAnswered: 'What makes the environment legible enough to support?',
    primaryClaim: 'Troubleshooting becomes architecture work when dependencies are mapped clearly.',
    caption: 'Use this slot for a clean service, dependency, or runbook diagram.',
    status: 'placeholder',
    aspectRatio: '16:9',
    surface: 'light',
    sourceStoryIds: ['autodesk-cad'],
    nodes: [
      { label: 'Dependencies', detail: 'Services and permissions' },
      { label: 'Failure modes', detail: 'What breaks and why' },
      { label: 'Recovery', detail: 'Runbook and supportability' },
    ],
  },
  {
    id: 'case-cpq-diagram',
    storyId: 'case-cpq-decision-workbench',
    slotId: 'hero-diagram',
    family: 'diagram',
    label: 'Case-study diagram',
    title: 'Commercial logic made inspectable.',
    questionAnswered: 'How do pricing rules become a calm operator surface?',
    primaryClaim: 'The demo and case study should show business rules without hiding the math.',
    caption: 'This is the proof plate for the pricing and configuration story.',
    status: 'placeholder',
    aspectRatio: '16:9',
    surface: 'light',
    sourceStoryIds: ['product-systems', 'openai'],
    nodes: [
      { label: 'Inputs', detail: 'Scenario and options' },
      { label: 'Logic', detail: 'Pricing and approvals' },
      { label: 'Quote', detail: 'Defensible output' },
    ],
  },
  {
    id: 'context-openai-diagram',
    storyId: 'context-openai',
    slotId: 'hero-diagram',
    family: 'diagram',
    label: 'Context diagram',
    title: 'Current AI leverage without losing system accountability.',
    questionAnswered: 'How should the OpenAI path be framed for modern product teams?',
    primaryClaim: 'AI-assisted work matters most when the workflow stays accountable and inspectable.',
    caption: 'Use this as the magazine plate that anchors the OpenAI context page.',
    status: 'placeholder',
    aspectRatio: '5:4',
    surface: 'dark',
    sourceStoryIds: ['cpq-decision-workbench', 'operator-search-platform'],
    nodes: [
      { label: 'Prompt', detail: 'Capture intent clearly' },
      { label: 'Control', detail: 'Preserve business logic' },
      { label: 'Result', detail: 'Cleaner operator output' },
    ],
  },
  {
    id: 'context-autodesk-diagram',
    storyId: 'context-autodesk-cad',
    slotId: 'hero-diagram',
    family: 'diagram',
    label: 'Context diagram',
    title: 'Long-run Autodesk depth with current relevance.',
    questionAnswered: 'How do we show the archive as a real body of work instead of a long list?',
    primaryClaim: 'Chronology and evidence grouping turn depth into a fast-read system.',
    caption: 'This plate can sit near the top of the Autodesk context page.',
    status: 'placeholder',
    aspectRatio: '5:4',
    surface: 'dark',
    sourceStoryIds: ['vault-ops-reliability', 'operator-search-platform'],
    nodes: [
      { label: 'Chronology', detail: 'How the archive evolved' },
      { label: 'Artifacts', detail: 'Video, diagrams, articles' },
      { label: 'Interpretation', detail: 'What it proves now' },
    ],
  },
  {
    id: 'context-product-diagram',
    storyId: 'context-product-systems',
    slotId: 'hero-diagram',
    family: 'diagram',
    label: 'Context diagram',
    title: 'Workflow engines, integration surfaces, and decision systems.',
    questionAnswered: 'What unifies the portfolio across domains?',
    primaryClaim: 'The same operating model appears repeatedly even when the tools and industries differ.',
    caption: 'A small systems map keeps the product story legible on first read.',
    status: 'placeholder',
    aspectRatio: '5:4',
    surface: 'dark',
    sourceStoryIds: ['operator-search-platform', 'cpq-decision-workbench'],
    nodes: [
      { label: 'Workflow', detail: 'What users do' },
      { label: 'Integration', detail: 'What systems talk' },
      { label: 'Decision', detail: 'What rules matter' },
    ],
  },
  {
    id: 'context-qts-diagram',
    storyId: 'context-qts-suwanee',
    slotId: 'hero-diagram',
    family: 'diagram',
    label: 'Context diagram',
    title: 'Governed lifecycle thinking for the QTS path.',
    questionAnswered: 'What does the architecture briefing need to make obvious immediately?',
    primaryClaim: 'Enterprise trust comes from making lifecycle, governance, and ownership visible early.',
    caption: 'This slot stays small and calm so the enterprise framing reads with authority.',
    status: 'placeholder',
    aspectRatio: '5:4',
    surface: 'dark',
    sourceStoryIds: ['vault-ops-reliability', 'autodesk-cad'],
    nodes: [
      { label: 'Lifecycle', detail: 'ACC and role flow' },
      { label: 'Governance', detail: 'Controls and handoffs' },
      { label: 'Stability', detail: 'Practical early wins' },
    ],
  },
  {
    id: 'context-creative-ai-diagram',
    storyId: 'context-creative-ai',
    slotId: 'hero-diagram',
    family: 'diagram',
    label: 'Context diagram',
    title: 'Prompt-first interaction with controlled output.',
    questionAnswered: 'How do we show creative AI without drifting into gimmickry?',
    primaryClaim: 'The product proves guided creation, not novelty.',
    caption: 'Keep this a supporting plate so the main portfolio signal stays systems-led.',
    status: 'placeholder',
    aspectRatio: '5:4',
    surface: 'dark',
    sourceStoryIds: ['product-systems'],
    nodes: [
      { label: 'Prompt', detail: 'User intent first' },
      { label: 'Guidance', detail: 'Keep the output controlled' },
      { label: 'Result', detail: 'Usable creative artifact' },
    ],
  },
  {
    id: 'context-proof-library-diagram',
    storyId: 'context-full-proof-library',
    slotId: 'hero-diagram',
    family: 'trust',
    label: 'Archive plate',
    title: 'The archive stays available without dominating the first screen.',
    questionAnswered: 'How do we preserve depth without making it the first thing a reviewer has to parse?',
    primaryClaim: 'A full library works best when it is structured, searchable, and secondary to the issue.',
    caption: 'This is the archive note for the proof-library context page.',
    status: 'placeholder',
    aspectRatio: '5:4',
    surface: 'dark',
    sourceStoryIds: ['homepage-issue'],
    nodes: [
      { label: 'Primary', detail: 'Homepage issue and tracks' },
      { label: 'Secondary', detail: 'Proof library and archive' },
      { label: 'Deep dive', detail: 'Supporting evidence and docs' },
    ],
  },
];

export function getEditorialSlots(storyId: string) {
  return editorialSlots.filter((slot) => slot.storyId === storyId);
}

export function getEditorialSlot(storyId: string, slotId: string) {
  return editorialSlots.find((slot) => slot.storyId === storyId && slot.slotId === slotId) ?? null;
}

