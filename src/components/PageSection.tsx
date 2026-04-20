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
      title: "text-4xl sm:text-6xl",
      tag: "text-[12px]",
      gap: "gap-16",
      py: "py-32",
    },
    section: {
      title: "text-3xl sm:text-4xl",
      tag: "text-[10px]",
      gap: "gap-12",
      py: "py-24",
    },
    subcategory: {
      title: "text-xl sm:text-2xl",
      tag: "text-[8px]",
      gap: "gap-8",
      py: "py-12",
    },
  };

  const currentSize = sizes[variant];

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className={`relative z-10 w-full transform-gpu ${currentSize.py} ${className}`}
      style={{ "--layout-color": baseColor } as React.CSSProperties}
    >
      <div
        className={`${isFullWidth ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6"}`}
      >
        <div className={`flex flex-col items-center ${currentSize.gap}`}>
          <motion.div variants={fadeUp} className="text-center space-y-3">
            <p
              className={`font-pixel ${currentSize.tag} uppercase tracking-[0.4em] mb-2`}
              style={{
                color: `color-mix(in srgb, ${baseColor}, transparent 50%)`,
              }}
            >
              [ {tag} ]
            </p>

            <h2
              className={`font-display ${currentSize.title} font-bold tracking-[0.3em] uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
            >
              {title}
            </h2>

            {showBar && (
              <div
                className={`h-0.5 ${variant === "hero" ? "w-24" : "w-16"} mx-auto mt-2 shadow-[0_0_10px_var(--layout-color)]`}
                style={{
                  backgroundColor: `color-mix(in srgb, ${baseColor}, transparent 50%)`,
                }}
              />
            )}
          </motion.div>

          {children}
        </div>
      </div>
    </motion.section>
  );
}
