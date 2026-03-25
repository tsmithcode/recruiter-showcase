import type { Metadata } from 'next';

import { buildContextMetadata, renderContextPage } from '../contextPageShared';

type CreativeAiPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = buildContextMetadata('creative-ai');

export default async function CreativeAiPage({ searchParams }: CreativeAiPageProps) {
  return renderContextPage('creative-ai', searchParams);
}
