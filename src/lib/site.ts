/**
 * Canonical origin, used for metadata, Open Graph, sitemap, and hreflang.
 * Set NEXT_PUBLIC_SITE_URL in the deploy environment to override.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sedatoneer.com"
).replace(/\/$/, "");

export const AUTHOR = "Sedat Öner";

import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/content/types";

/**
 * Canonical + hreflang for one page.
 *
 * Next replaces `alternates` rather than merging it, so a page that sets only
 * `canonical` drops the language links the layout declared. Always use this.
 */
export function alternatesFor(locale: Locale, path = "") {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, `/${l}${path}`])),
      "x-default": `/${DEFAULT_LOCALE}${path}`,
    },
  };
}
