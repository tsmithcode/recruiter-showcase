import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import ParticlesBackground from "@/components/ParticlesBackground";

<script type="application/ld+json" suppressHydrationWarning>
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Thomas Smith",
    url: "https://tsmithcode.ai",
    sameAs: [
      "https://github.com/tsmithcode",
      "https://www.youtube.com/@tsmithcad"
    ],
    jobTitle: "Full-Stack Engineer & Automation Developer",
    worksFor: {
      "@type": "Organization",
      name: "TSmithCode.ai"
    },
    description:
      "Thomas Smith is a .NET developer and automation specialist who delivers full-stack, cloud-native, and CAD-integrated solutions with efficiency.",
  })}
</script>


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.tsx
export const metadata = {
  title: "Thomas Smith | .NET & Automation Engineer",
  description:
    "TSmithCode.ai showcases the full-stack engineering, automation, and CAD expertise of Thomas Smith — building scalable solutions for ERP, CAD, and business process automation.",
  keywords:
    "Thomas Smith, .NET Developer, Automation Engineer, CAD Automation, ERP, React, Blazor, Inventor API, Next.js, Software Engineer Portfolio",
  authors: [{ name: "Thomas Smith", url: "https://tsmithcode.ai" }],
  creator: "Thomas Smith",
  robots: "index, follow",
  openGraph: {
    title: "Thomas Smith | .NET & Automation Engineer",
    description:
      "Full-stack developer and automation specialist using .NET, CAD, and ERP to deliver scalable solutions fast.",
    url: "https://tsmithcode.ai",
    siteName: "TSmithCode.ai",
    images: [
      {
        url: "/tsmithcode-dark.png", // Ensure it's publicly accessible
        width: 1200,
        height: 630,
        alt: "TSmithCode.ai",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Smith | .NET & Automation Engineer",
    description:
      "Streamlining business processes using SDLC, Agile, and clean code principles with .NET, Blazor, CAD, and cloud-native tools.",
    images: ["/tsmithcode-dark.png"],
    site: "@tsmithcode",
    creator: "@tsmithcode",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-[#0b253f] text-white`}>
        <ParticlesBackground />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
