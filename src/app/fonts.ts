import { Archivo, Public_Sans, JetBrains_Mono } from "next/font/google";

/** Display — tight engineering grotesk with a real width axis. */
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  display: "swap",
});

/** Body — designed for public infrastructure. Institutional, precise. */
export const publicSans = Public_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-public-sans",
  display: "swap",
});

/** Data and labels — what the editor looks like. */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = `${archivo.variable} ${publicSans.variable} ${jetbrainsMono.variable}`;
