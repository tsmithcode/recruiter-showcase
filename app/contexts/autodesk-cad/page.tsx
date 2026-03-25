import type { Metadata } from 'next';

import { buildContextMetadata, renderContextPage } from '../contextPageShared';

type AutodeskCadPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = buildContextMetadata('autodesk-cad');

export default async function AutodeskCadPage({ searchParams }: AutodeskCadPageProps) {
  return renderContextPage('autodesk-cad', searchParams);
}
