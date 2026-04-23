"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Crosshair } from "lucide-react";
import Button from "./Button";
import YildizJamLogo from "./YildizJamLogo";
import CountdownTimer from "./CountdownTimer";
import JarVideo from "./JarVideo";
import { fadeUp, fadeScale, staggerContainer } from "@/lib/animations";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative z-10 w-full pt-28 sm:pt-36 lg:pt-52 mb-16 sm:mb-20 lg:mb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8 lg:max-w-2xl w-full"
        >
          <div className="space-y-4 sm:space-y-6 w-full flex flex-col items-center lg:items-start">
            <motion.div
              variants={fadeUp}
              className="inline-block px-3 sm:px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <span className="font-pixel text-[clamp(7px,2vw,11px)] leading-none tracking-[0.2em] text-slate-300 uppercase block relative -top-px">
                [ SKY LAB BİLGİSAYAR BİLİMLERİ KULÜBÜ&apos;NDEN ]
              </span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <YildizJamLogo className="text-[clamp(2.2rem,10vw,8rem)]" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-[clamp(12px,3.5vw,24px)] font-tech tracking-[0.12em] sm:tracking-[0.15em] text-brand-glow/80 uppercase"
            >
              Oyun Geliştirme Zirvesi & Yarışması
            </motion.h2>
          </div>

          <motion.div
            variants={fadeScale}
            className="w-full lg:w-auto scale-90 sm:scale-100 flex justify-center lg:justify-start"
          >
            <CountdownTimer />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mt-2"
          >
            <Button
              glowColor="var(--color-brand-action)"
              cornerColor="var(--color-brand-action)"
              onClick={() =>
                window.open(
                  "https://skyl.app/yildiz-jam-katilimci-formu",
                  "_blank",
                )
              }
              className="w-full sm:w-auto sm:min-w-55!"
            >
              <div className="flex items-center justify-center gap-3 text-brand-action">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-display font-bold text-[10px] sm:text-[12px] tracking-[0.2em]">
                  ZİRVE KAYIT
                </span>
              </div>
            </Button>

            <Button
              glowColor="var(--color-brand-glow)"
              onClick={() =>
                window.open(
                  "https://skyl.app/yildiz-jam-yarisma-basvuru",
                  "_blank",
                )
              }
              className="w-full sm:w-auto sm:min-w-55!"
            >
              <div className="flex items-center justify-center gap-3 text-brand-glow">
                <Crosshair className="w-4 h-4" />
                <span className="font-display font-bold text-[10px] sm:text-[12px] tracking-[0.2em]">
                  YARIŞMA KAYIT
                </span>
              </div>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative shrink-0 mt-4 lg:mt-0 mx-auto lg:mx-0 w-85 h-85 lg:w-112.5 lg:h-112.5"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none z-0">
            <div className="w-full h-full border border-dashed border-rose/30 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-3/4 h-3/4 border border-volt/30 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          </div>

          <div className="absolute inset-6 sm:inset-8 lg:inset-12 border border-white/5 bg-plum/40 pointer-events-none z-10">
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-rose/40" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-rose/40" />
          </div>

          <div className="absolute inset-0 z-20">
            <JarVideo />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
