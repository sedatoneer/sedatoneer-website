import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, getProjects } from "@/content";
import { isLocale } from "@/content/types";
import { Panel, PanelHeader, Label, StatusTag, TechChip, ArrowLink } from "@/components/ui";
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
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <header className="rise mb-px border border-line bg-panel px-4 py-8 sm:px-8 sm:py-10">
        <Label className="block">{labels.count.replace("{n}", String(projects.length))}</Label>
        <h1 className="display-page mt-4 text-ink">
          {labels.heading}
        </h1>
        <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-ink-2">{labels.lede}</p>
      </header>

      <div className="space-y-px">
        {projects.map((project, i) => (
          <Panel
            as="article"
            key={project.slug}
            id={project.slug}
            className="rise scroll-mt-20"
            style={{ animationDelay: `${Math.min(i, 6) * 45}ms` }}
          >
            <PanelHeader
              aside={project.since ? `${project.since} —` : undefined}
            >
              <StatusTag status={project.status} label={content.status[project.status]} />
            </PanelHeader>

            <div className="px-4 py-6 sm:px-8 sm:py-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h2 className="display-item text-ink">
                  {project.name}
                </h2>
                <Label className="normal-case tracking-[0.08em]">{project.domain}</Label>
              </div>

              <p className="mt-4 max-w-[68ch] text-[14.5px] leading-[1.75] text-ink-2">
                {project.summary}
              </p>

              <div className="mt-6">
                <Label className="mb-2.5 block">{labels.stack}</Label>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <TechChip key={tech}>{tech}</TechChip>
                  ))}
                </div>
              </div>

              {project.schematic ? (
                <div className="mt-8 border-t border-line pt-6">
                  <Label className="mb-5 block">{labels.schematic}</Label>
                  <Schematic id={project.schematic} locale={locale} />
                </div>
              ) : null}

              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-5">
                {project.repo ? (
                  <ArrowLink href={project.repo} external>
                    {labels.source}
                  </ArrowLink>
                ) : (
                  <span className="label">{labels.noSource}</span>
                )}
                {project.demo ? (
                  <ArrowLink href={project.demo} external className="text-signal">
                    {labels.demo}
                  </ArrowLink>
                ) : null}
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
