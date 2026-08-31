import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, getProjects } from "@/content";
import { isLocale } from "@/content/types";
import { buildStackGraph } from "@/lib/graph";
import { Panel, PanelHeader } from "@/components/ui";
import StackExplorer from "@/components/home/StackExplorer";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);
  const projects = getProjects(locale);
  const { shared, specialist } = buildStackGraph();
  const { home } = content;
  const running = projects.filter((p) => p.status === "running");

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      {/* Hero — the readout you'd look at to know a silent system is alive */}
      <Panel as="section" className="relative overflow-hidden rise">
        <div aria-hidden className="panel-grid pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-panel/70 to-panel"
        />

        <div className="relative">
          <PanelHeader aside={`2026 · ${content.rail.localTime}`}>
            <span className="inline-flex items-center gap-2.5">
              <span aria-hidden className="pulse-signal inline-block size-[7px] rounded-full bg-signal" />
              {locale === "tr" ? "Sistem durumu" : "System status"}
            </span>
          </PanelHeader>

          <div className="px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
            <h1 className="display-hero">
              <span className="block text-ink-2/70 rise" style={{ animationDelay: "60ms" }}>
                {home.headline[0]}
              </span>
              <span className="block text-ink rise" style={{ animationDelay: "150ms" }}>
                {home.headline[1]}
              </span>
            </h1>

            <div
              aria-hidden
              className="sweep mt-8 h-px w-full max-w-md bg-line-hi"
              style={{ animationDelay: "320ms" }}
            />

            <p
              className="rise mt-8 max-w-[58ch] text-[15px] leading-[1.75] text-ink-2"
              style={{ animationDelay: "380ms" }}
            >
              {home.lede}
            </p>

            <ul
              className="rise mt-8 flex flex-wrap gap-x-6 gap-y-2"
              style={{ animationDelay: "460ms" }}
            >
              {home.disciplines.map((item) => (
                <li key={item} className="label text-ink-3">
                  {item}
                </li>
              ))}
            </ul>

            <div
              className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
              style={{ animationDelay: "540ms" }}
            >
              <Link
                href={`/${locale}/projects`}
                className="group inline-flex items-center gap-2.5 border border-signal-dim bg-signal/10 px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-signal transition-colors hover:bg-signal hover:text-void"
              >
                {home.toProjects}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-3 underline decoration-line-hi underline-offset-[6px] transition-colors hover:text-ink hover:decoration-signal"
              >
                {home.toContact}
              </Link>
            </div>
          </div>

          {/* What's actually live right now — the claim, evidenced */}
          <div className="border-t border-line">
            <div className="flex items-center gap-3 px-4 pb-3 pt-4 sm:px-8 lg:px-12">
              <span aria-hidden className="pulse-signal inline-block size-[7px] rounded-full bg-signal" />
              <span className="label text-signal">
                {locale === "tr" ? "Şu an çalışıyor" : "Running right now"}
              </span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-3">
              {running.map((project) => (
                <li key={project.slug} className="border-t border-line sm:border-r sm:last:border-r-0">
                  <Link
                    href={`/${locale}/projects#${project.slug}`}
                    className="group block h-full px-4 py-4 transition-colors hover:bg-panel-hi sm:px-8 lg:px-12"
                  >
                    <span className="font-display text-[15px] font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-signal">
                      {project.name}
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-ink-3">
                      {project.domain}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>

      <div className="mt-px">
        <StackExplorer
          shared={shared}
          specialist={specialist}
          projects={projects}
          content={content}
          locale={locale}
        />
      </div>
    </div>
  );
}
