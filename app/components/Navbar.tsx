// components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-[#0b253ffb] py-3 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Avatar + Name + Subtitle */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/avatar.jpeg"         /* Replace with your own avatar path */
            alt="Thomas Smith"
            width={80}
            height={80}
            className="rounded-full border-2 border-[#05c8fb]"
            priority
          />
          <div className="flex flex-col">
            <span className="text-white text-lg font-semibold">
              Thomas Smith
            </span>
            <span className="text-gray-300 text-sm">
              .NET & Automation Engineer
            </span>
          </div>
        </Link>

        {/* Right: Hamburger Menu */}
        <button
          type="button"
          aria-label="Open Menu"
          className="text-[#05c8fb] hover:text-[#0bbfff] focus:outline-none"
        >
          <FaBars size={24} />
        </button>
      </div>
    </nav>
  );
}
