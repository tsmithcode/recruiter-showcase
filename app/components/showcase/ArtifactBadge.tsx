'use client';

import { artifactChipSpecs, ArtifactKind } from '@/lib/controlCenter';

type ArtifactBadgeProps = {
  kind: ArtifactKind;
  compact?: boolean;
};

export default function ArtifactBadge({ kind, compact = false }: ArtifactBadgeProps) {
  const spec = artifactChipSpecs[kind];
  const Icon = spec.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${spec.tone} ${
        compact ? 'text-[0.62rem]' : ''
      }`}
    >
      <Icon className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      {spec.label}
    </span>
  );
}
