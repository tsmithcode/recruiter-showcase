# TSmithCode.ai — Recruiter Showcase

**Live site:** [https://tsmithcode.ai](https://tsmithcode.ai) · **Contact:** [job@tsmithcode.ai](mailto:job@tsmithcode.ai)

---

## What This Is

A principal-level engineering showcase built to give recruiters and hiring managers everything they need in one guided proof experience — no portfolio hunting, no ambiguity.

The site is built and maintained live by Thomas Smith as a single-operator production system. What you see being built is the proof.

---

## 7-Day Live Build Sprint

Thomas is currently running a self-imposed 7-day sprint to prove he can onboard, ship, and operate across **6 client-scale workstreams simultaneously** — the same pressure a principal engineer faces on day one at a fast-moving company.

This is not a toy exercise. Each product is a real deployed application with distinct audiences, personas, and technical requirements.

**The 7 live products being maintained at once:**

| # | Product | URL | What It Proves |
|---|---------|-----|----------------|
| 1 | **TSmithCode.ai** (this site) | [tsmithcode.ai](https://tsmithcode.ai) | Editorial proof flow, CMS architecture, guided UX |
| 2 | **aJam** | [4chord.vercel.app](https://4chord.vercel.app) | Product restraint, guided onboarding, calm first-run UX |
| 3 | **Monyawn** | [monyawn.vercel.app](https://monyawn.vercel.app) | Governed lifecycle workflow, enterprise ops, human review gates |
| 4 | **Million Dollar .NET Snippets** | [mds-mu-six.vercel.app/about](https://mds-mu-six.vercel.app/about) | Framework positioning, Autodesk/ERP credibility, founder-level depth |
| 5 | **GVO SMiTH** | [gvo-smith.vercel.app](https://gvo-smith.vercel.app) | Creator commerce, owned audience, unified brand + payment systems |
| 6 | **Cadence Ops** | [efficiency-dashboard.onrender.com](https://efficiency-dashboard.onrender.com) | Role-aware operations intelligence, supervisor/exec visibility |
| 7 | **Special Build Studio** | [special-build-plastic-belts.onrender.com](https://special-build-plastic-belts.onrender.com) | Focused manufacturing support, operator workflow clarity |

Rough edges during this sprint are intentional evidence of real-world operating pressure — not broken product. The goal is controlled delivery under chaos, not polished demos in a vacuum.

---

## Stack

- **Next.js 15** (App Router, SSG + ISR)
- **Tailwind CSS**
- **Vercel** (auto-deploy from `main`)
- **Storyblok** (CMS adapter, fallback-safe)
- **Vercel Analytics + Speed Insights**

---

## Architecture

```
app/
  lib/
    homepageIssue.ts     # CMS adapter — Storyblok with local fallback
    editorialSlots.ts    # Diagram/proof/trust plate registry
    demoStories.ts       # 6 demo product data
  components/
    HomeWizard.tsx       # 8-spread guided homepage proof flow
    showcase/
      EditorialSlotPlate.tsx   # Reusable editorial diagram plate
      DemoStoryPage.tsx        # Demo product story wrapper
storyblok/
  components/            # Storyblok schema blueprints
  seed/                  # Homepage issue seed payload
docs/
  FRONTEND-OVERHAUL-BLUEPRINT.md
  STORYBLOK-SETUP.md
  site-spec.md
```

---

## CMS Setup

The homepage is CMS-backed with a Storyblok fallback. It runs without a CMS token — local data takes over gracefully.

To connect Storyblok:

```bash
cp .env.example .env.local
# then set:
STORYBLOK_PREVIEW_TOKEN=your_token
STORYBLOK_HOMEPAGE_ISSUE_SLUG=homepage-issue
```

Full setup: [`docs/STORYBLOK-SETUP.md`](docs/STORYBLOK-SETUP.md)

---

## Local Dev

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build + sitemap
```

---

## Positioning

Thomas Smith is a principal-level B2B systems builder. The goal of this site is not to show breadth — it is to show the same operating discipline appearing repeatedly across different domains: workflow systems, operator tooling, integration-heavy software, and evidence packaging that non-technical reviewers can trust quickly.

**Target roles:** Principal Engineer, Staff Engineer, Platform Lead, Founding Engineer at product-led companies working in B2B, enterprise, or workflow-adjacent problems.
