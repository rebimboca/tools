export interface MetaTagsInput {
  title: string;
  author?: string;
  keywords?: string[];
  description?: string;
}

export function generateMetaTags(input: MetaTagsInput): string | null {
  if (!input.title) return null;
  const keywords = input.keywords?.join(", ") ?? "";
  return [
    "<head>",
    `  <title>${input.title}</title>`,
    input.author ? `  <meta name="author" content="${input.author}" />` : "",
    keywords ? `  <meta name="keywords" content="${keywords}" />` : "",
    input.description ? `  <meta name="description" content="${input.description}" />` : "",
    "</head>"
  ]
    .filter(Boolean)
    .join("\n");
}
