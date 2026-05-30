export interface RobotsRule {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
}

export interface RobotsTxtInput {
  rules: RobotsRule[];
  sitemapUrl?: string;
}

/**
 * Generates a valid robots.txt file string based on configuration rules.
 *
 * @param input - The robots.txt configuration parameters.
 * @returns Complete robots.txt file content as a string, or `null` if parameters are invalid.
 *
 * @see https://developers.google.com/search/docs/crawling-indexing/robots/intro - Google Search Central Robots.txt intro
 *
 * @example
 * ```ts
 * generateRobotsTxt({
 *   rules: [{ userAgent: "*", disallow: ["/admin"] }],
 *   sitemapUrl: "https://example.com/sitemap.xml"
 * });
 * ```
 */
export function generateRobotsTxt(input: RobotsTxtInput): string | null {
  if (!input || !Array.isArray(input.rules) || input.rules.length === 0) return null;

  const lines: string[] = [];

  for (const rule of input.rules) {
    lines.push(`User-agent: ${rule.userAgent}`);
    if (rule.allow) {
      for (const allow of rule.allow) {
        lines.push(`Allow: ${allow}`);
      }
    }
    if (rule.disallow) {
      for (const disallow of rule.disallow) {
        lines.push(`Disallow: ${disallow}`);
      }
    }
    lines.push(""); // Spacing between user-agent blocks
  }

  if (input.sitemapUrl) {
    lines.push(`Sitemap: ${input.sitemapUrl}`);
  }

  return lines.join("\n").trim();
}
