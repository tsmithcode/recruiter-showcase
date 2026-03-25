import Link from 'next/link';
import Image from 'next/image';

import RecruiterLink from '@/components/showcase/RecruiterLink';
import SearchTriggerButton from '@/components/showcase/SearchTriggerButton';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#06101d]/80 backdrop-blur-xl">
      <div className="showcase-shell flex items-center justify-between gap-4 py-3.5">
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
            <span className="block truncate text-[0.98rem] font-semibold tracking-[-0.03em] text-white">
              Thomas Smith
            </span>
            <span className="block truncate text-sm text-slate-400">
              Principal B2B Engineering Showcase
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-5 text-sm text-slate-300 lg:flex">
          <Link href="/contexts/qts-suwanee" className="transition hover:text-white">
            QTS
          </Link>
          <Link href="/contexts/autodesk-cad" className="transition hover:text-white">
            Autodesk
          </Link>
          <Link href="/contexts/openai" className="transition hover:text-white">
            OpenAI
          </Link>
          <Link href="/cpq-demo" className="transition hover:text-white">
            CPQ Proof
          </Link>
          <Link href="/contexts/full-proof-library" className="transition hover:text-white">
            Library
          </Link>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <SearchTriggerButton className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-white" />

          <RecruiterLink
            href="mailto:job@tsmithcode.ai?subject=Principal%20Engineering%20Conversation"
            eventName="contact_clicked"
            eventPayload={{ source: 'navbar' }}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
          >
            Contact
          </RecruiterLink>
        </div>
      </div>
    </nav>
  );
}
