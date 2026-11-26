"use client";

import { ErrorScene } from "@/components/error/ErrorScene";

// A page that failed to render: the club's 500 scene (or the offline one).
export default function Error() {
  return <ErrorScene />;
}
