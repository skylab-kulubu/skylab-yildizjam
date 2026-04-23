"use client";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ShieldCheck, Crosshair } from "lucide-react";
import Button from "@/components/Button";
import { useCountdown } from "@/hooks/useCountdown";

type TimeLeft = ReturnType<typeof useCountdown>;
type NavLink = (typeof navLinks)[number];

const navLinks = [
  { href: "/", label: "Ana Menü", sectionId: "home" },
  { href: "/#oduller", label: "Loot", sectionId: "oduller" },
  { href: "/#ekip", label: "Karakterler", sectionId: "ekip" },
  { href: "/#sponsorlar", label: "Sponsorlar", sectionId: "sponsorlar" },
  { href: "/#sss", label: "Quest Log", sectionId: "sss" },
] as const;

const XP_BARS = Array.from({ length: 6 }, (_, i) => i);

const HEADER_ENTRANCE = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };
const SPRING_NAV = { type: "spring", stiffness: 380, damping: 30 } as const;
const DROPDOWN_TRANSITION = { duration: 0.2, ease: "easeOut" } as const;
const MOBILE_SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;

const PixelHeart = memo(({ active }: { active: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 10 10"
    fill={active ? "var(--color-brand-action)" : "#333333"}
    className={
      active ? "drop-shadow-[0_0_3px_var(--color-brand-action)]" : "opacity-50"
    }
  >
    <rect x="1" y="1" width="2" height="2" />
    <rect x="7" y="1" width="2" height="2" />
    <rect x="0" y="3" width="10" height="2" />
    <rect x="1" y="5" width="8" height="2" />
    <rect x="3" y="7" width="4" height="2" />
    <rect x="4" y="9" width="2" height="1" />
  </svg>
));
PixelHeart.displayName = "PixelHeart";

const MiniTimerUnit = memo(
  ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center min-w-6.5 sm:min-w-9 shrink-0">
      <div className="relative bg-space/60 border border-brand-main/30 w-full py-0.75 rounded flex items-center justify-center shadow-[0_0_8px_rgba(138,43,226,0.1)]">
        <span className="font-display text-[11px] sm:text-[14px] text-white tabular-nums drop-shadow-[0_0_3px_var(--color-brand-glow)] leading-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-pixel text-[5px] sm:text-[6px] uppercase text-brand-glow mt-1 tracking-widest opacity-90 whitespace-nowrap">
        {label}
      </span>
    </div>
  ),
);
MiniTimerUnit.displayName = "MiniTimerUnit";

const MiniSeparator = memo(() => (
  <span className="text-brand-main text-[10px] sm:text-[13px] self-start mt-0.5 animate-pulse opacity-50 px-px">
    :
  </span>
));
MiniSeparator.displayName = "MiniSeparator";

