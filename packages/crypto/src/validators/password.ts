export interface PasswordStrengthResult {
  /** Score from 0 (very weak) to 4 (very strong) */
  score: number;
  /** Whether the password contains at least one uppercase letter */
  hasUppercase: boolean;
  /** Whether the password contains at least one lowercase letter */
  hasLowercase: boolean;
  /** Whether the password contains at least one numeric digit */
  hasDigits: boolean;
  /** Whether the password contains at least one special character */
  hasSpecialChar: boolean;
  /** Whether the password meets the minimum length requirement */
  isLengthValid: boolean;
  /** Actionable tips to improve the password strength */
  feedback: string[];
}

/**
 * Validates the strength of a password, checking length and character diversity.
 *
 * @param password - The password string to evaluate.
 * @param minLength - Minimum required length (default: 8).
 * @returns An object containing the strength evaluation metrics and feedback.
 *
 * @see https://pages.nist.gov/800-63-3/sp800-63b.html - NIST Digital Identity Guidelines (SP 800-63B)
 * @see https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html - OWASP Authentication Cheat Sheet
 */
export function validatePasswordStrength(password: string, minLength = 8): PasswordStrengthResult {
  if (typeof password !== "string") {
    return {
      score: 0,
      hasUppercase: false,
      hasLowercase: false,
      hasDigits: false,
      hasSpecialChar: false,
      isLengthValid: false,
      feedback: ["Senha inválida."]
    };
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigits = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const isLengthValid = password.length >= minLength;

  const feedback: string[] = [];
  let score = 0;

  if (!isLengthValid) {
    feedback.push(`A senha deve ter pelo menos ${minLength} caracteres.`);
  } else {
    score += 1;
  }

  if (!hasUppercase) feedback.push("Adicione pelo menos uma letra maiúscula (A-Z).");
  if (!hasLowercase) feedback.push("Adicione pelo menos uma letra minúscula (a-z).");
  if (!hasDigits) feedback.push("Adicione pelo menos um número (0-9).");
  if (!hasSpecialChar)
    feedback.push("Adicione pelo menos um caractere especial (ex: !, @, #, $, etc.).");

  // Calculate score based on met criteria
  let metCriteria = 0;
  if (hasUppercase) metCriteria += 1;
  if (hasLowercase) metCriteria += 1;
  if (hasDigits) metCriteria += 1;
  if (hasSpecialChar) metCriteria += 1;

  if (isLengthValid) {
    if (metCriteria === 4 && password.length >= 12) {
      score = 4; // Very strong
    } else if (metCriteria >= 3) {
      score = 3; // Strong
    } else if (metCriteria >= 2) {
      score = 2; // Moderate
    } else {
      score = 1; // Weak
    }
  } else {
    score = metCriteria >= 3 ? 1 : 0;
  }

  return {
    score,
    hasUppercase,
    hasLowercase,
    hasDigits,
    hasSpecialChar,
    isLengthValid,
    feedback
  };
}
