import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import SimpleCaseStudyPage from '@/components/SimpleCaseStudyPage';
import { caseStudies, getCaseStudy } from '@/lib/showcaseContent';

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return {};
  }

  return {
    title: `${caseStudy.title} | Thomas Smith`,
    description: caseStudy.summary,
    alternates: {
      canonical: `/case-studies/${caseStudy.slug}`,
    },
    openGraph: {
      title: `${caseStudy.title} | Thomas Smith`,
      description: caseStudy.summary,
      url: `/case-studies/${caseStudy.slug}`,
      images: [
        {
          url: caseStudy.image,
          alt: caseStudy.title,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return <SimpleCaseStudyPage caseStudy={caseStudy} />;
}
