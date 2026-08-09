"use client";

import { useSyncExternalStore } from "react";
import { LAUNCH_AT_UTC } from "@/lib/launch/config";

type Remaining = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getRemainingFromSeconds(totalSeconds: number): Remaining {
  const total = Math.max(0, totalSeconds) * 1000;
  const seconds = Math.max(0, totalSeconds);
  return {
    total,
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

function getTotalSeconds(): number {
  return Math.max(
    0,
    Math.floor((LAUNCH_AT_UTC.getTime() - Date.now()) / 1000),
  );
}

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(id);
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export function LaunchCountdown() {
  const totalSeconds = useSyncExternalStore(
    subscribe,
    getTotalSeconds,
    () => -1,
  );

  if (totalSeconds < 0) {
    return (
      <div className="grid grid-cols-4 gap-3 sm:gap-4" aria-hidden>
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div
            key={label}
            className="rounded-2xl bg-white px-3 py-4 text-center shadow-sm ring-1 ring-border sm:px-4 sm:py-5"
          >
            <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              --
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted">
              {label}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (totalSeconds <= 0) {
    return null;
  }

  const remaining = getRemainingFromSeconds(totalSeconds);
  const units = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Minutes", value: remaining.minutes },
    { label: "Seconds", value: remaining.seconds },
  ];

  return (
    <div
      className="grid grid-cols-4 gap-3 sm:gap-4"
      role="timer"
      aria-label={`Countdown to LawGPT launch: ${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes`}
    >
      {units.map((unit) => (
        <div
          key={unit.label}
          className="rounded-2xl bg-white px-3 py-4 text-center shadow-sm ring-1 ring-border sm:px-4 sm:py-5"
        >
          <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {unit.label === "Days" ? unit.value : pad(unit.value)}
          </p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted">
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  );
}
