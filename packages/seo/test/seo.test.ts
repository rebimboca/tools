import { describe, expect, it } from "vitest";
import { generateMetaTags, generateRobotsTxt, generateSitemap } from "../src";

describe("seo", () => {
  it("generates meta tags including Open Graph, Twitter Cards, and Canonical link", () => {
    const out = generateMetaTags({
      title: "Google",
      author: "Larry Page",
      description: "Search engine",
      canonicalUrl: "https://google.com/",
      openGraph: {
        image: "https://google.com/logo.png",
        type: "website"
      },
      twitter: {
        card: "summary_large_image",
        site: "@google"
      }
    });

    expect(out).toContain("<title>Google</title>");
    expect(out).toContain('<meta name="author" content="Larry Page" />');
    expect(out).toContain('<link rel="canonical" href="https://google.com/" />');
    expect(out).toContain('<meta property="og:image" content="https://google.com/logo.png" />');
    expect(out).toContain('<meta name="twitter:card" content="summary_large_image" />');
    expect(out).toContain('<meta name="twitter:site" content="@google" />');
  });

  it("escapes special characters to prevent XSS", () => {
    const out = generateMetaTags({
      title: '"><script>alert(1)</script>',
      author: '"><script>alert(2)</script>'
    });
    expect(out).not.toContain('"><script>');
    expect(out).toContain("&lt;script&gt;");
  });

  it("generates valid robots.txt", () => {
    const robots = generateRobotsTxt({
      rules: [
        { userAgent: "*", disallow: ["/admin"] },
        { userAgent: "Googlebot", allow: ["/"] }
      ],
      sitemapUrl: "https://example.com/sitemap.xml"
    });
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Disallow: /admin");
    expect(robots).toContain("User-agent: Googlebot");
    expect(robots).toContain("Sitemap: https://example.com/sitemap.xml");
  });

  it("generates valid XML sitemap", () => {
    const sitemap = generateSitemap([
      { loc: "https://example.com/", changefreq: "daily", priority: 1.0 },
      { loc: "https://example.com/about", priority: 0.8 }
    ]);
    expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(sitemap).toContain("<loc>https://example.com/</loc>");
    expect(sitemap).toContain("<changefreq>daily</changefreq>");
    expect(sitemap).toContain("<priority>1.0</priority>");
  });

  it("returns null for invalid inputs", () => {
    expect(generateMetaTags({ title: "" })).toBeNull();
    expect(generateRobotsTxt({ rules: [] })).toBeNull();
    expect(generateSitemap([])).toBeNull();
  });
});
