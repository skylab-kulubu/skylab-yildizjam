"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function Marquee() {
  const items = [...Array(12)];

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="w-full bg-plum/40 border-y border-brand-main/20 py-2.5 overflow-hidden whitespace-nowrap relative mb-20 origin-center backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex animate-marquee font-pixel tracking-[0.4em] text-brand-glow/60 uppercase font-bold text-[10px] sm:text-sm"
      >
        {items.map((_, i) => (
          <span key={i} className="mx-6 flex items-center gap-4 shrink-0">
            8-9-10 MAYIS
            <ChevronRight className="w-3 h-3 text-brand-main opacity-50" />
            YTÜ DAVUTPAŞA
            <ChevronRight className="w-3 h-3 text-brand-main opacity-50" />
            TARİHİ HAMAM
            <ChevronRight className="w-3 h-3 text-brand-main opacity-50" />
            SKYLAB
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
