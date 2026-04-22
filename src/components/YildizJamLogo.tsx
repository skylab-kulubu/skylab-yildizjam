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
  idle: { y: 0 },
  hover: { y: -1, transition: { duration: 0.15, ease: "easeOut" } },
  tap: { y: 3, transition: { duration: 0.05, ease: "easeInOut" } },
};

const BTN_SIZE = "0.21em";
const BTN_GAP = "0.018em";

const BTN_POSITIONS: {
  label: BtnProps["label"];
  col: number;
  row: number;
  index: number;
}[] = [
  { label: "Y", col: 1, row: 0, index: 0 },
  { label: "X", col: 0, row: 1, index: 1 },
  { label: "B", col: 2, row: 1, index: 2 },
  { label: "A", col: 1, row: 2, index: 3 },
];

interface BtnProps {
  label: "Y" | "X" | "B" | "A";
  index: number;
  col: number;
  row: number;
}

const Btn: React.FC<BtnProps> = ({ label, index, col, row }) => {
  const offset = (n: number) => `calc(${n} * (${BTN_SIZE} + ${BTN_GAP}))`;

  return (
    <motion.div
      custom={index}
      variants={wrapperVariants}
      initial="hidden"
      animate={["show", "floating"]}
      style={{
        position: "absolute",
        left: offset(col),
        top: offset(row),
        width: BTN_SIZE,
        height: BTN_SIZE,
        willChange: "transform",
      }}
    >
      <motion.div
        variants={btnVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        className="jam-btn"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
        }}
      >
        <span className="jam-btn__label">{label}</span>
      </motion.div>
    </motion.div>
  );
};

const Empty: React.FC = () => <div style={{ display: "block" }} />;

export default function YildizJamLogo({ className = "" }: YildizJamLogoProps) {
  const GRID_SIZE = `calc(3 * ${BTN_SIZE} + 2 * ${BTN_GAP})`;
  return (
    <h1
      className={`font-display font-black tracking-tighter leading-none whitespace-nowrap inline-flex items-baseline m-0 p-0 ${className}`}
      style={titleStyle}
    >
      YILDIZ JA
      <span
        style={{
          position: "relative",
          display: "inline-block",

          isolation: "isolate",
        }}
      >
        M
        <span
          style={{
            position: "absolute",
            zIndex: 20,
            top: "-0.40em",
            right: "-0.52em",
            transform: "rotate(12deg)",
            transformOrigin: "bottom left",
            width: GRID_SIZE,
            height: GRID_SIZE,
            pointerEvents: "none",
            isolation: "isolate",
            fontSize: "1em",
          }}
        >
          {BTN_POSITIONS.map((btn) => (
            <Btn key={btn.label} {...btn} />
          ))}
        </span>
      </span>
    </h1>
  );
}
