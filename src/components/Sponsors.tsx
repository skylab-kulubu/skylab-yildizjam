"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import PageSection from "./PageSection";

const SPONSOR_CATEGORIES = [
  {
    id: "gold",
    title: "Altın Sponsor",
    color: "var(--color-brand-reward)",
    count: 2,
  },
  {
    id: "bronze",
    title: "Bronz Sponsor",
    color: "#CD7F32",
    count: 3,
  },
  {
    id: "session",
    title: "Oturum & Fuaye",
    color: "var(--color-brand-glow)",
    count: 4,
  },
  {
    id: "product",
    title: "Ürün Sponsorları",
    color: "var(--color-brand-action)",
    count: 6,
  },
];

const SponsorRow = ({
  title,
  color,
  count,
}: {
  title: string;
  color: string;
  count: number;
}) => {
  return (
    <div className="space-y-6 w-full flex flex-col items-center">
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-4 w-full max-w-4xl mx-auto px-4"
      >
        <div className="h-px flex-1 bg-white/10" />
        <h3
          className="font-pixel text-[10px] sm:text-xs tracking-[0.2em] whitespace-nowrap uppercase"
          style={{ color: color }}
        >
          {title}
        </h3>
        <div className="h-px flex-1 bg-white/10" />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 w-full max-w-5xl mx-auto px-4"
      ></motion.div>
    </div>
  );
};

export default function Sponsors() {
  return (
    <PageSection
      id="sponsorlar"
      tag="ALLIANCE_NETWORK"
      title="SPONSORLAR"
      variant="section"
      showBar={true}
    >
      <div className="w-full space-y-16 lg:space-y-20">
        {SPONSOR_CATEGORIES.map((category) => (
          <SponsorRow
            key={category.id}
            title={category.title}
            color={category.color}
            count={category.count}
          />
        ))}
      </div>
    </PageSection>
  );
}
