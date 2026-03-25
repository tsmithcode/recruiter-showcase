import type { Metadata } from 'next';

import { buildContextMetadata, renderContextPage } from '../contextPageShared';

type ProductSystemsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = buildContextMetadata('product-systems');

export default async function ProductSystemsPage({ searchParams }: ProductSystemsPageProps) {
  return renderContextPage('product-systems', searchParams);
}
