import type { MetadataRoute } from "next";
import { LOCALES } from "@/content/types";
import { SITE_URL } from "@/lib/site";

const ROUTES = ["", "/projects", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}${route}`]),
        ),
      },
    })),
  );
}
