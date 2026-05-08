"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import PageSection from "./PageSection";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { SCHEDULE_MAY_8, ScheduleItem } from "@/lib/schedule";

function parseMinutes(t: string): number {
  const [h, m] = t.trim().split(".").map(Number);
  return h * 60 + (m || 0);
}

function isCurrentSession(
  item: ScheduleItem,
  index: number,
  items: ScheduleItem[],
): boolean {
  const now = new Date();
  if (now.getMonth() !== 4 || now.getDate() !== 8) return false;

  const parts = item.time.split("–");
  const start = parseMinutes(parts[0]);
  const end =
    parts.length > 1
      ? parseMinutes(parts[1])
      : index + 1 < items.length
        ? parseMinutes(items[index + 1].time.split("–")[0])
        : start + 60;

  const current = now.getHours() * 60 + now.getMinutes();
  return current >= start && current < end;
}

function SpecialRow({ item }: { item: ScheduleItem }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative flex items-center gap-4 px-6 py-4"
    >
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
      <div className="flex items-center gap-3 shrink-0">
        <span
          className="font-pixel text-[9px] tracking-widest opacity-70"
          style={{ color: "var(--color-brand-reward)" }}
        >
          {item.time}
        </span>
        <span
          className="font-display font-bold text-xs sm:text-sm tracking-[0.3em] uppercase"
          style={{
            color: "var(--color-brand-reward)",
            textShadow:
              "0 0 24px color-mix(in srgb, var(--color-brand-reward) 50%, transparent)",
          }}
        >
          {item.title}
        </span>
      </div>
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
    </motion.div>
  );
}

function SessionRow({
  item,
  isLast,
  isLive,
}: {
  item: ScheduleItem;
  isLast: boolean;
  isLive: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`group relative flex flex-col sm:flex-row sm:items-stretch transition-colors duration-300 ${
        !isLast ? "border-b border-white/6" : ""
      } ${isLive ? "bg-white/4" : "hover:bg-white/2"}`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-0.75 rounded-r-full transition-all duration-500 ${
          isLive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
        }`}
        style={{
          background: isLive
            ? "var(--color-brand-action)"
            : `linear-gradient(to bottom, var(--color-brand-glow), var(--color-brand-action))`,
          boxShadow: isLive ? "0 0 10px var(--color-brand-action)" : "none",
        }}
      />

      <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-2 px-5 sm:px-6 pt-4 pb-2 sm:py-5 sm:w-36 shrink-0 sm:border-r sm:border-white/6">
        <span
          className="font-pixel text-[10px] sm:text-[11px] tracking-widest leading-none"
          style={{ color: "var(--color-brand-glow)" }}
        >
          {item.time}
        </span>

        {isLive && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
              style={{ background: "var(--color-brand-action)" }}
            />
            <span
              className="font-pixel text-[8px] tracking-widest uppercase"
              style={{ color: "var(--color-brand-action)" }}
            >
              CANLI
            </span>
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center flex-1 px-5 sm:px-0 pb-4 pt-1 sm:py-5 gap-2 sm:gap-0">
        <div className="flex flex-col gap-0.5 sm:w-52 shrink-0 sm:pl-6 sm:pr-4">
          {item.speakers.map((speaker, i) => (
            <span
              key={i}
              className="font-display font-bold text-[12px] sm:text-[13px] tracking-wider uppercase leading-snug"
              style={{ color: "var(--color-brand-action)" }}
            >
              {speaker}
            </span>
          ))}
        </div>

        {item.title && (
          <div className="flex items-start gap-2 flex-1 sm:pl-2 sm:border-l sm:border-white/6 sm:ml-0">
            <span
              className="hidden sm:block font-pixel text-[8px] leading-6 shrink-0 select-none"
              style={{ color: "var(--color-brand-glow)", opacity: 0.3 }}
            >
              //
            </span>
            <p className="font-tech text-[11px] sm:text-[12px] text-white/50 tracking-wide leading-5 sm:leading-6 sm:pl-2">
              {item.title}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Schedule() {
  const [liveIndex, setLiveIndex] = useState(-1);

  useEffect(() => {
    const update = () => {
      const idx = SCHEDULE_MAY_8.findIndex((item, i) =>
        isCurrentSession(item, i, SCHEDULE_MAY_8),
      );
      setLiveIndex(idx);
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <PageSection
      id="program"
      tag="8 MAYIS"
      title="ZİRVE AKIŞI"
      color="var(--color-brand-action)"
      showBar
    >
      <motion.div
        variants={staggerContainer}
        className="w-full max-w-3xl mx-auto px-4"
      >
        <motion.div variants={fadeUp}>
          <Card
            variant="solid"
            noPadding
            cornerColor="var(--color-brand-action)"
            glowColor="var(--color-brand-action)"
          >
            {SCHEDULE_MAY_8.map((item, index) =>
              item.isSpecial ? (
                <SpecialRow key={item.id} item={item} />
              ) : (
                <SessionRow
                  key={item.id}
                  item={item}
                  isLast={index === SCHEDULE_MAY_8.length - 1}
                  isLive={liveIndex === index}
                />
              ),
            )}
          </Card>
        </motion.div>
      </motion.div>
    </PageSection>
  );
}
