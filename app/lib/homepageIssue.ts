export type HomepageAction = {
  label: string;
  href?: string;
  nextStepId?: HomepageSpreadId;
  style?: 'primary' | 'secondary';
};

export type HomepageReference = {
  label: string;
  href: string;
  note?: string;
};

export type HomepageTrustItem = {
  label: string;
  value: string;
};

export type HomepagePlaceholderStatus =
  | 'complete'
  | 'hero_image_placeholder'
  | 'proof_screenshot_placeholder'
  | 'diagram_placeholder'
  | 'video_placeholder'
  | 'quote_placeholder'
  | 'trust_badge_placeholder';

export type HomepageSpreadId =
  | 'cover'
  | 'role'
  | 'system'
  | 'proof'
  | 'outcomes'
  | 'method'
  | 'trust'
  | 'next';

export type HomepageSpread = {
  id: HomepageSpreadId;
  sequence: number;
  kicker: string;
  headline: string;
  deck: string;
  primaryClaim: string;
  emotionalTarget: string;
  caption?: string;
  placeholderStatus: HomepagePlaceholderStatus;
  publishReadiness: 'draft' | 'ready';
  highlights?: string[];
  references?: HomepageReference[];
  trustItems?: HomepageTrustItem[];
  actions?: HomepageAction[];
};

export type ProofArtifact = {
  title: string;
  artifactType: 'case-study' | 'context-page' | 'video' | 'diagram' | 'pdf';
  summary: string;
  whatItProves: string;
  businessOutcome: string;
  sourceType: 'internal-route' | 'external-url' | 'document';
  sourceUrlOrPath: string;
  evidenceStrength: 'flagship' | 'supporting';
  date: string;
  audienceTags: string[];
  thumbnailMediaRef: string;
};

export type TrustBlock = {
  reviewedBy: string;
  lastUpdated: string;
  scopeNote: string;
  sourceCount: string;
};

export type HomepageIssue = {
  slug: string;
  title: string;
  issueLabel: string;
  ctaBlockTitle: string;
  proofArtifact: ProofArtifact;
  trustBlock: TrustBlock;
  spreads: HomepageSpread[];
  source: 'fallback' | 'storyblok';
};