const TimerSegment = memo(
  ({
    timeLeft,
    show,
    mounted,
    part = "all",
  }: {
    timeLeft: TimeLeft;
    show: boolean;
    mounted: boolean;
    part?: "all" | "left" | "right";
  }) => {
    const getAnimations = () => {
      if (part === "left")
        return {
          initial: { opacity: 0, x: 16 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 16 },
        };
      if (part === "right")
        return {
          initial: { opacity: 0, x: -16 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -16 },
        };
      return {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
      };
    };

    const anims = getAnimations();

    return (
      <AnimatePresence>
        {show && !timeLeft.hasEnded && mounted && (
          <motion.div
            initial={anims.initial}
            animate={anims.animate}
            exit={anims.exit}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            style={{ willChange: "transform, opacity" }}
            className="flex items-center gap-0.5 sm:gap-1 overflow-hidden shrink-0"
          >
            {(part === "all" || part === "left") && (
              <>
                <MiniTimerUnit value={timeLeft.days} label="GÜN" />
                <MiniSeparator />
                <MiniTimerUnit value={timeLeft.hours} label="SAAT" />
              </>
            )}
            {part === "all" && <MiniSeparator />}
            {(part === "all" || part === "right") && (
              <>
                <MiniTimerUnit value={timeLeft.minutes} label="DAK" />
                <MiniSeparator />
                <MiniTimerUnit value={timeLeft.seconds} label="SAN" />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);
TimerSegment.displayName = "TimerSegment";

const XpBars = memo(() => (
  <div className="flex items-center gap-1.5">
    <span className="font-pixel text-[8px] text-brand-main pt-0.5">XP</span>
    <div className="flex gap-0.5 bg-black/60 p-0.5 rounded-sm border border-white/10 shrink-0">
      {XP_BARS.map((i) => (
        <div
          key={i}
          className={`w-2 h-2 sm:w-2.5 rounded-[1px] transition-colors duration-500 ${i < 4 ? "bg-brand-glow shadow-[0_0_4px_var(--color-brand-glow)]" : "bg-white/10"}`}
        />
      ))}
    </div>
  </div>
));
XpBars.displayName = "XpBars";

const StatWidget = memo(() => (
  <div className="hidden xl:flex flex-col items-end gap-1.5 select-none shrink-0 bg-white/2 p-2 px-3 rounded-lg border border-white/5 whitespace-nowrap">
    <div className="flex gap-3 font-pixel text-[10px] tracking-wider leading-none">
      <div className="flex gap-1 items-center">
        <span className="text-brand-main">1UP</span>
        <span className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">
          002026
        </span>
      </div>
      <div className="flex gap-1 items-center">
        <span className="text-brand-glow">LVL</span>
        <span className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">
          01
        </span>
      </div>
    </div>
    <div className="flex items-center gap-3 w-full justify-between">
      <div className="flex gap-1">
        <PixelHeart active={true} />
        <PixelHeart active={true} />
        <PixelHeart active={false} />
      </div>
      <XpBars />
    </div>
  </div>
));
StatWidget.displayName = "StatWidget";

const MobileStat = memo(() => (
  <div className="xl:hidden flex flex-col items-center justify-center w-12 shrink-0 select-none">
    <div className="flex items-center gap-1 mb-0.5">
      <span className="font-pixel text-[8px] text-brand-glow/80 leading-none">
        LVL
      </span>
      <span className="font-display text-[13px] text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] leading-none pt-0.5">
        01
      </span>
    </div>
    <div className="flex gap-0.75 scale-90">
      <PixelHeart active={true} />
      <PixelHeart active={true} />
      <PixelHeart active={false} />
    </div>
  </div>
));
MobileStat.displayName = "MobileStat";

const RegisterDropdown = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="hidden xl:block relative z-1001 shrink-0" ref={ref}>
      <Button
        pixelSize={2}
        cornerColor="var(--color-brand-glow)"
        glowColor="var(--color-brand-glow)"
        onClick={() => setIsOpen((v) => !v)}
        className="min-w-32.5! h-10! bg-brand-main/10 hover:bg-brand-main/20"
      >
        <div className="flex items-center justify-center gap-2 tracking-widest whitespace-nowrap">
          <span className="font-display font-bold text-[10px] tracking-widest text-white pt-0.5">
            KAYIT OL
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ willChange: "transform" }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-brand-glow drop-shadow-[0_0_5px_var(--color-brand-glow)]" />
          </motion.div>
        </div>
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={DROPDOWN_TRANSITION}
            style={{
              backgroundColor: "rgba(10, 6, 22, 0.85)",
              backdropFilter: "blur(24px)",
              willChange: "transform, opacity",
            }}
            className="absolute top-[calc(100%+8px)] right-0 w-47.5 z-100 flex flex-col p-1.5 gap-1 rounded-xl overflow-hidden border border-brand-main/40 shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(138,43,226,0.15)]"
          >
            <button
              onClick={() => {
                window.open(
                  "https://skyl.app/yildiz-jam-katilimci-formu",
                  "_blank",
                );
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-brand-main/20 text-slate-300 hover:text-white transition-all duration-200 text-left group"
            >
              <ShieldCheck className="w-4 h-4 text-brand-action group-hover:scale-110 transition-transform" />
              <span className="font-pixel text-[11px] tracking-widest uppercase pt-0.5 whitespace-nowrap">
                ZİRVE
              </span>
            </button>
            <div className="h-px w-[calc(100%-16px)] bg-linear-to-r from-transparent via-brand-main/30 to-transparent mx-auto" />
            <button
              onClick={() => {
                window.open(
                  "https://skyl.app/yildiz-jam-yarisma-basvuru",
                  "_blank",
                );
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-brand-glow/15 text-slate-300 hover:text-white transition-all duration-200 text-left group"
            >
              <Crosshair className="w-4 h-4 text-brand-glow group-hover:scale-110 transition-transform" />
              <span className="font-pixel text-[11px] tracking-widest uppercase pt-0.5 whitespace-nowrap">
                YARIŞMA
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
RegisterDropdown.displayName = "RegisterDropdown";

const Logo = memo(({ isScrolled }: { isScrolled: boolean }) => (
  <Link
    href="/"
    className="relative group cursor-pointer z-50 flex items-center justify-center focus:outline-none pointer-events-auto"
    aria-label="Ana Sayfaya Dön"
  >
    <div
      className={`relative flex items-center justify-center rounded-full overflow-visible
        transition-[width,height] duration-500 ease-in-out
        shadow-[0_0_20px_var(--color-brand-main)]/10
        hover:shadow-[0_0_35px_var(--color-brand-main)]/30
        ${isScrolled ? "w-16 h-16" : "w-24 h-24"}`}
    >
      <div
        className={`absolute inset-0.75 rounded-full z-0
          transition-colors duration-500
          ${isScrolled ? "bg-[rgba(6,4,10,0.95)]" : "bg-[rgba(138,43,226,0.12)]"}`}
      />
      <div className="absolute inset-0.75 rounded-full bg-[radial-gradient(circle,var(--color-brand-glow)_0%,transparent_70%)] opacity-20 z-10 pointer-events-none" />
      <div className="absolute inset-0.75 rounded-full bg-[radial-gradient(circle,var(--color-brand-glow)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-700 z-10 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 w-[125%] h-[125%] -translate-x-1/2 -translate-y-1/2 z-20
          opacity-60 group-hover:opacity-100 transition-opacity duration-700
          group-hover:drop-shadow-[0_0_12px_var(--color-brand-main)] pointer-events-none"
        style={{
          backgroundColor: "var(--color-brand-main)",
          WebkitMaskImage: "url('/img/pixelframe.svg')",
          maskImage: "url('/img/pixelframe.svg')",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
        }}
      />
      <div
        className="relative w-[75%] h-[75%] z-30
          transition-transform duration-700 ease-out
          group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_var(--color-brand-main)]"
        style={{ willChange: "transform" }}
      >
        <Image
          src="/img/yildizjambeyaz.png"
          alt="Yıldız Jam Logo"
          fill
          priority
          className="object-contain"
          sizes="(max-width: 96px) 100vw"
        />
      </div>
    </div>
  </Link>
));
Logo.displayName = "Logo";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMiniTimer, setShowMiniTimer] = useState(false);
  const [mounted, setMounted] = useState(false);

  const timeLeft = useCountdown();

  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollStateRef = useRef({ isScrolled: false, showMiniTimer: false });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;

        const y = window.scrollY;
        const newScrolled = y > 50;
        const threshold = window.innerWidth < 1280 ? 300 : 450;
        const newShowTimer = y > threshold;
        const prev = scrollStateRef.current;

        if (prev.isScrolled !== newScrolled) {
          scrollStateRef.current.isScrolled = newScrolled;
          setIsScrolled(newScrolled);
        }
        if (prev.showMiniTimer !== newShowTimer) {
          scrollStateRef.current.showMiniTimer = newShowTimer;
          setShowMiniTimer(newShowTimer);
        }

        if (y < 100 && !isProgrammaticScroll.current) {
          setActiveSection((prev) => (prev !== "home" ? "home" : prev));
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection((prev) =>
              prev !== entry.target.id ? entry.target.id : prev,
            );
          }
        });
      },
      { root: null, rootMargin: "-100px 0px -60% 0px", threshold: 0 },
    );

    navLinks.forEach((link) => {
      if (link.sectionId === "home") return;
      const el = document.getElementById(link.sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, link: NavLink) => {
      if (pathname !== "/") {
        setIsMobileMenuOpen(false);
        return;
      }
      e.preventDefault();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      isProgrammaticScroll.current = true;
      setActiveSection(link.sectionId);
      setIsMobileMenuOpen(false);

      const element = document.getElementById(link.sectionId);
      if (element) {
        window.scrollTo({
          top:
            link.sectionId === "home"
              ? 0
              : element.getBoundingClientRect().top + window.scrollY - 80,
          behavior: "smooth",
        });
      }

      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 800);
    },
    [pathname],
  );

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-1000 pointer-events-none flex justify-center">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: isScrolled ? 0 : 20, opacity: 1 }}
          transition={HEADER_ENTRANCE}
          style={{ willChange: "transform, opacity" }}
          className={`pointer-events-auto flex justify-center items-center overflow-visible
            border-solid mx-auto
            transition-[width,max-width,height,border-radius,background-color,border-color,box-shadow,backdrop-filter]
            duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              isScrolled
                ? "w-full max-w-full h-15 rounded-none bg-[rgba(6,4,10,0.85)] border-b border-[rgba(138,43,226,0.2)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-lg"
                : "w-[calc(100vw-32px)] max-w-7xl h-19 rounded-4xl bg-[rgba(6,4,10,0.45)] border border-[rgba(138,43,226,0.15)] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] backdrop-blur-md"
            }`}
        >
          <div className="relative w-full h-full max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6">
            <div className="flex-1 flex justify-start items-center z-10">
              <nav className="hidden xl:flex items-center justify-center gap-0.5 bg-white/2 border border-white/5 p-1 rounded-full h-11 shadow-inner shrink-0">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === "/" && activeSection === link.sectionId;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className="relative flex items-center justify-center px-3 xl:px-4 h-full group shrink-0"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-nav-pill"
                          className="absolute inset-0 bg-brand-main/15 border border-brand-main/40 rounded-full"
                          transition={SPRING_NAV}
                        />
                      )}
                      <span
                        className={`relative z-10 font-pixel text-[10px] xl:text-[11px] tracking-wider uppercase transition-colors duration-300 whitespace-nowrap leading-none pt-1 ${
                          isActive
                            ? "text-brand-glow drop-shadow-[0_0_6px_var(--color-brand-glow)] font-bold"
                            : "text-slate-400 group-hover:text-white group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>
              <MobileStat />
            </div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center items-center h-full z-20 w-max pointer-events-none">
              <div className="xl:hidden flex items-center pr-2 sm:pr-4 pointer-events-auto">
                <TimerSegment
                  timeLeft={timeLeft}
                  show={showMiniTimer}
                  mounted={mounted}
                  part="left"
                />
              </div>

              <Logo isScrolled={isScrolled} />

              <div className="xl:hidden flex items-center pl-2 sm:pl-4 pointer-events-auto">
                <TimerSegment
                  timeLeft={timeLeft}
                  show={showMiniTimer}
                  mounted={mounted}
                  part="right"
                />
              </div>
            </div>

            <div className="flex-1 flex justify-end items-center gap-2 xl:gap-4 z-10">
              <div className="hidden xl:flex items-center">
                <TimerSegment
                  timeLeft={timeLeft}
                  show={showMiniTimer}
                  mounted={mounted}
                  part="all"
                />
              </div>
              <StatWidget />
              <RegisterDropdown />

              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="xl:hidden p-2.25 text-white hover:text-brand-glow transition-colors rounded-xl bg-white/5 border border-white/10 shrink-0 hover:bg-white/10 active:scale-95"
                aria-label="Menüyü Aç/Kapat"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.25, ease: "backOut" }}
                  style={{ willChange: "transform" }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ willChange: "opacity" }}
              className="fixed inset-0 xl:hidden z-40 bg-black/60 backdrop-blur-sm pointer-events-auto"
            />

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={MOBILE_SPRING}
              style={{
                top: isScrolled ? "70px" : "110px",
                willChange: "transform, opacity",
              }}
              className="fixed left-4 right-4 xl:hidden z-50 pointer-events-auto transition-[top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <div className="rounded-2xl overflow-hidden bg-linear-to-b from-[rgba(15,10,25,0.95)] to-[rgba(10,5,15,0.98)] border border-brand-main/40 shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
                <nav className="p-4 flex flex-col gap-1">
                  {navLinks.map((link, index) => {
                    const isActive =
                      pathname === "/" && activeSection === link.sectionId;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ x: -16, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          delay: 0.04 + index * 0.04,
                          duration: 0.22,
                          ease: "easeOut",
                        }}
                        style={{ willChange: "transform, opacity" }}
                      >
                        <Link
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link)}
                          className="relative flex items-center p-4 rounded-xl transition-colors duration-200 group overflow-hidden"
                        >
                          <div
                            className={`absolute inset-0 transition-opacity duration-200 ${isActive ? "bg-brand-main/15 opacity-100" : "bg-white/5 opacity-0 group-hover:opacity-100"}`}
                          />
                          {isActive && (
                            <motion.div
                              layoutId="mobile-active-indicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-2/3 bg-brand-glow rounded-r-full shadow-[0_0_10px_var(--color-brand-glow)]"
                            />
                          )}
                          <span
                            className={`relative z-10 font-pixel text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 pl-2 ${isActive ? "text-brand-glow font-bold drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]" : "text-slate-300 group-hover:text-white"}`}
                          >
                            {link.label}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26, duration: 0.22, ease: "easeOut" }}
                  style={{ willChange: "transform, opacity" }}
                  className="p-5 border-t border-white/10 bg-black/20 flex flex-col gap-3.5"
                >
                  <Button
                    pixelSize={2}
                    cornerColor="var(--color-brand-main)"
                    glowColor="var(--color-brand-main)"
                    onClick={() => {
                      window.open(
                        "https://skyl.app/yildiz-jam-katilimci-formu",
                        "_blank",
                      );
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full h-13 bg-linear-to-r from-brand-main/10 to-transparent hover:from-brand-main/20 shadow-inner group"
                  >
                    <div className="flex items-center justify-center gap-3 w-full">
                      <ShieldCheck className="w-4 h-4 text-brand-action group-hover:scale-110 transition-transform" />
                      <span className="font-display font-bold text-[11px] tracking-[0.25em] text-white pt-0.5">
                        ZİRVE KAYIT
                      </span>
                    </div>
                  </Button>
                  <div className="h-px w-[calc(100%-16px)] bg-linear-to-r from-transparent via-brand-main/30 to-transparent mx-auto my-1" />
                  <Button
                    pixelSize={2}
                    cornerColor="var(--color-brand-glow)"
                    glowColor="var(--color-brand-glow)"
                    onClick={() => {
                      window.open(
                        "https://skyl.app/yildiz-jam-yarisma-basvuru",
                        "_blank",
                      );
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full h-13 bg-linear-to-r from-brand-glow/10 to-transparent hover:from-brand-glow/20 shadow-inner group"
                  >
                    <div className="flex items-center justify-center gap-3 w-full">
                      <Crosshair className="w-4 h-4 text-brand-main group-hover:scale-110 transition-transform" />
                      <span className="font-display font-bold text-[11px] tracking-[0.25em] text-white pt-0.5">
                        YARIŞMA KAYIT
                      </span>
                    </div>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
