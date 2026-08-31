import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, getProjects } from "@/content";
import { isLocale } from "@/content/types";
import Schematic from "@/components/schematics";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getContent(locale);
  return {
    title: content.projects.heading,
    description: content.projects.lede,
    alternates: { canonical: `/${locale}/projects` },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);
  const projects = getProjects(locale);
  const labels = content.projects;

  return (
    <div>
      <h1 className="title-pixel">{labels.heading}</h1>
      <p className="mt-5 max-w-[62ch] text-[14px] leading-[1.7]">{labels.lede}</p>

      <ul className="mt-8 space-y-6">
        {projects.map((project) => (
          <li key={project.slug} id={project.slug} className="border-2 border-ink p-4 sm:p-5">
            <h2 className="title-pixel-sm">{project.name}</h2>

            <p className="mt-1 text-[12px] text-muted">
              {project.domain} · {content.status[project.status]}
              {project.since ? ` · ${project.since}` : ""}
            </p>

            <p className="mt-3 max-w-[68ch] text-[14px] leading-[1.7]">{project.summary}</p>

            <p className="mt-3 text-[12px]">{project.tech.join(" · ")}</p>

            {project.schematic ? (
              <div className="mt-5">
                <p className="text-[12px] font-bold">{labels.howItWorks}</p>
                <div className="mt-2 border-2 border-ink p-3">
                  <Schematic id={project.schematic} locale={locale} />
                </div>
              </div>
            ) : null}

            <p className="mt-4 text-[13px]">
              {project.repo ? (
                <a href={project.repo} target="_blank" rel="noreferrer noopener">
                  {labels.source}
                </a>
              ) : (
                <span className="text-muted">{labels.noSource}</span>
              )}
              {project.demo ? (
                <>
                  {" · "}
                  <a href={project.demo} target="_blank" rel="noreferrer noopener">
                    {labels.demo}
                  </a>
                </>
              ) : null}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
