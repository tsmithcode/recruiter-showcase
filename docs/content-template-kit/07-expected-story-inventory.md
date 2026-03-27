# Expected Story Inventory

This doc defines the expected story set for the recruiter showcase app.

Note: the CMS layer is still intentionally not implemented. The app is currently using local, CMS-shaped persistent story data so the structure can stay stable while the Storyblok vs Sanity decision is still being settled.

It is based on three inputs:

- the current app structure and proof catalog already in this repo
- the expert panel consensus on recruiter and consulting ROI
- the resume-level themes already visible across the portfolio: Autodesk depth, workflow systems, product/platform thinking, CPQ logic, AI-assisted execution, and operator enablement

## Expert Consensus

- `Story strategist`: lead with one magazine-style issue, then route into a small set of high-signal context, track, case study, and demo pages.
- `ROI strategist`: the first wave should prove systems thinking, product judgment, enterprise realism, and current technical leverage fast.
- `CMS strategist`: reuse a few template families and add more stories by recombining proof, not by inventing new page types.

## Resume-Informed Story Themes

These are the work themes the panel expects a reviewer to see clearly across the app:

- `Workflow systems`: software that reduces friction in real operator environments
- `Autodesk / CAD depth`: long-run domain credibility, not just one-off tooling
- `Enterprise integration and governance`: systems that survive handoffs, dependencies, and operational constraints
- `Product / platform thinking`: business-rule clarity, not just feature output
- `CPQ and configurable logic`: decision systems that make commercial complexity usable
- `AI-assisted delivery`: modern leverage without losing system accountability
- `Operator enablement`: adoption, runbooks, supportability, and trust

## Table Columns

Use these columns for planning and CMS seeding:

| Column | Meaning |
|---|---|
| `Priority` | `P0`, `P1`, or `P2` launch order |
| `Status` | `Current`, `Expand`, or `Add` |
| `Story / Page` | Human-readable page name |
| `Route or Slug` | Current route or recommended slug |
| `Template Family` | Reusable page template type |
| `Primary Audience` | Who cares first |
| `Primary Claim` | The one thing the story should prove |
| `ROI` | Outcome value from 1 to 5 |
| `Codex Responsibility` | What should be automated through API/CMS |
| `Manual Responsibility` | What still needs human judgment |

## Expected Stories

