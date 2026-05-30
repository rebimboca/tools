export interface OpenGraphOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export interface TwitterOptions {
  card?: "summary" | "summary_large_image";
  site?: string;
  creator?: string;
  title?: string;
  description?: string;
  image?: string;
}

export interface MetaTagsInput {
  title: string;
  author?: string;
  keywords?: string[];
  description?: string;
  canonicalUrl?: string;
  robots?: string;
  openGraph?: OpenGraphOptions;
  twitter?: TwitterOptions;
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Generates valid HTML head meta tags for SEO optimization, including traditional meta,
 * Open Graph (OG), Twitter Cards, and canonical URLs. Escapes inputs to prevent XSS.
 *
 * @param input - The SEO configuration input object.
 * @returns Complete HTML head string containing the tags, or `null` if the title is missing.
 *
 * @see https://ogp.me/ - Open Graph protocol specification reference
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup - Twitter Cards developer guides
 *
 * @example
 * ```ts
 * generateMetaTags({
 *   title: "Awesome App",
 *   description: "My cool application",
 *   openGraph: { image: "https://example.com/logo.png" }
 * });
 * ```
 */
export function generateMetaTags(input: MetaTagsInput): string | null {
  if (!input || !input.title) return null;

  const tags: string[] = ["<head>"];

  // 1. Basic Title and Meta Tags
  tags.push(`  <title>${escapeHtml(input.title)}</title>`);

  if (input.author) {
    tags.push(`  <meta name="author" content="${escapeHtml(input.author)}" />`);
  }

  if (input.keywords && input.keywords.length > 0) {
    const kws = input.keywords.join(", ");
    tags.push(`  <meta name="keywords" content="${escapeHtml(kws)}" />`);
  }

  if (input.description) {
    tags.push(`  <meta name="description" content="${escapeHtml(input.description)}" />`);
  }

  if (input.robots) {
    tags.push(`  <meta name="robots" content="${escapeHtml(input.robots)}" />`);
  }

  // 2. Canonical URL Link
  if (input.canonicalUrl) {
    tags.push(`  <link rel="canonical" href="${escapeHtml(input.canonicalUrl)}" />`);
  }

  // 3. Open Graph Metadata
  if (input.openGraph) {
    const og = input.openGraph;
    const ogTitle = og.title ?? input.title;
    const ogDesc = og.description ?? input.description;

    tags.push(`  <meta property="og:title" content="${escapeHtml(ogTitle)}" />`);
    if (ogDesc) {
      tags.push(`  <meta property="og:description" content="${escapeHtml(ogDesc)}" />`);
    }
    if (og.image) {
      tags.push(`  <meta property="og:image" content="${escapeHtml(og.image)}" />`);
    }
    if (og.url) {
      tags.push(`  <meta property="og:url" content="${escapeHtml(og.url)}" />`);
    }
    if (og.type) {
      tags.push(`  <meta property="og:type" content="${escapeHtml(og.type)}" />`);
    }
  }

  // 4. Twitter Cards Metadata
  if (input.twitter) {
    const tw = input.twitter;
    const twCard = tw.card ?? "summary";
    const twTitle = tw.title ?? input.title;
    const twDesc = tw.description ?? input.description;

    tags.push(`  <meta name="twitter:card" content="${escapeHtml(twCard)}" />`);
    tags.push(`  <meta name="twitter:title" content="${escapeHtml(twTitle)}" />`);
    if (twDesc) {
      tags.push(`  <meta name="twitter:description" content="${escapeHtml(twDesc)}" />`);
    }
    if (tw.image) {
      tags.push(`  <meta name="twitter:image" content="${escapeHtml(tw.image)}" />`);
    }
    if (tw.site) {
      tags.push(`  <meta name="twitter:site" content="${escapeHtml(tw.site)}" />`);
    }
    if (tw.creator) {
      tags.push(`  <meta name="twitter:creator" content="${escapeHtml(tw.creator)}" />`);
    }
  }

  tags.push("</head>");
  return tags.join("\n");
}
