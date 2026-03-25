import { ProofArtifact } from '@/lib/showcaseContent';

import ArtifactBadge from './ArtifactBadge';
import RecruiterLink from './RecruiterLink';

type ProofLibraryProps = {
  artifacts: ProofArtifact[];
};

export default function ProofLibrary({ artifacts }: ProofLibraryProps) {
  return (
    <div className="grid gap-4">
      {artifacts.map((artifact) => (
        <div
          key={artifact.id}
          className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-[140px_1fr_auto] sm:items-center"
        >
          <div className="flex flex-wrap gap-2">
            <ArtifactBadge
              kind={
                artifact.type === 'demo'
                  ? 'demo'
                  : artifact.type === 'video'
                    ? 'video'
                    : artifact.type === 'diagram'
                      ? 'diagram'
                      : 'case-study'
              }
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-white">{artifact.title}</h3>
            <p className="text-sm leading-6 text-slate-300">{artifact.summary}</p>
          </div>
          <RecruiterLink
            href={artifact.href}
            target={artifact.href.startsWith('http') ? '_blank' : undefined}
            rel={artifact.href.startsWith('http') ? 'noreferrer' : undefined}
            eventName="proof_artifact_opened"
            eventPayload={{ artifactId: artifact.id, type: artifact.type }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-200 transition hover:text-white"
          >
            {artifact.context}
            <span aria-hidden="true">↗</span>
          </RecruiterLink>
        </div>
      ))}
    </div>
  );
}
