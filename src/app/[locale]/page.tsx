import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { isLocale } from "@/content/types";
import { Smiley } from "@/components/paint/Doodle";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { home } = getContent(locale);

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
      <div className="max-w-[58ch]">
        <h1 className="title-pixel">{home.headline}</h1>

        <p className="mt-6 text-[14px] leading-[1.7]">{home.lede}</p>

        <h2 className="title-pixel-sm mt-8">{home.doingLabel}</h2>
        <ul className="mt-2 list-disc pl-5 text-[14px] leading-[1.8]">
          {home.doing.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link href={`/${locale}/projects`} className="btn">
            {home.toProjects}
          </Link>
          <Link href={`/${locale}/contact`} className="btn">
            {home.toContact}
          </Link>
        </div>
      </div>

      <Smiley
        label={home.doodleAlt}
        className="w-[172px] shrink-0 self-center sm:w-[190px] lg:mt-6 lg:self-start"
      />
    </div>
  );
}
