"use client";

import { useEffect, useRef } from "react";

export function TrophyVideo({
  variant,
}: {
  variant: "gold" | "silver" | "bronze";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let isVisible = false;
    let isActive = !document.hidden;

    const cancelDraw = () => {
      if (animId !== null) {
        if ("cancelVideoFrameCallback" in video) {
          (video as any).cancelVideoFrameCallback(animId);
        } else {
          cancelAnimationFrame(animId);
        }
        animId = null;
      }
    };

    const triggerDraw = () => {
      if (!isVisible || !isActive || video.paused || video.ended) return;
      cancelDraw();
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

    const startPlayback = () => {
      if (isVisible && isActive) {
        video
          .play()
          .then(() => {
            triggerDraw();
          })
          .catch((e) => {
            if (e.name !== "AbortError")
              console.error("Video Playback Error:", e);
          });
      }
    };

    function handleVisibilityChange() {
      isActive = !document.hidden;
      if (isActive) startPlayback();
      else video.pause();
    }

    video.addEventListener("canplay", startPlayback);
    video.addEventListener("playing", triggerDraw);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    video.src = `/models/${variant}.webm`;
    video.load();

    if (video.readyState >= 3) {
      startPlayback();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible) startPlayback();
        else video.pause();
      },
      { threshold: 0.1 },
    );
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.removeEventListener("canplay", startPlayback);
      video.removeEventListener("playing", triggerDraw);
      cancelDraw();
      video.pause();
      video.src = "";
      video.load();
    };
  }, [variant]);

  return (
    <div className="relative w-full h-full" suppressHydrationWarning>
      <canvas
        ref={canvasRef}
        width={256}
        height={256}
        onContextMenu={(e) => e.preventDefault()}
        className="w-full h-full object-contain pointer-events-none select-none touch-none scale-[1.2]"
        style={{
          filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.4))",
          opacity: 0,
          transition: "opacity 0.5s ease",
        }}
      />
      <div className="absolute inset-0 z-30 bg-transparent pointer-events-auto" />
    </div>
  );
}
