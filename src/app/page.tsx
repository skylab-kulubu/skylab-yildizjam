"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MarqueeSeparator from "@/components/Marquee";
import Features from "@/components/Features";
import FAQ from "@/components/Faq";
import Experts from "@/components/Experts";
import Sponsors from "@/components/Sponsors";
import Prizes from "@/components/Prizes";
import Footer from "@/components/Footer";
import Background from "@/components/Background";

export default function Home() {
  return (
    <main className="min-h-screen bg-space text-white font-tech selection:bg-volt/30 overflow-x-hidden pb-16 relative">
      <Background />
      <Header />
      <Hero />
      <MarqueeSeparator />
      <Features />
      <Prizes />
      <Experts />
      <Sponsors />
      <FAQ />
      <Footer />
    </main>
  );
}
