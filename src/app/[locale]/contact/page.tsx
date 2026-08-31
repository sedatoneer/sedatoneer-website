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
    title: content.contact.heading,
    description: content.contact.lede,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { contact } = getContent(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <header className="rise mb-px border border-line bg-panel px-4 py-8 sm:px-8 sm:py-10">
        <Label className="block">{contact.location}</Label>
        <h1 className="display-page mt-4 text-ink">
          {contact.heading}
        </h1>
        <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-2">{contact.lede}</p>
      </header>

      <Panel as="section" className="rise">
        <PanelHeader
          aside={
            <span className="inline-flex items-center gap-2 text-signal">
              <span aria-hidden className="pulse-signal inline-block size-[7px] rounded-full bg-signal" />
              {contact.availability}
            </span>
          }
        >
          {contact.emailLabel}
        </PanelHeader>

        <div className="px-4 py-8 sm:px-8 sm:py-10">
          <a
            href={`mailto:${contact.email}`}
            className="group inline-flex flex-wrap items-baseline gap-x-3 display-item text-ink transition-colors hover:text-signal"
          >
            {contact.email}
            <span
              aria-hidden
              className="font-mono text-[0.55em] text-ink-3 transition-transform group-hover:translate-x-1 group-hover:text-signal"
            >
              &rarr;
            </span>
          </a>
        </div>

        <dl className="grid grid-cols-1 border-t border-line sm:grid-cols-2">
          {contact.channels.map((channel) => (
            <div
              key={channel.label}
              className="border-b border-line p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:p-6"
            >
              <dt className="label mb-2">{channel.label}</dt>
              <dd>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[14px] text-ink-2 underline decoration-line-hi underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
                >
                  {channel.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Panel>
    </div>
  );
}