| Priority | Status | Story / Page | Route or Slug | Template Family | Primary Audience | Primary Claim | ROI | Codex Responsibility | Manual Responsibility |
|---|---|---|---|---|---|---|---:|---|---|
| P0 | Current | Homepage editorial issue | `/` | Editorial Issue Page | Recruiters, hiring managers, enterprise reviewers | Thomas Smith is a principal-level workflow and systems builder with proof, not just claims. | 5 | seed issue, spreads, CTAs, trust metadata, CMS sync | final editorial hierarchy, wording, and proof order |
| P0 | Current | OpenAI track | `/tracks/openai` | Track Page | B2B engineering recruiters, product leaders | Legacy automation translates into current internal-tools and operator-software leverage. | 5 | maintain track bundles, proof references, CTAs | tune recruiter-facing framing |
| P0 | Current | Construction / Autodesk track | `/tracks/construction` | Track Page | Construction, Autodesk, data-center platform leaders | Deep domain systems work translates into enterprise-ready platform execution. | 5 | assemble proof set, references, supporting artifacts | choose strongest domain-specific proof |
| P0 | Current | Operator search platform | `/case-studies/operator-search-platform` | Case Study Page | Recruiters, hiring managers, workflow leaders | Encoded legacy knowledge was turned into fast, operator-usable retrieval software. | 5 | structure case study sections, metrics, media links | sharpen narrative and outcome language |
| P0 | Current | Vault ops reliability | `/case-studies/vault-ops-reliability` | Case Study Page | Autodesk/CAD leaders, enterprise operations reviewers | Fragile operational systems were made legible, supportable, and governable. | 5 | package chronology, references, troubleshooting proof | refine lesson and business framing |
| P0 | Current | CPQ decision workbench | `/case-studies/cpq-decision-workbench` and `/cpq-demo` | Case Study Page + Demo Marketing Page | Product leaders, enterprise buyers, recruiters | Business-rule complexity can be made inspectable and usable for non-engineering operators. | 5 | keep case study and demo linked, validate proof spine | decide positioning and CTA emphasis |
| P1 | Current | OpenAI context | `/contexts/openai` | Context Page | Recruiters, hiring managers | Current AI-era tooling belongs inside accountable product systems, not hype. | 4 | render context blocks, related artifacts, proof rails | tune tone for employer fit |
| P1 | Current | Autodesk / CAD context | `/contexts/autodesk-cad` | Context Page | Autodesk/CAD hiring managers | The Autodesk archive proves long-run systems depth and production realism. | 4 | maintain chronology and video grouping | curate strongest historical proof |
| P1 | Current | Product systems context | `/contexts/product-systems` | Context Page | Product and platform leaders | The portfolio is unified by workflow engines, decision systems, and operator-facing product logic. | 4 | keep artifact grouping clean and queryable | choose best cross-domain examples |
| P1 | Current | QTS Suwanee / Autodesk systems | `/contexts/qts-suwanee` | Context Page | Construction platform architecture leaders | Thomas can think in governed lifecycle, integration, and data architecture terms, not just Autodesk tooling. | 5 | maintain architecture maps and governance blocks | refine architecture narrative and role fit |
| P1 | Current | Full proof library | `/contexts/full-proof-library` | Proof Library Page | Reviewers who want full-depth verification | There is enough breadth and depth to substantiate the homepage thesis. | 4 | canonicalize artifacts, tags, filters, links | decide featured proof order |
| P1 | Current | Creative AI / aJam context | `/contexts/creative-ai` | Context Page | Interviewers evaluating AI-native interaction design | AI work here is prompt-aware, constrained, and productized rather than novelty-driven. | 3 | keep outbound links, supporting proof, metadata clean | decide whether this remains supporting or moves higher |
| P1 | Add | Resume / quick trust hub | `/resume` or `/proof/resume` | Artifact Detail Page | Recruiters, hiring managers | Resume, role summary, and verification links can be reviewed in one fast trust layer. | 4 | sync resume asset, version, metadata, download CTA | keep resume current and curated |
| P1 | Add | Proof library index by domain | `/proof` | Proof Library Page | Reviewers seeking specific evidence | Proof should be explorable by domain, artifact type, and outcome, not only by page path. | 4 | generate filters, tags, and artifact cards | select which artifacts are featured |
| P1 | Add | Live demo marketing page: CPQ decision workbench | `/demos/cpq-decision-workbench` | Demo Marketing Page | Product leaders, enterprise buyers | This demo proves decision logic, pricing transparency, and operator-facing product judgment. | 5 | seed demo metadata, outbound launch link, linked proof | write the one-sentence pitch and choose screenshots |
| P1 | Add | Live demo marketing page: operator search platform | `/demos/operator-search-platform` | Demo Marketing Page | Workflow leaders, hiring managers | This demo proves archive-to-product thinking and measurable operator speed. | 5 | link demo, supporting media, matching case study | choose the best visual proof |
| P1 | Add | Live demo marketing page: Autodesk Vault operations | `/demos/vault-ops-reliability` | Demo Marketing Page | Autodesk/CAD operations leaders | This demo proves reliability, troubleshooting discipline, and workflow stabilization. | 4 | package runbook-style proof and demo metadata | keep copy crisp and business-readable |
| P1 | Add | Live demo marketing page: ERP / CRM workflow | `/demos/erp-crm-workflow` | Demo Marketing Page | Enterprise architecture and operations leaders | Thomas can connect downstream business systems, not only Autodesk-centered tools. | 4 | seed reusable demo page and outbound link model | define the business value and target audience |
| P1 | Add | Live demo marketing page: configurator / quote engine | `/demos/configurator-quote-engine` | Demo Marketing Page | Buyers, product leaders, workflow software reviewers | Configurable product logic can be turned into a premium operator-facing surface. | 4 | connect demo page to CPQ and product-systems proof | make it feel product-grade and differentiated |
| P2 | Expand | Autodesk video library as a standalone story system | linked from `/contexts/autodesk-cad` | Artifact Detail Page Set | CAD and Autodesk reviewers | The archive is large enough to behave like a governed video proof collection. | 3 | normalize video metadata and related-proof links | choose which videos deserve standalone treatment |
| P2 | Expand | Blog proof: WinForms PDM sprint | `/blog/WinForms-PDM-Sprint3` | Artifact Detail Page | Technical reviewers | The implementation discipline behind the UI matters, not just the screenshots. | 3 | keep technical article linked to broader proof spine | decide whether to preserve or rewrite for clarity |
| P2 | Expand | Blog proof: Autodesk Vault troubleshooting | `/blog/autodesk-vault-troubleshooting` | Artifact Detail Page | Autodesk admins, support leaders | Troubleshooting depth is part of systems credibility. | 3 | structure article metadata and cross-links | keep it current and readable |
| P2 | Add | Hiring manager track | `/tracks/hiring-manager` | Track Page | Direct managers and principals | The portfolio can be reordered around scope, decisions, and outcomes rather than recruiter speed. | 4 | generate alternate track from existing proof graph | decide what depth belongs here |
| P2 | Add | Enterprise buyer / consulting track | `/tracks/enterprise` | Track Page | Prospects, clients, consulting leads | The same proof can support paid advisory and implementation conversations. | 4 | create track shell, CTA, and supporting references | choose service-led positioning carefully |
| P2 | Add | Enterprise integration / governance flagship | `/case-studies/enterprise-integration-governance` | Case Study Page | Architecture and platform leaders | Governance, integration, and lifecycle mapping are a real part of the portfolio, not a side note. | 5 | seed template, diagrams, and related artifacts | write a concise, high-trust case study from experience and resume proof |
| P2 | Add | AI-assisted workflow execution flagship | `/case-studies/ai-assisted-workflow-execution` | Case Study Page | Modern product and platform teams | AI tools are used to accelerate delivery while preserving clear boundaries and accountability. | 4 | wire current tooling proof, screenshots, and references | decide how strongly to lead with AI versus systems thinking |
| P2 | Add | Operator enablement / adoption story | `/case-studies/operator-enablement` | Case Study Page | Ops leaders, implementation stakeholders | Adoption, supportability, and day-two operations are a core strength. | 4 | structure runbook, training, and support evidence | choose the strongest cross-project examples |

