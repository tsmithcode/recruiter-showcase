# Frontend Overhaul Blueprint

## Purpose

This document defines the execution blueprint for the frontend overhaul.

The goal is to replace the current browse-first website behavior with a guided proof wizard that is:

- one-screen-at-a-time
- highly accessible
- calm and procedural
- understandable to low-confidence users
- trustworthy to enterprise reviewers
- backed by a secondary appendix and archive

This blueprint is written for implementation readiness.

## North Star

The root experience should feel like a public-service review flow, not a marketing site.

The main experience should answer:

1. What are you here to review?
2. Why does this path fit?
3. What proof matters most?
4. What evidence supports it?
5. What should you do next?

## Product Rules

- One primary task per screen
- One primary action per screen
- Plain language only
- No forced browsing
- No content walls
- No decorative complexity in the main path
- Progress, back, pause, and resume must always exist
- Archive access is allowed, but always secondary

## Main User Types

- Recruiter
- Hiring manager
- Enterprise buyer
- Autodesk / CAD reviewer
- Workflow product reviewer

## Main Path Structure

### Screen 1: Welcome

Goal:

- create safety
- set expectation
- reduce anxiety

Primary content:

- one sentence explaining the guide
- one reassurance sentence

Primary action:

- `Start`

Secondary action:

- `Resume`

### Screen 2: Intent

Goal:

- identify why the user is here

Primary content:

- one question
- 3 to 4 large choices

Primary action:

- choose one path

Options:

- Hiring fit
- Enterprise consulting fit
- Autodesk / CAD systems fit
- Workflow product fit

### Screen 3: Fit Summary

Goal:

- confirm the selected path in plain language

Primary content:

- why this path fits
- what the user is about to see

Primary action:

- `See credibility`

### Screen 4: Credibility

Goal:

- establish trust fast

Primary content:

- three credibility statements maximum
- no long paragraphs

Primary action:

- `See outcomes`

### Screen 5: Outcomes

Goal:

- show business results in simple terms

Primary content:

- three outcomes maximum

Primary action:

- `See strongest proof`

### Screen 6: Strongest Proof

Goal:

- show one best artifact for this path

Primary content:

- one proof title
- one short explanation
- one proof link

Primary action:

- `See process`

Secondary action:

- `Open proof`

### Screen 7: Process

Goal:

- show how work is done

Primary content:

- three to four short steps

Primary action:

- `See references`

### Screen 8: References And Trust

Goal:

- prove legitimacy and reduce doubt

Primary content:

- source links
- last updated
- reviewed by
- scope note

Primary action:

- `Choose next step`

### Screen 9: Next Step

Goal:

- create a clean handoff

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

- dedicated wizard only

### Secondary Routes

- context pages
- case studies
- CPQ demo
- archive pages

### Core Rule

The root route is for completion.
Secondary routes are for verification and deep review.

## Content Model

Each proof record should include:

- id
- audience
- claim
- business outcome
- proof strength
- summary
- source
- date
- href
- appendix status

### Intent Pack Model

Each user path should define:

- label
- summary
- three credibility signals
- three outcomes
- one strongest proof
- three to four process steps
- reference links
- next-step options

## Component Model

### Core Components

- `WizardFrame`
- `WizardHeader`
- `ProgressBar`
- `StepTitle`
- `StepBody`
- `PrimaryAction`
- `SecondaryAction`
- `ChoiceList`
- `ChoiceCard`
- `EvidenceCard`
- `ReferenceList`
- `NextStepPanel`
- `ResumeBanner`

### Supporting Components

- `AccessibleSkipLink`
- `BackButton`
- `SaveStateNotice`
- `ErrorNotice`
- `ScopeNote`

## State Model

Wizard state should include:

- current step
- selected intent
- completion state by step
- save timestamp
- resume eligibility

### Persistence

Must support:

- local save
- resume from interruption
- reset flow

### Optional Future Persistence

- server-side save
- signed review packet
- recruiter handoff state

## Accessibility Rules

### Non-Negotiable

- keyboard accessible
- screen-reader accessible
- 44px minimum target, preferably larger
- visible focus
- no hover-only interactions
- no drag-and-drop
- no color-only meaning
- no auto-play
- no unexpected motion
- no hidden branching
- no timed pressure

### Cognitive Accessibility Rules

- one idea per sentence
- one task per screen
- same primary button position every time
- no need to remember previous screens
- back always available
- confirmation for destructive actions

### Visual Rules

- high contrast
- large type
- sparse layout
- limited color system
- stable spacing
- no card walls in the wizard

## Copy Rules

- target sixth-grade readability when possible
- use simple verbs
- avoid jargon
- repeat the same term for the same concept
- keep headlines functional
- avoid hype
- avoid brand poetry in the wizard

## Analytics Model

Track:

- wizard started
- intent selected
- step completed
- step abandoned
- back used
- proof opened
- contact selected
- archive opened from next-step screen
- resume used

## Testing Blueprint

### Automated

- route stability
- no horizontal overflow
- keyboard path coverage
- progress updates
- save/resume behavior
- link visibility and action safety

### Manual

- screen reader checks
- keyboard-only walkthrough
- 200 to 400 percent zoom
- reduced motion
- high contrast
- one-handed phone use

### User Testing

- older adults
- users with cognitive limitations
- low-literacy users
- first-time recruiters

## Implementation Phases

### Phase 1: Define

Deliver:

- final step map
- final copy deck
- proof taxonomy
- acceptance criteria

### Phase 2: Build Skeleton

Deliver:

- wizard shell
- progress model
- save/resume
- minimal appendix access

### Phase 3: Connect Evidence

Deliver:

- intent packs
- evidence cards
- references
- proof links

### Phase 4: Accessibility Hardening

Deliver:

- keyboard polish
- screen-reader labels
- error prevention
- focus management

### Phase 5: Validation

Deliver:

- user test findings
- revised copy
- revised step order if needed

### Phase 6: Production Launch

Deliver:

- stable release
- analytics dashboard
- support checklist

## Highest ROI Build Order

1. Welcome
2. Intent
3. Fit Summary
4. Credibility
5. Outcomes
6. Strongest Proof
7. References
8. Next Step
9. Save/Resume
10. Appendix routing

## Definition Of Done

The overhaul is ready when:

- the main path is fully linear
- each screen is understandable in under five seconds
- a first-time user can complete it on mobile
- the archive no longer acts as the homepage behavior
- the flow supports back, resume, and completion
- accessibility checks pass
- real users can finish without confusion

