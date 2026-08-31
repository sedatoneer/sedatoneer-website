"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Swaps the locale segment while keeping the reader on the same page, so an
 * English link is shareable and a refresh doesn't reset the language.
 */
export default function LocaleSwitch({ current }: { current: Locale }) {
  const pathname = usePathname();

  const hrefFor = (locale: Locale) => {
    const rest = pathname.split("/").slice(2).join("/");
    return `/${locale}${rest ? `/${rest}` : ""}`;
  };

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={hrefFor(locale)}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            className={cn(
              "px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
              active ? "text-signal" : "text-ink-3 hover:text-ink-2",
            )}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
