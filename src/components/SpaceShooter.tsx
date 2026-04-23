"use client";

import React, { useEffect, useRef } from "react";
import { MOTIF_DATA, SUYOLU_POLYS, convertPolygonToPath } from "@/lib/motifs";

export interface SpaceShooterProps {
  gameState: string;
  onStateChange: (state: string) => void;
  triggerReset: number;
  onUpdateScore: (score: number) => void;
}

interface Bullet {
  active: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
}

interface Enemy {
  active: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  vx: number;
  type: "ram" | "meteor" | "weaver";
  motif: string;
  color: string;
  angle: number;
}

interface Particle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface Star {
  x: number;
  y: number;
  speed: number;
  size: number;
}

const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.fillStyle = "#00F0FF";
  ctx.shadowColor = "#00F0FF";
  ctx.shadowBlur = 5;
  ctx.fillRect(x + 10, y, 4, 4);
  ctx.fillRect(x + 8, y + 4, 8, 4);
  ctx.fillRect(x + 4, y + 8, 16, 4);
  ctx.fillRect(x, y + 12, 24, 4);
  ctx.fillRect(x, y + 16, 8, 4);
  ctx.fillRect(x + 16, y + 16, 8, 4);
  ctx.fillStyle = "#FF003C";
  ctx.shadowColor = "#FF003C";
  ctx.fillRect(x + 8, y + 20, 8, 4);
  ctx.shadowBlur = 0;
};

