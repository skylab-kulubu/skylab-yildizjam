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
  { id: "gold", title: "Altın Sponsor", color: "var(--color-brand-reward)" },
  { id: "bronze", title: "Bronz Sponsor", color: "#CD7F32" },
  { id: "session", title: "Oturum & Fuaye", color: "var(--color-brand-glow)" },
  {
    id: "product",
    title: "Ürün Sponsorları",
    color: "var(--color-brand-action)",
  },
];

export const SPONSORS_DATA: Sponsor[] = [
  {
    id: "s-g1",
    categoryId: "gold",
    name: "Logo 1",
    logoUrl: "https://placehold.co/128x128/transparent/ffffff.svg?text=LOGO\n1",
  },
  {
    id: "s-g2",
    categoryId: "gold",
    name: "Logo 2",
    logoUrl: "https://placehold.co/128x128/transparent/ffffff.svg?text=LOGO\n2",
  },
  {
    id: "s-b1",
    categoryId: "bronze",
    name: "Logo 3",
    logoUrl: "https://placehold.co/128x128/transparent/ffffff.svg?text=LOGO\n3",
  },
  {
    id: "s-b2",
    categoryId: "bronze",
    name: "Logo 4",
    logoUrl: "https://placehold.co/128x128/transparent/ffffff.svg?text=LOGO\n4",
  },
  {
    id: "s-b3",
    categoryId: "bronze",
    name: "Logo 5",
    logoUrl: "https://placehold.co/128x128/transparent/ffffff.svg?text=LOGO\n5",
  },
  {
    id: "s-s1",
    categoryId: "session",
    name: "Logo 6",
    logoUrl: "https://placehold.co/128x128/transparent/ffffff.svg?text=LOGO\n6",
  },
  {
    id: "s-s2",
    categoryId: "session",
    name: "Logo 7",
    logoUrl: "https://placehold.co/128x128/transparent/ffffff.svg?text=LOGO\n7",
  },
  {
    id: "s-s3",
    categoryId: "session",
    name: "Logo 8",
    logoUrl: "https://placehold.co/128x128/transparent/ffffff.svg?text=LOGO\n8",
  },
  {
    id: "s-s4",
    categoryId: "session",
    name: "Logo 9",
    logoUrl: "https://placehold.co/128x128/transparent/ffffff.svg?text=LOGO\n9",
  },
  {
    id: "s-p1",
    categoryId: "product",
    name: "Logo 10",
    logoUrl:
      "https://placehold.co/128x128/transparent/ffffff.svg?text=LOGO\n10",
  },
  {
    id: "s-p2",
    categoryId: "product",
    name: "Logo 11",
    logoUrl:
      "https://placehold.co/128x128/transparent/ffffff.svg?text=LOGO\n11",
  },
  {
    id: "s-p3",
    categoryId: "product",
    name: "Logo 12",
    logoUrl:
      "https://placehold.co/128x128/transparent/ffffff.svg?text=LOGO\n12",
  },
  {
    id: "s-p4",
    categoryId: "product",
    name: "Logo 13",
    logoUrl:
      "https://placehold.co/128x128/transparent/ffffff.svg?text=LOGO\n13",
  },
  {
    id: "s-p5",
    categoryId: "product",
    name: "Logo 14",
    logoUrl:
      "https://placehold.co/128x128/transparent/ffffff.svg?text=LOGO\n14",
  },
  {
    id: "s-p6",
    categoryId: "product",
    name: "Logo 15",
    logoUrl:
      "https://placehold.co/128x128/transparent/ffffff.svg?text=LOGO\n15",
  },
];
