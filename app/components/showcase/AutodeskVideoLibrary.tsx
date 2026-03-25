'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

import { chronologyGroups, getVideoChronology } from '@/lib/controlCenter';
import { VideoArtifact } from '@/lib/portfolioContent';
import { recordRecruiterEvent } from '@/lib/telemetry';

import ArtifactBadge from './ArtifactBadge';
import RecruiterLink from './RecruiterLink';

type AutodeskVideoLibraryProps = {
  videos: VideoArtifact[];
};

const allTagLabel = 'All tags';
const allErasLabel = 'All eras';

export default function AutodeskVideoLibrary({ videos }: AutodeskVideoLibraryProps) {
  const [selectedId, setSelectedId] = useState(videos[0]?.id ?? '');
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState(allTagLabel);
  const [activeEra, setActiveEra] = useState(allErasLabel);

  const tags = useMemo(() => {
    const uniqueTags = new Set<string>();
    videos.forEach((video) => {
      video.stackTags.forEach((tag) => uniqueTags.add(tag));
    });

    return [allTagLabel, ...Array.from(uniqueTags)];
  }, [videos]);

  const filtered = useMemo(() => {
    return videos.filter((video) => {
      const chronology = getVideoChronology(video);
      const matchesQuery =
        !query ||
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.businessContext.toLowerCase().includes(query.toLowerCase()) ||
        chronology.searchSynonyms.some((term) => term.toLowerCase().includes(query.toLowerCase()));
      const matchesTag = activeTag === allTagLabel || video.stackTags.includes(activeTag);
      const matchesEra =
        activeEra === allErasLabel || chronology.chronologyGroup === activeEra;
      return matchesQuery && matchesTag && matchesEra;
    });
  }, [activeEra, activeTag, query, videos]);

  const selected =
    filtered.find((video) => video.id === selectedId) ??
    videos.find((video) => video.id === selectedId) ??
    filtered[0] ??
    videos[0];

  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-[1.9rem] border border-white/10 bg-black">
            {selected ? (
              <iframe
                src={`${selected.videoUrl.replace('watch?v=', 'embed/')}?autoplay=0&start=0`}
                title={selected.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="h-full w-full"
              />
            ) : null}
          </div>

          {selected ? (
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex flex-wrap gap-2">
                <ArtifactBadge kind="video" />
                <span className="showcase-chip">{getVideoChronology(selected).chronologyGroup}</span>
                {getVideoChronology(selected).yearHint ? (
                  <span className="showcase-chip">{getVideoChronology(selected).yearHint}</span>
                ) : null}
                {selected.stackTags.map((tag) => (
                  <span key={tag} className="showcase-chip">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white">{selected.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{selected.businessContext}</p>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-100">
                {selected.whatItProves}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <RecruiterLink
                  href={selected.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  eventName="autodesk_video_opened"
                  eventPayload={{ video: selected.id, source: 'player' }}
                  className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
                >
                  Open on YouTube
                </RecruiterLink>
                {selected.relatedArtifacts.map((artifact) => (
                  <RecruiterLink
                    key={artifact.href}
                    href={artifact.href}
                    eventName="autodesk_related_proof_opened"
                    eventPayload={{ video: selected.id, href: artifact.href }}
                    className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
                  >
                    {artifact.label}
                  </RecruiterLink>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="rounded-[1.9rem] border border-white/10 bg-[#091120]/85 p-5">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search Autodesk and CAD proof..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-teal-300 focus:outline-none"
            />

            <div className="flex flex-wrap gap-2">
              {[allErasLabel, ...chronologyGroups].map((era) => (
                <button
                  key={era}
                  type="button"
                  onClick={() => setActiveEra(era)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                    activeEra === era
                      ? 'bg-cyan-200 text-slate-950'
                      : 'border border-white/10 bg-white/[0.04] text-slate-300 hover:border-teal-300 hover:text-white'
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                    activeTag === tag
                      ? 'bg-white text-slate-950'
                      : 'border border-white/10 bg-white/[0.04] text-slate-300 hover:border-teal-300 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="grid gap-3">
              {filtered.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(video.id);
                    recordRecruiterEvent('autodesk_video_selected', { video: video.id });
                  }}
                  className={`grid gap-3 rounded-[1.4rem] border p-3 text-left transition sm:grid-cols-[132px_1fr] ${
                    selected?.id === video.id
                      ? 'border-teal-300 bg-white/[0.08]'
                      : 'border-white/10 bg-white/[0.03] hover:border-teal-300/70'
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden rounded-[1rem] border border-white/10 bg-slate-950">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      unoptimized
                      sizes="132px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <ArtifactBadge kind="video" compact />
                      <span className="showcase-chip">{getVideoChronology(video).chronologyGroup}</span>
                    </div>
                    <h4 className="text-base font-semibold text-white">{video.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{video.whatItProves}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-500">
                      {video.domain}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
