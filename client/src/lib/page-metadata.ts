export const SITE_URL = "https://www.bitcoinkeeper.app";

export interface PageMetadataEntry {
  title: string;
  description: string;
  indexable?: boolean;
}

// Keep the build output, sitemap, and client-side navigation metadata in sync.
// Add a route here when its page is added to App.tsx.
export const PAGE_METADATA: Record<string, PageMetadataEntry> = {
  "/": {
    title: "Bitcoin Keeper — Free, open-source multisig self-custody",
    description:
      "Bitcoin Keeper is a free, community-led, open-source bitcoin wallet for multisig self-custody, hardware-wallet coordination and inheritance planning.",
  },
  "/features": {
    title: "Wallets, keys and multisig features — Bitcoin Keeper",
    description:
      "Explore Bitcoin Keeper’s wallet types, hardware-wallet support, key management, coin control and tools for long-term bitcoin self-custody.",
  },
  "/ask-keeper": {
    title:
      "Ask Keeper: self-custody help, questions and ideas — Bitcoin Keeper",
    description:
      "Ask Keeper for help, report a problem or share an idea. Read the basics of bitcoin self-custody, multisig, hardware wallets, backups and recovery.",
  },
  "/team": {
    title: "People behind Keeper — Bitcoin Keeper",
    description:
      "Meet the bitcoiners, contributors and advisers behind Bitcoin Keeper and its community-led approach to open-source self-custody.",
  },
  "/private": {
    title: "Keeper Private — Bitcoin Keeper",
    description:
      "Explore Keeper Private’s consultative services for bitcoin self-custody, secure storage and inheritance planning.",
  },
  "/privacy-policy": {
    title: "Privacy Policy — Bitcoin Keeper",
    description:
      "Read Bitcoin Keeper’s privacy policy and information about data handling.",
  },
  "/terms-of-service": {
    title: "Terms of Service — Bitcoin Keeper",
    description: "Read the terms of service for Bitcoin Keeper.",
  },
};

const NOT_FOUND_METADATA: PageMetadataEntry = {
  title: "Page Not Found — Bitcoin Keeper",
  description: "The requested Bitcoin Keeper page could not be found.",
  indexable: false,
};

export function normalizePath(path: string): string {
  const pathname = path.split(/[?#]/, 1)[0] || "/";
  return pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
}

export function getPageMetadata(path: string) {
  const pathname = normalizePath(path);
  const metadata = PAGE_METADATA[pathname] ?? NOT_FOUND_METADATA;
  const indexable = metadata.indexable !== false;

  return {
    ...metadata,
    indexable,
    canonical: indexable
      ? `${SITE_URL}${pathname === "/" ? "/" : pathname}`
      : undefined,
    robots: indexable ? "index,follow" : "noindex,follow",
  };
}

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    character =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]!
  );
}

export function renderMetadataTags(path: string): string {
  const metadata = getPageMetadata(path);
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${metadata.robots}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Bitcoin Keeper" />',
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    '<meta name="twitter:card" content="summary" />',
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    ...(metadata.canonical
      ? [
          `<link rel="canonical" href="${escapeHtml(metadata.canonical)}" />`,
          `<meta property="og:url" content="${escapeHtml(metadata.canonical)}" />`,
        ]
      : []),
  ].join("\n    ");
}

export function renderSitemap(): string {
  const locations = Object.keys(PAGE_METADATA)
    .filter(path => getPageMetadata(path).indexable)
    .map(
      path =>
        `  <url><loc>${escapeHtml(getPageMetadata(path).canonical!)}</loc></url>`
    );

  // Do not invent lastmod dates: a build date is not a content review date.
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations.join("\n")}\n</urlset>\n`;
}
