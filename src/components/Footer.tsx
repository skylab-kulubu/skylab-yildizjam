"use client";

import Image from "next/image";
import Button from "./Button";
import { motion } from "framer-motion";
import { Terminal, ChevronUp } from "lucide-react";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import { fadeUp, staggerContainer } from "@/lib/animations";

const SOCIAL_LINKS = [
  {
    Icon: FiFacebook,
    href: "https://www.facebook.com/ytuskylab/",
    color: "#1877F2",
  },
  {
    Icon: FiTwitter,
    href: "https://mobile.twitter.com/skylabkulubu",
    color: "#1DA1F2",
  },
  {
    Icon: FiInstagram,
    href: "https://www.instagram.com/ytuskylab/",
    color: "#E4405F",
  },
  {
    Icon: FiLinkedin,
    href: "https://www.linkedin.com/company/ytuskylab/",
    color: "#0A66C2",
  },
  {
    Icon: FiGithub,
    href: "https://github.com/skylab-kulubu",
    color: "#ffffff",
  },
] as const;

const glitchVariants = {
  idle: { x: 0, opacity: 1 },
  glitch: {
    x: [0, -3, 3, -2, 2, 0],
    opacity: [1, 0.8, 1, 0.9, 1],
    transition: { duration: 0.4, repeat: Infinity, repeatDelay: 3.5 },
  },
};

