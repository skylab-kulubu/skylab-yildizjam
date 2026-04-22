"use client";

import React, { useState, useEffect } from "react";
import Card from "./Card";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasEnded: boolean;
}

interface CountdownTimerProps {
  targetDate?: Date;
  cornerColor?: string;
  glowColor?: string;
  separatorColor?: string;
}

const DEFAULT_TARGET = new Date("2026-05-08T00:00:00");

const calculateTimeLeft = (target: Date, current: Date): TimeLeft => {
  const difference = target.getTime() - current.getTime();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, hasEnded: true };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    hasEnded: false,
  };
};

const TimerUnit = ({
  value,
  label,
  isPlaceholder = false,
  cornerColor,
  glowColor,
}: {
  value?: number;
  label: string;
  isPlaceholder?: boolean;
  cornerColor: string;
  glowColor: string;
}) => (
  <div className="flex flex-col items-center gap-3">
    <div className="w-14 h-14 sm:w-20 sm:h-20">
      <Card
        noPadding
        variant="solid"
        pixelSize={2}
        cornerColor={isPlaceholder ? "#1e293b" : cornerColor}
        glowColor={isPlaceholder ? "transparent" : glowColor}
        contentClassName="relative"
      >
        <span
          className={`absolute bottom-1 right-2 sm:bottom-1.5 sm:right-2.5 font-display text-xl sm:text-3xl text-white leading-none transition-all duration-300 ${
            isPlaceholder
              ? "opacity-10"
              : "group-hover:drop-shadow-[0_0_8px_white]"
          }`}
          style={{
            textShadow: isPlaceholder ? "none" : `0 0 8px ${cornerColor}`,
          }}
        >
          {isPlaceholder ? "00" : String(value).padStart(2, "0")}
        </span>
      </Card>
    </div>
    <span className="font-pixel text-[8px] uppercase tracking-widest text-slate-500">
      {label}
    </span>
  </div>
);

const Separator = ({
  isPlaceholder = false,
  color,
}: {
  isPlaceholder?: boolean;
  color: string;
}) => (
  <div className="flex items-center justify-center h-14 sm:h-20">
    <span
      className={`font-display text-xl sm:text-2xl ${isPlaceholder ? "text-white/20" : "animate-pulse"}`}
      style={{
        color: isPlaceholder
          ? undefined
          : `color-mix(in srgb, ${color} 70%, transparent)`,
        filter: isPlaceholder
          ? "none"
          : `drop-shadow(0 0 5px color-mix(in srgb, ${color} 50%, transparent))`,
      }}
    >
      :
    </span>
  </div>
);

export default function CountdownTimer({
  targetDate = DEFAULT_TARGET,
  glowColor = "var(--color-brand-glow)",
  cornerColor = "color-mix(in srgb, var(--color-brand-glow) 80%, transparent)",
  separatorColor = "var(--color-brand-action)",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTimeLeft(calculateTimeLeft(targetDate, new Date()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate.getTime()]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[100px] sm:min-h-[120px] py-4">
      {!timeLeft ? (
        <div className="flex items-start justify-center gap-2 sm:gap-4 opacity-50 grayscale transition-opacity duration-1000">
          <TimerUnit
            label="GÜN"
            isPlaceholder
            cornerColor={cornerColor}
            glowColor={glowColor}
          />
          <Separator isPlaceholder color={separatorColor} />
          <TimerUnit
            label="SAAT"
            isPlaceholder
            cornerColor={cornerColor}
            glowColor={glowColor}
          />
          <Separator isPlaceholder color={separatorColor} />
          <TimerUnit
            label="DAKİKA"
            isPlaceholder
            cornerColor={cornerColor}
            glowColor={glowColor}
          />
          <Separator isPlaceholder color={separatorColor} />
          <TimerUnit
            label="SANİYE"
            isPlaceholder
            cornerColor={cornerColor}
            glowColor={glowColor}
          />
        </div>
      ) : (
        !timeLeft.hasEnded && (
          <div className="flex items-start justify-center gap-2 sm:gap-4">
            <TimerUnit
              value={timeLeft.days}
              label="GÜN"
              cornerColor={cornerColor}
              glowColor={glowColor}
            />
            <Separator color={separatorColor} />
            <TimerUnit
              value={timeLeft.hours}
              label="SAAT"
              cornerColor={cornerColor}
              glowColor={glowColor}
            />
            <Separator color={separatorColor} />
            <TimerUnit
              value={timeLeft.minutes}
              label="DAKİKA"
              cornerColor={cornerColor}
              glowColor={glowColor}
            />
            <Separator color={separatorColor} />
            <TimerUnit
              value={timeLeft.seconds}
              label="SANİYE"
              cornerColor={cornerColor}
              glowColor={glowColor}
            />
          </div>
        )
      )}
    </div>
  );
}
