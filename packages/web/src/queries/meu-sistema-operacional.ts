export function getMyOperatingSystem(
  userAgent?: string
): { name: string; version?: string } | null {
  if (!userAgent) return null;
  if (/Windows NT/.test(userAgent)) return { name: "Windows" };
  if (/Android/.test(userAgent)) return { name: "Android" };
  if (/iPhone|iPad|iOS/.test(userAgent)) return { name: "iOS" };
  if (/Mac OS X/.test(userAgent)) return { name: "macOS" };
  if (/Linux/.test(userAgent)) return { name: "Linux" };
  return { name: "Unknown" };
}
