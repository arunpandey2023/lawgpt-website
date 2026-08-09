"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function getModKeyLabel(): string {
  return /Mac|iPhone|iPad|iPod/.test(
    navigator.platform || navigator.userAgent,
  )
    ? "⌘"
    : "Ctrl";
}

/** Platform modifier key label without an effect-driven setState. */
export function useModKeyLabel(): string {
  return useSyncExternalStore(subscribe, getModKeyLabel, () => "Ctrl");
}
