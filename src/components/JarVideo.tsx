"use client";

import { useEffect, useRef } from "react";

export default function JarVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const video = document.createElement("video");
    video.src = "/models/jar.webm";
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number | undefined;
    let isVisible = false;
    let isActive = !document.hidden;

    const triggerDraw = () => {
      if (!isVisible || !isActive || video.paused || video.ended) return;
      if ("requestVideoFrameCallback" in video) {
        animId = (video as any).requestVideoFrameCallback(draw);
      } else {
        animId = requestAnimationFrame(draw);
      }
    };

    const draw = () => {
      if (!isVisible || !isActive || video.paused || video.ended) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      if (canvas.style.opacity !== "1") canvas.style.opacity = "1";
      triggerDraw();
    };

    const handleCanPlay = () => {
      video.play().catch((e) => {
        if (e.name !== "AbortError") console.error(e);
      });
      triggerDraw();
    };

    const handleVisibilityChange = () => {
      isActive = !document.hidden;
      if (isActive && isVisible) {
        video.play().catch((e) => {
          if (e.name !== "AbortError") console.error(e);
        });
        triggerDraw();
      } else {
        video.pause();
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible && isActive) {
          video.play().catch((e) => {
            if (e.name !== "AbortError") console.error(e);
          });
          triggerDraw();
        } else {
          video.pause();
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.removeEventListener("canplay", handleCanPlay);

      if (animId !== undefined) {
        if ("cancelVideoFrameCallback" in video) {
          (video as any).cancelVideoFrameCallback(animId);
        } else {
          cancelAnimationFrame(animId);
        }
      }

      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return (
    <div className="relative w-full h-full" suppressHydrationWarning>
      <canvas
        ref={canvasRef}
        width={512}
        height={512}
        onContextMenu={(e) => e.preventDefault()}
        className="w-full h-full object-contain pointer-events-none select-none touch-none"
        style={{
          mixBlendMode: "normal",
          filter: "drop-shadow(0 0 20px rgba(0,0,0,0.1))",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      />
      <div className="absolute inset-0 z-30 bg-transparent pointer-events-auto" />
    </div>
  );
}
