import { motion } from "framer-motion";

const metrics = [
  { label: "Years Full-Stack", value: "7+" },
  { label: "Projects Delivered", value: "100+" },
  { label: "% Faster Deploys", value: "60%" },
];

export default function Metrics() {
  return (
<motion.section
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
className="w-full grid grid-cols-3 text-center text-xs sm:text-sm py-3 border-t border-white/10"
>
{metrics.map((m) => (
    <div key={m.label} className="flex flex-col">
    <span className="font-bold text-[#05c8fb] text-lg sm:text-xl">
        {m.value}
    </span>
    <span className="tracking-wide text-gray-300 uppercase">
        {m.label}
    </span>
    </div>
))}
</motion.section>
  );
}