const glitchRedVariants = {
  idle: { x: 0, opacity: 0 },
  glitch: {
    x: [0, 3, -3, 2, -2, 0],
    opacity: [0, 0.4, 0, 0.3, 0],
    transition: { duration: 0.4, repeat: Infinity, repeatDelay: 3.5 },
  },
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative z-10 w-full mt-auto py-16 border-t border-brand-main/20 bg-(--color-space)/95 backdrop-blur-md">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center gap-12 relative z-10"
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center gap-3 cursor-default select-none"
        >
          <div className="relative">
            <motion.span
              variants={glitchVariants}
              initial="idle"
              animate="glitch"
              className="block font-pixel text-3xl font-black tracking-[0.25em] text-white uppercase"
              style={{ textShadow: "0 0 20px rgba(255,255,255,0.15)" }}
            >
              Game Over?
            </motion.span>
            <motion.span
              variants={glitchRedVariants}
              initial="idle"
              animate="glitch"
              aria-hidden
              className="absolute inset-0 block font-pixel text-3xl font-bmd:order-0-[0.25em] uppercase text-[#ff3366] pointer-events-none"
            >
              Game Over?
            </motion.span>
          </div>
          <p className="font-pixel text-[8px] tracking-[0.35em] text-slate-500 uppercase">
            — yıldız jam · 2026 —
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="relative w-full max-w-4xl">
          <div
            className="relative grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 font-pixel text-[9px] tracking-[0.2em] uppercase px-8 py-7 rounded-sm border border-white/5 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(138,43,226,0.04) 0%, rgba(0,240,255,0.02) 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
                backgroundSize: "100% 3px",
              }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-sm border border-brand-main/10" />

            <div className="relative flex flex-col items-center md:items-start gap-2">
              <span className="text-brand-action opacity-60 text-[7px]">
                [ HIGH SCORE ]
              </span>
              <span className="text-white text-sm tabular-nums drop-shadow-[0_0_6px_var(--color-brand-action)]">
                999,999
              </span>
            </div>

            <div className="relative col-span-2 md:col-span-1 order-first md:order-0 flex flex-col items-center gap-3">
              <span className="text-brand-glow animate-pulse text-[7px] tracking-[0.4em]">
                INSERT COIN
              </span>
              <Button
                pixelSize={2}
                cornerColor="var(--color-brand-glow)"
                glowColor="var(--color-brand-glow)"
                onClick={scrollToTop}
              >
                <div className="flex items-center gap-3">
                  <ChevronUp className="w-4 h-4 text-brand-glow" />
                  <span className="font-display font-black text-xs uppercase tracking-wider">
                    Press Start
                  </span>
                </div>
              </Button>
            </div>

            <div className="relative flex flex-col items-center md:items-end gap-2">
              <span className="text-brand-reward opacity-60 text-[7px]">
                [ LEVEL ]
              </span>
              <span className="text-white text-sm tabular-nums drop-shadow-[0_0_6px_var(--color-brand-reward)]">
                2026
              </span>
            </div>
          </div>
        </motion.div>

        <div className="w-full flex flex-col items-center gap-10 border-t border-white/5 pt-10">
          <motion.div
            variants={fadeUp}
            className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8"
          >
            <div className="relative w-60 h-20 group grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <Image
                src="/img/skylab-text-logo.svg"
                alt="SKY LAB"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>

            <div className="flex justify-center items-center gap-6">
              {SOCIAL_LINKS.map(({ Icon, href, color }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="text-slate-500 transition-colors duration-300"
                  onMouseEnter={(e) => {
                    const svg = e.currentTarget.querySelector(
                      "svg",
                    ) as SVGElement | null;
                    if (svg) {
                      svg.style.color = color;
                      svg.style.filter = `drop-shadow(0 0 10px ${color})`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    const svg = e.currentTarget.querySelector(
                      "svg",
                    ) as SVGElement | null;
                    if (svg) {
                      svg.style.color = "";
                      svg.style.filter = "none";
                    }
                  }}
                >
                  <Icon className="w-6 h-6 transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center gap-6 md:gap-12 pt-4 border-t border-white/5 w-full max-w-4xl justify-center"
          >
            <div className="flex items-center gap-3 text-brand-glow/50">
              <Terminal className="w-3 h-3" />
              <span className="font-pixel text-[8px] tracking-[0.4em] uppercase">
                System_Status:{" "}
                <span className="text-brand-glow animate-pulse">Online</span>
              </span>
            </div>

            <a
              href="https://yildizskylab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-1.5 border border-white/5 bg-white/2 hover:border-brand-main/40 transition-all duration-300"
            >
              <div className="w-1 h-1 bg-brand-main rounded-full animate-ping" />
              <span className="font-pixel text-[7px] tracking-[0.2em] text-slate-400 group-hover:text-white uppercase">
                Return to Portal:{" "}
                <span className="text-brand-main">yildizskylab.com</span>
              </span>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center gap-6 text-center w-full max-w-4xl justify-between border-t border-white/5 pt-8"
          >
            <p className="font-pixel text-[8px] text-slate-500/60 tracking-[0.2em] uppercase">
              © 2026 YTU SKY LAB. All game assets reserved.
            </p>

            <div className="flex items-center font-pixel text-[8px] tracking-[0.2em] text-slate-500/60 h-6 uppercase">
              <span className="mr-2 opacity-50 select-none">Developed by</span>
              <a
                href="https://github.com/kanekalp"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center h-full transition-all duration-500"
              >
                <div className="grid transition-[grid-template-columns] duration-500 ease-in-out grid-cols-[0fr] group-hover:grid-cols-[1fr]">
                  <span className="overflow-hidden opacity-0 group-hover:opacity-100 group-hover:pr-2 text-brand-glow text-[10px] whitespace-nowrap flex items-center transition-all duration-500">
                    ✎
                  </span>
                </div>
                <span className="font-bold text-slate-400 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_var(--color-brand-glow)] whitespace-nowrap flex items-center tracking-widest">
                  KNK_NODE
                </span>
                <div className="grid transition-[grid-template-columns] duration-500 ease-in-out grid-cols-[0fr] group-hover:grid-cols-[1fr]">
                  <span className="overflow-hidden opacity-0 group-hover:opacity-100 group-hover:pl-2 text-brand-glow text-[10px] whitespace-nowrap flex items-center transition-all duration-500">{`</>`}</span>
                </div>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-glow shadow-[0_0_5px_var(--color-brand-glow)] transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
