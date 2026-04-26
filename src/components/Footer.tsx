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
        <motion.div variants={fadeUp} className="w-full max-w-4xl">
          <div
            className="w-full flex flex-col rounded-2xl border border-brand-main/20 overflow-hidden drop-shadow-2xl"
            style={{
              background:
                "linear-gradient(to bottom, rgba(138,43,226,0.08) 0%, rgba(6,4,10,0.85) 15%, rgba(6,4,10,0.98) 100%)",
            }}
          >
            <div className="relative flex flex-col items-center select-none px-6 py-6">
              <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-brand-main/35 pointer-events-none" />
              <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-brand-main/35 pointer-events-none" />

              <div className="relative flex items-center justify-center gap-4 mt-2">
                <div className="hidden sm:flex flex-col gap-1 opacity-50">
                  <span className="w-6 h-0.5 bg-brand-main" />
                  <span className="w-4 h-0.5 bg-brand-main/50 ml-auto" />
                </div>

                <h2 className="relative flex items-center gap-3 font-pixel text-2xl sm:text-3xl font-black tracking-[0.2em] uppercase">
                  <span
                    className="text-brand-main"
                    style={{ textShadow: "0 0 15px var(--color-brand-main)" }}
                  >
                    SPACE
                  </span>
                  <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] relative">
                    WEAVER
                    <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-brand-glow to-transparent opacity-80" />
                  </span>
                </h2>

                <div className="hidden sm:flex flex-col gap-1 opacity-50">
                  <span className="w-6 h-0.5 bg-brand-main" />
                  <span className="w-4 h-0.5 bg-brand-main/50 mr-auto" />
                </div>
              </div>
            </div>

            <div className="border-y border-brand-main/20 bg-[#020103]/50 p-3 sm:p-8 shadow-[inset_0_4px_24px_rgba(0,0,0,0.8)] backdrop-blur-sm">
              <SpaceShooter
                gameState={gameState}
                onStateChange={setGameState}
                triggerReset={resetTrigger}
                onUpdateScore={handleUpdateScore}
              />
            </div>

            <div className="relative grid grid-cols-3 items-center gap-2 sm:gap-4 px-4 sm:px-8 py-5 sm:py-6">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
                  backgroundSize: "100% 3px",
                }}
              />
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-main/25 to-transparent" />

              <div className="flex flex-col items-center sm:items-start gap-0.5">
                <span className="font-pixel text-[8px] sm:text-[9px] text-brand-action/50 tracking-[0.25em] sm:tracking-[0.3em] animate-[pulse_2.5s_ease_infinite]">
                  1UP
                </span>
                <span
                  className="font-pixel text-base sm:text-xl tabular-nums text-brand-action"
                  style={{
                    textShadow:
                      "0 0 10px var(--color-brand-action), 0 0 22px rgba(255,0,85,0.2)",
                  }}
                >
                  {highScore.toString().padStart(6, "0")}
                </span>
              </div>

              <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                <span
                  className={`font-pixel text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.35em] transition-colors duration-300 whitespace-nowrap ${
                    gameState === "gameover"
                      ? "text-brand-glow animate-pulse"
                      : gameState === "playing"
                        ? "text-brand-main/50"
                        : "text-white/15"
                  }`}
                >
                  {gameState === "playing"
                    ? "ACTIVE"
                    : gameState === "gameover"
                      ? "INSERT COIN"
                      : "STANDBY"}
                </span>
                <div className="shadow-[0_4px_0_rgba(0,0,0,0.8)] active:shadow-[0_1px_0_rgba(0,0,0,0.8)] active:translate-y-0.75 transition-[box-shadow,transform] duration-75 rounded-sm z-10">
                  <Button
                    pixelSize={2}
                    cornerColor={
                      gameState !== "playing"
                        ? "var(--color-brand-glow)"
                        : "#151525"
                    }
                    glowColor={
                      gameState !== "playing"
                        ? "var(--color-brand-glow)"
                        : "transparent"
                    }
                    onClick={handleAction}
                  >
                    <div
                      className={`flex items-center gap-1.5 sm:gap-2 px-0.5 sm:px-1 ${gameState === "playing" ? "opacity-40 grayscale" : ""}`}
                    >
                      {gameState === "waiting" ? (
                        <Play
                          className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-glow shrink-0"
                          fill="currentColor"
                        />
                      ) : (
                        <RotateCcw
                          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-glow shrink-0 ${gameState === "gameover" ? "animate-[spin_3s_linear_infinite]" : ""}`}
                        />
                      )}
                      <span className="font-display font-black text-[10px] sm:text-[11px] tracking-wider whitespace-nowrap">
                        {gameState === "waiting" ? (
                          <>
                            <span className="hidden sm:inline">PRESS </span>
                            START
                          </>
                        ) : gameState === "gameover" ? (
                          <>
                            <span className="hidden sm:inline">TRY </span>AGAIN
                          </>
                        ) : (
                          "PLAYING"
                        )}
                      </span>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-end gap-0.5">
                <span className="font-pixel text-[8px] sm:text-[9px] text-brand-reward/50 tracking-[0.25em] sm:tracking-[0.3em]">
                  CREDITS
                </span>
                <span
                  className="font-pixel text-base sm:text-xl tabular-nums text-brand-reward"
                  style={{
                    textShadow:
                      "0 0 10px var(--color-brand-reward), 0 0 22px rgba(255,193,7,0.2)",
                  }}
                >
                  99
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="w-full flex flex-col items-center gap-8 md:gap-10 border-t border-white/5 pt-8 md:pt-10 mt-8 md:mt-12">
          <motion.div
            variants={fadeUp}
            className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 px-4 sm:px-6"
          >
            <div className="flex-1 md:basis-0 flex justify-center md:justify-start w-full">
              <div className="relative w-48 h-12 md:w-56 md:h-14 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
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

            <div className="flex justify-center items-center gap-6">
              {SOCIAL_LINKS.map(({ Icon, href, color }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
                  style={{ "--hover-color": color } as React.CSSProperties}
                  className="text-slate-500/70 transition-all duration-300 hover:text-(--hover-color) hover:drop-shadow-[0_0_12px_var(--hover-color)]"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>

            <div className="flex-1 md:basis-0 flex flex-row items-center justify-center md:justify-end gap-2 md:gap-3 w-full">
              <div className="relative w-28 h-12 md:w-32 md:h-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <Image
                  src="/img/gamelablogo.png"
                  alt="GAME LAB"
                  fill
                  className="object-contain object-center md:object-right"
                  priority
                  unoptimized
                />
              </div>
              <div className="relative w-28 h-12 md:w-32 md:h-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
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
            className="grid grid-cols-1 lg:grid-cols-3 items-center w-full max-w-7xl mx-auto gap-6 lg:gap-4 px-4 sm:px-6 pt-6 pb-4 border-t border-white/5"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
              <p className="font-pixel text-[10px] uppercase tracking-[0.2em] text-slate-500/50 whitespace-nowrap">
                © 2026 YTU SKY LAB · CORE_REV: 4.0.2
              </p>
              <div
                className="hidden sm:block w-px h-3 bg-white/10"
                aria-hidden="true"
              />
              <div className="flex items-center gap-2 text-slate-600">
                <Terminal className="w-3 h-3" aria-hidden="true" />
                <span className="font-pixel text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
                  Status: <span className="text-brand-main">OPERATIONAL</span>
                </span>
              </div>
            </div>

            <div className="flex justify-center items-center w-full">
              <a
                href="https://yildizskylab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 font-pixel text-[10px] uppercase tracking-[0.2em] text-slate-500/60 hover:text-brand-main transition-colors duration-300"
              >
                <span
                  className="text-brand-main opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  ▶
                </span>
                <span className="group-hover:drop-shadow-[0_0_6px_var(--color-brand-main)] transition-all duration-300 whitespace-nowrap">
                  YILDIZSKYLAB.com
                </span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-main shadow-[0_0_4px_var(--color-brand-main)] transition-all duration-300 group-hover:w-full" />
              </a>
            </div>

            <div className="flex justify-center lg:justify-end items-center h-6 font-pixel text-[10px] uppercase tracking-[0.2em] text-slate-500/60 w-full">
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
                    <span
                      className="flex items-center overflow-hidden opacity-0 group-hover:opacity-100 group-hover:pr-2 text-brand-glow text-[10px] whitespace-nowrap transition-all duration-500"
                      aria-hidden="true"
                    >
                      ✎
                    </span>
                  </div>
                  <span className="flex items-center font-bold tracking-widest text-slate-400 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_var(--color-brand-glow)] whitespace-nowrap">
                    KANEKALP
                  </span>
                  <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-in-out">
                    <span
                      className="flex items-center overflow-hidden opacity-0 group-hover:opacity-100 group-hover:pl-2 text-brand-glow text-[10px] whitespace-nowrap transition-all duration-500"
                      aria-hidden="true"
                    >
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
