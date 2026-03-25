import type { Metadata } from 'next';

import { buildContextMetadata, renderContextPage } from '../contextPageShared';

type QtsSuwaneePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = buildContextMetadata('qts-suwanee');

export default async function QtsSuwaneePage({ searchParams }: QtsSuwaneePageProps) {
  return renderContextPage('qts-suwanee', searchParams);
}
