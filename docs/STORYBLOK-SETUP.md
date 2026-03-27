# Storyblok Setup

This project now supports a CMS-backed homepage issue through the adapter in [`app/lib/homepageIssue.ts`](/Users/cadguardianllc/Documents/GitHub/recruiter-showcase/app/lib/homepageIssue.ts).

Important: the wider CMS architecture is still not finalized. The app currently relies on local, CMS-shaped persistent data and a thin adapter layer so the front end stays stable while the Storyblok vs Sanity decision remains open.

## Goal

Use Storyblok as the source of truth for the single-path editorial homepage without forcing the site to break when CMS data is missing.

Current behavior:

- if `STORYBLOK_PREVIEW_TOKEN` is set, the homepage tries to load the configured Storyblok story
- if the Storyblok story is missing or malformed, the site falls back to the local issue definition
- the homepage remains stable in both modes

## Environment Variables

Add these to `.env.local`:

```bash
STORYBLOK_PREVIEW_TOKEN=your_storyblok_preview_token
STORYBLOK_HOMEPAGE_ISSUE_SLUG=homepage-issue
```

`STORYBLOK_HOMEPAGE_ISSUE_SLUG` should match the story slug in Storyblok.

## Required Storyblok Components

Create the following Storyblok components using the blueprints in [`storyblok/components`](/Users/cadguardianllc/Documents/GitHub/recruiter-showcase/storyblok/components):

- `issue_page`
- `issue_spread`
- `proof_artifact`
- `media_asset`
- `cta_block`
- `reference_link`
- `trust_item`
- `trust_block`

The homepage adapter currently reads these top-level `issue_page` fields:

- `title`
- `issueLabel`
- `ctaBlockTitle`
- `proofArtifact`
- `trustBlock`
- `spreads`

Each spread item should use these field names:

- `id`
- `sequence`
- `kicker`
- `headline`
- `deck`
- `primary_claim`
- `emotional_target`
- `caption`
- `placeholder_status`
- `publish_readiness`
- `highlights`
- `actions`
- `references`
- `trustItems`

## Seed The First Homepage Issue

Use [`storyblok/seed/homepage-issue.json`](/Users/cadguardianllc/Documents/GitHub/recruiter-showcase/storyblok/seed/homepage-issue.json) as the first story payload.

Recommended Storyblok story settings:

- Name: `Homepage Issue`
- Slug: `homepage-issue`
- Content type: `issue_page`

The seed file mirrors the current local fallback issue, so switching from fallback to CMS should not change the homepage narrative unexpectedly.

## Important Implementation Notes

- The adapter maps Storyblok spreads by `id`, and valid ids are:
  - `cover`
  - `role`
  - `system`
  - `proof`
  - `outcomes`
  - `method`
  - `trust`
  - `next`
- Unknown or missing spread values fall back to the local issue definition.
- Storyblok can now control spread-level actions, references, and trust items when those blocks are present.
- Missing or malformed action/reference/trust-item blocks still fall back to the local issue so the homepage remains stable.

## Recommended Next Extension

After this setup is live, the next CMS improvements should be:

1. Add image and video rendering from `media_asset` entries instead of placeholder-only editorial panels.
2. Expand `proofArtifact` and `trustBlock` so linked media and richer nested fields are rendered directly from Storyblok.
3. Add preview-safe validation so unpublished or malformed CMS entries are surfaced clearly in development.
