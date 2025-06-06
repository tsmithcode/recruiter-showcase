// components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
// import SocialLinks from "@/components/SocialLinks";


export default function Navbar() {
  return (
    <nav className="py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
         <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0b253f] via-[#38484c] to-[#Ob253ffb] flex items-center justify-center">
  <Image
    src="/avatar.png"         /* Replace with your own avatar path */
    alt="Thomas Smith"
    width={80}
    height={80}
    className="rounded-full"
    priority
  />
</div>

          <div className="flex flex-col">
            <span className="text-white text-lg font-semibold">
              Thomas Smith
            </span>
            <span className="text-gray-300 text-sm">
              Software Engineer
            </span>
        {/* <SocialLinks /> */}

          </div>

        </Link>

      </div>
    </nav>
  );
}
