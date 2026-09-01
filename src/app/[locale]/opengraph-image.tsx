import { ImageResponse } from "next/og";
import { getContent } from "@/content";
import { isLocale } from "@/content/types";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sedat Öner";

/** The share card is the same Paint window, scaled up. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getContent(isLocale(locale) ? locale : "tr");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#008080",
          padding: 48,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            background: "#c0c0c0",
            border: "4px solid #ffffff",
            borderRightColor: "#000000",
            borderBottomColor: "#000000",
            padding: 6,
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#000080",
              color: "#ffffff",
              padding: "10px 14px",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <div style={{ display: "flex", flex: 1 }}>sedatoneer.com — Paint</div>
            <div style={{ display: "flex", gap: 6 }}>
              {/* Drawn, not typed — Satori's font has no box or cross glyph,
                  so those would come out as tofu. */}
              {["minimise", "maximise", "close"].map((kind) => (
                <div
                  key={kind}
                  style={{
                    display: "flex",
                    alignItems: kind === "minimise" ? "flex-end" : "center",
                    justifyContent: "center",
                    width: 34,
                    height: 30,
                    paddingBottom: kind === "minimise" ? 6 : 0,
                    background: "#c0c0c0",
                    border: "2px solid #ffffff",
                    borderRightColor: "#000000",
                    borderBottomColor: "#000000",
                  }}
                >
                  {kind === "minimise" ? (
                    <div style={{ width: 12, height: 3, background: "#000000" }} />
                  ) : kind === "maximise" ? (
                    <div style={{ width: 14, height: 12, border: "2px solid #000000" }} />
                  ) : (
                    <div style={{ display: "flex", fontSize: 17, color: "#000000" }}>X</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              marginTop: 6,
              background: "#ffffff",
              border: "2px solid #808080",
              borderRightColor: "#ffffff",
              borderBottomColor: "#ffffff",
              padding: 48,
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#000000" }}>
              Sedat Öner
            </div>
            <div style={{ display: "flex", marginTop: 20, fontSize: 32, color: "#000000" }}>
              {content.meta.tagline}
            </div>
          </div>

          {/* Palette strip */}
          <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
            {["#000000", "#808080", "#800000", "#ff0000", "#ff8040", "#ffff00", "#00ff00",
              "#008080", "#00ffff", "#0000ff", "#000080", "#8000ff", "#ff00ff", "#804000"].map(
              (colour) => (
                <div
                  key={colour}
                  style={{
                    width: 44,
                    height: 30,
                    background: colour,
                    border: "2px solid #808080",
                    borderRightColor: "#ffffff",
                    borderBottomColor: "#ffffff",
                  }}
                />
              ),
            )}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
