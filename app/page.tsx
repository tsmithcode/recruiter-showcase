import type { Metadata } from 'next';

import HomeWizard from '@/components/HomeWizard';
import { getHomepageIssue } from '@/lib/homepageIssue';

export const metadata: Metadata = {
  title: 'Thomas Smith | Editorial proof issue',
  description:
    'A single-path editorial proof experience that walks recruiters and buyers through role, systems scope, flagship evidence, trust notes, and the cleanest next step.',
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const issue = await getHomepageIssue();

  return <HomeWizard issue={issue} />;
}
