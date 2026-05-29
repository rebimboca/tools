export function getMyBrowser(
  userAgent?: string
): { name: string; version?: string; userAgent: string } | null {
  if (!userAgent) return null;
  const patterns: Array<[RegExp, string]> = [
    [/Firefox\/(\d+(?:\.\d+)?)/, "Firefox"],
    [/Edg\/(\d+(?:\.\d+)?)/, "Edge"],
    [/Chrome\/(\d+(?:\.\d+)?)/, "Chrome"],
    [/Version\/(\d+(?:\.\d+)?).*Safari/, "Safari"]
  ];
  for (const [regex, name] of patterns) {
    const m = userAgent.match(regex);
    if (m) return { name, version: m[1], userAgent };
  }
  return { name: "Unknown", userAgent };
}
