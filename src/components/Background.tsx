"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface BackgroundProps {
  seed?: number;
  density?: number;
}

const TWO_PI = Math.PI * 2;
const BG_FILL = "#080A1A";
const PIXEL_SCALE = 4;

const STAR_FADE_IN_DURATION = 1500;
const BUFFER_FADE_IN_DURATION = 2500;
const BUFFER_FADE_IN_DELAY = 1000;

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const easeOutQuad = (t: number) => t * (2 - t);

interface Star {
  x: number;
  y: number;
  size: number;
  isCross: boolean;
  opacity: number;
  speed: number;
  phase: number;
  color: string;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  parallax: number;
}

interface Galaxy {
  x: number;
  y: number;
  radius: number;
  angle: number;
  coreColor: string;
  edgeColor: string;
  parallax: number;
}

interface Planet {
  x: number;
  y: number;
  radius: number;
  baseColor: string;
  shadowColor: string;
  hasRing: boolean;
  ringAngle: number;
  parallax: number;
}

interface Spaceship {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  phase: number;
  scale: number;
  parallax: number;
}

interface Asteroid {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  parallax: number;
  rot: number;
  vRot: number;
  isGamepad: boolean;
}

export default function Background({
  seed = 2026,
  density = 1.0,
}: BackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufferRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const startTimeRef = useRef(0);

  const dataRef = useRef<{
    stars: Star[];
    nebulas: Nebula[];
    galaxies: Galaxy[];
    planets: Planet[];
    spaceships: Spaceship[];
    asteroids: Asteroid[];
    width: number;
    height: number;
  }>({
    stars: [],
    nebulas: [],
    galaxies: [],
    planets: [],
    spaceships: [],
    asteroids: [],
    width: 0,
    height: 0,
  });

  const buildScene = useCallback(
    (width: number, height: number, currentSeed: number) => {
      const d = dataRef.current;
      d.width = width;
      d.height = height;

      const randStars = seededRandom(currentSeed);
      const randStatic = seededRandom(currentSeed + 999);

      const starWrapArea = height * 2.5;
      const area = (width * starWrapArea) / 1000000;
      const isMobile = width < 768;

      const getSegY = (index: number, total: number) => {
        const seg = starWrapArea / Math.max(1, total);
        return index * seg + randStatic() * seg * 0.8;
      };

      const getStaggeredX = (index: number) => {
        const isLeft = index % 2 === 0;
        return (
          (isLeft ? 0.05 + randStatic() * 0.4 : 0.55 + randStatic() * 0.4) *
          width
        );
      };

      const count = (350 * density * Math.max(1, area)) | 0;
      d.stars = [];
      const colors = ["#FFFFFF", "#00FFFF", "#FF0080", "#FFC107", "#8B5CF6"];

      for (let i = 0; i < count; i++) {
        const isCross = randStars() > 0.94;
        d.stars.push({
          x: randStars() * width,
          y: randStars() * starWrapArea,
          size: isCross ? 2 : randStars() > 0.6 ? 1 : 2,
          isCross,
          opacity: 0.3 + randStars() * 0.7,
          speed: 1.5 + randStars() * 2.5,
          phase: randStars() * TWO_PI,
          color: colors[Math.floor(randStars() * colors.length)],
        });
      }

      const nebulaCount = isMobile ? 2 : 4;
      const nebulaColors = [
        "rgba(139, 92, 246, 0.08)",
        "rgba(255, 0, 128, 0.06)",
        "rgba(0, 255, 255, 0.05)",
        "rgba(63, 81, 181, 0.08)",
      ];
      d.nebulas = Array.from({ length: nebulaCount }, (_, i) => ({
        x: getStaggeredX(i),
        y: getSegY(i, nebulaCount),
        radius: (isMobile ? 150 : 300) + randStatic() * 400,
        color: nebulaColors[Math.floor(randStatic() * nebulaColors.length)],
        parallax: 0.02 + randStatic() * 0.03,
      }));

      const galaxyCount = isMobile ? 2 : 3;
      const galaxyCores = [
        "rgba(139, 92, 246, 0.6)",
        "rgba(255, 0, 128, 0.5)",
        "rgba(0, 255, 255, 0.5)",
        "rgba(255, 193, 7, 0.4)",
      ];
      const galaxyEdges = [
        "rgba(0, 255, 255, 0.15)",
        "rgba(139, 92, 246, 0.1)",
        "rgba(255, 0, 128, 0.1)",
        "rgba(255, 87, 34, 0.08)",
      ];
      d.galaxies = Array.from({ length: galaxyCount }, (_, i) => ({
        x: getStaggeredX(i + 1),
        y: getSegY(i, galaxyCount),
        radius: (isMobile ? 100 : 200) + randStatic() * 200,
        angle: randStatic() * TWO_PI,
        coreColor: galaxyCores[Math.floor(randStatic() * galaxyCores.length)],
        edgeColor: galaxyEdges[Math.floor(randStatic() * galaxyEdges.length)],
        parallax: 0.04 + randStatic() * 0.04,
      }));

      const planetCount = isMobile ? 3 : 5;
      const planetBases = [
        "#5080FF",
        "#FFC107",
        "#FF5722",
        "#4CAF50",
        "#9C27B0",
        "#E0E0E0",
      ];
      const planetShadows = [
        "#102060",
        "#804000",
        "#601000",
        "#104010",
        "#300040",
        "#404040",
      ];
      d.planets = Array.from({ length: planetCount }, (_, i) => {
        const pIdx = Math.floor(randStatic() * planetBases.length);
        return {
          x: getStaggeredX(i),
          y: getSegY(i, planetCount),
          radius: (isMobile ? 15 : 20) + randStatic() * 40,
          baseColor: planetBases[pIdx],
          shadowColor: planetShadows[pIdx],
          hasRing: randStatic() > 0.65,
          ringAngle: randStatic() * Math.PI,
          parallax: 0.1 + randStatic() * 0.2,
        };
      });

      const shipColors = [
        "#FF0055",
        "#00FFFF",
        "#FFD700",
        "#00FF00",
        "#FF8800",
      ];
      const shipCount = isMobile ? 3 : 6;
      d.spaceships = Array.from({ length: shipCount }, (_, i) => {
        const isGoingRight = randStatic() > 0.5;
        return {
          x: randStatic() * width,
          y: getSegY(i, shipCount),
          vx: (isGoingRight ? 1 : -1) * (0.3 + randStatic() * 0.8),
          vy: (randStatic() - 0.5) * 0.2,
          color: shipColors[Math.floor(randStatic() * shipColors.length)],
          phase: randStatic() * TWO_PI,
          scale: 0.8 + randStatic() * 0.6,
          parallax: 0.2 + randStatic() * 0.4,
        };
      });

      const asteroidCount = isMobile ? 10 : 20;
      d.asteroids = Array.from({ length: asteroidCount }, (_, i) => ({
        x: randStatic() * width,
        y: getSegY(i, asteroidCount),
        size: 1 + Math.floor(randStatic() * 3),
        vx: (randStatic() - 0.5) * 0.6,
        vy: 0.2 + randStatic() * 0.8,
        parallax: 0.15 + randStatic() * 0.3,
        rot: randStatic() * TWO_PI,
        vRot: (randStatic() - 0.5) * 0.05,
        isGamepad: randStatic() > 0.9,
      }));
    },
    [density],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    if (!bufferRef.current)
      bufferRef.current = document.createElement("canvas");
    const buffer = bufferRef.current;
    const bCtx = buffer.getContext("2d", { alpha: true });
    if (!bCtx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let alive = true;

    const clientSeed =
      seed === 2026 ? Math.floor(Math.random() * 1000000) : seed;

    const doResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buffer.width = Math.ceil(rect.width / PIXEL_SCALE);
      buffer.height = Math.ceil(rect.height / PIXEL_SCALE);
      buildScene(rect.width, rect.height, clientSeed);
    };

    window.addEventListener("resize", doResize);
    doResize();

    startTimeRef.current = performance.now();

    const render = (now: number) => {
      if (!alive) return;
      const t = now * 0.001;
      const d = dataRef.current;
      const scrollY = window.scrollY;
      const viewW = canvas.width / dpr;
      const viewH = canvas.height / dpr;
      const drawScale = 1 / PIXEL_SCALE;
      const starWrapArea = d.height * 2.5;

      const elapsed = now - startTimeRef.current;

      ctx.fillStyle = BG_FILL;
      ctx.fillRect(0, 0, viewW, viewH);

      const starParallax = scrollY * 0.15;
      const starProgress = Math.min(1, elapsed / STAR_FADE_IN_DURATION);
      const easedStarProgress = easeOutQuad(starProgress);

      for (const star of d.stars) {
        const alpha =
          star.opacity *
          (0.4 + 0.6 * Math.sin(t * star.speed + star.phase)) *
          easedStarProgress;
        let sy = (star.y - starParallax) % starWrapArea;
        if (sy < 0) sy += starWrapArea;
        if (sy > viewH + 10) continue;

        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = star.color;
        if (star.isCross) {
          ctx.fillRect(Math.floor(star.x - 1), Math.floor(sy - 3), 2, 6);
          ctx.fillRect(Math.floor(star.x - 3), Math.floor(sy - 1), 6, 2);
        } else {
          ctx.fillRect(
            Math.floor(star.x),
            Math.floor(sy),
            star.size,
            star.size,
          );
        }
      }
      ctx.globalAlpha = 1.0;

      bCtx.clearRect(0, 0, buffer.width, buffer.height);
      bCtx.imageSmoothingEnabled = false;

      for (const n of d.nebulas) {
        let ny = (n.y - scrollY * n.parallax) % starWrapArea;
        if (ny < 0) ny += starWrapArea;
        if (ny > viewH + n.radius || ny < -n.radius) continue;

        bCtx.save();
        bCtx.translate(Math.floor(n.x * drawScale), Math.floor(ny * drawScale));
        const v_rad = n.radius * drawScale;
        const grad = bCtx.createRadialGradient(0, 0, 0, 0, 0, v_rad);
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, "transparent");
        bCtx.fillStyle = grad;
        bCtx.beginPath();
        bCtx.arc(0, 0, Math.floor(v_rad), 0, TWO_PI);
        bCtx.fill();
        bCtx.restore();
      }

      for (const g of d.galaxies) {
        let gy = (g.y - scrollY * g.parallax) % starWrapArea;
        if (gy < 0) gy += starWrapArea;
        if (gy > viewH + g.radius || gy < -g.radius) continue;

        bCtx.save();
        bCtx.translate(Math.floor(g.x * drawScale), Math.floor(gy * drawScale));
        bCtx.rotate(g.angle + t * 0.015);
        bCtx.scale(1, 0.35);
        const v_radius = g.radius * drawScale;
        const coreGrad = bCtx.createRadialGradient(
          0,
          0,
          0,
          0,
          0,
          v_radius * 0.4,
        );
        coreGrad.addColorStop(0, g.coreColor);
        coreGrad.addColorStop(1, "transparent");
        bCtx.fillStyle = coreGrad;
        bCtx.beginPath();
        bCtx.arc(0, 0, Math.floor(v_radius), 0, TWO_PI);
        bCtx.fill();
        bCtx.restore();
      }

      for (const p of d.planets) {
        let py = (p.y - scrollY * p.parallax) % starWrapArea;
        if (py < 0) py += starWrapArea;
        if (py > viewH + p.radius * 3 || py < -p.radius * 3) continue;

        bCtx.save();
        bCtx.translate(Math.floor(p.x * drawScale), Math.floor(py * drawScale));
        const v_rad = p.radius * drawScale;
        const pGrad = bCtx.createLinearGradient(-v_rad, -v_rad, v_rad, v_rad);
        pGrad.addColorStop(0, p.baseColor);
        pGrad.addColorStop(0.5, p.baseColor);
        pGrad.addColorStop(0.52, p.shadowColor);
        pGrad.addColorStop(1, p.shadowColor);
        bCtx.fillStyle = pGrad;
        bCtx.beginPath();
        bCtx.arc(0, 0, Math.floor(v_rad), 0, TWO_PI);
        bCtx.fill();
        if (p.hasRing) {
          bCtx.rotate(p.ringAngle);
          bCtx.scale(1, 0.2);
          bCtx.beginPath();
          bCtx.arc(0, 0, Math.floor(v_rad * 2.5), 0, TWO_PI);
          bCtx.lineWidth = 1;
          bCtx.strokeStyle = "rgba(255,255,255,0.25)";
          bCtx.stroke();
        }
        bCtx.restore();
      }

      for (const ast of d.asteroids) {
        ast.x += ast.vx;
        ast.y += ast.vy;
        ast.rot += ast.vRot;

        if (ast.x > viewW + 50) ast.x = -50;
        if (ast.x < -50) ast.x = viewW + 50;

        let sy = (ast.y - scrollY * ast.parallax) % starWrapArea;
        if (sy < 0) sy += starWrapArea;
        if (sy > viewH + 20 || sy < -20) continue;

        bCtx.save();
        bCtx.translate(
          Math.floor(ast.x * drawScale),
          Math.floor(sy * drawScale),
        );
        bCtx.rotate(ast.rot);

        if (ast.isGamepad) {
          bCtx.fillStyle = "rgba(100, 110, 140, 0.9)";
          bCtx.fillRect(-4, -2, 8, 4);
          bCtx.fillRect(-5, -1, 1, 3);
          bCtx.fillRect(4, -1, 1, 3);

          bCtx.fillStyle = "#FF0080";
          bCtx.fillRect(-3, 0, 3, 1);
          bCtx.fillRect(-2, -1, 1, 3);

          bCtx.fillStyle = "#00FFFF";
          bCtx.fillRect(1, 0, 1, 1);
          bCtx.fillRect(2, -1, 1, 1);
        } else {
          bCtx.fillStyle = "rgba(100, 100, 110, 0.8)";
          if (ast.size === 1) {
            bCtx.fillRect(0, 0, 1, 1);
          } else if (ast.size === 2) {
            bCtx.fillRect(-1, -1, 2, 2);
            bCtx.fillStyle = "rgba(70, 70, 80, 0.8)";
            bCtx.fillRect(0, 0, 1, 1);
          } else {
            bCtx.fillRect(-1, -1, 3, 2);
            bCtx.fillRect(0, 1, 1, 1);
          }
        }
        bCtx.restore();
      }

      for (const ship of d.spaceships) {
        ship.x += ship.vx;
        const currentY = ship.y + ship.vy + Math.cos(t * 1.5 + ship.phase) * 15;

        if (ship.x > viewW + 100) ship.x = -100;
        if (ship.x < -100) ship.x = viewW + 100;

        let sy = (currentY - scrollY * ship.parallax) % starWrapArea;
        if (sy < 0) sy += starWrapArea;
        if (sy > viewH + 50 || sy < -50) continue;

        bCtx.save();
        bCtx.translate(
          Math.floor(ship.x * drawScale),
          Math.floor(sy * drawScale),
        );

        const angle = Math.atan2(ship.vy, ship.vx);
        bCtx.rotate(angle);
        bCtx.scale(ship.scale, ship.scale);

        bCtx.fillStyle = ship.color;

        bCtx.fillRect(-2, -1, 4, 3);
        bCtx.fillRect(2, 0, 2, 1);
        bCtx.fillRect(-2, -2, 2, 1);
        bCtx.fillRect(-2, 2, 2, 1);

        bCtx.fillStyle = "#FFFFFF";
        bCtx.fillRect(0, 0, 1, 1);

        if (Math.sin(t * 30 + ship.phase) > 0) {
          bCtx.fillStyle = "#FF3300";
          bCtx.fillRect(-4, 0, 2, 1);
        } else {
          bCtx.fillStyle = "#FFCC00";
          bCtx.fillRect(-3, 0, 1, 1);
        }

        bCtx.restore();
      }

      const bufferProgress = Math.min(
        1,
        Math.max(0, (elapsed - BUFFER_FADE_IN_DELAY) / BUFFER_FADE_IN_DURATION),
      );
      const easedBufferProgress = easeOutQuad(bufferProgress);

      ctx.imageSmoothingEnabled = false;
      ctx.globalAlpha = easedBufferProgress;
      ctx.drawImage(
        buffer,
        0,
        0,
        buffer.width,
        buffer.height,
        0,
        0,
        viewW,
        viewH,
      );
      ctx.globalAlpha = 1.0;

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", doResize);
    };
  }, [buildScene, seed]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#080A1A]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-0"
      />
      <div className="absolute inset-0 opacity-[0.12] z-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#00FFFF"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#080A1A]/40 to-[#080A1A] z-20" />
    </motion.div>
  );
}
