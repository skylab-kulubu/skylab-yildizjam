"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/Card";
import { fadeScale } from "@/lib/animations";
import PageSection from "./PageSection";

export function TrophyVideo({
  variant,
}: {
  variant: "gold" | "silver" | "bronze";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!isMounted || !canvas) return;

    const video = document.createElement("video");
    video.src = `/models/${variant}.webm`;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    let _rate = 1;
    Object.defineProperty(video, "playbackRate", {
      get: () => _rate,
      set: () => {},
      configurable: true,
    });

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const draw = () => {
      if (!video.paused && !video.ended) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      animId = requestAnimationFrame(draw);
    };

    video.addEventListener("loadedmetadata", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    });

    video.addEventListener("canplay", () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          if (e.name !== "AbortError") console.error("Video hatası:", e);
        });
      }
      draw();
    });

    return () => {
      cancelAnimationFrame(animId);
      video.pause();
      video.src = "";
    };
  }, [isMounted, variant]);

  if (!isMounted) return <div className="w-full h-full" />;

  return (
    <div className="relative w-full h-full" suppressHydrationWarning>
      <canvas
        ref={canvasRef}
        onContextMenu={(e) => e.preventDefault()}
        className="w-full h-full object-contain pointer-events-none select-none touch-none scale-[1.2]"
        style={{
          filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.4))",
        }}
      />
    </div>
  );
}

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end w-full max-w-5xl mx-auto pt-24 md:pt-32">
        <motion.div
          variants={fadeScale}
          className="order-2 md:order-1 relative group mt-12 md:mt-0 flex flex-col z-30"
        >
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 z-40 transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-110 pointer-events-none">
            <TrophyVideo variant="silver" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/60 blur-xl rounded-full scale-y-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <Card
            noPadding
            variant="soft"
            className="text-center bg-plum/50 border-white/5 relative z-20"
            cornerColor="var(--color-brand-main)"
            glowColor="var(--color-brand-main)"
          >
            <div className="pt-20 pb-8 px-6 flex flex-col items-center gap-4 relative">
              <div className="absolute top-4 right-4 font-pixel text-[10px] opacity-30 text-brand-main tracking-widest">
                [ 2ND_PLACE ]
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
          className="order-1 md:order-2 relative group flex flex-col z-40"
        >
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-36 h-36 z-50 transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:scale-110 pointer-events-none">
            <TrophyVideo variant="gold" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/60 blur-xl rounded-full scale-y-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <Card
            noPadding
            variant="default"
            className="text-center relative bg-space border-brand-reward/30 z-20"
            cornerColor="var(--color-brand-reward)"
            glowColor="var(--color-brand-reward)"
          >
            <div className="pt-24 pb-12 px-6 flex flex-col items-center gap-5 relative">
              <div className="absolute top-4 right-4 font-pixel text-[10px] opacity-40 text-brand-reward tracking-widest">
                [ 1ST_PLACE ]
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

        <motion.div
          variants={fadeScale}
          className="order-3 relative group mt-12 md:mt-0 flex flex-col z-30"
        >
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 z-40 transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-110 pointer-events-none">
            <TrophyVideo variant="bronze" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/60 blur-xl rounded-full scale-y-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <Card
            noPadding
            variant="soft"
            className="text-center bg-plum/50 border-white/5 relative z-20"
            cornerColor="var(--color-brand-glow)"
            glowColor="var(--color-brand-glow)"
          >
            <div className="pt-20 pb-8 px-6 flex flex-col items-center gap-4 relative">
              <div className="absolute top-4 right-4 font-pixel text-[10px] opacity-30 text-brand-glow tracking-widest">
                [ 3RD_PLACE ]
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
