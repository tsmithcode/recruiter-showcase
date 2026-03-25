'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowsPointingOutIcon, XMarkIcon } from '@heroicons/react/24/outline';

type ZoomableImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  imageClassName?: string;
  containerClassName?: string;
  overlayClassName?: string;
  hintLabel?: string;
};

export default function ZoomableImage({
  src,
  alt,
  sizes,
  priority = false,
  imageClassName = 'object-cover',
  containerClassName,
  overlayClassName,
  hintLabel = 'View full size',
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group relative block h-full w-full text-left ${containerClassName ?? ''}`}
        aria-label={`Open full-size image: ${alt}`}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={imageClassName} />
        <span
          className={`pointer-events-none absolute inset-x-3 bottom-3 inline-flex items-center justify-between gap-2 rounded-full border border-white/10 bg-[#06101d]/78 px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate-100 opacity-0 shadow-[0_20px_60px_rgba(2,8,22,0.45)] backdrop-blur transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${overlayClassName ?? ''}`}
        >
          {hintLabel}
          <ArrowsPointingOutIcon className="h-4 w-4" />
        </span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#020816]/92 p-4 backdrop-blur-xl sm:p-6">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 cursor-zoom-out"
            aria-label="Close image viewer"
          />
          <div className="relative z-10 flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#06101d]/96 shadow-[0_40px_140px_rgba(2,8,22,0.65)]">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Image viewer</p>
                <p className="mt-1 truncate text-sm text-slate-200">{alt}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-white/20 hover:text-white"
                aria-label="Close image viewer"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="relative min-h-[52vh] flex-1 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_35%)]">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
