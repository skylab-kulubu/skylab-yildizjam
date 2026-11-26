"use client";

import { useState, useSyncExternalStore } from "react";
import Button from "@/components/Button";
import "@/error-scenes/error-scene.css";
import "./error-scene-yildizjam.css";

// A kind's file from src/error-scenes (skylcn-ui's error scenes, copied in).
export type SceneWords = { code: string; title: string; description: string; action: string };
export type SceneData = {
  kind: string;
  variants: string[];
  random: string[];
  text: { tr: Record<string, SceneWords> };
  svg: Record<string, string>;
};

const noSubscription = () => () => {};

// One of the kind's drawings at random on each visit, chosen in the browser, as
// skylcn-ui's ErrorScenePage does. While a server-rendered page hydrates there is no
// pick yet, so the server's HTML and the first browser render agree; the first drawing
// waits hidden meanwhile (skylcn-error-pending in error-scene.css, at most 1.5 s).
function useSceneVariant(scene: SceneData): string | undefined {
  const [random] = useState(() => scene.random[Math.floor(Math.random() * scene.random.length)]);
  const inBrowser = useSyncExternalStore(noSubscription, () => true, () => false);
  return inBrowser ? random : undefined;
}

// A whole-page error: the scene (inline SVG, decoration only) above its words and one
// button, a link with `href` (404) or a button with `action` (error boundary).
export function ScenePage({ scene, href, action }: { scene: SceneData; href?: string; action?: () => void }) {
  const picked = useSceneVariant(scene);
  const shown = picked && picked in scene.svg ? picked : scene.random[0];
  const words = scene.text.tr[shown];

  return (
    <main className="yildizjam-error relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg-base px-5 py-24 text-center text-white">
      {/* a new drawing enters afresh once it is picked */}
      <div key={picked ?? "pending"} className={`flex flex-col items-center gap-7 ${picked ? "" : "skylcn-error-pending"}`}>
        <div className="flex w-72 max-w-full flex-col items-center gap-3">
          <div className="w-full" dangerouslySetInnerHTML={{ __html: scene.svg[shown] }} />
          <p className="font-display text-xs font-bold tracking-[0.2em] text-brand-glow tabular-nums">{words.code}</p>
        </div>
        <div className="flex max-w-md flex-col gap-3">
          <h1 className="font-display text-3xl font-bold">{words.title}</h1>
          <p className="text-base leading-relaxed text-white/70">{words.description}</p>
        </div>
        <Button href={href} onClick={action} className="sm:w-auto">
          <span className="font-display text-[12px] font-bold tracking-[0.2em] text-brand-glow uppercase">{words.action}</span>
        </Button>
      </div>
    </main>
  );
}
