import { motion } from "framer-motion";
import Image from "next/image";

export default function Atlanta() {
// const BRAND_COLORS = ["#0b253f", "#05c8fb", "#d9d9d9", "#98cedd"];

  return (
    <motion.div
      initial={{opacity: 70, y: 10 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0], // bob from 0 → -10px → 0
      }}
      transition={{
        duration: 4,            
        ease: "easeInOut",      
        repeat: Infinity
      }}
      className="rounded-full"
    >
      <Image
        src="/images/tsmithcode-atlanta.png"
        alt="TSmithCode.ai tech-vision-atlanta poster"
        sizes="(max-width: 640px) 800px"
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        priority
        width={400}
        height={400}
      />
    </motion.div>
    
  );
}
