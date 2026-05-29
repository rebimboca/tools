export function binaryDecode(binary: string): string | null {
  if (!binary) return null;
  const parts = binary.trim().split(/\s+/);
  if (parts.some((p) => !/^[01]{8}$/.test(p))) return null;
  return parts.map((p) => String.fromCharCode(parseInt(p, 2))).join("");
}
