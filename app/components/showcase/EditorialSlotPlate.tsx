'use client';

import Link from 'next/link';

import type { EditorialSlotRecord } from '@/lib/editorialSlots';

type EditorialSlotPlateProps = {
  slot: EditorialSlotRecord;
  compact?: boolean;
};

function statusLabel(status: EditorialSlotRecord['status']) {
  switch (status) {
    case 'live':
      return 'Live';
    case 'ready':
      return 'Ready';
    default:
      return 'Placeholder';
  }
}

export default function EditorialSlotPlate({ slot, compact = false }: EditorialSlotPlateProps) {
  const surfaceClass =
    slot.surface === 'dark'
      ? 'border-white/10 bg-[#091120] text-white shadow-[0_24px_90px_rgba(5,12,24,0.28)]'
      : 'border-slate-300 bg-[#f8f5ef] text-slate-950 shadow-[0_18px_60px_rgba(15,23,42,0.06)]';

  const chipClass =
    slot.surface === 'dark'
      ? 'border-white/10 bg-white/5 text-slate-200'
      : 'border-slate-300 bg-white text-slate-700';

  const captionClass = slot.surface === 'dark' ? 'text-slate-300' : 'text-slate-600';
  const labelClass = slot.surface === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <article
      className={`rounded-[1.6rem] border p-5 ${compact ? 'p-4' : 'p-5 sm:p-6'} ${surfaceClass}`}
      style={{ aspectRatio: slot.aspectRatio }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${labelClass}`}>
            {slot.label}
          </p>
          <h3 className={`${compact ? 'text-lg' : 'text-2xl'} font-semibold tracking-[-0.04em]`}>
            {slot.title}
          </h3>
        </div>
        <span className={`rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${chipClass}`}>
          {statusLabel(slot.status)}
        </span>
      </div>

      <p className={`mt-4 ${compact ? 'text-sm' : 'text-base'} leading-7 ${captionClass}`}>
        {slot.questionAnswered}
      </p>
      <p className={`mt-3 ${compact ? 'text-sm' : 'text-base'} leading-7 ${captionClass}`}>
        {slot.primaryClaim}
      </p>

      <div className="mt-6 grid gap-3">
        <div className="flex items-center gap-3">
          {slot.nodes.map((node, index) => (
            <div key={node.label} className="flex min-w-0 flex-1 items-center gap-3">
              <div className={`min-w-0 rounded-full border px-3 py-2 ${chipClass}`}>
                <p className="truncate text-xs font-semibold uppercase tracking-[0.18em]">{node.label}</p>
              </div>
              {index < slot.nodes.length - 1 ? <div className={`h-px flex-1 ${slot.surface === 'dark' ? 'bg-white/10' : 'bg-slate-300'}`} aria-hidden="true" /> : null}
            </div>
          ))}
        </div>

        {slot.nodes.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-3">
            {slot.nodes.map((node) => (
              <div
                key={`${slot.id}-${node.label}`}
                className={`rounded-[1.15rem] border px-4 py-3 ${chipClass}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">{node.label}</p>
                {node.detail ? <p className={`mt-2 text-sm leading-6 ${captionClass}`}>{node.detail}</p> : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {slot.ctaHref && slot.ctaLabel ? (
        <div className="mt-5">
          <Link
            href={slot.ctaHref}
            className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition ${
              slot.surface === 'dark'
                ? 'border-white/15 text-white hover:border-teal-300 hover:text-teal-200'
                : 'border-slate-300 text-slate-950 hover:border-slate-500'
            }`}
          >
            {slot.ctaLabel}
          </Link>
        </div>
      ) : null}

      <p className={`mt-4 text-xs leading-6 ${labelClass}`}>{slot.caption}</p>
    </article>
  );
}
