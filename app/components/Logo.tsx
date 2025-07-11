import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoWithHoverGlow() {
  return (
    <motion.div
      initial={{ y: 10 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      className="flex justify-center items-center w-full h-full"
    >
      <div className="relative w-full h-full max-h-[400px]">
        <Image
          src="/images/tsmithcode-tech-vision-atlanta.png"
          alt="TSmithCode tech vision poster"
          fill
          className="object-contain"
          priority
        />
      </div>
    </motion.div>
  );
}
