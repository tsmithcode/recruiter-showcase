import type { Metadata } from 'next';

import { buildContextMetadata, renderContextPage } from '../contextPageShared';

type OpenAiContextPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = buildContextMetadata('openai');

export default async function OpenAiContextPage({ searchParams }: OpenAiContextPageProps) {
  return renderContextPage('openai', searchParams);
}
