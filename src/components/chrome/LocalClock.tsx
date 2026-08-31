"use client";

import { useEffect, useState } from "react";

const FORMAT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Istanbul",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/**
 * Istanbul wall clock. Renders a stable placeholder on the server so the
 * markup matches, then starts ticking once mounted.
 */
export default function LocalClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(FORMAT.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[11px] tabular-nums tracking-[0.1em] text-ink-2">
      {time ?? "--:--"}
    </span>
  );
}
