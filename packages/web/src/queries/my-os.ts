/**
 * Parses the User-Agent string to extract the client's Operating System name and version.
 * Supports granular version parsing for Windows, Android, iOS, macOS, and Linux distros.
 *
 * @param userAgent - The User-Agent string to parse (e.g. navigator.userAgent).
 * @returns An object containing the OS name and version, or `null` if empty.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent - MDN reference for User-Agent headers
 *
 * @example
 * ```ts
 * getMyOperatingSystem("Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) ...");
 * // { name: "iOS", version: "14.6" }
 * ```
 */
export function getMyOperatingSystem(
  userAgent?: string
): { name: string; version?: string } | null {
  if (!userAgent) return null;

  // 1. Android
  const androidMatch = userAgent.match(/Android\s+([0-9.]+)/);
  if (androidMatch) {
    return { name: "Android", version: androidMatch[1] };
  }

  // 2. iOS / iPadOS
  const iosMatch = userAgent.match(/(?:iPhone OS|iPad; CPU OS|iPod OS)\s+([0-9_]+)/);
  if (iosMatch) {
    return { name: "iOS", version: iosMatch[1]?.replace(/_/g, ".") };
  }

  // 3. macOS
  const macMatch = userAgent.match(/Mac OS X\s+([0-9._]+)/);
  if (macMatch) {
    return { name: "macOS", version: macMatch[1]?.replace(/_/g, ".") };
  }

  // 4. Windows
  const winMatch = userAgent.match(/Windows NT\s+([0-9.]+)/);
  if (winMatch) {
    const ntVersion = winMatch[1];
    let version = ntVersion;
    if (ntVersion === "10.0") version = "10/11";
    else if (ntVersion === "6.3") version = "8.1";
    else if (ntVersion === "6.2") version = "8";
    else if (ntVersion === "6.1") version = "7";
    else if (ntVersion === "6.0") version = "Vista";
    else if (ntVersion === "5.1" || ntVersion === "5.2") version = "XP";
    return { name: "Windows", version };
  }

  // 5. Linux
  if (/Linux/.test(userAgent)) {
    const ubuntuMatch = userAgent.match(/Ubuntu\/([0-9.]+)/);
    if (ubuntuMatch) {
      return { name: "Linux (Ubuntu)", version: ubuntuMatch[1] };
    }
    const fedoraMatch = userAgent.match(/Fedora\/([0-9.]+)/);
    if (fedoraMatch) {
      return { name: "Linux (Fedora)", version: fedoraMatch[1] };
    }
    return { name: "Linux" };
  }

  return { name: "Unknown" };
}
