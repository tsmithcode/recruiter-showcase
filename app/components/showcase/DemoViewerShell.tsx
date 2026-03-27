'use client';

import { useState } from 'react';
import Image from 'next/image';

import {
  type DemoFramePolicy,
  type DemoStory,
  type DemoViewportMode,
} from '@/lib/demoStories';
import { recordRecruiterEvent } from '@/lib/telemetry';

import RecruiterLink from './RecruiterLink';

type DemoViewerShellProps = {
  story: DemoStory;
};

const modeConfig: Record<
  DemoViewportMode,
  { label: string; maxWidth: string; aspectRatio: string }
> = {
  web: {
    label: 'Web',
    maxWidth: '100%',
    aspectRatio: '16 / 10',
  },
  'mobile-portrait': {
    label: 'Mobile Portrait',
    maxWidth: '25rem',
    aspectRatio: '9 / 16',
  },
  'mobile-landscape': {
    label: 'Mobile Landscape',
    maxWidth: '44rem',
    aspectRatio: '16 / 9',
  },
};

function frameStatusLabel(framePolicy: DemoFramePolicy) {
  switch (framePolicy) {
    case 'frameable':
      return 'Inline view available';
    case 'protected':
      return 'Protected product';
    case 'blocked':
      return 'Inline view blocked';
    default:
      return 'Live product';
  }
}

export default function DemoViewerShell({ story }: DemoViewerShellProps) {
  const [mode, setMode] = useState<DemoViewportMode>('web');
  const config = modeConfig[mode];

  return (
    <section className="showcase-panel-strong demo-viewer-shell">
      <div className="demo-viewer-toolbar">
        <div className="space-y-2">
          <p className="showcase-eyebrow">Live product viewer</p>
          <p className="text-sm leading-7 text-slate-300">
            Stay in the portfolio flow when the source app allows framing. If it does not, the same
            shell explains what the product proves and lets the reviewer open it directly.
          </p>
        </div>
        <div
          className="app-mobile-stack-rail items-stretch sm:justify-end"
          data-rail-layout="wrap"
          role="tablist"
          aria-label="Demo viewport modes"
        >
          {story.frameModes.map((option) => {
            const isActive = option === mode;
            return (
              <button
                key={option}
                type="button"
                className={`demo-viewer-mode app-touch-target ${
                  isActive ? 'demo-viewer-mode-active' : ''
                }`}
                aria-pressed={isActive}
                onClick={() => {
                  setMode(option);
                  recordRecruiterEvent('demo_viewport_mode_changed', {
                    demo: story.slug,
                    mode: option,
                  });
                }}
              >
                {modeConfig[option].label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="demo-viewer-stage-shell">
        <div className="demo-viewer-stage-meta">
          <span className="showcase-chip">{frameStatusLabel(story.framePolicy)}</span>
          <span className="showcase-chip">{story.brandLabel}</span>
          <span className="showcase-chip">{config.label} mode</span>
        </div>

        <div
          className="demo-viewer-stage"
          data-frame-policy={story.framePolicy}
          style={{ maxWidth: config.maxWidth, aspectRatio: config.aspectRatio }}
        >
          {story.framePolicy === 'frameable' ? (
            <iframe
              src={story.liveUrl}
              title={`${story.productName} live product`}
              className="demo-viewer-iframe"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="demo-viewer-fallback">
              <div className="space-y-3">
                <p className="showcase-eyebrow">Preview shell</p>
                <h3 className="text-3xl font-semibold tracking-[-0.05em] text-white">
                  {story.fallbackPreviewLabel}
                </h3>
                <p className="text-base leading-7 text-slate-300">{story.principalClaim}</p>
              </div>

              <div className="demo-viewer-fallback-image">
                <Image
                  src={story.previewImage}
                  alt={story.previewAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {story.whatItProves.slice(0, 2).map((item) => (
                  <div key={item} className="showcase-panel-subtle bg-white/[0.05]">
                    <p className="text-sm leading-7 text-slate-200">{item}</p>
                  </div>
                ))}
              </div>

              <div className="showcase-panel-subtle bg-white/[0.04]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Why inline view is unavailable
                </p>
                <p className="mt-3 text-base leading-7 text-slate-300">
                  {story.framePolicy === 'protected'
                    ? 'This source product is intentionally gated or protected, so the portfolio keeps the shell calm and lets the reviewer launch it directly.'
                    : 'This source product blocks cross-origin framing through browser security policy, so the portfolio uses a premium fallback instead of a broken embed.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <RecruiterLink
          href={story.liveUrl}
          target="_blank"
          rel="noreferrer"
          eventName="demo_live_product_opened"
          eventPayload={{ demo: story.slug, source: 'viewer_shell' }}
          className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
        >
          {story.launchCtaLabel}
        </RecruiterLink>
        <RecruiterLink
          href={story.relatedContextHref}
          eventName="demo_related_proof_opened"
          eventPayload={{ demo: story.slug, source: 'viewer_shell' }}
          className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
        >
          Open related context
        </RecruiterLink>
      </div>
    </section>
  );
}
