# Principal B2B Engineering Showcase Spec

## Thesis

Thomas Smith is positioned as a principal-level B2B systems builder who turns fragmented workflows into reliable operator-facing products. The site should communicate systems ownership, business judgment, and delivery leverage before technology breadth.

## Primary Audiences

- OpenAI recruiter or hiring manager evaluating principal B2B engineering fit
- Construction, Autodesk, or data center platform leader evaluating workflow, integration, and systems execution fit
- General recruiter who needs a fast summary of scope, domain depth, and proof

## Route Map

- `/`: single-path editorial issue for the shared principal-engineer core story
- `/tracks/openai`: recruiter path for principal B2B engineering at OpenAI
- `/tracks/construction`: recruiter path for construction, Autodesk, and data center platform roles
- `/case-studies/[slug]`: structured proof pages
- `/cpq-demo`: interactive proof artifact with scenario context

## Section Goals

### Shared homepage

- Establish role level, systems scope, and business orientation in the first viewport
- Present one curated editorial arc instead of asking the visitor to choose a path
- Use magazine-style pacing, media, and captions while keeping one clear claim per spread
- Surface one flagship proof first, with supporting proof and appendix routes kept secondary

### Track pages

- Reorder the same body of proof for the target audience
- Answer "why this person for this kind of role?" within 30 seconds
- Translate legacy automation work into reusable systems and platform patterns

### Case study pages

- Present principal-level reasoning: problem, constraints, architecture, leadership, tradeoffs, outcomes
- Use diagrams and decision notes rather than narrative-only blog prose

### CPQ demo

- Explain the system as a decision workbench, not a toy quote calculator
- Make scenarios, business rules, user roles, and production extension points legible

## Proof Rubric

- Every flagship proof item must include business context, system boundary, leadership scope, and concrete outcomes
- Every page must show at least one operator-facing artifact and one systems-level artifact
- Supporting proof can be narrower, but must be tagged to at least one recruiter track
- Every homepage spread must declare its primary claim, evidence asset, and placeholder status

## CMS And Editorial Operations

- The homepage editorial issue should be CMS-backed rather than hard-coded as a one-off sequence
- Storyblok Starter is the recommended v1 CMS because it supports visual editing, asset management, and non-technical publishing on a free entry path
- Homepage spreads should be modeled as structured content with linked proof artifacts, media assets, CTA blocks, and trust blocks
- Videos and images must always be treated as evidence surfaces, not decoration

## Acceptance Criteria

- A recruiter can identify role level, domain fit, and strongest evidence within one screen and one scroll
- The OpenAI and Construction tracks share layout primitives but feel intentionally different in emphasis
- The proof library is ranked by relevance rather than a loose chronological blog roll
- The CPQ experience explains what the demo proves architecturally before exposing controls
- Metadata, structured data, and recruiter-facing CTAs align with a principal engineering profile
- The homepage no longer asks the visitor to choose an intent before the story starts
- The homepage content can be managed through the CMS with structured media placeholders and trust metadata
