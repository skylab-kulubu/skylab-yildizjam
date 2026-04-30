"use client";

import React, { forwardRef, useMemo } from "react";

type CardVariant = "default" | "soft" | "solid";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  pixelSize?: number;
  cornerColor?: string;
  edgeColor?: string;
  glassBackground?: string;
  glowColor?: string;
  contentClassName?: string;
  noPadding?: boolean;
  variant?: CardVariant;
  enableBlur?: boolean;
};

const toUnit = (v: string | number) => (typeof v === "number" ? `${v}px` : v);

const variantMap: Record<
  CardVariant,
  { bg: string; overlay: string; inner: string }
> = {
  default: {
    bg: "rgba(10, 12, 20, 0.45)",
    overlay:
      "linear-gradient(180deg, rgba(255,255,255,0.03), transparent 30%, transparent 80%, rgba(0,0,0,0.4))",
    inner:
      "inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -1px 1px rgba(0,0,0,0.4)",
  },
  soft: {
    bg: "rgba(15, 10, 25, 0.35)",
    overlay:
      "linear-gradient(180deg, rgba(255,255,255,0.02), transparent 30%, transparent 80%, rgba(0,0,0,0.3))",
    inner:
      "inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 1px rgba(0,0,0,0.3)",
  },
  solid: {
    bg: "rgba(8, 5, 15, 0.85)",
    overlay:
      "linear-gradient(180deg, rgba(255,255,255,0.02), transparent 30%, transparent 75%, rgba(0,0,0,0.5))",
    inner:
      "inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 1px rgba(0,0,0,0.5)",
  },
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = "",
      width = "100%",
      height = "100%",
      pixelSize = 2,
      cornerColor = "#94c4dc",
      edgeColor = "rgba(255,255,255,0.06)",
      glassBackground = "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)",
      glowColor = "#a855f7",
      contentClassName = "",
      noPadding = false,
      variant = "default",
      enableBlur = false,
      style,
      ...props
    },
    ref,
  ) => {
    const p = Math.max(1, pixelSize);
    const c1 = 3 * p;
    const c2 = 2 * p;
    const c3 = p;
    const v = variantMap[variant];

    const shape = useMemo(
      () =>
        `polygon(${c1}px 0, calc(100% - ${c1}px) 0, calc(100% - ${c1}px) ${c3}px, calc(100% - ${c2}px) ${c3}px, calc(100% - ${c2}px) ${c2}px, calc(100% - ${c3}px) ${c2}px, calc(100% - ${c3}px) ${c1}px, 100% ${c1}px, 100% calc(100% - ${c1}px), calc(100% - ${c3}px) calc(100% - ${c1}px), calc(100% - ${c3}px) calc(100% - ${c2}px), calc(100% - ${c2}px) calc(100% - ${c2}px), calc(100% - ${c2}px) calc(100% - ${c3}px), calc(100% - ${c1}px) calc(100% - ${c3}px), calc(100% - ${c1}px) 100%, ${c1}px 100%, ${c1}px calc(100% - ${c3}px), ${c2}px calc(100% - ${c3}px), ${c2}px calc(100% - ${c2}px), ${c3}px calc(100% - ${c2}px), ${c3}px calc(100% - ${c1}px), 0 calc(100% - ${c1}px), 0 ${c1}px, ${c3}px ${c1}px, ${c3}px ${c2}px, ${c2}px ${c2}px, ${c2}px ${c3}px, ${c1}px ${c3}px)`,
      [c1, c2, c3],
    );

    const cornerTransforms = [
      "top-0 left-0",
      "top-0 right-0 scale-x-[-1]",
      "bottom-0 left-0 scale-y-[-1]",
      "bottom-0 right-0 scale-x-[-1] scale-y-[-1]",
    ];

    const getBgColor = () => {
      if (enableBlur) return v.bg;
      if (variant === "default") return v.bg.replace("0.45", "0.75");
      if (variant === "soft") return v.bg.replace("0.35", "0.65");
      return v.bg.replace("0.85", "0.95");
    };

    return (
      <div
        ref={ref}
        className={`group relative flex flex-col ${className}`}
        style={{
          width: toUnit(width),
          height: toUnit(height),
          isolation: "isolate",
          ...style,
        }}
        {...props}
      >
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            clipPath: shape,
            backdropFilter: enableBlur ? "blur(20px) saturate(150%)" : "none",
            WebkitBackdropFilter: enableBlur
              ? "blur(20px) saturate(150%)"
              : "none",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: glassBackground,
              backgroundColor: getBgColor(),
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(140%_110%_at_50%_0%,rgba(255,255,255,0.03),transparent_40%)]" />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: v.overlay }}
          />

          <div
            className="absolute top-0 left-0 w-full h-full opacity-30 transition-opacity duration-700 group-hover:opacity-50 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 0% 0%, color-mix(in srgb, ${cornerColor} 25%, transparent) 0%, transparent 60%)`,
            }}
          />
          <div
            className="absolute top-0 right-0 w-full h-full opacity-20 transition-opacity duration-700 group-hover:opacity-40 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 100% 0%, color-mix(in srgb, ${cornerColor} 20%, transparent) 0%, transparent 60%)`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-full opacity-20 transition-opacity duration-700 group-hover:opacity-40 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 0% 100%, color-mix(in srgb, ${glowColor} 20%, transparent) 0%, transparent 60%)`,
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: v.inner }}
          />
        </div>

        <div className="absolute inset-0 pointer-events-none z-10">
          <div
            className="absolute top-0"
            style={{
              left: 8 * p,
              right: 8 * p,
              height: p,
              backgroundColor: edgeColor,
            }}
          />
          <div
            className="absolute bottom-0"
            style={{
              left: 8 * p,
              right: 8 * p,
              height: p,
              backgroundColor: edgeColor,
            }}
          />
          <div
            className="absolute left-0"
            style={{
              top: 8 * p,
              bottom: 8 * p,
              width: p,
              backgroundColor: edgeColor,
            }}
          />
          <div
            className="absolute right-0"
            style={{
              top: 8 * p,
              bottom: 8 * p,
              width: p,
              backgroundColor: edgeColor,
            }}
          />
        </div>

        {cornerTransforms.map((transformClass, index) => (
          <svg
            key={index}
            width={8 * p}
            height={8 * p}
            className={`absolute pointer-events-none z-20 overflow-visible transition-colors duration-500 ease-out ${transformClass}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              style={{
                fill: cornerColor,
                filter: `drop-shadow(0 0 4px ${cornerColor})`,
                transition: "fill 0.5s ease-out, filter 0.5s ease-out",
              }}
            >
              <rect x={3 * p} y={0} width={5 * p} height={p} />
              <rect x={2 * p} y={p} width={p} height={p} />
              <rect x={p} y={2 * p} width={p} height={p} />
              <rect x={0} y={3 * p} width={p} height={5 * p} />
            </g>
          </svg>
        ))}

        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-[30%] group-hover:w-[60%] transition-[width,opacity,filter] duration-700 ease-out opacity-40 group-hover:opacity-100 z-30"
          style={{
            background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
            filter: `drop-shadow(0 0 6px ${glowColor})`,
          }}
        />

        <div
          className={`relative z-20 grow flex flex-col ${noPadding ? "" : "p-6 sm:p-8"} ${contentClassName}`}
          style={{ clipPath: shape }}
        >
          {children}
        </div>
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
