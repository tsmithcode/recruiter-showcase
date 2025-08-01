import { FaEnvelope } from 'react-icons/fa';

export default function Hero() {
  return (
    <footer className="w-full py-3 text-center text-xs text-gray-400 border-t border-white/10 flex items-center justify-center gap-4 flex-wrap">
      <p className="text-gray-300 text-base leading-relaxed container mx-auto">
        This recruiter showcase was crafted using
        <span className="text-[#05c8fb] font-semibold"> Next.js 15</span>,
        <span className="text-[#05c8fb] font-semibold"> React 19</span>, and
        <span className="text-[#05c8fb] font-semibold"> Tailwind CSS 4</span> — delivering a fast,
        responsive, and mobile-friendly experience. Styled with{' '}
        <span className="text-[#05c8fb] font-semibold"> Framer Motion</span> for smooth animations
        and deployed with
        <span className="text-[#05c8fb] font-semibold"> Vercel</span> for production-grade
        performance. Every detail is optimized for
        <span className="text-[#05c8fb] font-semibold"> developer-first storytelling</span> and
        recruiter engagement.
      </p>

      <div className="flex items-center gap-4 text-gray-300">
        <span>© {new Date().getFullYear()} TSmithCode.ai</span>
        <span className="flex items-center gap-1">
          <FaEnvelope className="text-[#05c8fb]" />
          <a href="mailto:thomas@tsmithcode.ai" className="hover:underline text-gray-300">
            thomas@tsmithcode.ai
          </a>
        </span>
      </div>
    </footer>
  );
}
