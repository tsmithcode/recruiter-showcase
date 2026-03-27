# Frontend Overhaul Blueprint

## Purpose

This document defines the execution blueprint for the frontend overhaul.

The goal is to replace the current browse-first website behavior with a guided proof experience that is:

- one-screen-at-a-time
- highly accessible
- calm and procedural in interaction
- emotionally strong in presentation
- understandable to low-confidence users
- trustworthy to enterprise reviewers
- backed by a secondary appendix and archive
- driven by structured CMS content rather than code-only copy

This blueprint is written for implementation readiness.

## North Star

The root experience should feel like a premium editorial review flow, not a marketing site.

The main experience should answer:

1. Why does this work matter?
2. Who is this builder?
3. What system scope did they own?
4. What proof matters most?
5. What changed?
6. Why should I trust this?
7. What should I do next?

## Product Rules

- One primary task per screen
- One primary action per screen
- Plain language only
- No forced browsing
- No content walls
- Editorial styling is allowed only when it improves comprehension and proof framing
- Progress, back, pause, and resume must always exist
- Archive access is allowed, but always secondary

## Main User Types

- Recruiter
- Hiring manager
- Enterprise buyer
- Autodesk / CAD reviewer
- Workflow product reviewer

## Main Path Structure

### Screen 1: Cover

Goal:

- create stakes
- set expectation
- reduce anxiety

Primary content:

- one hard statement about why the work matters
- one reassurance sentence about guided review

Primary action:

- `Start`

Secondary action:

- `Resume`

### Screen 2: Role Definition

Goal:

- define who this builder is in one hard sentence

Primary content:

- role identity
- operating scope
- what the viewer will see next

Primary action:

- `See the system`

### Screen 3: System Scope

Goal:

- establish complexity and ownership fast

Primary content:

- system boundary
- workflow and platform reach
- constraints or stakes

Primary action:

- `See the proof`

### Screen 4: Flagship Proof

Goal:

- show one strongest artifact with the clearest business consequence

Primary content:

- one proof title
- one short explanation
- one evidence asset and caption

Primary action:

- `See outcomes`

Secondary action:

- `Open supporting proof`

### Screen 5: Outcomes

Goal:

- show concrete before-and-after impact

Primary content:

- three outcomes maximum

Primary action:

- `See the method`

### Screen 6: Method

Goal:

- show how the work is done

Primary content:

- three to four short steps
- plain-language explanation of working method

Primary action:

- `See trust`

### Screen 7: References And Trust

Goal:

- prove legitimacy and reduce doubt

Primary content:

- source links
- reviewed by
- last updated
- scope note

Primary action:

- `Choose next step`

### Screen 8: Next Step

Goal:

- create a decisive but non-salesy handoff

Primary content:

- clear decision choices

Primary actions:

- `Contact`
- `Open resume`
- `Open full proof library`

## Appendix Model

The appendix is not part of the main path.

It contains:

- full proof library
- long-form case studies
- extended videos
- diagrams
- recruiter materials
- archived content

The appendix must never interrupt the main path.

## Information Architecture

### Root Route

- dedicated single-path editorial wizard only

### Secondary Routes

- context pages
- case studies
- CPQ demo
- archive pages

### Core Rule

The root route is for completion.
Secondary routes are for verification and deep review.

## CMS Model

The homepage should be fed by a CMS-backed editorial issue.
Storyblok Starter is the recommended v1 CMS because it provides a free starting point, a visual editor, and asset management that fit the project's editorial and media goals.

Required content types:

- `issue_page`
- `proof_artifact`
- `media_asset`
- `cta_block`
- `trust_block`

Required `issue_page` fields:

- `slug`
- `sequence`
- `kicker`
- `headline`
- `deck`
- `primary_claim`
- `emotional_target`
- `proof_artifact_ref`
- `hero_media_ref`
- `caption`
- `primary_cta`
- `secondary_cta`
- `placeholder_status`
- `publish_readiness`

Required `proof_artifact` fields:

- `title`
- `artifact_type`
- `summary`
- `what_it_proves`
- `business_outcome`
- `source_type`
- `source_url_or_path`
- `evidence_strength`
- `date`
- `audience_tags`
- `thumbnail_media_ref`

Media defaults:

- images use CMS-managed assets with crop and focal control
- videos default to external embeds or linked hosted assets in v1
- every video needs a poster frame, short caption, transcript status, and "what this proves" label
- missing assets use structured placeholders rather than empty or ad hoc content

Placeholder types:

- `hero_image_placeholder`
- `proof_screenshot_placeholder`
- `diagram_placeholder`
- `video_placeholder`
- `quote_placeholder`
- `trust_badge_placeholder`

## Expert Panel

The homepage should be governed by a standing internal expert panel.

Panel composition:

- Product Owner
- Editorial Director
- Art Director
- UX Content Strategist
- Accessibility Lead
- Frontend Lead
- Proof Archivist / Evidence Editor
- User Research Lead
- Content Operations / CMS Manager

Panel rules:

- emotional impact is allowed only when it strengthens comprehension and trust
- every spread must defend one claim only
- every media choice must answer: what does this prove
- if an asset is beautiful but not evidentiary, it stays secondary
- if copy is clever but slower to understand, rewrite it
- if a page needs more than one dominant visual idea, split it
- if proof and story conflict, proof wins

Panel output per page:

- primary claim
- emotional tone
- evidence asset
- caption or deck
- CTA
- placeholder status
- confidence score for publication

## Emotional-Impact Story Rules

- the opening spread should create stakes, not biography
- the second spread should define role identity in one hard sentence
- the flagship proof spread should carry the strongest visual contrast and the clearest business consequence
- outcome spreads should use concrete before-and-after framing, not generic success language
- trust spreads should cool the visual temperature and increase factual density
- final handoff should feel decisive, not salesy

Default pacing:

1. Cover spread: why this matters
2. Role spread: who this builder is
3. System spread: scope and complexity
4. Flagship proof spread: show the evidence
5. Outcomes spread: what changed
6. Method spread: how the work is done
7. Trust spread: why this is credible
8. Decision spread: what to do next

## Acceptance Criteria

- the homepage is a single editorial issue, not an intent chooser
- the CMS is the source of truth for homepage spreads and media placeholders
- editorial roles and the expert panel are treated as required operating structure, not optional polish
- every page type has required placeholder and proof fields
- the implementation is specific enough that another engineer can build the content model and rendering flow without making policy decisions
