import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { fontVariables } from "../fonts";
import { getContent } from "@/content";
import { LOCALES, isLocale, type Locale } from "@/content/types";
import { SITE_URL, AUTHOR, alternatesFor } from "@/lib/site";
import PaintWindow from "@/components/paint/PaintWindow";
import JsonLd from "@/components/JsonLd";
import "../globals.css";

export const viewport: Viewport = {
  themeColor: "#000080",
  colorScheme: "light",
};

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
    alternates: alternatesFor(locale),
    applicationName: AUTHOR,
    keywords:
      locale === "tr"
        ? ["Sedat Öner", "backend geliştirici", "otomasyon", "web scraping", "FastAPI", "Python", "Düzce"]
        : ["Sedat Öner", "backend developer", "automation", "web scraping", "FastAPI", "Python", "Türkiye"],
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bevel-out focus:bg-silver focus:px-3 focus:py-1.5 focus:text-[12px] focus:text-ink"
        >
          {content.nav.skip}
        </a>

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": `${SITE_URL}/#sedat`,
                name: AUTHOR,
                url: `${SITE_URL}/${locale}`,
                jobTitle: content.meta.tagline,
                description: content.meta.description,
                email: `mailto:${content.contact.email}`,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "İstanbul",
                  addressCountry: "TR",
                },
                alumniOf: {
                  "@type": "CollegeOrUniversity",
                  name: "Düzce Üniversitesi",
                },
                knowsAbout: content.home.doing,
                sameAs: content.contact.channels.map((channel) => channel.href),
              },
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#site`,
                url: `${SITE_URL}/${locale}`,
                name: AUTHOR,
                inLanguage: locale,
                publisher: { "@id": `${SITE_URL}/#sedat` },
              },
            ],
          }}
        />

        <PaintWindow locale={locale as Locale} content={content}>
          {children}
        </PaintWindow>
      </body>
    </html>
  );
}
