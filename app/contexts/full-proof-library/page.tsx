import type { Metadata } from 'next';

import { buildContextMetadata, renderContextPage } from '../contextPageShared';

type FullProofLibraryPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = buildContextMetadata('full-proof-library');

export default async function FullProofLibraryPage({ searchParams }: FullProofLibraryPageProps) {
  return renderContextPage('full-proof-library', searchParams);
}
