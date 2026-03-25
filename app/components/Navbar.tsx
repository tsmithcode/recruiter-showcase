'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import RecruiterLink from '@/components/showcase/RecruiterLink';
import SearchTriggerButton from '@/components/showcase/SearchTriggerButton';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = [
    { href: '/contexts/qts-suwanee', label: 'QTS' },
    { href: '/contexts/autodesk-cad', label: 'Autodesk' },
    { href: '/contexts/openai', label: 'OpenAI' },
    { href: '/cpq-demo', label: 'CPQ Proof' },
    { href: '/contexts/full-proof-library', label: 'Library' },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#06101d]/78 backdrop-blur-2xl">
      <div className="showcase-shell flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
            <Image
              src="/images/avatar.png"
              alt="Thomas Smith"
              width={48}
              height={48}
              className="rounded-full"
              priority
            />
          </div>

          <div className="min-w-0">
            <span className="block truncate text-[0.98rem] font-semibold tracking-[-0.035em] text-white">
              Thomas Smith
            </span>
            <span className="block truncate text-sm text-slate-400">
              Principal B2B Engineering Showcase
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-5 text-sm text-slate-300 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <SearchTriggerButton className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-white" />

          <RecruiterLink
            href="mailto:job@tsmithcode.ai?subject=Principal%20Engineering%20Conversation"
            eventName="contact_clicked"
            eventPayload={{ source: 'navbar' }}
            className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200 sm:inline-flex"
          >
            Contact
          </RecruiterLink>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-cyan-300 hover:text-white lg:hidden"
          >
            {mobileMenuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-white/10 lg:hidden">
          <div className="showcase-shell space-y-3 py-4">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-[1.15rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <RecruiterLink
              href="mailto:job@tsmithcode.ai?subject=Principal%20Engineering%20Conversation"
              eventName="contact_clicked"
              eventPayload={{ source: 'navbar_mobile_menu' }}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
            >
              Contact
            </RecruiterLink>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
