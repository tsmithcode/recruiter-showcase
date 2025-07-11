import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoWithHoverGlow() {
  return (
    <motion.div
  initial={{ y: 10 }}
  animate={{ opacity: 1, y: [0, -10, 0] }}
  transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}

  
  className="flex-shrink-0
        flex justify-center items-center
        mt-6 md:mt-0
        w-3/4 sm:w-1/2 lg:w-full
        sm:min-w-[180px]
        md:min-w-[240px]
        lg:min-w-[320px]"
>
  <Image
    src="/images/tsmithcode-tech-vision-atlanta.png"
    alt="TSmithCode tech vision poster"
    sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 320px"
    className="object-contain
          max-h-[400px]
          group-hover:scale-105 transition-transform duration-300"
    priority
    width={320}
    height={320}
  />
</motion.div>
  );
}
