import Link from "next/link";
import { fontVariables } from "./fonts";
import { tr } from "@/content/tr";
import { en } from "@/content/en";
import "./globals.css";

export const metadata = {
  title: "404 — Sedat Öner",
  description: tr.notFound.body,
  robots: { index: false, follow: true },
};

/**
 * Root not-found. The root layout is a pass-through, so this page carries its
 * own document — and since a bad URL has no locale, it answers in both.
 */
export default function NotFound() {
  return (
    <html lang="tr" className={fontVariables}>
      <body>
        <div className="flex min-h-dvh items-center justify-center p-4">
          <div className="bevel-out w-full max-w-md bg-silver p-[3px]">
            <div className="on-title flex items-center bg-title px-2 py-[3px]">
              <span className="flex-1 text-[13px] font-bold text-title-text">
                {tr.notFound.title}
              </span>
            </div>

            <div className="flex gap-4 px-5 py-6">
              <svg
                aria-hidden
                viewBox="0 0 32 32"
                width={38}
                height={38}
                className="shrink-0"
                shapeRendering="crispEdges"
              >
                <circle cx="16" cy="16" r="14" fill="#ff0000" stroke="#000000" strokeWidth="2" />
                <path
                  d="M11 11 L21 21 M21 11 L11 21"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-[13px] leading-[1.6]">
                <p>{tr.notFound.body}</p>
                <p className="mt-2 text-muted">{en.notFound.body}</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 px-4 pb-4">
              <Link href="/tr" className="btn min-w-[7rem]">
                {tr.notFound.action}
              </Link>
              <Link href="/en" className="btn min-w-[7rem]">
                {en.notFound.action}
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
