import {
  cadGuardianBranch,
  chronologyGroups,
  contextSearchSynonyms,
  getVideoChronology,
  resumeArtifact,
  RoleLens,
  SearchDocument,
} from './controlCenter';
import {
  autodeskVideoArtifacts,
  portfolioContexts,
  qtsDiagramSpecs,
  qtsFirstThirtyDays,
  qtsGovernanceCapabilities,
  qtsLifecycleMappings,
  qtsResponsibilities,
} from './portfolioContent';
import { caseStudies, proofArtifacts } from './showcaseContent';

const allLenses: RoleLens[] = ['business', 'delivery', 'architecture', 'technical'];

export function getSearchDocuments(): SearchDocument[] {
  const docs: SearchDocument[] = [];

  portfolioContexts.forEach((context) => {
    docs.push({
      id: `context-${context.slug}`,
      title: context.title,
      kind: 'context-page',
      primaryContext: context.slug,
      contexts: [context.slug],
      lensTags: allLenses,
      phaseTags: ['overview'],
      keywords: [...contextSearchSynonyms[context.slug], context.title, context.audience],
      summary: context.summary,
      href: context.ctaHref,
      priority: 150,
    });
  });

  caseStudies.forEach((caseStudy) => {
    const contexts =
      caseStudy.relevanceTags.includes('construction')
        ? ['qts-suwanee', 'autodesk-cad', 'product-systems']
        : ['openai', 'product-systems'];

    docs.push({
      id: `case-${caseStudy.slug}`,
      title: caseStudy.title,
      kind: 'case-study',
      primaryContext: contexts[0] as SearchDocument['primaryContext'],
      contexts: contexts as SearchDocument['contexts'],
      lensTags: ['business', 'architecture', 'technical'],
      phaseTags: ['proof', 'deep-dive'],
      keywords: [
        caseStudy.domain,
        caseStudy.role,
        caseStudy.proofType,
        ...caseStudy.systemBoundaries,
        ...caseStudy.constraints,
        ...caseStudy.decisions,
      ],
      summary: caseStudy.summary,
      href: `/case-studies/${caseStudy.slug}`,
      priority: 135,
    });
  });

  proofArtifacts.forEach((artifact) => {
    const contexts =
      artifact.relevanceTags.includes('construction')
        ? ['qts-suwanee', 'autodesk-cad', 'product-systems']
        : ['openai', 'product-systems'];

    docs.push({
      id: `artifact-${artifact.id}`,
      title: artifact.title,
      kind:
        artifact.type === 'demo'
          ? 'demo'
          : artifact.type === 'video'
            ? 'video'
            : artifact.type === 'diagram'
              ? 'diagram'
              : 'section',
      primaryContext: contexts[0] as SearchDocument['primaryContext'],
      contexts: contexts as SearchDocument['contexts'],
      lensTags: artifact.type === 'video' ? ['business', 'delivery'] : allLenses,
      phaseTags: artifact.type === 'demo' ? ['proof'] : ['proof', 'deep-dive'],
      keywords: [artifact.context, artifact.type],
      summary: artifact.summary,
      href: artifact.href,
      priority: artifact.type === 'demo' ? 120 : 105,
    });
  });

  autodeskVideoArtifacts.forEach((video) => {
    const chronology = getVideoChronology(video);
    docs.push({
      id: `video-${video.id}`,
      title: video.title,
      kind: 'video',
      primaryContext: video.domain === 'workflow' ? 'product-systems' : 'autodesk-cad',
      contexts:
        video.domain === 'workflow'
          ? ['autodesk-cad', 'product-systems', 'openai']
          : ['autodesk-cad', 'qts-suwanee', 'product-systems'],
      lensTags: ['business', 'delivery', 'architecture'],
      phaseTags: ['proof'],
      keywords: [
        video.domain,
        ...video.stackTags,
        ...chronology.searchSynonyms,
        chronology.chronologyGroup,
        video.businessContext,
      ],
      summary: `${video.whatItProves} ${chronology.yearHint ? `Archive signal: ${chronology.yearHint}.` : ''}`.trim(),
      href: '/contexts/autodesk-cad',
      anchor: `video-${video.id}`,
      priority: video.featured ? 118 : 98,
      chronologyGroup: chronology.chronologyGroup,
      yearHint: chronology.yearHint,
    });
  });

  chronologyGroups.forEach((group, index) => {
    docs.push({
      id: `autodesk-era-${group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      title: `${group} Autodesk Proof`,
      kind: 'section',
      primaryContext: 'autodesk-cad',
      contexts: ['autodesk-cad', 'qts-suwanee'],
      lensTags: ['business', 'delivery', 'architecture'],
      phaseTags: ['proof'],
      keywords: [group, 'autodesk', 'timeline', group === 'Foundation' ? '2017' : ''],
      summary:
        group === 'Foundation'
          ? 'Early Autodesk-era proof showing long-run depth before the current AI wave.'
          : `Autodesk chronology group: ${group}.`,
      href: '/contexts/autodesk-cad',
      anchor: `era-${group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      priority: 110 - index,
      chronologyGroup: group,
      yearHint: group === 'Foundation' ? '2017-era' : undefined,
    });
  });

  qtsResponsibilities.forEach((group) => {
    docs.push({
      id: `qts-responsibility-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      title: group.title,
      kind: 'diagram',
      primaryContext: 'qts-suwanee',
      contexts: ['qts-suwanee'],
      lensTags: ['business', 'architecture', 'technical'],
      phaseTags: ['systems'],
      keywords: [...group.items, 'responsibilities', 'trusted advisor', 'solution architect'],
      summary: group.items.join(' '),
      href: '/contexts/qts-suwanee',
      anchor: 'responsibilities-map',
      priority: 130,
    });
  });

  qtsGovernanceCapabilities.forEach((capability) => {
    docs.push({
      id: `qts-governance-${capability.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      title: capability.title,
      kind: 'diagram',
      primaryContext: 'qts-suwanee',
      contexts: ['qts-suwanee'],
      lensTags: ['business', 'architecture', 'technical'],
      phaseTags: ['systems'],
      keywords: [
        capability.businessNeed,
        capability.governanceConcern,
        capability.expectedOutcome,
        ...capability.systemsInvolved,
      ],
      summary: capability.businessNeed,
      href: '/contexts/qts-suwanee',
      anchor: 'governance-overlay',
      priority: 136,
    });
  });

  qtsLifecycleMappings.forEach((mapping) => {
    docs.push({
      id: `qts-lifecycle-${mapping.phase.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      title: `${mapping.phase} · ${mapping.accModule}`,
      kind: 'diagram',
      primaryContext: 'qts-suwanee',
      contexts: ['qts-suwanee'],
      lensTags: ['business', 'delivery', 'architecture', 'technical'],
      phaseTags: ['systems', 'proof'],
      keywords: [mapping.accModule, mapping.operationalGoal, ...mapping.roles, ...mapping.documents],
      summary: mapping.operationalGoal,
      href: '/contexts/qts-suwanee',
      anchor: 'lifecycle-map',
      priority: 142,
    });
  });

  qtsDiagramSpecs.forEach((diagram) => {
    docs.push({
      id: `qts-diagram-${diagram.id}`,
      title: diagram.title,
      kind: 'diagram',
      primaryContext: 'qts-suwanee',
      contexts: ['qts-suwanee'],
      lensTags: ['architecture', 'technical'],
      phaseTags: diagram.id === 'first-thirty-days-focus-map' ? ['deep-dive'] : ['systems'],
      keywords: [diagram.sourceContent, diagram.questionAnswered, diagram.layoutType],
      summary: diagram.questionAnswered,
      href: '/contexts/qts-suwanee',
      anchor:
        diagram.id === 'responsibilities-architecture-map'
          ? 'responsibilities-map'
          : diagram.id === 'integration-governance-overlay'
            ? 'governance-overlay'
            : diagram.id === 'construction-lifecycle-map'
              ? 'lifecycle-map'
              : 'first-30-days',
      priority: 128,
    });
  });

  qtsFirstThirtyDays.forEach((block) => {
    docs.push({
      id: `qts-thirty-${block.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      title: block.title,
      kind: 'section',
      primaryContext: 'qts-suwanee',
      contexts: ['qts-suwanee'],
      lensTags: ['delivery', 'architecture', 'technical'],
      phaseTags: ['deep-dive'],
      keywords: [...block.talkingPoints, block.summary],
      summary: block.summary,
      href: '/contexts/qts-suwanee',
      anchor: 'first-30-days',
      priority: 125,
    });
  });

  docs.push({
    id: 'resume-pdf',
    title: resumeArtifact.title,
    kind: resumeArtifact.kind,
    primaryContext: 'full-proof-library',
    contexts: ['qts-suwanee', 'openai', 'autodesk-cad', 'product-systems', 'full-proof-library'],
    lensTags: ['business', 'delivery'],
    phaseTags: ['proof', 'deep-dive'],
    keywords: ['resume', 'pdf', 'experience', 'career'],
    summary: resumeArtifact.summary,
    href: resumeArtifact.href,
    priority: 160,
  });

  docs.push({
    id: 'cad-guardian-branch',
    title: cadGuardianBranch.title,
    kind: cadGuardianBranch.kind,
    primaryContext: 'autodesk-cad',
    contexts: cadGuardianBranch.contexts,
    lensTags: ['business', 'delivery', 'architecture'],
    phaseTags: ['deep-dive'],
    keywords: ['cad guardian', 'llc', 'c2c', 'inventor', 'vault', 'governance', '.net modernization', 'cad integration'],
    summary: cadGuardianBranch.summary,
    href: cadGuardianBranch.href,
    priority: 120,
  });

  return docs;
}
