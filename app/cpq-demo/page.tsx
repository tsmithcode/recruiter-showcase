import type { Metadata } from 'next';

import SimpleCpqStoryPage from '@/components/SimpleCpqStoryPage';

export const metadata: Metadata = {
  title: 'CPQ Guided Proof | Thomas Smith',
  description:
    'A one-screen-at-a-time explanation of the CPQ decision workbench, built for calm enterprise review with minimal cognitive load.',
  alternates: {
    canonical: '/cpq-demo',
  },
};

export default function CPQPage() {
  return <SimpleCpqStoryPage />;
}
