import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { isLocale } from "@/content/types";
import { alternatesFor } from "@/lib/site";

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
    alternates: alternatesFor(locale, "/contact"),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { contact } = getContent(locale);

  return (
    <div className="max-w-[56ch]">
      <h1 className="title-pixel">{contact.heading}</h1>
      <p className="mt-5 text-[14px] leading-[1.7]">{contact.lede}</p>

      <dl className="mt-8 space-y-4 text-[14px]">
        <div>
          <dt className="text-[12px] font-bold text-muted">{contact.emailLabel}</dt>
          <dd>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </dd>
        </div>

        {contact.channels.map((channel) => (
          <div key={channel.label}>
            <dt className="text-[12px] font-bold text-muted">{channel.label}</dt>
            <dd>
              <a href={channel.href} target="_blank" rel="noreferrer noopener">
                {channel.value}
              </a>
            </dd>
          </div>
        ))}

        <div>
          <dt className="text-[12px] font-bold text-muted">{contact.locationLabel}</dt>
          <dd>{contact.location}</dd>
        </div>
      </dl>
    </div>
  );
}
