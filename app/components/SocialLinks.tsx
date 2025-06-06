import { FaYoutube, FaGithub, FaEnvelope, FaBriefcase } from "react-icons/fa";
import Link from "next/link";

export default function SocialLinks() {
  return (
    <div className="flex py-1 gap-6 text-[#afc2c8] text-2xl">
      <span title="YouTube Channel">
        <Link
          href="https://www.youtube.com/@tsmithcad"
          target="_blank"
          className="hover:opacity-80 transition"
        >
          <FaYoutube />
        </Link>
      </span>

      <span title="GitHub Profile">
        <Link
          href="https://github.com/tsmithcode/recruiter-showcase"
          target="_blank"
          className="hover:opacity-80 transition"
        >
          <FaGithub />
        </Link>
      </span>

      <span title="Email Thomas">
        <Link
          href="mailto:job@tsmithcode.ai?subject=Website Inquiry&body=Hello Thomas,%0D%0A%0D%0AI found your portfolio at TSmithCode.ai and wanted to reach out about..."
          className="hover:opacity-80 transition"
        >
          <FaEnvelope />
        </Link>
      </span>

      <span title="Indeed Resume">
        <Link
          href="https://profile.indeed.com/p/thomass-ji8rkyy"
          target="_blank"
          className="hover:opacity-80 transition"
        >
          <FaBriefcase />
        </Link>
      </span>
    </div>
  );
}
