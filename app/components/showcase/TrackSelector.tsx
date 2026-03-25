import { AudienceTrackContent } from '@/lib/showcaseContent';

import RecruiterLink from './RecruiterLink';

type TrackSelectorProps = {
  tracks: AudienceTrackContent[];
};

export default function TrackSelector({ tracks }: TrackSelectorProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {tracks.map((track) => (
        <article
          key={track.slug}
          className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(5,12,24,0.28)] backdrop-blur"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(94,234,212,0.14),transparent_40%)] opacity-80 transition duration-300 group-hover:opacity-100" />
          <div className="relative space-y-6">
            <div className="space-y-2">
              <p className="showcase-eyebrow">{track.eyebrow}</p>
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                {track.label}
              </h3>
              <p className="max-w-xl text-sm leading-7 text-slate-300">{track.summary}</p>
            </div>

            <p className="max-w-xl text-sm font-medium leading-7 text-white/90">
              {track.recruiterQuestion}
            </p>

            <ul className="grid gap-2 text-sm text-slate-300">
              {track.focusAreas.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <RecruiterLink
              href={track.ctaHref}
              eventName={track.ctaEvent}
              eventPayload={{ track: track.slug }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-200 transition hover:text-white"
            >
              {track.ctaLabel}
              <span aria-hidden="true">↗</span>
            </RecruiterLink>
          </div>
        </article>
      ))}
    </div>
  );
}
