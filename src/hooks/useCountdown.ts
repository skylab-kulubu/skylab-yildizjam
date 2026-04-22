import { useState, useEffect, useCallback } from "react";

const EVENT_START_DATE = new Date("2026-05-08T00:00:00");

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasEnded: boolean;
}

export const useCountdown = (targetDate: Date = EVENT_START_DATE) => {
  const [isMounted, setIsMounted] = useState(false);

  const calculate = useCallback(() => {
    const difference = targetDate.getTime() - new Date().getTime();

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
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculate());

  useEffect(() => {
    setIsMounted(true);

    const interval = setInterval(() => {
      setTimeLeft(calculate());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculate]);

  return { ...timeLeft, isMounted };
};
