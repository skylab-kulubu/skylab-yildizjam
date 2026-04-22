"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import Card from "@/components/Card";
import PageSection from "./PageSection";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { EXPERT_CATEGORIES, EXPERTS_DATA } from "@/lib/experts";

export function MemberCard({ color, data }: { color: string; data: any }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative w-32 sm:w-36 lg:w-40 z-10 hover:z-20 transform-gpu will-change-[transform,opacity]"
      style={{
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      <Card
        noPadding
        variant="soft"
        className="aspect-3/4 overflow-visible relative"
        cornerColor={color || "#ffffff"}
        glowColor={color || "transparent"}
        contentClassName="z-0"
        glassBackground="linear-gradient(180deg, color-mix(in srgb, var(--color-plum) 62%, transparent), color-mix(in srgb, var(--color-space) 70%, transparent))"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-lg border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center relative group-hover:-translate-y-2 transition-transform duration-500 transform-gpu">
            {data.isLocked ? (
              <User className="text-white/10 w-5 h-5" />
            ) : (
              <img
                src={data.image}
                alt={data.name}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
          <div className="font-pixel text-[10px] text-white/20 tracking-widest uppercase text-center px-2">
            {data.name}
          </div>
        </div>

        <div className="absolute bottom-0 w-full p-3 bg-space/90 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-500 border-t border-white/10 text-center transform-gpu will-change-transform">
          <p className="font-pixel text-[8px] text-white/70 tracking-widest uppercase mb-1">
            {data.isLocked ? "GİZLİ KARAKTER" : "BİLGİ"}
          </p>
          <p className="font-display font-bold text-[10px] sm:text-xs text-white/50 uppercase mt-1">
            {data.role}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Experts() {
  return (
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
            className="py-16"
          >
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-6 w-full max-w-5xl mx-auto px-4"
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
  );
}
