import { useEffect } from "react";
import { useLocation } from "wouter";
import { getPageMetadata } from "@/lib/page-metadata";

function updateMeta(attribute: "name" | "property", key: string, content?: string) {
  const selector = `meta[${attribute}="${key}"]`;
  const matches = Array.from(document.head.querySelectorAll<HTMLMetaElement>(selector));
  const [existing, ...duplicates] = matches;
  duplicates.forEach(element => element.remove());

  if (content === undefined) {
    existing?.remove();
    return;
  }

  const element = existing ?? document.createElement("meta");
  element.setAttribute(attribute, key);
  element.content = content;
  if (!existing) document.head.appendChild(element);
}

export default function PageMetadata() {
  const [location] = useLocation();

  useEffect(() => {
    const metadata = getPageMetadata(location);
    document.title = metadata.title;
    updateMeta("name", "description", metadata.description);
    updateMeta("name", "robots", metadata.robots);
    updateMeta("property", "og:type", "website");
    updateMeta("property", "og:site_name", "Bitcoin Keeper");
    updateMeta("property", "og:title", metadata.title);
    updateMeta("property", "og:description", metadata.description);
    updateMeta("property", "og:url", metadata.canonical);
    updateMeta("name", "twitter:card", "summary");
    updateMeta("name", "twitter:title", metadata.title);
    updateMeta("name", "twitter:description", metadata.description);

    const [existing, ...duplicates] = Array.from(
      document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'),
    );
    duplicates.forEach(element => element.remove());

    if (metadata.canonical) {
      const canonical = existing ?? document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = metadata.canonical;
      if (!existing) document.head.appendChild(canonical);
    } else {
      existing?.remove();
    }
  }, [location]);

  return null;
}
