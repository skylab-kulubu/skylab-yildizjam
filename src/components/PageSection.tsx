"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface PageSectionProps {
  id?: string;
  tag: string;
  title: string;
  children: React.ReactNode;
  color?: string;
  className?: string;
  variant?: "hero" | "section" | "subcategory";
  isFullWidth?: boolean;
  showBar?: boolean;
}

export default function PageSection({
  id,
  tag,
  title,
  children,
  color,
  className = "",
  variant = "section",
  isFullWidth = false,
  showBar = false,
}: PageSectionProps) {
  const baseColor = color || "#64748b";

  const sizes = {
    hero: {
      title: "text-3xl sm:text-5xl md:text-6xl",
      tag: "text-[12px] sm:text-[14px]",
      gap: "gap-6 sm:gap-8 md:gap-10",
      py: "py-10 sm:py-16 md:py-20",
    },
    section: {
      title: "text-2xl sm:text-3xl md:text-4xl",
      tag: "text-[11px] sm:text-[12px]",
      gap: "gap-4 sm:gap-6 md:gap-8",
      py: "py-8 sm:py-10 md:py-14",
    },
    subcategory: {
      title: "text-xl sm:text-2xl",
      tag: "text-[10px]",
      gap: "gap-4 sm:gap-6",
      py: "py-6 sm:py-8",
    },
  };

  const currentSize = sizes[variant];

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -10% 0px" }}
      variants={staggerContainer}
      className={`relative z-10 w-full max-w-[100vw] ${currentSize.py} ${className}`}
      style={{ "--layout-color": baseColor } as React.CSSProperties}
    >
      <div
        className={`${isFullWidth ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}`}
      >
        <div className={`flex flex-col items-center w-full ${currentSize.gap}`}>
          <motion.div
            variants={fadeUp}
            className="w-full max-w-4xl text-center space-y-3 px-2 sm:px-0"
          >
            <p
              className={`font-pixel ${currentSize.tag} uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-2`}
              style={{
                color: `color-mix(in srgb, ${baseColor}, transparent 50%)`,
              }}
            >
              [ {tag} ]
            </p>

            <h2
              className={`font-display ${currentSize.title} font-bold tracking-[0.15em] sm:tracking-[0.3em] uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] wrap-break-word`}
            >
              {title}
            </h2>

            {showBar && (
              <div
                className={`h-0.5 ${variant === "hero" ? "w-16 sm:w-24" : "w-12 sm:w-16"} mx-auto mt-2 shadow-[0_0_10px_var(--layout-color)]`}
                style={{
                  backgroundColor: `color-mix(in srgb, ${baseColor}, transparent 50%)`,
                }}
              />
            )}
          </motion.div>

          <div className="w-full">{children}</div>
        </div>
      </div>
    </motion.section>
  );
}
