import { motion } from 'framer-motion'
import Image from 'next/image'

export default function LogoPair() {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 pt-2 pb-6 max-w-2xl px-4 text-center mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="relative w-32 h-32 sm:w-64 sm:h-64 overflow-hidden">
          <Image
            src="/images/tsmithcode-logo.png"
            alt="TSmithCode.ai logo"
            fill
            className="object-contain select-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
            priority
          />
        </div>
        <div className="relative w-32 h-32 sm:w-64 sm:h-64 overflow-hidden">
          <Image
            src="/images/tsmithcode-atlanta.png"
            alt="TSmithCode.ai Atlanta logo"
            fill
            className="object-contain select-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
            priority
          />
        </div>
      </div>

      <p className="mt-2 text-center text-sm text-gray-600">
        TSmithCode.ai primary and Atlanta support logos
      </p>
    </motion.div>
  )
}
