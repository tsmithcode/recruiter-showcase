'use client';

import {
  createContext,
  ReactNode,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowTopRightOnSquareIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

import {
  buildContextHref,
  getContextLabel,
  isPhaseId,
  isRoleLens,
  SearchDocument,
  SearchScope,
} from '@/lib/controlCenter';
import type { PortfolioContextSlug } from '@/lib/portfolioContent';
import { recordRecruiterEvent } from '@/lib/telemetry';
import { getSearchDocuments } from '@/lib/searchIndex';
import ModalShell from '@/components/ui/ModalShell';

import ArtifactBadge from './ArtifactBadge';

type SearchOpenOptions = {
  query?: string;
  scope?: SearchScope;
};

type SearchUIContextValue = {
  openSearch: (options?: SearchOpenOptions) => void;
};

const SearchUIContext = createContext<SearchUIContextValue | null>(null);

function getCurrentContext(pathname: string): PortfolioContextSlug | undefined {
  const match = pathname.match(/^\/contexts\/([^/?#]+)/);
  if (!match) {
    return undefined;
  }

  return match[1] as PortfolioContextSlug;
}

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function scoreDocument(
  doc: SearchDocument,
  query: string,
  currentContext?: PortfolioContextSlug,
  currentLens?: string,
  currentPhase?: string,
  scope: SearchScope = 'global'
) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    let baseline = doc.priority;
    if (currentContext && doc.contexts.includes(currentContext)) baseline += 120;
    return baseline;
  }

  const title = normalize(doc.title);
  const summary = normalize(doc.summary);
  const keywordText = normalize(doc.keywords.join(' '));
  let score = 0;

  if (title === normalizedQuery) score += 350;
  if (title.startsWith(normalizedQuery)) score += 220;
  if (title.includes(normalizedQuery)) score += 180;
  if (keywordText.includes(normalizedQuery)) score += 135;
  if (summary.includes(normalizedQuery)) score += 80;

  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);
  queryTokens.forEach((token) => {
    if (title.includes(token)) score += 45;
    if (keywordText.includes(token)) score += 35;
    if (summary.includes(token)) score += 15;
  });

  if (currentContext && doc.contexts.includes(currentContext)) score += 90;
  if (scope === 'context' && currentContext && !doc.contexts.includes(currentContext)) score -= 500;
  if (currentLens && doc.lensTags.includes(currentLens as never)) score += 22;
  if (currentPhase && doc.phaseTags.includes(currentPhase as never)) score += 18;

  return score + doc.priority;
}

export function useSearchUI() {
  const value = useContext(SearchUIContext);

  if (!value) {
    throw new Error('useSearchUI must be used within SearchUIProvider');
  }

  return value;
}

export default function SearchUIProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [pathname, setPathname] = useState('/');
  const [searchParamsString, setSearchParamsString] = useState('');
  const searchParams = useMemo(() => new URLSearchParams(searchParamsString), [searchParamsString]);
  const currentContext = getCurrentContext(pathname);
  const currentLens = searchParams.get('lens');
  const currentPhase = searchParams.get('phase');
  const docs = useMemo(() => getSearchDocuments(), []);

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<SearchScope>(currentContext ? 'context' : 'global');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setScope(currentContext ? 'context' : 'global');
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentContext]);

  useEffect(() => {
    const shouldOpen = searchParams.get('openSearch') === '1';

    if (!shouldOpen) {
      return;
    }

    setQuery(searchParams.get('searchQuery') ?? '');
    setScope(searchParams.get('searchScope') === 'global' ? 'global' : currentContext ? 'context' : 'global');
    setIsOpen(true);

    const next = new URLSearchParams(searchParams.toString());
    next.delete('openSearch');
    router.replace(next.toString() ? `${pathname}?${next.toString()}` : pathname, { scroll: false });
  }, [currentContext, pathname, router, searchParams]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setSelectedId(null);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const orderedResults = useMemo(() => {
    return docs
      .map((doc) => ({
        doc,
        score: scoreDocument(doc, query, currentContext, currentLens ?? undefined, currentPhase ?? undefined, scope),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.doc)
      .slice(0, 24);
  }, [currentContext, currentLens, currentPhase, docs, query, scope]);

  useEffect(() => {
    if (!orderedResults.length) {
      setSelectedId(null);
      return;
    }

    if (!selectedId || !orderedResults.some((doc) => doc.id === selectedId)) {
      setSelectedId(orderedResults[0].id);
    }
  }, [orderedResults, selectedId]);

  const selected = orderedResults.find((doc) => doc.id === selectedId) ?? null;
  const groupedResults = useMemo(() => {
    const inContext = currentContext
      ? orderedResults.filter((doc) => doc.contexts.includes(currentContext))
      : [];
    const outside = currentContext
      ? orderedResults.filter((doc) => !doc.contexts.includes(currentContext))
      : orderedResults;

    return {
      inContext,
      outside,
    };
  }, [currentContext, orderedResults]);

  function openSearch(options?: SearchOpenOptions) {
    setQuery(options?.query ?? '');
    setScope(options?.scope ?? (currentContext ? 'context' : 'global'));
    setIsOpen(true);
  }

  function buildDestination(doc: SearchDocument) {
    if (!doc.href.startsWith('/')) {
      return doc.href;
    }

    const [rawPath, rawHash] = doc.href.split('#');
    const path = rawPath || pathname;
    const destinationParams = new URLSearchParams();
    const sourceContext = currentContext;
    const sourceLens = isRoleLens(currentLens) ? currentLens : undefined;
    const sourcePhase = isPhaseId(currentPhase) ? currentPhase : undefined;

    if (sourceContext) destinationParams.set('fromContext', sourceContext);
    if (sourceLens) destinationParams.set('fromLens', sourceLens);
    if (sourcePhase) destinationParams.set('fromPhase', sourcePhase);
    if (query) destinationParams.set('fromQuery', query);
    destinationParams.set('fromScope', scope);

    if (doc.primaryContext !== 'site' && path.startsWith('/contexts/')) {
      if (doc.lensTags[0]) {
        const destinationLens: SearchDocument['lensTags'][number] = doc.lensTags.includes('business')
          ? 'business'
          : doc.lensTags[0];
        destinationParams.set('lens', destinationLens);
      }
      if (doc.phaseTags[0]) {
        destinationParams.set('phase', doc.phaseTags[0]);
      }
    }

    const destination = destinationParams.toString() ? `${path}?${destinationParams.toString()}` : path;
    return rawHash || doc.anchor ? `${destination}#${rawHash ?? doc.anchor}` : destination;
  }

  function handleGo(doc: SearchDocument) {
    recordRecruiterEvent('search_result_opened', {
      id: doc.id,
      kind: doc.kind,
      scope,
      currentContext: currentContext ?? 'site',
    });

    if (!doc.href.startsWith('/')) {
      window.open(doc.href, '_blank', 'noopener,noreferrer');
      setIsOpen(false);
      return;
    }

    router.push(buildDestination(doc), { scroll: true });
    setIsOpen(false);
  }

  const rawFromContext = searchParams.get('fromContext');
  const rawFromLens = searchParams.get('fromLens');
  const rawFromPhase = searchParams.get('fromPhase');
  const returnHref =
    rawFromContext && query
      ? buildContextHref(
          rawFromContext as PortfolioContextSlug,
          isRoleLens(rawFromLens) ? rawFromLens : 'business',
          isPhaseId(rawFromPhase) ? rawFromPhase : 'overview',
          {
            openSearch: '1',
            searchQuery: searchParams.get('fromQuery') ?? undefined,
            searchScope: searchParams.get('fromScope') ?? undefined,
          }
        )
      : null;

  return (
    <SearchUIContext.Provider value={{ openSearch }}>
      <Suspense fallback={null}>
        <SearchLocationSync
          setPathname={setPathname}
          setSearchParamsString={setSearchParamsString}
        />
      </Suspense>
      {children}

      {isOpen ? (
        <ModalShell
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            setSelectedId(null);
          }}
          className="items-start py-8"
          panelClassName="control-panel w-full max-w-6xl rounded-[2rem]"
        >
          <div className="max-h-[88vh] overflow-hidden">
            <div className="border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="showcase-eyebrow">Command Search</p>
                  <p className="mt-2 text-sm text-slate-300">
                    {currentContext
                      ? `Searching ${getContextLabel(currentContext)} by default. Expand only if you need to leave the discussion.`
                      : 'Search the full portfolio, then preview before you jump.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedId(null);
                  }}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-white/20 hover:text-white"
                  aria-label="Close search"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_auto] xl:items-center">
                <label className="relative block">
                  <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={
                      currentContext
                        ? `Search ${getContextLabel(currentContext)} roles, systems, proof, and sections...`
                        : 'Search contexts, case studies, diagrams, videos, PDFs, and external branches...'
                    }
                    className="w-full rounded-full border border-white/10 bg-white/[0.04] px-12 py-4 text-base text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
                    autoFocus
                  />
                </label>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setScope(currentContext ? 'context' : 'global')}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                      scope === 'context'
                        ? 'bg-white text-slate-950'
                        : 'border border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:text-white'
                    }`}
                    disabled={!currentContext}
                  >
                    Current Context
                  </button>
                  <button
                    type="button"
                    onClick={() => setScope('global')}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                      scope === 'global'
                        ? 'bg-white text-slate-950'
                        : 'border border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    Entire Site
                  </button>
                </div>
              </div>
            </div>

            <div className="grid max-h-[calc(88vh-9rem)] gap-0 xl:grid-cols-[0.92fr_1.08fr]">
              <div className="overflow-y-auto overscroll-contain border-b border-white/10 xl:border-b-0 xl:border-r">
                <ResultGroup
                  title={currentContext ? `Inside ${getContextLabel(currentContext)}` : 'Results'}
                  docs={groupedResults.inContext}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  emptyMessage={currentContext ? 'No in-context matches yet.' : 'No matches yet.'}
                />
                {currentContext ? (
                  <ResultGroup
                    title="Outside Current Context"
                    docs={scope === 'global' ? groupedResults.outside : []}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    emptyMessage="Expand to entire site to inspect outside-context results."
                  />
                ) : null}
              </div>

              <div className="overflow-y-auto overscroll-contain p-5 sm:p-6">
                {selected ? (
                  <div className="space-y-5">
                    <div className="flex flex-wrap gap-2">
                      <ArtifactBadge kind={selected.kind} />
                      {selected.primaryContext !== 'site' ? (
                        <span className="showcase-chip">{getContextLabel(selected.primaryContext)}</span>
                      ) : null}
                      {selected.phaseTags[0] ? (
                        <span className="showcase-chip">{selected.phaseTags[0].replace(/-/g, ' ')}</span>
                      ) : null}
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">
                        {selected.title}
                      </h2>
                      <p className="max-w-2xl text-sm leading-7 text-slate-300">
                        {selected.summary}
                      </p>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Why it matched</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selected.keywords.slice(0, 8).map((keyword) => (
                          <span key={keyword} className="showcase-chip">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleGo(selected)}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
                      >
                        Go there
                      </button>
                      {scope === 'global' && currentContext ? (
                        <button
                          type="button"
                          onClick={() => {
                            setScope('context');
                            setSelectedId(null);
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
                        >
                          Stay in current context
                        </button>
                      ) : null}
                      {scope === 'context' ? (
                        <button
                          type="button"
                          onClick={() => setScope('global')}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
                        >
                          Expand to entire site
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => setSelectedId(null)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:text-white"
                      >
                        Back to results
                      </button>
                    </div>

                    {selected.href.startsWith('http') ? (
                      <Link
                        href={selected.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-white"
                      >
                        External destination
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                ) : (
                  <div className="flex h-full min-h-[16rem] items-center justify-center rounded-[1.6rem] border border-dashed border-white/10 bg-white/[0.02] px-6 text-center text-sm leading-7 text-slate-400">
                    Select a result to preview where it lands, what kind of artifact it is, and how to get back.
                  </div>
                )}

                {returnHref ? (
                  <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#0b1428] p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Return trail</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      You can reopen the prior scoped search exactly where it started.
                    </p>
                    <Link
                      href={returnHref}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-white"
                    >
                      Back to previous search
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </ModalShell>
      ) : null}
    </SearchUIContext.Provider>
  );
}

function SearchLocationSync({
  setPathname,
  setSearchParamsString,
}: {
  setPathname: (pathname: string) => void;
  setSearchParamsString: (searchParamsString: string) => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setPathname(pathname);
    setSearchParamsString(searchParams.toString());
  }, [pathname, searchParams, setPathname, setSearchParamsString]);

  return null;
}

function ResultGroup({
  title,
  docs,
  selectedId,
  onSelect,
  emptyMessage,
}: {
  title: string;
  docs: SearchDocument[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  emptyMessage: string;
}) {
  return (
    <section className="p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">{title}</h3>
        <span className="text-xs text-slate-500">{docs.length}</span>
      </div>

      <div className="grid gap-3">
        {docs.length ? (
          docs.map((doc) => (
            <button
              key={doc.id}
              type="button"
              onClick={() => onSelect(doc.id)}
              className={`rounded-[1.35rem] border p-4 text-left transition ${
                selectedId === doc.id
                  ? 'border-cyan-300/80 bg-cyan-400/8'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <ArtifactBadge kind={doc.kind} compact />
                {doc.primaryContext !== 'site' ? (
                  <span className="showcase-chip">{getContextLabel(doc.primaryContext)}</span>
                ) : null}
              </div>
              <h4 className="mt-3 text-base font-semibold text-white">{doc.title}</h4>
              <p className="mt-1 text-sm leading-6 text-slate-300">{doc.summary}</p>
            </button>
          ))
        ) : (
          <div className="rounded-[1.35rem] border border-dashed border-white/10 bg-white/[0.02] p-4 text-sm leading-6 text-slate-500">
            {emptyMessage}
          </div>
        )}
      </div>
    </section>
  );
}
