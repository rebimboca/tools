export function getMyIp(ip?: string | null): { ip: string; reverseDns?: string } | null {
  if (!ip) return null;
  return { ip };
}
