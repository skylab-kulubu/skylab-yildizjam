"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Card from "@/components/Card";
import PageSection from "./PageSection";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { EXPERT_CATEGORIES, EXPERTS_DATA, Expert } from "@/lib/experts";

export function MemberCard({ color, data }: { color: string; data: Expert }) {
  const imageSrc = data.image ? `/img/experts/${data.image}` : null;
  const [active, setActive] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="group relative w-32 sm:w-36 lg:w-40 z-10 md:hover:z-20 transform-gpu will-change-[transform,opacity] cursor-pointer"
      style={{
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
      onClick={() => !data.isLocked && setActive((v) => !v)}
    >
      <Card
        noPadding
        variant="soft"
        className="aspect-3/4 relative"
        cornerColor={color || "#ffffff"}
        glowColor={color || "transparent"}
        glassBackground="linear-gradient(180deg, color-mix(in srgb, var(--color-plum) 62%, transparent), color-mix(in srgb, var(--color-space) 70%, transparent))"
        imageSlot={
          imageSrc ? (
            <Image
              src={imageSrc}
              alt={data.name}
              fill
              sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 160px"
              className="object-cover object-top"
            />
          ) : undefined
        }
      >
        {!imageSrc && (
          <div className="absolute inset-0 flex items-center justify-center px-4">
            {data.isLocked ? (
              <span className="font-pixel text-sm text-white/15 tracking-widest">
                ? ? ?
              </span>
            ) : (
              <span className="font-pixel text-[10px] text-white/45 text-center uppercase tracking-wider leading-5">
                {data.name}
              </span>
            )}
          </div>
        )}

        {!data.isLocked && (
          <div
            className={`absolute inset-x-0 bottom-0 p-3 text-center border-t border-white/10 transition-transform duration-500 transform-gpu will-change-transform ${
              active
                ? "translate-y-0"
                : "translate-y-full md:group-hover:translate-y-0"
            }`}
            style={{ background: "rgba(5, 3, 14, 0.95)" }}
          >
            <p className="font-display font-bold text-[10px] sm:text-xs text-white uppercase tracking-wider leading-tight">
              {data.name}
            </p>
            {data.role && (
              <p className="font-pixel text-[9px] text-white/50 mt-1 uppercase tracking-wider">
                {data.role}
              </p>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
}

export default function Experts() {
  return (
    <section id="ekip" className="relative z-10 w-full">
      <div className="flex flex-col w-full">
        {EXPERT_CATEGORIES.map((section) => {
          const sectionExperts = EXPERTS_DATA.filter(
            (e) => e.categoryId === section.id,
          );

          if (sectionExperts.length === 0) return null;

          return (
            <PageSection
              key={section.id}
              id={section.id}
              tag={section.tag}
              title={section.title}
              variant="subcategory"
              color={section.color}
              showBar={true}
            >
              <motion.div
                variants={staggerContainer}
                className="flex flex-wrap justify-center gap-3 sm:gap-5 lg:gap-6 w-full max-w-5xl mx-auto px-4"
              >
                {sectionExperts.map((expert) => (
                  <MemberCard
                    key={expert.id}
                    color={section.color}
                    data={expert}
                  />
                ))}
              </motion.div>
            </PageSection>
          );
        })}
      </div>
    </section>
  );
}
