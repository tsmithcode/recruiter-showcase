# Sanity Work Split

```mermaid
flowchart TB
    A[Codex CLI via API] --> A1[Create schema types]
    A --> A2[Create seed datasets and documents]
    A --> A3[Create references and cross-links]
    A --> A4[Build previews and query mappings]
    A --> A5[Automate migrations]

    B[Manual editor work] --> B1[Create story documents]
    B --> B2[Write spread copy]
    B --> B3[Curate proof references]
    B --> B4[Edit metadata and publishing state]
    B --> B5[Review final order and tone]
```

## Sanity Best Use

Sanity is best when the system is content-model-driven and the team values structured content scale, API leverage, and free-tier headroom more than drag-and-drop editorial feel.

## Codex Responsibilities

- schema generation
- query design
- preview integration
- migrations
- dataset seeding

## Manual Responsibilities

- story curation
- copy editing
- proof selection
- publication review
