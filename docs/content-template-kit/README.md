# Content Template Kit

This folder defines the reusable content system for the current magazine-style recruiter showcase.

It is designed so you can:

- add an unlimited number of stories without inventing new template families
- understand what `Codex CLI` should automate through API or MCP
- understand what a human editor should still do manually
- compare `Storyblok` and `Sanity` as implementation backends for the same template system

## Recommended Reusable Template Families

### Page Templates

- `Editorial Issue Page`
- `Track Page`
- `Context Page`
- `Case Study Page`
- `Proof Library Page`
- `Artifact Detail Page`

### Component Templates

- `Cover Spread`
- `Role Definition Spread`
- `System Scope Spread`
- `Flagship Proof Spread`
- `Outcomes Spread`
- `Method Spread`
- `Trust Spread`
- `Decision / CTA Spread`
- `Proof Artifact`
- `Media Asset`
- `CTA Block`
- `Reference Link`
- `Trust Item`
- `Video Proof Card`
- `Diagram Proof Card`
- `Quote / Testimonial Card`
- `Timeline / Chronology Module`
- `Metrics Snapshot`

## Difficulty Scale

- `1` = trivial
- `2` = easy
- `3` = moderate
- `4` = hard
- `5` = complex

## Output Value Scale

- `1` = low leverage
- `2` = useful
- `3` = important
- `4` = high leverage
- `5` = core system value

## Storyblok Difficulty Table

| Template | Type | Storyblok Difficulty | Output Value | Why |
|---|---|---:|---:|---|
| Editorial Issue Page | Page | 3 | 5 | Strong fit for block-based editorial sequencing |
| Track Page | Page | 3 | 4 | Mostly proof reordering and audience framing |
| Context Page | Page | 4 | 4 | Richer supporting proof and domain-specific sections |
| Case Study Page | Page | 4 | 5 | Larger structured proof narrative with many sections |
| Proof Library Page | Page | 4 | 4 | Requires listing, filtering, and consistent artifact modeling |
| Artifact Detail Page | Page | 3 | 3 | Narrow proof wrapper around one artifact |
| Cover Spread | Component | 2 | 5 | Editorial entry point; easy structurally, high value |
| Role Definition Spread | Component | 2 | 4 | Reusable across issues with light copy variance |
| System Scope Spread | Component | 2 | 4 | Simple structure with strong narrative value |
| Flagship Proof Spread | Component | 3 | 5 | Depends on clean `Proof Artifact` linkage |
| Outcomes Spread | Component | 2 | 4 | Simple, reusable, and highly legible |
| Method Spread | Component | 2 | 4 | Repeatable and low complexity |
| Trust Spread | Component | 3 | 5 | Depends on trust items, references, and freshness |
| Decision / CTA Spread | Component | 2 | 4 | Easy structure; important for conversion |
| Proof Artifact | Object | 4 | 5 | Core reusable content object feeding many pages |
| Media Asset | Object | 4 | 4 | Harder because asset behavior and metadata matter |
| CTA Block | Object | 2 | 4 | Simple object with strong reuse |
| Reference Link | Object | 1 | 3 | Very small but widely reused |
| Trust Item | Object | 1 | 3 | Very small but widely reused |
| Video Proof Card | Component | 3 | 4 | Depends on proof and media consistency |
| Diagram Proof Card | Component | 2 | 3 | Structurally simple |
| Quote / Testimonial Card | Component | 2 | 3 | Easy structure if quotes exist |
| Timeline / Chronology Module | Component | 3 | 4 | Strong for Autodesk/history-heavy proof |
| Metrics Snapshot | Component | 2 | 4 | Easy format with high recruiter value |

## Sanity Difficulty Table

| Template | Type | Sanity Difficulty | Output Value | Why |
|---|---|---:|---:|---|
| Editorial Issue Page | Page | 4 | 5 | Strong content model fit, but less visual/editorial by default |
| Track Page | Page | 3 | 4 | Good as a structured document with references |
| Context Page | Page | 4 | 4 | Good model fit, but more schema-first work |
| Case Study Page | Page | 4 | 5 | Excellent structured content fit |
| Proof Library Page | Page | 3 | 4 | Strong query-driven listing model |
| Artifact Detail Page | Page | 3 | 3 | Straightforward document pattern |
| Cover Spread | Component | 3 | 5 | Better as a custom object than a visual block |
| Role Definition Spread | Component | 2 | 4 | Easy object schema |
| System Scope Spread | Component | 2 | 4 | Easy object schema |
| Flagship Proof Spread | Component | 3 | 5 | Excellent reference-driven content modeling |
| Outcomes Spread | Component | 2 | 4 | Easy object schema |
| Method Spread | Component | 2 | 4 | Easy object schema |
| Trust Spread | Component | 3 | 5 | Good structure, slightly more setup |
| Decision / CTA Spread | Component | 2 | 4 | Easy object schema |
| Proof Artifact | Object | 3 | 5 | Sanity is very strong here |
| Media Asset | Object | 3 | 4 | Good asset/document model |
| CTA Block | Object | 2 | 4 | Simple object |
| Reference Link | Object | 1 | 3 | Very simple object |
| Trust Item | Object | 1 | 3 | Very simple object |
| Video Proof Card | Component | 3 | 4 | Good fit as referenced object set |
| Diagram Proof Card | Component | 2 | 3 | Straightforward |
| Quote / Testimonial Card | Component | 2 | 3 | Straightforward |
| Timeline / Chronology Module | Component | 3 | 4 | Good array/object fit |
| Metrics Snapshot | Component | 2 | 4 | Easy structured object |

## Practical Recommendation

- `Storyblok` is better when the main problem is editorial page composition with low ops.
- `Sanity` is better when the main problem is structured content scale, free-tier longevity, and API-driven operations.
- The reusable template kit should stay CMS-agnostic: same template families, different implementation backend.

## Diagram Files

- [01-e2e-story-loop.md](/Users/cadguardianllc/Documents/GitHub/recruiter-showcase/docs/content-template-kit/01-e2e-story-loop.md)
- [02-page-template-map.md](/Users/cadguardianllc/Documents/GitHub/recruiter-showcase/docs/content-template-kit/02-page-template-map.md)
- [03-component-template-map.md](/Users/cadguardianllc/Documents/GitHub/recruiter-showcase/docs/content-template-kit/03-component-template-map.md)
- [04-storyblok-work-split.md](/Users/cadguardianllc/Documents/GitHub/recruiter-showcase/docs/content-template-kit/04-storyblok-work-split.md)
- [05-sanity-work-split.md](/Users/cadguardianllc/Documents/GitHub/recruiter-showcase/docs/content-template-kit/05-sanity-work-split.md)
- [06-scale-with-unlimited-stories.md](/Users/cadguardianllc/Documents/GitHub/recruiter-showcase/docs/content-template-kit/06-scale-with-unlimited-stories.md)
- [07-expected-story-inventory.md](/Users/cadguardianllc/Documents/GitHub/recruiter-showcase/docs/content-template-kit/07-expected-story-inventory.md)
