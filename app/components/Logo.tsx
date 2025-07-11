import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoWithHoverGlow() {
  return (
    <motion.div
  initial={{ y: 10 }}
  animate={{ opacity: 1, y: [0, -10, 0] }}
  transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}

  
  className="flex justify-center items-center mt-6 md:mt-0 md:h-[400px]"
>
  <Image
    src="/images/tsmithcode-tech-vision-atlanta.png"
    alt="TSmithCode tech vision poster"
    sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 320px"
    className="object-contain w-3/4 sm:w-1/2 lg:w-full
               group-hover:scale-105 transition-transform duration-300"
    priority
    width={320}
    height={320}
  />
</motion.div>
  );
}
