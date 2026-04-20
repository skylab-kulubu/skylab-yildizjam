import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FAQ from "@/components/Faq";
import Experts from "@/components/Experts";
import Sponsors from "@/components/Sponsors";
import Prizes from "@/components/Prizes";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-100">
      <Header />
      <Hero />
      <Features />
      <Prizes />
      <Sponsors />
      <Experts />
      <FAQ />
      <Footer />
    </div>
  );
}
