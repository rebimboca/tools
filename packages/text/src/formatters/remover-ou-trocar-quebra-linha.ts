export function replaceOrRemoveNewlines(
  text: string,
  mode: "remove" | "replace",
  replaceWith = " "
): string | null {
  if (!text) return null;
  return mode === "remove" ? text.replace(/\r?\n/g, "") : text.replace(/\r?\n/g, replaceWith);
}