const fallbackIssue: HomepageIssue = {
  slug: 'principal-systems-builder',
  title: 'Thomas Smith | Guided editorial proof review',
  issueLabel: 'Issue 01',
  ctaBlockTitle: 'Choose the cleanest next step',
  source: 'fallback',
  proofArtifact: {
    title: 'Operator Search Platform',
    artifactType: 'case-study',
    summary:
      'A CAD archive was turned into a faster retrieval surface so operators could find the right drawing context without relying on tribal memory.',
    whatItProves:
      'The work combines systems thinking, product judgment, and operator empathy under real workflow pressure.',
    businessOutcome:
      'Reduced lookup friction, made encoded information scannable, and turned buried knowledge into repeatable operator flow.',
    sourceType: 'internal-route',
    sourceUrlOrPath: '/case-studies/operator-search-platform',
    evidenceStrength: 'flagship',
    date: '2026-03-26',
    audienceTags: ['recruiters', 'enterprise buyers', 'workflow leaders'],
    thumbnailMediaRef: 'proof_screenshot_placeholder',
  },
  trustBlock: {
    reviewedBy: 'Founder and internal expert panel',
    lastUpdated: 'March 26, 2026',
    scopeNote:
      'This homepage is the guided first pass. Case studies, context pages, videos, and documents remain available as secondary verification.',
    sourceCount: '5 linked proof surfaces',
  },
  spreads: [
    {
      id: 'cover',
      sequence: 1,
      kicker: 'Principal systems proof',
      headline: 'Complex operational work is only valuable if other people can trust it quickly.',
      deck:
        'This issue walks through one story path: the stakes, the builder, the systems scope, the strongest proof, and the cleanest next step.',
      primaryClaim:
        'The value here is not just code output. It is the ability to turn fragmented workflows into operator-ready systems people can trust.',
      emotionalTarget: 'Urgent, controlled, and high-confidence',
      caption:
        'The homepage is treated like an editorial cover: one claim, one direction, one path forward.',
      placeholderStatus: 'hero_image_placeholder',
      publishReadiness: 'draft',
      actions: [{ label: 'Start', nextStepId: 'role', style: 'primary' }],
    },
    {
      id: 'role',
      sequence: 2,
      kicker: 'Role definition',
      headline: 'Thomas Smith is a principal-level workflow and systems builder, not a loose collection of tools.',
      deck:
        'The strongest signal is role clarity: product thinking, systems ownership, and operator-facing execution under real business constraints.',
      primaryClaim:
        'This is principal-level scope expressed through workflow systems, internal tools, and evidence packaging.',
      emotionalTarget: 'Clarity and authority',
      caption:
        'One hard sentence is stronger than a long biography when the viewer needs to orient quickly.',
      placeholderStatus: 'complete',
      publishReadiness: 'ready',
      highlights: [
        'Builds workflow software that reduces operational drag.',
        'Turns encoded domain knowledge into usable operator tooling.',
        'Frames technical work in terms recruiters and buyers can verify.',
      ],
      actions: [{ label: 'See the system', nextStepId: 'system', style: 'primary' }],
    },
    {
      id: 'system',
      sequence: 3,
      kicker: 'System scope',
      headline: 'The work spans interface, business rules, retrieval, integration, and proof packaging.',
      deck:
        'The important signal is not one domain. It is repeatable ownership across workflow boundaries where speed, trust, and decision quality matter.',
      primaryClaim:
        'The system boundary includes operator UX, decision logic, information retrieval, and the trust surfaces needed for adoption.',
      emotionalTarget: 'Scale without chaos',
      caption:
        'This spread should eventually carry a system map or environment image, but the story already states the boundary clearly.',
      placeholderStatus: 'diagram_placeholder',
      publishReadiness: 'draft',
      highlights: [
        'Operator-facing tools that simplify high-friction workflows.',
        'Architecture choices that make business logic inspectable.',
        'Proof surfaces that help non-technical reviewers understand risk and value.',
      ],
      actions: [{ label: 'See the proof', nextStepId: 'proof', style: 'primary' }],
    },
    {
      id: 'proof',
      sequence: 4,
      kicker: 'Flagship proof',
      headline: 'Operator Search Platform',
      deck:
        'A dense CAD archive became a faster search surface so people could find what mattered without relying on tribal memory.',
      primaryClaim:
        'The flagship proof shows retrieval, product judgment, and operator trust working together inside one system.',
      emotionalTarget: 'Proof before persuasion',
      caption:
        'Placeholder status remains visible here on purpose so the team can replace it with a real screenshot, diagram, or short clip instead of forgetting it.',
      placeholderStatus: 'proof_screenshot_placeholder',
      publishReadiness: 'draft',
      highlights: [
        'What it proves: systems thinking translated into operator speed.',
        'Business outcome: less search friction and faster access to encoded information.',
        'Why it matters: the work makes hidden complexity usable.',
      ],
      actions: [
        {
          label: 'Open flagship proof',
          href: '/case-studies/operator-search-platform',
          style: 'secondary',
        },
        { label: 'See outcomes', nextStepId: 'outcomes', style: 'primary' },
      ],
    },
    {
      id: 'outcomes',
      sequence: 5,
      kicker: 'Outcomes',
      headline: 'The result is not more content. It is less confusion, faster retrieval, and clearer trust.',
      deck:
        'Outcome framing stays concrete: what changed for operators, how the system became easier to trust, and why the proof is worth a recruiter’s time.',
      primaryClaim:
        'The strongest outcome is reduced operational friction combined with higher reviewer confidence.',
      emotionalTarget: 'Relief and confidence',
      caption:
        'The language stays intentionally direct so the impact reads like a business result, not a portfolio boast.',
      placeholderStatus: 'complete',
      publishReadiness: 'ready',
      highlights: [
        'Reduced lookup friction in a dense technical archive.',
        'Made hidden business logic and encoded information easier to inspect.',
        'Improved first-pass trust for recruiters, buyers, and operators.',
      ],
      actions: [{ label: 'See the method', nextStepId: 'method', style: 'primary' }],
    },
    {
      id: 'method',
      sequence: 6,
      kicker: 'Method',
      headline: 'The method is consistent: understand the real user problem, expose the logic, and ship the clearest useful surface first.',
      deck:
        'This is where the team shows how complexity gets reduced without pretending the underlying systems are simple.',
      primaryClaim:
        'The work is shaped by product judgment and sequencing discipline, not just implementation speed.',
      emotionalTarget: 'Control under pressure',
      caption: 'Method should read like an operating discipline, not a generic process diagram.',
      placeholderStatus: 'complete',
      publishReadiness: 'ready',
      highlights: [
        'Start with the real operator pain.',
        'Make decision logic visible and reviewable.',
        'Ship the clearest trustworthy tool first.',
        'Keep deep evidence available but secondary.',
      ],
      actions: [{ label: 'See trust', nextStepId: 'trust', style: 'primary' }],
    },
    {
      id: 'trust',
      sequence: 7,
      kicker: 'Trust and references',
      headline: 'The homepage is the first pass. Verification stays one click away.',
      deck:
        'Trust increases when the story stays focused and the evidence stays accessible. This spread cools the visual temperature and raises factual density.',
      primaryClaim:
        'Credibility comes from clear sourcing, current references, and secondary proof routes that do not interrupt the main path.',
      emotionalTarget: 'Calm credibility',
      caption:
        'Trust blocks should always include freshness, scope, and where to verify the strongest claims.',
      placeholderStatus: 'trust_badge_placeholder',
      publishReadiness: 'draft',
      trustItems: [
        { label: 'Reviewed by', value: 'Founder and internal expert panel' },
        { label: 'Last updated', value: 'March 26, 2026' },
        { label: 'Source count', value: '5 linked proof surfaces' },
      ],
      references: [
        { label: 'Resume PDF', href: '/documents/thomas-smith-architect-resume-2026.pdf' },
        { label: 'OpenAI context page', href: '/contexts/openai' },
        { label: 'Full proof library', href: '/contexts/full-proof-library' },
      ],
      actions: [{ label: 'Choose next step', nextStepId: 'next', style: 'primary' }],
    },
    {
      id: 'next',
      sequence: 8,
      kicker: 'Decision spread',
      headline: 'If the proof is strong enough, the cleanest next move should be obvious.',
      deck:
        'The handoff stays decisive and low-friction: contact, resume, or deeper proof. No sales noise, no new branching, no last-minute clutter.',
      primaryClaim:
        'A strong closing spread makes the next action easier than wandering through the archive.',
      emotionalTarget: 'Decisive handoff',
      caption:
        'This is the final spread in the issue. The next step should feel earned, not pushed.',
      placeholderStatus: 'complete',
      publishReadiness: 'ready',
      actions: [
        {
          label: 'Contact Thomas Smith',
          href: 'mailto:job@tsmithcode.ai?subject=Editorial%20Proof%20Follow%20Up',
          style: 'primary',
        },
        {
          label: 'Open resume',
          href: '/documents/thomas-smith-architect-resume-2026.pdf',
          style: 'secondary',
        },
        {
          label: 'Open full proof library',
          href: '/contexts/full-proof-library',
          style: 'secondary',
        },
      ],
    },
  ],
};

