/**
 * Fetches the client's public IP address asynchronously from a public provider
 * if no IP is provided, or returns the structured IP if passed manually.
 *
 * @returns A promise resolving to an object containing the IP address, or `null` if the fetch fails.
 */
export function getMyIp(): Promise<{ ip: string } | null>;

/**
 * Normalizes a manually supplied IP address into a structured object.
 *
 * @param ip - The public IP address to format.
 * @returns A structured object containing the IP address, or `null` if the input is empty.
 */
export function getMyIp(ip: string): { ip: string } | null;

/**
 * Public IP address detection and formatting utility.
 *
 * @param ip - Optional IP string for manual mode.
 * @see https://www.ipify.org/ - Public IP API provider used for fetching
 */
export function getMyIp(ip?: string): any {
  if (typeof ip === "string") {
    if (!ip.trim()) return null;
    return { ip: ip.trim() };
  }

  // Asynchronous detection mode
  return globalThis
    .fetch("https://api.ipify.org?format=json")
    .then((res) => {
      if (!res.ok) return null;
      return res.json().then((data: any) => {
        if (data && typeof data.ip === "string") {
          return { ip: data.ip };
        }
        return null;
      });
    })
    .catch(() => null);
}
