"use client";
import { motion } from "framer-motion";
import { Gem, Users, Sparkles } from "lucide-react";
import Card from "@/components/Card";
import { fadeScale } from "@/lib/animations";
import PageSection from "./PageSection";

const PERKS = [
  {
    icon: Gem,
    title: "Epic Loot",
    color: "var(--color-brand-reward)",
    lvl: "LVL.1",
    desc: (
      <>
        Toplam <span className="font-bold text-white">60.000 TL</span> ödül
        havuzundan payını al, donanımını güçlendir.
      </>
    ),
  },
  {
    icon: Users,
    title: "Co-op Modu",
    color: "var(--color-brand-action)",
    lvl: "LVL.2",
    desc: (
      <>
        AAA ve Indie sektöründen{" "}
        <span className="font-bold text-white">ustalarla tanış</span>, party'ni
        kur ve network yeteneğini aç.
      </>
    ),
  },
  {
    icon: Sparkles,
    title: "Level Up",
    color: "var(--color-brand-glow)",
    lvl: "LVL.MAX",
    desc: (
      <>
        Kısıtlı sürede üretim sınırlarını zorla,{" "}
        <span className="font-bold text-white">XP kazan</span> ve portfolyonu
        genişlet.
      </>
    ),
  },
];

export default function Features() {
  return (
    <PageSection
      id="features"
      tag="CHOOSE_YOUR_PERKS"
      title="NEDEN KATILMALISIN?"
      variant="hero"
      color="var(--color-brand-glow)"
      showBar={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
        {PERKS.map((perk, index) => (
          <motion.div key={index} variants={fadeScale} className="group">
            <Card
              noPadding
              variant="default"
              cornerColor={perk.color}
              glowColor={perk.color}
              className="h-full overflow-visible"
            >
              <div className="p-5 sm:p-8 flex flex-col items-center text-center gap-5 h-full relative">
                <div className="absolute top-0 right-0 p-3 opacity-20 font-pixel text-[10px]">
                  {perk.lvl}
                </div>

                <div
                  className="w-16 h-16 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-all duration-500"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${perk.color} 10%, transparent)`,
                    borderColor: `color-mix(in srgb, ${perk.color} 30%, transparent)`,
                    boxShadow: `0 0 20px color-mix(in srgb, ${perk.color} 15%, transparent)`,
                  }}
                >
                  <perk.icon
                    className="w-8 h-8"
                    style={{ color: perk.color }}
                  />
                </div>

                <div className="space-y-2">
                  <h3
                    className="font-display font-bold text-base sm:text-lg tracking-widest uppercase"
                    style={{ color: perk.color }}
                  >
                    {perk.title}
                  </h3>
                  <p className="font-tech text-slate-400 leading-relaxed text-sm">
                    {perk.desc}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
}
