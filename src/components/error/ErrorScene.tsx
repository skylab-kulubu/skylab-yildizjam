"use client";

import { useSyncExternalStore } from "react";
import error from "@/error-scenes/error.json";
import offline from "@/error-scenes/offline.json";
import { ScenePage, type SceneData } from "./ScenePage";

function onConnectionChange(change: () => void) {
  window.addEventListener("online", change);
  window.addEventListener("offline", change);
  return () => {
    window.removeEventListener("online", change);
    window.removeEventListener("offline", change);
  };
}

// A full page load asks the server again, which is what a failed render needs;
// the boundary's reset() alone would draw the same server output.
function reload() {
  window.location.reload();
}

// The error boundary's page (app/error.tsx): the 500 scene, or the offline one while
// the browser has no connection.
export function ErrorScene() {
  // Read in the browser only: the server and the first browser render both say online
  const isOffline = useSyncExternalStore(
    onConnectionChange,
    () => !navigator.onLine,
    () => false,
  );
  return <ScenePage scene={(isOffline ? offline : error) as SceneData} action={reload} />;
}
