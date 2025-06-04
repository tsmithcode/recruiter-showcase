// …other imports above…
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoWithHoverGlow() {
  // three brand colors to choose from on hover
const BRAND_COLORS = ["#0b253f", "#05c8fb", "#d9d9d9", "#98cedd"];

  const [glowColor, setGlowColor] = useState<string>("");

  // helper: pick one random color
  const pickRandomColor = () => {
    const idx = Math.floor(Math.random() * BRAND_COLORS.length);
    return BRAND_COLORS[idx];
  };

  return (
    <motion.div
      // fade in on mount, then continuously bob up/down
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0], // bob from 0 → -10px → 0
      }}
      transition={{
        duration: 2,            // 2 seconds for a full up/down cycle
        ease: "easeInOut",      // smooth ease
        repeat: Infinity,       // repeat forever
      }}
      // on hover, pick a random brand color and apply glow; on leave, clear it
      onMouseEnter={() => setGlowColor(pickRandomColor())}
      onMouseLeave={() => setGlowColor("")}
      // apply the glow via inline style
      style={{
        boxShadow: glowColor
          ? `0 0 20px ${glowColor}`
          : "none",
      }}
      className="inline-block rounded-full"
    >
      <Image
        src="/tsmithcode.png"
        alt="TSmithCode.ai logo"
        width={256}
        height={256}
        priority
        className="select-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
      />
    </motion.div>
  );
}
