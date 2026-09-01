"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Content, Locale } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * The Windows 95 taskbar. It gives the minimised window somewhere to go, and
 * the Start menu is a second, always-reachable way into the pages.
 */
export default function Taskbar({
  locale,
  content,
  title,
  minimized,
  onToggleWindow,
}: {
  locale: Locale;
  content: Content;
  title: string;
  minimized: boolean;
  onToggleWindow: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, [locale]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const pages = [
    { href: `/${locale}`, label: content.nav.home },
    { href: `/${locale}/projects`, label: content.nav.projects },
    { href: `/${locale}/about`, label: content.nav.about },
    { href: `/${locale}/contact`, label: content.nav.contact },
  ];

  return (
    <div
      ref={rootRef}
      className="fixed inset-x-0 bottom-0 z-40 flex h-[30px] items-center gap-1 border-t-2 border-t-white bg-silver px-1 print:hidden"
    >
      {open ? (
        <div
          role="menu"
          aria-label={content.window.taskbar.start}
          className="bevel-out absolute bottom-[30px] left-1 flex bg-silver p-[3px]"
        >
          <div
            aria-hidden
            className="flex w-7 items-end justify-center bg-title pb-3"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            <span className="text-[15px] font-bold text-title-text">sedatoneer</span>
          </div>
          <div className="min-w-[11rem]">
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-3 py-[6px] text-[13px] hover:bg-title hover:text-title-text"
              >
                {page.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 px-2 py-[3px] text-[12px] font-bold",
          open ? "bevel-in" : "bevel-out",
        )}
      >
        <svg aria-hidden viewBox="0 0 16 16" width={14} height={14} shapeRendering="crispEdges">
          <rect x="0" y="1" width="7" height="6" fill="#ff0000" />
          <rect x="8" y="0" width="8" height="7" fill="#00a000" />
          <rect x="0" y="8" width="7" height="7" fill="#0000c0" />
          <rect x="8" y="8" width="8" height="8" fill="#ffc000" />
        </svg>
        {content.window.taskbar.start}
      </button>

      <button
        type="button"
        onClick={onToggleWindow}
        aria-pressed={!minimized}
        className={cn(
          "min-w-0 max-w-[16rem] flex-1 truncate px-2 py-[3px] text-left text-[12px]",
          minimized ? "bevel-out" : "bevel-in font-bold",
        )}
      >
        {title}
      </button>

      <span className="bevel-field ml-auto shrink-0 px-2 py-[2px] text-[12px] tabular-nums">
        {time ?? "--:--"}
      </span>
    </div>
  );
}
