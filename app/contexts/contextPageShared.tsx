import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import SimpleContextStoryPage from '@/components/SimpleContextStoryPage';
import { getContextMetadata } from '@/components/showcase/PortfolioContextPage';
import { getPortfolioContext, PortfolioContextSlug } from '@/lib/portfolioContent';

type SearchParamsInput =
  | Promise<Record<string, string | string[] | undefined>>
  | Record<string, string | string[] | undefined>
  | undefined;

export function buildContextMetadata(slug: PortfolioContextSlug): Metadata {
  const contextMetadata = getContextMetadata(slug);

  if (!contextMetadata) {
    return {};
  }

  return {
    title: contextMetadata.title,
    description: contextMetadata.description,
    alternates: {
      canonical: `/contexts/${slug}`,
    },
    openGraph: {
      title: contextMetadata.title,
      description: contextMetadata.description,
      url: `/contexts/${slug}`,
      images: [
        {
          url: contextMetadata.openGraphImage,
          alt: contextMetadata.title,
        },
      ],
    },
  };
}

export async function renderContextPage(
  slug: PortfolioContextSlug,
  searchParams?: SearchParamsInput
) {
  const context = getPortfolioContext(slug);

  if (!context) {
    notFound();
  }

  const resolvedSearchParams =
    searchParams && 'then' in searchParams ? await searchParams : (searchParams ?? {});

  void resolvedSearchParams;

  return <SimpleContextStoryPage context={context} />;
}
