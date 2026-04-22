"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import PageSection from "./PageSection";
import { fadeUp } from "@/lib/animations";
import { FAQ_DATA } from "@/lib/faq";

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <PageSection
      id="sss"
      tag="KNOWLEDGE_BASE"
      title="SIKÇA SORULAN SORULAR"
      variant="section"
    >
      <div className="max-w-3xl mx-auto space-y-4 w-full">
        {FAQ_DATA.map((item) => (
          <motion.div variants={fadeUp} key={item.id}>
            <Card
              noPadding
              variant="solid"
              className="cursor-pointer bg-plum/40 border-white/5 transition-all duration-300 group"
              cornerColor={
                openFaq === item.id
                  ? "var(--color-brand-glow)"
                  : "rgba(255,255,255,0.1)"
              }
              glowColor={
                openFaq === item.id ? "var(--color-brand-glow)" : "transparent"
              }
            >
              <div
                className="px-6 py-5 flex justify-between items-center group-hover:bg-white/5 transition-colors"
                onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
              >
                <span
                  className={`font-tech text-sm transition-colors group-hover:text-white ${openFaq === item.id ? "text-white" : "text-slate-300"}`}
                >
                  <span
                    className={`font-pixel mr-2 transition-colors group-hover:text-brand-glow ${openFaq === item.id ? "text-brand-glow" : "text-slate-600"}`}
                  >
                    {">_"}
                  </span>
                  {item.q}
                </span>
                <div className="flex items-center font-pixel text-sm select-none">
                  <span
                    className={`transition-colors mr-1 ${openFaq === item.id ? "text-brand-glow" : "text-slate-600 group-hover:text-slate-400"}`}
                  >
                    [
                  </span>
                  <div className="relative w-3 h-3 flex items-center justify-center">
                    <span
                      className={`absolute w-3 h-0.5 transition-colors duration-300 ${openFaq === item.id ? "bg-brand-glow" : "bg-slate-500 group-hover:bg-slate-400"}`}
                    />
                    <motion.span
                      animate={{
                        rotate: openFaq === item.id ? 90 : 0,
                        opacity: openFaq === item.id ? 0 : 1,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`absolute w-0.5 h-3 transition-colors duration-300 ${openFaq === item.id ? "bg-brand-glow" : "bg-slate-500 group-hover:bg-slate-400"}`}
                    />
                  </div>
                  <span
                    className={`transition-colors ml-1 ${openFaq === item.id ? "text-brand-glow" : "text-slate-600 group-hover:text-slate-400"}`}
                  >
                    ]
                  </span>
                </div>
              </div>

              <AnimatePresence>
                {openFaq === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-6 border-t border-white/5 font-tech text-sm text-slate-300 bg-space/60 leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeUp}
        className="mt-16 pt-10 border-t border-white/5 text-center space-y-4 max-w-3xl mx-auto w-full"
      >
        <p className="font-tech text-sm text-slate-400 leading-relaxed">
          Etkinlik, kayıt süreci veya diğer merak ettiğiniz tüm konular hakkında
          bize ulaşmaktan çekinmeyin.
        </p>

        <div className="flex flex-col items-center gap-2">
          <span className="font-pixel text-[10px] text-brand-glow uppercase tracking-widest">
            İletişim Adresimiz:
          </span>
          <Button
            pixelSize={2}
            cornerColor="var(--color-brand-glow)"
            glowColor="var(--color-brand-glow)"
            onClick={() =>
              (window.location.href = "mailto:info@yildizskylab.com")
            }
          >
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-3 text-brand-glow" />
              <span className="font-pixel text-[10px] tracking-widest text-white uppercase">
                SEND_MAIL:{" "}
                <span className="font-tech text-[10px] sm:text-xs opacity-70 lowercase">
                  info@yildizskylab.com
                </span>
              </span>
            </div>
          </Button>
        </div>
      </motion.div>
    </PageSection>
  );
}
