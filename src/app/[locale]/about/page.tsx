import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { isLocale } from "@/content/types";
import { Panel, PanelHeader, Label } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getContent(locale);
  return {
    title: content.about.heading,
    description: content.about.lede,
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { about, rail } = getContent(locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <header className="rise mb-px border border-line bg-panel px-4 py-8 sm:px-8 sm:py-10">
        <Label className="block">{rail.role}</Label>
        <h1 className="display-page mt-4 text-ink">
          {about.heading}
        </h1>
        <p className="mt-5 max-w-[58ch] text-[16.5px] leading-[1.7] text-ink-2">{about.lede}</p>
      </header>

      {/* Experience — a real sequence, so it gets an axis */}
      <Panel as="section" className="rise mb-px" aria-labelledby="timeline-heading">
        <PanelHeader>
          <span id="timeline-heading">{about.timelineHeading}</span>
        </PanelHeader>

        <ol className="px-4 py-2 sm:px-8">
          {about.timeline.map((entry) => {
            // The live dot means "ongoing", which is several roles, not just the first.
            const ongoing = entry.period.includes(about.presentWord);
            return (
            <li
              key={`${entry.org}-${entry.period}`}
              className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-line py-5 last:border-b-0 sm:grid-cols-[11rem_minmax(0,1fr)]"
            >
              <div className="flex items-baseline gap-3">
                <span
                  aria-hidden
                  className={
                    ongoing
                      ? "pulse-signal mt-1.5 inline-block size-[7px] shrink-0 rounded-full bg-signal"
                      : "mt-1.5 inline-block size-[7px] shrink-0 rounded-full border border-line-hi"
                  }
                />
                <span className="label leading-relaxed">{entry.period}</span>
              </div>
              <div>
                <h3 className="font-display text-[16px] font-semibold tracking-[-0.01em] text-ink">
                  {entry.role}
                </h3>
                <p className="mt-0.5 font-mono text-[11.5px] uppercase tracking-[0.12em] text-signal/80">
                  {entry.org}
                </p>
                <p className="mt-2.5 max-w-[62ch] text-[14px] leading-relaxed text-ink-3">
                  {entry.detail}
                </p>
              </div>
            </li>
            );
          })}
        </ol>
      </Panel>

      {/* Capabilities */}
      <Panel as="section" className="rise" aria-labelledby="skills-heading">
        <PanelHeader>
          <span id="skills-heading">{about.skillsHeading}</span>
        </PanelHeader>

        <dl className="grid grid-cols-1 sm:grid-cols-2">
          {about.skills.map((group, i) => (
            <div
              key={group.title}
              className={`border-line p-4 sm:p-6 ${i % 2 === 0 ? "sm:border-r" : ""} ${
                i < about.skills.length - (about.skills.length % 2 === 0 ? 2 : 1) ? "border-b" : ""
              }`}
            >
              <dt className="label mb-3">{group.title}</dt>
              <dd className="flex flex-wrap gap-x-4 gap-y-1.5">
                {group.items.map((item) => (
                  <span key={item} className="text-[14px] text-ink-2">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Panel>
    </div>
  );
}
