export interface Sponsor {
  id: string;
  categoryId: string;
  name: string;
  logoUrl: string;
}

export interface SponsorCategory {
  id: string;
  title: string;
  color: string;
}

export const SPONSOR_CATEGORIES: SponsorCategory[] = [
  { id: "bronze", title: "Bronz Sponsor", color: "#CD7F32" },
  { id: "destek", title: "Destek Sponsoru", color: "var(--color-brand-main)" },
  {
    id: "sosyal-medya",
    title: "Sosyal Medya Sponsorları",
    color: "var(--color-brand-action)",
  },
  {
    id: "fuaye",
    title: "Fuaye Sponsorları",
    color: "var(--color-brand-glow)",
  },
];

export const SPONSORS_DATA: Sponsor[] = [
  {
    id: "s-b1",
    categoryId: "bronze",
    name: "Sisal",
    logoUrl: "sisal.svg",
  },
  {
    id: "s-b2",
    categoryId: "bronze",
    name: "Eczacıbaşı",
    logoUrl: "eczacibasi.png",
  },
  {
    id: "s-d1",
    categoryId: "destek",
    name: "ASIST",
    logoUrl: "asist.jpeg",
  },

  {
    id: "s-sm1",
    categoryId: "sosyal-medya",
    name: "Mobidictum",
    logoUrl: "mobidictum.png",
  },
  {
    id: "s-sm2",
    categoryId: "sosyal-medya",
    name: "Leartes Studios",
    logoUrl: "leartes.webp",
  },
  {
    id: "s-sm3",
    categoryId: "sosyal-medya",
    name: "Game Design Academia",
    logoUrl: "gamedesignacademia.svg",
  },

  {
    id: "s-f1",
    categoryId: "fuaye",
    name: "Maruderm",
    logoUrl: "maruderm.jpg",
  },
  {
    id: "s-f2",
    categoryId: "fuaye",
    name: "Salacak Kebap Balık",
    logoUrl: "salacak.png",
  },
  {
    id: "s-f3",
    categoryId: "fuaye",
    name: "Süleymaniye Çikolatacısı",
    logoUrl: "suleymaniye.png",
  },
  {
    id: "s-f4",
    categoryId: "fuaye",
    name: "Bifa",
    logoUrl: "bifa.png",
  },
  {
    id: "s-f5",
    categoryId: "fuaye",
    name: "Has Çiğköfte Dünyası",
    logoUrl: "has.png",
  },
  {
    id: "s-f6",
    categoryId: "fuaye",
    name: "OHBE! İçecek",
    logoUrl: "ohbe.png",
  },
  {
    id: "s-f7",
    categoryId: "fuaye",
    name: "Das Haus Des Döners",
    logoUrl: "dashaus.png",
  },
  {
    id: "s-f8",
    categoryId: "fuaye",
    name: "Alt+Tab Kuluçka Merkezi",
    logoUrl: "alttab.png",
  },
  {
    id: "s-f9",
    categoryId: "fuaye",
    name: "Adeks",
    logoUrl: "adeks.png",
  },
  {
    id: "s-f10",
    categoryId: "fuaye",
    name: "Porty",
    logoUrl: "porty.png",
  },
  {
    id: "s-f11",
    categoryId: "fuaye",
    name: "Çayeks",
    logoUrl: "cayeks.png",
  },
  {
    id: "s-f12",
    categoryId: "fuaye",
    name: "Narbulut",
    logoUrl: "narbulut.webp",
  },
  {
    id: "s-f13",
    categoryId: "fuaye",
    name: "Kervansaray Çiğköfte",
    logoUrl: "kervansaray.png",
  },
  {
    id: "s-f14",
    categoryId: "fuaye",
    name: "Antephan Künefe",
    logoUrl: "antephan.png",
  },
  {
    id: "s-f15",
    categoryId: "fuaye",
    name: "Bi' Sandviç Bi' Pilav",
    logoUrl: "bisandvic.png",
  },
  {
    id: "s-f16",
    categoryId: "fuaye",
    name: "Makarina",
    logoUrl: "makarina.png",
  },
  {
    id: "s-f17",
    categoryId: "fuaye",
    name: "Altın Nohutlu Pilav Salonu",
    logoUrl: "altin.png",
  },
];
