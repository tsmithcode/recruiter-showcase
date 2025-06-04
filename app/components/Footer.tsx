import { FaEnvelope, FaPhone } from "react-icons/fa";

export default function Hero() {
  return (
        <footer className="w-full py-3 text-center text-xs text-gray-400 border-t border-white/10 flex items-center justify-center gap-4 flex-wrap">
        <span>© {new Date().getFullYear()} TSmithCode.ai</span>
        <span className="flex items-center gap-1">
            <FaEnvelope className="text-[#05c8fb]" />
            <a href="mailto:job@tsmithcode.ai" className="hover:underline text-gray-300">job@tsmithcode.ai</a>
        </span>
        <span className="flex items-center gap-1">
            <FaPhone className="text-[#05c8fb]" />
            <a href="tel:4702281918" className="hover:underline text-gray-300">(470) 228-1918</a>
        </span>
        </footer>
  );
}