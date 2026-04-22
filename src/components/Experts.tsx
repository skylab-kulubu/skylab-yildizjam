"use client";

import PageSection from "./PageSection";

export default function Experts() {
  const sections = [
    {
      id: "konusmacilar",
      title: "KONUŞMACILAR",
      tag: "MAIN_CAST",
      color: "var(--color-brand-action)",
      count: 5,
    },
    {
      id: "online-seminer",
      title: "ONLINE SEMİNER KONUŞMACILARI",
      tag: "DIGITAL_VOICE",
      color: "var(--color-brand-main)",
      count: 4,
    },
    {
      id: "juriler",
      title: "JÜRİLER",
      tag: "BOSS_ENCOUNTER",
      color: "var(--color-brand-reward)",
      count: 3,
    },
    {
      id: "mentorler",
      title: "MENTÖRLER",
      tag: "SUPPORT_GUILD",
      color: "var(--color-brand-glow)",
      count: 8,
    },
  ];

  return (
    <section id="ekip" className="relative z-10 w-full py-12 mb-12">
      <div className="flex flex-col">
        {sections.map((s) => (
          <PageSection
            key={s.id}
            id={s.id}
            title={s.title}
            tag={s.tag}
            color={s.color}
            variant="subcategory"
            className="py-0"
            showBar={true}
          >
            {" "}
          </PageSection>
        ))}
      </div>
    </section>
  );
}
