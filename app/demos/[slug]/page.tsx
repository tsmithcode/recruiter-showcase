import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DemoStoryPage from '@/components/showcase/DemoStoryPage';
import { demoStories, getDemoStory } from '@/lib/demoStories';

type DemoPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return demoStories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getDemoStory(slug);

  if (!story) {
    return {};
  }

  return {
    title: `${story.productName} Demo Proof | Thomas Smith`,
    description: story.oneLineValueProp,
    alternates: {
      canonical: `/demos/${story.slug}`,
    },
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  const story = getDemoStory(slug);

  if (!story) {
    notFound();
  }

  return <DemoStoryPage story={story} />;
}