## The Five Live Demo Marketing Pages

The panel agrees these should be treated as marketing pages with outbound links, not just raw app routes:

1. `CPQ Decision Workbench`
2. `Operator Search Platform`
3. `Autodesk Vault Operations Demo`
4. `ERP / CRM Workflow Demo`
5. `Configurator / Quote Engine`

Each demo page should contain:

- a one-sentence value proposition
- what the demo proves
- why the problem matters commercially
- a launch link to the live demo
- a secondary CTA to the related case study or context page
- supporting screenshot, short clip, or diagram

## Recommended Launch Order

### Wave 1

- homepage editorial issue
- OpenAI track
- Construction / Autodesk track
- operator search case study
- Vault ops reliability case study
- CPQ decision workbench case study

### Wave 2

- proof library
- OpenAI context
- Autodesk / CAD context
- product systems context
- QTS Suwanee context
- 5 live demo marketing pages
- resume / quick trust hub

### Wave 3

- hiring manager track
- enterprise buyer / consulting track
- enterprise integration / governance flagship
- AI-assisted workflow execution flagship
- operator enablement / adoption flagship
- expanded standalone artifact pages and video-library depth

## Reuse Rules

- One canonical proof artifact should feed every case study, context page, demo page, and proof-library entry.
- Demo pages should sell the proof and point back into the story system; they should not become orphaned microsites.
- Context pages should reframe proof for a specific audience, not duplicate the same case study copy.
- Track pages should reorder proof for a different reader, not create new proof.
- New stories should almost always mean new rows in this table, not new template families.

## Codex Vs Manual Work

### Codex / API

- create and update CMS schema
- seed stories from this inventory
- keep slugs, links, and relationships consistent
- maintain proof references and shared metadata
- bulk patch launch links, tags, CTAs, and placeholder state

### Manual

- decide the highest-signal angle for each story
- write headline, deck, caption, and claim language
- choose the strongest screenshots, diagrams, and clips
- decide what is worth publishing now versus later
- make the final publication call

## ROI Guidance

- Highest ROI comes from stories that quickly prove principal-level systems thinking, operator empathy, and business-rule clarity.
- The current repo already has enough material for a strong first wave without inventing new domains.
- The best additions from a resume and consulting ROI standpoint are the five live demo marketing pages plus one enterprise integration/governance flagship.
