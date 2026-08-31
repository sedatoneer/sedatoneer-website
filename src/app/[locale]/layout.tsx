import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { fontVariables } from "../fonts";
import { getContent } from "@/content";
import { LOCALES, isLocale, type Locale } from "@/content/types";
import { countByStatus } from "@/content/projects";
import { SITE_URL, AUTHOR } from "@/lib/site";
import StatusRail from "@/components/chrome/StatusRail";
import "../globals.css";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { meta } = getContent(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: meta.title, template: `%s — ${AUTHOR}` },
    description: meta.description,
    authors: [{ name: AUTHOR, url: SITE_URL }],
    creator: AUTHOR,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      siteName: AUTHOR,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: `/${locale}`,
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale as Locale);

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-signal focus:bg-panel focus:px-4 focus:py-2 focus:font-mono focus:text-[12px] focus:uppercase focus:tracking-[0.14em] focus:text-signal"
        >
          {content.nav.skip}
        </a>

        <StatusRail
          locale={locale as Locale}
          content={content}
          running={countByStatus("running")}
          shipped={countByStatus("shipped")}
        />

        <main id="main" className="min-h-dvh pt-14 lg:ml-[15rem] lg:pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}
