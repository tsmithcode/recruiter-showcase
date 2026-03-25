import { AudienceTrack } from './showcaseContent';

export type CpqScenarioId =
  | 'aerospace'
  | 'automotive'
  | 'banking'
  | 'biotech'
  | 'construction'
  | 'energy'
  | 'etoCad'
  | 'film'
  | 'medical'
  | 'music'
  | 'realEstate'
  | 'software';

export type CpqScenario = {
  id: CpqScenarioId;
  name: string;
  headline: string;
  summary: string;
  operator: string;
  buyer: string;
  pricingLogic: string;
  workflowStates: string[];
  extensionPoints: string[];
  productionNotes: string[];
  relevance: AudienceTrack[];
};

export const cpqScenarios: Record<CpqScenarioId, CpqScenario> = {
  aerospace: {
    id: 'aerospace',
    name: 'Aerospace and defense',
    headline: 'Complex quoting for compliance-heavy deliverables',
    summary:
      'This scenario models structured quoting where documentation, approvals, and high-cost deliverables need a transparent pricing surface.',
    operator: 'Program manager or estimator',
    buyer: 'Operations or procurement lead',
    pricingLogic: 'Margins protect specialist labor while material markups absorb documentation and handling overhead.',
    workflowStates: ['Scenario selected', 'Components adjusted', 'Margins reviewed', 'Quote shared'],
    extensionPoints: ['Approval policy', 'Export to ERP', 'Audit log'],
    productionNotes: ['Add role-based approvals', 'Persist quote history', 'Tie outputs to contract metadata'],
    relevance: ['construction', 'openai'],
  },
  automotive: {
    id: 'automotive',
    name: 'Automotive and EV',
    headline: 'Quote assembly for repeatable product configurations',
    summary:
      'This scenario highlights how the same pricing core can support configurable packages across a higher-volume commercial workflow.',
    operator: 'Sales engineer',
    buyer: 'Program or manufacturing lead',
    pricingLogic: 'Pricing balances labor repeatability with scenario-specific materials and discounts.',
    workflowStates: ['Package selected', 'Cost inputs tuned', 'Discount applied', 'Quote delivered'],
    extensionPoints: ['SKU mapping', 'Lead-time estimation', 'Change tracking'],
    productionNotes: ['Map components to SKU master data', 'Record revisions', 'Add pricing approval thresholds'],
    relevance: ['construction', 'openai'],
  },
  banking: {
    id: 'banking',
    name: 'Banking operations',
    headline: 'Service packaging for internal workflow modernization',
    summary:
      'A service-heavy quoting model where trust comes from making business logic legible to non-technical stakeholders.',
    operator: 'Operations manager',
    buyer: 'Department lead',
    pricingLogic: 'Labor margin dominates because execution is workflow-heavy rather than material-heavy.',
    workflowStates: ['Service scope selected', 'Optional work added', 'Margin reviewed', 'Receipt generated'],
    extensionPoints: ['Deal desk review', 'Service package templates', 'CRM sync'],
    productionNotes: ['Track service entitlements', 'Store quote assumptions', 'Connect to account records'],
    relevance: ['openai'],
  },
  biotech: {
    id: 'biotech',
    name: 'Healthcare and biotech',
    headline: 'Structured quoting for specialized deliverables',
    summary:
      'Useful when the commercial flow has regulated or detail-sensitive deliverables and the quote surface needs to reduce ambiguity.',
    operator: 'Program coordinator',
    buyer: 'Clinical or operations stakeholder',
    pricingLogic: 'Higher labor protection reflects detail-oriented execution and stakeholder review burden.',
    workflowStates: ['Scope selected', 'Documentation added', 'Margin checked', 'Quote finalized'],
    extensionPoints: ['Compliance fields', 'Approver routing', 'Template versioning'],
    productionNotes: ['Add validation rules', 'Track required attachments', 'Capture approver history'],
    relevance: ['openai'],
  },
  construction: {
    id: 'construction',
    name: 'Construction and infrastructure',
    headline: 'A quoting and packaging layer for project coordination work',
    summary:
      'This is the clearest construction-path scenario: configurable deliverables, role-based controls, and transparent commercial logic for project teams.',
    operator: 'Preconstruction or project operations lead',
    buyer: 'General contractor, owner, or trade partner',
    pricingLogic: 'Labor margin protects coordination effort while material markups account for documentation and specialized assets.',
    workflowStates: ['Scope assembled', 'Optional items toggled', 'Commercial review', 'Quote issued'],
    extensionPoints: ['BOM export', 'Project record sync', 'Approval routing by quote size'],
    productionNotes: ['Tie line items to project packages', 'Persist scenario assumptions', 'Export to downstream systems'],
    relevance: ['construction', 'openai'],
  },
  energy: {
    id: 'energy',
    name: 'Energy and utilities',
    headline: 'Quote logic for field-constrained deliverables',
    summary:
      'Shows how the workbench can support complex service packaging where execution constraints and documentation overhead matter.',
    operator: 'Field operations estimator',
    buyer: 'Program or maintenance lead',
    pricingLogic: 'Pricing emphasizes labor planning, documentation effort, and recoverable materials.',
    workflowStates: ['Package selected', 'Field modifiers applied', 'Margin reviewed', 'Quote generated'],
    extensionPoints: ['Regional pricing', 'Work-order sync', 'Dispatch data'],
    productionNotes: ['Account for site risk premiums', 'Track schedule dependencies', 'Add audit-ready exports'],
    relevance: ['construction'],
  },
  etoCad: {
    id: 'etoCad',
    name: 'Engineer-to-order CAD',
    headline: 'Productized quoting for engineering deliverables',
    summary:
      'Closest to the original domain history: configurable CAD-heavy output translated into visible pricing and packaging decisions.',
    operator: 'Applications engineer',
    buyer: 'Project stakeholder or estimator',
    pricingLogic: 'Labor and documentation effort are primary, with optional assets layered as configurable add-ons.',
    workflowStates: ['Base package loaded', 'Engineering options added', 'Commercial review', 'Quote packaged'],
    extensionPoints: ['CAD metadata ingest', 'Revision lineage', 'Customer-ready exports'],
    productionNotes: ['Connect to drawing data', 'Persist revisions', 'Split commercial and engineering approvals'],
    relevance: ['construction', 'openai'],
  },
  film: {
    id: 'film',
    name: 'Film and media',
    headline: 'Creative service quoting with reusable pricing rules',
    summary:
      'A lighter-weight scenario that demonstrates the portability of the pricing core across domains.',
    operator: 'Producer or project lead',
    buyer: 'Client or account stakeholder',
    pricingLogic: 'Labor-heavy pricing with configurable deliverables and optional add-ons.',
    workflowStates: ['Package chosen', 'Options selected', 'Discount reviewed', 'Quote issued'],
    extensionPoints: ['Template presets', 'Asset delivery hooks', 'CRM sync'],
    productionNotes: ['Track package variants', 'Attach deliverable lists', 'Store client approvals'],
    relevance: ['openai'],
  },
  medical: {
    id: 'medical',
    name: 'Medical education assets',
    headline: 'Documentation-rich quoting for specialized asset production',
    summary:
      'The default scenario demonstrates how the same product surface can support documentation, diagrams, and specialized content outputs.',
    operator: 'Program or content lead',
    buyer: 'Clinical educator or operations stakeholder',
    pricingLogic: 'Balances specialist labor against a small set of recoverable material costs.',
    workflowStates: ['Scenario loaded', 'Components reviewed', 'Profit analyzed', 'Quote generated'],
    extensionPoints: ['Template catalog', 'Document workflow', 'Stakeholder approval'],
    productionNotes: ['Attach references and approvals', 'Version outputs', 'Capture downstream delivery status'],
    relevance: ['openai'],
  },
  music: {
    id: 'music',
    name: 'Music and media packaging',
    headline: 'Configurable deliverables with transparent commercial logic',
    summary:
      'Demonstrates how the workbench handles optional content packages and margin-aware bundling.',
    operator: 'Producer or account lead',
    buyer: 'Artist or label stakeholder',
    pricingLogic: 'Flexible optionality layered over a reusable base cost model.',
    workflowStates: ['Package selected', 'Add-ons toggled', 'Total reviewed', 'Receipt generated'],
    extensionPoints: ['Rights metadata', 'Asset delivery', 'Template bundles'],
    productionNotes: ['Store approval states', 'Persist bundle rules', 'Attach delivery links'],
    relevance: ['openai'],
  },
  realEstate: {
    id: 'realEstate',
    name: 'Real estate and property marketing',
    headline: 'Project quoting for packaged service outputs',
    summary:
      'A service packaging example that still depends on clear options, commercial visibility, and role-specific review.',
    operator: 'Account or project lead',
    buyer: 'Broker or property stakeholder',
    pricingLogic: 'Service labor dominates, with optional media and documentation add-ons.',
    workflowStates: ['Property package selected', 'Scope refined', 'Commercial review', 'Quote issued'],
    extensionPoints: ['CRM sync', 'Asset pipeline', 'Service history'],
    productionNotes: ['Track package templates', 'Store client preferences', 'Connect to scheduling tools'],
    relevance: ['openai'],
  },
  software: {
    id: 'software',
    name: 'Software sales',
    headline: 'A B2B quoting surface for packaging internal tools and workflow products',
    summary:
      'Best fit for the OpenAI path: a transparent decision system that packages workflow software, optional services, and margin logic in one interface.',
    operator: 'Solutions engineer or deal desk owner',
    buyer: 'Business systems or operations leader',
    pricingLogic: 'Base implementation labor, optional services, and discount controls stay visible so the quote is easy to defend.',
    workflowStates: ['Base package loaded', 'Optional services added', 'Margin reviewed', 'Quote sent'],
    extensionPoints: ['CRM opportunity sync', 'Usage pricing', 'Approval workflows'],
    productionNotes: ['Store quotes per account', 'Add policy checks', 'Connect to contract generation'],
    relevance: ['openai', 'construction'],
  },
};
