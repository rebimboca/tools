export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generates a valid XML Sitemap file string based on standard sitemaps.org guidelines.
 *
 * @param urls - Array of sitemap entries with URL location and optional parameters.
 * @returns Complete XML sitemap file content as a string, or `null` if the input is invalid.
 *
 * @see https://www.sitemaps.org/protocol.html - XML Sitemap protocol reference specifications
 *
 * @example
 * ```ts
 * generateSitemap([
 *   { loc: "https://example.com/", priority: 1.0 }
 * ]);
 * ```
 */
export function generateSitemap(urls: SitemapEntry[]): string | null {
  if (!Array.isArray(urls) || urls.length === 0) return null;

  const lines: string[] = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
  ];

  for (const entry of urls) {
    if (!entry.loc) continue;

    lines.push("  <url>");
    lines.push(`    <loc>${escapeXml(entry.loc)}</loc>`);
    if (entry.lastmod) {
      lines.push(`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
    }
    if (entry.changefreq) {
      lines.push(`    <changefreq>${escapeXml(entry.changefreq)}</changefreq>`);
    }
    if (typeof entry.priority === "number") {
      // Clamp between 0.0 and 1.0 and format to 1 decimal place
      const priority = Math.min(1.0, Math.max(0.0, entry.priority)).toFixed(1);
      lines.push(`    <priority>${priority}</priority>`);
    }
    lines.push("  </url>");
  }

  lines.push("</urlset>");
  return lines.join("\n");
}
