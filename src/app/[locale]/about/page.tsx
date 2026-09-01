import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { isLocale } from "@/content/types";
import { alternatesFor } from "@/lib/site";
import { WavingFigure } from "@/components/paint/Doodle";

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
    alternates: alternatesFor(locale, "/about"),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { about } = getContent(locale);

  return (
    <div className="max-w-[72ch]">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        <div className="min-w-0 flex-1">
          <h1 className="title-pixel">{about.heading}</h1>
          <p className="mt-5 max-w-[58ch] text-[14px] leading-[1.7]">{about.lede}</p>
        </div>
        <WavingFigure
          label={about.doodleAlt}
          className="w-[130px] shrink-0 self-center sm:mt-2 sm:self-start"
        />
      </div>

      <h2 className="title-pixel-sm mt-9">{about.timelineHeading}</h2>
      <ul className="mt-3 space-y-5">
        {about.timeline.map((entry) => (
          <li key={`${entry.org}-${entry.period}`}>
            <p className="text-[12px] text-muted">{entry.period}</p>
            <p className="text-[14px] font-bold">
              {entry.role} — {entry.org}
            </p>
            <p className="mt-1 text-[14px] leading-[1.65]">{entry.detail}</p>
          </li>
        ))}
      </ul>

      <h2 className="title-pixel-sm mt-9">{about.skillsHeading}</h2>
      <dl className="mt-3 space-y-3">
        {about.skills.map((group) => (
          <div key={group.title}>
            <dt className="text-[13px] font-bold">{group.title}</dt>
            <dd className="text-[14px]">{group.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