function normalizeSpreadId(value: string | undefined): HomepageSpreadId | null {
  if (!value) {
    return null;
  }

  return fallbackIssue.spreads.some((spread) => spread.id === value)
    ? (value as HomepageSpreadId)
    : null;
}

type StoryblokStoryResponse = {
  story?: {
    content?: {
      issueLabel?: string;
      title?: string;
      ctaBlockTitle?: string;
      proofArtifact?: unknown;
      trustBlock?: unknown;
      spreads?: Array<Record<string, unknown>>;
    };
  };
};

function getBlockRecord(value: unknown): Record<string, unknown> | null {
  if (Array.isArray(value)) {
    const [first] = value;
    return first && typeof first === 'object' ? (first as Record<string, unknown>) : null;
  }

  return value && typeof value === 'object' ? (value as Record<string, unknown>) : null;
}

function getBlockArray(value: unknown): Array<Record<string, unknown>> {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'));
}

function parseAction(raw: Record<string, unknown>): HomepageAction | null {
  const label = typeof raw.label === 'string' ? raw.label : null;
  const href = typeof raw.href === 'string' && raw.href.length > 0 ? raw.href : undefined;
  const nextStepId = normalizeSpreadId(
    typeof raw.nextStepId === 'string' ? raw.nextStepId : undefined,
  );
  const style = raw.style === 'primary' || raw.style === 'secondary' ? raw.style : 'secondary';

  if (!label || (!href && !nextStepId)) {
    return null;
  }

  return {
    label,
    href,
    nextStepId: nextStepId ?? undefined,
    style,
  };
}

function parseReference(raw: Record<string, unknown>): HomepageReference | null {
  const label = typeof raw.label === 'string' ? raw.label : null;
  const href = typeof raw.href === 'string' ? raw.href : null;
  const note = typeof raw.note === 'string' ? raw.note : undefined;

  if (!label || !href) {
    return null;
  }

  return { label, href, note };
}

