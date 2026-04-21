"use client";

import React, { forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  pixelSize?: number;
  cornerColor?: string;
  glowColor?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      pixelSize = 2,
      cornerColor = "var(--color-brand-glow)",
      glowColor = "var(--color-brand-glow)",
      style,
      ...props
    },
    ref,
  ) => {
    const p = Math.max(1, pixelSize);
    const c1 = 3 * p;
    const c2 = 2 * p;
    const c3 = 1 * p;

    const clip = `polygon(
      ${c1}px 0, calc(100% - ${c1}px) 0, calc(100% - ${c1}px) ${c3}px, calc(100% - ${c2}px) ${c3}px, calc(100% - ${c2}px) ${c2}px, calc(100% - ${c3}px) ${c2}px, calc(100% - ${c3}px) ${c1}px, 100% ${c1}px,
      100% calc(100% - ${c1}px), calc(100% - ${c3}px) calc(100% - ${c1}px), calc(100% - ${c3}px) calc(100% - ${c2}px), calc(100% - ${c2}px) calc(100% - ${c2}px), calc(100% - ${c2}px) calc(100% - ${c3}px), calc(100% - ${c1}px) calc(100% - ${c3}px), calc(100% - ${c1}px) 100%,
      ${c1}px 100%, ${c1}px calc(100% - ${c3}px), ${c2}px calc(100% - ${c3}px), ${c2}px calc(100% - ${c2}px), ${c3}px calc(100% - ${c2}px), ${c3}px calc(100% - ${c1}px), 0 calc(100% - ${c1}px),
      0 ${c1}px, ${c3}px ${c1}px, ${c3}px ${c2}px, ${c2}px ${c2}px, ${c2}px ${c3}px, ${c1}px ${c3}px
    )`;

    const glowFill = `color-mix(in srgb, ${glowColor} 20%, transparent)`;

    const cornerTransforms = [
      "top-0 left-0",
      "top-0 right-0 scale-x-[-1]",
      "bottom-0 left-0 scale-y-[-1]",
      "bottom-0 right-0 scale-x-[-1] scale-y-[-1]",
    ];

    return (
      <button
        ref={ref}
        className={`group relative inline-flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 select-none min-w-[220px] ${className}`}
        style={style}
        {...props}
      >
        <div
          className="absolute inset-0 z-0 transition-all duration-500"
          style={{
            clipPath: clip,
            WebkitClipPath: clip,
            backgroundColor: "rgba(10, 15, 30, 0.7)",
            backdropFilter: "blur(10px)",
            border: `1px solid color-mix(in srgb, ${glowColor} 15%, transparent)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, color-mix(in srgb, ${glowColor} 20%, transparent) 0%, color-mix(in srgb, ${glowColor} 5%, transparent) 100%)`,
            }}
          />
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] pointer-events-none" />
        </div>

        <div className="absolute inset-0 pointer-events-none z-10">
          <div
            className="absolute top-0"
            style={{
              left: 8 * p,
              right: 8 * p,
              height: p,
              backgroundColor: glowFill,
            }}
          />
          <div
            className="absolute bottom-0"
            style={{
              left: 8 * p,
              right: 8 * p,
              height: p,
              backgroundColor: glowFill,
            }}
          />
          <div
            className="absolute left-0"
            style={{
              top: 8 * p,
              bottom: 8 * p,
              width: p,
              backgroundColor: glowFill,
            }}
          />
          <div
            className="absolute right-0"
            style={{
              top: 8 * p,
              bottom: 8 * p,
              width: p,
              backgroundColor: glowFill,
            }}
          />
        </div>

        {cornerTransforms.map((transformClass, index) => (
          <svg
            key={index}
            width={8 * p}
            height={8 * p}
            className={`absolute pointer-events-none z-20 overflow-visible ${transformClass}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill={cornerColor}
              style={{
                filter: `drop-shadow(0 0 4px color-mix(in srgb, ${cornerColor} 60%, transparent))`,
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
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100 z-30"
          style={{
            background: `linear-gradient(90deg, transparent, ${cornerColor}, transparent)`,
            filter: `drop-shadow(0 0 8px ${cornerColor})`,
          }}
        />

        <div className="relative z-40 py-4 px-10 flex items-center justify-center gap-4 text-white">
          {children}
        </div>
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
