/**
 * Parses the User-Agent string to extract the client's web browser name and version.
 *
 * @param userAgent - The User-Agent string to parse (e.g. navigator.userAgent).
 * @returns An object containing the browser name, parsed version, and the original User-Agent, or `null` if empty.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent - MDN reference for User-Agent headers
 *
 * @example
 * ```ts
 * getMyBrowser("Mozilla/5.0 ... Chrome/91.0.4472.124 ...");
 * // { name: "Chrome", version: "91.0.4472.124", userAgent: "..." }
 * ```
 */
export function getMyBrowser(
  userAgent?: string
): { name: string; version?: string; userAgent: string } | null {
  if (!userAgent) return null;

  const patterns: Array<[RegExp, string]> = [
    [/Firefox\/(\d+(?:\.\d+)*)/, "Firefox"],
    [/Edg\/(\d+(?:\.\d+)*)/, "Edge"],
    [/Chrome\/(\d+(?:\.\d+)*)/, "Chrome"],
    [/Version\/(\d+(?:\.\d+)*).*Safari/, "Safari"]
  ];

  for (const [regex, name] of patterns) {
    const m = userAgent.match(regex);
    if (m) return { name, version: m[1], userAgent };
  }

  return { name: "Unknown", userAgent };
}
