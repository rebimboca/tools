/**
 * Applies the ROT13 cipher to a given text.
 * ROT13 replaces a letter with the 13th letter after it in the alphabet.
 *
 * @param text - The input text to cipher or decipher.
 * @returns The ROT13 encoded/decoded text.
 */
export function rot13(text: string): string {
  if (!text) return "";
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= "Z" ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
  });
}
