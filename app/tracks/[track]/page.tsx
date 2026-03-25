import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import TrackPageTemplate from '@/components/showcase/TrackPageTemplate';
import {
  audienceTracks,
  getCaseStudiesForTrack,
  getProofForTrack,
  isAudienceTrack,
  systemMap,
} from '@/lib/showcaseContent';

type TrackPageProps = {
  params: Promise<{
    track: string;
  }>;
};

export async function generateStaticParams() {
  return Object.keys(audienceTracks).map((track) => ({ track }));
}

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const { track } = await params;

  if (!isAudienceTrack(track)) {
    return {};
  }

  const content = audienceTracks[track];

  return {
    title: `${content.label} | Thomas Smith`,
    description: content.summary,
    alternates: {
      canonical: `/tracks/${track}`,
    },
    openGraph: {
      title: `${content.label} | Thomas Smith`,
      description: content.summary,
      url: `/tracks/${track}`,
    },
  };
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { track } = await params;

  if (!isAudienceTrack(track)) {
    notFound();
  }

  return (
    <TrackPageTemplate
      track={track}
      content={audienceTracks[track]}
      caseStudies={getCaseStudiesForTrack(track)}
      proofArtifacts={getProofForTrack(track)}
      systemsMap={systemMap}
    />
  );
}
