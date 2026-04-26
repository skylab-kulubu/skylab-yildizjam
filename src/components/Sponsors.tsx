"use client";

import { motion } from "framer-motion";
import Card from "@/components/Card";
import { fadeScale, fadeUp, staggerContainer } from "@/lib/animations";
import PageSection from "./PageSection";
import { SPONSOR_CATEGORIES, SPONSORS_DATA } from "@/lib/sponsors";

const SponsorRow = ({
  categoryId,
  title,
  color,
  sponsors,
}: {
  categoryId: string;
  title: string;
  color: string;
  sponsors: any[];
}) => {
  if (sponsors.length === 0) return null;

  const getSizeClasses = (id: string) => {
    switch (id) {
      case "gold":
        return "w-32 sm:w-40 h-16 sm:h-20";
      case "bronze":
        return "w-28 sm:w-36 h-14 sm:h-16";
      case "session":
        return "w-24 sm:w-32 h-12 sm:h-14";
      case "product":
        return "w-20 sm:w-28 h-10 sm:h-12";
      default:
        return "w-24 sm:w-32 h-12 sm:h-14";
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-4 w-full max-w-3xl mx-auto px-4"
      >
        <div className="h-px flex-1 bg-white/10" />
        <h3
          className="font-pixel text-[10px] sm:text-xs tracking-[0.2em] whitespace-nowrap uppercase opacity-80"
          style={{ color: color }}
        >
          {title}
        </h3>
        <div className="h-px flex-1 bg-white/10" />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 w-full max-w-4xl mx-auto px-4"
      >
        {sponsors.map((sponsor) => (
          <motion.div variants={fadeScale} key={sponsor.id}>
            <Card
              noPadding
              variant="solid"
              className={`${getSizeClasses(categoryId)} shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 group bg-space/40 backdrop-blur-sm`}
              cornerColor={color}
              glowColor={color}
            >
              <div className="w-full h-full flex items-center justify-center p-2 sm:p-3 bg-white/5">
                <img
                  src={sponsor.logoUrl}
                  alt={sponsor.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300"
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
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
      <div className="w-full space-y-12">
        {SPONSOR_CATEGORIES.map((category) => {
          const categorySponsors = SPONSORS_DATA.filter(
            (s) => s.categoryId === category.id,
          );

          return (
            <SponsorRow
              key={category.id}
              categoryId={category.id}
              title={category.title}
              color={category.color}
              sponsors={categorySponsors}
            />
          );
        })}
      </div>
    </PageSection>
  );
}
