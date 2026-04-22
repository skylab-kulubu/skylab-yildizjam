export interface Expert {
  id: string;
  categoryId: string;
  name: string;
  role: string;
  company?: string;
  image?: string;
  isLocked: boolean;
}

export interface ExpertCategory {
  id: string;
  title: string;
  tag: string;
  color: string;
}

export const EXPERT_CATEGORIES: ExpertCategory[] = [
  {
    id: "konusmacilar",
    title: "KONUŞMACILAR",
    tag: "MAIN_CAST",
    color: "var(--color-brand-action)",
  },
  {
    id: "online-seminer",
    title: "ONLINE SEMİNER KONUŞMACILARI",
    tag: "DIGITAL_VOICE",
    color: "var(--color-brand-main)",
  },
  {
    id: "juriler",
    title: "JÜRİLER",
    tag: "BOSS_ENCOUNTER",
    color: "var(--color-brand-reward)",
  },
  {
    id: "mentorler",
    title: "MENTÖRLER",
    tag: "SUPPORT_GUILD",
    color: "var(--color-brand-glow)",
  },
];

export const EXPERTS_DATA: Expert[] = [
  {
    id: "k1",
    categoryId: "konusmacilar",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "k2",
    categoryId: "konusmacilar",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "k3",
    categoryId: "konusmacilar",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "k4",
    categoryId: "konusmacilar",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "k5",
    categoryId: "konusmacilar",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },

  {
    id: "o1",
    categoryId: "online-seminer",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "o2",
    categoryId: "online-seminer",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "o3",
    categoryId: "online-seminer",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "o4",
    categoryId: "online-seminer",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },

  {
    id: "j1",
    categoryId: "juriler",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "j2",
    categoryId: "juriler",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "j3",
    categoryId: "juriler",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },

  {
    id: "m1",
    categoryId: "mentorler",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "m2",
    categoryId: "mentorler",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "m3",
    categoryId: "mentorler",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "m4",
    categoryId: "mentorler",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "m5",
    categoryId: "mentorler",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "m6",
    categoryId: "mentorler",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "m7",
    categoryId: "mentorler",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
  {
    id: "m8",
    categoryId: "mentorler",
    name: "? ? ?",
    role: "Kilitli",
    isLocked: true,
  },
];
