export interface ScheduleItem {
  id: string;
  time: string;
  speakers: string[];
  title?: string;
  isSpecial?: boolean;
}

export const SCHEDULE_MAY_8: ScheduleItem[] = [
  {
    id: "s0",
    time: "12.00",
    speakers: [],
    title: "KAPI AÇILIŞI",
    isSpecial: true,
  },
  {
    id: "s1",
    time: "12.30",
    speakers: ["BAHADIR UÇAN"],
    title: "AÇILIŞ KONUŞMASI",
  },
  {
    id: "s2",
    time: "13.00–13.30",
    speakers: ["GÜRKAN AVUCAN"],
  },
  {
    id: "s3",
    time: "13.45–14.15",
    speakers: ["ALİ GHADİRİ"],
    title: "AI ÇAĞINDA YAZILIMCI OLMAK",
  },
  {
    id: "s4",
    time: "14.30–15.00",
    speakers: ["ŞENAY YAĞMUR EFE"],
    title: "OYUNUNUZU GELİŞTİRİRKEN OYUNUNUZDAN OLMADIN",
  },
  {
    id: "s5",
    time: "15.30–16.00",
    speakers: ["TUĞBEK OLEK", "ÖMER FARUK GÜNGÖR"],
    title: "BÜYÜK STÜDYODA KARİYER İNŞA ETMEK",
  },
  {
    id: "s6",
    time: "16.15–16.45",
    speakers: ["NİHAT BARAN MENTEŞ"],
    title: "HOW TO PUBLISH YOUR GAME",
  },
  {
    id: "s7",
    time: "17.00–17.30",
    speakers: ["MUHAMMED DOĞRU"],
    title: "YAZILIMCILAR İÇİN OYUN SEKTÖRÜ",
  },
];
