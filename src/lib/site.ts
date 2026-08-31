/**
 * Canonical origin, used for metadata, Open Graph, sitemap, and hreflang.
 * Set NEXT_PUBLIC_SITE_URL in the deploy environment to override.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sedatoneer.com"
).replace(/\/$/, "");

export const AUTHOR = "Sedat Öner";
