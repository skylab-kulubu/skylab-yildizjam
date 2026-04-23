"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import { motion } from "framer-motion";
import { Terminal, Play, RotateCcw } from "lucide-react";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SpaceShooter } from "./SpaceShooter";

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

export default function Footer() {
  const [gameState, setGameState] = useState<string>("waiting");
  const [resetTrigger, setResetTrigger] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  const handleAction = () => {
    if (gameState === "waiting") {
      setGameState("playing");
    } else if (gameState === "gameover") {
      setGameState("waiting");
      setResetTrigger((prev) => prev + 1);
    }
  };

  const handleUpdateScore = (score: number) => {
    setHighScore((prev) => Math.max(prev, score));
  };

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
          <span className="block font-pixel text-3xl font-black tracking-[0.25em] text-brand-main uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">
            SPACE WEAVER
          </span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="w-full max-w-4xl relative group"
        >
          <SpaceShooter
            gameState={gameState}
            onStateChange={setGameState}
            triggerReset={resetTrigger}
            onUpdateScore={handleUpdateScore}
          />
        </motion.div>

        <motion.div variants={fadeUp} className="relative w-full max-w-4xl">
          <div
            className="relative grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 font-pixel text-[10px] tracking-[0.2em] uppercase px-8 py-7 rounded-sm border border-white/5 overflow-hidden"
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

            <div className="relative flex flex-col items-center md:items-start gap-2">
              <span className="text-brand-action opacity-60 text-[10px]">
                [ HIGH SCORE ]
              </span>
              <span className="text-white text-sm tabular-nums drop-shadow-[0_0_6px_var(--color-brand-action)]">
                {highScore.toString().padStart(6, "0")}
              </span>
            </div>

            <div className="relative col-span-2 md:col-span-1 order-first md:order-0 flex flex-col items-center gap-3">
              <span
                className={`text-[10px] tracking-[0.4em] transition-all duration-300 ${
                  gameState === "gameover"
                    ? "text-brand-glow animate-pulse"
                    : "text-brand-main"
                }`}
              >
                {gameState === "playing"
                  ? "SYSTEM ACTIVE"
                  : gameState === "gameover"
                    ? "INSERT COIN"
                    : "STANDBY"}
              </span>
              <Button
                pixelSize={2}
                cornerColor={
                  gameState !== "playing"
                    ? "var(--color-brand-glow)"
                    : "#475569"
                }
                glowColor={
                  gameState !== "playing"
                    ? "var(--color-brand-glow)"
                    : "transparent"
                }
                onClick={handleAction}
              >
                <div
                  className={`flex items-center gap-3 ${gameState === "playing" ? "opacity-50 grayscale" : ""}`}
                >
                  {gameState === "waiting" ? (
                    <Play className="w-3 h-3 text-brand-glow" />
                  ) : (
                    <RotateCcw
                      className={`w-3 h-3 text-brand-glow ${gameState === "gameover" ? "animate-[spin_4s_linear_infinite]" : ""}`}
                    />
                  )}
                  <span className="font-display font-black text-[10px] uppercase tracking-wider">
                    {gameState === "waiting"
                      ? "PRESS START"
                      : gameState === "gameover"
                        ? "TRY AGAIN"
                        : "ACTIVE"}
                  </span>
                </div>
              </Button>
            </div>

            <div className="relative flex flex-col items-center md:items-end gap-2">
              <span className="text-brand-reward opacity-60 text-[10px]">
                [ YEAR ]
              </span>
              <span className="text-white text-sm tabular-nums drop-shadow-[0_0_6px_var(--color-brand-reward)]">
                2026
              </span>
            </div>
          </div>
        </motion.div>

        <div className="w-full flex flex-col items-center gap-8 md:gap-10 border-t border-white/5 pt-8 md:pt-10 mt-8 md:mt-12">
          <motion.div
            variants={fadeUp}
            className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 px-4 sm:px-6"
          >
            <div className="flex-1 flex justify-center md:justify-start w-full">
              <div className="relative w-48 h-12 md:w-60 md:h-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <Image
                  src="/img/skylab-text-logo.svg"
                  alt="SKY LAB"
                  fill
                  className="object-contain object-center md:object-left"
                  priority
                  unoptimized
                />
              </div>
            </div>

            <div className="flex-none flex flex-wrap justify-center items-center gap-5 sm:gap-6 w-full md:w-auto">
              {SOCIAL_LINKS.map(({ Icon, href, color }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.2 }}
                  className="text-slate-500 transition-all duration-300"
                  onMouseEnter={(e) => {
                    const svg = e.currentTarget.querySelector("svg");
                    if (svg) {
                      svg.style.color = color;
                      svg.style.filter = `drop-shadow(0 0 10px ${color})`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    const svg = e.currentTarget.querySelector("svg");
                    if (svg) {
                      svg.style.color = "";
                      svg.style.filter = "none";
                    }
                  }}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>

            <div className="flex-1 flex justify-center md:justify-end w-full">
              <div className="relative w-48 h-12 md:w-60 md:h-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <Image
                  src="/img/weblablogo.svg"
                  alt="WEB LAB"
                  fill
                  className="object-contain object-center md:object-right"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-6 lg:gap-4 px-4 sm:px-6 pt-6 pb-4 border-t border-white/5"
          >
            <div className="flex-1 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
              <p className="font-pixel text-[9px] uppercase tracking-[0.2em] text-slate-500/50 whitespace-nowrap">
                © 2026 YTU SKY LAB · CORE_REV: 4.0.2
              </p>
              <div className="hidden sm:block w-px h-3 bg-white/10" />
              <div className="flex items-center gap-2 text-slate-600">
                <Terminal className="w-3 h-3" />
                <span className="font-pixel text-[9px] uppercase tracking-[0.2em] whitespace-nowrap">
                  Status: <span className="text-brand-main">OPERATIONAL</span>
                </span>
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center w-full">
              <a
                href="https://yildizskylab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 font-pixel text-[10px] uppercase tracking-[0.2em] text-slate-500/60 hover:text-brand-main transition-colors duration-300"
              >
                <span className="text-brand-main opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  ▶
                </span>
                <span className="group-hover:drop-shadow-[0_0_6px_var(--color-brand-main)] transition-all duration-300 whitespace-nowrap">
                  YILDIZSKYLAB.com
                </span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-main shadow-[0_0_4px_var(--color-brand-main)] transition-all duration-300 group-hover:w-full" />
              </a>
            </div>

            <div className="flex-1 flex justify-center lg:justify-end items-center h-6 font-pixel text-[9px] uppercase tracking-[0.2em] text-slate-500/60 w-full">
              <div className="flex items-center">
                <span className="mr-2 opacity-50 select-none whitespace-nowrap">
                  Developed by
                </span>
                <a
                  href="https://github.com/kanekalp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center h-full transition-all duration-500"
                >
                  <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-in-out">
                    <span className="flex items-center overflow-hidden opacity-0 group-hover:opacity-100 group-hover:pr-2 text-brand-glow text-[10px] whitespace-nowrap transition-all duration-500">
                      ✎
                    </span>
                  </div>

                  <span className="flex items-center font-bold tracking-widest text-slate-400 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_var(--color-brand-glow)] whitespace-nowrap">
                    KANEKALP
                  </span>

                  <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-in-out">
                    <span className="flex items-center overflow-hidden opacity-0 group-hover:opacity-100 group-hover:pl-2 text-brand-glow text-[10px] whitespace-nowrap transition-all duration-500">
                      {`</>`}
                    </span>
                  </div>

                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-glow shadow-[0_0_5px_var(--color-brand-glow)] transition-all duration-300 group-hover:w-full" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
