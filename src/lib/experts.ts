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
    name: "DOÇ. DR. BAHADIR UÇAN",
    role: "Açılış Konuşması",
    image: "bucan.jpeg",
    isLocked: false,
  },
  {
    id: "k2",
    categoryId: "konusmacilar",
    name: "GÜRKAN AVUCAN",
    role: "Service Solutions Manager",
    image: "gavucan.jpeg",
    isLocked: false,
  },
  {
    id: "k3",
    categoryId: "konusmacilar",
    name: "ALİ GHADİRİ",
    role: "Game Development Architect at Sisal",
    image: "aghadiri.jpeg",
    isLocked: false,
  },
  {
    id: "k4",
    categoryId: "konusmacilar",
    name: "ŞENAY YAĞMUR EFE",
    role: "Game Industry Lawyer of Grant&Guard",
    image: "syefe.jpeg",
    isLocked: false,
  },
  {
    id: "k5",
    categoryId: "konusmacilar",
    name: "TUĞBEK OLEK",
    role: "Büyük Stüdyolarda Kariyerini İnşa Etmek (Panel)",
    image: "tolek.jpeg",
    isLocked: false,
  },
  {
    id: "k6",
    categoryId: "konusmacilar",
    name: "ÖMER FARUK GÜNGÖR",
    role: "Büyük Stüdyolarda Kariyerini İnşa Etmek (Panel)",
    image: "ofgungor.jpeg",
    isLocked: false,
  },
  {
    id: "k7",
    categoryId: "konusmacilar",
    name: "NİHAT BARAN MENTEŞ",
    role: "Co-Founder of Game Design Academia",
    image: "nbmentes.jpeg",
    isLocked: false,
  },
  {
    id: "k8",
    categoryId: "konusmacilar",
    name: "MUHAMMED DOĞRU",
    role: "Game Developer of Nokta Games",
    image: "mdogru.jpeg",
    isLocked: false,
  },

  {
    id: "o1",
    categoryId: "online-seminer",
    name: "ALİ KARA",
    role: "Content Designer at Paradox Interactive",
    image: "akara.jpeg",
    isLocked: false,
  },
  {
    id: "o2",
    categoryId: "online-seminer",
    name: "İPEK AKKUZU",
    role: "3D Artist at mightyraccoon! Studios",
    image: "iakkuzu.jpeg",
    isLocked: false,
  },

  {
    id: "j1",
    categoryId: "juriler",
    name: "MERTOL ALTINAY",
    role: "Founder of Balas Games",
    image: "mraltinay.jpeg",
    isLocked: false,
  },
  {
    id: "j2",
    categoryId: "juriler",
    name: "HAKAN TOKER",
    role: "Game Development Senior Specialist",
    image: "htoker.jpeg",
    isLocked: false,
  },
  {
    id: "j3",
    categoryId: "juriler",
    name: "NİHAT BARAN MENTEŞ",
    role: "Co-Founder of Game Design Academia",
    image: "nbmentes.jpeg",
    isLocked: false,
  },

  {
    id: "m1",
    categoryId: "mentorler",
    name: "DENİZ EVRENSEL",
    role: "Game Development Senior Specialist",
    image: "devrensel.jpeg",
    isLocked: false,
  },
  {
    id: "m2",
    categoryId: "mentorler",
    name: "MERT VANLIOĞLU",
    role: "Game Development Senior Specialist",
    image: "mvanlioglu.jpeg",
    isLocked: false,
  },
  {
    id: "m3",
    categoryId: "mentorler",
    name: "ÜMİT ÇAKIR",
    role: "Game Studio Manager",
    image: "ucakir.jpeg",
    isLocked: false,
  },
  {
    id: "m4",
    categoryId: "mentorler",
    name: "ARMAN KARA",
    role: "Mobile Gaming Team Leader",
    image: "arkara.jpeg",
    isLocked: false,
  },
  {
    id: "m5",
    categoryId: "mentorler",
    name: "BAŞAK KARACAN",
    role: "Game Animator Senior Specialist",
    image: "bkaracan.jpeg",
    isLocked: false,
  },
  {
    id: "m6",
    categoryId: "mentorler",
    name: "HAZAL SARISALTIK",
    role: "3D Game Art Senior Specialist",
    image: "hsarisaltik.jpeg",
    isLocked: false,
  },
  {
    id: "m7",
    categoryId: "mentorler",
    name: "FERİDUN SUAY BAYAR",
    role: "Game Developer",
    image: "fsbayar.jpeg",
    isLocked: false,
  },
  {
    id: "m8",
    categoryId: "mentorler",
    name: "SAMİ ATAKAN ÇANKAYA",
    role: "Game Lead Developer",
    image: "sacankaya.jpeg",
    isLocked: false,
  },
  {
    id: "m9",
    categoryId: "mentorler",
    name: "TUNAHAN YARIM",
    role: "Operation Manager",
    image: "tyarim.jpeg",
    isLocked: false,
  },
  {
    id: "m10",
    categoryId: "mentorler",
    name: "NİHAT BARAN MENTEŞ",
    role: "Co-Founder of Game Design Academia",
    image: "nbmentes.jpeg",
    isLocked: false,
  },
  {
    id: "m11",
    categoryId: "mentorler",
    name: "OKAN AKÇİÇEK",
    role: "Operation Management Intern",
    image: "oakcicek.jpeg",
    isLocked: false,
  },
];