function parseTrustItem(raw: Record<string, unknown>): HomepageTrustItem | null {
  const label = typeof raw.label === 'string' ? raw.label : null;
  const value = typeof raw.value === 'string' ? raw.value : null;

  if (!label || !value) {
    return null;
  }

  return { label, value };
}

function mapStoryblokSpread(raw: Record<string, unknown>, index: number): HomepageSpread {
  const fallbackSpread = fallbackIssue.spreads[index] ?? fallbackIssue.spreads[fallbackIssue.spreads.length - 1];
  const id = normalizeSpreadId(typeof raw.id === 'string' ? raw.id : undefined) ?? fallbackSpread.id;
  const parsedActions = getBlockArray(raw.actions).map(parseAction).filter((item): item is HomepageAction => Boolean(item));
  const parsedReferences = getBlockArray(raw.references)
    .map(parseReference)
    .filter((item): item is HomepageReference => Boolean(item));
  const parsedTrustItems = getBlockArray(raw.trustItems)
    .map(parseTrustItem)
    .filter((item): item is HomepageTrustItem => Boolean(item));

  return {
    id,
    sequence: typeof raw.sequence === 'number' ? raw.sequence : fallbackSpread.sequence,
    kicker: typeof raw.kicker === 'string' ? raw.kicker : fallbackSpread.kicker,
    headline: typeof raw.headline === 'string' ? raw.headline : fallbackSpread.headline,
    deck: typeof raw.deck === 'string' ? raw.deck : fallbackSpread.deck,
    primaryClaim:
      typeof raw.primary_claim === 'string' ? raw.primary_claim : fallbackSpread.primaryClaim,
    emotionalTarget:
      typeof raw.emotional_target === 'string'
        ? raw.emotional_target
        : fallbackSpread.emotionalTarget,
    caption: typeof raw.caption === 'string' ? raw.caption : fallbackSpread.caption,
    placeholderStatus:
      typeof raw.placeholder_status === 'string'
        ? (raw.placeholder_status as HomepagePlaceholderStatus)
        : fallbackSpread.placeholderStatus,
    publishReadiness:
      raw.publish_readiness === 'ready' || raw.publish_readiness === 'draft'
        ? raw.publish_readiness
        : fallbackSpread.publishReadiness,
    highlights: Array.isArray(raw.highlights)
      ? raw.highlights.filter((item): item is string => typeof item === 'string')
      : fallbackSpread.highlights,
    references: parsedReferences.length > 0 ? parsedReferences : fallbackSpread.references,
    trustItems: parsedTrustItems.length > 0 ? parsedTrustItems : fallbackSpread.trustItems,
    actions: parsedActions.length > 0 ? parsedActions : fallbackSpread.actions,
  };
}

async function fetchStoryblokIssue(): Promise<HomepageIssue | null> {
  const token = process.env.STORYBLOK_PREVIEW_TOKEN;
  const slug = process.env.STORYBLOK_HOMEPAGE_ISSUE_SLUG ?? 'homepage-issue';

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/${slug}?version=draft&token=${token}`,
      { next: { revalidate: 300 } },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as StoryblokStoryResponse;
    const content = data.story?.content;

    if (!content?.spreads || !Array.isArray(content.spreads) || content.spreads.length === 0) {
      return null;
    }

    const proofArtifactRecord = getBlockRecord(content.proofArtifact);
    const trustBlockRecord = getBlockRecord(content.trustBlock);

    return {
      slug,
      title: typeof content.title === 'string' ? content.title : fallbackIssue.title,
      issueLabel:
        typeof content.issueLabel === 'string' ? content.issueLabel : fallbackIssue.issueLabel,
      ctaBlockTitle:
        typeof content.ctaBlockTitle === 'string'
          ? content.ctaBlockTitle
          : fallbackIssue.ctaBlockTitle,
      source: 'storyblok',
      proofArtifact: {
        ...fallbackIssue.proofArtifact,
        ...(proofArtifactRecord ?? {}),
      },
      trustBlock: {
        ...fallbackIssue.trustBlock,
        ...(trustBlockRecord ?? {}),
      },
      spreads: content.spreads.map((spread, index) => mapStoryblokSpread(spread, index)),
    };
  } catch {
    return null;
  }
}

export async function getHomepageIssue(): Promise<HomepageIssue> {
  const storyblokIssue = await fetchStoryblokIssue();
  return storyblokIssue ?? fallbackIssue;
}
