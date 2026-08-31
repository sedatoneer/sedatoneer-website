"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Content, Locale } from "@/content/types";
import { cn } from "@/lib/cn";
import LocalClock from "./LocalClock";
import LocaleSwitch from "./LocaleSwitch";

interface Props {
  locale: Locale;
  content: Content;
  running: number;
  shipped: number;
}

export default function StatusRail({ locale, content, running, shipped }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = [
    { href: `/${locale}`, label: content.nav.home },
    { href: `/${locale}/projects`, label: content.nav.projects },
    { href: `/${locale}/about`, label: content.nav.about },
    { href: `/${locale}/contact`, label: content.nav.contact },
  ];

  const social = [
    { label: "GitHub", href: "https://github.com/sedatoneer" },
    { label: "LinkedIn", href: "https://linkedin.com/in/sedatoneer" },
  ];

  return (
    <>
      {/* Mobile bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-line bg-void/90 px-5 backdrop-blur-md lg:hidden">
        <Link href={`/${locale}`} onClick={() => setOpen(false)} className="flex items-center gap-2.5">
          <span aria-hidden className="pulse-signal size-[7px] rounded-full bg-signal" />
          <span className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">
            {content.rail.heading}
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="rail-nav"
          className="label px-1 py-2 text-ink-2 transition-colors hover:text-signal"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-void/80 lg:hidden"
        />
      ) : null}

      {/* Rail */}
      <aside
        id="rail-nav"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[15rem] flex-col border-r border-line bg-panel",
          "transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          "pt-14 lg:pt-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Identity */}
        <div className="hidden border-b border-line px-5 py-5 lg:block">
          <Link href={`/${locale}`} className="block">
            <span className="flex items-center gap-2.5">
              <span aria-hidden className="pulse-signal size-[7px] rounded-full bg-signal" />
              <span className="font-display text-[14px] font-semibold uppercase tracking-[0.14em] text-ink">
                {content.rail.heading}
              </span>
            </span>
            <span className="mt-2 block text-[12px] leading-snug text-ink-3">
              {content.rail.role}
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4" aria-label={content.rail.heading}>
          {items.map((item) => {
            const active =
              item.href === `/${locale}` ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center border-l-2 px-5 py-2.5 font-display text-[13px] font-medium uppercase tracking-[0.1em] transition-colors",
                  active
                    ? "border-signal bg-panel-hi text-ink"
                    : "border-transparent text-ink-3 hover:border-line-hi hover:text-ink-2",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Live readout */}
        <dl className="border-t border-line px-5 py-4">
          <div className="flex items-center justify-between gap-3 py-1">
            <dt className="label">{content.rail.running}</dt>
            <dd className="flex items-center gap-2">
              <span aria-hidden className="pulse-signal size-[6px] rounded-full bg-signal" />
              <span className="font-mono text-[11px] tabular-nums text-signal">{running}</span>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3 py-1">
            <dt className="label">{content.rail.shipped}</dt>
            <dd className="flex items-center gap-2">
              <span aria-hidden className="size-[6px] rounded-full bg-ink-2" />
              <span className="font-mono text-[11px] tabular-nums text-ink-2">{shipped}</span>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3 py-1">
            <dt className="label">{content.rail.localTime}</dt>
            <dd>
              <LocalClock />
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3 py-1">
            <dt className="label">{content.rail.language}</dt>
            <dd>
              <LocaleSwitch current={locale} />
            </dd>
          </div>
        </dl>

        {/* Channels */}
        <div className="border-t border-line px-5 py-4">
          {social.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center justify-between py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 transition-colors hover:text-signal"
            >
              {label}
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
