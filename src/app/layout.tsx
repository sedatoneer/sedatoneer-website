import type { ReactNode } from "react";

/**
 * Pass-through root. <html> lives in [locale]/layout.tsx so that `lang`
 * reflects the locale actually being served.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
