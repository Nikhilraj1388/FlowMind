import { create } from 'zustand';
import type { Language } from '@/types';

const DEFAULT_CODE = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function main() {
  const result = fibonacci(5);
  console.log(result);
}

main();`;

/** Editor state — language, code, save status */
interface EditorState {
  language: Language;
  code: string;
  isSaving: boolean;
  isDirty: boolean;
  lastSavedAt: string | null;

  setLanguage: (language: Language) => void;
  setCode: (code: string) => void;
  setSaving: (saving: boolean) => void;
  markSaved: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  language: 'javascript',
  code: DEFAULT_CODE,
  isSaving: false,
  isDirty: false,
  lastSavedAt: null,

  setLanguage: (language) => set({ language }),
  setCode: (code) => set({ code, isDirty: true }),
  setSaving: (saving) => set({ isSaving: saving }),
  markSaved: () => set({ isSaving: false, isDirty: false, lastSavedAt: new Date().toISOString() }),
}));
