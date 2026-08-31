import { ImageResponse } from "next/og";
import { getContent } from "@/content";
import { countByStatus } from "@/content/projects";
import { isLocale } from "@/content/types";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sedat Öner";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : "tr";
  const content = getContent(lang);
  // Satori has no `lang` context, so CSS text-transform would lowercase-i
  // Turkish text incorrectly ("MÜHENDISI"). Case it explicitly instead.
  const upper = (value: string) => value.toLocaleUpperCase(lang === "tr" ? "tr-TR" : "en-US");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090C",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 99, background: "#F0A202" }} />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: "#E4E8EF",
              fontWeight: 600,
            }}
          >
            {upper("Sedat Öner")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 78,
            lineHeight: 1.1,
            color: "#E4E8EF",
            fontWeight: 700,
            letterSpacing: -1.5,
            maxWidth: 940,
          }}
        >
          {content.meta.ogTagline}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #232936",
            paddingTop: 28,
            fontSize: 22,
            letterSpacing: 3,
            color: "#98A2B3",
          }}
        >
          <div style={{ display: "flex" }}>{upper(content.rail.role)}</div>
          <div style={{ display: "flex", gap: 28 }}>
            <div style={{ display: "flex", color: "#F0A202" }}>
              {countByStatus("running")} {upper(content.rail.running)}
            </div>
            <div style={{ display: "flex" }}>
              {countByStatus("shipped")} {upper(content.rail.shipped)}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
