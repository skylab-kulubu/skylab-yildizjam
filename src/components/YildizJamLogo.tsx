import React from "react";
import { motion, Variants } from "framer-motion";

interface YildizJamLogoProps {
  className?: string;
}

interface BtnProps {
  label: "Y" | "X" | "B" | "A";
  index: number;
}

const titleStyle: React.CSSProperties = {
  color: "#E0FFFF",
  textShadow: `
    0px 1px 0 #080A1A,
    0px 2px 0 #080A1A,
    0px 3px 0 #080A1A,
    -1px 4px 0 var(--color-brand-glow, #4f46e5),
    1px 4px 0 var(--color-brand-glow, #4f46e5),
    0px 4px 0 var(--color-brand-glow, #4f46e5),
    0px 0px 15px color-mix(in srgb, var(--color-brand-glow, #4f46e5) 20%, transparent)
  `,
};

const wrapperVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
      delay: 0.6 + i * 0.1,
    },
  }),
  floating: (i: number) => ({
    y: [0, -2, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.2,
    },
  }),
};

const btnVariants: Variants = {
  idle: {
    borderColor: "#E0FFFF",
    backgroundColor: "#080A1A",
    boxShadow:
      "0px 1px 0 #080A1A, 0px 2px 0 #080A1A, 0px 3px 0 var(--color-brand-glow, #4f46e5)",
    color: "#E0FFFF",
    textShadow: "0px 0px 0px transparent",
    y: 0,
  },
  hover: {
    borderColor: "var(--color-brand-glow, #4f46e5)",
    backgroundColor:
      "color-mix(in srgb, var(--color-brand-glow, #4f46e5) 15%, #080A1A)",
    boxShadow: `
      0px 2px 0 var(--color-brand-glow, #4f46e5), 
      0px 0px 15px color-mix(in srgb, var(--color-brand-glow, #4f46e5) 40%, transparent), 
      inset 0px 0px 8px color-mix(in srgb, var(--color-brand-glow, #4f46e5) 20%, transparent)
    `,
    color: "#FFFFFF",
    textShadow: "0px 0px 8px var(--color-brand-glow, #4f46e5)",
    y: -1,
    transition: { duration: 0.15, ease: "easeOut" },
  },
  tap: {
    y: 3,
    boxShadow: `
      0px 0px 0 var(--color-brand-glow, #4f46e5), 
      0px 0px 0 transparent, 
      inset 0px 0px 4px color-mix(in srgb, var(--color-brand-glow, #4f46e5) 50%, transparent)
    `,
    transition: { duration: 0.05, ease: "easeInOut" },
  },
};

const Btn: React.FC<BtnProps> = ({ label, index }) => (
  <motion.div
    custom={index}
    variants={wrapperVariants}
    initial="hidden"
    animate={["show", "floating"]}
    className="w-full h-full"
  >
    <motion.div
      variants={btnVariants}
      initial="idle"
      animate="idle"
      whileHover="hover"
      whileTap="tap"
      className="flex items-center justify-center w-full h-full aspect-square rounded-sm border cursor-pointer pointer-events-auto box-border"
    >
      <span
        className="font-pixel leading-none select-none"
        style={{
          fontSize: "0.25em",
          marginTop: "0.1em",
          color: "inherit",
          textShadow: "inherit",
        }}
      >
        {label}
      </span>
    </motion.div>
  </motion.div>
);

const Empty: React.FC = () => <div />;

export default function YildizJamLogo({ className = "" }: YildizJamLogoProps) {
  return (
    <h1
      className={`font-display font-black tracking-tighter leading-none whitespace-nowrap inline-flex items-baseline m-0 p-0 ${className}`}
      style={titleStyle}
    >
      YILDIZ JA
      <span className="relative inline-block">
        M
        <span
          className="absolute z-20 pointer-events-none"
          style={{
            top: "-0.55em",
            right: "-0.12em",
            transform: "rotate(12deg)",
            transformOrigin: "bottom left",
            width: "0.22em",
            height: "0.22em",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)",
            gap: "0.02em",
            fontSize: "1em",
          }}
        >
          <Empty />
          <Btn label="Y" index={0} />
          <Empty />
          <Btn label="X" index={1} />
          <Empty />
          <Btn label="B" index={2} />
          <Empty />
          <Btn label="A" index={3} />
          <Empty />
        </span>
      </span>
    </h1>
  );
}
