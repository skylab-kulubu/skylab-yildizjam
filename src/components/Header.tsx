"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ShieldCheck, Crosshair } from "lucide-react";
import Button from "@/components/Button";
import { useCountdown } from "@/hooks/useCountdown";

const navLinks = [
  { href: "/", label: "Ana Menü", sectionId: "home" },
  { href: "/#oduller", label: "Loot", sectionId: "oduller" },
  { href: "/#ekip", label: "Karakterler", sectionId: "ekip" },
  { href: "/#sponsorlar", label: "Sponsorlar", sectionId: "sponsorlar" },
  { href: "/#sss", label: "Quest Log", sectionId: "sss" },
] as const;

const XP_BARS = Array.from({ length: 6 }, (_, i) => i);

const PixelHeart = React.memo(({ active }: { active: boolean }) => (
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

const MiniTimerUnit = React.memo(
  ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center w-7 sm:w-9">
      <div className="relative bg-space/60 border border-brand-main/30 px-1 py-0.5 rounded shadow-[0_0_8px_rgba(138,43,226,0.1)]">
        <span className="font-display text-[10px] sm:text-[12px] text-white tabular-nums drop-shadow-[0_0_3px_var(--color-brand-glow)]">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-pixel text-[5px] sm:text-[6px] uppercase text-brand-glow mt-0.5 tracking-tighter opacity-80">
        {label}
      </span>
    </div>
  ),
);
MiniTimerUnit.displayName = "MiniTimerUnit";

const MiniSeparator = React.memo(() => (
  <span className="text-brand-main text-[8px] self-start mt-1.5 animate-pulse opacity-50">
    :
  </span>
));
MiniSeparator.displayName = "MiniSeparator";

const MiniTimerDisplay = React.memo(
  ({ show, mounted }: { show: boolean; mounted: boolean }) => {
    const timeLeft = useCountdown();

    return (
      <AnimatePresence>
        {show && !timeLeft.hasEnded && mounted && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="flex items-center gap-0.5 overflow-hidden shrink-0"
          >
            <MiniTimerUnit value={timeLeft.days} label="GÜN" />
            <MiniSeparator />
            <MiniTimerUnit value={timeLeft.hours} label="SAAT" />
            <MiniSeparator />
            <MiniTimerUnit value={timeLeft.minutes} label="DAK" />
            <MiniSeparator />
            <MiniTimerUnit value={timeLeft.seconds} label="SAN" />
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);
MiniTimerDisplay.displayName = "MiniTimerDisplay";

const HEADER_TRANSITION = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };
const SPRING_NAV = { type: "spring", stiffness: 380, damping: 30 } as const;
const LOGO_TRANSITION = { duration: 0.5, ease: "easeInOut" } as const;
const DROPDOWN_TRANSITION = { duration: 0.2, ease: "easeOut" } as const;

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMiniTimer, setShowMiniTimer] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const registerDropdownRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setWindowWidth(document.documentElement.clientWidth);
    setMounted(true);

    const handleResize = () =>
      setWindowWidth(document.documentElement.clientWidth);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setIsScrolled(y > 50);
        setShowMiniTimer(y > 450);

        if (pathname === "/" && !isProgrammaticScroll.current) {
          const triggerOffset = 150;
          let currentSection = "home";

          for (const link of navLinks) {
            const el = document.getElementById(link.sectionId);
            if (el && el.getBoundingClientRect().top <= triggerOffset) {
              currentSection = el.id;
            }
          }

          if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 50
          ) {
            currentSection = navLinks[navLinks.length - 1].sectionId;
          }

          setActiveSection(currentSection);
        }
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (!isRegisterOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        registerDropdownRef.current &&
        !registerDropdownRef.current.contains(e.target as Node)
      ) {
        setIsRegisterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isRegisterOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, link: (typeof navLinks)[number]) => {
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

  const isActiveLink = useCallback(
    (link: (typeof navLinks)[number]) =>
      pathname === "/" && activeSection === link.sectionId,
    [pathname, activeSection],
  );

  const closeMobileAndAlert = useCallback((msg: string) => {
    alert(msg);
    setIsMobileMenuOpen(false);
  }, []);

  const headerWidth = !mounted
    ? "90%"
    : isScrolled
      ? "100%"
      : Math.min(1280, windowWidth - 32);

  const headerAnimate = {
    width: headerWidth,
    opacity: 1,
    y: isScrolled ? 0 : 20,
    height: isScrolled ? 60 : 76,
    borderRadius: isScrolled ? "0px" : "32px",
    backgroundColor: isScrolled
      ? "rgba(6, 4, 10, 0.85)"
      : "rgba(6, 4, 10, 0.45)",
    borderWidth: isScrolled ? "0 0 1px 0" : "1px",
    borderColor: isScrolled
      ? "rgba(138, 43, 226, 0.2)"
      : "rgba(138, 43, 226, 0.15)",
    boxShadow: isScrolled
      ? "0 10px 30px -10px rgba(0,0,0,0.5)"
      : "0 20px 40px -20px rgba(0,0,0,0.5)",
    backdropFilter: isScrolled ? "blur(16px)" : "blur(12px)",
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-1000 pointer-events-none flex justify-center">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={headerAnimate}
          transition={HEADER_TRANSITION}
          className="pointer-events-auto flex justify-center items-center overflow-visible border-solid"
        >
          <div className="relative w-full h-full max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6">
            <div className="flex-1 flex justify-start items-center z-10">
              <nav className="hidden xl:flex items-center justify-center gap-1 bg-white/2 border border-white/5 p-1 rounded-full h-11 shadow-inner">
                {navLinks.map((link) => {
                  const isActive = isActiveLink(link);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className="relative flex items-center justify-center px-5 h-full group"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-nav-pill"
                          className="absolute inset-0 bg-brand-main/15 border border-brand-main/40 rounded-full"
                          transition={SPRING_NAV}
                        />
                      )}
                      <span
                        className={`relative z-10 font-pixel text-[9px] tracking-[0.25em] uppercase transition-all duration-300 leading-none pt-1 ${
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

              <div className="xl:hidden flex items-center">
                <MiniTimerDisplay show={showMiniTimer} mounted={mounted} />
              </div>
            </div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center items-center w-15 xl:w-20 h-full z-20">
              <Link
                href="/"
                className="absolute group cursor-pointer z-50 flex items-center justify-center focus:outline-none"
                aria-label="Ana Sayfaya Dön"
              >
                <motion.div
                  initial={false}
                  animate={{
                    width: isScrolled ? 64 : 96,
                    height: isScrolled ? 64 : 96,
                  }}
                  transition={LOGO_TRANSITION}
                  className="relative flex items-center justify-center transition-shadow duration-700 shadow-[0_0_20px_var(--color-brand-main)]/10 hover:shadow-[0_0_35px_var(--color-brand-main)]/30 rounded-full"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: isScrolled
                        ? "rgba(6, 4, 10, 0.95)"
                        : "rgba(138, 43, 226, 0.12)",
                    }}
                    transition={LOGO_TRANSITION}
                    className="absolute inset-0.75 rounded-full z-0"
                  />
                  <div className="absolute inset-0.75 rounded-full bg-[radial-gradient(circle,var(--color-brand-glow)_0%,transparent_70%)] opacity-20 transition-opacity duration-700 z-10 pointer-events-none" />
                  <div className="absolute inset-0.75 rounded-full bg-[radial-gradient(circle,var(--color-brand-glow)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-700 z-10 pointer-events-none" />
                  <div
                    className="absolute top-1/2 left-1/2 w-[125%] h-[125%] -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_var(--color-brand-main)] pointer-events-none"
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
                  <div className="relative w-[75%] h-[75%] z-30 transition-all duration-700 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_var(--color-brand-main)]">
                    <Image
                      src="/img/yildizjambeyaz.png"
                      alt="Yıldız Jam Logo"
                      fill
                      priority
                      className="object-contain transition-all duration-700"
                      sizes="(max-width: 96px) 100vw"
                    />
                  </div>
                </motion.div>
              </Link>
            </div>

            <div className="flex-1 flex justify-end items-center gap-3 xl:gap-5 z-10">
              <div className="hidden xl:flex items-center">
                <MiniTimerDisplay show={showMiniTimer} mounted={mounted} />
              </div>

              <div className="hidden xl:flex flex-col items-end gap-1.5 select-none shrink-0 bg-white/2 p-1.5 px-3 rounded-lg border border-white/5">
                <div className="flex gap-4 font-pixel text-[8px] tracking-[0.15em] leading-none">
                  <div className="flex gap-1.5 items-center">
                    <span className="text-brand-main">1UP</span>
                    <span className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">
                      002026
                    </span>
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <span className="text-brand-glow">LVL</span>
                    <span className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">
                      01
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full justify-between">
                  <div className="flex gap-1.5">
                    <PixelHeart active={true} />
                    <PixelHeart active={true} />
                    <PixelHeart active={false} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-pixel text-[7px] text-brand-main pt-0.5">
                      XP
                    </span>
                    <div className="flex gap-0.5 bg-black/60 p-0.5 rounded-sm border border-white/10">
                      {XP_BARS.map((i) => (
                        <div
                          key={i}
                          className={`w-2.5 h-2 rounded-[1px] transition-colors duration-500 ${
                            i < 4
                              ? "bg-brand-glow shadow-[0_0_4px_var(--color-brand-glow)]"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="hidden xl:block relative z-1001 shrink-0"
                ref={registerDropdownRef}
              >
                <Button
                  pixelSize={2}
                  cornerColor="var(--color-brand-glow)"
                  glowColor="var(--color-brand-glow)"
                  onClick={() => setIsRegisterOpen((v) => !v)}
                  className="min-w-32.5! h-10! bg-brand-main/10 hover:bg-brand-main/20"
                >
                  <div className="flex items-center justify-center gap-2 w-full h-full">
                    <span className="font-display font-bold text-[10px] tracking-[0.15em] text-white pt-0.5">
                      KAYIT OL
                    </span>
                    <motion.div
                      animate={{ rotate: isRegisterOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-3.5 h-3.5 text-brand-glow drop-shadow-[0_0_5px_var(--color-brand-glow)]" />
                    </motion.div>
                  </div>
                </Button>

                <AnimatePresence>
                  {isRegisterOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8,
                        scale: 0.96,
                        transformOrigin: "top right",
                      }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={DROPDOWN_TRANSITION}
                      className="absolute top-[calc(100%+8px)] right-0 w-47.5 z-100 flex flex-col p-1.5 gap-1 rounded-xl overflow-hidden border border-brand-main/40 shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(138,43,226,0.15)]"
                      style={{
                        backgroundColor: "rgba(10, 6, 22, 0.85)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                      }}
                    >
                      <button
                        onClick={() => {
                          window.open(
                            "https://skyl.app/yildiz-jam-katilimci-formu",
                            "_blank",
                          );
                          setIsRegisterOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-brand-main/20 text-slate-300 hover:text-white transition-all duration-200 text-left group"
                      >
                        <ShieldCheck className="w-4 h-4 text-brand-action group-hover:scale-110 transition-transform" />
                        <span className="font-pixel text-[9px] tracking-widest uppercase pt-0.5">
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
                          setIsRegisterOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-brand-glow/15 text-slate-300 hover:text-white transition-all duration-200 text-left group"
                      >
                        <Crosshair className="w-4 h-4 text-brand-glow group-hover:scale-110 transition-transform" />
                        <span className="font-pixel text-[9px] tracking-widest uppercase pt-0.5">
                          YARIŞMA
                        </span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="xl:hidden p-2.5 text-white hover:text-brand-glow transition-colors rounded-xl bg-white/5 border border-white/10 shrink-0 hover:bg-white/10 active:scale-95"
                aria-label="Menüyü Aç/Kapat"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: "backOut" }}
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
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 xl:hidden z-40 bg-black/60 backdrop-blur-sm pointer-events-auto"
            />
            <motion.div
              initial={{ y: "-120%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-20 left-4 right-4 xl:hidden z-50 pointer-events-auto"
            >
              <div className="rounded-2xl overflow-hidden bg-linear-to-b from-[rgba(15,10,25,0.95)] to-[rgba(10,5,15,0.98)] border border-brand-main/40 shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
                <nav className="p-4 flex flex-col gap-1">
                  {navLinks.map((link, index) => {
                    const isActive = isActiveLink(link);
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          delay: 0.1 + index * 0.05,
                          duration: 0.3,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link)}
                          className="relative flex items-center p-4 rounded-xl transition-all duration-300 group overflow-hidden"
                        >
                          <div
                            className={`absolute inset-0 transition-opacity duration-300 ${isActive ? "bg-brand-main/15 opacity-100" : "bg-white/5 opacity-0 group-hover:opacity-100"}`}
                          />
                          {isActive && (
                            <motion.div
                              layoutId="mobile-active-indicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-2/3 bg-brand-glow rounded-r-full shadow-[0_0_10px_var(--color-brand-glow)]"
                            />
                          )}
                          <span
                            className={`relative z-10 font-pixel text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 pl-2 ${isActive ? "text-brand-glow font-bold drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]" : "text-slate-300 group-hover:text-white"}`}
                          >
                            {link.label}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="p-5 border-t border-white/10 bg-black/20 flex flex-col gap-3.5"
                >
                  <Button
                    pixelSize={2}
                    cornerColor="var(--color-brand-main)"
                    glowColor="var(--color-brand-main)"
                    onClick={() => closeMobileAndAlert("Zirve Kayıt")}
                    className="w-full h-13 bg-linear-to-r from-brand-main/10 to-transparent hover:from-brand-main/20 shadow-inner"
                  >
                    <div className="flex items-center justify-center gap-3 w-full">
                      <ShieldCheck className="w-4 h-4 text-brand-action" />
                      <span className="font-display font-bold text-[11px] tracking-[0.25em] text-white pt-0.5">
                        ZİRVE KAYIT
                      </span>
                    </div>
                  </Button>
                  <Button
                    pixelSize={2}
                    cornerColor="var(--color-brand-glow)"
                    glowColor="var(--color-brand-glow)"
                    onClick={() => closeMobileAndAlert("Yarışma Kayıt")}
                    className="w-full h-13 bg-linear-to-r from-brand-glow/10 to-transparent hover:from-brand-glow/20 shadow-inner"
                  >
                    <div className="flex items-center justify-center gap-3 w-full">
                      <Crosshair className="w-4 h-4 text-brand-main" />
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
