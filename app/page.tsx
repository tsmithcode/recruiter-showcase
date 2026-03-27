import type { Metadata } from 'next';

import HomeWizard from '@/components/HomeWizard';

export const metadata: Metadata = {
  title: 'Thomas Smith | Guided proof wizard',
  description:
    'A single-path recruiter proof experience that keeps one task on screen at a time and routes visitors to the right proof page with minimal cognitive load.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HomeWizard />;
}
