import type { Metadata } from 'next';
import Script from 'next/script';
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import SearchUIProvider from '@/components/showcase/SearchUIProvider';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tsmithcode.ai'),
  title: 'Thomas Smith | Principal B2B Engineering Showcase',
  description:
    'Principal-level B2B engineering showcase for Thomas Smith, focused on workflow systems, operational tooling, integration-heavy software, and recruiter-ready technical proof.',
  keywords: [
    'Thomas Smith',
    'Principal Software Engineer',
    'B2B Engineering',
    'Workflow Systems',
    'Internal Tools',
    'CAD Automation',
    'OpenAI recruiter showcase',
    'Construction platform engineering',
  ],
  authors: [{ name: 'Thomas Smith', url: 'https://tsmithcode.ai' }],
  creator: 'Thomas Smith',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Thomas Smith | Principal B2B Engineering Showcase',
    description:
      'A recruiter-ready showcase of workflow systems, case studies, and technical proof spanning B2B platforms and construction-adjacent operations.',
    url: 'https://tsmithcode.ai',
    siteName: 'TSmithCode.ai',
    images: [
      {
        url: '/images/tsmithcode-dark.png',
        width: 1200,
        height: 630,
        alt: 'TSmithCode.ai',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thomas Smith | Principal B2B Engineering Showcase',
    description:
      'Principal-level proof for workflow systems, integration-heavy tooling, and operator software.',
    images: ['/images/tsmithcode-dark.png'],
    site: '@tsmithcode',
    creator: '@tsmithcode',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Thomas Smith',
    url: 'https://tsmithcode.ai',
    sameAs: [
      'https://github.com/tsmithcode',
      'https://www.youtube.com/@tsmithcad',
      'https://www.linkedin.com/in/tsmithcad/',
    ],
    jobTitle: 'Principal Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'TSmithCode.ai',
    },
    description:
      'Thomas Smith builds B2B workflow systems, operational tooling, and integration-heavy software across engineering and platform contexts.',
  };

  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${plexMono.variable} antialiased`}>
        <Script id="person-ld-json" type="application/ld+json">
          {JSON.stringify(personSchema)}
        </Script>
        <Analytics />
        <SpeedInsights />
        <SearchUIProvider>
          <a href="#main-content" className="app-skip-link">
            Skip to main content
          </a>
          <div className="app-maintenance-banner" role="status" aria-live="polite">
            <p className="app-maintenance-banner__eyebrow">
              <span className="app-maintenance-banner__pulse" aria-hidden="true" />
              Live build — 7-day sprint in progress
            </p>
            <p className="app-maintenance-banner__body">
              This site is being built live. Thomas is running a self-imposed 7-day sprint to prove he can onboard, ship, and scale across 6 client workstreams simultaneously — the same pressure a principal engineer faces on day one. Rough edges are intentional evidence, not bugs.
            </p>
          </div>
          <Navbar />
          {children}
        </SearchUIProvider>
      </body>
    </html>
  );
}
