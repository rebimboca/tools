export interface AsciiEntry {
  code: number;
  char: string;
  description?: string;
}

export function asciiTable(): AsciiEntry[] {
  return Array.from({ length: 128 }, (_, code) => ({
    code,
    char: code < 32 || code === 127 ? "" : String.fromCharCode(code)
  }));
}
