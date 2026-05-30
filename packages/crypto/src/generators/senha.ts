/**
 * Options for password generation.
 */
export interface GeneratePasswordOptions {
  /** Length of each password (4-128). Default: 12. */
  length?: number;
  /** Include uppercase letters (A-Z). Default: true. */
  includeUppercase?: boolean;
  /** Include lowercase letters (a-z). Default: true. */
  includeLowercase?: boolean;
  /** Include numeric digits (0-9). Default: true. */
  includeNumbers?: boolean;
  /** Include special characters (!@#$%...). Default: true. */
  includeSpecialChars?: boolean;
  /** Number of passwords to generate (1-50). Default: 1. */
  amount?: number;
}

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SPECIAL = "!@#$%&*()-+.,;?{[}]^><:";

/**
 * Securely generates a random integer in the range [0, max - 1]
 * using Web Crypto API's cryptographically secure pseudo-random number generator (CSPRNG)
 * with a fallback to Math.random() if not available.
 */
function getRandomInt(max: number): number {
  if (typeof globalThis !== "undefined" && globalThis.crypto?.getRandomValues) {
    const array = new Uint32Array(1);
    globalThis.crypto.getRandomValues(array);
    return array[0]! % max;
  }
  return Math.floor(Math.random() * max);
}

/**
 * Generates a random password with configurable character sets.
 *
 * Each generated password is guaranteed to contain at least one character
 * from every enabled category, preventing weak passwords that miss entire
 * character classes.
 *
 * @param options - Configuration for password generation.
 * @returns A single password string, or `null` if options are invalid.
 */
export function generatePassword(options?: Omit<GeneratePasswordOptions, "amount">): string | null;

/**
 * Generates one or more random passwords with configurable character sets.
 *
 * Each generated password is guaranteed to contain at least one character
 * from every enabled category, preventing weak passwords that miss entire
 * character classes.
 *
 * @param options - Configuration for password generation, with amount specified.
 * @returns Array of generated passwords, or `null` if options are invalid.
 */
export function generatePassword(
  options: GeneratePasswordOptions & { amount: number }
): string[] | null;

/**
 * Generates one or more random passwords with configurable character sets.
 *
 * @param options - Configuration for password generation.
 * @returns String or array of strings, or `null` if options are invalid.
 *
 * @see https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#password-complexity - OWASP recommendations for password complexity
 */
export function generatePassword(options: GeneratePasswordOptions = {}): string | string[] | null {
  const {
    length = 12,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSpecialChars = true,
    amount = 1
  } = options;

  if (length < 4 || length > 128 || amount < 1 || amount > 50) return null;

  const pools: string[] = [];
  if (includeUppercase) pools.push(UPPER);
  if (includeLowercase) pools.push(LOWER);
  if (includeNumbers) pools.push(NUMBERS);
  if (includeSpecialChars) pools.push(SPECIAL);
  if (pools.length === 0) return null;

  const allChars = pools.join("");

  const genOne = (): string => {
    // Guarantee at least one char from each enabled pool
    const mandatory = pools.map((pool) => pool[getRandomInt(pool.length)]!);
    const remaining = Array.from(
      { length: length - mandatory.length },
      () => allChars[getRandomInt(allChars.length)]!
    );
    // Shuffle all together
    const chars = [...mandatory, ...remaining];
    for (let i = chars.length - 1; i > 0; i -= 1) {
      const j = getRandomInt(i + 1);
      [chars[i], chars[j]] = [chars[j]!, chars[i]!];
    }
    return chars.join("");
  };

  if (amount === 1 && !("amount" in options)) {
    return genOne();
  }

  return Array.from({ length: amount }, genOne);
}
