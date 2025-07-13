import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LogoWithHoverGlow() {
  return (
    <motion.div
      initial={{ y: 10 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      className="flex justify-center items-center w-full h-full min-w-[150px] min-h-[150px]"
    >
      <Image
        src="/images/tsmithcode-tech-vision-atlanta.png"
        alt="TSmithCode tech vision poster"
        sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw"
        className="object-contain w-full h-auto max-h-[400px] transition-transform duration-300"
        priority
        fill
      />
    </motion.div>
  );
}
