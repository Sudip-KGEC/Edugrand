import type { Metadata } from "next";
import { SITE } from "@/constants/site";

export function buildMetadata({
  title,
  description,
  path = "/",
  noindex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
}): Metadata {
  const desc = description ?? SITE.description;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      siteName: SITE.name,
      url: path,
      title: title ?? `${SITE.name} | ${SITE.tagline}`,
      description: desc,
    },
    twitter: { card: "summary_large_image", title: title ?? SITE.name, description: desc },
  };
}
