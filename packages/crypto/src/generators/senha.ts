export interface GeneratePasswordOptions {
  length?: number;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeNumbers?: boolean;
  includeSpecialChars?: boolean;
  amount?: number;
}

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SPECIAL = "!@#$%&*()-+.,;?{[}]^><:";

export function generatePassword(options: GeneratePasswordOptions = {}): string | string[] | null {
  const {
    length = 12,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSpecialChars = true,
    amount = 1
  } = options;

  if (length < 4 || length > 32 || amount < 1 || amount > 50) return null;

  let chars = "";
  if (includeUppercase) chars += UPPER;
  if (includeLowercase) chars += LOWER;
  if (includeNumbers) chars += NUMBERS;
  if (includeSpecialChars) chars += SPECIAL;
  if (!chars) return null;

  const genOne = (): string =>
    Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  if (amount === 1) return genOne();
  return Array.from({ length: amount }, genOne);
}
