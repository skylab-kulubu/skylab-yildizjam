"use client";

import { useEffect, useRef, useState } from "react";

export default function JarVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!isMounted || !canvas) return;

    const video = document.createElement("video");
    video.src = "/models/jar.webm";
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

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
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
      triggerDraw();
    };

    const handleMetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };

    const handleCanPlay = () => {
      video.play().catch((e) => {
        if (e.name !== "AbortError") console.error(e);
      });
      triggerDraw();
    };

    const handleVisibilityChange = () => {
      isActive = !document.hidden;
      if (isActive) triggerDraw();
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("canplay", handleCanPlay);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible) triggerDraw();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("canplay", handleCanPlay);

      if ("cancelVideoFrameCallback" in video) {
        (video as any).cancelVideoFrameCallback(animId);
      } else {
        cancelAnimationFrame(animId);
      }

      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [isMounted]);

  if (!isMounted) {
    return <div className="w-full h-full" />;
  }

  return (
    <div className="relative w-full h-full" suppressHydrationWarning>
      <canvas
        ref={canvasRef}
        onContextMenu={(e) => e.preventDefault()}
        className="w-full h-full object-contain pointer-events-none select-none touch-none"
        style={{
          mixBlendMode: "normal",
          filter: "drop-shadow(0 0 20px rgba(0,0,0,0.1))",
        }}
      />
      <div className="absolute inset-0 z-30 bg-transparent pointer-events-auto" />
    </div>
  );
}
