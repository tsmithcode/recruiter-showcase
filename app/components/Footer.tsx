import { FaEnvelope, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="showcase-shell flex flex-col gap-4 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl leading-7">
          Built in Next.js 15 and React 19 as a multi-context recruiter showcase for workflow
          systems, Autodesk proof, case studies, and product-oriented engineering judgment.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-slate-300">
          <span>© {new Date().getFullYear()} TSmithCode.ai</span>
          <a href="mailto:job@tsmithcode.ai" className="inline-flex items-center gap-2 hover:text-white">
            <FaEnvelope className="text-teal-300" />
            job@tsmithcode.ai
          </a>
          <a
            href="https://www.linkedin.com/in/tsmithcad/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-white"
          >
            <FaLinkedin className="text-teal-300" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
