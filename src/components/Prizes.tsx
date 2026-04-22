"use client";

import { motion } from "framer-motion";
import { Trophy, Swords, Medal } from "lucide-react";
import Card from "@/components/Card";
import { fadeScale } from "@/lib/animations";
import PageSection from "./PageSection";

export default function Prizes() {
  return (
    <PageSection
      id="oduller"
      tag="REWARDS_POOL"
      title="ÖDÜL HAVUZU"
      color="var(--color-brand-reward)"
      variant="section"
      className="py-12 mb-24"
      showBar={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end w-full max-w-5xl mx-auto">
        <motion.div variants={fadeScale} className="order-2 md:order-1 h-full">
          <Card
            noPadding
            variant="soft"
            className="text-center bg-plum/50 border-white/5 h-full flex flex-col"
            cornerColor="var(--color-brand-main)"
            glowColor="var(--color-brand-main)"
          >
            <div className="p-8 flex flex-col items-center justify-center grow gap-4 relative">
              <div className="absolute top-4 right-4 font-pixel text-[8px] opacity-30 text-brand-main tracking-widest">
                [ 2ND_PLACE ]
              </div>
              <div className="p-4 rounded-2xl bg-brand-main/10 border border-brand-main/20 group-hover:scale-110 transition-transform duration-500">
                <Swords className="text-brand-main opacity-90 w-8 h-8 drop-shadow-[0_0_8px_color-mix(in srgb,var(--color-brand-main)_50%,transparent)]" />
              </div>
              <div className="space-y-1">
                <span className="font-tech text-[10px] text-brand-main/80 tracking-widest uppercase">
                  İkinci
                </span>
                <h3 className="font-display font-black text-3xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  20.000TL
                </h3>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeScale}
          className="order-1 md:order-2 md:-mt-8 z-10"
        >
          <Card
            noPadding
            variant="default"
            className="text-center relative bg-space border-brand-reward/30 h-full flex flex-col"
            cornerColor="var(--color-brand-reward)"
            glowColor="var(--color-brand-reward)"
          >
            <div className="py-12 lg:py-16 px-8 flex flex-col items-center justify-center grow gap-6 relative">
              <div className="absolute top-4 right-4 font-pixel text-[8px] opacity-40 text-brand-reward tracking-widest">
                [ 1ST_PLACE ]
              </div>
              <div className="p-5 rounded-2xl bg-brand-reward/10 border border-brand-reward/30 shadow-[0_0_30px_color-mix(in srgb,var(--color-brand-reward)_20%,transparent)] group-hover:scale-110 transition-transform duration-500">
                <Trophy className="text-brand-reward animate-pulse w-12 h-12 drop-shadow-[0_0_15px_color-mix(in srgb,var(--color-brand-reward)_60%,transparent)]" />
              </div>
              <div className="space-y-2">
                <span className="font-tech text-[11px] text-brand-reward tracking-widest uppercase font-bold drop-shadow-[0_0_5px_var(--color-brand-reward)]">
                  Birinci
                </span>
                <h3 className="font-display font-black text-5xl lg:text-6xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                  30.000TL
                </h3>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeScale} className="order-3 h-full">
          <Card
            noPadding
            variant="soft"
            className="text-center bg-plum/50 border-white/5 h-full flex flex-col"
            cornerColor="var(--color-brand-glow)"
            glowColor="var(--color-brand-glow)"
          >
            <div className="p-8 flex flex-col items-center justify-center grow gap-4 relative">
              <div className="absolute top-4 right-4 font-pixel text-[8px] opacity-30 text-brand-glow tracking-widest">
                [ 3RD_PLACE ]
              </div>
              <div className="p-4 rounded-2xl bg-brand-glow/10 border border-brand-glow/20 group-hover:scale-110 transition-transform duration-500">
                <Medal className="text-brand-glow opacity-90 w-8 h-8 drop-shadow-[0_0_8px_color-mix(in srgb,var(--color-brand-glow)_50%,transparent)]" />
              </div>
              <div className="space-y-1">
                <span className="font-tech text-[10px] text-brand-glow/80 tracking-widest uppercase">
                  Üçüncü
                </span>
                <h3 className="font-display font-black text-3xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  10.000TL
                </h3>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </PageSection>
  );
}
