import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoWithHoverGlow() {
  return (
    <motion.div
      initial={{ y: 10 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      // Flexbox layout: center on desktop only
      className="flex justify-center items-center mt-6 sm:mt-0 sm:h-[400px]"
    >
      <Image
        src="/images/tsmithcode-tech-vision-atlanta.png"
        alt="TSmithCode.ai tech-vision-atlanta poster"
        sizes="(max-width: 640px) 800px"
        className="object-contain group-hover:scale-105 transition-transform duration-300"
        priority
        width={320}
        height={320}
      />
    </motion.div>
  );
}
