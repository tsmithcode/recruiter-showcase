import { AudienceTrack, AudienceTrackContent, CaseStudy, ProofArtifact } from '@/lib/showcaseContent';

import CaseStudyCard from './CaseStudyCard';
import ProofLibrary from './ProofLibrary';
import RecruiterLink from './RecruiterLink';
import SectionHeading from './SectionHeading';
import SystemsMap from './SystemsMap';

type TrackPageTemplateProps = {
  track: AudienceTrack;
  content: AudienceTrackContent;
  caseStudies: CaseStudy[];
  proofArtifacts: ProofArtifact[];
  systemsMap: Array<{
    title: string;
    items: string[];
  }>;
};

const trackAccents: Record<AudienceTrack, string> = {
  openai: 'from-cyan-300/30 via-transparent to-violet-300/20',
  construction: 'from-emerald-300/25 via-transparent to-amber-300/20',
};

export default function TrackPageTemplate({
  track,
  content,
  caseStudies,
  proofArtifacts,
  systemsMap,
}: TrackPageTemplateProps) {
  return (
    <main className="pb-20">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className={`absolute inset-0 bg-gradient-to-br ${trackAccents[track]}`} />
        <div className="showcase-shell relative grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="space-y-8">
            <p className="showcase-eyebrow">{content.eyebrow}</p>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                {content.headline}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">{content.summary}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <RecruiterLink
                href="/documents/thomas-smith-architect-resume-2026.pdf"
                target="_blank"
                rel="noreferrer"
                eventName="resume_clicked"
                eventPayload={{ source: `${track}_track` }}
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
              >
                Open resume
              </RecruiterLink>
              <RecruiterLink
                href="mailto:job@tsmithcode.ai?subject=Principal%20Engineering%20Conversation"
                eventName="contact_clicked"
                eventPayload={{ source: `${track}_track` }}
                className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
              >
                Start a conversation
              </RecruiterLink>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#091120]/90 p-8 shadow-[0_24px_90px_rgba(5,12,24,0.34)] backdrop-blur">
            <p className="showcase-eyebrow">What this track is proving</p>
            <p className="mt-4 text-xl font-medium leading-8 text-white">{content.recruiterQuestion}</p>
            <ul className="mt-8 space-y-4 text-sm leading-7 text-slate-300">
              {content.focusAreas.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="showcase-shell space-y-10 py-16">
        <SectionHeading
          eyebrow="Systems map"
          title="The same core capability, reordered for this audience"
          description="The portfolio evidence is shared, but the proof ordering changes depending on whether the reader cares most about B2B product systems or construction workflow execution."
        />
        <SystemsMap lanes={systemsMap} />
      </section>

      <section className="showcase-shell space-y-8 py-8">
        <SectionHeading
          eyebrow="Flagship proof"
          title="Case studies prioritized for this track"
          description="Each case study is written as a principal-level proof narrative: business context, constraints, architecture, and outcomes."
        />
        <div>
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </section>

      <section className="showcase-shell space-y-8 py-16">
        <SectionHeading
          eyebrow="Supporting evidence"
          title="Additional artifacts ranked by relevance"
          description="These items extend the story without diluting the primary signal."
        />
        <ProofLibrary artifacts={proofArtifacts} />
      </section>
    </main>
  );
}
