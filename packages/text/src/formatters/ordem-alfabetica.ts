export type SortDelimiter = "newline" | "space" | "comma" | "semicolon";

export function sortAlphabetically(
  text: string,
  order: "asc" | "desc" = "asc",
  splitBy: SortDelimiter = "newline",
  dedupe = false
): string | null {
  if (!text) return null;
  const sep =
    splitBy === "newline"
      ? /\r?\n/
      : splitBy === "space"
        ? /\s+/
        : splitBy === "comma"
          ? /\s*,\s*/
          : /\s*;\s*/;
  let items = text.split(sep).filter(Boolean);
  if (dedupe) items = Array.from(new Set(items));
  items.sort((a, b) => a.localeCompare(b, "pt-BR"));
  if (order === "desc") items.reverse();
  return items.join("\n");
}
