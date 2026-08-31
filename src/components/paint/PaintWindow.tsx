"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  getServerSnapshot,
  getSnapshot,
  setColour,
  subscribe,
  textSafe,
} from "@/lib/colour";
import type { Content, Locale } from "@/content/types";
import { LOCALES } from "@/content/types";
import { cn } from "@/lib/cn";
import ToolIcon from "./ToolIcon";

/** MS Paint's default palette: 28 colours, two rows of fourteen. */
const PALETTE = [
  ["#000000", "#808080", "#800000", "#808000", "#008000", "#008080", "#000080",
   "#800080", "#808040", "#004040", "#0080ff", "#004080", "#8000ff", "#804000"],
  ["#ffffff", "#c0c0c0", "#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff",
   "#ff00ff", "#ffff80", "#00ff80", "#80ffff", "#8080ff", "#ff0080", "#ff8040"],
];

export default function PaintWindow({
  locale,
  content,
  children,
}: {
  locale: Locale;
  content: Content;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const colour = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [picked, setPicked] = useState(false);

  // Push the colour out to CSS, which is the external system here.
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--accent", colour);
    root.setProperty("--accent-ink", textSafe(colour));
  }, [colour]);

  const pick = (value: string) => {
    setColour(value);
    setPicked(true);
  };

  const tools = [
    { key: "home", href: `/${locale}`, label: content.nav.home },
    { key: "projects", href: `/${locale}/projects`, label: content.nav.projects },
    { key: "about", href: `/${locale}/about`, label: content.nav.about },
    { key: "contact", href: `/${locale}/contact`, label: content.nav.contact },
  ];

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href);

  const current = tools.find((t) => isActive(t.href))?.label ?? content.nav.home;

  const otherLocale = LOCALES.find((l) => l !== locale)!;
  const localeHref = `/${otherLocale}${pathname.split("/").slice(2).join("/") ? `/${pathname.split("/").slice(2).join("/")}` : ""}`;

  return (
    <div className="h-dvh p-0 sm:p-3 md:p-6">
      <div className="bevel-out mx-auto flex h-full max-w-5xl flex-col bg-silver p-[3px]">
        {/* Title bar */}
        <div className="on-title flex items-center gap-2 bg-title px-1.5 py-[3px]">
          <svg aria-hidden viewBox="0 0 16 16" width={14} height={14} shapeRendering="crispEdges">
            <rect x="1" y="1" width="14" height="14" fill="#fff" stroke="#000" />
            <path d="M3 12 L7 5 L10 9 L12 7 L13 12 Z" fill={colour} stroke="#000" strokeWidth="1" />
          </svg>
          <span className="flex-1 truncate text-[13px] font-bold text-title-text">
            {current} — Paint
          </span>
          <span aria-hidden className="flex gap-[2px]">
            {["–", "□", "✕"].map((glyph, i) => (
              <span
                key={i}
                className="bevel-out flex size-[18px] items-center justify-center bg-silver text-[10px] leading-none text-ink"
              >
                {glyph}
              </span>
            ))}
          </span>
        </div>

        {/* Menu bar. The labels are frame, the language link is real. */}
        <div className="flex items-center gap-1 border-b border-shadow px-1 py-[2px]">
          {content.window.menu.map((item) => (
            <span aria-hidden key={item} className="px-2 py-[1px] text-[12px]">
              {item}
            </span>
          ))}
          <Link
            href={localeHref}
            hrefLang={otherLocale}
            className="ml-auto px-2 py-[1px] text-[12px] underline underline-offset-2"
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-[3px] p-[3px] lg:flex-row">
          {/* Tool palette — the navigation */}
          <nav
            aria-label={content.nav.home}
            className="bevel-out flex shrink-0 flex-row flex-wrap gap-[2px] bg-silver p-[3px] lg:w-[7.5rem] lg:flex-col lg:self-start"
          >
            {tools.map((tool) => {
              const active = isActive(tool.href);
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex w-[calc(50%-1px)] items-center gap-2 px-2 py-[6px] text-[12px] lg:w-auto",
                    active ? "bevel-in bg-light font-bold" : "bevel-out bg-silver",
                  )}
                >
                  <ToolIcon name={tool.key} />
                  <span className="truncate">{tool.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Canvas */}
          <main
            id="main"
            tabIndex={0}
            className="canvas bevel-field min-h-0 min-w-0 flex-1 overflow-y-auto bg-canvas p-5 sm:p-8 lg:p-10"
          >
            {children}
          </main>
        </div>

        {/* Colour palette — pick one and the whole page follows */}
        <div className="flex flex-wrap items-center gap-2 px-[3px] pb-[3px]">
          <span
            aria-hidden
            className="bevel-in size-[30px] shrink-0"
            style={{ background: colour }}
          />
          <div
            role="group"
            aria-label={content.window.colorHint}
            className="bevel-out flex flex-col gap-[1px] bg-silver p-[2px]"
          >
            {PALETTE.map((row, i) => (
              <div key={i} className="flex gap-[1px]">
                {row.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => pick(value)}
                    aria-pressed={colour === value}
                    aria-label={value}
                    title={value}
                    className="bevel-field size-[15px] sm:size-[17px]"
                    style={{ background: value }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Status bar */}
        <div className="flex gap-[3px] px-[3px] pb-[2px] text-[11px]">
          <span className="bevel-field min-w-0 flex-1 truncate px-2 py-[2px]">
            {picked ? `${content.window.colorPicked} ${colour}` : content.window.colorHint}
          </span>
          <span className="bevel-field hidden px-2 py-[2px] sm:block">{colour}</span>
        </div>
      </div>
    </div>
  );
}
