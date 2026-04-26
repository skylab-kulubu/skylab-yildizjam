"use client";

import Card from "./Card";
import { useCountdown } from "@/hooks/useCountdown";

interface CountdownTimerProps {
  targetDate?: Date;
  cornerColor?: string;
  glowColor?: string;
  separatorColor?: string;
}

const TimerUnit = ({
  value,
  label,
  cornerColor,
  glowColor,
}: {
  value: number;
  label: string;
  cornerColor: string;
  glowColor: string;
}) => (
  <div className="flex flex-col items-center gap-3">
    <div className="w-14 h-14 sm:w-20 sm:h-20">
      <Card
        noPadding
        variant="solid"
        pixelSize={2}
        cornerColor={cornerColor}
        glowColor={glowColor}
        contentClassName="relative"
      >
        <span
          suppressHydrationWarning
          className="absolute bottom-1 right-2 sm:bottom-1.5 sm:right-2.5 font-display text-2xl sm:text-3xl text-white leading-none transition-all duration-300 group-hover:drop-shadow-[0_0_8px_white]"
          style={{ textShadow: `0 0 8px ${cornerColor}` }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </Card>
    </div>
    <span className="font-pixel text-[10px] uppercase tracking-widest text-slate-500">
      {label}
    </span>
  </div>
);

const Separator = ({ color }: { color: string }) => (
  <div className="flex items-center justify-center h-14 sm:h-20">
    <span
      className="font-display text-xl sm:text-2xl animate-pulse"
      style={{
        color: `color-mix(in srgb, ${color} 70%, transparent)`,
        filter: `drop-shadow(0 0 5px color-mix(in srgb, ${color} 50%, transparent))`,
      }}
    >
      :
    </span>
  </div>
);

export default function CountdownTimer({
  glowColor = "var(--color-brand-glow)",
  cornerColor = "color-mix(in srgb, var(--color-brand-glow) 80%, transparent)",
  separatorColor = "var(--color-brand-action)",
}: CountdownTimerProps) {
  const timeLeft = useCountdown();

  if (timeLeft.hasEnded) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full py-4">
      <div className="flex items-start justify-center gap-2 sm:gap-4">
        <TimerUnit value={timeLeft.days} label="GÜN" cornerColor={cornerColor} glowColor={glowColor} />
        <Separator color={separatorColor} />
        <TimerUnit value={timeLeft.hours} label="SAAT" cornerColor={cornerColor} glowColor={glowColor} />
        <Separator color={separatorColor} />
        <TimerUnit value={timeLeft.minutes} label="DAKİKA" cornerColor={cornerColor} glowColor={glowColor} />
        <Separator color={separatorColor} />
        <TimerUnit value={timeLeft.seconds} label="SANİYE" cornerColor={cornerColor} glowColor={glowColor} />
      </div>
    </div>
  );
}
