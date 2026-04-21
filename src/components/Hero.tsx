import { motion } from "framer-motion";
import { ShieldCheck, Crosshair } from "lucide-react";
import Button from "./Button";
import YildizJamLogo from "./YildizJamLogo";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Hero() {
  return (
    <section className="relative z-10 w-full pt-40 lg:pt-52 mb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:max-w-2xl w-full"
        >
          <div className="space-y-6 w-full flex flex-col items-center lg:items-start">
            <motion.div
              variants={fadeUp}
              className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] max-w-full"
            >
              <span className="font-pixel text-[clamp(8px,2.5vw,11px)] leading-none tracking-[0.2em] text-slate-300 uppercase block relative -top-px truncate">
                [ SKY LAB BİLGİSAYAR BİLİMLERİ KULÜBÜ'NDEN ]
              </span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <YildizJamLogo className="text-[clamp(2rem,8.5vw,8rem)]" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-[clamp(14px,3.5vw,24px)] font-tech tracking-[0.15em] text-brand-glow/80 uppercase"
            >
              Oyun Geliştirme Zirvesi & Yarışması
            </motion.h2>
          </div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4"
          >
            <Button
              glowColor="var(--color-brand-action)"
              cornerColor="var(--color-brand-action)"
              onClick={() => alert("photos printed")}
              className="w-full sm:w-auto sm:min-w-55!"
            >
              <div className="flex items-center justify-center gap-3">
                <ShieldCheck className="w-4 h-4 text-brand-action" />
                <span className="font-display font-bold text-[10px] sm:text-[12px] tracking-[0.2em] text-brand-action">
                  ZİRVE KAYIT
                </span>
              </div>
            </Button>
            <Button
              glowColor="var(--color-brand-glow)"
              cornerColor="var(--color-brand-glow)"
              onClick={() => alert("bogos binted")}
              className="w-full sm:w-auto sm:min-w-55!"
            >
              <div className="flex items-center justify-center gap-3">
                <Crosshair className="w-4 h-4 text-brand-glow" />
                <span className="font-display font-bold text-[10px] sm:text-[12px] tracking-[0.2em] text-brand-glow">
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
          className="relative w-full lg:w-112.5 h-75 lg:h-112.5 flex items-center justify-center mt-8 lg:mt-0"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-70 h-70 lg:w-100 lg:h-100 border border-dashed border-rose/30 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-50 h-50 lg:w-75 lg:h-75 border border-volt/30 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          </div>

          <div className="relative w-52 h-64 lg:w-60 lg:h-72 border border-white/5 bg-plum/80 backdrop-blur-2xl flex flex-col items-center justify-center group shadow-[0_0_50px_rgba(139,92,246,0.2)]">
            <div className="absolute inset-0 bg-linear-to-b from-violet/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-2 left-2 flex gap-1">
              <div className="w-1.5 h-1.5 bg-rose/70" />
              <div className="w-1.5 h-1.5 bg-gold/70" />
              <div className="w-1.5 h-1.5 bg-volt/70" />
            </div>
            <span className="font-pixel text-[8px] sm:text-[10px] text-brand-glow/80 animate-pulse text-center px-8 leading-relaxed uppercase tracking-widest">
              <span className="text-[6px] text-slate-500 mt-2 block">
                buraya model gelecek
              </span>
            </span>
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-rose/40" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-volt/40" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-volt/40" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-rose/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
