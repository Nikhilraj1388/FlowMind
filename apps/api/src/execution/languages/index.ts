/**
 * Language handler registry — Section 7.4
 */
import { javascriptHandler } from './javascript-handler';
import { pythonHandler } from './python-handler';
import type { Language, LanguageHandler } from '../types';

export const languageHandlers: Partial<Record<Language, LanguageHandler>> = {
  JAVASCRIPT: javascriptHandler,
  PYTHON: pythonHandler,
  // CPP: cppHandler,   — Phase 7+
  // JAVA: javaHandler, — Phase 7+
};

export function getHandler(language: Language): LanguageHandler {
  const handler = languageHandlers[language];
  if (!handler) {
    throw new Error(`No handler for language: ${language}. C++ and Java support coming in Phase 7.`);
  }
  return handler;
}
