# Storyblok Work Split

```mermaid
flowchart TB
    A[Codex CLI via API] --> A1[Create and update block schema]
    A --> A2[Seed page and component templates]
    A --> A3[Upsert stories from structured seed payloads]
    A --> A4[Patch fields at scale]
    A --> A5[Validate slug, references, and nested blocks]

    B[Manual editor work] --> B1[Choose story angle]
    B --> B2[Edit headline, deck, and captions]
    B --> B3[Order spreads]
    B --> B4[Pick strongest proof]
    B --> B5[Review tone and clarity]
    B --> B6[Approve and publish]
```

## Storyblok Best Use

Storyblok is best when the manual editor is shaping page composition and copy inside a visual editorial workflow.

## Codex Responsibilities

- schema creation
- migration scripts
- seeded story creation
- repeatable bulk patching
- validation of nested block structure

## Manual Responsibilities

- narrative judgment
- image choice
- headline quality
- deciding what proof matters most
- final publishing judgment
