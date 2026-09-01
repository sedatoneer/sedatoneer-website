import { Pixelify_Sans } from "next/font/google";

/** Headings only. Body text uses the Windows UI stack (Tahoma), no webfont. */
export const pixelify = Pixelify_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-pixelify",
  display: "swap",
});

export const fontVariables = pixelify.variable;