export const SpaceShooter: React.FC<SpaceShooterProps> = ({
  gameState,
  onStateChange,
  triggerReset,
  onUpdateScore,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<string>(gameState);
  const scoreRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const pathObjectsRef = useRef<Record<string, Path2D>>({});
  const cacheRef = useRef<{
    enemies: Record<string, HTMLCanvasElement>;
  }>({ enemies: {} });

  const bulletPool = useRef<Bullet[]>(
    Array.from({ length: 40 }, () => ({
      active: false,
      x: 0,
      y: 0,
      w: 4,
      h: 10,
      speed: 10,
    })),
  );
  const enemyPool = useRef<Enemy[]>(
    Array.from({ length: 30 }, () => ({
      active: false,
      x: 0,
      y: 0,
      w: 28,
      h: 28,
      speed: 0,
      vx: 0,
      type: "ram",
      motif: "",
      color: "",
      angle: 0,
    })),
  );
  const particlePool = useRef<Particle[]>(
    Array.from({ length: 150 }, () => ({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      color: "",
    })),
  );

  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const audio = new Audio("/yildizjam.wav");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audio.load();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (gameState === "playing") {
      if ("mediaSession" in navigator) {
        navigator.mediaSession.setActionHandler("play", () => audio.play());
        navigator.mediaSession.setActionHandler("pause", () => {});
      }
      audio.play().catch((e) => {
        if (e.name !== "AbortError") console.warn(e);
      });
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [gameState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const TARGET_FPS_IDLE = 15;
    const FRAME_MS_IDLE = 1000 / TARGET_FPS_IDLE;

    if (Object.keys(pathObjectsRef.current).length === 0) {
      pathObjectsRef.current["akrep"] = new Path2D(MOTIF_DATA.akrep.data);
      pathObjectsRef.current["suyolu"] = new Path2D(
        SUYOLU_POLYS.map(convertPolygonToPath).join(" "),
      );
    }

    const preRenderEnemy = (motifKey: string, color: string) => {
      const cacheKey = `${motifKey}-${color}`;
      if (cacheRef.current.enemies[cacheKey])
        return cacheRef.current.enemies[cacheKey];

      const motifInfo = MOTIF_DATA[motifKey as keyof typeof MOTIF_DATA];
      const pathData =
        motifInfo.type === "polygon"
          ? convertPolygonToPath(motifInfo.data)
          : motifInfo.data;
      const path = new Path2D(pathData);

      const eC = document.createElement("canvas");
      const pad = 30;
      eC.width = motifInfo.w + pad * 2;
      eC.height = motifInfo.h + pad * 2;
      const eCtx = eC.getContext("2d");

      if (eCtx) {
        eCtx.translate(pad, pad);
        eCtx.globalAlpha = 0.9;
        eCtx.fillStyle = color;
        eCtx.shadowColor = color;
        eCtx.shadowBlur = 15;
        eCtx.fill(path);

        eCtx.translate(motifInfo.w / 2, motifInfo.h / 2);
        eCtx.scale(0.35, 0.35);
        eCtx.translate(-motifInfo.w / 2, -motifInfo.h / 2);

        eCtx.globalAlpha = 1.0;
        eCtx.fillStyle = "#FFFFFF";
        eCtx.shadowBlur = 0;
        eCtx.fill(path);
      }

      cacheRef.current.enemies[cacheKey] = eC;
      return eC;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 200;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    if (starsRef.current.length === 0) {
      starsRef.current = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 1.5 + 0.1,
        size: Math.random() > 0.8 ? 2 : 1,
      }));
    }

    const player = {
      x: canvas.width / 2 - 12,
      y: canvas.height - 30,
      w: 24,
      h: 24,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (stateRef.current !== "playing") return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      player.x = Math.max(
        0,
        Math.min(
          (e.clientX - rect.left) * scaleX - player.w / 2,
          canvas.width - player.w,
        ),
      );
      player.y = Math.max(
        0,
        Math.min(
          (e.clientY - rect.top) * scaleY - player.h / 2,
          canvas.height - player.h,
        ),
      );
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (stateRef.current !== "playing") return;
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      player.x = Math.max(
        0,
        Math.min(
          (touch.clientX - rect.left) * scaleX - player.w / 2,
          canvas.width - player.w,
        ),
      );
      player.y = Math.max(
        0,
        Math.min(
          (touch.clientY - rect.top) * scaleY - player.h / 2,
          canvas.height - player.h,
        ),
      );
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    const spawnParticles = (x: number, y: number, color: string) => {
      const angles = [0, 45, 90, 135, 180, 225, 270, 315];
      let pIdx = 0;
      for (
        let i = 0;
        i < particlePool.current.length && pIdx < angles.length;
        i++
      ) {
        const p = particlePool.current[i];
        if (!p.active) {
          const rad = (angles[pIdx] * Math.PI) / 180;
          p.active = true;
          p.x = x;
          p.y = y;
          p.vx = Math.cos(rad) * 4;
          p.vy = Math.sin(rad) * 4;
          p.life = 1;
          p.color = color;
          pIdx++;
        }
      }
    };

    const loop = (now: number) => {
      if (stateRef.current !== "playing" && now - lastTime < FRAME_MS_IDLE) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ffffff";
      starsRef.current.forEach((star) => {
        star.y += star.speed * (stateRef.current === "playing" ? 2 : 0.5);
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        ctx.globalAlpha = Math.random() * 0.5 + 0.2;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });
      ctx.globalAlpha = 1;

      const isMobile = canvas.width < 768;
      const akrepObj = pathObjectsRef.current["akrep"];

      if (akrepObj) {
        const scale = isMobile ? 0.3 : 0.5;
        const cX = canvas.width / 2;
        const spacing = isMobile ? 350 : 500;
        const offset = (frameRef.current * 0.4) % spacing;

        for (let y = -spacing; y < canvas.height + spacing; y += spacing) {
          ctx.save();
          ctx.translate(cX, y + offset);
          ctx.scale(scale, scale);
          ctx.translate(-MOTIF_DATA.akrep.w / 2, -MOTIF_DATA.akrep.h / 2);

          ctx.strokeStyle = isMobile
            ? "rgba(230, 57, 70, 0.1)"
            : "rgba(230, 57, 70, 0.15)";
          ctx.lineWidth = 4 / scale;
          ctx.stroke(akrepObj);

          ctx.fillStyle = isMobile
            ? "rgba(230, 57, 70, 0.03)"
            : "rgba(230, 57, 70, 0.05)";
          ctx.fill(akrepObj);
          ctx.restore();
        }
      }

      const suyoluPath = pathObjectsRef.current["suyolu"];
      if (suyoluPath) {
        const motifW = 576.66;
        const motifH = 150.42;
        const bScale = isMobile ? 0.08 : 0.15;
        const stepY = motifH * bScale;
        const borderOffset = (frameRef.current * 1.5) % stepY;
        const paddingX = isMobile ? 5 : 15;

        ctx.fillStyle = isMobile
          ? "rgba(0, 240, 255, 0.08)"
          : "rgba(0, 240, 255, 0.15)";

        for (let y = -stepY; y < canvas.height + stepY; y += stepY) {
          ctx.save();
          ctx.translate(paddingX, y + borderOffset);
          ctx.scale(bScale, bScale);
          ctx.fill(suyoluPath);
          ctx.restore();

          ctx.save();
          ctx.translate(
            canvas.width - motifW * bScale - paddingX,
            y + borderOffset,
          );
          ctx.scale(bScale, bScale);
          ctx.fill(suyoluPath);
          ctx.restore();
        }
      }

      if (stateRef.current === "waiting") {
        ctx.fillStyle = "#00F0FF";
        ctx.shadowColor = "#00F0FF";
        ctx.shadowBlur = 10;
        ctx.font = 'bold 16px "Pixelify Sans", "font-pixel", sans-serif';
        ctx.textAlign = "center";
        ctx.fillText(
          "PRESS START TO BEGIN",
          canvas.width / 2,
          canvas.height / 2,
        );
        ctx.shadowBlur = 0;
        player.x = canvas.width / 2 - 12;
        player.y = canvas.height - 40;
        drawPlayer(ctx, player.x, player.y);
      } else if (stateRef.current === "playing") {
        const currentScore = scoreRef.current;
        const speedMultiplier = isMobile ? 0.6 : 1;
        const baseSpawnRate = isMobile ? 40 : 20;
        const spawnRate = Math.max(
          baseSpawnRate,
          50 - Math.floor(currentScore / 25),
        );
        const enemySpeedBoost = currentScore / 200;

        if (frameRef.current % 15 === 0) {
          for (let i = 0; i < bulletPool.current.length; i++) {
            const b = bulletPool.current[i];
            if (!b.active) {
              b.active = true;
              b.x = player.x + 10;
              b.y = player.y;
              break;
            }
          }
        }

        if (frameRef.current % spawnRate === 0) {
          const rand = Math.random();
          let type: "ram" | "meteor" | "weaver" = "ram";
          let motif = "kocboynuzu";
          let color = "#FF003C";

          if (rand > 0.7) {
            type = "meteor";
            motif = "pitrak";
            color = "#E76F51";
          } else if (rand > 0.4) {
            type = "weaver";
            motif = Math.random() > 0.5 ? "muska" : "yildiz";
            color = "#9D4EDD";
          } else {
            motif = Math.random() > 0.5 ? "kocboynuzu" : "elibelinde";
          }

          for (let i = 0; i < enemyPool.current.length; i++) {
            const e = enemyPool.current[i];
            if (!e.active) {
              e.active = true;
              e.x = Math.random() * (canvas.width - 28);
              e.y = -28;
              e.speed =
                type === "meteor"
                  ? Math.random() * 2 + 2.5 + enemySpeedBoost
                  : Math.random() * 1.5 + 1.2 + enemySpeedBoost;
              e.vx =
                type === "meteor"
                  ? Math.random() > 0.5
                    ? 1.5
                    : -1.5
                  : type === "ram"
                    ? Math.random() > 0.5
                      ? 0.5
                      : -0.5
                    : 3;
              e.type = type;
              e.motif = motif;
              e.color = color;
              e.angle = type === "weaver" ? Math.random() * Math.PI * 2 : 0;
              break;
            }
          }
        }

        drawPlayer(ctx, player.x, player.y);

        ctx.fillStyle = "#39FF14";
        ctx.shadowColor = "#39FF14";
        ctx.shadowBlur = 5;
        for (let i = 0; i < bulletPool.current.length; i++) {
          const b = bulletPool.current[i];
          if (!b.active) continue;
          b.y -= b.speed * (isMobile ? 0.8 : 1);
          ctx.fillRect(b.x, b.y, b.w, b.h);
          if (b.y < 0) b.active = false;
        }
        ctx.shadowBlur = 0;

        for (let i = 0; i < enemyPool.current.length; i++) {
          const e = enemyPool.current[i];
          if (!e.active) continue;

          if (e.type === "meteor") {
            e.y += e.speed * speedMultiplier;
            e.x += e.vx * speedMultiplier;
          } else if (e.type === "weaver") {
            e.y += e.speed * 0.8 * speedMultiplier;
            e.angle += 0.1;
            e.x += Math.sin(e.angle) * 3 * speedMultiplier;
          } else {
            e.y += e.speed * speedMultiplier;
            e.x += e.vx * speedMultiplier;
          }

          if (e.type !== "weaver" && (e.x <= 0 || e.x + e.w >= canvas.width)) {
            e.vx *= -1;
            e.x = Math.max(0, Math.min(e.x, canvas.width - e.w));
          }

          const eImg = preRenderEnemy(e.motif, e.color);
          const motifInfo = MOTIF_DATA[e.motif as keyof typeof MOTIF_DATA];
          const scale = Math.min(e.w / motifInfo.w, e.h / motifInfo.h);

          ctx.save();
          ctx.translate(e.x + e.w / 2, e.y + e.h / 2);
          if (e.angle) ctx.rotate(e.angle);
          ctx.scale(scale, scale);
          ctx.translate(-eImg.width / 2, -eImg.height / 2);
          ctx.drawImage(eImg, 0, 0);
          ctx.restore();

          if (
            player.x < e.x + e.w &&
            player.x + player.w > e.x &&
            player.y < e.y + e.h &&
            player.y + player.h > e.y
          ) {
            spawnParticles(player.x + 12, player.y + 12, "#00F0FF");
            onStateChange("gameover");
            onUpdateScore(scoreRef.current);
            break;
          }

          for (let j = 0; j < bulletPool.current.length; j++) {
            const b = bulletPool.current[j];
            if (!b.active) continue;
            if (
              b.x < e.x + e.w &&
              b.x + b.w > e.x &&
              b.y < e.y + e.h &&
              b.y + b.h > e.y
            ) {
              const particleColor =
                e.type === "meteor"
                  ? "#E76F51"
                  : e.type === "weaver"
                    ? "#9D4EDD"
                    : "#FF003C";
              spawnParticles(e.x + 14, e.y + 14, particleColor);
              e.active = false;
              b.active = false;
              scoreRef.current += 10;
              break;
            }
          }

          if (e.y > canvas.height) e.active = false;
        }

        for (let i = 0; i < particlePool.current.length; i++) {
          const p = particlePool.current[i];
          if (!p.active) continue;
          p.x += p.vx * speedMultiplier;
          p.y += p.vy * speedMultiplier;
          p.life -= 0.05 * speedMultiplier;
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 5;
          ctx.fillRect(p.x, p.y, 2, 2);
          if (p.life <= 0) p.active = false;
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#FFFFFF";
        ctx.font = '12px "Pixelify Sans", "font-pixel", sans-serif';
        ctx.textAlign = "left";
        ctx.fillText(`SCORE: ${scoreRef.current}`, 10, 20);
      } else if (stateRef.current === "gameover") {
        ctx.fillStyle = "#FF003C";
        ctx.shadowColor = "#FF003C";
        ctx.shadowBlur = 15;
        ctx.font = 'bold 24px "Pixelify Sans", "font-pixel", sans-serif';
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 10);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowBlur = 5;
        ctx.font = 'bold 14px "Pixelify Sans", "font-pixel", sans-serif';
        ctx.fillText(
          `FINAL SCORE: ${scoreRef.current}`,
          canvas.width / 2,
          canvas.height / 2 + 20,
        );
        ctx.shadowBlur = 0;
      }

      frameRef.current++;
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", resize);
    };
  }, [triggerReset, onStateChange, onUpdateScore]);

  useEffect(() => {
    scoreRef.current = 0;
    for (let i = 0; i < bulletPool.current.length; i++)
      bulletPool.current[i].active = false;
    for (let i = 0; i < enemyPool.current.length; i++)
      enemyPool.current[i].active = false;
    for (let i = 0; i < particlePool.current.length; i++)
      particlePool.current[i].active = false;
  }, [triggerReset]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full border border-brand-main/30 rounded cursor-crosshair bg-black/60 shadow-[0_0_15px_rgba(0,240,255,0.05)] block touch-none"
      style={{ minHeight: "200px" }}
    />
  );
};
