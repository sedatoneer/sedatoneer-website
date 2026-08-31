import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { isLocale } from "@/content/types";

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

  const { about } = getContent(locale);

  return (
    <div className="max-w-[68ch]">
      <h1 className="title-pixel">{about.heading}</h1>
      <p className="mt-5 max-w-[62ch] text-[14px] leading-[1.7]">{about.lede}</p>

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
