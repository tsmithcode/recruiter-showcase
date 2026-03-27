# E2E Story Loop

```mermaid
flowchart TD
    A[Choose story intent] --> B[Select page template family]
    B --> C[Create or reuse Proof Artifact records]
    C --> D[Attach Media Assets, References, Trust Items, CTAs]
    D --> E[Compose page-level narrative]
    E --> F[Review in CMS]
    F --> G[Preview in app]
    G --> H[Publish story]
    H --> I[Measure recruiter interaction]
    I --> J[Refine template, not one-off page logic]
    J --> A
```

## Loop Meaning

- Start with the story goal, not the page chrome.
- Reuse canonical proof objects first.
- Compose pages from reusable pieces.
- Improve the template system after each story instead of inventing one-off formats.
