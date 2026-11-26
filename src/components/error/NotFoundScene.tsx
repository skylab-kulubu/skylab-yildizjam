"use client";

import { useRouter } from "next/navigation";
import notFound from "@/error-scenes/notFound.json";
import { ScenePage, type SceneData } from "./ScenePage";

// The button goes home; the site's other buttons are <button>s too (Button).
export function NotFoundScene() {
  const router = useRouter();
  return <ScenePage scene={notFound as SceneData} action={() => router.push("/")} />;
}
