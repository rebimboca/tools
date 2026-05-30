export interface AsciiEntry {
  code: number;
  char: string;
  description?: string;
}

const CONTROL_DESCRIPTIONS: Record<number, string> = {
  0: "Null (NUL)",
  1: "Start of Heading (SOH)",
  2: "Start of Text (STX)",
  3: "End of Text (ETX)",
  4: "End of Transmission (EOT)",
  5: "Enquiry (ENQ)",
  6: "Acknowledge (ACK)",
  7: "Bell (BEL)",
  8: "Backspace (BS)",
  9: "Horizontal Tab (HT)",
  10: "Line Feed (LF)",
  11: "Vertical Tab (VT)",
  12: "Form Feed (FF)",
  13: "Carriage Return (CR)",
  14: "Shift Out (SO)",
  15: "Shift In (SI)",
  16: "Data Link Escape (DLE)",
  17: "Device Control 1 (DC1)",
  18: "Device Control 2 (DC2)",
  19: "Device Control 3 (DC3)",
  20: "Device Control 4 (DC4)",
  21: "Negative Acknowledge (NAK)",
  22: "Synchronous Idle (SYN)",
  23: "End of Transmission Block (ETB)",
  24: "Cancel (CAN)",
  25: "End of Medium (EM)",
  26: "Substitute (SUB)",
  27: "Escape (ESC)",
  28: "File Separator (FS)",
  29: "Group Separator (GS)",
  30: "Record Separator (RS)",
  31: "Unit Separator (US)",
  127: "Delete (DEL)"
};

/**
 * Generates the complete ASCII table from code 0 to 127.
 * Prefills detailed descriptions for all control and special non-printable characters.
 *
 * @returns Array of AsciiEntry objects representing the ASCII character map.
 *
 * @see https://www.asciitable.com/ - Standard ASCII codes and control character definitions
 *
 * @example
 * ```ts
 * const table = asciiTable();
 * console.log(table[10]); // { code: 10, char: "", description: "Line Feed (LF)" }
 * console.log(table[65]); // { code: 65, char: "A", description: "Printable Character" }
 * ```
 */
export function asciiTable(): AsciiEntry[] {
  return Array.from({ length: 128 }, (_, code) => {
    const isControl = code < 32 || code === 127;
    const char = isControl ? "" : String.fromCharCode(code);
    const description = CONTROL_DESCRIPTIONS[code] ?? "Printable Character";
    return {
      code,
      char,
      description
    };
  });
}
