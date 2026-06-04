/**
 * Code validator — Section 7.9
 * Static analysis: size limits + forbidden pattern detection.
 */
import type { Language, ValidationResult } from './types';

const MAX_CODE_SIZE = 102_400; // 100 KB

/**
 * Forbidden patterns per language — Section 7.9
 * Reject code that attempts filesystem/network/process access.
 */
const BLOCKLIST: Record<Language, RegExp[]> = {
  JAVASCRIPT: [
    /require\s*\(\s*['"]child_process['"]\s*\)/,
    /require\s*\(\s*['"]fs['"]\s*\)/,
    /require\s*\(\s*['"]net['"]\s*\)/,
    /require\s*\(\s*['"]http['"]\s*\)/,
    /require\s*\(\s*['"]https['"]\s*\)/,
    /eval\s*\(/,
    /new\s+Function\s*\(/,
    /process\.exit/,
    /process\.env/,
    /global\s*\[/,
  ],
  PYTHON: [
    /import\s+os/,
    /import\s+sys/,
    /import\s+subprocess/,
    /import\s+socket/,
    /import\s+shutil/,
    /__import__\s*\(/,
    /\bexec\s*\(/,
    /\beval\s*\(/,
    /open\s*\(/,
  ],
  CPP: [
    /#include\s*<unistd\.h>/,
    /#include\s*<sys\//,
    /\bsystem\s*\(/,
    /\bpopen\s*\(/,
    /\bfork\s*\(/,
    /\bexecv\b/,
    /#include\s*<fstream>/,
    /#include\s*<filesystem>/,
  ],
  JAVA: [
    /Runtime\.getRuntime/,
    /ProcessBuilder/,
    /System\.exit/,
    /java\.net/,
    /java\.io\.File/,
    /java\.io\.FileWriter/,
    /Class\.forName/,
  ],
};

export function validateCode(code: string, language: Language): ValidationResult {
  if (!code || code.trim().length === 0) {
    return { valid: false, error: 'Code cannot be empty' };
  }

  if (Buffer.byteLength(code, 'utf8') > MAX_CODE_SIZE) {
    return { valid: false, error: `Code exceeds maximum size of ${MAX_CODE_SIZE / 1024}KB` };
  }

  const patterns = BLOCKLIST[language] ?? [];
  for (const pattern of patterns) {
    if (pattern.test(code)) {
      return {
        valid: false,
        error: `Code contains a forbidden pattern: ${pattern.source}. System access, network, and filesystem operations are not allowed.`,
      };
    }
  }

  return { valid: true };
}
